import CardItem from "./components/CardItem"
import BoyOne from "/public/itemsStore/boy.png"
import BoyTwo from "/public/itemsStore/boy2.png"
import Robot from "/public/itemsStore/robot.png"

const dataStore = [
    {
        id: 1,
        icon: BoyOne,
        nameItem: "Garoto Básico",
        descriptionItem: "Item básico de perfil",
        value: 120
    },
    {
        id: 2,
        icon: BoyTwo,
        nameItem: "Garoto Básico 2",
        descriptionItem: "Item básico de perfil 2",
        value: 120
    },
    {
        id: 3,
        icon: Robot,
        nameItem: "Robô",
        descriptionItem: "Item de Robô Épico",
        value: 200
    },
    {
        id: 4,
        icon: Robot,
        nameItem: "Robô",
        descriptionItem: "Item de Robô Épico",
        value: 200
    },
    {
        id: 5,
        icon: Robot,
        nameItem: "Robô",
        descriptionItem: "Item de Robô Épico",
        value: 200
    }
]

export default function StorePage() {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {dataStore.map((item) => (
                <CardItem key={item.id} descriptionItem={item.descriptionItem} nameItem={item.nameItem} value={item.value} icon={item.icon} />
            ))}
        </div>
    )
}