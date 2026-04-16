// LoadingContext.ts
import { createContext } from "react";

export interface LoadingContextData {
    showLoading: () => void;
    hideLoading: () => void;
}

// Exportamos apenas o contexto e a interface (não são componentes)
export const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);