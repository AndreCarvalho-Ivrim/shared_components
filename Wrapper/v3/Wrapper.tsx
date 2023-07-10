import { ReactNode } from "react";
import { Header } from "./Header";
import { Aside, AsideItems } from "./Aside";
import { ButtonHelp } from "./ButtonHelp";

export interface HeaderBreadcrumbs{ name: string, href: string }
interface WrapperProps{
  breadcrumbs: HeaderBreadcrumbs[],
  asideItems: AsideItems[],
  dynamicAsideItems: AsideItems[],
  asideActive?: string | string[],
  children: ReactNode,
  module_name?: string,
}
export const Wrapper = ({ breadcrumbs, children, asideItems, dynamicAsideItems, asideActive, module_name }: WrapperProps) => (
  <div className="w-screen h-screen bg-background sm:p-4 !pr-0">
    <div className="
      grid max-w-[1496px] min-[1700px]:max-w-[85%] mx-auto h-full 
      sm:grid-cols-aside-collapsed md:grid-cols-aside-expanded-md 
      lg:grid-cols-aside-expanded
      group-[.collapsed-desktop-aside]:sm:grid-cols-aside-collapsed
    ">
      <Aside
        items={asideItems}
        dynamicItems={dynamicAsideItems}
        active={asideActive}
        module_name={module_name}
      />
      <div className="pr-8 py-8 pl-8 sm:pl-12 max-h-screen -my-4 overflow-y-auto">
        <Header breadcrumbs={breadcrumbs}/>

        {children}
        <div className="absolute bottom-8 right-4 flex flex-col justify-between z-50">
          <ButtonHelp/>
        </div>
      </div>
    </div>
  </div>
);