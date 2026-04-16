import Typewriter from 'typewriter-effect'

interface props {
    message: string
}

export default function Message({message}: props) {
    return(
        <div className='relative text-2xs w-full border-2 rounded-2xl border-[#b4b4b4] px-2 py-3 bg-white'>
            <Typewriter options={{
                strings: [message],
                autoStart: true,
                loop: false,
                deleteSpeed: 99999999,
                delay: 30
            
            }} />
        </div>
    )
}