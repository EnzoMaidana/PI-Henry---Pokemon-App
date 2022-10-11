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

    //Declaro la variable dispatch para ir despachando mis acciones
    const dispatch = useDispatch();
    //Traigo todos los pokemons del state
    const allPokemons = useSelector((state) => state.pokemons);
    //Traigo todos los types del state
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

    //Me traigo del estado los pokemons y types cuando el componente se monta
    useEffect(() => {
        //Despacho las acciones 
        dispatch(getPokemons());
        dispatch(getTypes());
        //
    }, [dispatch]);

    //Funcion para resetear los pokemons
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    };

    //Funcion para filtrar por tipo
    function handleFilterByType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value));
        setCurrentPage(1)
    };

    //Funcion para ordenar por nombre
    function handleFilterByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    };

    //Funcion para ordenar por ataque
    function handleFilterByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    };

    //Funcion para filtrar por API o DB
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
                            <option>Filter by type</option>
                            <option value='all'>All</option>
                            {
                                allTypes ? allTypes.map((e) => {
                                    return(
                                        <option value={e.name} key={e.id}>
                                            {e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                                        </option>
                                    )
                                })
                                :
                                ''
                            }
                        </select>
                    </div>
                    {/* Filtro por nombre */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByName(e)} className={s.filselect}>
                            <option>Order by name</option>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                    </div>
                    {/* Filtro por ataque */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByAttack(e)} className={s.filselect}>
                            <option>Filter by attack</option>
                            <option value='ataAsc'>More attack</option>
                            <option value='ataDesc'>Less attack</option>
                        </select>
                    </div>
                    {/* Filtro por creacion */}
                    <div className={s.filter}>
                        <select onChange={(e) => handleFilterByCreated(e)} className={s.filselect}>
                            <option>Filter by creation</option>
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
