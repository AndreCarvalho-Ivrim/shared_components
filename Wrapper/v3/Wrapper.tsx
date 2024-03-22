import { ReactNode } from "react";
import { Header } from "./Header";
import { Aside, AsideItems } from "./Aside";
import { ButtonHelp } from "./ButtonHelp";
import { FooterAsideProps } from "./Aside/FooterAside";

export interface HeaderBreadcrumbs{
  name: string,
  href?: string,
  onClick?: () => void,
  subtitle?: string
}
interface WrapperProps{
  breadcrumbs: HeaderBreadcrumbs[],
  asideItems: AsideItems[],
  dynamicAsideItems: AsideItems[],
  asideActive?: string | string[],
  footerItems: FooterAsideProps['footerItems'],
  children: ReactNode,
  module_name?: string,
  omit: ('button-help' | 'header' | 'aside')[],
  goBack?: string
}
export const Wrapper = ({ breadcrumbs, children, asideItems, dynamicAsideItems, footerItems, asideActive, module_name, omit, goBack }: WrapperProps) => (
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
        footerItems={footerItems}
        goBack={goBack}
      />
      <div className="pr-8 py-8 pl-8 sm:pl-12 max-h-screen -my-4 overflow-y-auto" id="wrapper-content">
        {!omit.includes('header') && (
          <Header breadcrumbs={breadcrumbs}/>
        )}

        {children}
        {!omit.includes('button-help') && (
          <div className="absolute bottom-8 right-4 flex flex-col justify-between z-10">
            <ButtonHelp/>
          </div>
        )}
      </div>
    </div>
  </div>
);