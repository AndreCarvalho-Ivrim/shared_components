import { CloseIcon } from '../../../utils/icons';
import { ReactNode } from 'react';
import { HeaderAside } from './HeaderAside';
import { FooterAside } from './FooterAside';
import { AsideLiItem } from './AsideLiItem';


export interface AsideItems {
  id: string,
  href?: string,
  onClick?: () => void,
  icon?: ReactNode,
  name: string,
  disabled?: boolean,
  items?: Omit<AsideItems, 'items'>[]
}
interface AsideProps {
  active?: string | string[],
  items: AsideItems[],
  dynamicItems: AsideItems[],
  isCollapsed?: boolean,
  dotColor?: string,
  module_name?: string
}

export const Aside = ({ active, items, dynamicItems, isCollapsed, dotColor, module_name }: AsideProps) => (

  <div className="
    w-full h-full max-sm:hidden
    group-[.expanded-aside]:max-sm:bg-gray-700/75
    group-[.expanded-aside]:max-sm:flex
    group-[.expanded-aside]:max-sm:absolute 
    group-[.expanded-aside]:max-sm:z-50
    group-[.expanded-aside]:max-sm:inset-y-0
  ">
    <aside className={`
      max-sm:bg-gray-900
      bg-gradient-aside
      
      sm:rounded-xl group
      max-sm:flex sm:flex 
      flex-col ${isCollapsed ? 'collapsed' : ''} 
      md:mx-0 h-full
      max-sm:w-[200px]
    `}>
      <HeaderAside {...{ dotColor, isCollapsed, module_name }} />
      <div className="flex flex-col justify-between flex-1">
        <ul className="
          p-4 md:p-5 mb-16
          group-[.collapsed]:p-4 group-[.collapsed-desktop-aside]:p-4
          text-white
        ">
          {items.map((item, i) => <AsideLiItem item={item} key={`${item.id}-${i}`} active={active} />)}
          {dynamicItems.length > 0 && (
            <div className="w-full h-[1px] my-3 bg-gray-50/50" />
          )}
          {dynamicItems.map((item) => <AsideLiItem item={item} key={item.id} active={active} />)}
        </ul>

        <FooterAside />
      </div>
    </aside>
    <div
      className="flex-1 hidden group-[.expanded-aside]:max-sm:flex items-start p-2.5"
      onClick={() => {
        let body = document.body;
        if (body) body.classList.remove('expanded-aside');
      }}
    >
      <button
        type="button"
        className="text-gray-200/70 rounded-full focus:ring-gray-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2"
      ><CloseIcon /></button>
    </div>
  </div>
);