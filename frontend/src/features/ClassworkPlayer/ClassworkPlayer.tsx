import React, { useState } from 'react';
import type { Classwork, Question } from '../../types/api'; 
import ProgressBar from '../../components/ProgressBar'; 
import Button from '../../components/Button'; 

interface ClassworkPlayerProps {
    classwork: Classwork;
    onFinish: (earnedXp: number, earnedRubys: number) => void;
}

export default function ClassworkPlayer({ classwork, onFinish }: ClassworkPlayerProps) {

    const [currentIndex, setCurrentIndex] = useState(0);
    

    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');

    const currentQuestion = classwork.questions[currentIndex];

    const progressPercentage = ((currentIndex) / classwork.questions.length) * 100;

    const handleNextQuestion = () => {
        if (currentIndex < classwork.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setFeedback('idle');
        } else {
      
            onFinish(classwork.xpReward, classwork.rubyReward);
        }
    };

    const handleAnswerSubmit = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback('success');
            // Você pode colocar um som de acerto aqui no futuro!
            setTimeout(handleNextQuestion, 1500); // Avança após 1.5s mostrando sucesso
        } else {
            setFeedback('error');
            // Treme a tela ou mostra mensagem vermelha
            setTimeout(() => setFeedback('idle'), 2000);
        }
    };

    // Renderização dinâmica: Escolhe o componente certo baseado no 'type'
    const renderQuestionContent = () => {
        switch (currentQuestion.type) {
            case 'multiple_choice':
                // Aqui vamos criar o componente <MultipleChoiceQuestion /> na próxima etapa
                return (
                    <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl">
                        <h2 className="text-xl font-bold mb-4">{currentQuestion.multipleChoice?.prompt}</h2>
                        <p className="text-gray-500">Renderizar botões de múltipla escolha aqui...</p>
                        <Button type='button' onClick={() => handleAnswerSubmit(true)} variant="primary" className="mt-4">
                            Simular Acerto
                        </Button>
                    </div>
                );
            case 'fill_the_blanks':
                return <div>Componente Preencher Lacunas aqui...</div>;
            case 'essay':
                return <div>Componente Redação aqui...</div>;
            default:
                return <div>Tipo de questão desconhecido.</div>;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-8 mt-10">
     
            <div className="flex items-center gap-4 mb-8">
                <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex-1">
                    <ProgressBar progress={`${progressPercentage}%`} />
                </div>
                <div className="text-sm font-bold text-gray-500">
                    {currentIndex + 1} / {classwork.questions.length}
                </div>
            </div>

   
            <div className={`transition-all duration-300 ${feedback === 'error' ? 'animate-shake' : ''}`}>
                {renderQuestionContent()}
            </div>

            {feedback === 'success' && (
                <div className="mt-8 p-4 bg-green-100 text-green-700 font-bold rounded-xl text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">✨</span> Excelente! Preparando a próxima...
                </div>
            )}
        </div>
    );
}