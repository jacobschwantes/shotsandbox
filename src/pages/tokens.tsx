import { NextPage } from "next";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createToast } from "vercel-toast";
import "vercel-toast/dist/vercel-toast.css";

import {
  EyeIcon,
  EyeOffIcon,
  DuplicateIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAsync } from "react-async-hook";
import useSWR from "swr";
import firebaseApp from "@modules/auth/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetcherWithAuthHeader } from "@utils/swr/hooks";
import { useContext, useEffect } from "react";
import AuthContext from "@modules/auth/AuthContext";
import { useState } from "react";
const auth = getAuth(firebaseApp);

const Tokens: NextPage = () => {
  const [showKeys, setShowKeys] = useState(true);
  const [copiedId, setCopiedId] = useState("");
  const [tokens, setTokens] = useState([]);
  useEffect(
    () => {
      let timer1 = setTimeout(() => setCopiedId(""), 2000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [copiedId]
  );
  const fetchTokens = async () => {
    console.log("running");
    const token = await auth.currentUser?.getIdToken();
    const result = await fetch("/api/user/tokens", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data has been fetched");
        setTokens(data.keys);
        return data;
      })
      .catch((e) => console.log("error, ", e));

    return result;
  };
  const deleteToken = async (key) => {
    console.log("running token delete");
    const token = await auth.currentUser?.getIdToken();
    const result = await fetch("/api/user/tokens/delete", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ key: key }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("token has been deleted");
        setTokens((current) =>
          current.filter((token) => {
            return token.key !== key;
          })
        );
        createToast("token has been deleted", {
          timeout: 10000,
          type: "dark",
          action: {
            text: "Dismiss",
            callback(toast) {
              toast.destroy();
            },
          },
        });
        return data;
      })
      .catch((e) => console.log("error, ", e));
    return result;
  };
  const createToken = async () => {
    console.log("running token create");
    const token = await auth.currentUser?.getIdToken();
    const result = await fetch("/api/user/tokens/create", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("token has been created");
        createToast("token has been created", {
          timeout: 10000,
          type: "dark",
          action: {
            text: "Dismiss",
            callback(toast) {
              toast.destroy();
            },
          },
        });
        setTokens((current) => [...current, data.key]);
        return data;
      })
      .catch((e) => console.log("error, ", e));
    return result;
  };

  const asyncHero = useAsync(async () => {
    if (false) {
      console.log("was loading");
      return [];
    } else {
      console.log("we is fetching");
      return fetchTokens();
    }
  }, []);

  return (
    <div className="flex flex-col items-start flex-1 p-5 space-y-4">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          API Keys
        </h3>
        <div className="mt-3 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setShowKeys(!showKeys)}
            className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showKeys ? (
              <EyeIcon className="h-6 text-gray-400" />
            ) : (
              <EyeOffIcon className="h-6 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => createToken()}
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Token
          </button>
        </div>
      </div>

      {asyncHero.loading && (
        <div className="flex flex-col space-y-3 ">
          {Array.from(Array(5).keys()).map(() => {
            return (
              <div className="flex flex-col space-y-1">
                <span className=" w-24 h-3 bg-gray-600  rounded-lg animate-pulse"></span>
                <div className="bg-black  h-14 w-[416px] rounded-lg flex items-center justify-between p-5">
                  <span className=" w-3/4 h-3 bg-gray-600 rounded-lg animate-pulse"></span>
                  <DuplicateIcon className="h-6 text-gray-600 hover:text-blue-500 transition-colors animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {asyncHero.error && <div>Error: {asyncHero.error.message}</div>}
      {asyncHero.result && (
        <div className="flex flex-col  max-w-md w-full space-y-2  ">
          <h1></h1>
          {tokens.map((item, index) => {
            return (
              <div className="space-y-1">
                <p className="font-medium">{item.name}</p>

                <div className="flex space-x-2">
                  <div className="w-full relative">
                    <input
                      value={item.key}
                      disabled
                      name="password"
                      id="password"
                      spellCheck={false}
                      type={showKeys ? "text" : "password"}
                      className={
                        "pr-10 pl-4 py-4 w-full font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-gray-800 border-2 hover:border-blue-500  transition-colors"
                      }
                    ></input>
                    <div className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(item.key);
                          createToast(`${item.name} copied to clipboard`, {
                            timeout: 10000,
                            type: "dark",
                            action: {
                              text: "Dismiss",
                              callback(toast) {
                                toast.destroy();
                              },
                            },
                          });
                          setCopiedId(index);
                        }}
                      >
                        {copiedId === index ? (
                          <CheckIcon className="h-6 text-blue-500" />
                        ) : (
                          <DuplicateIcon className="h-6 text-gray-400 hover:text-blue-500 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                  <button onClick={() => deleteToken(item.key)}>
                    <TrashIcon className="h-6 text-gray-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tokens;
