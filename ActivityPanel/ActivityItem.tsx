import { useEffect, useState } from "react"
import { ActivityPanelType } from "../../shared-types/activity_panel.type"
import { Avatar } from "../utils/Avatar"
import { getIconByName, DetalistIcon, ArrowRightIcon } from "../utils/icons"
import { Loading } from "../../components/Loading"
import { handleRegexUrl } from "../../shared-types/utils/routes"
import axios from "axios"
import { useNotify } from "../../contexts/NotifyContext"
import { checkStringConditional, getShortcodes } from "../../shared-types/utils/check-string-conditional"
import { getRecursiveValue } from "../../shared-types/utils/recursive-datas"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

interface ActivityItemProps{
  activity: ActivityPanelType
}

export const ActivityItem = ({ activity }:ActivityItemProps) => {
  const navigate = useNavigate();
  
  const { user, changeClient } = useAuth();
  const { toast } = useNotify();

  const [isActive, setIsActive] = useState(activity.active);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicBadge, setDynamicBadge] = useState(activity.badge);

  useEffect(() => {
    if(!activity.active) return;
    
    handleFn();
    let requestInterval = setInterval(handleFn, 20 * 1000);
    return () => clearInterval(requestInterval);
  }, [activity]);

  async function handleFn(){
    if(!isLoading) setIsLoading(true);
    const isSuccessfully = await (async () : Promise<boolean> => {
      if(activity.fn.type !== 'request') return false;
  
      console.log(`[requesting-${activity.id}]`)

      if(activity.fn.url.slice(0, 10) !== '@isac_back'){
        toast.error('Não é possível parametrizar atividades que fazem consultas externas');
        return false;
      }
        
      const url = handleRegexUrl(activity.fn.url as any)
      try{
        const { data } = await axios.get(url);
  
        const handleReplaceValue = (value: any) : any => {
          if(typeof value === 'string'){
            const shortcodes = getShortcodes(value);

            if(shortcodes.length > 0){
              if(shortcodes.length === 1 && value.length - 3 === shortcodes[0].length){
                value = getRecursiveValue(shortcodes[0], data)
              }else{
                console.error(`[request-error-${activity.id}]`, {
                  message: 'Sem suporte para múltiplos shortcodes',
                  value,
                  shortcodes
                })
              }
            }
          }

          return value;
        }

        for(const effect of activity.fn.effects){
          if(effect.only !== 'always' && (
            (effect.only === 'fail' && data.result) ||
            (effect.only === 'success' && !data.result)
          )) continue;
          
          if(effect.condition && !checkStringConditional(
            effect.condition, data.data ?? {}
          )) continue;
          
          if(effect.replace.active != undefined) setIsActive(
            !!handleReplaceValue(effect.replace.active)
          )
          if(effect.replace.badge_type != undefined) setDynamicBadge((prevState) => {
            const value = handleReplaceValue(effect.replace.badge_type)
            return { type: value, value: prevState?.value ?? 0 };
          })
          if(effect.replace.badge_value != undefined) setDynamicBadge((prevState) => {
            const value = handleReplaceValue(effect.replace.badge_value)
            return { value: value, type: prevState?.type ?? activity.badge?.type ?? 'warning' };
          })

          if(effect.breakExec) break;
        }

        return true;
      }catch(e){
        console.error(`[request-error-${activity.id}]`, e);
        return false;
      }
    })()
    if(!isSuccessfully) setIsActive(false);
    setIsLoading(false);
  }
  async function handleRedirectTo(){
    if(!user) return;

    let token = user.token;

    if(activity.for_the_client_id){
      const findedClient = (user.clients ?? []).find((client) => client.id === activity.for_the_client_id);

      if(!findedClient){
        toast.error('Você não pertence a empresa de destino');
        return;
      }

      const { data } = await changeClient(findedClient.id, findedClient.nome_fantasia, user.token)
      if(data?.token){
        token = data.token;
        await new Promise((resolve) => setTimeout(() => resolve(true), 500))
        console.log('novo token', { token })
      }
    }

    const url = handleRegexUrl(activity.redirect_to as any, token)

    if(url.slice(0, 4) === 'http') window.location.href = url;
    else navigate(url);
  }

  if(!isActive) return <></>;

  return (
    <tr className="hover:bg-gray-200/80 border-b last:border-none" onClick={handleRedirectTo}>
      <td className="px-3 py-4 cursor-pointer">
        <div className="flex items-center gap-2 max-w-full">
          {activity.avatar ? (
            <Avatar picture={activity.avatar}/>
          ) : activity.icon ? getIconByName(activity.icon, { w: 18, h: 18 }) : (
            <DetalistIcon {...{ w: 18, h: 18 }}/>
          )}
          {isLoading ? (
            <Loading className="bg-gray-300/50 rounded-lg w-full h-10" size="sm" />
          ):(
            <div className="flex flex-col">
              <div className="flex gap-1">
                <strong className="text-sm max-w-[calc(100%-2rem)] truncate">{activity.title}</strong>
                {(dynamicBadge && dynamicBadge.value > 0) && (
                  <span style={{ background: `var(--${dynamicBadge.type})` }} className={`
                    ${dynamicBadge.type === 'light' ? 'text-gray-700':'text-white'} text-[10px] rounded-full
                    w-4 h-4 flex items-center justify-center text-center
                  `}>
                    {dynamicBadge.value > 9 ? '+9' : dynamicBadge.value}
                  </span>
                )}
              </div>
              <span className="text-gray-500 text-xs font-normal">
                {activity.description.slice(0, 80) + (activity.description.length > 80 ? '...':'')}
              </span>
            </div>
          )}
        </div>
      </td>
      <td className="px-3 py-4 cursor-pointer text-end w-[2rem] text-gray-500">
        <ArrowRightIcon/>
      </td>
    </tr>
  )
}