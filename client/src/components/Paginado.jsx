import React from 'react'
import s from '../styles/Paginado.module.css';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className={s.paginate}> 
                {
                    pageNumbers && pageNumbers.map((n) => (
                        <li key={n}>
                            <button onClick={() => paginado(n)} className={s.btnPaginate}>
                                {n}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}