import { NextPage } from "next";
import { addDoc, collection } from "firebase/firestore";
import { db, firebaseApp } from "@modules/auth/firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useState } from "react";
const auth = getAuth(firebaseApp);
const Settings: NextPage = () => {
  const [message, setMessage] = useState("");
  const writeNotification = async () => {
    const docRef = await addDoc(
      collection(db, "users", auth.currentUser?.uid, "notifications"),
      {
        message,
        timestamp: Date.now(),
      }
    );
  };

  return (
    <div className="flex-1  space-y-4 p-5">
           <div className="pb-5 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
    </div>
      <div className="bg-white shadow sm:rounded-lg max-w-md">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Send a notification
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Change the message you want to send.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              writeNotification();
            }}
            className="mt-5 sm:flex sm:items-center"
          >
            <div className="w-full sm:max-w-xs">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <input
              required
                onInput={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                name="message"
                id="message"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Hello world"
              />
            </div>
            <button
              type="submit"
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
