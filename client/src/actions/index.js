import axios from 'axios';

//Despacho las acciones y el payload correspondiente. 

export function getPokemons(){
    return async function(dispatch){
        var pokemons = await axios.get(`https://pi-henry-pokemon-app-production.up.railway.app/pokemons`);
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data,
        })
    }
};

export function getTypes(){
    return async function(dispatch){
        var types = await axios.get(`https://pi-henry-pokemon-app-production.up.railway.app/types`);
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data,
        })
    }
};

export function filterByType(payload){
    return{
        type: 'FILTER_BY_TYPE',
        payload
    }
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByAttack(payload){
    return{
        type: 'ORDER_BY_ATTACK',
        payload
    }
};

export function orderByCreated(payload){
    return{
        type: 'ORDER_BY_CREATED',
        payload
    }
};

export function getByName(name){
    return async function(dispatch){
        try{
            const pokemon = await axios.get(`https://pi-henry-pokemon-app-production.up.railway.app/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_BY_NAME',
                payload: pokemon.data
            })
        }catch{
            alert('Pokemon not found')
        }
    }
};

export function createPokemon(value){
    return async function(dispatch){
        var { data } = await axios.post(`https://pi-henry-pokemon-app-production.up.railway.app/pokemons`, value);
        return dispatch({
            type: 'CREATE_POKEMON',
            value: data
        })
    }
};

export function getPokemonDetail(id){
    return async function(dispatch){
        try{
            const { data } = await axios.get(`https://pi-henry-pokemon-app-production.up.railway.app/pokemons/${id}`);
            return dispatch({
                type: 'GET_POKEMON_DETAIL',
                payload: data,
            })
            
        }catch(e){
            console.log(e)
        }
    }
};

export function resetPokemonDetail(){
    return({
        type: 'RESET_POKEMON_DETAIL',
        pokemonDetail: []
    })
};
