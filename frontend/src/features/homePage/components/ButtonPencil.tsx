import PencilIcon from "../../../assets/icons/Pencil.svg"
interface props{
    principalColor: string
    secondaryColor: string

}

export default function ButtonPencil({principalColor, secondaryColor}: props){
    return(
        <button className=" p-4 border-b-5 border-l-5 rounded-2xl"
            style={{
                backgroundColor: principalColor,
                borderColor: secondaryColor 
            }}
        >
            <img src={PencilIcon} alt="" />
           
        </button>        
    )
}