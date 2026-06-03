

export type UserRole = "student" | "professor"; 
export type QuestionType = 'multiple_choice' | 'fill_the_blanks' | 'essay';

export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    role: UserRole;
    isActive?: boolean;
}

export interface StudentProfile {
    id: string;
    classroomId: string | null;
    level: number;
    currentXp: number;
    totalXp: number;
    ruby: number;
    trophy: number;
    user: User; 
}

export interface ProfessorProfile {
    id: string;
    specialization: string | null;
    user: User;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData  {
     email: string; 
     name: string; 
     username: string; 
     password: string
}

export interface LoginResponse {
    acessToken: string; 
    user: User;
}

export interface RegisterResponse {
    message: string;
}

export interface VerifyEmailResponse {
    message: string;
    acessToken: string;
    user: User;
}

export interface MultipleChoiceDetail {
    questionId: string;
    prompt: string;
    options: string[];
    correctOptionIndex: number;
}

export interface FillTheBlanksDetail {
    questionId: string;
    promptWithBlanks: string;
    correctAnswers: string[];
}

export interface EssayDetail {
    questionId: string;
    prompt: string;
    minWords?: number;
}

export interface Question {
    id: string;
    classworkId: string;
    type: QuestionType;
    sequenceOrder: number;
    xpReward: number;

    multipleChoice: MultipleChoiceDetail | null;
    fillTheBlanks: FillTheBlanksDetail | null;
    essay: EssayDetail | null;
}

export interface Classwork {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    rubyReward: number;
    questions: Question[];
}