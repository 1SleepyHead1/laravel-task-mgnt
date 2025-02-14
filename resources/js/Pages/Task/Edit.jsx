import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import Select from "@/Components/Select";

export default function Create({ auth, task, users }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-CA", options); // 'en-CA' will format it to YYYY-MM-DD
  };

  const { data, setData, post, errors, reset } = useForm({
    name: task.name || "",
    status: task.status || "pending",
    description: task.description || "",
    due_date: task.due_date ? formatDate(task.due_date) : "",
    priority: task.priority || "low",
    assigned_user: task.assigned_user.id || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(data);
    post(route("task.update", task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Task
        </h2>
      }
    >
      <Head title="Edit Task" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                <div>
                  <div className="my-2">
                    <InputLabel htmlFor="name" value="Task Name" />
                    <TextInput
                      id="name"
                      className="mt-1 block w-full"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  <div className="my-2">
                    <InputLabel
                      htmlFor="description"
                      value="Task Description"
                    />
                    <TextAreaInput
                      id="description"
                      rows="4"
                      className="mt-1 block w-full"
                      type="text"
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2" />
                  </div>

                  <div className="flex flex-row">
                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="status" value="Task Status" />
                      <Select
                        id="status"
                        className="mt-1 block w-full"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </Select>
                      <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="due-date" value="Due Date" />
                      <TextInput
                        id="due-date"
                        className="mt-1 block w-full"
                        type="date"
                        value={data.due_date}
                        onChange={(e) => setData("due_date", e.target.value)}
                      />
                      <InputError message={errors.due_date} className="mt-2" />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="priority" value="Task Priority" />
                      <Select
                        id="priority"
                        value={data.priority}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("priority", e.target.value)}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                      <InputError message={errors.priority} className="mt-2" />
                    </div>

                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel
                        htmlFor="assigned_user"
                        value="Assigned User"
                      />
                      <Select
                        id="assigned_user"
                        className="mt-1 block w-full"
                        value={data.assigned_user}
                        onChange={(e) =>
                          setData("assigned_user", e.target.value)
                        }
                      >
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </Select>
                      <InputError
                        message={errors.assigned_user}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <Link href={route("task.index")}>
                      <button
                        type="button"
                        className="bg-red-500 py-1 px-3 mx-2 text-white rounded shadow transition-all hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
