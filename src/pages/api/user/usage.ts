import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
import { values, groupBy } from "lodash";
import { DateTime, Interval } from "luxon";
type Data = {
  message: string;
};
async function getCount(docRef) {
  const querySnapshot = await docRef.get();
  const documents = querySnapshot.docs;
  let count = 0;
  for (const doc of documents) {
    count += doc.get("count");
  }
  return count;
}
const groupData = (data, zone) => {
  return values(
    groupBy(data, (d) =>
      DateTime.fromMillis(d.timestamp, { zone: zone }).startOf("day")
    )
  );
};
const aggregateData = (data, zone) => {
  let defaultData = Array.from(Array(29).keys()).map((x) => {
    const date = DateTime.now()
      .setZone(zone)
      .minus({ days: x + 1 });
    return { x: date.toLocaleString(), y: 0 };
  });

  data.forEach((chunk) => {
    const dateString = DateTime.fromMillis(chunk[0].timestamp, {
      zone: zone,
    }).toLocaleString();
    const idx = defaultData.findIndex((item) => item.x === dateString);
    defaultData[idx] = { x: dateString, y: chunk.length };
  });

  return defaultData.reverse();
};

const runAggregation = async (userRef, zone) => {
  const logsRef = userRef.collection("logs");
  const usageRef = userRef.collection("usage_daily");
  try {
    const res = await firestore.runTransaction(async (t) => {
      const logsSnapshot = await t.get(logsRef);
      const usageDailySnapshot = await t.get(usageRef);
      const logs = [];
      logsSnapshot.docs.forEach((doc) => logs.push(doc.data()));
      const groupedData = groupData(logs, zone);
      const aggregatedData = aggregateData(groupedData, zone);
      const count = logs.filter(
        (item) =>
          DateTime.now().setZone(zone).startOf("day").toMillis() <
          item.timestamp
      );
      usageDailySnapshot.docs.forEach((doc) => {
        t.delete(doc.ref);
      });
      const aggregated6Day = aggregatedData.slice(-6);
      if (count.length > 0) {
        t.set(usageRef.doc("0"), { count: count.length });
      }
      t.update(userRef, {
        lastAggregation: Date.now(),
        chartData: { usage6day: aggregated6Day, usage29day: aggregatedData },
      });
      const updatedData = aggregatedData.concat({
        x: DateTime.now().setZone(zone).startOf("day").toLocaleString(),
        y: count.length,
      });
      return { usage7day: updatedData.slice(-7), usage30day: updatedData };
    });
    console.log("Transaction success", res);
    return res;
  } catch (e) {
    console.log("Transaction failure:", e);
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userRef = firestore.collection("users").doc(req.uid);
  const doc = await userRef.get();
  const zone = req.query.zone.replace("-", "/");

  if (!doc.exists) {
    res.status(404).json({ message: "user does not exist" });
  } else {
    const usage = await getCount(userRef.collection("usage"));
    const docData = doc.data();
    const now = DateTime.now();
    const lastAggregation = docData?.lastAggregation;
    const i = lastAggregation
      ? Interval.fromDateTimes(lastAggregation, now)
      : false;
    const check = i ? i.length("day") >= 1 : true;
    if (
      DateTime.now().setZone(zone).startOf("day").toMillis() >
        lastAggregation ||
      check
    ) {
      const newAggregateData = await runAggregation(userRef, zone);
      const data = { ...docData, usage, chartData: newAggregateData };
      if (newAggregateData)
        res.status(200).json({ message: "usage found", data });
      else res.status(500).json({ message: "failed to aggregate data" });
    } else {
      const dailyUsage = await getCount(userRef.collection("usage_daily"));
      const dailyData = {
        x: DateTime.now().setZone(zone).startOf("day").toLocaleString(),
        y: dailyUsage,
      };
      docData.chartData = {
        usage7day: docData.chartData.usage6day.concat(dailyData),
        usage30day: docData.chartData.usage29day.concat(dailyData),
      };
      const data = { ...docData, usage };
      res.status(200).json({ message: "usage found", data });
    }
  }
}
export default withAuth(handler);
