export const Pagination = ({ pageIndex, totalPages, unloadedPages, goToPage }:{
  pageIndex: number,
  totalPages: number,
  total: number,
  unloadedPages: number
  goToPage: (param: number) => void
}) => {
  const totalServerPages = totalPages + (
    unloadedPages > 0 ? unloadedPages : 0
  )
  return (
    <>
      {Array.from({ length: totalServerPages }).map((_,i) => {
        let hidden = false;
        if(totalServerPages > 4){
          hidden = (
            i <= (pageIndex - 2) && i < (totalServerPages - 3)
          ) || (
            (pageIndex === 0 && i > (4 + pageIndex - 2)) ||
            (pageIndex > 0 && i > (3 + pageIndex - 2))
          );
        }

        return (
          <button
            key={`page-${i}`}
            type="button"
            aria-current={pageIndex === i ? "page" : undefined}
            className={`
              relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20
              ${hidden ? 'hidden':'inline-flex'}
              ${
                pageIndex === i ? 
                'z-10 border-primary-500/50 bg-primary-300/30 text-primary-600':
                'border-gray-300 hover:bg-gray-300/40 text-gray-500 hover:bg-gray-50'
              } 
            `}
            onClick={() => goToPage(
              i >= totalPages ? totalPages : i
            )}
          >{i+1}</button>
        )
      })}
    </>
  );
};