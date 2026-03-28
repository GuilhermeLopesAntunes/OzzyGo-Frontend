import {useLottie} from 'lottie-react';
import mainHomeAnimation from "../lotties/mainHomeAnimation.json"
import Button from '../../../components/Button';



export default function 
MainCardInformation(){
    const options = {
    animationData: mainHomeAnimation,
    loop: true,
    
    };

    const { View } = useLottie(options);

    return (
    <div className='flex flex-col xl:flex-row items-center gap-5'>
        <div className='w-80 sm:w-100 xl:w-200'>{View}</div>;
        <div>
            <h2 className='text-[#555353] xl:mb-20 mb-8 text-center font-bold text-2xl sm:text-4xl sm:w-150'>APRENDER NUNCA FOI TÃO DIVERTIDO! EXPLORE, JOGUE E CONQUISTE COM O OZZY</h2>
            <div className='flex flex-col gap-5 xl:flex-row'>
                <Button type='button' variant='primary' size='lg'>INICIAR AVENTURA</Button>
                <Button type='button' variant='secondary' size='lg'>JÁ POSSUO CONTA</Button>
            </div>
        </div>
        
        
        
    </div> 
    )
}