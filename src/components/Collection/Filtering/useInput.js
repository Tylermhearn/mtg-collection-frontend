import { useState } from "react";

export const useInput = (initialValue, setSearch) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value)
        setSearch(event.target.value)
      }
    }
  };
};