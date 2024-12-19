import Select from "react-select";
import { list_pt } from "@/lib/others_required";
import { InputProps } from "@/lib/types";
import React from "react";

export default function OptionListPerguruanTinggi({ className, value, onChange, name, id }: InputProps) {
  const options = list_pt.map((pt) => ({ value: pt, label: pt }));

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={(selectedOption) => {
        const event = {
          target: {
            value: selectedOption?.value || "",
            name,
            id
          }
        } as React.ChangeEvent<HTMLSelectElement>
        onChange(event)
      }}
      className=" bg-[rgb(var(--gray-1)/var(--tw-bg-opacity))] border-[rgb(var(--gray-6)/var(--tw-border-opacity))] rounded-[.7rem]"
      placeholder="-- pilih perguruan tinggi --"
      styles={{
        control: (base) => ({ ...base, backgroundColor: "inherit", color: "inherit", borderColor: "inherit", borderRadius: ".75rem", borderWidth: "2px" }),
        menu: (base) => ({ ...base, color: "inherit", backgroundColor: "inherit", zIndex: 9999 }),
        singleValue: (base) => ({ ...base, color: "inherit" }),
        option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "orange" : "inherit" }),
        input: (base) => ({ ...base, color: "inherit" }),
      }}
    />
  );
}
