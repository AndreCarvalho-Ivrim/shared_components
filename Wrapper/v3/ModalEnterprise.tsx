import { useEffect, useState } from "react";
import { Client, User } from "../../../shared-types";
import { SearchIcon, CloseIcon } from "../../utils/icons";
import { Modal } from "../../utils/Modal";
import colapse from "../../assets/colapse.svg"
import logo from '../../assets/default-client.jpg';

interface ClientProps extends Client { active?: boolean, type?: undefined }
interface EconomicGroup{
  clients: ClientProps[],
  active?: boolean,
  name: string
  type: 'economic-group'
}

interface ModalEnterpriseProps{
  client?: ClientProps,
  modalIsOpen: boolean,
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  user?: User,
  signOut: () => void,
  clients: ClientProps[],
  handleChangeClient: (client_id: string, client_name: string) => void
}
export const ModalEnterprise = ({ client, clients, handleChangeClient, modalIsOpen, setModalIsOpen, signOut, user }: ModalEnterpriseProps) => {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [clientsOrEconomicGroups, setClientsOrEconomicGroups] = useState<(ClientProps | EconomicGroup)[]>([])
  const [currentEconomicGroup, setCurrentEconomicGroup] = useState<EconomicGroup | undefined>();
  
  useEffect(() => {
    setCurrentEconomicGroup(undefined);

    const aloneClients : ClientProps[] = [];
    const economicGroups : Record<string, EconomicGroup> = {}
    clients.forEach(cli => {
      if(cli.economic_group){
        if(economicGroups[cli.economic_group]) economicGroups[cli.economic_group].clients.push(cli)
        else economicGroups[cli.economic_group] = {
          clients: [cli],
          name: cli.economic_group,
          type: 'economic-group'
        }

        if(cli.active) economicGroups[cli.economic_group].active = true;
      }
      else aloneClients.push(cli)
    })

    if(Object.keys(economicGroups).length === 0 || (
      Object.keys(economicGroups).length === 1 && aloneClients.length === 0
    )) setClientsOrEconomicGroups(clients);
    else setClientsOrEconomicGroups([
      ...aloneClients, ...Object.values(economicGroups)
    ].sort((a, b) => {
      const A = (
        a.type === 'economic-group' ? a.name : a.nome_fantasia
      ).toUpperCase();
      const B = (
        b.type === 'economic-group' ? b.name : b.nome_fantasia
      ).toUpperCase();

      return A < B ? -1 : (A > B ? 1 : 0)
    }))
  },[clients])

  const handleFilter = (clientOrGroup: ClientProps | EconomicGroup) : boolean => {
    if(search.length === 0) return true;

    const verifyFantasyName = (cli: ClientProps) : boolean => cli.nome_fantasia.toLowerCase().includes(
      search.toLowerCase()
    );

    if(clientOrGroup.type !== 'economic-group') return verifyFantasyName(clientOrGroup)
    
    return clientOrGroup.clients.some((cli) => verifyFantasyName(cli))
  }

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
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <div>
                      <h5 className="mb-0 leading-none font-semibold text-gray-800">{user.name}</h5>
                      <span className="text-xs block text-gray-600/70 dark:text-gray-400">{user.email}</span>
                    </div>
                    {!isSearching && (
                      <button
                        type="button"
                        className="
                          flex justify-center items-center
                          h-5 w-5 my-auto text-gray-500
                          rounded-full outline-none focus:ring-gray-100/50 focus:ring-1
                        "
                        onClick={() => setIsSearching(true)}
                      ><SearchIcon h={18} w={18}/></button>
                    )}
                  </div>

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
          <div>
            {isSearching && (
              <div className="relative flex items-center py-1">
                <input
                  type="text"
                  id="simple-search"
                  className="
                    bg-gray-50/10
                  border-gray-400/50
                  text-gray-600 text-sm rounded-lg 
                    placeholder:text-gray-500
                  focus:ring-gray-100/20 focus:border-gray-100/20 w-full pr-10 p-2
                  "
                  placeholder="Filtrar..."
                  value={search}
                  autoFocus
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="button"
                  className="
                    absolute inset-y-0 right-2
                    flex justify-center items-center
                    h-5 w-5 my-auto text-gray-500
                    rounded-full outline-none focus:ring-gray-100/50 focus:ring-1
                  "
                  onClick={() => {
                    setIsSearching(false)
                    setSearch('')
                  }}
                ><CloseIcon h={18} w={18}/></button>
              </div>
            )}
            {currentEconomicGroup && (
              <div className="
                flex justify-between rounded-lg gap-2 px-4 relative
                backdrop-blur-[35px] hover:bg-gray-50/30 shadow-md dark:border-gray-700 dark:bg-gray-800
              ">
                <strong className="font-bold tracking-tight text-gray-800 break-words w-full text-left pt-3 pb-2">
                  <span className="text-[10px] text-gray-500 block leading-none uppercase -mb-0.5">Grupo</span>
                  <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-16 block">{currentEconomicGroup.name}</span>
                </strong>
                <button
                  type="button"
                  className="hover:bg-gray-50/10 text-gray-700 rounded-lg p-2" onClick={() => setCurrentEconomicGroup(undefined)}
                ><CloseIcon/></button>
              </div>
            )}
            <div className="
              flex flex-wrap justify-center items-center
              w-full max-w-full gap-2 my-4
            ">
              {[
                ...(currentEconomicGroup ? currentEconomicGroup.clients : clientsOrEconomicGroups)
              ].filter(handleFilter).map(c => c.type === 'economic-group' ? (
                <div key={c.name} onClick={() => setCurrentEconomicGroup(c)} className="
                  w-[10rem] flex rounded-lg gap-2
                  backdrop-blur-[35px] hover:bg-gray-50/30 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col
                  relative overflow-hidden group  cursor-pointer p-4
                ">
                  <strong className="font-bold tracking-tight text-gray-800 break-words w-full text-center">
                    <span className="text-[10px] text-gray-500 block leading-none uppercase -mb-0.5">Grupo</span>
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-16 block">{c.name}</span>
                  </strong>

                  <div className="flex justify-center">
                    {c.clients.length > 0 && (
                      <ImageClient
                        client={c.clients[0]}
                        className={`rounded-full object-cover h-14 w-14 border bg-white ${
                          c.clients.length > 2 ? 'translate-x-2/4' : c.clients.length > 1 ? 'translate-x-1/4' : '' }`}
                      />
                    )}
                    {c.clients.length > 1 && (
                      <ImageClient
                        client={c.clients[1]}
                        className={`rounded-full object-cover h-14 w-14 border bg-white  z-10 ${
                          c.clients.length === 2 ? '-translate-x-1/4' : ''
                        }`}
                      />
                    )}
                    {c.clients.length > 2 && (
                      <div
                        className="rounded-full object-cover h-14 min-w-[3.5rem] border bg-gray-100/90  z-20 -translate-x-2/4 flex items-center justify-center"
                      >
                        <span className="text-xs font-semibold text-gray-500">
                          +{c.clients.length - 2}
                        </span>
                      </div>
                    )}
                  </div>

                  {c.active && (
                    <span
                      className="text-primary-500 bg-gray-50 w-full rounded border border-gray-200 px-1 py-0 text-[9px] uppercase font-semibold absolute top-0 inset-x-0 text-center"
                    >Selecionado</span>
                  )}
                </div>
              ):(
                <ButtonClient
                  key={c.id}
                  client={c}
                  onChangeClient={() => c.active ? {} : handleChangeClient(c.id, c.nome_fantasia)}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
const ButtonClient = ({ client, onChangeClient}:{ client: ClientProps, onChangeClient: () => void }) => (
  <button
    type="button"
    onClick={onChangeClient}
    className={`
      w-[10rem] flex rounded-lg gap-2 ${client.active ? 'bg-gray-50/50 shadow-lg':''}
      backdrop-blur-[35px] hover:bg-gray-50/30 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col
      relative overflow-hidden group  cursor-pointer p-4
    `}
  >
    <ImageClient client={client}/>
    <strong className="font-bold tracking-tight text-gray-800 break-words w-full text-center">
      <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-16 block">{client.nome_fantasia}</span>
    </strong>
    {client.active && (
      <span
        className="text-primary-500 bg-gray-50 w-full rounded border border-gray-200 px-1 py-0 text-[9px] uppercase font-semibold absolute top-0 inset-x-0"
      >Selecionado</span>
    )}
  </button>
)
const ImageClient = ({ client, className }:{ client: ClientProps, className?: string }) => (
  <img
    alt={client.nome_fantasia}
    className={className ?? "rounded-full object-cover h-16 w-16 mx-auto border bg-white"}
    src={client.picture ?? logo}
    onError={(e) => {
      let img = e.target as HTMLImageElement;
      img.src = logo;
    }}
  />
)