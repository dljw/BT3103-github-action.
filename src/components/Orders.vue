<template>
    <div>
        <ul>
            <li> 
               <router-link to="/" exact>Home</router-link>
            </li>
            <li>
              <router-link to="/orders">Orders</router-link>
            </li>
          </ul>
        <ul >
            <li v-bind:key="o[1]" v-for="o in orders">
                <p v-bind:key="key" v-for="(value,key) in o[0].quantity">
                {{key}}: {{value}}
                </p>
                <button v-bind:id = o[1] v-on:click="deleteItem($event)">Delete</button>
                <button v-bind:id = o[1] v-on:click="route($event)">Modify</button>
            </li>
        </ul>

    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    name:"Orders",
    data: function(){
        return{
            orders:[]
        }
    },
    created: function(){
        this.fetchItems()
    },
    methods:{
        fetchItems:function(){
            database.collection('orders').get().then(snapshot=>{
                snapshot.docs.forEach(doc =>{
                    this.orders.push([doc.data(),doc.id])
                })
            })
        },
        deleteItem: function(event) {
            var doc_id = event.target.getAttribute("id");
            database.doc(`orders/${doc_id}`).delete().then(()=>{ location.reload(); console.log("deleted")})

        },
        route: function(event){
            var doc_id = event.target.getAttribute("id");
            console.log(doc_id)
            this.$router.push({ path: `modify/${doc_id}`, params:{id: doc_id} })
        }
    }
    
}
</script>

<style scoped>
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>