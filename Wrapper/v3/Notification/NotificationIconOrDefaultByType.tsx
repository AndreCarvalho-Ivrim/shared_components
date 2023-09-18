import { NotificationType } from "../../../../shared-types/notification.type"
import { IconProps, getIconByName } from "../../../utils/icons"

interface NotificationIconOrDefaultByType{
  notification: NotificationType,
  props?: IconProps
}
export const NotificationIconOrDefaultByType = ({ notification, props }: NotificationIconOrDefaultByType) => {
  if(notification.icon){
    return <>{getIconByName(notification.icon, props)}</>
  }
  return <>{
    notification.type === 'alert' ? getIconByName('UserVoiceIcon', props) :
    notification.type === 'license' ? getIconByName('ReceiptIcon', props) :
    notification.type === 'mention' ? getIconByName('MentionIcon', props) :
    notification.type === 'reminder' ? getIconByName('StopWatchIcon', props) :
    notification.type === 'update' ? getIconByName('RefreshIcon', props) :
    getIconByName('InfoIcon', props)
  }</>
}

