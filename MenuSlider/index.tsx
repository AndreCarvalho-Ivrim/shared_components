import style from "./style.module.scss";
import logo from "../assets/ISAC.png";
import ISAC from "../assets/ISAC_PB.png";
import DASHBOARD from "../assets/IVRIM-DASHBOARD_PB.png";
import REPORT from "../assets/IVRIM-REPORT_PB.png";
import VISION from "../assets/IVRIM-VISION360_PB.png";
import iconPagar from "../assets/contas-a-pagar.svg";
import Folder from "../../shared-components/assets/folder-user.svg";
import FolderFinance from "../../shared-components/assets/finance-folder.svg";
import Mail from "../../shared-components/assets/mail.svg";
import profileCircle from "../assets/icon _profile circled_.svg";
import settings from "../assets/icon _settings_.svg";
import isac from "../assets/IconsGeo_Prancheta 2.svg"
import vision from "../assets/IconsGeo_Prancheta 3.svg"
import report from "../assets/icon_article.png"
import dashbord from "../assets/icon_bar_chart.png"
import { ConteinerIAS, ConteinerICI, ConteinerFlows, ConteinerIFM } from "./MenuConteiner";

import { AvailableWorkflowThemeType, PossiblePermissions, WorkflowType } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNotify } from "../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { DropdownChooseEnterprise } from "../Wrapper/v3/DropdownChooseEnterprise";
import { useEffect, useState } from "react";
import { getPublishedFlows } from "../services/workflow";
import { CloseIcon, LockIcon, PinIcon, RefreshIcon } from "../utils/icons";
import { handleRegexUrl } from "../../shared-types/utils/routes";
import { BellNotification } from "../Wrapper/v3/Notification/BellNotification";
import { ButtonHelp } from "../Wrapper/v3/ButtonHelp";
import { IconByTheme } from "../Wrapper";
import { ActivityPanel } from "../ActivityPanel";
import { NotificationPanel } from "../NotificationPanel";

const clientsWithAccessToCAP = { };

const getButtonColorClass = (theme: AvailableWorkflowThemeType) => {
  switch (theme) {
    case "Cobrança": case "Financeiro": return "bg-[#4B92FF] border-[#5CA3FF] hover:brightness-110";
    case "Comercial": return "bg-[#CBBC5A] border-[#DCCD6B] hover:brightness-110";
    case "Gamificação": return "bg-[#006B7F] border-[#117C90] hover:brightness-110";
    case "Supply": return "bg-[#78A799] border-[#89B8aa] hover:brightness-110";
    case "Field Management": return "bg-[#FEC67C] border-[#FFD78D] hover:brightness-110 text-gray-800";
    case "Gestão": return "bg-[#E0CFA3] border-[#F1E0B4] hover:brightness-110";
    default: return "bg-primary-700 border-primary-800 hover:bg-primary-600";
  }
};
// TODO FUNÇÃO OBSOLETA, REMOVER TODAS AS MENÇOES A ELA E DEPOIS REMOVER FUNÇÃO
export const redirectToApp = (
  { url, disabled }: { url: string | undefined; disabled?: boolean },
  toast: any,
  navigate: any
) => {
  if (!url) {
    toast.warning("Está solução ainda não está disponível");
    return;
  }

  if (disabled) {
    toast.error(
      "Você não tem permissão para acessar essa sessão com esta empresa"
    );
    return;
  }

  if (url.substring(0, 4) === "http") window.location.href = url;
  else navigate(url);
};



export const Menu = () =>{
  const { toast } = useNotify();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inFixation, setInFixation] = useState(false);
  const [isFixeds, setIsFixeds] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { loadWorkflows () }, [user, user?.token]);
  useEffect(() => {
    if(isLoading || workflows.length === 0 || isFixeds.length === 0) return;

    setWorkflows(isFixeds.length > 0 ? workflows.sort((a,b) => {
      const aIndex = isFixeds.indexOf(a._id.toString());
      const bIndex = isFixeds.indexOf(b._id.toString());
  
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      else if (aIndex !== -1) return -1;
      else if (bIndex !== -1) return 1;
      else return 0;
    }) : workflows)
  },[isFixeds])

  
  function handleToggleFixed(flow_id: string){
    setIsFixeds((prevState) => {
      const newState = prevState.includes(flow_id) ? prevState.filter(
        (state) => state !== flow_id
      ):[...prevState, flow_id]

      if(user?.current_client) localStorage.setItem(
        `isac@fixed:${user.current_client}`, newState.join(',')
      );

      return newState;
    })
  }
  function getStorageFixeds(){
    if(!user?.current_client) return [];

    const storaged = localStorage.getItem(`isac@fixed:${user.current_client}`);
    const fixeds = typeof storaged === 'string' ? storaged.split(',').filter(
      (st) => !!st
    ): [];

    setIsFixeds(fixeds);
    return fixeds;
  }
  async function loadWorkflows(){
    if (!user || isLoading) return;

    setIsLoading(true);
    await (async () => {
      const res = await getPublishedFlows(user.token);
      if (!res.result) {
        toast.error(res.response);
        return;
      }
  
      if (!res.data) return;
  
      const fixeds = getStorageFixeds();
  
      const availableFlows = res.data.filter(wf => !wf.hidden);
      setWorkflows(fixeds.length > 0 ? availableFlows.sort((a,b) => {
        const aIndex = fixeds.indexOf(a._id.toString());
        const bIndex = fixeds.indexOf(b._id.toString());
    
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        else if (aIndex !== -1) return -1;
        else if (bIndex !== -1) return 1;
        else return 0;
      }) : availableFlows)
    })();
    setIsLoading(false);
  }
  
  return (

    <div className="w-screen h-screen bg-background overflow-auto flex flex-col"> 
      <div className={style.header}>
        <div className={style.header__logo}> 
          <img src={logo} alt="Ivrim Consulting"/> 
        </div>
        <div className="flex items-center gap-4"> 
          <BellNotification />
          <DropdownChooseEnterprise />
        </div> 
      </div>

      <div className="
        flex-row flex-wrap flex justify-start
        lg:justify-evenly px-6
        w-full sm:max-w-[900px] lg:max-w-[95%] xl:max-w-[1580px] 
        mx-auto gap-2
      ">
        <div className="flex flex-col flex-1 lg:flex-none lg:min-w-[22rem]">
          <div className="grid xsm:grid-cols-3">
           
          </div>

          <div className="grid xsm:grid-cols-3">
            
          </div>
           
          <ConteinerFlows
            title="IFI - Ivrim Financial Inteligence"
            handleToggleFixed={handleToggleFixed}
            inFixation={inFixation}
            isFixeds={isFixeds}
            workflows={workflows.filter(workflow => ['Cobrança', "Financeiro"].includes(workflow.theme))}
          />
           <ConteinerFlows
            title="ISI - Ivrim Supply Inteligence"
            handleToggleFixed={handleToggleFixed}
            inFixation={inFixation}
            isFixeds={isFixeds}
            workflows={workflows.filter(workflow => workflow.theme === 'Supply')}
          />
          <ConteinerIFM/>
        </div>

        <div className="flex flex-col flex-1 lg:flex-none lg:min-w-[22rem]">
          <div className="grid xsm:grid-cols-3">
 
            
           
          </div>

          <div className="grid xsm:grid-cols-3">
            
          </div>
           
           <ConteinerIAS/>
          <ConteinerICI/>
          <ConteinerICI/>
          
        </div>

      <div className="flex flex-col flex-1 lg:flex-none lg:min-w-[22rem]">
         

          
           
         
           <NotificationPanel/>

          <ActivityPanel/>
    
        </div>

      <div className="flex flex-col flex-1 lg:flex-none lg:min-w-[5rem]">
          <div className="grid xsm:grid-cols-3">
 
            
           
          </div>

          
           
           

          <SideMenu/>
    
        </div>

      </div>

      <footer className="mt-auto d-flex items-center justify-center text-center py-4">
        <p className="text-gray-600 text-sm">Ivrim {new Date().getUTCFullYear()} © Todos os direitos reservados</p>
      </footer>

</div>

     
  );
};

export const SideMenu = () =>{
  const { user } = useAuth();
  const { toast } = useNotify();
  const navigate = useNavigate();
 

  return(

      <div className=" rounded-lg border border-gray-300 bg-[#4B92FF] backdrop-blur-[10px] min-h-[50rem]">
      
       <button
                className=" m-5 h-20 rounded-md flex flex-col justify-center items-center"
                onClick={() => redirectToApp({ url: handleRegexUrl('@hub:profile.home', user?.token) }, toast, navigate)}
              >
                <img src={profileCircle} alt="Icone de usuário" width={50} height={50} className="pt-2 object-center" />
              
              </button>


  <button 
                className=" m-5 h-20 rounded-md flex flex-col justify-center items-center"
                onClick={() => redirectToApp({ url: handleRegexUrl('@hub:dashboard.home', user?.token) }, toast, navigate)}
                >
                
                <img src= {dashbord} alt="Icone de Dashbord" width={50} height={50} className="pt-2 object-center"  />
                <span className="text-xs text-white pb-1 pt-2 w-full truncate hover:whitespace-normal font-semibold">Dashbord</span>


                </button>

  <button 
                className=" m-5 h-20 rounded-md flex flex-col justify-center items-center"
                onClick={() => redirectToApp({ url: handleRegexUrl('@isac:report.home', user?.token) }, toast, navigate)}
                >
                
                <img src= {report} alt="Icone de Dashbord" width={50} height={50} className="pt-2 object-center"  />
                <span className="text-xs text-white pb-1 pt-2 w-full truncate hover:whitespace-normal font-semibold">Dashbord</span>


                </button>              



  </div>

  );
};


export const MenuSlider = () => {



  const { toast } = useNotify();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inFixation, setInFixation] = useState(false);
  const [isFixeds, setIsFixeds] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { loadWorkflows() }, [user, user?.token]);
  useEffect(() => {
    if(isLoading || workflows.length === 0 || isFixeds.length === 0) return;

    setWorkflows(isFixeds.length > 0 ? workflows.sort((a,b) => {
      const aIndex = isFixeds.indexOf(a._id.toString());
      const bIndex = isFixeds.indexOf(b._id.toString());
  
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      else if (aIndex !== -1) return -1;
      else if (bIndex !== -1) return 1;
      else return 0;
    }) : workflows)
  },[isFixeds])

  function handleToggleFixed(flow_id: string){
    setIsFixeds((prevState) => {
      const newState = prevState.includes(flow_id) ? prevState.filter(
        (state) => state !== flow_id
      ):[...prevState, flow_id]

      if(user?.current_client) localStorage.setItem(
        `isac@fixed:${user.current_client}`, newState.join(',')
      );

      return newState;
    })
  }
  function getStorageFixeds(){
    if(!user?.current_client) return [];

    const storaged = localStorage.getItem(`isac@fixed:${user.current_client}`);
    const fixeds = typeof storaged === 'string' ? storaged.split(',').filter(
      (st) => !!st
    ): [];

    setIsFixeds(fixeds);
    return fixeds;
  }
  async function loadWorkflows(){
    if (!user || isLoading) return;

    setIsLoading(true);
    await (async () => {
      const res = await getPublishedFlows(user.token);
      if (!res.result) {
        toast.error(res.response);
        return;
      }
  
      if (!res.data) return;
  
      const fixeds = getStorageFixeds();
  
      const availableFlows = res.data.filter(wf => !wf.hidden);
      setWorkflows(fixeds.length > 0 ? availableFlows.sort((a,b) => {
        const aIndex = fixeds.indexOf(a._id.toString());
        const bIndex = fixeds.indexOf(b._id.toString());
    
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        else if (aIndex !== -1) return -1;
        else if (bIndex !== -1) return 1;
        else return 0;
      }) : availableFlows)
    })();
    setIsLoading(false);
  }

  return (
    <div className="w-screen h-screen bg-background overflow-auto flex flex-col"> 
      <div className={style.header}>
        <div className={style.header__logo}> 
          <img src={logo} alt="Ivrim Consulting"/> 
        </div>
        <div className="flex items-center gap-4"> 
          <BellNotification />
          <DropdownChooseEnterprise />
        </div> 
      </div>

      <div className="
        flex-row flex-wrap flex justify-start
        lg:justify-evenly px-6
        w-full sm:max-w-[900px] lg:max-w-[95%] xl:max-w-[1580px] 
        mx-auto gap-2
      ">
        <div className= "flex flex-col flex-1 lg:flex-none lg:min-w-[5rem]">
        <section className="flex flex-col sm:flex-row w-full sm:w-auto items-start">
         



      

      





          <div className="relative">
            {workflows.length > 4 && (
              <button
                type="button"
                className="absolute top-1 -right-6 text-gray-500 py-1 px-0.5 bg-gray-300/50 rounded-lg opacity-75 hover:opacity-100"
                onClick={() => setInFixation(!inFixation)}
              >{inFixation ? (<CloseIcon w={18} h={18}/>):(<PinIcon w={18} h={18}/>)}</button>
            )}
            <div className="flex sm:flex-col overflow-y-auto min-w-[7.2rem] max-h-[calc(6.25rem*4+2.25rem)]">
              {workflows.map((flow) => {
                const isFixed = isFixeds.includes(flow._id);
                return (
                  <button
                    className={`
                      relative m-1 min-w-[6.15rem] w-[6.15rem] min-h-[6.25rem] h-[6.25rem]
                      rounded-md flex flex-col items-center justify-center ${getButtonColorClass(flow.theme)}
                      ${inFixation && !isFixed ? 'opacity-70 hover:opacity-80':''}
                    `}
                    style={{  borderStyle: 'solid', borderWidth: '3px' }}
                    onClick={() => {
                      if(inFixation) handleToggleFixed(flow._id);
                      else redirectToApp({
                        url: handleRegexUrl(`@isac:workflow.exec(${flow._id})` as any, user?.token)
                      }, toast, navigate)
                    }}
                    key={flow._id}
                  >
                    <div className={style.adjustCards}>
                      <IconByTheme theme={flow.theme} props={{ color: 'black', w: 28, h: 28 }}>
                        <span className="uppercase text-gray-700 font-semibold text-lg block mr-1.5 -mt-1">{(flow.title ?? '').slice(0, 2)}</span>
                      </IconByTheme>
                    </div>
                    <div className="mt-10 h-full flex items-center">
                    <span className={`max-w-[100%] px-1.5 text-xs text-center hover:whitespace-normal font-semibold ${
                      ['Gestão', 'Field Management'].includes(flow.theme) ? 'text-gray-800':'text-white'
                    }`}>
                        {flow.title.slice(0, 38)}{flow.title.length > 38 && '...'}
                      </span>
                    </div>
                    {isFixed && (
                      <div className="w-full rounded-b-md flex justify-center bg-gray-50/40 py-0.5 text-gray-600">
                        <PinIcon w={12} h={12}/>
                      </div>
                    )}
                  </button>
                );
              })}
              {user && user.current_client && user.current_client === "c8682884-0928-4664-a609-7c9a984c71c1" && (
                <button
                  className="relative bg-primary-700 hover:bg-primary-600 m-1 min-w-[6.15rem] w-[6.15rem] min-h-[6.15rem] h-[6.15rem] rounded-md flex flex-col items-center justify-center"
                  onClick={() => redirectToApp({
                    url: handleRegexUrl(`@hub:reconciliation.manage`, user.token),
                    disabled: !user?.permitions_slug?.includes(PossiblePermissions.FINANCEIRO),
                  }, toast, navigate)}
                >
                  <div className={style.adjustCards}> </div>
                  <img
                    src={iconPagar}
                    alt="wallet icon"
                    className="absolute top-4 right-2 transform -translate-1 -translate-y-2 "
                  />
                  <span className="text-white text-xs text-center truncate hover:whitespace-normal mt-7">
                    Contas a Receber
                  </span>

                  {!user?.permitions_slug?.includes(PossiblePermissions.FINANCEIRO) && (
                    <span className="bg-gray-800/30 absolute inset-0 flex items-center justify-center text-white rounded-md">
                      <LockIcon w={26} h={26} />
                    </span>
                  )}
                </button>
              )}
              {(user && user.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client)) ? (
                <button
                  className="relative bg-primary-600 hover:bg-primary-600 m-1 min-w-[6.15rem] w-[6.15rem] min-h-[6.15rem] h-[6.15rem] rounded-md flex flex-col items-center justify-center"
                  onClick={() => redirectToApp({
                    url: handleRegexUrl('@hub:old_cap.home', user.token),
                    disabled: !user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR)
                  }, toast, navigate)}
                >
                  <div className={style.adjustCards}> </div>
                  <img
                    src={iconPagar}
                    alt="wallet icon"
                    className="absolute top-4 right-2 transform -translate-1 -translate-y-2 "
                  />
                  <span className="text-white text-xs text-center truncate hover:whitespace-normal mt-7">Contas a pagar</span>
                </button>
              ) : !(user && user.current_client && user.current_client === "c8682884-0928-4664-a609-7c9a984c71c1") && workflows.length === 0 ? (
                <div className="
                  bg-gray-300 hover:bg-gray-300 m-1 p-1 min-w-[6.25rem] w-[6.25rem] min-h-[6.25rem] h-[6.25rem] rounded-md flex flex-col items-center justify-center
                  text-center text-xs text-gray-500 opacity-75
                ">Você não<br />possui nenhum aplicativo<br />criado</div>
              ) : <></>}
            </div>
          </div>
        </section>
        </div>

       
        

      

        

      </div>

      <footer className="mt-auto d-flex items-center justify-center text-center py-4">
        <p className="text-gray-600 text-sm">Ivrim {new Date().getUTCFullYear()} © Todos os direitos reservados</p>
      </footer>

      <div className="absolute bottom-8 right-4 flex flex-col justify-between z-50">
        <ButtonHelp />
      </div>
    </div>
  );
};
