<template>
  <div id="app">
    <h1 id='header'>Jcheez's Zi Char</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// import PageContent from './components/PageContent.vue';


export default {
  name: 'App'
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header{
  background-color: rgb(121, 177, 250) ;
  font-size: 200%;
  margin:0;
  padding: 0;
  color:white;
}
</style>
