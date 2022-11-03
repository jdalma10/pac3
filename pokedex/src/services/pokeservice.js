import axios from 'axios'

const pokeAPI = axios.create({
        baseURL: "https://pokeapi.co/api/v2",
        withCredentials: false,
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    });
    


export default {
        getAllPokemons() {
        return pokeAPI.get("/pokemon");
        },

        getPokemonsOffset(off) {

   
        return pokeAPI.get(`/pokemon/?limit=9&offset=${off}`);
        },

        getPokemon(name) {
            
            return pokeAPI.get("/pokemon/" + name);
            },
    };