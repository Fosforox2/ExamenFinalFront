"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { ResultCharactersT } from "./types/RicardoYMortirio";
import api from "@/api/api";
import CharacterChulangano from "./components/CharacterChulangano";
import Paginador from "./components/Paginador";


const MainPage = () => {


    const [resultCharacters, setResultCharacters] = useState<ResultCharactersT | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [finalName, setFinalName] = useState("");
    const filtradoEstado = [null,"Dead", "Alive", "unknown"];
    const filtradoGenero = [null,"Female", "Male", "Genderless", "unknown"];


    const [statusIndex, setStatusIndex] = useState(0);
    const [genderIndex, setGenderIndex] = useState(0);

    const estado = filtradoEstado[statusIndex];
    const genero = filtradoGenero[genderIndex];

    const fetchCharacters = () => {

        setLoading(true);

        try{

            let url = `/character?page=${page}`;

            if(finalName.trim()){
                url += `&name=${finalName}`;
            }

            if(estado){
                url += `&status=${estado}`;
            }

            if(genero){
                url += `&gender=${genero}`;
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

    },[page, finalName, estado, genero]);

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
                <div className="FiltroEstado">
                 <button onClick={()=>{

                    setPage(1);

                    setStatusIndex((prev)=>
                        (prev + 1) % filtradoEstado.length
                    );

                }}>
                    Estado: {estado}
                </button>

                <button onClick={()=>{

                    setPage(1);

                    setGenderIndex((prev)=>
                        (prev + 1) % filtradoGenero.length
                    );

                }}>
                    Género: {genero}
                </button>
              </div>
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
                    next={resultCharacters.info.next !== null}
                    prev={resultCharacters.info.prev !== null}
                    page={page}
                    setPage={setPage}
                    totalPages={resultCharacters.info.pages}
                />
            )}
        </div>
    )
};

export default MainPage;
