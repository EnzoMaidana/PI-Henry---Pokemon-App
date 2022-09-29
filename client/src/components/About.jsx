import React from "react";
import s from '../styles/About.module.css';
import NavBar from './NavBar';


export default function About(){
    return(
        <div>
            <NavBar/>
            <div class={s.container}>
                <div class={s.card}>
                    <div class={s.front}>
                    </div>
                    <div class={s.back}>
                        <h1 className={s.hStyle}>Maidana Enzo<span>Full-Stack  Developer</span></h1>
                        <ul className={s.ulStyle}>
                            <a href="https://github.com/EnzoMaidana" className={s.liStyle}>https://github.com/EnzoMaidana</a>
                            <li className={s.liStyle}>enzomaidana1995@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

