import {useLottie} from 'lottie-react';

interface props {
    animationDataJson: object
    title: string,
    text: string 
    reverse: boolean
}



export default function CardInformation({animationDataJson, title, text, reverse}: props) {

    const options = {
        animationData: animationDataJson,
        loop: true,
    
    };

    const { View } = useLottie(options);

    return (
        <div className={`w-full flex flex-col items-center ${reverse ? "xl:flex-row" : "xl:flex-row-reverse"}  xl:justify-between`}>
            <div className='flex flex-col items-center'>
                <h3 className=" text-center text-[#5B5DF0] font-bold text-xl mb-5 w-80 sm:text-2xl"> {title}</h3>
                <p className=' mb-10 text-[#533D52] text-center w-80 sm:text-xl sm:w-130'>{text}</p>
            </div>
            
            <div className=' w-80 sm:w-100'>{View}</div>

        </div>
    )
}