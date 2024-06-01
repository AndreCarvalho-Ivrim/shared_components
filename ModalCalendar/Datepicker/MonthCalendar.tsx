import { useEffect, useState } from "react";
import { classNames } from "../../utils/shortclass";
import { MonthIndex, convertYearAndMonthToDate, parseDateString, weekdays } from "./utils";

interface DayType{
  day: number,
  type: 'prev-month' | 'current-month' | 'next-month',
  state?: 'in-range' | 'start-of-marking' | 'end-of-marking' | 'only-day'
}
interface MonthCalendarProps{
  yearAndMonth?: [number, MonthIndex],
  selectedDate: { startDate?: string, endDate?: string } | undefined,
  setSelectedDate: React.Dispatch<React.SetStateAction<{ startDate?: string, endDate?: string } | undefined>>
}
const now = ((date: Date) => parseDateString(
  date.getFullYear(),
  date.getMonth(),
  date.getDate()
))(new Date())
export const MonthCalendar = ({ yearAndMonth, selectedDate, setSelectedDate }:MonthCalendarProps) => {
  const [days, setDays] = useState<DayType[]>([]);
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState<[number, MonthIndex]>();
  const [prevYearAndMonth, setPrevYearAndMonth] = useState<[number, MonthIndex]>();
  const [nextYearAndMonth, setNextYearAndMonth] = useState<[number, MonthIndex]>();

  const maxDaysOfMonth = (year: number, month: MonthIndex) => {
    if(month === 1) return year % 4 === 0 ? 29 : 28; // FEV
    if([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
    return 30
  }

  useEffect(() => {
    const date = convertYearAndMonthToDate(yearAndMonth);

    if(!yearAndMonth) setCurrentYearAndMonth([
      date.getFullYear(),
      date.getMonth() as MonthIndex
    ])
    else setCurrentYearAndMonth(yearAndMonth);

    //#region HANDLE PREV
    const prevMonth = new Date(date);
    prevMonth.setDate(prevMonth.getDate() -1);

    setPrevYearAndMonth([
      prevMonth.getFullYear(),
      prevMonth.getMonth() as MonthIndex
    ])

    let tempDays : DayType[] = [];
    let daysAfterSunday = date.getDay();
    if(daysAfterSunday !== 0){
      let max = prevMonth.getDate();
      tempDays.push(...Array.from({ length: daysAfterSunday }).map<DayType>((_, i) => ({
        day: max - i,
        type: 'prev-month'
      })).reverse())
    }
    //#endregion HANDLE PREV

    let maxDays = maxDaysOfMonth(date.getFullYear(), date.getMonth() as MonthIndex)
    tempDays.push(...Array.from({ length: maxDays }).map<DayType>((_, day) => ({
      day: day + 1,
      type: 'current-month'
    })))

    //#region HANDLE NEXT
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
  
    setNextYearAndMonth([
      nextMonth.getFullYear(),
      nextMonth.getMonth() as MonthIndex
    ])

    let daysToCompleteCalendar = (6 * 7) - tempDays.length;
    tempDays.push(...Array.from({ length: daysToCompleteCalendar }).map<DayType>((_, day) => ({
      day: day + 1,
      type: 'next-month'
    })))
    //#endregion HANDLE NEXT

    setDays(tempDays);
  }, [yearAndMonth]);

  useEffect(() => {
    if(days.length === 0 || !currentYearAndMonth || !prevYearAndMonth || !nextYearAndMonth) return;
    
    setDays((prevState) => prevState.map((day) => {
      let dateStr : string | undefined = undefined;
      if(day.type === 'current-month') dateStr = parseDateString(...currentYearAndMonth, day.day)
      else if(day.type === 'prev-month') dateStr = parseDateString(...prevYearAndMonth, day.day);
      else if(day.type === 'next-month') dateStr = parseDateString(...nextYearAndMonth, day.day);

      if(selectedDate?.startDate && dateStr){
        if(selectedDate.startDate === dateStr){
          if(selectedDate.endDate === dateStr) return {
            ...day,
            state: 'only-day'
          }
          return {
            ...day,
            state: 'start-of-marking'
          }
        } 

        if(selectedDate.endDate){
          if(selectedDate.endDate === dateStr) return {
            ...day,
            state: 'end-of-marking'
          }

          if(dateStr > selectedDate.startDate && dateStr < selectedDate.endDate) return {
            ...day,
            state: 'in-range'
          }
        }
      }

      return {
        ...day,
        state: undefined
      }
    }))
  }, [selectedDate, currentYearAndMonth, prevYearAndMonth, nextYearAndMonth])

  function handleSelect(day: DayType){
    if(!currentYearAndMonth || !prevYearAndMonth || !nextYearAndMonth ) return;

    let dateStr : string | undefined = undefined;
    if(day.type === 'current-month') dateStr = parseDateString(...currentYearAndMonth, day.day)
    else if(day.type === 'prev-month') dateStr = parseDateString(...prevYearAndMonth, day.day);
    else if(day.type === 'next-month') dateStr = parseDateString(...nextYearAndMonth, day.day);

    setSelectedDate((prevState) => {
      if(!dateStr) return prevState;
      if(prevState?.startDate && !prevState.endDate){
        if(dateStr < prevState.startDate) return {
          startDate: dateStr, endDate: prevState.startDate
        }

        return { ...prevState, endDate: dateStr };
      }
      return { startDate: dateStr }
    })
  }
  return (
    <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
      <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2">
        {weekdays.map((weekday) => (
          <div className="tracking-wide text-gray-500 text-center" key={weekday}>{weekday}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 my-1 text-gray-800">
        {days.map((day) => (
          <button
            type="button"
            className={classNames({
              "flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10": true,
              "font-bold": currentYearAndMonth && now === parseDateString(...currentYearAndMonth,day.day),
              ...(day.type !== 'current-month' ? { "text-gray-400": true }:{
                "bg-blue-500 text-white font-medium rounded-full": day.state === 'only-day',
                "bg-blue-500 text-white font-medium rounded-l-full": day.state === 'start-of-marking',
                "bg-blue-100": day.state === 'in-range',
                "bg-blue-500 text-white font-medium rounded-r-full": day.state === 'end-of-marking'
              })
            })}
            onClick={() => handleSelect(day)}
            key={`${day.type}-${day.day}`}
          >{day.day}</button>
        ))}
      </div>
    </div>
  );
}