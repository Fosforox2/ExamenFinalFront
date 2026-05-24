'use client'

import { CharacterT } from "@/app/types/RicardoYMortirio";
import { createContext, useContext, useState, ReactNode } from "react";


type FavContextType = {
  favoritos: CharacterT[];
  addFavorito: (item: CharacterT) => void;
  editFavorito: (oldItem: CharacterT, newItem: CharacterT) => void;
  removeFavorito: (id: number) => void;
};

const FavContext = createContext<FavContextType | null>(null);

export const FavsProvider = ({ children }: { children: ReactNode }) => {
  const [favoritos, setFavoritos] = useState<CharacterT[]>([]);

  const addFavorito = (item: CharacterT) => {
    setFavoritos((prev) => {
      if (prev.find(a => a.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const editFavorito = (oldItem: CharacterT, newItem: CharacterT) => {
    setFavoritos(favoritos.map(a => a === oldItem ? newItem : a));
  };

  const removeFavorito = (id: number) => {
    setFavoritos(prev => prev.filter(a => a.id !== id));
  };

  return (
    <FavContext.Provider value={{ favoritos, addFavorito, editFavorito, removeFavorito }}>
      {children}
    </FavContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(FavContext);
  if (!context) throw new Error("out of context");
  return context;
};