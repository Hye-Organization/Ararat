"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Modal({ open, onClose, title, children, mute, size }) {
  useEffect(() => {
    if (open && !mute) {
      let openSound = new Audio("/sounds/openPopup.wav");
      openSound.play();
    }
  }, [open]);
  return (
    <Transition show={open}>
      <Dialog
        className="relative z-50"
        onClose={() => {
          if (!mute) {
            let closeSound = new Audio("/sounds/closePopup.wav");
            closeSound.play();
          }
          onClose();
        }}
      >
        <TransitionChild
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-75 transition-all" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-150"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-90"
              enterTo="opacity-150 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
            >
              <DialogPanel
                className={`relative transform overflow-hidden rounded-lg bg-slate-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-${
                  size ?? "lg"
                } sm:p-6`}
              >
                <div className="sm:items-start">
                  <div className="text-center sm:mt-0 sm:text-left">
                    <div className="flex">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-white my-auto"
                      >
                        {title}
                      </DialogTitle>
                      <button
                        type="button"
                        className="rounded-md bg-slate-900 text-gray-400 hover:text-gray-500  active:scale-90 transition-all ml-auto my-auto"
                        onClick={() => {
                          if (!mute) {
                            let closeSound = new Audio(
                              "/sounds/closePopup.wav"
                            );
                            closeSound.play();
                          }
                          onClose();
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-2">{children}</div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
