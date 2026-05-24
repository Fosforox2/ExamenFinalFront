"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { ResultCharactersT } from "../types/RicardoYMortirio";
import api from "@/api/api";
import CharacterChulangano from "../components/CharacterChulangano";
import Paginador from "../components/Paginador";


const CharactersPage = () => {


    const [resultCharacters, setResultCharacters] = useState<ResultCharactersT | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [finalName, setFinalName] = useState("");

    const fetchCharacters = () => {

        setLoading(true);

        try{

            let url = `/character?page=${page}`;

            if(finalName.trim()){
                url += `&name=${finalName}`;
            }

            api.get(url).then((e)=>{

                const { data }: { data: ResultCharactersT } = e;

                setResultCharacters(data);

            }).catch(()=>{

                setResultCharacters(null);

            }).finally(()=>{

                setLoading(false);

            })

        }catch(e){

            alert(String(e));

        }
    }

    useEffect(()=>{

        fetchCharacters();

    },[page, finalName]);

    if(loading){
        return(<h1>Loading...</h1>)
    }

    return (
        
        <div className="ContainerCharacters">

            <div className="SearchContainer">

                <input
                    value={name}
                    onChange={(e)=>{

                        setName(e.target.value);

                    }}
                    placeholder="Buscar personaje..."
                />

                <button onClick={()=>{

                    setPage(1);

                    setFinalName(name);

                }}>
                    Buscar
                </button>

            </div>

            {!loading && !resultCharacters && (
                <h2>No se encontraron personajes</h2>
            )}
            <div className="CharacterGrid">
                {resultCharacters && resultCharacters.results.map((e)=>(
                    <CharacterChulangano
                        key={e.id}
                        item={e}
                    />
                ))}
            </div>

            {resultCharacters && (
                <Paginador
                    next={!!resultCharacters?.info.next}
                    prev={!!resultCharacters?.info.prev}
                    page={page}
                    setPage={(e)=>{
                        setPage(e);
                    }}
                />
            )}
            <div className="BotonFavoritos">

                
            </div>

        </div>
    )
};

export default CharactersPage;
