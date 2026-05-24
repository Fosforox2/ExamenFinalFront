"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { CharacterT } from "../../types/RicardoYMortirio";
import api from "@/api/api";
import CharacterDetail from "../../components/CharacterDetail";
import { useParams } from "next/navigation";
import { useList } from "@/context/listaContext";

const CharacterPage = () => {
    
    const {addFavorito, removeFavorito} = useList();
    const [character, setCharacter] = useState<CharacterT | null>(null);    
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id;
    const getItemById = () => {
        try{
            api.get(`/character/${id}`).then((e)=>{
                const {data} : {data: CharacterT } = e;
                setCharacter(data);
            }).finally(()=>{
                setLoading(false);
            })
        }catch(e){
            alert(String(e));
        }
    }

    useEffect(()=>{
        getItemById();
    },[]);

    if(loading){
        return(<h1>Loading...</h1>)
    }

    return (
        <div className="CharacterPage">
            {character && (<CharacterDetail item={character}/>)}
        </div>
    )
};

export default CharacterPage;