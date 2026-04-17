import HeaderHomePage from "./components/HeaderHomePage";
import Title from "./components/Title";
import SubjectIcon from "../../assets/icons/MathIcon.svg"

export default function HomePage(){
    return(
        <div className="mx-6 sm:mx-16 my-6 xl:mx-auto xl:max-w-6xl">
            <HeaderHomePage />
            <Title children="Matemática" subjectIcon={SubjectIcon}></Title>
        </div>
    )
}