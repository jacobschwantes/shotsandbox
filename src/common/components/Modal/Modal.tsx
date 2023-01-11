import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  content: { message: string };
  children?: React.ReactNode;
  heading?: string;
}
export default function Modal({ setOpen, open, content, children, heading = "Modal" }: ModalProps) {
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
          <div className="fixed inset-0 bg-zinc-800 backdrop-blur-sm bg-opacity-50 transition-opacity" />
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
              <Dialog.Panel className="relative bg-white border border-zinc-400 rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xl sm:w-full sm:p-6">
                <div className="space-y-4">
                  <h1 className="font-medium text-black text-lg">{heading}</h1>
                  <div className="space-y-5">
                    {children}
                    {/* <code className="text-zinc-200 text-sm break-words">
                      {content.message}
                    </code> */}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-zinc-400 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-blue-700 transition-all duration-300"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
