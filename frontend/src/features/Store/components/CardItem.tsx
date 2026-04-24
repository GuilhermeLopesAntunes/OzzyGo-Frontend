import Ruby from "../../../assets/icons/Ruby.svg"

interface props {
    icon: string,
    nameItem: string,
    descriptionItem: string,
    value: number
}
export default function CardItem({icon, nameItem, descriptionItem, value}: props){
    return(
        <div className="bg-[#EFEFEF] px-4 py-5 flex flex-col items-center rounded-3xl">
            <div>
                <img src={icon} className="" alt="Icone da loja" />
            </div>
            <div className="flex flex-col self-auto w-full">
                <span className="font-bold text-xl">{nameItem}</span>
                <span className="text-sm">{descriptionItem}</span>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <img src={Ruby} alt="" />
                        <span className="text-[#DF6464] font-bold">{value}</span>
                        
                    </div>
                    <button className="bg-[#DF6464] text-white px-3 py-2 rounded-3xl">
                            Comprar
                    </button>
                </div>
                    
            </div>
        </div>
    )
}