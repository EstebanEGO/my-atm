import React from 'react'

export const Button = (props: { text: string, [x: string]: any }) => {
    const { text } = props;
    return (
        <button 
        {...props}
        className={`disabled:bg-gray-200 cursor-pointer border-2 rounded-md p-1 hover:bg-fuchsia-100 ${props.className}`}
        >{text}</button>
    )
}
