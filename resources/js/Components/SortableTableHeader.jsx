import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function SortableTableHeader({
  className = null,
  headerName,
  headerTitle,
  isSortable = true,
  sortField = null,
  sortDirection = null,
  sortChanged = () => {},
}) {
  if (isSortable) {
    return (
      <th
        className={`cursor-pointer ${className}`}
        onClick={(e) => sortChanged(headerName)}
      >
        <div className="px-3 py-2 flex items-center justify-center gap-1">
          {headerTitle}
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sortField === headerName && sortDirection === "asc"
                  ? "text-gray-200"
                  : null)
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sortField === headerName && sortDirection === "desc"
                  ? "text-gray-200"
                  : null)
              }
            />
          </div>
        </div>
      </th>
    );
  } else {
    return <th className={`px-3 py-2 ${className}`}>{headerTitle}</th>;
  }
}
