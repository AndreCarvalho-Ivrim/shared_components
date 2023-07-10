import { Link, useNavigate } from "react-router-dom";

import { MenuCollapsedIcon, MenuIcon, NotificationIcon } from "../../utils/icons";
import { useNotify } from "../../../contexts/NotifyContext";
import { DropdownChooseEnterprise } from "./DropdownChooseEnterprise";
import { getUrls } from "../../services/conn/api";

interface HeaderProps{
  breadcrumbs: { name: string, href: string }[],
}
export const Header = ({ breadcrumbs } : HeaderProps) => {
  const { toast } = useNotify();
  const urls = getUrls('front')!;

  return (
    <header className="flex items-start max-sm:items-center justify-between gap-2 mb-10">
      <div>
        <div className="flex items-center gap-4 max-sm:scale-105 max-sm:ml-[2.5%]">
          <ul className="flex gap-1.5 text-primary-400 text-sm">
            {breadcrumbs.map((item) => (
              <li
                key={item.name}
                className="group last:font-semibold last:text-primary-800 truncate overflow-clip max-sm:max-w-[6rem]"
              >
                <span className="group-first:hidden mr-1.5">/</span>
                {item.href === '/' && !urls.wf ? (
                  <a href={urls.portal}>{item.name}</a>
                ) : (
                  <Link to={item.href}>{item.name}</Link>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="
              text-gray-200/70 rounded-lg
              focus:ring-gray-50/50 focus:outline-none 
              focus:ring-2 focus:ring-offset-2
              sm:max-md:hidden
            "
            onClick={() => {
              let body = document.body;
              if(body){
                if(window.innerWidth > 640){
                  body.classList.toggle('collapsed-desktop-aside');
                  body.classList.remove('expanded-aside');
                }else{
                  body.classList.remove('collapsed-desktop-aside');
                  body.classList.add('expanded-aside')
                }
              }
            }}
          >
            <MenuIcon className="
              md:hidden
              group-[.collapsed-desktop-aside]:md:block
            "/>
            <MenuCollapsedIcon className="
              max-md:hidden
              group-[.collapsed-desktop-aside]:md:hidden
            "/>
          </button>

        </div>
        
        <h1 className="text-primary-500 text-4xl font-bold mt-4 max-sm:hidden">{breadcrumbs[breadcrumbs.length - 1].name}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full"
          onClick={() => toast.warning('Em desenvolvimento')}
        >
          <NotificationIcon className="text-primary-800 max-sm:hidden"/>
        </button>

        <DropdownChooseEnterprise/>
      </div>
    </header>
  );
}