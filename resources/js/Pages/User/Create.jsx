import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          New User
        </h2>
      }
    >
      <Head title="New User" />

      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                onSubmit={onSubmit}
              >
                <div>
                  <div className="flex flex-row">
                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="name" value="Name" />
                      <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        type="text"
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="email-ad" value="Email Address" />
                      <TextInput
                        id="email-ad"
                        className="mt-1 block w-full"
                        type="text"
                        onChange={(e) => setData("email", e.target.value)}
                      />
                      <InputError message={errors.email} className="mt-2" />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel htmlFor="password" value="Password" />
                      <TextInput
                        id="password"
                        className="mt-1 block w-full"
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                      />
                      <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="basis-1/2 my-2 mr-2">
                      <InputLabel
                        htmlFor="password_confirmation"
                        value="Password Confirmation"
                      />
                      <TextInput
                        id="password_confirmation"
                        className="mt-1 block w-full"
                        type="password"
                        onChange={(e) =>
                          setData("password_confirmation", e.target.value)
                        }
                      />
                      <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <Link href={route("user.index")}>
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
                      Create
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
