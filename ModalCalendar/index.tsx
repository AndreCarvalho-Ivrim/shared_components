import { useEffect, useState } from "react";
import { Modal } from "../utils/Modal"
import { MonthIndex, convertYearAndMonthToDate, parseInternationalDateToBr } from "./Datepicker/utils";
import { Datepicker } from "./Datepicker";
import { useNotify } from "../../contexts/NotifyContext";

export interface CalendarConfigType{
  onSelect: (selectedDate: { startDate: string, endDate: string }) => void,
  onRemove: () => void,
  defaultValue?: { startDate: string, endDate: string }
}
interface ModalCalendarProps {
  onClose: () => void,
  calendarConfig?: CalendarConfigType
}
export const ModalCalendar = ({ calendarConfig, onClose }: ModalCalendarProps) => {
  const { toast } = useNotify();

  const [leftYearAndMonth, setLeftYearAndMonth] = useState<[number, MonthIndex]>();
  const [rightYearAndMonth, setRightYearAndMonth] = useState<[number, MonthIndex]>();
  const [selectedDate, setSelectedDate] = useState<{ startDate?: string, endDate?: string }>();

  useEffect(() => {
    const date = convertYearAndMonthToDate();
    const nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + 1)
    
    setLeftYearAndMonth([
      date.getFullYear(),
      date.getMonth() as MonthIndex
    ])

    setRightYearAndMonth([
      nextDate.getFullYear(),
      nextDate.getMonth() as MonthIndex
    ])
  },[]);
  useEffect(() => {
    if(!calendarConfig?.defaultValue) return;

    if(typeof calendarConfig.defaultValue !== 'object' || 
      !calendarConfig.defaultValue.startDate || 
      !calendarConfig.defaultValue.endDate
    ) return;

    setSelectedDate(calendarConfig.defaultValue);
    
    let [leftY, leftM] = calendarConfig.defaultValue.startDate.split('-');
    let [rightY, rightM] = calendarConfig.defaultValue.endDate.split('-');
    if(leftY && leftM) setLeftYearAndMonth([Number(leftY), (Number(leftM) - 1) as MonthIndex])
    if(rightY && rightM) setRightYearAndMonth([Number(rightY), (Number(rightM) - 1) as MonthIndex])
  },[calendarConfig])
  return (
    <Modal
      zIndex="z-50"
      isOpen={!!calendarConfig}
      setIsOpen={onClose}
      options={{
        title: '',
        size: 'w-full md:w-[629px] md:min-w-[629px]',
        classNames: {
          dialog: '-mt-2.5 !p-0'
        },
        ...(calendarConfig?.defaultValue ? {
          cancelButtonText: 'Limpar Seleção',
          cancelButtonFn: () => {
            calendarConfig.onRemove();
            onClose();
          }
        }:{}),
        actionButton: calendarConfig && selectedDate?.startDate && selectedDate.endDate ? {
          onClick: () => {
            if(!selectedDate?.startDate || !selectedDate.endDate){
              toast.error('É obrigatório selecionar a data inicial e final');
              return;
            }

            calendarConfig.onSelect(selectedDate as any);
            onClose();
          },
          theme: 'primary',
          text: (selectedDate.startDate === selectedDate.endDate ? parseInternationalDateToBr(selectedDate.startDate) : (
            `${parseInternationalDateToBr(selectedDate.startDate)} - ${parseInternationalDateToBr(selectedDate.endDate)}`
          )),
          autoClose: false
        } : undefined
      }}
    >
      <div className="mt-2.5 shadow-sm border border-gray-300 px-1 py-0.5 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 rounded-lg">
        <div className="flex flex-col lg:flex-row py-2">
          <div className="flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 md:pl-1 pr-2 lg:pr-1">
            <Datepicker
              yearAndMonth={leftYearAndMonth} setYearAndMonth={setLeftYearAndMonth}
              selectedDate={selectedDate}     setSelectedDate={setSelectedDate}
            />
            <div className="flex items-center">
              <div className="bg-blue-500 h-7 w-1 rounded-full hidden md:block"></div>
            </div>
            <Datepicker 
              yearAndMonth={rightYearAndMonth} setYearAndMonth={setRightYearAndMonth}
              selectedDate={selectedDate}     setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}