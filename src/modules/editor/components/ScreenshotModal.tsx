import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "@components/Spinner";
interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  handleSubmit: (options: {
    width: string;
    height: string;
    token: string;
    url: string;
  }) => void;
  isLoading: boolean;
}
export default function ScreenshotModal({
  setOpen,
  open,
  handleSubmit,
  isLoading
}: ModalProps) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [token, setToken] = useState("");
  const [url, setUrl] = useState("");
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-800 backdrop-blur-sm bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-black border border-zinc-900 rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full sm:p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit({ width, height, url, token });
                  }}
                  className="space-y-4"
                >
                  <h1 className="font-medium text-white text-lg">Screenshot</h1>

                  <div className="space-y-2">
                    <h1 className="block text-sm font-medium text-zinc-100 ">
                      URL
                    </h1>
                    <input
                      required
                      placeholder="www.example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      type="text"
                      className="appearance-none form-input focus:outline-none flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <h1 className="block text-sm font-medium text-zinc-100">
                      Token
                    </h1>
                    <input
                      required
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      type="text"
                      className="appearance-none form-input focus:outline-none flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                    />
                  </div>
                  <div className="flex space-x-5 items-end">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-100"
                      >
                        Width
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          placeholder="1920"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          type="number"
                          name="email"
                          id="email"
                          className="form-input flex w-full justify-between focus:outline-none items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                        />
                      </div>
                    </div>
                    <p className="font-medium text-zinc-300 text-lg pb-2">x</p>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-100"
                      >
                        Height
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          placeholder="1080"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          type="number"
                          name="email"
                          id="email"
                          className="appearance-none form-input focus:outline-none flex w-full justify-between items-center space-x-2 border border-zinc-800 hover:border-blue-500 text-zinc-200 bg-zinc-900 hover:bg-blue-900 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 px-4 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-zinc-900 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-zinc-900"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                    disabled={isLoading}
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 "
                    >
                      {isLoading ? <span>Loading</span> : <span>Take Screenshot</span>} {isLoading && <Spinner className="h-4 w-4 ml-2" />}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
