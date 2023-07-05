import { useRef } from "react";
import { ArrowRightIcon, TrashIcon } from "../utils/icons";

interface LeftFilterProps{
  selectedStep: string[],
  setSelectedStep: React.Dispatch<React.SetStateAction<string[]>>
  availableSteps: { name: string, _id: string }[],
  hasSelectedForDelete: boolean,
  handleDeleteMultiple: () => void,
}
export const LeftFilter = ({
  selectedStep,
  setSelectedStep,
  availableSteps,
  hasSelectedForDelete,
  handleDeleteMultiple,
}: LeftFilterProps) => {
  const divStatusRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative group" ref={divStatusRef}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            text-sm text-start
            w-40 h-10 p-4
            border border-gray-50/10
            outline-none focus:ring-gray-100/50 focus:ring-1
            flex items-center justify-between gap-2
            rounded-md bg-gray-100/5 backdrop-blur-[25px]
          "
          onClick={() => {
            if(!divStatusRef.current) return;

            divStatusRef.current.classList.toggle('expanded');
          }}
        >
          <span className="truncate">
            {selectedStep.length === 0 || selectedStep.length === (availableSteps ?? []).length ? 'Todos' : (
              selectedStep.length === 1 ? availableSteps?.find(s => s._id === selectedStep[0])?.name : 
              `${selectedStep!.length} etapas selecionadas`
            )}
          </span>
          <ArrowRightIcon className="rotate-90 group-[.expanded]:-rotate-90"/>
        </button>
        {hasSelectedForDelete && (
          <button
            type="button"
            className="
              flex justify-center items-center
              my-auto p-2 border-transparent
              rounded-lg outline-none focus:ring-gray-100/50 focus:ring-1
              hover:bg-gray-100/20 hover:border-gray-300
            "
            onClick={handleDeleteMultiple}
          ><TrashIcon className="w-5 h-5 text-gray-200 dark:text-gray-400"/></button>
        )}
      </div>
      <div className={`
        hidden group-[.expanded]:flex flex-col
        absolute left-0 z-20
        focus:outline-none p-2
        ring-1 ring-black ring-opacity-5
        mt-0.5 w-72 origin-top-right rounded-md
        bg-gray-100/40 backdrop-blur-[25px] shadow-lg
      `}>
        <div className="grid grid-cols-2 gap-2">
          {[{ name: 'Todos', _id: 'all' }, ...(availableSteps ?? [])].map((step) => (
            <button
              className={`
                font-semibold text-gray-700 text-sm text-start truncate
                backdrop-blur-[25px] hover:bg-gray-50/30 
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