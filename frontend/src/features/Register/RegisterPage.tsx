import { Link } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar";
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
import { useLoading } from "../../hooks/useLoading";
import HeaderInitialPage from "../InitialPage/components/HeaderInitialPage";

interface User {
    nickname: string
    name: string
    email: string
    password: string
}

export default function RegisterPage() {
    const [stage, setStage] = useState(0)
    const [dataArray, setDataArray] = useState<User[]>([]);
    const { showLoading, hideLoading } = useLoading();
    
    
    const {
        register, 
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<User>()

    const addStage = (data: User) => {
        setDataArray((prev) => [...prev, data]);
    
        console.log("Array atualizado:", [...dataArray, data]);
         setStage(stage+1);
    }

    const subtractStage = () => {
  
        setDataArray((prev) => prev.slice(0, -1));


        setStage((prev) => prev - 1);
    };

    const onSubmitFinal = async (dataStep2: User) => {
        try{
        showLoading()
        await new Promise((resolve) => setTimeout(resolve, 3000));
            // 1. Pegamos os dados da Etapa 1 que estão no seu array (o primeiro item)
        const dataStep1 = dataArray[0];

        // 2. Mesclamos tudo em um único objeto para a API
        const fullUserData = {
            ...dataStep1, // traz o nickname
            ...dataStep2  // traz name, email, password
        };

        console.log("Enviando para API:", fullUserData);

        // 3. Aqui você faria o seu fetch ou axios
        // fetch('sua-api.com/register', { method: 'POST', body: JSON.stringify(fullUserData) })
        }catch(error) {
            console.log("Erro na simulação", error)
        }finally {
            hideLoading()
        }
    
}
    


    const nickname = watch("nickname");

    return (
        <div className="mx-6 sm:mx-16 my-6 xl:mx-auto xl:max-w-6xl">
            <header>
                <HeaderInitialPage isRegister={true}/>
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
                    
                    <form className="text-center" onSubmit={handleSubmit(addStage)} >
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
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitFinal)}>
                        <Input placeHolder="Digite Seu Nome Completo" icon={UserIcon} type="text" {...register("name", {required: "Nome é Obrigatório"})} />
                        {errors.name?.message && (
                                <p className="text-red-500 text-sm text-center font-bold">
                                {String(errors.name.message)}
                                </p>
                        )}
                        <Input placeHolder="Digite Seu Email (Ou do responsável)" icon={MailIcon} type="email" {...register("email", {required: "Email é Obrigatório"})} />
                        {errors.email?.message && (
                                <p className="text-red-500 text-sm text-center font-bold">
                                {String(errors.email.message)}
                                </p>
                        )}
                        <Input isPassword={true} placeHolder="Digite sua Senha" icon={PasswordIcon} animationDataJson={VisibilityControlIcon} type="password" {...register("password", {required: "Senha é Obrigatória"})} />
                        {errors.password?.message && (
                                <p className="text-red-500 text-sm text-center font-bold">
                                {String(errors.password.message)}
                                </p>
                        )}
                        <Input isPassword={true} placeHolder="Digite sua Senha Novamente" icon={PasswordIcon} animationDataJson={VisibilityControlIcon} type="password"  />
                        
                        <div className="flex justify-between">
                            <Button onClick={subtractStage} className="" size="sm" variant="secondary" type="button">VOLTAR</Button>
                            <Button onClick={()=>{}} className="" size="sm" variant="primary" type="submit">CONTINUAR</Button>
                        </div>
                    </form>
                </div>
            }
    
        </div>
    )
}   