import type { ReactNode } from "react"

interface props {
    type: "submit" | "button",
    children: ReactNode
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "outline";
}

export default function Button({children, type, size="sm", variant="primary"}: props){
    return (
        <button className= {`font-bold border-b-6 ${sizeStyles[size]} ${variantStyles[variant]} sm:px-8 sm:h-14 sm:text-sm`}  type={type} >
            {children}
        </button>
    )
}

const sizeStyles = {
    sm: "px-4 h-12 text-xs",
    md: "px-6 h-12 text-base",
    lg: "px-6 py-3 text-lg",
}

const variantStyles = {
  primary: " bg-[#5B5DF0] rounded-2xl text-white border-[#4A4BBD] active:border-b-0",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
};