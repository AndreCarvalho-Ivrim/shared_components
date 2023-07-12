import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../../../utils/icons';
import { useRef } from 'react';
import { AsideItems } from '.';

export const AsideLiItem = ({ item, active, depth = 0 }: { item: AsideItems, active?: string | string[], depth?: number }) => {
  const liRef = useRef<HTMLLIElement>(null);
  const { disabled, onClick, href: to, items } = item;
  const isSubItem = depth > 0;
  const currentActive = Array.isArray(active) ? (
    depth < active.length ? active[depth] : active[active.length - 1]
  ) : active;
  const className = `
    relative flex gap-2 items-center
    sm:justify-center md:justify-start
    group-[.collapsed]:justify-center group-[.collapsed-desktop-aside]:justify-center
    w-full px-3 py-1.5 rounded-lg

    ${isSubItem && `
      ${item.name === currentActive ? 'font-semibold':' brightness-90'}
      text-sm
    `}
    ${!items && !isSubItem && `
      hover:bg-white/20
      group-[.active]/item:bg-white/30
    `}
    disabled:hover:bg-transparent

    disabled:opacity-50
    disabled:cursor-default
  `;

  const content = <>
    {!items && !isSubItem && (
      <span className="
        hidden group-[.active]/item:block
        h-5 bg-white/95 w-1 
        rounded-lg left-0 -translate-x-1/2 my-0.5
        absolute
      "></span>
    )}
    <span className="font-semibold">  
      {isSubItem ? (
        <span className="
        bg-gray-300 group-[.active]/item w-1.5 h-1.5 rounded-full mx-auto
          sm:block md:hidden
          group-[.collapsed]:block
          group-[.collapsed-desktop-aside]:block
        "/>
      ) : item.icon ?? (
        <div className={`
          flex items-center justify-center
          w-[22px] h-[22px] leading-[-1]
          border-2 border-gray-300 rounded-full
          text-[10px] text-white font-semibold 
          ${isSubItem ? `
            sm:hidden md:flex
            group-[.collapsed]:hidden
            group-[.collapsed-desktop-aside]:hidden
          ` : ''}
        `}>{item.name.substring(0,1)}</div>
      )}
    </span>
    <span className="
      sm:hidden md:inline
      group-[.collapsed]:hidden
      group-[.collapsed-desktop-aside]:hidden
      truncate text-white
    ">{item.name}</span>
  </>;

  return (
    <li ref={liRef} className={`group/item ${item.name === currentActive ? (
      `active ${items ? 'bg-white/25 rounded-lg expanded':''}`
      ): ''} ${!isSubItem && 'py-1'}
    `}>
      {to && !disabled ? (
        <Link {...{className, to }}>
          {content}
        </Link>
      ) : items && !disabled ? (
        <>
          <button type="button" className={className} onClick={() => {
            if(!liRef.current) return;

            liRef.current.classList.toggle('expanded')
          }}>
            {content}
            <ArrowRightIcon className="
              group-[.expanded]/item:rotate-90
              sm:hidden md:block
              group-[.collapsed]:hidden
              group-[.collapsed-desktop-aside]:hidden
            "/>
          </button>
          <ul className="
            hidden group-[.expanded]/item:block md:pl-4 py-1 max-sm:group-[.expanded-aside]:pl-4
            group-[.collapsed]:p-0 group-[.collapsed-desktop-aside]:p-0
            text-white
          ">
            {items.map((subitem, i) => (
              <AsideLiItem item={subitem} key={`${subitem.id}-${i}`} active={active} depth={depth + 1}/>
            ))}
          </ul>  
        </>
      ) : (
        <button type="button" {...{ className, onClick }} disabled={disabled}>
          {content}
        </button>
      )}
    </li>
  );
}