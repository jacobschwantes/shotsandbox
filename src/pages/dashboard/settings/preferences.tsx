import { NextPage } from "next";
import { useEffect, useState } from "react";
import SettingsLayout from "@layouts/SettingsLayout";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { User } from "firebase/auth";
import { usePreferences } from "@hooks/swr";
import Spinner from "@components/Spinner";
import { isEqual } from "lodash";
import { mutate } from "swr";
import { toast } from "react-toastify";
const themeOptions = [
  {
    id: "system",
    title: "System preference",
  },
  {
    id: "light",
    title: "Light",
  },
  {
    id: "dark",
    title: "Dark",
  },
];
interface PreferencesProps {
  idToken: string;
  user: User;
}

const Account: NextPage<PreferencesProps> = ({ idToken }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [emailOptions, setEmailOptions] = useState({
    billing: true,
    marketing: true,
    transactional: true,
  });
  const { data, isLoading, isError } = usePreferences(idToken);

  useEffect(() => {
    const foundOption = themeOptions.find(
      (option) => option.id === data.preferences.theme
    );
    foundOption && setSelectedTheme(foundOption);
    data.preferences.email && setEmailOptions({ ...data.preferences.email });
  }, [data]);

  const saveChanges = async () => {
    setIsSaving(true);
    const options = {
      email: emailOptions,
      theme: selectedTheme.id,
    };
    await fetch(`/api/user/preferences`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(options),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.json();
      })
      .then((data) => {
        mutate(["/api/user/preferences", idToken]);
        toast(
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <span>
              <h1 className=" font-medium">Success</h1>
              <p className="text-sm font-extralight">{data.message}</p>
            </span>
          </div>,
          {
            theme: "dark",
            progressClassName: "toastProgressBlue",
          }
        );
      })
      .catch((e) =>
        toast(
          <div className="flex items-center space-x-3">
            <span>
              <h1 className=" font-medium">Failed</h1>
              <p className="text-sm font-extralight">{e.message}</p>
            </span>
          </div>,
          {
            type: "error",
          }
        )
      );
    setIsSaving(false);
  };
  return (
    <div className="flex-1  p-5 h-full overflow-y-auto ">
      <SettingsLayout>
        {isLoading ? (
          <Spinner className="h-5" />
        ) : (
          <div className="max-w-4xl space-y-6 ">
            <RadioGroup value={selectedTheme} onChange={setSelectedTheme}>
              <RadioGroup.Label className="text-sm">
                <h1 className="font-medium text-zinc-300">Theme</h1>
                <p className="text-zinc-400">Select UI theme preference</p>
              </RadioGroup.Label>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {themeOptions.map((theme) => (
                  <RadioGroup.Option key={theme.id} value={theme}>
                    {({ checked, active }) => (
                      <div className="space-y-2">
                        <div
                          className={clsx(
                            checked ? "outline-blue-600" : "outline-zinc-800",

                            "relative outline rounded-xl shadow-sm cursor-pointer focus:outline-none "
                          )}
                        >
                          {theme.title === "System preference" ? (
                            <div className="">
                              <div className="w-1/2 overflow-hidden h-full absolute">
                                <div
                                  className={clsx(
                                    false ? "bg-zinc-900" : "  bg-zinc-200",
                                    "pt-4 px-4  sm:w-[286px]  h-full aspect-video rounded-xl flex flex-col absolute  "
                                  )}
                                >
                                  <div
                                    className={clsx(
                                      false ? "bg-black" : "bg-white",
                                      "flex-1 rounded-t-lg flex flex-col"
                                    )}
                                  >
                                    <div
                                      className={clsx(
                                        false
                                          ? "border-zinc-800"
                                          : "border-zinc-200",
                                        "w-full border-b flex p-2"
                                      )}
                                    >
                                      <div className="flex space-x-1">
                                        <div className="bg-red-500 h-1.5 w-1.5 rounded-full" />
                                        <div className="bg-yellow-500 h-1.5 w-1.5 rounded-full" />
                                        <div className="bg-green-500 h-1.5 w-1.5 rounded-full" />
                                      </div>
                                    </div>
                                    <div
                                      className={clsx(
                                        false
                                          ? "divide-zinc-800"
                                          : "divide-zinc-200",
                                        "flex w-full flex-1 divide-x"
                                      )}
                                    >
                                      <div className="flex flex-col space-y-2 w-1/5 p-2">
                                        {Array.from(Array(5)).map((item) => (
                                          <div
                                            key={item}
                                            className={clsx(
                                              false
                                                ? "bg-zinc-800"
                                                : "bg-zinc-200",
                                              "w-full h-1.5 rounded-full"
                                            )}
                                          />
                                        ))}
                                      </div>
                                      <div className="flex flex-col pt-2 px-2 flex-1 space-y-2">
                                        <div className="flex justify-between">
                                          <div
                                            className={clsx(
                                              false
                                                ? "bg-zinc-800"
                                                : "bg-zinc-200",
                                              "w-1/2 h-1.5 rounded-full"
                                            )}
                                          />
                                          <div
                                            className={clsx(
                                              false
                                                ? "bg-zinc-800"
                                                : "bg-zinc-300",
                                              "w-1/5 h-2.5 bg-zinc-800 rounded-sm"
                                            )}
                                          />
                                          <div
                                            className={clsx(
                                              false
                                                ? "bg-zinc-800"
                                                : "bg-zinc-200",
                                              "w-1/5 h-2.5 bg-zinc-700 rounded-sm"
                                            )}
                                          />
                                        </div>
                                        <div
                                          className={clsx(
                                            false
                                              ? "bg-zinc-800"
                                              : "bg-zinc-200",
                                            "rounded-t w-full flex-1"
                                          )}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>{" "}
                              </div>
                              <div
                                className={clsx(
                                  true ? "bg-zinc-900" : "  bg-zinc-200",
                                  "pt-4 px-4  w-full aspect-video rounded-xl flex flex-col "
                                )}
                              >
                                <div
                                  className={clsx(
                                    true ? "bg-black" : "bg-white",
                                    "flex-1 rounded-t-lg flex flex-col"
                                  )}
                                >
                                  <div
                                    className={clsx(
                                      true
                                        ? "border-zinc-800"
                                        : "border-zinc-200",
                                      "w-full border-b flex p-2"
                                    )}
                                  >
                                    <div className="flex space-x-1">
                                      <div className="bg-red-500 h-1.5 w-1.5 rounded-full" />
                                      <div className="bg-yellow-500 h-1.5 w-1.5 rounded-full" />
                                      <div className="bg-green-500 h-1.5 w-1.5 rounded-full" />
                                    </div>
                                  </div>
                                  <div
                                    className={clsx(
                                      true
                                        ? "divide-zinc-800"
                                        : "divide-zinc-200",
                                      "flex w-full flex-1 divide-x"
                                    )}
                                  >
                                    <div className="flex flex-col space-y-2 w-1/5 p-2">
                                      {Array.from(Array(5)).map((item) => (
                                        <div
                                          key={item}
                                          className={clsx(
                                            true
                                              ? "bg-zinc-800"
                                              : "bg-zinc-200",
                                            "w-full h-1.5 rounded-full"
                                          )}
                                        />
                                      ))}
                                    </div>
                                    <div className="flex flex-col pt-2 px-2 flex-1 space-y-2">
                                      <div className="flex justify-between">
                                        <div
                                          className={clsx(
                                            true
                                              ? "bg-zinc-800"
                                              : "bg-zinc-200",
                                            "w-1/2 h-1.5 rounded-full"
                                          )}
                                        />
                                        <div
                                          className={clsx(
                                            true
                                              ? "bg-zinc-800"
                                              : "bg-zinc-300",
                                            "w-1/5 h-2.5 bg-zinc-800 rounded-sm"
                                          )}
                                        />
                                        <div
                                          className={clsx(
                                            true
                                              ? "bg-zinc-800"
                                              : "bg-zinc-200",
                                            "w-1/5 h-2.5 bg-zinc-700 rounded-sm"
                                          )}
                                        />
                                      </div>
                                      <div
                                        className={clsx(
                                          true ? "bg-zinc-800" : "bg-zinc-200",
                                          "rounded-t w-full flex-1"
                                        )}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={clsx(
                                theme.title === "Dark"
                                  ? "bg-zinc-900"
                                  : "bg-zinc-200",
                                "pt-4 px-4  w-full aspect-video rounded-xl flex flex-col"
                              )}
                            >
                              <div
                                className={clsx(
                                  theme.title === "Dark"
                                    ? "bg-black"
                                    : "bg-white",
                                  "flex-1 rounded-t-lg flex flex-col"
                                )}
                              >
                                <div
                                  className={clsx(
                                    theme.title === "Dark"
                                      ? "border-zinc-800"
                                      : "border-zinc-200",
                                    "w-full border-b flex p-2"
                                  )}
                                >
                                  <div className="flex space-x-1">
                                    <div className="bg-red-500 h-1.5 w-1.5 rounded-full" />
                                    <div className="bg-yellow-500 h-1.5 w-1.5 rounded-full" />
                                    <div className="bg-green-500 h-1.5 w-1.5 rounded-full" />
                                  </div>
                                </div>
                                <div
                                  className={clsx(
                                    theme.title === "Dark"
                                      ? "divide-zinc-800"
                                      : "divide-zinc-200",
                                    "flex w-full flex-1 divide-x"
                                  )}
                                >
                                  <div className="flex flex-col space-y-2 w-1/5 p-2">
                                    {Array.from(Array(5)).map((item) => (
                                      <div
                                        key={item}
                                        className={clsx(
                                          theme.title === "Dark"
                                            ? "bg-zinc-800"
                                            : "bg-zinc-200",
                                          "w-full h-1.5 rounded-full"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex flex-col pt-2 px-2 flex-1 space-y-2">
                                    <div className="flex justify-between">
                                      <div
                                        className={clsx(
                                          theme.title === "Dark"
                                            ? "bg-zinc-800"
                                            : "bg-zinc-200",
                                          "w-1/2 h-1.5 rounded-full"
                                        )}
                                      />
                                      <div
                                        className={clsx(
                                          theme.title === "Dark"
                                            ? "bg-zinc-800"
                                            : "bg-zinc-300",
                                          "w-1/5 h-2.5 bg-zinc-800 rounded-sm"
                                        )}
                                      />
                                      <div
                                        className={clsx(
                                          theme.title === "Dark"
                                            ? "bg-zinc-800"
                                            : "bg-zinc-200",
                                          "w-1/5 h-2.5 bg-zinc-700 rounded-sm"
                                        )}
                                      />
                                    </div>
                                    <div
                                      className={clsx(
                                        theme.title === "Dark"
                                          ? "bg-zinc-800"
                                          : "bg-zinc-200",
                                        "rounded-t w-full flex-1"
                                      )}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <span
                            className={clsx(
                              checked && "bg-white",
                              "absolute top-0 right-0 translate-x-0.5 -translate-y-1"
                            )}
                          >
                            <CheckCircleIcon
                              className={clsx(
                                !checked ? "invisible" : "",
                                "h-6 w-6 text-blue-600 -m-1.5"
                              )}
                              aria-hidden="true"
                            />{" "}
                          </span>
                        </div>
                        <p className="text-zinc-200 text-sm  font-medium">
                          {theme.title}
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            <fieldset className="border-b border-zinc-800">
              <legend className="sr-only">Email preferences</legend>

              <div className="divide-y divide-zinc-800">
                <div className="text-sm pb-4">
                  <h1 className="font-medium text-zinc-300">Email</h1>
                  <p className="text-zinc-400">
                    Select email messaging preferences
                  </p>
                </div>

                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="marketing-news"
                      className="font-medium text-zinc-300"
                    >
                      Marketing & News
                    </label>
                    <p
                      id="marketing-news-description"
                      className="text-zinc-400"
                    >
                      Get notified when new features release or when there are
                      major changes to the platform.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      checked={emailOptions.marketing}
                      onChange={() =>
                        setEmailOptions({
                          ...emailOptions,
                          marketing: !emailOptions.marketing,
                        })
                      }
                      id="marketing-news"
                      aria-describedby="marketing-news-description"
                      name="marketing-news"
                      type="checkbox"
                      className="form-checkbox focus:ring-blue-600 focus:ring-offset-black h-4 w-4 text-blue-600 border-zinc-900 rounded bg-zinc-800"
                    />
                  </div>
                </div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="transactional"
                      className="font-medium text-zinc-300"
                    >
                      Transactional
                    </label>
                    <p id="trnsactional-description" className="text-zinc-400">
                      Get notified when you run out of quota and when changes
                      are made to your account.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      onChange={() =>
                        setEmailOptions({
                          ...emailOptions,
                          transactional: !emailOptions.transactional,
                        })
                      }
                      checked={emailOptions.transactional}
                      id="transactional"
                      aria-describedby="transactional-description"
                      name="transactional"
                      type="checkbox"
                      className="form-checkbox focus:ring-blue-600 focus:ring-offset-black h-4 w-4 text-blue-600 border-zinc-900 rounded bg-zinc-800"
                    />
                  </div>
                </div>
                <div className="relative flex items-start py-4">
                  <div className="min-w-0 flex-1 text-sm">
                    <label
                      htmlFor="billing"
                      className="font-medium text-zinc-300"
                    >
                      Billing
                    </label>
                    <p id="billing-description" className="text-zinc-400">
                      Get notified when quota resets and when new invoices are
                      available.
                    </p>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    <input
                      onChange={() =>
                        setEmailOptions({
                          ...emailOptions,
                          billing: !emailOptions.billing,
                        })
                      }
                      checked={emailOptions.billing}
                      id="billing"
                      aria-describedby="billing-description"
                      name="billing"
                      type="checkbox"
                      className="form-checkbox focus:ring-blue-600 focus:ring-offset-black h-4 w-4 text-blue-600 border-zinc-900 rounded bg-zinc-800"
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {(!isEqual(data.preferences.email, emailOptions) ||
              !isEqual(data.preferences.theme, selectedTheme.id)) && (
              <div className=" py-3 bg-gray-50 dark:bg-black text-right">
                <button
                  disabled={isSaving}
                  type="button"
                  onClick={saveChanges}
                  className="bg-blue-600  border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {isSaving ? <Spinner className="h-5" /> : <span>Save</span>}
                </button>
              </div>
            )}
          </div>
        )}
      </SettingsLayout>
    </div>
  );
};

export default Account;
