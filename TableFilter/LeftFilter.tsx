import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "../utils/icons";
import { useExecuteFlow } from "../../contexts/ExecuteFlowContext";
import { FlowActions } from "../../components/ExecuteFlow/FlowActions";
import { WorkflowViewModeTable } from "../../shared-types";

interface LeftFilterProps{
  selectedStep: string[],
  setSelectedStep: React.Dispatch<React.SetStateAction<string[]>>
  availableSteps: { name: string, _id: string }[],
  hasSelected: boolean,
  view_mode: WorkflowViewModeTable,
  fn: {
    start: () => void,
    delete: () => void,
    callStep: (target: string) => void,
    updateSelected: (action_id: string, _id?: string) => void
  }
}
export const LeftFilter = ({
  selectedStep,
  setSelectedStep,
  availableSteps,
  hasSelected,
  view_mode,
  fn,
}: LeftFilterProps) => {
  const { workflow } = useExecuteFlow()

  const divStatusRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (divStatusRef.current && !divStatusRef.current.contains(event.target as Node)) {
      divStatusRef.current.classList.remove('expanded');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative group" ref={divStatusRef}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            text-sm text-start
            w-40 h-10 p-4
            border border-primary-500/20 bg-gray-100/5
            outline-none focus:ring-gray-100/50 focus:ring-1
            flex items-center justify-between gap-2
            rounded-md backdrop-blur-[25px]
          "
          onClick={() => {
            if(!divStatusRef.current) return;

            divStatusRef.current.classList.toggle('expanded');
          }}
        >
          <span className="truncate font-semibold">
            {selectedStep.length === 0 || selectedStep.length === (availableSteps ?? []).length ? 'Todos' : (
              selectedStep.length === 1 ? availableSteps?.find(s => s._id === selectedStep[0])?.name : 
              `${selectedStep!.length} etapas selecionadas`
            )}
          </span>
          <ArrowRightIcon className="rotate-90 group-[.expanded]:-rotate-90"/>
        </button>
        {workflow && workflow.config && workflow.config.actions && (
          <FlowActions
            actions={workflow.config.actions}
            view_mode={view_mode.slug}
            render_in="filter-bar"
            hasSelected={hasSelected}
            fn={fn}
          />
        )}
      </div>
      <div className={`
        hidden group-[.expanded]:flex flex-col
        absolute left-0 z-20
        focus:outline-none p-2
        ring-1 ring-black ring-opacity-5
        mt-0.5 w-72 origin-top-right rounded-md
        bg-gray-100/70 backdrop-blur-[25px] shadow-lg
      `}>
        <div className="grid grid-cols-2 gap-2">
          {[{ name: 'Todos', _id: 'all' }, ...(availableSteps ?? [])].map((step) => (
            <button
              className={`
                font-semibold text-gray-700 text-sm text-start truncate
                backdrop-blur-[25px] hover:bg-gray-50/60 
                rounded-lg w-full p-2 ${
                  (step.name === 'Todos' && (
                    selectedStep.length === 0 || selectedStep.length === (availableSteps ?? []).length
                  )) || selectedStep.includes(step._id) ? '!bg-gray-50/75':''
                }
              `}
              onClick={() => setSelectedStep(prevState => {
                if(step.name  === 'Todos') return prevState.length === 0 ? availableSteps?.map(s => s._id) ?? [] : [];
                
                if(prevState.includes(step._id)) return prevState.filter(s => s !== step._id);

                return [
                ...prevState, step._id
                ].filter((_id, index, self) => index === self.findIndex((t) => t === _id));
              })}
              key={step._id}
            >{step.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
}