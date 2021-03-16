<template>
    <div>
        <div  v-bind:key="key" v-for='(value,key) in datapacket.quantity'>
            <p class='left-align'>{{key}}:{{value}}</p>
            <input v-on:id="datapacket.new[key]" class='left-align' v-model="datapacket.new[key]"   placeholder =0 type="number" and min="0">
        </div>
            <button  class='left-align' v-on:click='submit'>Update Order</button>
    </div>
</template>

<script>

import database from '../firebase.js';

export default {
    name:"Modify",

    data: function(){
        return{
            datapacket:[],
            doc_id:''
        }
    },
    created(){
        // console.log(this.$route.params)
        this.fetchItems()
    },
    methods:{
        fetchItems: function(){
            this.doc_id = this.$route.params.id
            database.doc(`orders/${this.doc_id}`).get().then(x => {
             this.datapacket = x.data();
             this.datapacket['new'] = x.data().quantity
             for(var key in this.datapacket['new']){
                 this.datapacket['new'][key] = 0
             }
            }).then(()=>{
                console.log(this.datapacket)
            })
        },
        submit: function(){
            for(var key in this.datapacket['new']){
                 this.datapacket['new'][key] = parseInt(this.datapacket['new'][key])
                //  if(this.datapacket['new'][key] == 0){
                //     // this.$delete(this.datapacket['new'], key)
                //     delete this.datapacket['new'][key]
                //  }
             }
            database.doc(`orders/${this.doc_id}`).set({quantity:this.datapacket.new},{merge:true}).then(()=>{
                console.log("updated")
                this.$router.push({path:'/orders'})
            })
        }
    }
}
</script>

<style scoped>
.left-align{
    display:flex;
    justify-content: left;
}
button{
    margin-top:5%;
}
</style>