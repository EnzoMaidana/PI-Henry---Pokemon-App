//Defino el estado inicial 

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: [],
    pokemonsCreated: [],
    types: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload,
            }
        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const typeFilter = action.payload === 'all' ? allPokemons : allPokemons.filter((e) => e.types.some((e) => e.name === action.payload));
            return{
                ...state,
                pokemons: typeFilter
            }
        case 'ORDER_BY_NAME':
            const pokemonsOrder = action.payload === 'asc' ? 
            state.pokemons.sort((a,b) => (a.name > b.name ? 1 : -1)) :
            state.pokemons.sort((a,b) => (a.name > b.name ? -1 : 1));
            return{
                ...state,
                pokemons: pokemonsOrder
            }
        case 'ORDER_BY_ATTACK':
            const attackFilter = action.payload === 'ataAsc' ? 
            state.pokemons.sort((a,b) => (a.attack > b.attack ? -1 : 1)) :
            state.pokemons.sort((a,b) => (a.attack > b.attack ? 1 : -1));
            return{
                ...state,
                pokemons: attackFilter
            }
        case 'ORDER_BY_CREATED':
            const allPokemons4 = state.allPokemons;
            const createdFilter = action.payload === 'created' ? 
            allPokemons4.filter((e) => e.createdInDb) :
            allPokemons4.filter((e) => !e.createdInDb);
            return{
                ...state,
                pokemons: createdFilter
            }
        case 'GET_BY_NAME':
            return{
                ...state,
                pokemons: action.payload
            }
        case 'CREATE_ACTIVITY':
            return{
                ...state,
                pokemonsCreated: action.payload
            }
        case 'GET_POKEMON_DETAIL':
            return{
                ...state,
                pokemonDetail: action.payload
            }
        case 'RESET_POKEMON_DETAIL':
            return{
                ...state,
                pokemonDetail: []
            }
        default:
            return state
    }
}

export default rootReducer;