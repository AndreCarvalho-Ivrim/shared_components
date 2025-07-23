import { Link } from "react-router-dom";
import { HeaderBreadcrumbs } from "../v3/Wrapper";

export const Breadcrumbs = ({ breadcrumbs }:{ breadcrumbs: HeaderBreadcrumbs[] }) => (
  <ul className="flex gap-1.5 text-gray-200 text-sm max-w-[calc(100vw-15rem)] overflow-x-auto py-1">
    {breadcrumbs.map((item) => (
      <li
        key={item.name}
        className="group last:font-semibold last:text-gray-50 truncate overflow-clip max-sm:max-w-[6rem]"
      >
        <span className="group-first:hidden mr-1.5">/</span>
        {item.href ? (
          <Link to={item.href}>
            {item.name.slice(0,25)}{item.name.length > 25 ? '...':''}
          </Link>
        ):item.onClick ? (
          <button type="button" onClick={item.onClick}>
            {item.name.slice(0,25)}{item.name.length > 25 ? '...':''}
          </button>
        ):(
          <>
            {item.name.slice(0,25)}{item.name.length > 25 ? '...':''}
          </>
        )}
      </li>
    ))}
  </ul>
)