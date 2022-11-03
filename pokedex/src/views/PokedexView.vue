<script setup>
import Card from '../components/Card.vue'
import pokeapi from "../services/pokeservice.js"
///import dark from "../services/dark.js"
import {ref, computed, onMounted} from 'vue'

const items = ref([])
const search = ref('')

onMounted(()=>{

  let rnd = Math.floor(Math.random() * 151);

  pokeapi.getPokemonsOffset(rnd)
    .then(response=>{
        items.value = response.data.results;
    })
    .catch(error => console.log(error));
})

// Com vue es reactiu, amb la funció computed indiquem el comportament de la 
//app mitjançant aquesta array on es filtren els pokemons en funció de la cerca.
const filteredPoke = computed(()=>{

   console.log(items.value);

     return items.value.filter((poke)=>{
      return poke.name.toLowerCase().includes(search.value.toLowerCase())
    }) 
  })


</script>




<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>


const body = document.querySelector("body");

const nav = document.querySelector("nav");


var b = document.createElement('a');
b.setAttribute('id','changeMode');
b.setAttribute('style','border-left:1px solid var(--color-border); padding:0 1rem');
b.innerHTML="Canvia Mode";
nav.appendChild(b);
document.getElementById("changeMode").addEventListener('click',function(e){
        
        e.preventDefault();
    
        if(body.classList.contains('light')){
            body.classList.remove("light");
            body.classList.add("dark");
            window.localStorage.setItem("mode","dark");
    }else{
            body.classList.remove("dark");
            body.classList.add("light");
            window.localStorage.setItem("mode","light");
    }
    
    })


export default {

 
  created(){
    if(window.localStorage.getItem("mode")!=null){
                    if(window.localStorage.getItem("mode")=="dark"){
                        body.classList.remove("light");
                        body.classList.add("dark");
                    }else{
                        body.classList.remove("dark");
                        body.classList.add("light");
                    }
      }else{
          body.classList.add("light");
      }
  },

}

</script>

<template>
   
  <div class="about">

 
    <div class="card-list">
      <Card v-for="item in filteredPoke " 
        :key="item.name" 
        :titol=item.name 
        :url=item.url 
        />

    </div>
    <div>
      <label for="cerca"> Cerca:   </label>
    <input type="text" placeholder="type to search.." style="" id="cerca" v-model="search">
    </div>
   

  </div>
</template>

