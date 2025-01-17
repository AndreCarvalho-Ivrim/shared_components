import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../../../contexts/NotifyContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { getUrls } from '../../../services/conn/api';
import { redirectToApp } from '../../../MenuSlider';
import { AsideItems } from '.';
import { Fragment, ReactNode } from 'react';
import { AsideLiItem } from './AsideLiItem';

export interface FooterAsideProps{
  footerItems?: (
    { type: 'aside-item', content: AsideItems } |
    { type: 'raw', content: ReactNode }
  )[]
}
export const FooterAside = ({ footerItems }: FooterAsideProps) => {
  const { user } = useAuth();
  const { toast } = useNotify();
  
  const navigate = useNavigate();
  return (
    <footer className="
      flex items-center sm:justify-center md:justify-start 
      group-[.collapsed]:justify-center group-[.collapsed-desktop-aside]:justify-center
      gap-2 px-6 pt-4 pb-6
    " style={{
      borderTop: '2px dashed rgba(255, 255, 255, .3)'
    }}>
      <button
        type="button"
        onClick={() => redirectToApp(
          { url: `${getUrls('front')?.portal}perfil` },
          toast,
          navigate
        )}
        className={`
          w-8 h-8 md:w-10 md:h-10
          text-sm md:text-base
          flex items-center justify-center font-semibold uppercase
          bg-white rounded-full text-gray-700
          group-[.collapsed]:w-8 group-[.collapsed-desktop-aside]:w-8
          group-[.collapsed]:h-8 group-[.collapsed-desktop-aside]:h-8
          group-[.collapsed]:text-sm group-[.collapsed-desktop-aside]:text-sm
        `}
      >
        {user?.picture ? (
          <img
            className="object-cover w-full h-full rounded-full"
            src={user.picture}
          />
        ):(
          user ? user.name.substr(0,2) :'..'
        )}
      </button>
      <button
        type="button"
        onClick={() => redirectToApp(
          { url: `${getUrls('front')?.portal}perfil` },
          toast,
          navigate
        )}
        className="
          flex sm:hidden md:flex flex-col text-start
          group-[.collapsed]:hidden group-[.collapsed-desktop-aside]:hidden
          max-w-[calc(100%-3rem)]
        "
      >
        <strong className="text-sm text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
          {user?.name ?? '...'}
        </strong>
        <span className="text-xs text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
          {user?.email ?? '...'}
        </span>
      </button>
    </footer>
  );
}