import { ChevronDownIcon, ChevronsRightIcon } from "../../utils/icons"
import { CalendarModeType, MonthIndex, shortMonths } from "./utils"

interface HeaderCalendarProps{
  yearAndMonth?: [number, MonthIndex],
  mode: CalendarModeType,
  onToogleMode: (mode: CalendarModeType) => void,
  onPrevYears: () => void,
  onNextYears: () => void,
  onNextMonth: () => void,
  onPrevMonth: () => void,
}
export const HeaderCalendar = ({
  yearAndMonth, mode,
  onToogleMode, 
  onNextYears, onPrevYears,
  onNextMonth, onPrevMonth,
 }:HeaderCalendarProps) => {
  function handlePrev(){
    if(mode === 'years') onPrevYears();
    else onPrevMonth();
  }
  function handleNext(){
    if(mode === 'years') onNextYears();
    else onNextMonth();
  }
  
  return (
    <div className="flex items-center space-x-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5">
      {mode !== 'months' && (
        <div className="flex-none">
          <button
            type="button"
            className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10  transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50 "
            onClick={handlePrev}
          >
            {mode === 'years' ? (
              <ChevronsRightIcon className="h-5 w-5 -rotate-180"/>
            ):(
              <ChevronDownIcon className="h-5 w-5 rotate-90"/>
            )}
          </button>
        </div>
      )}
      <div className="flex flex-1 items-center space-x-1.5">
        <div className="w-1/2">
          <button
            type="button"
            className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10  transition-all duration-300 px-3 py-[0.55rem] uppercase hover:bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
            onClick={() => onToogleMode('months')}
          >{yearAndMonth ? shortMonths[yearAndMonth[1]] : '...'}</button>
        </div>
        <div className="w-1/2">
          <button
            type="button"
            className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10  transition-all duration-300 px-3 py-[0.55rem] uppercase hover:bg-gray-100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
            onClick={() => onToogleMode('years')}
          >{yearAndMonth?.[0] ?? '...'}</button>
        </div>
      </div>
      {mode !== 'months' && (
        <div className="flex-none">
          <button
            type="button"
            className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10  transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50 "
            onClick={handleNext}
          >
            {mode === 'years' ? (
              <ChevronsRightIcon className="h-5 w-5"/>
            ):(
              <ChevronDownIcon className="h-5 w-5 -rotate-90"/>
            )}
          </button>
        </div>
      )}
    </div>
  )
}