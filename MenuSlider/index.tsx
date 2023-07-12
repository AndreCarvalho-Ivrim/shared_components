import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "./style.module.scss";
import logo from "../assets/Logo_semFundo 1.png";
import wallet from "../assets/icon _wallet_.svg";
import coin from "../assets/icon _coin_.svg";
import homeSale from "../assets/icon _home sale_.svg";
import cart from "../assets/icon _cart_.svg";
import view from "../assets/icon _view_.svg";
import leaderboard from "../assets/icon _leaderboard_.svg";
import addFolder from "../assets/icon _add folder_.svg";
import profileCircle from "../assets/icon _profile circled_.svg";
import multiplePages from "../assets/icon _multiple pages empty_.svg";
import settings from "../assets/icon _settings_.svg";

import { PossiblePermissions, User, WorkflowType } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNotify } from "../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { DropdownChooseEnterprise } from "../Wrapper/v3/DropdownChooseEnterprise";
import { ButtonHelp } from "../Wrapper/v3/ButtonHelp";
import { PlusIcon } from "../utils/icons";
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

  return (
    <div className="w-screen h-screen bg-background overflow-auto">
      <div className={style.header}>
        <div className={style.header__logo}>
          <img src={logo} alt="Ivrim Consulting" />
        </div>
        <DropdownChooseEnterprise />
      </div>

      <div className="flex-col sm:flex-row flex-wrap flex sm:justify-between px-6 lg:max-w-[95%] xl:max-w-[1580px] w-full mx-auto gap-6">
        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap mt-12 ml-6 mr-5 mb-80 gap-8">
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

            {user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client) && portalItem && (
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
            )}
          </div>
        </section>

        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap mt-12 ml-6 mr-5 mb-80 gap-8">

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg hover:bg-primary-600 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => toast.warning("Em desenvolvimento!")}
              >
                <img src={view} alt="wallet icon" className="mx-auto pt-1" />
              </button>
              <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">Vision 360</span>
            </div>

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg hover:bg-primary-600 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => redirectToApp({ url: `${frontURL!.portal}/co-pilot-dashboard/financeiro` }, toast, navigate)}
              >
                <img src={leaderboard} alt="coin icon" className="mx-auto" />
              </button>
              <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">Dashboard</span>
            </div>

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-500 w-[65px] h-[65px] shrink-0 rounded-lg hover:bg-primary-600 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => toast.warning("Em desenvolvimento!")}
              >
                <img src={addFolder} alt="add folder icon" className="mx-auto"/>
              </button>
              <span className="text-primary-500 text-xs text-center truncate hover:whitespace-normal mt-3">Reports</span>
            </div>
          </div>
        </section>

        <section className="flex bg-card-gray flex-1 min-w-[375px] h-[460px] rounded-2xl">
          <div className="flex flex-wrap mt-12 ml-6 mr-5 mb-80 gap-8">

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-200 w-[65px] h-[65px] shrink-0 rounded-lg mr-12 hover:bg-primary-100 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => redirectToApp({ url: `${frontURL.portal}/perfil` }, toast, navigate)}>
                <img src={profileCircle} alt="wallet icon" className="mx-auto" />
              </button>
              <span className="text-primary-200 text-xs text-center truncate hover:whitespace-normal mt-3">Perfil</span>
            </div>

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-200 w-[65px] h-[65px] shrink-0 rounded-lg hover:bg-primary-100 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => toast.warning("Em desenvolvimento!")}
              >
                <img src={multiplePages} alt="coin icon" className="mx-auto" />
              </button>
              <span className="text-primary-200 text-xs text-center truncate hover:whitespace-normal mt-3">Meus Doc.</span>
            </div>

            <div className="flex flex-col w-[65px]">
              <button
                className="bg-primary-200 w-[65px] h-[65px] shrink-0 rounded-lg hover:bg-primary-100 hover:scale-105"
                style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                onClick={() => redirectToApp({ url: `${frontURL.portal}/painel-adm`, disabled: !user?.permitions_slug?.includes(PossiblePermissions.ADMIN) }, toast, navigate)}
              >
                <img src={settings} alt="home sale icon" className="mx-auto"/>
              </button>
              <span className="text-primary-200 text-xs text-center truncate hover:whitespace-normal mt-3">Adm Center</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}