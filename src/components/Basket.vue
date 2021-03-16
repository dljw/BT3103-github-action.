<template>
    <div>
        <h1>Menu:</h1>
        <ul>
            <li v-bind:key='i[0].id' v-for='i in itemsSelected'>
               {{i[0].name}} x {{i[1]}}
            </li>
        </ul>
        <button  v-on:click='calculate(); sendOrder()'>Calculate total</button>
        <div class='total' v-show='calculated'>
            <br>
            Subtotal: ${{finalPrice.subtotal}} <br><br>
            Grand Total:${{finalPrice.grandtotal}}
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"


export default {
    name:'Basket',
    props:['itemsSelected'],
    data: function(){
        return{
            calculated:false,
            subtotal:0
        }
    },
    methods:{
        findTotal: function(){
            this.subtotal =0;
            for(let i = 0; i< this.itemsSelected.length; i++){
                this.subtotal += (this.itemsSelected[i][2] *this.itemsSelected[i][1])
            }
        },
        calculate: function(){
            this.calculated = true
        },
        sendOrder: function(){
            var orders = {"Prawn omelette":0,"Dry Beef Hor Fun":0,"Sambal Kangkung":0,"Pork Fried Rice":0,"Mapo Tofu":0,"Cereal Prawn":0}
            for(let i = 0; i< this.itemsSelected.length; i++) {
                orders[this.itemsSelected[i][0].name] = this.itemsSelected[i][1]
            }
            // console.log(orders)
            database.collection('orders').add({
                quantity:orders,
                subtotal: this.subtotal,
                total: parseInt((this.subtotal *1.07).toFixed(2))
            }).then(() => location.reload())
        }

    },
    computed:{
        finalPrice: function(){
            this.findTotal()
            return {subtotal: this.subtotal, grandtotal: (this.subtotal *1.07).toFixed(2)}
        }
    }
    
}
    
</script>


<style scoped>
li{
    text-align: left;
}
.total{
    text-align: left;
}

</style>