import { ArrowRightIcon, SearchIcon } from "../../utils/icons";
import { Dropdown } from "../../../shared-components/utils/Dropdown";
import { useRef, useState } from "react";
import { WorkflowConfigFilterType } from "../../../shared-types";
import Datepicker from "react-tailwindcss-datepicker";

interface RightFilterProps{
  availableFilters: WorkflowConfigFilterType[],
  setDynamicFilter: React.Dispatch<React.SetStateAction<Record<string,{ 
    value: any,
    ref: (string | string[]),
    type: WorkflowConfigFilterType['type']
  }>>>,
  dynamicFilter: Record<string,{ value: any, ref: (string | string[]) }>,
}
export const RightFilter = ({ availableFilters, setDynamicFilter, dynamicFilter } : RightFilterProps) => {
  const divSearchRef = useRef<HTMLDivElement>(null);
  const [searchType, setSearchType] = useState<WorkflowConfigFilterType>(availableFilters[0]!);

  return (
    <div className="group relative flex items-center" ref={divSearchRef}>
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
              border border-primary-500/20 bg-gray-100/5
              flex items-center justify-between font-semibold
              text-sm backdrop-blur-[25px]
            ">
              {searchType.name}
              <ArrowRightIcon className="rotate-90 group-data-[headlessui-state=open]:-rotate-90"/>
            </div>
          }
        >
          {availableFilters.map(available => (
            <button
              className="text-gray-700 font-semibold text-sm rounded-lg backdrop-blur-[25px] w-full text-start p-2 hover:bg-gray-50/30"
              onClick={() => setSearchType(available)}
              key={available.name}
            >{available.name}</button>
          ))}
        </Dropdown>
      </div>
      {searchType.type === 'text' ? (
        <input
          type="text"
          id="simple-search"
          className="
            hidden group-[.show]:block
            bg-gray-100/10 backdrop-blur-[25px]
            
            border-primary-500/20
            text-gray-600 text-sm rounded-lg 
            placeholder-primary-700

            focus:ring-gray-100/20 focus:border-gray-100/20 w-44 pr-10 p-2.5
          "
          value={dynamicFilter[searchType.name]?.value ?? ''}
          onChange={(e) => setDynamicFilter(df => ({
            ...df,
            [searchType.name]: {
              ref: searchType.ref,
              value: e.target.value,
              type: searchType.type
            }
          }))}
          placeholder="Pesquisar..."
        />
      ) : searchType.type === 'select' ? <></> : searchType.type === 'date'   ? (
        <div className="hidden group-[.show]:block mr-10">
          <Datepicker
            inputClassName={`
              border border-primary-500/20 bg-gray-100/5
              bg-gray-100/10 backdrop-blur-[25px]
              
              text-primary-700 text-sm rounded-lg 
              placeholder-primary-700

              focus:ring-gray-100/20 focus:border-primary-500/30 w-44 p-2.5
            `}
            value={dynamicFilter[searchType.name]?.value ?? {
              startDate: null,
              endDate: null
            }}
            onChange={(e) => setDynamicFilter(df => ({
              ...df,
              [searchType.name]: {
                ref: searchType.ref,
                value: e,
                type: searchType.type
              }
            }))}
            placeholder={"Data"}
            displayFormat={"DD/MM/YYYY"}
          />
        </div>
      ) : ''}
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
      ><SearchIcon className="w-5 h-5 text-primary-700 dark:text-gray-400"/></button>
    </div>
  );
}