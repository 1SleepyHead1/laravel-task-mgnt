import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ auth, task }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center">
          <Link href={route("task.index")}>
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </Link>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {task.name}
          </h2>
        </div>
      }
    >
      <Head title={task.name} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-6 grid-cols-2 mt-2">
                <div className="mb-2">
                  <div>
                    <label className="font-bold text-gray-300 text-lg">
                      Task ID:
                    </label>
                    <p className="text-gray-400">{task.id}</p>
                  </div>
                  <div className="mt-1">
                    <label className="font-bold text-gray-300 text-lg">
                      Task Name:
                    </label>
                    <p className="text-gray-400">{task.name}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Task Description:
                    </label>
                    <p className="text-gray-400">{task.description}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Task Status:
                    </label>
                    <p
                      className={`uppercase ${
                        task.status === "pending"
                          ? "text-orange-600 "
                          : task.status === "ongoing"
                          ? "text-blue-600 "
                          : "text-green-600"
                      }`}
                    >
                      {task.status}
                    </p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Due Date:
                    </label>
                    <p className="text-gray-400">{task.due_date}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Assigned User:
                    </label>
                    <p className="text-gray-400">{task.assigned_user.name}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Created By:
                    </label>
                    <p className="text-gray-400">{task.created_by.name}</p>
                  </div>
                  <div className="mt-2">
                    <label className="font-bold text-gray-300 text-lg">
                      Priority:
                    </label>
                    <p className="text-gray-400 uppercase">{task.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
