import React, { useEffect } from "react";
import { getPokemonDetail, resetPokemonDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from '../styles/PokemonDetail.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";
import Loading from "./Loading";
import NavBar from './NavBar';


export default function Detail(props){

    const dispatch = useDispatch();
    const pokeDetail = useSelector((state) => state.pokemonDetail);
    //Defino la variable id con el valor que me pasa el usuario por params. 
    const id = props.match.params.id

    //Me traigo el detalle del pokemon desde el estado cuando el componente se monta. 
    useEffect(() => {
        dispatch(getPokemonDetail(id));
        return () => {
            dispatch(resetPokemonDetail(dispatch));
        }
    }, [dispatch, id])


    return(
        <div>
            <NavBar/>
            {pokeDetail[0] ? 
            <div className={s.detailContainer}>
                <div className={s.detailCard}>
                    <h1 className={s.name}>{pokeDetail[0] ? pokeDetail[0].name.charAt(0).toUpperCase() + pokeDetail[0].name.slice(1) : ''}</h1>
                    {/* <p>{pokeDetail[0] ? pokeDetail[0].id : ''}</p> */}
                    <img src={pokeDetail[0] ? pokeDetail[0].img : ''} alt="" width='250px' height='250px'></img>
                <div className={s.details}>
                    <ul>
                        <li><span>TYPES:</span>
                        {
                                pokeDetail[0] ? pokeDetail[0].types.map((e, i) => {
                                    return(
                                        <div key={i}>
                                            <p>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                        </div>
                                    )
                                }) :
                                ''
                            }
                        </li>
                        <li><span>ID:</span>{pokeDetail[0] ? pokeDetail[0].id : ''}</li>
                        <li><span>LIFE:</span>{pokeDetail[0] ? pokeDetail[0].life : ''}</li>
                        <li><span>ATTACK:</span>{pokeDetail[0] ? pokeDetail[0].attack : ''}</li>
                        <li><span>DEFENSE:</span>{pokeDetail[0] ? pokeDetail[0].defense : ''}</li>
                        <li><span>SPEED:</span>{pokeDetail[0] ? pokeDetail[0].speed : ''}</li>
                        <li><span>HEIGHT:</span>{pokeDetail[0] ? pokeDetail[0].height : ''}</li>
                        <li><span>WEIGHT:</span>{pokeDetail[0] ? pokeDetail[0].weight : ''}</li>
                    </ul>
                </div>


                
                <Link to='/home'>
                    <div className={s.btnContainer}>
                        <button className={s.btn}><RiArrowGoBackFill/></button>
                    </div>
                </Link>
                </div>
            </div> 
            :
            <Loading/>
            }
        </div>
    )
}