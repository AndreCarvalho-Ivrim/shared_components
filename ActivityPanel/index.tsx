import { useEffect, useState } from "react";
import { TableFooter } from "../TableFooter";
import { ArrowRightIcon, DetalistIcon, getIconByName } from "../utils/icons";
import { Loading } from "../../components/Loading";
import { ActivityPanelType } from "../../shared-types/activity_panel.type";
import { Avatar } from "../utils/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { getActivityPanel } from "../services/activity_panel";
import { useNotify } from "../../contexts/NotifyContext";
import { ActivityItem } from "./ActivityItem";

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
    setIsLoading(false);
    
    if(!res.result){
      toast.error(res.response)
      return
    }

    setActivities(res.data ? res.data : [])
  }
  
  return (
    <div className={`h-full flex flex-col justify-between p-1`}>
      <div>
        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-gradient-glass backdrop-blur-[25px] min-h-[15rem]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs  text-primary-800 uppercase bg-primary-500/5">
              <tr>
                <th className="px-3 py-2 font-bold">Painel de Atividades</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="">
              {activities.slice(pageIndex * perPage, (pageIndex + 1) * perPage).map(activity => (
                <ActivityItem activity={activity} key={activity.id}/>
              ))}
              {activities.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-3 py-10 text-center text-sm text-gray-500 bg-gray-300/50 opacity-70"
                  >
                    <div className="min-h-[8rem] flex items-center justify-center">
                      Não há atividades<br/>
                      programadas no momento
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isLoading && <Loading className="absolute inset-0 z-50 bg-gray-50/75"/>}
    </div>
  )
}