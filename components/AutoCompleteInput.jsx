import React, { useEffect, useState } from 'react'

export default function AutoCompleteInput({ registers, items, error, setValue, value }) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeItem, setActiveItem] = useState(0);

  const onKeyDown = e => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      setActiveItem(prev => e.key === "ArrowDown" ? prev + 1 > filteredItems.length - 1 ? 0 : prev + 1 : prev - 1 < 0 ? filteredItems.length - 1 : prev - 1);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      setValue(filteredItems[activeItem]?.label || value);
    }
  }

  useEffect(() => {
    setFilteredItems(prev => value ? prev.filter(item => item.label.includes(value.toLowerCase())) : items);
  }, [value, items]);

  return (
    <div className='relative'>
      <input
        type="text"
        placeholder="John"
        className={`peer px-3 py-2 border-2 rounded-md w-full font-medium ${error ? "border-red-600" : "border-purple-700"}`}
        onKeyDown={onKeyDown}
        autoComplete="off"
        {...registers}
      />
      {filteredItems.length ? (
        <div className='peer-focus:block hover:block hidden absolute top-full left-0 w-full max-h-[100px] overflow-y-auto bg-white rounded-md shadow-[0px_0px_10px_0px_#ccc]'>
          {filteredItems.map((item, i) => (
            <div
              key={item.id} 
              className={`px-5 py-1 cursor-pointer hover:bg-gray-200 ${activeItem === i ? "bg-gray-200" : ""}`}
              onClick={() => setValue(item.label)}
            >{item.label}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
