import React from "react";
import { Link } from "react-router-dom";
import s from '../styles/NavBar.module.css';

export default function NavBar(){
    return(
        <div className={s.navbar}>
            <img className={s.logo} src="https://images.wikidexcdn.net/mwuploads/wikidex/5/51/latest/20100906033636/Pok%C3%A9dex_RAAm.png" width="30" height="30" alt=""/>

            <ul>
                <Link to='/home'><li>HOME</li></Link>
                <Link to='/pokemons'><li>CREATE POKEMON</li></Link>
                <Link to='/about'><li>ABOUT</li></Link>
            </ul>
        </div>
    )
}; 