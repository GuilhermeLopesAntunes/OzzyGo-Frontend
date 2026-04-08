import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
import HeaderHomePage from "../homePage/components/HeaderHomePage";
import OzzyConversation from "./components/OzzyConversation";
import OzzyDefaultAnimation from "./lotties/OzzyDefaultAnimation.json"
import Input from "../../components/Input/Input";
import Button from "../../components/Button";
import { useState } from "react";
import UserIcon from "../../assets/icons/UserIcon.svg"
import MailIcon from "../../assets/icons/MailIcon.svg"
import PasswordIcon from "../../assets/icons/PasswordIcon.svg"
import VisibilityControlIcon from "../../components/Input/lotties/passwordVisibility.json"
import {useForm} from 'react-hook-form'

interface User {
    username: string
    name: string
    email: string
    password: string
}

export default function RegisterPage() {
    const [stage, setStage] = useState(0)
    const [dataArray, setDataArray] = useState([]);
    
    const {
        register, 
        handleSubmit,
        watch,
        getValues,
        formState: {errors},
    } = useForm()

    const onSubmitStageOne = (data) => {
        setDataArray((prev) => [...prev, data]);
    
        console.log("Array atualizado:", [...dataArray, data]);
        addStage()
    }


    
    function addStage() {
        setStage(stage+1);
    }
    function subtractStage(){
        setStage(stage-1);
    }
    function addData(data: User, addData: User) {
        data = addData
        addStage()

    }

    const nickname = watch("nickname");

    return (
        <div className="mx-6 sm:mx-16 my-6 xl:mx-auto xl:max-w-6xl">
            <header>
                <HeaderHomePage isRegister={true}/>
            </header>
            {stage == 0 &&
                <div className="flex flex-col gap-8"> 
                    <Link to="/"><span className="text-[#5B5DF0] text-5xl font-bold">&lt;</span></Link>
                    <div className="w-full text-end">
                        <span className="">Etapa 1/2</span>
                        <ProgressBar progress="1/2" />
                    </div>
                    
                    <OzzyConversation text="Olá, eu sou o Ozzy! Vamos embarcar juntos nessa aventural! Mas antes, preciso conhecer você." animationDataJson={OzzyDefaultAnimation}></OzzyConversation>
                    <p className="text-center">Antes de começarmos, qual será o seu Apelido na nossa aventura?</p>
                    
                    <form className="text-center" onSubmit={handleSubmit(onSubmitStageOne)} >
                        <Input 
                            placeHolder="Digite Seu Apelido" 
                            icon={UserIcon} 
                            type="text" 
                            {...register("nickname", {required: "Apelido é Obrigatório"})}

                        />
                        {errors.nickname?.message && (
                            <p className="text-red-500 text-sm mt-1">
                            {String(errors.nickname.message)}
                            </p>
                        )}
                    
                        <Button className="mt-5" size="sm" variant="primary" type="submit">CONTINUAR</Button>
                    </form>
                    
                </div>
            }
            {stage == 1 &&
                <div className="flex flex-col gap-8"> 
                    <Link to="/"><span className="text-[#5B5DF0] text-5xl font-bold">&lt;</span></Link>
                    <div className="w-full text-end">
                        <span className="">Etapa 2/2</span>
                        <ProgressBar progress="1" />
                    </div>
                    
                    <OzzyConversation text={`Legal, ${nickname} Agora, me diga como podemos manter sua conta segura.`} animationDataJson={OzzyDefaultAnimation}></OzzyConversation>
                    <p className="text-center">Digite seu Nome Completo, E-mail (Ou do responsável) e escolha uma senha.</p>
                    
                    <Input placeHolder="Digite Seu Nome Completo" icon={UserIcon} type="text" />
                    <Input placeHolder="Digite Seu Email (Ou do responsável)" icon={MailIcon} type="email" />
                    <Input isPassword={true} placeHolder="Digite sua Senha" icon={PasswordIcon} animationDataJson={VisibilityControlIcon} type="password" />
                    <Input isPassword={true} placeHolder="Digite sua Senha Novamente" icon={PasswordIcon} animationDataJson={VisibilityControlIcon} type="password" />
                    
                    <div className="flex justify-between">
                        <Button onClick={subtractStage} className="" size="sm" variant="secondary" type="button">VOLTAR</Button>
                        <Button onClick={addStage} className="" size="sm" variant="primary" type="button">CONTINUAR</Button>
                    </div>
                    
                </div>
            }
    
        </div>
    )
}   