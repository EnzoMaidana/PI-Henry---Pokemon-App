let noEmpty = /\S+/;
let nameValidate = /^[a-z]+$/i;

export default function validate(input, pokemonsSelected){
    let errors = {};
    if(!noEmpty.test(input.name) || !nameValidate.test(input.name)) {
        errors.name = 'The name must be only letters';
    };

    if(input.name.length <= 2) {
        errors.name = '*The name must have at least 3 letters';
    }

    if(pokemonsSelected?.filter((e) => input.name === e.name).length !== 0) {
        errors.name = '*The name of that pokemon already exists'
    }

    if(!input.speed) {
        errors.speed = '*Speed is required';
    }

    if (input.speed > 999 || input.speed < 0) {
        errors.speed = "*Speed must be between 1 and 999";
    }

    if(!input.life) {
        errors.life = '*Life is required'
    }

    if(input.life > 500 || input.life < 0) {
        errors.life = '*Life must be between 1 and 500';
    }

    if(!input.attack){
        errors.attack = '*Attack is required';
    }

    if (input.attack > 999 || input.attack < 0) {
        errors.attack = "*Attack must be between 0 and 999";
    }

    if(!input.defense){
        errors.defense = '*Defense is required';
    }

    if (input.defense > 999 || input.defense < 0) {
        errors.defense = "*Defense must be between 0 and 999";
    }

    if(!input.height){
        errors.height = '*Height is required';
    }

    if (input.height > 999 || input.height < 0) {
        errors.height = "*Height must be between 1 and 999";
    }

    if(!input.weight){
        errors.weight = '*Weight is required';
    }

    if (input.weight > 999 || input.weight < 0) {
        errors.weight = "*Weight must be between 1 and 999";
    }

    if (!input.img) {
        errors.img = "*URL required";
    }
    
    if (!input.types.length) {
        errors.types = "*You must choose at least one type";
    }

    return errors;
}