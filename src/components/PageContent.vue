<template>
    <div>
        <div id='itemsList'>
          <ul>
            <li> 
               <router-link to="/" exact>Home</router-link>
            </li>
            <li>
              <router-link to="/orders">Orders</router-link>
            </li>
            <li>
              <router-link to="/Dashboard">Dashboard</router-link>
            </li>
          </ul>
         

          <ul>
              <li v-bind:key="i.id" v-for="i in items">
                  <h1 id="itemName">{{i.name}} </h1>
                  <img :src="i.imageURL">
                  <p id='price'>
                  $ {{i.price}}
                  </p>
              <quantity-counter v-bind:item="i" v-on:counter="onCounter"></quantity-counter>
              </li>
          </ul>
        </div>
        <div id='shoppingBasket'>
          <basket v-bind:itemsSelected='itemsSelected'></basket>
        </div>

    </div>
</template>


<script>
import Basket from './Basket.vue'
import QuantityCounter from './QuantityCounter.vue'
import database from "../firebase.js"


export default {
  components: { QuantityCounter, Basket },
    name:'PageContent',
    data: function(){
      return{
        itemsSelected:[],
        items:[]
      }
    },
    created: function(){
      this.fetchItems()
    },
    methods: {
      onCounter: function(item, count){
        console.log(item)
        if( this.itemsSelected.length === 0 && count > 0){
          this.itemsSelected.push([item,count, item.price]);
        }else{
          var contain = false
          for(let i = 0; i< this.itemsSelected.length; i++){
            const curr_item = this.itemsSelected[i];
            const item_name = curr_item[0];
            if(item.name === item_name.name){
              console.log(item.name);
              contain = true
              if(count > 0){
                this.$set(this.itemsSelected,i,[item,count,item.price])
                console.log(this.itemsSelected)
              } else{
                this.itemsSelected.splice(i,1)
              }
            }
          }
          if(!contain){
              this.itemsSelected.push([item,count, item.price]);
          }
        }
        console.log(this.itemsSelected)
      },
      fetchItems: function(){
        database.collection('menu').get().then(snapshot => {
          snapshot.docs.forEach(doc =>{
            this.items.push(doc.data())
          })
        })
      }
    }    
}
</script>


<style scoped>

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>