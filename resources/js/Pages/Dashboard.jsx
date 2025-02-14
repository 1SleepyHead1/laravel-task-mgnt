import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, generalCounts }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-6 w-6 text-amber-600" />
                <h3 className="text-amber-600 font-semibold text-lg">
                  Total Pending Tasks
                </h3>
              </div>
              <p className="text-2xl mr-2 font-bold">
                {generalCounts.totalPendingTasks}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-2">
                <PlayIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-blue-600 font-semibold text-lg">
                  Total In Progress Tasks
                </h3>
              </div>
              <p className="text-2xl mr-2 font-bold">
                {generalCounts.totalOngoingTasks}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                <h3 className="text-green-600 font-semibold text-lg">
                  Total Completed Tasks
                </h3>
              </div>
              <p className="text-2xl mr-2 font-bold">
                {generalCounts.totalCompletedTasks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
