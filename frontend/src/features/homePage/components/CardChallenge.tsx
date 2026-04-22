import ButtonPencil from "./ButtonPencil";
import DificultStars from "./DificultStars";

interface props{
    professor: string
    dificulty: number,
    challengeName: string,
    principalColor: string
    secondaryColor: string

}

export default function CardChallenge({professor, dificulty, challengeName, principalColor, secondaryColor}: props){
    return(
        <div className="my-4 flex gap-4">
            <ButtonPencil principalColor={principalColor} secondaryColor={secondaryColor} />
            <div className="flex flex-col">
                <span className="text-xl font-bold">{challengeName}</span>
                <span>Professor: {professor}</span>
                <span className="flex items-center gap-2">Dificuldade: <DificultStars color={principalColor} dificult={dificulty} /></span>
            </div>
        </div>
        
    )
}