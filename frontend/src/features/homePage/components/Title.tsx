import type { ReactNode } from "react"
interface props{
    children: ReactNode
    subjectIcon: string

}
export default function Title({children, subjectIcon}: props){
    return(
        <div className="bg-[#E65C5C] text-white flex items-center justify-between mt-5 py-6 px-6 rounded-4xl border-b-10 border-[#A34545]">
            <span className="text-2xl font-bold">{children}</span>
            <img src={subjectIcon} alt="Icone da disciplina" />
           
        </div>
    )
}