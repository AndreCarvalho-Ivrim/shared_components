import { useState } from "react"
import { ActivityPanelType } from "../../shared-types/activity_panel.type"
import { Avatar } from "../utils/Avatar"
import { getIconByName, DetalistIcon, ArrowRightIcon } from "../utils/icons"
import { handleRegexUrl } from "../../shared-types/utils/routes"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { IconByTheme } from "../Wrapper"
import { AvailableWorkflowThemeType } from "../../shared-types"
import { getButtonColorClass } from "../MenuSlider"

interface ActivePanelType extends ActivityPanelType {
  theme?: AvailableWorkflowThemeType
}
interface ActivityItemProps{
  activity: ActivePanelType
}

export const WorkflowActivityItem = ({ activity }:ActivityItemProps) => {
  const navigate = useNavigate();
  
  const { user, changeClient } = useAuth();

  const [dynamicBadge, setDynamicBadge] = useState(activity.badge);

  async function handleRedirectTo(){
    if(!user || !activity.redirect_to) return;

    let token = user.token;

    const url = handleRegexUrl(activity.redirect_to as any, token)
    if(url.slice(0, 4) === 'http') window.location.href = url;
    else navigate(url);
  }

  return (
    <tr className="hover:bg-gray-200/80 border-b last:border-none" onClick={handleRedirectTo}>
      <td className="px-3 py-4 cursor-pointer">
        <div className="flex items-center gap-2 max-w-full">
          {activity.theme ? (
            <div className={`p-1 rounded-lg ${getButtonColorClass(activity.theme)} text-white flex items-center justify-center`}>
              <IconByTheme theme={activity.theme} props={{ w: 22, h: 22, color: 'white' }} self_adjustment={false}>
                <span className="uppercase text-gray-700 font-semibold text-lg block mr-1.5 -mt-1">{(activity.title ?? '').slice(0, 2)}</span>
              </IconByTheme>
            </div>
          ) : activity.avatar ? (
            <Avatar picture={activity.avatar}/>
          ) : activity.icon ? getIconByName(activity.icon, { w: 18, h: 18 }) : (
            <DetalistIcon {...{ w: 18, h: 18 }}/>
          )}
          <div className="flex flex-col flex-1">
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
        </div>
      </td>
      <td className="px-3 py-4 cursor-pointer text-end w-[2rem] text-gray-500">
        <ArrowRightIcon/>
      </td>
    </tr>
  )
}