import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import SortableTableHeader from "@/Components/SortableTableHeader";
import { useState } from "react";

export default function Index({
  auth,
  users,
  queryParams = null,
  isSinglePage,
  message,
}) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") {
      return;
    }

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

    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    router.delete(route("user.destroy", user.id));
  };

  // for modal | showing of user details
  const [showingUserDetails, setshowUserDetails] = useState(false);

  const showUserDetails = () => {
    setshowUserDetails(true);
  };

  const closeModal = () => {
    setshowUserDetails(false);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            Users
          </h2>

          <Link
            className="bg-slate-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-slate-600 flex items-center"
            href={route("user.create")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New User
          </Link>
        </div>
      }
    >
      <Head title="Users"></Head>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* alert messages here */}
          {message && (
            <div className="bg-slate-700 py-2 px-4 mb-2 text-white fw-bold">
              {message}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            {/* <div className="p-6 text-gray-900 dark:text-gray-100">Users</div> */}
            {/* <pre className="text-white">
              {JSON.stringify(users, undefined, 2)}
            </pre> */}

            <div className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* title header */}
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    {/* <SortableTableHeader
                      headerName="id"
                      headerTitle="ID"
                      isSortable={true}
                      sortField={queryParams.sort_field}
                      sortDirection={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    /> */}

                    <SortableTableHeader
                      headerName="name"
                      headerTitle="Name"
                      isSortable={true}
                      sortField={queryParams.sort_field}
                      sortDirection={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    />

                    <SortableTableHeader
                      headerName="email"
                      headerTitle="Email Address"
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
                      className="text-right"
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
                        onBlur={(e) =>
                          searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                        defaultValue={queryParams.name}
                      ></TextInput>
                    </th>

                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2 text-right"></th>
                  </tr>
                </thead>
                {/* end */}
                <tbody>
                  {users.data.map((user) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white text-center"
                      key={user.id}
                    >
                      <td className="px-3 py-3">{user.name}</td>
                      <td className="px-3 py-3">{user.email}</td>
                      <td className="px-3 py-3">{user.created_at}</td>
                      <td className="px-3 py-3">
                        <Link
                          href={route("user.edit", user.id)}
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
                          onClick={(e) => deleteUser(user)}
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
            {users.meta.links && (
              <Pagination
                links={users.meta.links}
                queryParams={queryParams}
                isSinglePage={isSinglePage}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
