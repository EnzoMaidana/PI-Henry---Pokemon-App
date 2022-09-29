import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByType, getPokemons, getTypes, orderByAttack, orderByCreated, orderByName } from '../actions';
import PokemonCard from './PokemonCard';
import Paginado from './Paginado';
import s from '../styles/Home.module.css';
import SearchBar from './SearchBar';
import NavBar from './NavBar';


export default function Home(){

    const dispatch = useDispatch();

    const allPokemons = useSelector((state) => state.pokemons);

    const allTypes = useSelector((state) => state.types);

    //Paginado
    const[currentPage, setCurrentPage] = useState(1);
    const[pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const [order,setOrder] = useState("");

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    };

    function handleFilterByType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setCurrentPage(1)
    };

    function handleFilterByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    };

    function handleFilterByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    };

    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(orderByCreated(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    };




    return(
            <div className={s.container}>
                <NavBar/>
                <div className={s.refreshContainer}>
                    <button onClick={(e) => {handleClick(e)}} className={s.refresh}>VOLVER A CARGAR POKEMONS</button>
                </div>
                <div className={s.filterContainer}>
                    {/* Filtro por tipo */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByType(e)} className={s.filselect}>
                            <option value='all'>All</option>
                            {
                                allTypes?.map((e) => {
                                    return(
                                        <option value={e.name} key={e.id}>
                                            {e.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {/* Filtro por nombre */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByName(e)} className={s.filselect}>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                    </div>
                    {/* Filtro por ataque */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByAttack(e)} className={s.filselect}>
                            <option value='ataAsc'>More attack</option>
                            <option value='ataDesc'>Less attack</option>
                        </select>
                    </div>
                    {/* Filtro por creacion */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByCreated(e)} className={s.filselect}>
                            <option value='all'>All</option>
                            <option value='api'>API</option>
                            <option value='created'>Created</option>
                        </select>
                    </div>
                    <div className={s.filter}>
                        <SearchBar/>
                    </div>
                </div>
                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
                <div className={s.cards}>
                    {
                    currentPokemons?.map((e) => {
                            return(
                                <PokemonCard 
                                key={e.id}
                                id={e.id}
                                img={e.img}
                                name={e.name}
                                types={e.types}
                                />
                            )
                        })
                    }
                    
                </div>
            </div>
    )
};