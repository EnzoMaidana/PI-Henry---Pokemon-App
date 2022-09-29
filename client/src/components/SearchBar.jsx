import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import s from '../styles/SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name));
        setName('')
    };

    return(
        <div className={s.wrap}>
                <form onSubmit={(e) => handleSubmit(e)} className={s.search}>
                    <input
                        type='text'
                        value={name}
                        placeholder='Pokemon...'
                        onChange={(e) => handleChange(e)}
                        className={s.searchTerm}
                        >
                    </input>
                    <button type='submit' className={s.btnSearch}><FcSearch/></button>
                </form>
        </div>
    )
}