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
import isac from "../assets/IconsGeo_Prancheta 2.svg"
import vision from "../assets/IconsGeo_Prancheta 3.svg"
import report from "../assets/IconsGeo_Prancheta 1.svg"
import dashboard from "../assets/IconsGeo_Prancheta 4.svg"

import { PossiblePermissions, User, WorkflowType } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNotify } from "../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { DropdownChooseEnterprise } from "../Wrapper/v3/DropdownChooseEnterprise";
import { useEffect, useState } from "react";
import { getPublishedFlows } from "../services/workflow";
import { getUrls } from "../services/conn/api";
import { LockIcon, RefreshIcon } from "../utils/icons";


const frontURL = getUrls("front")!

const clientsWithAccessToCAP = {
  "3c2c7801-9b58-417f-9809-7313cbbb287f": "IVRIM",
  "eb5039d9-22ec-4204-b120-d58d6ed9ade8": "LEAD",
  "e1a862da-0078-41c7-94bb-cd8bef12fbfb": "SEG4",
  "d92808ac-9848-4f7d-b8f3-4c73765d0035": "VESPER",
  "2d6c36ea-f8d5-11ed-be56-0242ac120002": "ZAON"
};
// TODO FUNÇÃO OBSOLETA, REMOVER TODAS AS MENÇOES A ELA E DEPOIS REMOVER FUNÇÃO
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
  }, [toast, user, user?.token]);

  const [firstItemIndex, setFirstItemIndex] = useState(0);

  const itemsPerPage = 4;
  const totalItems = workflows.length;

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

      <div
        className="
          flex-row flex-wrap flex justify-start
          lg:justify-evenly px-6
          w-full sm:max-w-[616px] lg:max-w-[95%] xl:max-w-[1580px] 
          mx-auto gap-2
        "
      >
        <section className="flex flex-col sm:flex-row w-full sm:w-auto">
          <div className="grid grid-cols-1 xsm:grid-cols-2 w-full">
            {[
              {
                id: 'isac',
                redirect: { url: `${frontURL.wf}?token=${user?.token}`, disabled: !user?.permitions_slug?.includes(PossiblePermissions.ISAC) },
                icon: <img src={isac} alt="imagem geometrica isac" width={100} height={100} className="mt-10 mx-auto" />,
                name: <img src={ISAC} alt="logo isac" width={100} height={100} className="h-3 object-contain" />,
              },{
                id: 'vision',
                icon: <img src={vision} alt="imagem geometrica vision" width={100} height={100} className="mt-10 mx-auto" />,
                name: <img src={VISION} alt="logo vision" width={100} height={100} className="h-3 object-contain" />
              },{
                id: 'report',
                icon: <img src={report} alt="imagem geometrica report" width={100} height={100} className="mt-10 mx-auto" />,
                name: <img src={REPORT} alt="logo report" width={100} className="h-3 object-contain" />
              },{
                id: 'dashboard',
                redirect: {
                  url: `${frontURL.portal}/co-pilot-dashboard`,
                  disabled: !(user && user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.DASH))
                },
                icon: <img src={dashboard} alt="imagem geometrica dashboard" width={100} height={100} className="mt-10 mx-auto" />,
                name: <img src={DASHBOARD} alt="logo dashboard" height={100} className="h-3 object-contain" />
              }
            ].map((item) => (
              <button
                key={item.id}
                className="bg-primary-500 m-1 w-full xsm:max-w-[calc(50vw-2.2rem)] sm:w-56 h-52 rounded-md flex justify-center items-center relative"
                onClick={() => {
                  if(item.redirect) redirectToApp(item.redirect, toast, navigate)
                  else toast.warning('Está solução ainda não está disponível');
                }}
              >
                <div className="flex flex-col items-start justify-between mb-3 w-full h-full px-4 py-2">
                  {item.icon}
                  {item.name}
                </div>

                {(!item.redirect || item.redirect.disabled) && (
                  <span className="bg-gray-800/30 absolute inset-0 flex items-center justify-center text-white rounded-md">
                    {item.redirect ? <LockIcon w={26} h={26}/> : <RefreshIcon w={26} h={26}/> }
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex sm:flex-col overflow-y-auto min-w-[7.2rem] max-h-[calc(6.25rem*4+2.25rem)]">
            {/* {(workflows.length + (
              (user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client)) ? 1 : 0
            )) > 4 && (
              <button className="ml-8" onClick={handlePreviousPage}>
                <ChevronUpIcon />
              </button>
            )} */}

            {workflows.map((flow) => (
              <button
                className="bg-primary-700 hover:bg-primary-600 m-1 min-w-[6.25rem] w-[6.25rem] min-h-[6.25rem] h-[6.25rem] rounded-md flex flex-col items-center justify-center"
                onClick={() => redirectToApp({ url: `${getUrls('front')?.wf}modulo/${flow._id}?token=${user?.token}` }, toast, navigate)}
              >
                {flow.theme === "Cobrança" ? (
                  <img src={homeSale} alt="homeSale icon" className="pt-2" />
                ) : flow.theme === "Financeiro" ? (
                  <img src={coin} alt="coin icon" className="pt-2" />
                ) : flow.theme === "Comercial" ? (
                  <img src={cart} alt="cart icon" className="pt-2" />
                ) : <></>}
                <span className="text-white text-xs text-center truncate hover:whitespace-normal mt-3">{flow.title}</span>
              </button>
            ))}
            {(user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client)) ? (
              <button
                className="bg-primary-700 hover:bg-primary-600 m-1 min-w-[6.25rem] w-[6.25rem] min-h-[6.25rem] h-[6.25rem] rounded-md flex flex-col items-center justify-center"
                onClick={() => redirectToApp({ url: `${frontURL.portal}/compras-e-contas-a-pagar`, disabled: user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR) }, toast, navigate)}
              >
                <img src={wallet} alt="wallet icon" className="pt-2"/>
                <span className="text-white text-xs text-center truncate hover:whitespace-normal mt-3">Contas a pagar</span>
              </button>
            ) : workflows.length === 0 ? (
              <div className="
                bg-gray-300 hover:bg-gray-300 m-1 p-1 min-w-[6.25rem] w-[6.25rem] min-h-[6.25rem] h-[6.25rem] rounded-md flex flex-col items-center justify-center
                text-center text-xs text-gray-500 opacity-75
              ">Você não<br/>possui nenhum aplicativo<br/>criado</div>
            ) : <></>}
            {/* {(workflows.length + (
              (user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client)) ? 1 : 0
            )) > 4 && (
              <button className="ml-8 pt-1" onClick={handleNextPage} disabled={firstItemIndex === 0}>
                <ChevronDownIcon />
              </button>
            )} */}
          </div>
        </section>


        <div className="flex flex-col xsm:flex-row w-full xsm:w-auto">
          <div className="flex flex-col w-full xsm:w-auto">
            {/* <button className="bg-primary-600 m-1 w-60 h-26 rounded-md flex flex-col justify-center items-center">
              <span className="text-lg text-white mr-2 ml-auto">2</span>
              <img src={wallet} alt="" width={60} height={100} />
              <span className="text-xs text-white pt-1 pb-1 pl-3 mr-auto">Carteira Contas a Receber</span>
            </button> */}

            <button
              type="button"
              className="bg-primary-600 m-1 h-24 rounded-md flex flex-col justify-center items-center w-full xsm:w-[14rem] lg:w-60"
              onClick={() => redirectToApp({
                url: `${frontURL.wf}modelos/?token=${user?.token}`,
                disabled: !(user && user.permitions_slug && user.permitions_slug.includes(PossiblePermissions.ISAC))
              }, toast, navigate)}
            >
              <img src={Mail} alt="Icone de carta" width={65} height={100} className="mt-3" />
              <span className="text-xs text-white pb-1 pl-3 text-start w-full truncate hover:whitespace-normal">Modelo de Carta</span>
            </button>

            <button
              type="button"
              className="bg-primary-600 m-1 h-24 rounded-md flex flex-col justify-center items-center w-full xsm:w-[14rem] lg:w-60"
              onClick={() => redirectToApp({ url: `${frontURL.portal}/meus-docs` }, toast, navigate)}
            >
              <img src={Folder} alt="Icone de arquivos" width={65} height={100} className="mt-3" />
              <span className="text-xs text-white pb-1 pl-3 text-start w-full truncate hover:whitespace-normal">Meus Documentos</span>
            </button>

            {/* <button
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
            </button> */}

          </div>

          <div className="flex xsm:flex-col xsm:mx-auto flex-wrap">
            <button className="bg-primary-100/90 m-1 w-24 h-26 rounded-md flex flex-col justify-center items-center"
             onClick={() => redirectToApp({ url: `${frontURL.portal}painel-adm` }, toast, navigate)}
            >
              <img src={settings} alt="Icone de configurações" width={50} height={100} className="pt-3" />
              <span className="text-xs text-white pt-3 pb-1.5 truncate hover:whitespace-normal">Admin Console</span>
            </button>

            <button className="bg-primary-100/90 m-1 w-24 h-26 rounded-md flex flex-col justify-center items-center"
            onClick={() => redirectToApp({ url: `${frontURL.portal}perfil` }, toast, navigate)}
            >
              <img src={profileCircle} alt="Icone de usuário" width={50} height={100} className="pt-3" />
              <span className="text-xs text-white pt-3 pb-1 pr-10 truncate hover:whitespace-normal">Usuário</span>
            </button>
          </div>

        </div>
      </div>
      {/*
        <div className="absolute bottom-8 right-4 flex flex-col justify-between z-50">
          <ButtonHelp/>
        </div>
      */}
    </div>
  )
}