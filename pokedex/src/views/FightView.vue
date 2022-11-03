<script setup>
import Card from '../components/Card.vue'
import pokeapi from "../services/pokeservice.js"
import { ref , getCurrentInstance} from 'vue'

const count = ref(0)

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


export default {
  data(){
    return{
      events:[],
      pokename:'',
      items:[],
      numClics : 0,
      atac :0,
      def: 0,
      cartaAtac:'',
      cartaDef:'',
    }
  },
  emits: ['clickBtn'],
  methods:{

  gira(id){

  let card = document.getElementById(id);

  this.numClics++;
  if(this.numClics==1){

    this.atac = card.querySelector('.card-atac').innerHTML;
    this.cartaAtac = card;
    
  }else if(this.numClics==2){

    this.numClics = 0;
    this.def = +card.querySelector('.card-def').innerHTML;
    this.cartaDef = card;

    //comprovació victoria
   if(this.atac>this.def){
      alert(this.cartaAtac.querySelector('h4').innerHTML + ' ataca i guanya a ' + this.cartaDef.querySelector('h4').innerHTML );
     // this.cartaDef.querySelector('.back').style.display='none';
   
    }else if(this.def>this.atac){
      alert(this.cartaAtac.querySelector('h4').innerHTML + ' ataca i perd contra ' + this.cartaDef.querySelector('h4').innerHTML );
    }else{
      alert('Empat tècnic');
    }

          
    //reset variables
           this.numClics = 0;
          this.atac = 0;
          this.def = 0;
          this.cartaAtac = ""
          this.cartaDef = ""; 
 
  }

   

},

      

  },

  created(){
    let rnd = Math.floor(Math.random() * 151);

    pokeapi.getPokemonsOffset(rnd)
    .then(response=>{
      console.dir(response.data);
      this.items = response.data.results;
  
    })
    .catch(error => console.log(error))


  }
}

</script>

<template>
  <div class="about">

    <div class="card-list">  
      <Card v-for="item in items" 
        :key="item.name" 
        :titol=item.name 
        :url=item.url
        @response="gira" />
    </div>
  
  </div>
</template>

