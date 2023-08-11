import { StateFilterItem } from "./StateFilterItem";
import { WorkflowConfigFilterType } from "../../shared-types";
import { Fragment } from "react";

interface StateFilterProps{
  availableSteps?: { name: string, _id: string }[],
  isApplied: boolean,
  selectedStep: string[],
  setSelectedStep: React.Dispatch<React.SetStateAction<string[]>>,
  setDynamicFilter: React.Dispatch<React.SetStateAction<Record<string,{ value: any, ref: (string | string[]), type: WorkflowConfigFilterType['type'] }>>>,
  dynamicFilter: Record<string,{ value: any, ref: (string | string[]), type: WorkflowConfigFilterType['type'] }>,
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
  setSelectedStep,
  handleApplyFilter,
  setDynamicFilter,
  dynamicFilter,
}: StateFilterProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="text-sm text-primary-700/70 flex flex-wrap gap-2">
        {availableSteps && selectedStep && selectedStep.filter(s => s !== 'Todos').length > 0 && (
          <StateFilterItem
            title="Status"
            isApplied={isApplied}
            onClear={() => setSelectedStep([])}
          >{availableSteps.filter(s => selectedStep.includes(s._id)).map((s) => s.name).join(', ')}</StateFilterItem>
        )}
        {Object.entries(dynamicFilter).map(([key, data]) => data.type === 'text' ? (
          <>
            {data.value ? (
              <StateFilterItem
                title={key}
                isApplied={isApplied}
                onClear={() => setDynamicFilter(prevState => ({
                  ...prevState,
                  [key]: {
                    ...prevState[key],
                    value: undefined
                  }
                }))}
                key={key}
              >{data.value}</StateFilterItem>
            ):<></>}
          </>
        ) : data.type === 'date' ? (
          <Fragment key={key}>
            {data.value.startDate && data.value.endDate && (
              <StateFilterItem
                title={key}
                isApplied={isApplied}
                onClear={() => setDynamicFilter(prevState => ({
                  ...prevState, [key]: {
                    ...prevState[key],
                    value: { startDate: null, endDate: null }
                  }
                }))}
              >{formatDate(data.value.startDate as string)} ~ {formatDate(data.value.endDate as string)}</StateFilterItem>
            )}
          </Fragment>
        ):'')}
      </div>

      {!isApplied && (
        <button type="button" className="
        text-primary-700 font-semibold bg-gradient-light
          bg-gray-100 hover:bg-gray-50 text-xs 
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