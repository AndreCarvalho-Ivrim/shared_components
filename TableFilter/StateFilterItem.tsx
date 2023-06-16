import { ReactNode } from "react"
import { CloseIcon } from "../../shared-components/utils/icons"

interface StateFilterItemProps{
  isApplied: boolean,
  title: string,
  onClear: () => void,
  children: ReactNode,
}
export const StateFilterItem = ({
  isApplied,
  title,
  onClear,
  children
}: StateFilterItemProps) => (
  <div className="
    flex justify-between items-center gap-2
    hover:bg-gray-100/10 hover:px-2 rounded-lg group/filter
  ">
    <div className="flex flex-col min-w-[10rem] max-w-[15rem] pt-2 pb-1.5">
      <span className="text-[10px] leading-tight text-white font-semibold uppercase">
        {isApplied ? 'Filtrado' : 'Filtrar'} por {title}</span>
      <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-full">{children}</span>
    </div>

    <button
      type="button"
      className="
        hidden group-hover/filter:flex justify-center items-center
        h-6 w-6 my-auto 
        rounded-full outline-none focus:ring-gray-100/50 focus:ring-1
        hover:ring-gray-100/50 hover:ring-1
      "
      onClick={onClear}
    ><CloseIcon w={16} h={16}/></button>
  </div>
)