import "./styles.css";

const Paginador = ({
    next,
    prev,
    page,
    setPage,
    totalPages
}: {
    next: boolean,
    prev: boolean,
    page: number,
    setPage: (page: number) => void,
    totalPages: number
}) => {

    return(
        <div className="PaginadorContainer">

            {prev && (
                <button onClick={() => setPage(page-1)}>
                    {"<"}
                </button>
            )}

            {[1,2,3].map((p)=>(
                p <= totalPages &&
                <button
                    key={p}
                    className={p === page ? "active" : ""}
                    onClick={()=>setPage(p)}
                >
                    {p}
                </button>
            ))}

            {page > 3 && page < totalPages - 2 && (
                <button className="active">
                    {page}
                </button>
            )}

            {[totalPages-2, totalPages-1, totalPages].map((p)=>(
                p > 3 &&
                <button
                    key={p}
                    className={p === page ? "active" : ""}
                    onClick={()=>setPage(p)}
                >
                    {p}
                </button>
            ))}

            {next && (
                <button onClick={() => setPage(page+1)}>
                    {">"}
                </button>
            )}

        </div>
    )
}

export default Paginador;
