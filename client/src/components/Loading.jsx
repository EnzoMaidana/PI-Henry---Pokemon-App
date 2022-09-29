import React from "react";
import s from '../styles/Loading.module.css';

export default function Loading(){
    return(
        <nav>
            <div className={s.div}>
                <div className={s.loader}></div>
            </div>
        </nav>
    )
}