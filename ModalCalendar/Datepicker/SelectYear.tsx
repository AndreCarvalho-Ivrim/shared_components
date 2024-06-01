interface SelectYearProps{
  currentYear: number,
  modifier: number,
  onSelectYear: (year: number) => void
}
export const SelectYear = ({ currentYear, modifier, onSelectYear }: SelectYearProps) => (
  <div className="px-0.5 sm:px-2 mt-0.5 mb-1 min-h-[285px]">
    <div className="w-full grid grid-cols-2 gap-2 mt-2">
      {Array.from({ length: 12 }).map((_, i) => {
        const year = i + currentYear + modifier;
        return (
          <button
            key={year}
            type="button"
            className={`
              w-full tracking-wide dark:text-white/70 text-gray-800
              transition-all duration-300 px-3 py-3 uppercase hover:bg-gray-100 rounded-md focus:ring-1 
              focus:ring-blue-500/50 focus:bg-blue-100/50
              ${(i + modifier) === 0 ? 'font-semibold bg-gray-50':''}
            `}
            onClick={() => onSelectYear(year)}
            disabled={(i + modifier) === 0}
          >{year}</button>
        );
      })}
    </div>
  </div>
)