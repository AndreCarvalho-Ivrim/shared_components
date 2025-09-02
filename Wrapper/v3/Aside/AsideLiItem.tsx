import { Link } from 'react-router-dom';
import { ArrowRightIcon, SearchIcon } from '../../../utils/icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AsideItems } from '.';
import { Tooltip } from 'flowbite-react';
import { Modal } from '../../../utils/Modal';

interface AsideLiItemProps{
  item: AsideItems,
  active?: string | string[],
  depth?: number,
  overwriteClassNames?: {
    button_wrapper?: string,
    content?: string
  }
  onClick?: () => void
}
export const AsideLiItem = ({ item, active, depth = 0, overwriteClassNames, onClick: wrapperOnClick }:AsideLiItemProps) => {
  const liRef = useRef<HTMLLIElement>(null);
  const { disabled, onClick, href: to, items } = item;
  const isSubItem = depth > 0;

  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function handleShowAllOptions(){
    setShowMoreOptions(true);
  }

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
      <span className={`
        hidden group-[.active]/item:block
        h-5 bg-white/95 w-1 
        rounded-lg left-0 -translate-x-1/2 my-0.5
        absolute
      `}></span>
    )}
    <span className="font-semibold">  
      {isSubItem ? (
        <Tooltip
          trigger="hover"
          content={item.name}
        >
          <span className="
          bg-gray-300 group-[.active]/item w-1.5 h-1.5 rounded-full mx-auto
            sm:block md:hidden
            group-[.collapsed]:block
            group-[.collapsed-desktop-aside]:block
          "/>
        </Tooltip>
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
    <span className={overwriteClassNames?.content ?? `
      sm:hidden md:inline
      group-[.collapsed]:hidden
      group-[.collapsed-desktop-aside]:hidden
      truncate text-white
    `}>{item.name}</span>
  </>;

  return (
    <li ref={liRef} className={`group/item ${item.name === currentActive ? (
      `active ${items ? 'bg-white/25 rounded-lg expanded':''}`
      ): ''} ${!isSubItem && 'py-1'}
    `}>
      {to && !disabled ? (
        <>
          {to.slice(0, 4) === 'http' ? (
            <button
              type="button"
              className={overwriteClassNames?.button_wrapper ?? className}
              onClick={() => {
                if(wrapperOnClick) wrapperOnClick()
                window.location.href = to
              }}
            >{content}</button>
          ):(
            <Link className={overwriteClassNames?.button_wrapper ?? className} to={to} onClick={wrapperOnClick}>
              {content}
            </Link>
          )}
        </>
      ) : items && !disabled ? (
        <>
          <button type="button" className={overwriteClassNames?.button_wrapper ?? className} onClick={() => {
            if(!liRef.current) return;

            liRef.current.classList.toggle('expanded')
          }}>
            {content}
            <ArrowRightIcon className="
              group-[.expanded]/item:rotate-90
              sm:hidden md:block
              group-[.collapsed]:hidden
              group-[.collapsed-desktop-aside]:hidden
              ml-auto
            "/>
          </button>
          <SubItems
            items={items}
            item={item}
            currentActive={currentActive}
            active={active}
            depth={depth}
          />
          {items.length > 5 && (
            <button
              type="button"
              className="
                relative hidden group-[.expanded]/item:flex gap-2 items-center justify-center
                w-full px-3 py-1 -mb-1 rounded-b-lg
                brightness-90
                text-xs text-center
                bg-gray-100/20 hover:bg-gray-100/30 font-semibold
              "
              onClick={handleShowAllOptions}
            >Ver mais</button>
          )}
        </>
      ) : (
        <button type="button" {...{ className, onClick }} disabled={disabled}>
          {content}
        </button>
      )}

      {!!items?.length && showMoreOptions && (
        <ModalMoreOptions
          items={items}
          setShowMoreOptions={setShowMoreOptions}
          showMoreOptions={showMoreOptions}
          depth={depth}
        />
      )}
    </li>
  );
}

interface SubItemsProps{
  items: Omit<AsideItems, "items">[],
  currentActive: string | undefined,
  active: string | string[] | undefined,
  depth: number,
  item: AsideItems,
}
const SubItems = ({ items, currentActive, active, depth, item }:SubItemsProps) => {
  const nextActive = Array.isArray(active) ? (
    (depth + 1) < active.length ? active[depth + 1] : active[active.length - 1]
  ) : active;

  const recentsStorageKey = `options-accessed-from-${item.id}`;

  const { orderedItems } = useMemo(() => {
    if(items.length <= 5) return { orderedItems: items };

    let itemUnderscoreId : Omit<AsideItems, "items"> | undefined = undefined;
    let itemActive : Omit<AsideItems, "items"> | undefined = undefined;
    let recentItem : Omit<AsideItems, "items">[] = [];
    let notActiveOrRecent : Omit<AsideItems, "items">[] = [];

    const recents : string[] = getRecentAccess();

    const orderedItems : Omit<AsideItems, "items">[] = [];
    items.forEach(subItem => {
      if(subItem.id.slice(-3) === '--_'){
        orderedItems.push(subItem);
        return;
      }
      if((item.name === currentActive || subItem.name === currentActive) && subItem.name === nextActive){
        itemActive = subItem;
        return;
      }
      
      if(recents.length){
        const index = recents.findIndex((r) => r === subItem.id);
        if(index > -1){
          recentItem[index] = subItem;
          return;
        }
      }

      notActiveOrRecent.push(subItem);
    })

    if(itemUnderscoreId) orderedItems.push(itemUnderscoreId);
    if(itemActive) orderedItems.push(itemActive)

    for(const rec of recentItem){
      if(orderedItems.length >= 4) break;
      if(rec) orderedItems.push(rec);
    }

    if(orderedItems.length < 4) orderedItems.push(
      ...notActiveOrRecent.slice(0, 4 - orderedItems.length)
    )

    return { orderedItems };
  },[items, item, active])
  
  function getRecentAccess() : string[]{
    try{
      const opts = sessionStorage.getItem(recentsStorageKey) ?? '';
      return opts.split(',').filter(o => !!o);
    }catch(e){ return []; }
  }
  function handlePushAccess(id: string){
    let recents = getRecentAccess();

    if(recents.includes(id)) recents = recents.filter((r) => r !== id);

    recents.unshift(id);

    sessionStorage.setItem(recentsStorageKey, recents.slice(0,4).join(','));
  }

  return (
    <ul className="
      hidden group-[.expanded]/item:block md:pl-4 py-1 max-sm:group-[.expanded-aside]:pl-4
      group-[.collapsed]:p-0 group-[.collapsed-desktop-aside]:p-0
      text-white
    ">
      {orderedItems.map((subitem, i) => (
        <AsideLiItem
          item={subitem} key={`${subitem.id}-${i}`}
          active={item.name === currentActive ? active : undefined}
          depth={depth + 1}
          onClick={() => handlePushAccess(subitem.id)}
        />
      ))}
    </ul>
  )
}
interface ModalMoreOptionsProps{
  showMoreOptions: boolean
  setShowMoreOptions: React.Dispatch<React.SetStateAction<boolean>>,
  items: Omit<AsideItems, "items">[],
  depth: number
}
const ModalMoreOptions = ({ items, setShowMoreOptions, showMoreOptions, depth }:ModalMoreOptionsProps) => {
  const [typing, setTyping] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(typing);
    }, 400);

    return () => clearTimeout(delay);
  })

  const itemsFiltered = useMemo(() => {
    if(!search) return items;
    return items.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);
  
  return (
    <Modal
      isOpen={showMoreOptions}
      options={{
        bg: { panel: 'bg-transparent', dialog: 'bg-gray-100/30' },
        classNames: { 
          footer: '!hidden'
        }
      }}
      setIsOpen={() => setShowMoreOptions(false)}
    >
      <div className="-mt-2 mb-4 relative">
        <input
          type="text"
          id="simple-search"
          className="
            bg-gray-100/40 backdrop-blur-[25px]
            
            border-gray-400/40
            text-gray-600 text-sm rounded-lg 

            focus:ring-gray-100/20 focus:border-gray-100/20 w-full pr-10 px-2.5 py-2
          "
          value={typing}
          onChange={(e) => setTyping(e.target.value)}
          placeholder="Pesquisar..."
        />

        <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 absolute inset-y-0 right-2 my-auto"/>
      </div>
      <div className="grid grid-cols-2 gap-2 list-none text-gray-700">
        {itemsFiltered.map((subitem, i) => (
          <AsideLiItem
            item={subitem}
            key={`${subitem.id}-${i}`}
            depth={depth + 1}
            overwriteClassNames={{ 
              button_wrapper: 'relative flex gap-2 items-center bg-gray-200/30 hover:bg-gray-100/40 px-2 py-1.5 rounded-lg font-semibold text-sm',
              content: 'truncate text-gray-700'
            }}
            onClick={() => setShowMoreOptions(false)}
          />
        ))}
      </div>
    </Modal>
  )
}