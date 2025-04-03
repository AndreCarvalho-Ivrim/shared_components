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
import report from "../assets/IconsGeo_Prancheta 1.svg"
import dashboard from "../assets/IconsGeo_Prancheta 4.svg"

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

interface ContainerProps{
  title: string,
  theme: AvailableWorkflowThemeType,
  workflows: WorkflowType[],
  inFixation: boolean,
  handleToggleFixed: (flow_id: string) => void,
  isFixeds: string[]
}
export const ConteinerFlows = ({
  title,
  theme,
  workflows,
  inFixation,
  handleToggleFixed,
  isFixeds
}:ContainerProps) => {
  const { user } = useAuth();
  const { toast } = useNotify();
  const navigate = useNavigate();
  const isFinancial = title === "IFI - Ivrim Financial Inteligence"

  return (
    <div className={`h-full flex flex-col justify-between p-1 `}>
    
      <div className="  px-2 rounded-lg  bg-gray-50/80 backdrop-blur-[25px] shadow-lg ">
      <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs  text-primary-800 uppercase"> 
              <tr>
                <th className="px-3 py-2 font-bold sticky top-0 z-10 ">{title}</th>
              </tr>
            </thead> 
          </table>
        <div className=" overflow-x-auto  " >
        

          <section className="flex sm:flex-col sm:flex-row w-full sm:w-auto items-start  ">
         
            
            <div className="relative  ">
           
              <div className="flex sm:flex-wrap  w-[15rem] 2xl:w-[20rem]   md:h-[9rem]    sm:h-[13rem] 2xl:h-[13rem]  ">
              
                {workflows.map((flow) => {
                  const isFixed = isFixeds.includes(flow._id);
                  return (

              <div className=" ">            
        
                    <button
                      className={`
                        relative ml-5 mb-2 mt-2  w-[5.25rem] 2xl:w-[6.25rem] h-[5.25rem] 2xl:h-[6.25rem]
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
 
                    </div>
                  

                  );
                })}

                {(isFinancial &&  user?.current_client === "c8682884-0928-4664-a609-7c9a984c71c1" )&&(
                 
                 <div className="w-[48%] "> 
                 <button
                    className="relative bg-primary-700 hover:bg-primary-600 m-2 w-[5.25rem] 2xl:w-[6.25rem] h-[5.25rem] 2xl:h-[6.25rem] rounded-md flex flex-col items-center justify-center"
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
                  </div>
                )}
                {( isFinancial && user?.current_client && Object.keys(clientsWithAccessToCAP).includes(user.current_client)) ? (
                 <div className="w-[48%] "> 
                 <button
                    className="relative  bg-primary-600 hover:bg-primary-600 m-2 w-[5.25rem] 2xl:w-[6.25rem] h-[5.25rem] 2xl:h-[6.25rem] rounded-md flex flex-col items-center justify-center"
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

                  </div>
                  


                ) : !(   isFinancial && user?.current_client === "c8682884-0928-4664-a609-7c9a984c71c1") && workflows.length === 0 ? (
                  <div className={`
                    ${getButtonColorClass(theme)}
                    m-5 p-1  w-[5.25rem] 2xl:w-[6.25rem] h-[5.25rem] 2xl:h-[6.25rem] rounded-md flex flex-col items-center justify-center
                    text-center text-xs text-gray-500 opacity-75 
                  `}>Você não<br />possui nenhum aplicativo<br />criado</div>

                ) : <></>}
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
