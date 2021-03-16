<template>
    <div class='container'>
        <div class="minus" v-on:click="decrement"><p>-</p></div>
        <div class='num'><h1>{{num}}</h1></div>
        <div class="plus" v-on:click="increment"><p>+</p></div>
    </div>
</template>

<script>
export default {
    name:'QuantityCounter',
    props:['item'],
    data: function () {
        return{
            num:0
        }
    },
    methods: {
        decrement: function() {
            if(this.num > 0 ){
                this.num--
                this.$emit('counter',this.item, this.num)
            }
        },
        increment: function(){
            if(this.num <= 10){
                this.num++
                this.$emit('counter',this.item, this.num)
            }
            if(this.num > 10){
                this.num = 10 
                alert('You cannot buy more than 10 items')
            }
        }
    } 
}
</script>


<style scoped>
.container{
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.minus, .plus, .num{
    margin:1%;
}
.minus, .plus {
    width: 20%;
    height: 80%;
    max-width: 100px;
    max-height: 100px;
    display: inline-block;
    background: orange;
    border-radius: 25%;
    border: 1px solid;
    vertical-align: center;
}

p{
    font-size: 500%;
    margin:auto;
    padding: auto;
    text-align: center;
}

.num{
    display:flex;
    justify-content: center;
}


/* .plus{
    width: 20%;
    display: inline-block;
    background: orange;
    border-radius: 25%;
    border: 1px solid;

} */


</style>