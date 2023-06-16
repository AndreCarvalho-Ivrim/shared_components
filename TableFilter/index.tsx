import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, SearchIcon, TrashIcon } from "../utils/icons";
// import { Dropdown } from "../../shared-components/utils/Dropdown";
// import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { StateFilter } from "./StateFilter";
// import Datepicker from "react-tailwindcss-datepicker";
export interface FilterProps{
  availableSteps: { name: string, _id: string }[],
  filterStep: string[] | undefined;
  setFilterStep: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  isFiltering: boolean;
  // filterDate: DateValueType;
  // setFilterDate: React.Dispatch<React.SetStateAction<DateValueType>>;
  // filterRequester: string;
  // setFilterRequester: React.Dispatch<React.SetStateAction<string>>;
  // filterNumberPO: string;
  // setFilterNumberPO: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteMultiple: () => void;
  hasSelectedForDelete: boolean;
}
export const TableFilter = ({
  isFiltering, availableSteps,
  filterStep,
  // filterDate, filterRequester, filterNumberPO,
  setFilterStep,
  // setFilterDate, setFilterRequester, setFilterNumberPO,
  handleDeleteMultiple, hasSelectedForDelete
} : FilterProps) => {
  const divStatusRef = useRef<HTMLDivElement>(null);
  // const divSearchRef = useRef<HTMLDivElement>(null);
  
  const [isApplied, setIsApplied] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string[]>(filterStep ?? []);
  // const [searchType, setSearchType] = useState<AvailableSearchTypes>('Solicitante');
  // const [requester, setRequester] = useState(filterRequester);
  // const [poId, setPoId] = useState(filterNumberPO);
  // const [date, setDate] = useState(filterDate);
 
  useEffect(() => {
    setIsApplied(
      JSON.stringify([
        (selectedStep.length === 0 ? undefined : selectedStep), 
        // requester, poId, date
      ]) === JSON.stringify([
        filterStep, 
        // filterRequester, filterNumberPO, filterDate
      ])
    )
  },[
    selectedStep, 
    // requester, poId, date,
    filterStep, 
    // filterRequester, filterNumberPO, filterDate
  ]);

  function handleApplyFilter(){
    if(JSON.stringify(selectedStep) !== JSON.stringify(filterStep)) setFilterStep(
      selectedStep.length === 0 || selectedStep.length === (availableSteps ?? []).length ? undefined : selectedStep
    );
    // if(JSON.stringify(date) !== JSON.stringify(filterDate)) setFilterDate(date);
    // if(requester !== filterRequester) setFilterRequester(requester);
    // if(poId !== filterNumberPO) setFilterNumberPO(poId);

    setIsApplied(true);
  }

  return (
    <div className="
      relative bg-gradient-glass backdrop-blur-[25px] rounded-lg
      flex flex-col gap-2 mt-4 px-4 py-3 text-gray-100 mb-4 z-10
    ">
      <div className="flex justify-between gap-2">
        <div className="relative max-sm:hidden group" ref={divStatusRef}>
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

        {/* <div className="group relative flex items-center" ref={divSearchRef}>
          <div className="hidden group-[.show]:block mr-2">
            <Dropdown
              classNames={{ list: `
                absolute left-0 z-10
                mt-0.5 w-56 origin-top-right rounded-md
                bg-gray-100/40 backdrop-blur-[25px] shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none pb-2
              ` }}
              trigger={
                <div className="
                  p-4 w-40 h-10 rounded-md
                  border border-gray-50/10 bg-gray-100/5
                  flex items-center justify-between 
                  text-sm backdrop-blur-[25px]
                ">
                  {searchType}
                  <ArrowRightIcon className="rotate-90 group-data-[headlessui-state=open]:-rotate-90"/>
                </div>
              }
            >
              {(['Solicitante', 'Nº PO', 'Data'] as AvailableSearchTypes[]).map(type => (
                <button
                  className="text-gray-700 font-semibold text-sm rounded-lg backdrop-blur-[25px] w-full text-start p-2 hover:bg-gray-50/30"
                  onClick={() => setSearchType(type)}
                  key={type}
                >{type}</button>
              ))}
            </Dropdown>
          </div>
          {searchType === 'Data' ? (
            <div className="hidden group-[.show]:block mr-10">
              <Datepicker
                inputClassName={`
                  bg-gray-100/10 backdrop-blur-[25px]
                  
                  text-white text-sm rounded-lg 
                  placeholder-white
  
                  focus:ring-gray-100/20 focus:border-gray-100/20 w-44 p-2.5
                `}
                value={date}
                onChange={setDate}
                placeholder={"Data"}
                displayFormat={"DD/MM/YYYY"}
              />
            </div>
          ):(
            <input
              type="text"
              id="simple-search"
              className="
                hidden group-[.show]:block
              bg-gray-100/10 backdrop-blur-[25px]
                
                text-white text-sm rounded-lg 
                placeholder-white

                focus:ring-gray-100/20 focus:border-gray-100/20 w-44 pr-10 p-2.5
              "
              value={
                searchType === 'Solicitante' ? requester : 
                searchType === 'Nº PO' ? poId :
                // searchType === 'Data' ? date?.startDate : 
                undefined
              }
              onChange={(e) => {
                if(searchType === 'Solicitante') setRequester(e.target.value);
                else if(searchType === 'Nº PO') setPoId(e.target.value);
                // else if(searchType === 'Data') setDate(e.target.value);
              }}
              placeholder="Pesquisar..."
            />
          )}
          <button
            type="button"
            className="
              absolute inset-y-0 right-2
              flex justify-center items-center
              h-6 w-6 my-auto 
              rounded-full outline-none focus:ring-gray-100/50 focus:ring-1
            "
            onClick={() => {
              if(!divSearchRef.current) return;
              divSearchRef.current.classList.toggle('show');

              let input = divSearchRef.current.childNodes[0] as HTMLInputElement;
              if(divSearchRef.current.classList.contains('show')) input.focus();
            }}
          ><SearchIcon className="w-5 h-5 text-gray-200 dark:text-gray-400"/></button>
        </div> */}
      </div>

      {(isFiltering || !isApplied) && (
        <StateFilter {...{
          availableSteps,
          isApplied,
          selectedStep, 
          // requester, poId, date,
          setSelectedStep, 
          // setRequester, setPoId, setDate,
          handleApplyFilter
        }}/>
      )}
    </div>
  );
}