import { NextPage } from "next";
import { toast } from "react-toastify";


import {
  EyeIcon,
  EyeOffIcon,
  DuplicateIcon,
  CheckIcon,
  TrashIcon,
  RefreshIcon,
} from "@heroicons/react/outline";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Spinner from "@components/Spinner";
import { useTokens } from "@utils/swr/hooks";
import { useSWRConfig } from "swr";

const Tokens: NextPage = (props) => {
  const { mutate } = useSWRConfig();
  const [showKeys, setShowKeys] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [spin, setSpin] = useState(false);
  const [creatingToken, setCreatingToken] = useState(false);
  const { tokens, isLoading, isError, update } = useTokens(props.idToken);
  useEffect(() => {
    let timer1 = setTimeout(() => setCopiedId(""), 10000);
    return () => {
      clearTimeout(timer1);
    };
  }, [copiedId]);

  const deleteToken = async (key: string) => {
    await fetch("/api/user/tokens/delete", {
      headers: {
        Authorization: `Bearer ${props.idToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ key: key }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = tokens.keys.filter((token) => {
          return token.key !== key;
        });

        update({ ...{ keys: newData } });
        toast("🦄 token deleted", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((e) => console.log("error, ", e));
  };
  const createToken = async () => {
    setCreatingToken(true);
    const result = await fetch("/api/user/tokens/create", {
      headers: { Authorization: `Bearer ${props.idToken}` },
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.json();
      })
      .then((data) => {
        toast(
          <div className="">
            <h1 className="font-medium">Success!</h1>
            <p className="text-sm font-extralight">{data.message}</p>{" "}
          </div>,
          {
            type: "success",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        let newKey = data.key;
        update({ ...tokens, newKey });
        return data;
      })
      .catch((e) =>
        toast(
          <div className="">
            <h1 className=" text-sm">{e.error}</h1>
            <p className="text-xs font-extralight">{e.message}</p>{" "}
          </div>,
          {
            type: "error",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      );
    setCreatingToken(false);
    return result;
  };

  return (
    <div className="flex flex-col items-start space-y-4 p-5">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          API Keys
        </h3>
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">
          <button
            disabled={spin}
            type="button"
            onAnimationEnd={() => setSpin(false)}
            onClick={() => {
              setSpin(true);
              mutate(["/api/user/tokens", props.idToken]);
            }}
            className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
          >
            <RefreshIcon
              className={clsx(
                "h-6 text-gray-400 ",
                spin && "animate-spin-slow"
              )}
            />
          </button>
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
            disabled={creatingToken}
            onClick={() => createToken()}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Token
          </button>
        </div>
      </div>

      {isLoading && (
        // <Spinner color="blue" />
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
      {isError && <div>Error: {isError.message}</div>}
      {tokens && (
        <div className="flex flex-col  max-w-md w-full space-y-2  ">
          <h1></h1>
          {tokens.keys.map((item, index) => {
            return (
              <div key={index} className="space-y-1">
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
                          toast(`${item.name} copied to clipboard`, {
                          
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            type: "info"
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
