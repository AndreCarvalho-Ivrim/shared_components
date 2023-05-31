import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from './icons';

interface DropdownType {
  children: ReactNode[] | ReactNode | undefined,
  trigger?: ReactNode,
  triggerText?: string,
  orientation?: 'left' | 'right' | null,
  classNames?: {
    wrapper?: string,
    list?: string,
    button?: string
  },
  styles?: {
    wrapper?: React.CSSProperties,
    list?: React.CSSProperties,
    button?: React.CSSProperties
  }
  activeClass?: string
}
export const Dropdown = ({
  children,
  trigger,
  triggerText,
  orientation = 'right',
  classNames,
  styles,
  activeClass
}: DropdownType) => {
  return (
  <Menu as="div" className={ classNames?.wrapper ?? "relative inline-block text-left"} style={styles?.wrapper ?? {}}>
    <div>
      <Menu.Button className={
        trigger ? (classNames?.button ?? '') : (
          classNames?.button ? classNames.button : "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        )
      } style={styles?.button ?? {}}>
        {trigger ? trigger : (
          <>
            {triggerText ?? 'Options'}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5"/>
          </>
        )}
      </Menu.Button>
    </div>
    {children && (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={classNames?.list ?? `
          absolute ${orientation ? orientation + '-0' : ''} z-10
          mt-2 w-56 origin-top-right
          rounded-md bg-white shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none pb-2
        `} style={styles?.list ?? {}}>
          <div className="py-1">
            {Array.isArray(children) ? children.map((item, i) => {
              if(!item) return null;
              return (
                <Menu.Item key={i}>
                  {/* @ts-ignore */}
                  {({ active }) => (
                    <div className={`block p-2 pb-0 text-sm ${
                      active ? 
                        activeClass ?? 'text-gray-900' :
                        'text-gray-700'
                      }`
                    }>{item}</div>
                  )}
                </Menu.Item>
              )
            }) : (
              <Menu.Item>
                {/* @ts-ignore */}
                {({ active }) => (
                  <div className={`block p-2 pb-0 text-sm ${
                    active ? 
                      activeClass ?? 'text-gray-900' :
                      'text-gray-700'
                    }`
                  }>{children}</div>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    )}
  </Menu> 
  );
}