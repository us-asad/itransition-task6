import React from 'react'

export default function SendBtn({ disabled }) {
  return (
    <button disabled={disabled} className="button send-btn disabled:cursor-not-allowed disabled:opacity-70">
      <span className="default !text-white">Send</span>
      <span className="success !text-purple-700">
        <svg viewBox="0 0 16 16">
          <polyline points="3.75 9 7 12 13 5"></polyline>
        </svg>Sent
      </span>
      <svg className="trails" viewBox="0 0 33 64">
        <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
        <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
      </svg>
      <div className="plane">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </button>
  );
}