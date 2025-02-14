import Pagination from "@/Components/Pagination";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import SortableTableHeader from "@/Components/SortableTableHeader";

export default function TasksTable({ tasks, queryParams }) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "desc";
    }

    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    router.delete(route("task.destroy", task.id));
  };
  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <SortableTableHeader
                headerName="name"
                headerTitle="Name"
                isSortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                sortChanged={sortChanged}
              />

              <SortableTableHeader
                headerName="assigned_user"
                headerTitle="Assigned User"
                isSortable={false}
              />

              <SortableTableHeader
                headerName="status"
                headerTitle="Status"
                isSortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                sortChanged={sortChanged}
              />

              <SortableTableHeader
                headerName="created_at"
                headerTitle="Date Created"
                isSortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                sortChanged={sortChanged}
              />

              <SortableTableHeader
                headerName="due_date"
                headerTitle="Due Date"
                isSortable={true}
                sortField={queryParams.sort_field}
                sortDirection={queryParams.sort_direction}
                sortChanged={sortChanged}
              />

              <SortableTableHeader
                headerName="created_by"
                headerTitle="Created By"
                isSortable={false}
              />

              <SortableTableHeader
                headerName="actions"
                headerTitle="Actions"
                isSortable={false}
              />
            </tr>
          </thead>
          {/* end */}

          {/* filter header */}
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-2">
                <TextInput
                  className="w-full"
                  placeholder="search here..."
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                  defaultValue={queryParams.name}
                ></TextInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2">
                <Select
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                  defaultValue={queryParams.status}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </Select>
              </th>
              <th className="px-3 py-2">
                {/* <DateInput
                      className="w-full"
                      onChange={(e) =>
                        searchFieldChanged("dateCreated", e.target.value)
                      }
                    ></DateInput> */}
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 text-right"></th>
            </tr>
          </thead>
          {/* end */}
          <tbody>
            {tasks.data.map((task) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white"
                key={task.id}
              >
                <td className="px-3 py-3">
                  <span
                    className="hover:underline cursor-pointer"
                    title="Show details"
                  >
                    <Link href={route("task.show", task.id)}>{task.name}</Link>
                  </span>
                </td>
                <td className="px-3 py-3">{task.assigned_user.name}</td>
                <td
                  className={
                    "px-3 py-3 text-right uppercase font-semibold " +
                    (task.status === "pending"
                      ? "text-orange-600 "
                      : task.status === "ongoing"
                      ? "text-blue-600 "
                      : "text-green-600")
                  }
                >
                  {task.status}
                </td>
                <td className="px-3 py-3">{task.created_at}</td>
                <td className="px-3 py-3">{task.due_date}</td>
                <td className="px-3 py-3">{task.created_by.name}</td>
                <td className="px-3 py-3 text-nowrap">
                  <Link
                    href={route("task.edit", task.id)}
                    className="font-medium text-blue-500 dark:text-blue-400 hover:underline mx-1 inline-flex items-center"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="font-medium text-red-500 dark:text-red-400 hover:underline mx-1 inline-flex items-center"
                    title="Delete"
                    onClick={(e) => deleteTask(task)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination component here */}
      <Pagination links={tasks.meta.links} queryParams={queryParams} />
    </>
  );
}
