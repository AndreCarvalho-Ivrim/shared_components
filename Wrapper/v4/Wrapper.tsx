import { ReactNode } from "react"
import bkg from "../../../assets/abstract_blue_gray.png";
import logoIcon from "../../assets/ISAC_PB.png";
import { DropdownChooseEnterprise } from "../v3/DropdownChooseEnterprise";
import { MenuSidebar } from "../../../components/Menu/MenuSidebar";
import { ButtonHelp } from "../v3/ButtonHelp";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeaderBreadcrumbs } from "../v3/Wrapper";
import { AsideItems } from "../v3/Aside";
import { handleHubUrl } from "../../../services/utils";
export type WrapperOmitType = 'button-help' | 'header' | 'aside';
interface WrapperProps{
  asideSubItems?: AsideItems[],
  asideItems?: AsideItems[],
  activeItem?: string[],
  breadcrumbs?: HeaderBreadcrumbs[]
  children: ReactNode,
  footerItems?: (
    { type: 'aside-item', content: AsideItems } |
    { type: 'raw', content: ReactNode }
  )[],
  omit: WrapperOmitType[],
}
export const Wrapper = ({ children, activeItem, asideItems, asideSubItems, breadcrumbs, footerItems, omit }:WrapperProps) => {
  return (
    <div
      className="w-screen h-screen flex flex-col bg-gray-500/80"
      style={{ 
        backgroundImage: `url(${bkg})`,
        backgroundSize: 'cover',
      }}
    >
      <header className="flex items-center justify-between p-8 shrink-0">
        <div className="flex items-center justify-center lg:w-56">
          <img
            className="w-40"
            src={handleHubUrl(logoIcon)}
            alt="ISAC 3.0"
          />
        </div>
        
        {breadcrumbs && (
          <div className="flex-1 px-4 hidden sm:block">
            <Breadcrumbs breadcrumbs={[
              { name: 'Home', href: '/' },
              ...breadcrumbs
            ]}/>
          </div>
        )}

        <div className="flex items-center gap-4 text-white">
          <DropdownChooseEnterprise />
        </div>
      </header>
      {breadcrumbs && (
          <div className="px-8 pb-4 sm:hidden shrink-0">
            <Breadcrumbs breadcrumbs={[
              { name: 'Home', href: '/' },
              ...breadcrumbs
            ]}/>
          </div>
        )}
      <div className="flex-1 flex flex-col sm:flex-row p-8 pr-1 max-sm:pl-1 pt-0 h-full min-h-0">
        <MenuSidebar
          activeItem={activeItem}
          asideItems={asideItems}
          asideSubItems={asideSubItems}
          footerItems={footerItems}
        />
        <div className="flex-1 h-full overflow-auto pr-7 max-sm:px-4 pb-8" id="wrapper-overflow-container">
          {children}
        </div>
        {!omit.includes('button-help') && (
          <div className="absolute bottom-8 right-4 flex flex-col justify-between z-10">
            <ButtonHelp/>
          </div>
        )}
      </div>
    </div>
  )
}