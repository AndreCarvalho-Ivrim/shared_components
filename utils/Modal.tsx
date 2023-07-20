import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalType{
  options: ModalOptionsType,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  children: ReactNode,
  zIndex?: 'z-0' | 'z-10' | 'z-20' | 'z-30' | 'z-40' | 'z-50'
}
export interface ModalOptionsType{
  title: string,
  type?: 'danger' | 'success' | null,
  size?: string,
  cancelButton?: boolean,
  cancelButtonText?: string,
  actionButton?: {
    theme: string,
    text?: string,
    className?: string,
    onClick: () => void,
    autoClose?: boolean
  }
}

const ModalIconDanger = () => (
  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
    <svg
      className="h-6 w-6 text-red-600"
      x-description="Heroicon name: outline/exclamation-triangle"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      ></path>
    </svg>
  </div>
);
export function Modal({
  children,
  isOpen,
  setIsOpen,
  options,
  zIndex = 'z-10'
}: ModalType) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root  show={isOpen} as={Fragment}>
      <Dialog  as="div" className={`relative ${zIndex}`} initialFocus={undefined} onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${
                options.size ? options.size : 'sm:w-full sm:max-w-lg'
              }`}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    { options.type && options.type == 'danger' ? <ModalIconDanger/> : <></>}
                    <div className={`mt-3 text-center sm:mt-0 ${ !!options.type ? 'sm:ml-4':'' } sm:text-left flex-1`}>
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">{ options.title }</Dialog.Title>
                      <div className="mt-2 -z-50">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>                              
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {options.actionButton && (
                    <button
                      type="button"
                      className={ options.actionButton.className ?? `
                        px-4 py-2
                        inline-flex justify-center
                        w-full sm:ml-3 sm:w-auto sm:text-sm
                        rounded-md border border-transparent 
                        bg-${options.actionButton.theme}-600 shadow-sm hover:bg-${options.actionButton.theme}-700
                        
                        text-base font-medium text-white
                        focus:outline-none focus:ring-2 focus:ring-${options.actionButton.theme}-500 focus:ring-offset-2
                      `} onClick={() => {
                        if(options.actionButton?.onClick) options.actionButton.onClick();
                        if(options.actionButton?.autoClose !== false) setIsOpen(false);
                      }}
                    >{options.actionButton.text ?? 'Finalizar'}</button>
                  )}
                  {options.cancelButton !== false && (
                    <button
                      type="button"
                      className="
                        mt-3 px-4 py-2
                        w-full sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                        inline-flex justify-center
                        rounded-md border border-gray-300
                        bg-white shadow-sm hover:bg-gray-50
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2                        
                        text-base font-medium text-gray-700
                      "
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                    >{options.cancelButtonText ?? 'Cancelar'}</button>
                  )}
                </div>
                <div className="hidden h-0 w-0"  id="load-classes-backgrounds-by-theme">
                  <span className="
                    bg-primary-600
                    hover:bg-primary-700
                    focus:ring-primary-500
                  "/><span className="
                    bg-danger-600
                    hover:bg-danger-700
                    focus:ring-danger-500
                  "/><span className="
                    bg-warning-600
                    hover:bg-warning-700
                    focus:ring-warning-500
                  "/><span className="
                    bg-success-600
                    hover:bg-success-700
                    focus:ring-success-500
                  "/><span className="
                    bg-info-600
                    hover:bg-info-700
                    focus:ring-info-500
                  "/><span className="
                    bg-red-600
                    hover:bg-red-700
                    focus:ring-red-500
                  "/>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
