import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { Head, Link, router } from "@inertiajs/react";
import SortableTableHeader from "@/Components/SortableTableHeader";
// import Modal from "@/Components/Modal";
// import SecondaryButton from "@/Components/SecondaryButton";

export default function Show({ auth, user, tasks, queryParams = null }) {
  console.log(user.id);
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.show", user.id), queryParams);
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

    router.get(route("user.show", user.id), queryParams);
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {user.name}
        </h2>
      }
    >
      <Head title={user.name} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={user.image_path}
                alt=""
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-6 grid-cols-2 mt-2">
                <div className="mb-2">
                  <div>
                    <label className="font-bold text-gray-300 text-lg">
                      User ID:
                    </label>
                    <p className="text-gray-400">{user.id}</p>
                  </div>
                  <div className="mt-1">
                    <label className="font-bold text-gray-300 text-lg">
                      User Name:
                    </label>
                    <p className="text-gray-400">{user.name}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      User Description:
                    </label>
                    <p className="text-gray-400">{user.description}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      User Status:
                    </label>
                    <p
                      className={`uppercase ${
                        user.status === "pending"
                          ? "text-orange-600 "
                          : user.status === "ongoing"
                          ? "text-blue-600 "
                          : "text-green-600"
                      }`}
                    >
                      {user.status}
                    </p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Due Date:
                    </label>
                    <p className="text-gray-400">{user.due_date}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Created By:
                    </label>
                    <p className="text-gray-400">{user.created_by.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">Tasks</div>
            {/* <pre className="text-white">
              {JSON.stringify(tasks, undefined, 2)}
            </pre> */}
            <div className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* title header */}
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <SortableTableHeader
                      headerName="id"
                      headerTitle="ID"
                      isSortable={true}
                      sortField={queryParams.sort_field}
                      sortDirection={queryParams.sort_direction}
                      sortChanged={sortChanged}
                    />

                    <SortableTableHeader
                      headerName="image"
                      headerTitle="Image"
                      isSortable={false}
                    />

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
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
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
                    <th className="px-3 py-2">
                      <Select
                        className="w-full"
                        onChange={(e) =>
                          searchFieldChanged("status", e.target.value)
                        }
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
                      <td className="px-3 py-3 font-bold">{task.id}</td>
                      <td className="px-3 py-3">
                        <img src={task.image_path} style={{ width: 60 }} />
                      </td>
                      <td className="px-3 py-3">{task.name}</td>
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
                      <td className="px-3 py-3">
                        <Link
                          href={route("task.edit", task.id)}
                          className="font-medium text-blue-500 dark:text-blue-400 hover:underline mx-1"
                          title="Edit"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route("task.destroy", task.id)}
                          className="font-medium text-red-500 dark:text-red-400 hover:underline mx-1"
                          title="Delete"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination component here */}
            <Pagination links={tasks.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>

    // <section className="space-y-6 max-w-xl">
    //   <Modal show={showingUserDetails} onClose={closeModal}>
    //     <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
    //       Are you sure you want to delete your account?
    //     </h2>

    //     <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
    //       Once your account is deleted, all of its resources and data will be
    //       permanently deleted. Please enter your password to confirm you would
    //       like to permanently delete your account.
    //     </p>

    //     <div className="mt-6">
    //       {user.id}-{user.name}
    //     </div>

    //     <div className="mt-6 flex justify-end">
    //       <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
    //     </div>
    //   </Modal>
    // </section>
  );
}
