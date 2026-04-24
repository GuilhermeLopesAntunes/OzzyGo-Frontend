import CardItem from "./components/CardItem"
import BoyOne from "../../../public/itemsStore/boy.png"
import BoyTwo from "../../../public/itemsStore/boy2.png"
import Robot from "../../../public/itemsStore/robot.png"
import { useState } from "react"

const dataStore = [
    {
        id: 1,
        icon: BoyOne,
        type: {
            name: "Comum",
            color: "#B2B2B2",
            value: 50
        },
        nameItem: "Garoto Básico",
        isSkin: true,
        descriptionItem: "Item básico de perfil",
        
    },
    {
        id: 2,
        icon: BoyTwo,
        nameItem: "Garoto Básico 2",
        type: {
            name: "Raro",
            color: "#0070DD",
            value: 100
        },
        isSkin: true,
        descriptionItem: "Item básico de perfil 2",
        value: 120
    },
    {
        id: 3,
        icon: Robot,
        nameItem: "Robô",
        type: {
            name: "Raro",
            color: "#A335EE",
            value: 100
        },
        isSkin: true,
        descriptionItem: "Item de Robô Épico",
        value: 200
    },
    {
        id: 4,
        icon: Robot,
        nameItem: "Robô",
        isSkin: true,
        descriptionItem: "Item de Robô Épico",
        value: 200
    },
    {
        id: 5,
        icon: Robot,
        nameItem: "Robô",
        isSkin: true,
        descriptionItem: "Item de Robô Épico",
        value: 200
    },
    {
        id: 6,
        icon: "Ninguém me para",
        nameItem: "Robô",
        isSkin: true,
        descriptionItem: "Título ",
        value: 200
    }
]

type statesPage = "title" | "skins"

export default function StorePage() {
    const [page, setPage] = useState<statesPage>("skins")
    return(
        <main>
            <div className="w-full m-auto text-center">
                <button className={`mr-5 ${page == "skins" ? "text-[#5B5DF0] underline font-bold" : ""}`}>
                    Perfil
                </button>
                <button className={`mr-5 ${page == "title" ? "text-[#5B5DF0] underline font-bold" : ""}`}>
                    Títulos
                </button>
            </div>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {dataStore.map((item) => (
                    <CardItem key={item.id} descriptionItem={item.descriptionItem} nameItem={item.nameItem} value={item.value} icon={item.icon} />
                ))}
            </div>
        </main  >
    )
}