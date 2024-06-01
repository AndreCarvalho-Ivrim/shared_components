import { MonthIndex, shortMonths } from "./utils";

interface SelectMonthProps{
  currentMonth: MonthIndex,
  onSelectMonth: (month: MonthIndex) => void
}
export const SelectMonth = ({ currentMonth, onSelectMonth }:SelectMonthProps) => (
  <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {shortMonths.map((month, i) => (
        <button
          key={i}
          type="button"
          className={`
            w-full tracking-wide dark:text-white/70
            transition-all duration-300 px-3 py-3 uppercase hover:bg-gray-100 rounded-md
            focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50
            ${currentMonth === i ? 'font-semibold bg-gray-50':''}
          `}
          onClick={() => onSelectMonth(i as MonthIndex)}
          disabled={currentMonth === i}
        >{month}</button>
      ))}
    </div>
  </div>
)