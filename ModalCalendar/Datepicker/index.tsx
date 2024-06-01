import { useState } from "react";
import { HeaderCalendar } from "./HeaderCalendar"
import { MonthCalendar } from "./MonthCalendar"
import { CalendarModeType, MonthIndex, convertYearAndMonthToDate, shortMonths } from "./utils"
import { SelectYear } from "./SelectYear";
import { SelectMonth } from "./SelectMonth";

interface DatepickerProps{
  yearAndMonth?: [number, MonthIndex],
  setYearAndMonth: React.Dispatch<React.SetStateAction<[number, MonthIndex] | undefined>>,
  selectedDate: { startDate?: string, endDate?: string } | undefined,
  setSelectedDate: React.Dispatch<React.SetStateAction<{ startDate?: string, endDate?: string } | undefined>>
}
export const Datepicker = ({ yearAndMonth, setYearAndMonth, selectedDate, setSelectedDate }:DatepickerProps) => {
  const [mode, setMode] = useState<CalendarModeType>('calendar');
  const [yearModifier, setYearModifier] = useState(0);

  const handlePrevMonth = () => setYearAndMonth((prevState) => {
    const date = convertYearAndMonthToDate(prevState)
    date.setMonth(date.getMonth() - 1)
    return [date.getFullYear(), date.getMonth() as MonthIndex];
  })
  const handleNextMonth = () => setYearAndMonth((prevState) => {
    const date = convertYearAndMonthToDate(prevState)
    date.setMonth(date.getMonth() + 1)
    return [date.getFullYear(), date.getMonth() as MonthIndex];
  })
  
  return (
    <div className="w-full md:w-[297px] md:min-w-[297px]">
      <HeaderCalendar
        mode={mode}
        yearAndMonth={yearAndMonth}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onPrevYears={() => setYearModifier(prevState => prevState - 12)}
        onNextYears={() => setYearModifier(prevState => prevState + 12)}
        onToogleMode={(newMode) => setMode(prevState => newMode === prevState ? 'calendar' : newMode)}
      />
      {!yearAndMonth ? (
        <div className="bg-gray-100 animate-pulse h-[21rem] rounded my-1 w-full md:w-[297px] md:min-w-[297px]"/>
      ) : mode === 'calendar' ? (
        <MonthCalendar {...{ yearAndMonth, selectedDate, setSelectedDate }}/>
      ):mode === 'months' ? (
        <SelectMonth
          currentMonth={yearAndMonth[1]}
          onSelectMonth={(month: MonthIndex) => {
            setYearAndMonth([yearAndMonth[0], month])
            setMode('calendar')
          }}
        />
      ):mode === 'years' ? (
        <SelectYear
          currentYear={yearAndMonth[0]}
          modifier={yearModifier}
          onSelectYear={(year: number) => {
            setYearAndMonth([year, yearAndMonth[1]])
            setMode('calendar')
          }}
        />
      ):<></>}
    </div>
  )
}