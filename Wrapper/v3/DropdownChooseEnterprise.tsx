import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Client } from "../../../types";

import logo from '../../../assets/default-client-logo.png';
import colapse from "../../assets/colapse.svg"
import { Dropdown } from "../../utils/Dropdown";
import { useNotify } from "../../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { hubRoutes } from "../../../shared-types/utils/routes";
import { Modal } from "../../utils/Modal";
import { CloseIcon } from "../../utils/icons";

interface ClientProps extends Client {
  active?: boolean
}
export const DropdownChooseEnterprise = () => {
  const { toast } = useNotify();

  const navigate = useNavigate();
  
  const { user, changeClient, signOut } = useAuth();
  const [client, setClient] = useState<ClientProps>();
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.clients) return;

    let findedClient = user.clients?.find(c => c.id === user.current_client);
    if (findedClient) setClient(findedClient);

    setClients([
      ...user.clients.map(client => {
        return {
          ...client,
          active: client.id === user.current_client
        }
      })
    ]);
  }, [user]);

  async function handleChangeClient(client_id: string, client_name: string) {
    if (!user) return;

    const globalRoutes : string[] = [
      '/',
      hubRoutes.profile.home(), hubRoutes.gallery.home(),
      hubRoutes.notification.all(), hubRoutes.notification.preference(),
    ];

    const pathname = window.location.hash ? window.location.hash.slice(1) : '/'

    if(!globalRoutes.includes(pathname)){
      console.log('[redirected-to-home]')
      navigate('/')
    }

    console.log('[on-change-client-from:]', { pathname });
    toast.promise(changeClient(client_id, client_name, user.token), {
      'pending': 'Alterando empresa',
      'error': 'Houve um erro ao alterar a empresa',
      'success': 'Empresa alterada com sucesso'
    });

    setModalIsOpen(false)
  }

  if(clients.length < 6) return (
    <Dropdown
      classNames={{
        list: `
          absolute right-0 z-50
          -mt-1 w-56 origin-top-right rounded-md
          bg-gray-100/40 backdrop-blur-[25px] shadow-lg
          ring-1 ring-black ring-opacity-5
          focus:outline-none pb-2
        `
      }}
      trigger={
        <div className="flex items-center gap-1">
          <div className="
            bg-white w-10 h-10 rounded-lg
            flex items-center justify-center
            font-medium text-xl text-gray-800
            uppercase border-2
          ">
            {client ? (
              <>
                {client.picture ? (
                  <img
                    className="object-cover min-w-[100%] w-full h-full rounded-md"
                    src={client.picture}
                    onError={(e) => {
                      let img = e.target as HTMLImageElement;
                      img.src = logo;
                    }}
                  />
                ) : client.nome_fantasia.substr(0, 2)} 
              </>
            ) : '..'}
          </div>
          <img src={colapse}/>
        </div>
      }
    >
      <>
        {user && (<strong className="text-xs text-center truncate max-w-full block -mt-1 mb-1">{user.email}</strong>)}
        {clients.map(c => (
          <button
            key={c.id}
            type="button"
            className="
              text-gray-700 font-semibold text-sm 
              rounded-lg backdrop-blur-[25px] w-full 
              text-start p-2 hover:bg-gray-50/30 mb-1 last:mb-0
            "
            onClick={() => c.active ? {} : handleChangeClient(c.id, c.nome_fantasia)}
          >
            <div className="flex items-center">
              <img
                alt={c.nome_fantasia}
                className="rounded-full object-cover w-6 h-6"
                src={c.picture ?? logo}
                onError={(e) => {
                  let img = e.target as HTMLImageElement;
                  img.src = logo;
                }}
              />
              <span className="ml-3 flex-1 text-ellipsis overflow-hidden whitespace-nowrap block">
                {c.nome_fantasia}
              </span>
              {c.active && (
                <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  Selecionado
                </span>
              )}
            </div>
          </button>
        ))}
        {user && (
          <button
            type="button"
            className="
              text-gray-700 font-semibold text-xs
              rounded-lg w-full
              text-start p-1 hover:bg-gray-50/10 mt-1 -mb-3
            "
            onClick={() => signOut()}
          >
            <span className="flex-1 text-center uppercase text-ellipsis overflow-hidden whitespace-nowrap block">
              Logout
            </span>
          </button>
        )}
      </>
    </Dropdown>
  );

  return (
    <>
      <button className="flex items-center gap-1" onClick={() => setModalIsOpen(true)}>
        <div className="
          bg-white w-10 h-10 rounded-lg
          flex items-center justify-center
          font-medium text-xl text-gray-800
          uppercase border-2
        ">
          {client ? (
            <>
              {client.picture ? (
                <img
                  className="object-cover min-w-[100%] w-full h-full rounded-md"
                  src={client.picture}
                  onError={(e) => {
                    let img = e.target as HTMLImageElement;
                    img.src = logo;
                  }}
                />
              ) : client.nome_fantasia.substr(0, 2)} 
            </>
          ) : '..'}
        </div>
        <img src={colapse}/>
      </button>
      <Modal
        isOpen={modalIsOpen}
        options={{
          title: '',
          size: 'sm:w-full sm:max-w-4xl',
          classNames: {
            content: '!bg-transparent',
            dialog: '!bg-gray-100/40 backdrop-blur-[25px] shadow-lg ring-1 ring-black ring-opacity-5',
            footer: '!hidden',
          },
          cancelButton: false
        }}
        setIsOpen={setModalIsOpen}
      >
        <div>
          {user && (
            <div className="flex justify-between gap-2 mb-5">
              <div className="flex items-center gap-4">
                <img className="h-14 w-14 rounded-full shadow object-cover bg-gray-100" src={user.picture} alt="avatar"/>
                <div>
                  <h5 className="mb-0 leading-none font-semibold text-gray-800">{user.name}</h5>
                  <span className="text-xs block text-gray-600/70 dark:text-gray-400">{user.email}</span>

                  <button
                    type="button"
                    className="
                      text-gray-700 font-semibold text-[10px]
                      rounded-lg
                      py-1 px-2 bg-gray-50/10 hover:bg-gray-50/20
                    "
                    onClick={() => signOut()}
                  >
                    <span className="flex-1 text-center uppercase text-ellipsis overflow-hidden whitespace-nowrap block">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
          <button type="button" className="hover:bg-gray-50/10 text-gray-700 rounded-lg p-2 absolute right-1 top-1" onClick={() => setModalIsOpen(false)}>
            <CloseIcon/>
          </button>
          <div className="
            flex flex-wrap justify-center items-center
            w-full max-w-full gap-2 my-4
          ">
            {clients.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => c.active ? {} : handleChangeClient(c.id, c.nome_fantasia)}
                className="
                  w-[10rem] flex rounded-lg gap-2
                  backdrop-blur-[35px] hover:bg-gray-50/30 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col
                  relative overflow-hidden group  cursor-pointer p-4
                "
              >
                <img
                  alt={c.nome_fantasia}
                  className="rounded-full object-cover h-16 w-16 mx-auto border"
                  src={c.picture ?? logo}
                  onError={(e) => {
                    let img = e.target as HTMLImageElement;
                    img.src = logo;
                  }}
                />
                <strong className="font-bold tracking-tight text-gray-800 break-words w-full text-center">
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-16 block">{c.nome_fantasia}</span>
                  {c.active && (
                    <span
                      className="rounded border border-gray-200 px-1 py-0 text-[9px] uppercase font-medium"
                    >Selecionado</span>
                  )}
                </strong>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}