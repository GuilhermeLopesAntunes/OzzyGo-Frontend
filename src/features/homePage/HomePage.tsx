import MainCardInformation from "./components/MainCardInformation";
import HeaderHomePage from "./components/HeaderHomePage";

export default function HomePage() {
    return(
        <div className="mx-6 sm:mx-16 my-6 xl:mx-32">
            <header className="mb-5 xl:mb-20">
                <HeaderHomePage />
            </header>
            <main>
                <MainCardInformation />
            </main>
            
        </div>
    )
}