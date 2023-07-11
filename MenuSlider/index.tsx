import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "./style.module.scss";
import logo from "../assets/Logo_Negativo_semFundo.png";
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

const clientsWithAccessToCAP = {
  "3c2c7801-9b58-417f-9809-7313cbbb287f": "IVRIM",
  "eb5039d9-22ec-4204-b120-d58d6ed9ade8": "LEAD",
  "e1a862da-0078-41c7-94bb-cd8bef12fbfb": "SEG4",
  "d92808ac-9848-4f7d-b8f3-4c73765d0035": "VESPER",
  "2d6c36ea-f8d5-11ed-be56-0242ac120002": "ZAON"
};
export const applicationRedirection = (user: User | undefined) => {
  let urls = { portal: '', wf: '' }

  try{
    // @ts-ignore
    const WORKFLOW_MODULE = process.env.REACT_APP_WORKFLOW_MODULAR;
    urls.wf = WORKFLOW_MODULE!;
  }catch(e){ }
  try{
    // @ts-ignore
    const PORTAL = import.meta.env.VITE_PORTAL_URL;
    urls.portal = PORTAL;
  }catch(e){ }
  
  if(!urls.portal && !urls.wf) console.error(
    '[undeclared-env-variables-<REACT_APP_WORKFLOW_MODULAR|VITE_PORTAL_URL>]'
  )
  return [
    { id: 'profile', name: 'Perfil', url: `${urls.portal}/perfil`, img: "https://source.unsplash.com/random/?textures-patterns" },
    {
      id: 'ivrim-flows', name: 'Portal de Soluções Ivrim', url: `${urls.portal}/compras-e-contas-a-pagar`, img: 'https://source.unsplash.com/random/?city,night',
      disabled: !user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR)
    },
    { id: 'ivrim-automator',    name: 'Ivrim System Architect',    url: `${urls.wf}?token=${user?.token}`, img: 'https://source.unsplash.com/random/?business-work' },
    { id: 'ivrim-learn-center', name: 'Ivrim Learning Center',     url: undefined, img: "https://source.unsplash.com/random/?technology" },
    {
      id: 'admin-panel',        name: 'Admin Panel', url: `${urls.portal}/painel-adm`, img: "https://source.unsplash.com/random/?textures-patterns",
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
  const profileItem = itemsSlider.find(item => item.id === 'profile')
  const isacItem = itemsSlider.find(item => item.id === 'ivrim-automator')
  const portalItem = itemsSlider.find(item => item.id === 'ivrim-flows')
  const copilotItem = itemsSlider.find(item => item.id === 'co-pilot-dashboard')

  useEffect(() => {
    if(!user) return;
    (async () => {
      const res = await getPublishedFlows(user.token);
      if(!res.result){
        toast.error(res.response)
        return;
      }
      
      if(!res.data) return;

      setWorkflows(res.data)
    })()
  }, [user?.token]);

  return (
    <div className="w-screen h-screen bg-gradient-bg overflow-hidden">
      <div className={style.header}>
        <div className={style.header__logo}>
          <img src={logo} alt="Ivrim Consulting"/>
        </div>
        <DropdownChooseEnterprise/>
      </div>
      <div className="overflow-auto h-full flex-col sm:flex-row flex items-start sm:justify-between py-15 px-6 lg:max-w-[95%] w-full mx-auto">
        <div className="flex flex-wrap gap-4 mb-4">
          {isacItem && (
            <button
              type="button"
              className="
                bg-gradient-glass backdrop-blur-[25px] rounded-lg 
                hover:bg-gray-100/10 w-56 h-44
                px-8 py-14 text-gray-100
                flex flex-col items-center justify-center text-center gap-1
              "
              onClick={() => redirectToApp({ url: isacItem.url, disabled: isacItem.disabled}, toast, navigate)}
            >
              <h3 className="text-xl font-semibold leading-none">Criar Workflow</h3>
              <PlusIcon/>
            </button>
          )}
          {workflows.map((flow) => (
            <button
              type="button"
              className="
                bg-gradient-glass backdrop-blur-[25px] rounded-lg 
                hover:bg-gray-100/10
                px-8 py-14 text-gray-100 w-56 h-44
                flex flex-col items-center justify-center text-center gap-1
              "
              onClick={() => redirectToApp({ url: `${getUrls('front')?.wf}modulo/${flow._id}?token=${user?.token}` }, toast, navigate)}
            >
              <h3 className="text-xl font-semibold leading-none">{flow.title}</h3>
              <em className="text-xs uppercase text-gray-300">Fluxo: {flow.theme}</em>
            </button>
          ))}
          {user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client) && portalItem && (
            <button
              type="button"
              className="
                bg-gradient-glass backdrop-blur-[25px] rounded-lg 
                hover:bg-gray-100/10
                px-8 py-14 text-gray-100 w-56 h-44
                flex flex-col items-center justify-center text-center gap-1
              "
              onClick={() => redirectToApp({ url: portalItem.url, disabled: portalItem.disabled}, toast, navigate)}
            >
              <h3 className="text-xl font-semibold leading-none">Contas a Pagar</h3>
              <em className="text-xs uppercase text-gray-300">Fluxo: Financeiro</em>
            </button>
          )}
          {copilotItem && (
            <button
              type="button"
              className="
                bg-gradient-glass backdrop-blur-[25px] rounded-lg 
                hover:bg-gray-100/10
                px-8 py-14 text-gray-100 w-56 h-44
                flex flex-col items-center justify-center text-center gap-1
              "
              onClick={() => redirectToApp({ url: copilotItem.url, disabled: copilotItem.disabled}, toast, navigate)}
            >
              <h3 className="text-xl font-semibold leading-none">Dashboards</h3>
              <em className="text-xs uppercase text-gray-300">Copilot</em>
            </button>
          )}
        </div>
        <div className="bg-gradient-glass backdrop-blur-[25px] rounded-lg flex flex-col gap-2 p-4 text-gray-100">
          <strong className="text-sm text-center text-gray-100 uppercase block -mt-1">Menu de Navegação</strong>
          <ul className="grid grid-cols-2 gap-2 pb-2">
            {profileItem && (
              <li className="bg-gray-100/10 hover:bg-gray-100/20 rounded-lg font-semibold">
                <button
                  type="button"
                  className="h-20 w-full p-4 text-center text-sm truncate"
                  onClick={() => redirectToApp({ url: profileItem.url, disabled: profileItem.disabled}, toast, navigate)}
                >Perfil</button>
              </li>
            )}
            <li className="bg-gray-100/10 hover:bg-gray-100/20 rounded-lg font-semibold">
              <button
                type="button"
                className="h-20 w-full p-4 text-center text-sm truncate"
                onClick={() => toast.warning('Em Desenvolvimento')}
              >Armazenamento</button>
            </li>
            
            {painelItem && (
              <li className="bg-gray-100/10 hover:bg-gray-100/20 rounded-lg font-semibold">
                <button
                  type="button"
                  className="h-20 w-full p-4 text-center text-sm truncate"
                  onClick={() => redirectToApp({ url: painelItem.url, disabled: painelItem.disabled}, toast, navigate)}
                >Painel Admin</button>
              </li>
            )}
          </ul>
        </div>
        <div className="absolute bottom-4 z-50 w-[95%] flex justify-end pr-1">
          <ButtonHelp/>
        </div>
      </div>
    </div>
  )
}