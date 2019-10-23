<template>
  <div id="app">
    <header-navigation></header-navigation>
    <router-view/>
  </div>
</template>

<script>
import headerNavigation from './components/Navigation/header'
export default {
  components: {
    headerNavigation: headerNavigation
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.alert {
  padding: 8px 20px;
}
</style>
