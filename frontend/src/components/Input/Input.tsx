import { useLottie } from "lottie-react"
import {useState, forwardRef } from "react"


interface props {
    icon: string
    type: "text" | "email"| "password"
    placeHolder: string
    isPassword ?: boolean
    animationDataJson ?: object
}

const Input = forwardRef<HTMLInputElement, props>(({type, icon, placeHolder, isPassword, animationDataJson, ...rest}, ref) => {
  
    const [showPassword, setShowPassword] = useState(false);

    const options = {
        animationData: animationDataJson,
        loop: false,
        autoplay: false,
    
    };

    

    const { View,playSegments, setDirection } = useLottie(options);

        const toggleVisibility = () => {
        if (!showPassword) {
           
            setDirection(1);
            playSegments([0, 60], true);
        } else {
         
            setDirection(-1);
            playSegments([60, 0], true);
        }
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <div className="flex w-full justify-center ">
                <div className="border-2 border-[#9092FC] p-2 border-r-0 rounded-l-3xl py-3 pl-5  bg-[#DBDBFF]">
                    <img className="w-5" src={icon} alt="" />
                </div>
                
                <input {...rest} ref={ref} placeholder={placeHolder} className="placeholder-[#5B5DF0] focus:outline-0 border-[#9092FC] text-sm bg-[#DBDBFF] w-full border-x-0 border-2 p-2 py-3" type={showPassword ? "text" : type}/>
                <div className="placeholder-[#5B5DF0] focus:outline-0 border-[#9092FC] bg-[#DBDBFF] border-2 border-l-0 rounded-r-4xl w-10 flex items-center">
                    {isPassword ? <button type="button" onClick={toggleVisibility} className="w-5"> {View} </button> : ""}
                </div>
            </div>

            

        </div>
        
    )
}
)

Input.displayName = "Input";
export default Input;