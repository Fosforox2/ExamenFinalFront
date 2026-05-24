"use client";

import CharacterChulangano from "../components/CharacterChulangano";
import { useList } from "@/context/listaContext";
import Paginador from "../components/Paginador";
import { useState } from "react";

const FavoritosPage = () => {

    const { favoritos, removeFavorito  } = useList();
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const favoritosResult = {
        info: {
            next: page * itemsPerPage < favoritos.length,
            prev: page > 1,
        },

        results: favoritos.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
        )
    };

    return (
        <div className="ContainerCharacters">

            <h2>Lista de favoritos</h2>

            {favoritos.length === 0 && (
                <h3>No hay favoritos guardados</h3>
            )}

            <div className="CharacterGrid">

                {favoritosResult.results.map((e) => (

                    <CharacterChulangano
                        key={e.id}
                        item={e}
                    />

                ))}

            </div>
            {favoritos.length > 0 && (
                <Paginador
                    next={favoritosResult.info.next}
                    prev={favoritosResult.info.prev}
                    page={page}
                    setPage={setPage}
                />
            )}
        </div>
    );
};

export default FavoritosPage;