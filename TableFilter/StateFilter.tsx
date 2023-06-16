import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { StateFilterItem } from "./StateFilterItem";

interface StateFilterProps{
  availableSteps?: { name: string, _id: string }[],
  isApplied: boolean,
  selectedStep: string[],
  setSelectedStep: React.Dispatch<React.SetStateAction<string[]>>,
  // requester: string,
  // setRequester: React.Dispatch<React.SetStateAction<string>>,
  // poId: string,
  // setPoId: React.Dispatch<React.SetStateAction<string>>,
  // date: DateValueType,
  // setDate: React.Dispatch<React.SetStateAction<DateValueType>>,
  handleApplyFilter: () => void
}
const formatDate = (date: string) => {
  let [y, m, d] = date.split('-');
  if(!y || !m || !d) return date;
  if(d && d.length === 4){
    let temp = d;
    d = y;
    y = temp;
  }
  return `${d.padStart(2,'0')}/${m.padStart(2,'0')}/${y}`;
}
export const StateFilter = ({
  availableSteps,
  isApplied,
  selectedStep,
  // requester, poId, date,
  setSelectedStep,
  // setRequester, setPoId, setDate,
  handleApplyFilter
}: StateFilterProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm text-gray-200 flex flex-wrap gap-2">
        {availableSteps && selectedStep && selectedStep.filter(s => s !== 'Todos').length > 0 && (
          <StateFilterItem
            title="Status"
            isApplied={isApplied}
            onClear={() => setSelectedStep([])}
          >{availableSteps.filter(s => selectedStep.includes(s._id)).map((s) => s.name).join(', ')}</StateFilterItem>
        )}
        {/* {date && (
          <>
            {date.startDate && (
              <StateFilterItem
                title="Data Incial"
                isApplied={isApplied}
                onClear={() => setDate(null)}
              >{formatDate(date.startDate as string)}</StateFilterItem>
            )}
            {date.endDate && (
              <StateFilterItem
                title="Data Final"
                isApplied={isApplied}
                onClear={() => setDate(null)}
              >{formatDate(date.endDate as string)}</StateFilterItem>
            )}
          </>
        )}
        {requester && (
          <StateFilterItem
            title="Solicitante"
            isApplied={isApplied}
            onClear={() => setRequester('')}
          >{requester}</StateFilterItem>
        )}
        {poId && (
          <StateFilterItem
            title="Número da PO"
            isApplied={isApplied}
            onClear={() => setPoId('')}
          >{poId}</StateFilterItem>
        )} */}
      </div>

      {!isApplied && (
        <button type="button" className="
          text-gray-100 font-semibold text-xs 
          rounded-lg text-center py-2.5 px-3
          outline-none focus:ring-gray-100/50 focus:ring-1
          bg-gray-50/20 hover:bg-gray-50/30
          border border-gray-50/10
        " onClick={handleApplyFilter}>
          <span className="flex-1 text-center uppercase text-ellipsis overflow-hidden whitespace-nowrap block">
            Aplicar
          </span>
        </button>
      )}
    </div>
  );
}