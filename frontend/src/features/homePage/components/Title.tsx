import type { ReactNode } from "react"
interface props{
    children: ReactNode
    subjectIcon: string
    principalColor: string
    secondaryColor: string

}
export default function Title({children, subjectIcon,principalColor, secondaryColor}: props){
    return(
        <div className="text-white flex items-center justify-between mt-5 py-6 px-6 rounded-4xl border-b-10"
        style={
            { 
                backgroundColor: principalColor, 
                borderColor: secondaryColor 
            }
        }
        >
            <span className="text-2xl font-bold">{children}</span>
            <img src={subjectIcon} alt="Icone da disciplina" />

        </div>
    )
}