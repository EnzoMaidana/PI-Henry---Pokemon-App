const { default: axios } = require('axios');
const { Pokemon, Type } = require("../db");


//Traigo la info de la API

const getApiInfo = async () => {
    try{
        let pokemons = [];
        let url = 'https://pokeapi.co/api/v2/pokemon/';

        //Hago el subrequest para traerme la info de cada pokemon
        do {
            let apiUrl = await axios.get(url);
            let apiInfo = apiUrl.data.results.map((e) => {
                return {
                    name: e.name,
                    url: e.url
                }
            });
            pokemons.push(...apiInfo);
            url = apiUrl.data.next;
        } while(url !== null && pokemons.length < 40)

        //Genero una promesa por cada elemento del arreglo pokemons para traerme solo la informacion necesaria
        let pokemonsData = await Promise.all(
            pokemons.map(async (e) => {
                let pokemon = await axios.get(e.url);
                return {
                    id: pokemon.data.id,
                    name: pokemon.data.name,
                    types: pokemon.data.types.map((e) => {
                        return {
                            name: e.type.name,
                        }
                    }),
                    life: pokemon.data.stats[0].base_stat,
                    attack: pokemon.data.stats[1].base_stat,
                    defense: pokemon.data.stats[2].base_stat,
                    speed: pokemon.data.stats[5].base_stat,
                    height: pokemon.data.height,
                    weight: pokemon.data.weight,
                    img: pokemon.data.sprites.other.home.front_default,

                }
            })
        )
        return pokemonsData
    } catch (e) {
        console.log(e)
    }
};

//Traigo la info de la DB

const getDbInfo = async () => {
    try{
        //Busco en mi DB los pokemons creados por el usuario
        return await Pokemon.findAll({
            include: {
                model: Type,
                attribute: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
};

//Traigo toda la info 

const getAllInfo = async () => {
    try{
        //Concateno la info de la API junto con la info de la DB
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();

        return apiInfo.concat(dbInfo)
    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo
}