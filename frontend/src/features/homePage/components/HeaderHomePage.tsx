import Logo from "../../../assets/ozzyLogo.svg"
import PrincipalButton from "../../../components/Button"
import { Link } from "react-router-dom"


export interface props {
    isRegister: boolean
}
export default function HeaderHomePage({isRegister}: props) {
    return (
        <nav className="flex justify-between">
            <Link to="/"><img className="sm:w-25 xl:w-32" src= {Logo} alt="Ozzy voando em um disco voador" /></Link>
            {!isRegister ? <PrincipalButton size="sm" variant="primary" type="button">INICIAR AVENTURA</PrincipalButton> : <PrincipalButton size="sm" variant="secondary" type="button">JÁ POSSUO CONTA</PrincipalButton>}
        </nav>
    )
}