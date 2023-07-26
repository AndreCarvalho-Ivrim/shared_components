import style from "./style.module.scss";
import logo from "../assets/logo-hub.png";
import ISAC from "../assets/ISAC_PB.png";
import DASHBOARD from "../assets/IVRIM-DASHBOARD_PB.png";
import REPORT from "../assets/IVRIM-REPORT_PB.png";
import VISION from "../assets/IVRIM-VISION360_PB.png";
import waves from "../assets/waves.png";
import wallet from "../assets/wallet-menu.svg";
import Folder from "../../shared-components/assets/folder-user.svg";
import Mail from "../../shared-components/assets/mail.svg";
import profileCircle from "../assets/icon _profile circled_.svg";
import settings from "../assets/icon _settings_.svg";
import homeSale from "../assets/icon _home sale_.svg";
import coin from "../assets/icon _coin_.svg";
import cart from "../assets/icon _cart_.svg";
import teste from "../assets/IconsGeo_Prancheta 2.svg"
import teste2 from "../assets/IconsGeo_Prancheta 3.svg"
import teste4 from "../assets/IconsGeo_Prancheta 1.svg"
import teste3 from "../assets/IconsGeo_Prancheta 4.svg"
import { ChevronDownIcon, ChevronUpIcon } from "../../components/SvgIcons";

import { PossiblePermissions, User, WorkflowType } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNotify } from "../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { DropdownChooseEnterprise } from "../Wrapper/v3/DropdownChooseEnterprise";
import { useEffect, useState } from "react";
import { getPublishedFlows } from "../services/workflow";
import { getUrls } from "../services/conn/api";


const frontURL = getUrls("front")!

const clientsWithAccessToCAP = {
  "3c2c7801-9b58-417f-9809-7313cbbb287f": "IVRIM",
  "eb5039d9-22ec-4204-b120-d58d6ed9ade8": "LEAD",
  "e1a862da-0078-41c7-94bb-cd8bef12fbfb": "SEG4",
  "d92808ac-9848-4f7d-b8f3-4c73765d0035": "VESPER",
  "2d6c36ea-f8d5-11ed-be56-0242ac120002": "ZAON"
};
export const applicationRedirection = (user: User | undefined) => {
  let urls = { portal: '', wf: '' }

  try {
    // @ts-ignore
    const WORKFLOW_MODULE = process.env.REACT_APP_WORKFLOW_MODULAR;
    urls.wf = WORKFLOW_MODULE!;
  } catch (e) { }
  try {
    // @ts-ignore
    const PORTAL = import.meta.env.VITE_PORTAL_URL;
    urls.portal = PORTAL;
  } catch (e) { }

  if (!urls.portal && !urls.wf) console.error(
    '[undeclared-env-variables-<REACT_APP_WORKFLOW_MODULAR|VITE_PORTAL_URL>]'
  )
  return [
    { id: 'profile', name: 'Perfil', url: `${urls.portal}/perfil`, img: "https://source.unsplash.com/random/?textures-patterns" },
    {
      id: 'ivrim-flows', name: 'Portal de Soluções Ivrim', url: `${urls.portal}/compras-e-contas-a-pagar`, img: 'https://source.unsplash.com/random/?city,night',
      disabled: !user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR)
    },
    { id: 'ivrim-automator', name: 'Ivrim System Architect', url: `${urls.wf}?token=${user?.token}`, img: 'https://source.unsplash.com/random/?business-work' },
    { id: 'ivrim-learn-center', name: 'Ivrim Learning Center', url: undefined, img: "https://source.unsplash.com/random/?technology" },
    {
      id: 'admin-panel', name: 'Admin Panel', url: `${urls.portal}/painel-adm`, img: "https://source.unsplash.com/random/?textures-patterns",
      disabled: !user?.permitions_slug?.includes(PossiblePermissions.ADMIN)
    },
    { id: 'co-pilot-dashboard', name: 'Ivrim Office Intelligence', url: `${urls.portal}/co-pilot-dashboard/financeiro`, img: "https://source.unsplash.com/random/?3d-renders" },
  ];
}
export const redirectToApp = ({ url, disabled }: { url: string | undefined, disabled?: boolean }, toast: any, navigate: any) => {
  if (!url) {
    toast.warning('Está solução ainda não está disponível');
    return;
  }

  if (disabled) {
    toast.error('Você não tem permissão para acessar essa sessão com esta empresa');
    return;
  }

  if (url.substring(0, 4) === 'http') window.location.href = url;
  else navigate(url);
}
export const MenuSlider = () => {
  const { toast } = useNotify();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const itemsSlider = applicationRedirection(user);

  const painelItem = itemsSlider.find(item => item.id === 'admin-panel')
  const isacItem = itemsSlider.find(item => item.id === 'ivrim-automator')
  const portalItem = itemsSlider.find(item => item.id === 'ivrim-flows')
  const copilotItem = itemsSlider.find(item => item.id === 'co-pilot-dashboard')

  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await getPublishedFlows(user.token);
      if (!res.result) {
        toast.error(res.response)
        return;
      }

      if (!res.data) return;

      setWorkflows(res.data)
    })()
  }, [user?.token]);

  const [firstItemIndex, setFirstItemIndex] = useState(0);

  const itemsPerPage = 4;
  const totalItems = workflows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setFirstItemIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, totalItems - itemsPerPage));
  };

  const handlePreviousPage = () => {
    setFirstItemIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };


  return (
    <div className="w-screen h-screen bg-background overflow-auto">
      <div className={style.header}>
        <div className={style.header__logo}>
          <img src={logo} alt="Ivrim Consulting" />
        </div>
        <DropdownChooseEnterprise />
      </div>

      <div className="flex-row flex-wrap flex sm:justify-evenly px-6 lg:max-w-[95%] xl:max-w-[1580px] w-full mx-auto gap-2">
        <section className="flex flex-row">
          <div className="grid grid-cols-2">
            <button
              className="bg-primary-500 m-1 w-56 h-52 rounded-md flex justify-center items-center"
              onClick={() => redirectToApp({ url: `${frontURL.wf}?token=${user?.token}`, disabled: !user?.permitions_slug?.includes(PossiblePermissions.ISAC) }, toast, navigate)}
              disabled={!user?.permitions_slug?.includes(PossiblePermissions.ISAC)}
            >
              <div className="flex flex-col mr-14 mb-3">
                <img src={teste} alt="" width={100} height={100} className="mt-10 ml-14" />
                <img src={ISAC} alt="" width={100} height={100} className="mt-12 ml-2" />
              </div>
            </button>

            <button className="bg-primary-500 m-1 w-56 h-52 rounded-md flex justify-center items-center">
              <div className="flex flex-col mr-14 mb-3">
                <img src={teste2} alt="" width={100} height={100} className="mt-10 ml-14" />
                <img src={VISION} alt="" width={100} height={100} className="mt-12 ml-2 h-3" />
              </div>
            </button>
            <button className="bg-primary-500 m-1 w-56 h-52 rounded-md flex justify-center items-center">
              <div className="flex flex-col mr-14 mb-3">
                <img src={teste3} alt="" width={100} height={100} className="mt-10 ml-14" />
                <img src={REPORT} alt="" width={100} height={100} className="mt-12 ml-2" />
              </div>
            </button>
            <button className="bg-primary-500 m-1 w-56 h-52 rounded-md flex justify-center items-center">
              <div className="flex flex-col mr-14 mb-3">
                <img src={teste4} alt="" width={100} height={100} className="mt-10 ml-14" />
                <img src={DASHBOARD} alt="" width={100} height={100} className="mt-12 ml-2 h-3" />
              </div>
            </button>
          </div>

          <div className="flex flex-col">
            {workflows.map((flow) => (
              <div className="flex flex-col" key={flow._id}>
                <div>
                  {firstItemIndex !== 0 && (
                    <button className="ml-8" onClick={handlePreviousPage}>
                      <ChevronUpIcon />
                    </button>
                  )}
                </div>

                <button className="bg-primary-700 hover:bg-primary-600 m-1 w-24 h-24 rounded-md flex flex-col items-center justify-center"
                  onClick={() => redirectToApp({ url: `${getUrls('front')?.wf}modulo/${flow._id}?token=${user?.token}` }, toast, navigate)}
                >
                  {flow.theme === "Cobrança" ? (<img src={homeSale} alt="homeSale icon" className="pt-2" />) : flow.theme === "Financeiro" ? (<img src={coin} alt="coin icon" className="pt-2" />) : flow.theme === "Comercial" ? (<img src={cart} alt="cart icon" className="pt-2" />) : <></>}
                  <span className="text-white text-xs text-center truncate hover:whitespace-normal mt-3">{flow.title}</span>
                </button>
              </div>
            ))}

            <div>
              <button className="ml-8 pt-1" onClick={handleNextPage} disabled={firstItemIndex === 0}>
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </section>


        <div className="flex flex-row">
          <div className="flex flex-col">
            <button className="bg-primary-600 m-1 w-60 h-26 rounded-md flex flex-col justify-center items-center">
              <span className="text-lg text-white mr-2 ml-auto">2</span>
              <img src={wallet} alt="" width={60} height={100} />
              <span className="text-xs text-white pt-1 pb-1 pl-3 mr-auto">Carteira Contas a Receber</span>
            </button>

            <button className="bg-primary-600 m-1 w-60 h-24 rounded-md flex flex-col justify-center items-center">
              <img src={Mail} alt="" width={65} height={100} className="mt-3" />
              <span className="text-xs text-white pt-1 pb-1 pl-3 mr-auto">Modelo de Carta</span>
            </button>

            <button className="bg-primary-600 m-1 w-60 h-24 rounded-md flex flex-col justify-center items-center">
              <img src={Folder} alt="" width={65} height={100} className="mt-3" />
              <span className="text-xs text-white pt-1 pb-1 pl-3 mr-auto">Meus Documentos</span>
            </button>

            <button
              className="relative bg-primary-600 m-1 pb-14 w-60 h-24 rounded-md flex flex-col justify-start items-start"
              style={{
                backgroundImage: `url(${waves})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
                backgroundSize: "auto 100%",
              }}
            >
              <span className="text-xs text-white pt-2 pl-3 mr-auto text-start">
                Hoje você tem 34 <br />
                transações bancárias<br />
                previstas
              </span>
            </button>

          </div>

          <div className="flex flex-col mx-auto">
            <button className="bg-primary-100/90 m-1 w-24 h-26 rounded-md flex flex-col justify-center items-center">
              <img src={settings} alt="" width={50} height={100} className="pt-6" />
              <span className="text-xs text-white pt-3 pb-1.5">Admin Console</span>
            </button>

            <button className="bg-primary-100/90 m-1 w-24 h-26 rounded-md flex flex-col justify-center items-center">
              <img src={profileCircle} alt="" width={50} height={100} className="pt-4" />
              <span className="text-xs text-white pt-3 pb-1 pr-10">Usuário</span>
            </button>
          </div>

        </div>
      </div>


      {/*
      <div className="flex-col sm:flex-row flex-wrap flex sm:justify-between px-6 lg:max-w-[95%] xl:max-w-[1580px] w-full mx-auto gap-6">
        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap my-12 mx-6 gap-8 w-full content-start">
            {workflows.map((flow) => (
              <div className="flex flex-col w-[65px]" key={flow._id}>
                <button className="bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg mr-1 hover:bg-primary-600 hover:scale-105" style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  onClick={() => redirectToApp({ url: `${getUrls('front')?.wf}modulo/${flow._id}?token=${user?.token}` }, toast, navigate)}
                >
                  {flow.theme === "Cobrança" ? (<img src={homeSale} alt="homeSale icon" className="mx-auto" />) : flow.theme === "Financeiro" ? (<img src={coin} alt="coin icon" className="pl-3" />) : flow.theme === "Comercial" ? (<img src={cart} alt="cart icon" className="pl-3" />) : <></>}

                </button>
                <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">{flow.title}</span>
              </div>
            ))}

            {(user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client) && portalItem) ? (
              <div className="flex flex-col w-[65px]">
                <button
                  className="bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg mr-1 hover:bg-primary-600 hover:scale-105"
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  onClick={() => redirectToApp({ url: portalItem.url, disabled: portalItem.disabled }, toast, navigate)}
                >
                  <img src={wallet} alt="wallet icon" className="mx-auto"/>
                </button>
                <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">Contas a pagar</span>
              </div>
            ) : workflows.length === 0 ? (
              <p className="
                w-full h-full
                flex items-center justify-center
                text-center text-sm text-gray-500
              ">Você não possui nenhum aplicativo criado</p>
            ) : <></>}
          </div>
        </section>

        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap my-12 mx-6 gap-8 w-full content-start">
            {[
              { 
                redirect: {
                  url: `${frontURL.wf}?token=${user?.token}`,
                  disabled: !(user && user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.ISAC))
                },
                icon: <FlowIcon w={34} h={34}/>, name: 'ISAC'
              },{
                redirect: {
                  url: `${frontURL.wf}modelos/?token=${user?.token}`,
                  disabled: !(user && user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.ISAC))
                },
                icon: <EnvelopeIcon w={34} h={34}/>, name: 'Modelo de Mensagens'
              },{ icon: <img src={view} alt="wallet icon" className="mx-auto pt-1" />, name: 'Vision 360' },{
                redirect: {
                  url: `${frontURL.portal}/co-pilot-dashboard`,
                  disabled: !(user && user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.DASH))
                },
                icon: <img src={leaderboard} alt="coin icon" className="mx-auto" />, name: 'Dashboard'
              },{ icon: <img src={addFolder} alt="add folder icon" className="mx-auto"/>, name: 'Reports' }
            ].map((item) => (
              <div className="flex flex-col w-[65px]" key={item.name}>
                <button
                  className="
                    bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg
                    hover:bg-primary-600 hover:scale-105 text-white
                    flex items-center justify-center relative
                    overflow-hidden
                  "
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  onClick={() => {
                    if(item.redirect) redirectToApp(item.redirect, toast, navigate)
                    else toast.warning("Em desenvolvimento!")
                  }}
                >
                  {item.icon}
                  {(!item.redirect || item.redirect.disabled) && (
                    <span className="bg-gray-800/40 absolute inset-0 flex items-center justify-center">
                      {item.redirect ? <LockIcon/> : <RefreshIcon/> }
                    </span>
                  )}
                </button>
                <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap my-12 mx-6 gap-8 w-full content-start">
            {[
              {
                redirect: { url: `${frontURL.portal}/perfil` },
                icon: <img src={profileCircle} alt="wallet icon" className="mx-auto" />,
                name: 'Perfil'
              },{
                icon: <img src={multiplePages} alt="coin icon" className="mx-auto" />,
                name: 'Meus Docs.',
                redirect: { url: `${frontURL.portal}/meus-docs` }
              },{
                redirect: {
                  url: `${frontURL.portal}/painel-adm`,
                  disabled: !user?.permitions_slug?.includes(PossiblePermissions.ADMIN)
                },
                icon: <img src={settings} alt="home sale icon" className="mx-auto"/>,
                name: 'Adm Center'
              }
            ].map((item) => (
              <div className="flex flex-col w-[65px]" key={item.name}>
                <button
                  className="
                    bg-primary-200 w-[65px] h-[65px] shrink-0 rounded-lg
                    flex items-center justify-center relative
                    hover:bg-primary-100 hover:scale-105
                    overflow-hidden
                  "
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                  onClick={() => {
                    if(item.redirect) redirectToApp(item.redirect, toast, navigate)
                    else toast.warning("Em desenvolvimento!")
                  }}
                >
                  {item.icon}
                  {(!item.redirect || item.redirect.disabled) && (
                    <span className="bg-gray-800/40 absolute inset-0 flex items-center justify-center text-white">
                      {item.redirect ? <LockIcon/> : <RefreshIcon/> }
                    </span>
                  )}
                </button>
                <span className="text-primary-200 text-xs text-center truncate hover:whitespace-normal mt-3">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="absolute bottom-8 right-4 flex flex-col justify-between z-50">
          <ButtonHelp/>
        </div>
      </div>
*/}

    </div>
  )
}