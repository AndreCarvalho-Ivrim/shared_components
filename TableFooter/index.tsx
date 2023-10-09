import { ChevronDownIcon } from "../utils/icons";
import { Pagination } from "./Pagination";

interface TableFooterType{
  perPage: number,
  
  pageIndex: number,
  totalPages: number,
  total: number,

  canPreviousPage: boolean,
  canNextPage: boolean,

  goToPage: (param: number) => void,
  previousPage: () => void,
  nextPage: () => void,

  isFiltering: boolean
}
export const TableFooter = ({
  perPage,
  pageIndex, totalPages, total,
  canPreviousPage, canNextPage,
  goToPage, previousPage, nextPage,
  isFiltering = false
}: TableFooterType) => (
  <div className="flex items-center justify-between px-4 pt-2 pb-1 sm:px-6 mt-4">
    <div className="flex flex-1 justify-between sm:hidden">
      <button
        type="button"
        className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm text-primary-500 hover:bg-gray-50/20 disabled:opacity-80"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >Anterior</button>
      <button
        type="button"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm text-primary-500 hover:bg-gray-50/20 disabled:opacity-80"
        onClick={nextPage}
        disabled={!canNextPage}
      >Próximo</button>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        {!isFiltering && (
          <p className="text-sm text-gray-600">
            {total > 0 && (
              <>
                Mostrando{' '}
                {total === 1 ? (<span className="font-medium">1 de 1 resultado</span>): (
                  <>
                    <span className="font-medium">{(pageIndex * perPage) + 1}</span> à{' '} 
                    <span className="font-medium">{
                      (pageIndex + 1) * perPage < total ? (pageIndex + 1) * perPage : total
                    }</span> de{' '}
                    <span className="font-medium">{total}</span> resultados
                  </>
                )}
              </>
            )}
          </p>
        )}
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            type="button"
            onClick={previousPage}
            disabled={!canPreviousPage}
            className="
              relative inline-flex items-center rounded-l-md 
              border border-gray-300 px-2 py-2 text-sm font-medium text-gray-600 
              hover:bg-gray-300/40 focus:z-20
              disabled:!bg-transparent disabled:!opacity-40
            "
          >
            <span className="sr-only">Anterior</span>
            <ChevronDownIcon className="h-5 w-5 rotate-90"/>
          </button>
          <Pagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            total={total}
            unloadedPages={Math.ceil(total / perPage) - totalPages}
            goToPage={goToPage}
          />
          <button
            type="button"
            className="
              relative inline-flex items-center rounded-r-md
              border border-gray-300 px-2 py-2 text-sm font-medium text-gray-600 
              hover:bg-gray-300/40 focus:z-20 
              disabled:!bg-transparent disabled:!opacity-40
            "
            onClick={nextPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Próximo</span>
            <ChevronDownIcon className="h-5 w-5 -rotate-90"/>
          </button>
        </nav>
      </div>
    </div>
  </div>
)