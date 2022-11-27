import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

export default function Message({ message }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      onClick={() => setShowMore(prev => !prev)}
      title={showMore ? "click to see less" : "click to see more"} 
      className="relative py-2 px-3 border-2 border-purple-400 my-2 rounded-md cursor-pointer duration-200 hover:scale-y-105 hover:scale-x-[1.01]"
    >
      <h3 className={`text-[16px] font-bold ${!showMore ? "line-clamp-1" : ""}`}>
        <span className='pr-2 text-[14px] font-medium'>{message.status} {message?.recipient_name} &nbsp;|</span>
        {message?.title}
      </h3>
      <p className={`text-[14px] leading-4 ${!showMore ? "line-clamp-1" : ""}`}>{message?.message}</p>
      <span className='absolute top-1 right-2 text-[10px]'>{new Date(message?.createdAt).toLocaleString()}</span>
    </div>
  )
}
