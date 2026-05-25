"use client";

import "./styles.css";

const Filtros = ({
    name,
    setName,
    buscar,
    cambiarEstado,
    cambiarGenero,
    estado,
    genero
}: {
    name: string,
    setName: (name: string) => void,
    buscar: () => void,
    cambiarEstado: () => void,
    cambiarGenero: () => void,
    estado: string | null,
    genero: string | null
}) => {

    return(
        <div className="SearchContainer">

            <input
                value={name}
                onChange={(e)=>{

                    setName(e.target.value);

                }}
                placeholder="Buscar personaje..."
            />

            <button onClick={buscar}>
                Buscar
            </button>

            <div className="FiltroEstado">

                <button onClick={cambiarEstado}>
                    Estado: {estado || "Todos"}
                </button>

                <button onClick={cambiarGenero}>
                    Género: {genero || "Todos"}
                </button>

            </div>

        </div>
    )
}

export default Filtros;