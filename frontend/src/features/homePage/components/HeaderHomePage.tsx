import Logo from "../../../assets/ozzyLogo.svg"
import PrincipalButton from "../../../components/Button"

export default function HeaderHomePage() {
    return (
        <nav className="flex justify-between">
            <img className="sm:w-25" src= {Logo} alt="Ozzy voando em um disco voador" />
            <PrincipalButton size="sm" variant="primary" type="button">INICIAR AVENTURA</PrincipalButton>
        </nav>
    )
}