import React from "react";
import { Link } from 'react-router-dom';
import s from '../styles/LandingPage.module.css';
import { MdCatchingPokemon } from "react-icons/md";

export default function LandingPage(){
    return(
        <div className={s.container}>
           <p className={s.p}>
                <a href="https://fontmeme.com/es/fuente-pokemon/"><img src="https://fontmeme.com/permalink/220924/ef950a3968feeb16d6ca42e1607413c2.png" alt="fuente-pokemon" border="0" width='800px' height='100px'/></a>
            </p>
            <div className={s.borderio}>
                <Link to='/home' className={s.link}>
                    <button className={s.btn}><MdCatchingPokemon className={s.btnP}/></button>
                </Link>   
            </div>
        </div>
    )
};