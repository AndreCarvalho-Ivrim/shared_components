import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { ActivityPanelType } from "../../shared-types/activity_panel.type";
import { useAuth } from "../../contexts/AuthContext";
import { getFlowActivityPanel, getActivityPanel } from "../services/activity_panel";
import { useNotify } from "../../contexts/NotifyContext";
import { ActivityItem } from "./ActivityItem";
import { WorkflowActivityItem } from "./WorkflowActivityItem";

const perPage = 5;
export const ActivityPanel = () => {
  const { user } = useAuth();
  const { toast } = useNotify();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityPanelType[]>([]);
  
  //#region HANDLE PAGINATION
  const [pageIndex, setPageIndex] = useState(0);
  const [canPreviousPage, setCanPreviousPage] = useState(false);
  const [canNextPage, setCanNextPage] = useState(false);

  const previousPage = () => setPageIndex((prevState) => {
    let newIndex = prevState - 1;
    if(newIndex >= 0) return newIndex;
    return prevState;
  });
  const nextPage = () => setPageIndex((prevState) => {
    let totalPagesInDB = Math.ceil((activities.length) / perPage);
    let newIndex = prevState + 1;

    if(newIndex >= totalPagesInDB || newIndex < 0) return prevState;
    return newIndex;
  });
  const goToPage = (index: number) => {
    let totalPagesInDB = Math.ceil((activities.length) / perPage);

    if(index >= totalPagesInDB || index < 0) return;
  
    setPageIndex(() => index);
  }

  useEffect(() => {
    setCanPreviousPage(pageIndex > 0)
    setCanNextPage(pageIndex < (Math.ceil((
      activities.length
    ) / perPage) - 1))
  },[pageIndex, activities, perPage]);
  //#endregion HANDLE PAGINATION

  useEffect(() => {
    loadActivityPanel()
  }, [user])

  async function loadActivityPanel(){
    if(!user) return;

    setIsLoading(true);
    const res = await getActivityPanel(user.token);
    const res_flow_activity = await getFlowActivityPanel(user.token);
    setIsLoading(false);
    
    if(!res.result){
      toast.error(res.response)
      return
    }
    if(!res_flow_activity.result){
      toast.error(res_flow_activity.response)
      return
    }
    
    const flow_activities = res_flow_activity.data?.map((data: any) => ({
      description: data.description,
      title: data.wf,
      mode: 'workflow-activity',
      avatar: data.avatar,
      icon: data.icon,
      redirect_to: data.redirect_to,
      theme: data.theme,
      id: crypto.randomUUID(),
      active: true,
      client_id: user.current_client
    } as ActivityPanelType)) ?? [];
    
    setActivities([
      ...(res.data ?? []),
      ...(flow_activities ?? []),
    ]);
  }
  
  return (
    <div className="h-full bg-gray-50/20 backdrop:blur-lg rounded-xl overflow-hidden flex flex-col flex-1">
      <strong className="bg-gray-50/40 block w-full text-xs text-center uppercase font-semibold py-1 px-2">Painel de Atividades</strong>
  
      <div className="overflow-x-auto min-h-[15rem] flex-1">
        {activities.length === 0 ? (
          <div className="px-3 py-10 text-center text-sm text-gray-200 h-full min-h-[8rem] flex items-center justify-center">
            Não há atividades<br/>
            programadas no momento
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <tbody className="">
              {activities.slice(pageIndex * perPage, (pageIndex + 1) * perPage).map(activity => {
                if (activity.mode === 'workflow-activity') return <WorkflowActivityItem activity={activity} key={activity.id}/>
                else return <ActivityItem activity={activity} key={activity.id}/>
              })}
            </tbody>
          </table>
        )}
      </div>
      {isLoading && <Loading className="absolute inset-0 z-50 bg-gray-50/75"/>}
    </div>
  )
}