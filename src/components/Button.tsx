import type { ReactNode } from "react"

interface props {
    type: "submit" | "button",
    children: ReactNode
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "outline";
}

export default function Button({children, type, size="sm", variant="primary"}: props){
    return (
        <button className= {`font-bold border-b-6 ${sizeStyles[size]} ${variantStyles[variant]} `}  type={type} >
            {children}
        </button>
    )
}

const sizeStyles = {
    sm: "px-4 h-12 text-xs sm:px-8 sm:h-14 sm:text-sm xl:text-xl xl:px-10 xl:h-16",
    md: "px-6 h-12 text-base ",
    lg: "px-18 py-5 rounded-3xl text-lg sm:text-2xl sm:px-30 xl:px-10 xl:text-xl",
}

const variantStyles = {
  primary: " bg-[#5B5DF0] rounded-2xl text-white border-[#4A4BBD] active:border-b-0",
  secondary: "bg-[#D95858] rounded-2xl text-white border-[#AB4646] active:border-b-0",
  outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
};