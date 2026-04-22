import HeaderHomePage from "./components/HeaderHomePage";
import Title from "./components/Title";
import MathSubjectIcon from "../../assets/icons/MathIcon.svg"
import PortSubjectIcon from "../../assets/icons/PortIcon.png"
import ButtonPencil from "./components/ButtonPencil";
import CardChallenge from "./components/CardChallenge";




export default function HomePage(){
    const dataChallenge = [
  {
    subject: {
      subject: "Matemática",
      icon: MathSubjectIcon,
      principalColor: "#E65C5C",
      secondaryColor: "#A34545",
    },
    
    challenges: [
      { id: 1, professor: "João", dificult: 1, title: "Álgebra Básica" },
      { id: 2, professor: "Maria", dificult: 2, title: "Geometria" },
      { id: 3, professor: "Carlos", dificult: 3, title: "Cálculo I" },
    ]
  },
  {
    subject: {
      subject: "Português",
      icon: PortSubjectIcon,
      principalColor: "#656EC2",
      secondaryColor: "#394293",
    },
    
    challenges: [
      { id: 1, professor: "João", dificult: 1, title: "Álgebra Básica" },
      { id: 2, professor: "Maria", dificult: 2, title: "Geometria" },
      { id: 3, professor: "Carlos", dificult: 3, title: "Cálculo I" },
    ]
  },    
 
];
    return(
        <div className="">
         
          {dataChallenge.map((data) => (
            <div key={data.subject.subject}> 
          
          <Title 
            subjectIcon={data.subject.icon} 
            principalColor={data.subject.principalColor} 
            secondaryColor={data.subject.secondaryColor}
          >
            {data.subject.subject}
          </Title> 

         
          {data.challenges.map((challenge) => (
            <CardChallenge 
              key={challenge.id}
              challengeName={challenge.title} 
              professor={challenge.professor} 
              dificulty={challenge.dificult}

              principalColor={data.subject.principalColor}
              secondaryColor={data.subject.secondaryColor}
            />
          ))}
          
        </div>
      ))}
            
            
        </div>
    )
}