const { Router } = require('express');
const { default: axios } = require('axios');
const { getAllInfo } = require ('./controllers');
const { Pokemon, Type } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    try{
        const { name } = req.query;
        const allPokemons = await getAllInfo();
        if(name) {
            let pokemonName = allPokemons.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName ? res.status(200).send(pokemonName) : res.status(404).send('El pokemon no fue encontrado');  
        } else{
            res.status(200).json(allPokemons)
        }
    } catch (e) {
        res.status(400).send({error: e.message})
    }
});

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllInfo();   
    try{
        if(id){
            const pokemonId = allPokemons.filter((e) => e.id == id);
            pokemonId ? res.status(200).send(pokemonId) : res.status(400).send('El pokemon no fue encontrado')       
        } 
    } catch(e){
        res.status(400).send({error: e.message})
    }
});

router.get('/types', async (req, res) => {
    try{
        const typesDB = await Type.findAll();
        res.status(200).json(typesDB); 
    } catch(e){
        res.status(400).send({error: e.message})
    }

});

router.post('/pokemons', async (req, res) => {
    try{
        
        const {  
            name, 
            life, 
            attack, 
            defense, 
            speed, 
            height, 
            weight, 
            img, 
            types,
            createInDb} = req.body
        
        if(name) {
            const allPokemons = await getAllInfo();
            const pokemon = allPokemons.find((e) => e.name.toLowerCase() === name.toLowerCase());
    
            if(pokemon === undefined) {
                const pokemonCreate = await Pokemon.create({
                    name, 
                    life,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img,
                    types,
                    createInDb,
                });
    
                const typesDB = await Type.findAll({
                    where: {
                        name: types,
                    }
                })
    
                pokemonCreate.addType(typesDB);
                res.status(200).send(pokemonCreate)
            }
        }
    } catch (e){
        res.status(400).send({error: e.message})
    }
})



module.exports = router;
