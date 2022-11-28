import React, { useState } from 'react'
import ReactAutocomplete from "react-autocomplete"
import { Controller } from 'react-hook-form'

export default function AutoCompleteInput({ registers, value, setValue, control, name, items }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <ReactAutocomplete
          items={items}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          inputRef={ref}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.label}
          wrapperProps={{
            className: "!block"
          }}
          renderItem={(item, highlighted) =>
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
              className="px-3 py-2"
            >
              {item.label}
            </div>
          }
          onSelect={value => setValue(value)}
          inputProps={{
            placeholder: "John",
            className: `px-3 py-2 border-2 rounded-md w-full font-medium ${error ? "border-red-600" : "border-purple-700"}`,
            ...registers
          }}
        />
      )}
    />
  )
}
