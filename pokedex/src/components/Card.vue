<script>
import pokeapi from "../services/pokeservice.js"


export default {


  data() {
    return {
      count: 0,
      pokemon: {},
      image: '',
      image_back: '',
      atac: '0',
      defensa: '0',
      id: 0,
      front: true,
      back: false,

    }
  },

  emits: ['response'],
  methods: {
    //Nomes mostra back. La gestió del combat es fa des de Fight view amb emits
    gira(event) {


      //let card = event.target;
      this.count++;
 
      if (this.count == 1) {
        this.front = false;
        this.back = true;
      } else {
        this.front = true;
        this.back = false;
        this.count = 0;
      }
   
    },
  
  },
  created() {

    //obtenim id de la url
    let array = this.url.split("/");
    this.id = array[array.length - 2];


    pokeapi.getPokemon(this.id)
      .then(response => {
        this.pokemon = response.data;
        this.image = this.pokemon.sprites.front_default
        this.image_back = this.pokemon.sprites.back_default
        this.atac = this.pokemon.stats[1].base_stat
        this.defensa = this.pokemon.stats[2].base_stat
      })
      .catch(error => console.log(error))


  }
}
</script>


<script setup>

defineProps({
  titol: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})


</script>

<template>
  
  <div class="card" :id ="this.id" @click=" $emit('response',this.id); gira($event)">
    
    <h2 class="card-title" ></h2>


    <div class="front" v-show="front">
      <div style="display:flex;flex-direction:row">
        <h4 class="card-title">{{ titol }}</h4>
        <img v-if="image" :key="this.id" class="card-image" :src="this.image" alt="image.alt">
      </div>
    </div>
    <div class="back" v-show="back">
      <div style="display:flex;flex-direction:row">
        <div>
          <label for="file">Atac:</label>
          <div class="card-atac">{{ this.atac }}</div>
        </div>
        <div>
          <label for="file">Defensa:</label>
          <div class="card-def">{{ this.defensa }}</div>
        </div>
       
        <img v-if="image" :key="this.id" class="card-image" :src="this.image_back" alt="image.alt">

      </div>

    </div>
 
  </div>
  
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
