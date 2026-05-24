import { CharacterT } from "@/app/types/RicardoYMortirio";
import "./styles.css";
import { useList } from "@/context/listaContext";

const CharacterDetail = ({item}:{item: CharacterT}) => {

    const {
        favoritos,
        addFavorito,
        removeFavorito
    } = useList();

    const isFavorite = favoritos.some(a => a.id === item.id);

    const handleFavorite = () => {

        if(isFavorite){

            removeFavorito(item.id);

        }else{

            addFavorito(item);

        }
    };

    return(

        <div className="CharacterDetailContainer">

            

            <img src={item.image}/>

            <div className="CharacterInfo">

                <h1><button
                className="StarButton"
                onClick={handleFavorite}
            >
                {isFavorite ? "★" : "☆"}
            </button>{item.name}</h1>

                <p><span>Gender:</span>{item.gender}</p>
                <p><span>Status:</span>{item.status}</p>
                <p><span>Species:</span>{item.species}</p>
                <p><span>Origin:</span>{item.origin.name}</p>
                <p><span>Location:</span>{item.location.name}</p>
                <p><span>Created:</span>{item.created}</p>

                <p className="Description">
                    <span>Description:</span>
                    {item.description}
                </p>

            </div>

        </div>
    )
}

export default CharacterDetail;