// No final do arquivo, em vez de export const useLoading...

import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext/LoadingContext"; 

// Use esta convenção para o ESLint entender que é um Hook auxiliar:
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
  }
  return context;
};