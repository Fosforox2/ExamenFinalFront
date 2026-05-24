import { CharacterT } from "@/app/types/RicardoYMortirio";
import "./styles.css";
import Link from "next/link";

const CharacterChulangano = ({item} : {item: CharacterT}) => {


    return(
        <Link href={`/items/${item.id}`} className="ContainerChulanganoLink">
            
            <div className="ContainerChulangano">
                <img src={item.image}/>
                <div className="InfoContainer">
                    <h1>{item.name}</h1>
                    <p>{item.gender}</p>
                    <p>{item.status}</p>
                    <p>{item.origin.name}</p>
                </div>
                
            </div>
        </Link>
    )
};

export default CharacterChulangano 