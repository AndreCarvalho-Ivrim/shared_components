import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon } from './icons'

interface SlideOverProps{
  refContainer?: React.RefObject<HTMLDivElement>,
  full?: boolean,
  title?: string | ReactNode,
  /** Válido apenas se !!title */
  subtitle?: ReactNode,
  header?: {
    content: ReactNode,
    mode: 'append' | 'prepend' | 'overwrite'
  },
  children: ReactNode,
  isOpen: boolean,
  onClose: () => void,
  classNames?:{
    wrapper?: string,
    container?: string
  }
}
export const SlideOver = ({ title, subtitle, children, header, isOpen, onClose, full, refContainer, classNames }: SlideOverProps) => (
  <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10`}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className={`pointer-events-auto relative w-screen ${
                classNames?.wrapper ?? (
                  full ? 'w-full':'max-w-md'
                )
              }`}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <CloseIcon/>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl" ref={refContainer}>
                  {header ? (
                    <>
                      {header.mode === 'overwrite' ? header.content : (
                        <>
                          {header.mode === 'prepend' && header.content}
                          {title && (
                            <div className="px-4 sm:px-6">
                              <Dialog.Title className="text-lg font-semibold text-gray-800">{ title }</Dialog.Title>
                              {subtitle && (
                                <span className='flex items-center gap-1 text-xs text-gray-500 -mt-0.5'>
                                  {subtitle}
                                </span>
                              )}
                            </div>
                          )}
                          {header.mode === 'append' && header.content}
                        </>
                      )}
                    </>
                  ):(
                    <>
                      {title && (
                        <div className="px-4 sm:px-6">
                          <Dialog.Title className="text-lg font-semibold text-gray-800">{ title }</Dialog.Title>
                        </div>
                      )}
                    </>
                  )}
                  <div className={classNames?.container ?? "relative mt-4 flex-1 px-4 sm:px-6"}>
                    { children }
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)