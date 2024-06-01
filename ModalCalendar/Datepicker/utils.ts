export type CalendarModeType = 'calendar' | 'months' | 'years';
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const shortMonths = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
export const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
export const convertYearAndMonthToDate = (yearAndMonth?: [number, MonthIndex]) : Date => {
  const date = yearAndMonth ? new Date([
    yearAndMonth[0], String(yearAndMonth[1] + 1).padStart(2, '0'), '01'
  ].join('-') + 'T00:00:00') : new Date();

  if(!yearAndMonth){
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
  }

  return date;
}
export const parseDateString = (year: number, month: MonthIndex | number, day: number) : string => [
  year,
  String(month + 1).padStart(2, '0'),
  String(day).padStart(2, '0')
].join('-')
/** YYYY-MM-DD > DD/MM/YYYY */
export const parseInternationalDateToBr = (dateStr: string) : string => dateStr.split('-').reverse().join('/')