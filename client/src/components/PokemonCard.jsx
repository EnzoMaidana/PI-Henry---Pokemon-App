import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/PokemonCard.module.css';

export default function PokemonCard({id, img, name, types, createdInDb }){
    return(
        <div className={s.countryCard}>
            <div className={s.card}>
                <img src={img} alt='flag' width='250px' height='250px'/>
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    {
                        types.map((e) => {
                            return(
                                <h3 key={e.id} className={s.textCard}>
                                    {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                                </h3>
                            )
                        })
                    }
                <Link to={`/pokemons/${id}`}>
                    <h3 className={s.detail}>More detail</h3>
                </Link>
            </div>
        </div>
    )
};
