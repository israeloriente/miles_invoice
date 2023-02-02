<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      data: 4,
      msg: 'Hello World'
    }
  },
  components: {},
  methods: {

  },
  onMounted() {
    console.log('mounted')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
