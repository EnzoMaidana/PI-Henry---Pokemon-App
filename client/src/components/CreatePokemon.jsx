import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { createPokemon, getPokemons, getTypes } from "../actions";
import { RiArrowGoBackFill } from "react-icons/ri";
import s from '../styles/CreatePokemon.module.css';
import validate from "./Validation";

export default function CreatePokemon(){

    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const pokemonsSelected = useSelector((state) => state.pokemons);
    //Declaro un estado local para el input del usuario. 
    const [ input, setInput ] = useState({
        name: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
        img: '',
        evolution: '',
    });
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    useEffect(() => {
        setErrors(validate(input, pokemonsSelected))
    }, [input, pokemonsSelected]);

    //Funcion para definir el valor de los inputs. 
    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };

    //Funcion para definir el valor del select para los tipos. 
    function handleSelect(e){
        e.preventDefault();
        if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value],
            })
        }else{
            alert('Two types of pokemon at most')
        }
    };

    //Funcion para resetear los tipos seleccionados por el usuario. 
    function handleReset(){
        setInput({
            ...input,
            types: []
        })
    };

    function handleSelectEvolution(e){
        e.preventDefault();
        setInput({
            ...input,
            evolution: e.target.value
        })
    }

    //Funcion para submitear el input del usuario y despachar la accion para crear un pokemon. 
    function handleSubmit(e){
        e.preventDefault();
        if(
            input.name !== '' &&
            !errors.name &&
            !errors.life &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.img &&
            !errors.types
        ){
            dispatch(createPokemon(input));
            alert('Pokemon created');
            setInput({
                name: '',
                life: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: [],
                img: '',
            });
            history.push('/home');
        }else{
            alert('Error, complete correctly')
        }
    };

    

    return(
        <div className={s.container}>
            <Link to='/home'>
                <button className={s.btnBack}><RiArrowGoBackFill/></button>
            </Link>

            <form onSubmit={(e) => handleSubmit(e)} className={s.formulario}>
                    <div className={s.inputContainer}>
                        <label>NAME:</label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && <p className={s.error}>{errors.name}</p>}
                        
                        <label>SPEED:</label>
                        <input
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.speed && <p className={s.error}>{errors.speed}</p>}
                    </div>

                

                    <div className={s.inputContainer}>
                        <label>ATTACK:</label>
                        <input
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.attack && <p className={s.error}>{errors.attack}</p>}
                        
                        <label>DEFENSE:</label>
                        <input
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.defense && <p className={s.error}>{errors.defense}</p>}
                    </div>

                  

                    <div className={s.inputContainer}>
                        <label>LIFE:</label>
                        <input
                            type="number"
                            value={input.life}
                            name="life"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.life && <p className={s.error}>{errors.life}</p>}

                        <label>IMAGE:</label>
                        <input
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.img && <p className={s.error}>{errors.img}</p>}
                    </div>

                    <div className={s.inputContainer}>
                        <label>HEIGHT:</label>
                        <input
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.height && <p className={s.error}>{errors.height}</p>}
                        
                        <label>WEIGHT:</label>
                        <input
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.weight && <p className={s.error}>{errors.weight}</p>}
                    </div>          
                    <div className={s.selectContainer}>
                        <label >TYPES:</label>
                        <select onChange={(e) => handleSelect(e)}>
                            <option>Select type</option>

                                {types.map((type) => (
                                <option value={type.name} key={type.name}>{type.name}</option>
                                ))}
                        </select>
                        {errors.types && <p className={s.error}>{errors.types}</p>}
                    </div>

                    <div className={s.countryContainer}>
                        {
                        input.types.map((e) => (

                            <div key={e}>
                                <p className={s.country}>
                                    {e}
                                </p>
                            </div>
                            
                        ))}
                        
                    </div>
                    <div>
                        <button type='reset' onClick={(e) => handleReset(e)}>CLEAN</button>
                    </div>
                <div>
                    <button type="submit" className={s.btnCreate}>
                        {" "}
                        CREATE!
                    </button>
                </div>
            </form>
        </div>
    )




}