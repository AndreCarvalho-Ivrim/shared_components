import { useNavigate } from 'react-router-dom';
import { useNotify } from '../../../../contexts/NotifyContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { getUrls } from '../../../services/conn/api';
import { redirectToApp } from '../../../MenuSlider';
import { Progress } from 'flowbite-react';
import Cloud from "../../../assets/cloud.svg"

export const FooterAside = () => {
  const { user } = useAuth();
  const { toast } = useNotify();
  
  const navigate = useNavigate();
  return (
    <div className="text-white">
      <div className='text-white text-xs mt-16 pt-16 pl-2 pb-4'>
          <div className='flex pb-1'>
            <img src={Cloud} alt='icone de nuvem' className='pl-3' />

            <div className='flex gap-6 pt-0.5'>
              <p className='text-xs pl-1'>Armazenamento</p>
              <span className='text-xs'>35%</span>
            </div>
          </div>

          <Progress progress={35} size="sm" className='custom-progress' />

          <p className='pt-1 text-gray-200 pl-6'><span className='font-bold'>35 GB</span> de 100 GB usados</p>
        </div>
      {/* <button
        type="button"
        className={`
          flex items-center
          sm:justify-center md:justify-start 
          group-[.collapsed]:justify-center group-[.collapsed-desktop-aside]:justify-center
          group-[.collapsed]:mx-auto group-[.collapsed-desktop-aside]:mx-auto
          sm:mx-auto md:m-0 
          gap-2 px-6 py-4 hover:text-gray-300  
        `}
        onClick={() => toast.warning('Em desenvolvimento')}
      >
        <SettingIcon w={22}/>
        <span className="
          sm:hidden md:inline
          group-[.collapsed]:hidden
          group-[.collapsed-desktop-aside]:hidden
        ">Configurações</span>
      </button> */}
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
            flex sm:hidden md:flex flex-col
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
    </div>
  );
}