import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api'; 
import type { Classwork } from '../../types/api'; 
import ClassworkPlayer from './ClassworkPlayer'; 
import { useLoading } from '../../hooks/useLoading'; 

export function ClassworkPage() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [classwork, setClasswork] = useState<Classwork | null>(null);
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        async function fetchClasswork() {
            if (!id) return;
            
            try {
                const { data } = await api.get<Classwork>(`/classworks/${id}`);
                setClasswork(data);
            } catch (error) {
                console.error("Erro ao carregar a lição:", error);
                navigate('/pagina-inicial');
            } finally {
                hideLoading();
            }
        }

        fetchClasswork();
    }, [id, navigate]);

    const handleFinishLesson = async (earnedXp: number, earnedRubys: number) => {
        console.log(`Lição terminada! Ganhaste ${earnedXp} XP e ${earnedRubys} Rubys!`);
        
        navigate('/pagina-inicial');
    };

    if (!classwork) {
        return null; 
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-4">
            <ClassworkPlayer 
                classwork={classwork} 
                onFinish={handleFinishLesson} 
            />
        </div>
    );
}