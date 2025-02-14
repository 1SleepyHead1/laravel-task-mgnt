import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
  { type = "date", className = "", isFocused = false, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  const date = new Date();

  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;

  return (
    <input
      {...props}
      type={type}
      defaultValue={currentDate}
      className={
        "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
    />
  );
});
