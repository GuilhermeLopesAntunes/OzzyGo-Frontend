import { useLottie } from "lottie-react";
import Message from "../../../components/Message";


interface props {
    animationDataJson: object;
    text: string
}

export default function OzzyConversation({animationDataJson, text}: props) {
    const options = {
        animationData: animationDataJson,
        loop: true,
    
    };

    const { View } = useLottie(options);

    return(
        <div className="flex gap-5">
            <div className="w-15 sm:w-25 shrink-0">{View}</div>
            <div>
                <Message message={text}></Message>
            </div>
            
        </div>
    )

}