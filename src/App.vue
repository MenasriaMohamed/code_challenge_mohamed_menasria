<template>
  <div id="app">
    <!--navbar -->
      <Navbar/>   
    <!--navbar -->
    <router-view/>
  </div>
</template>
<script>
import Navbar from './layouts/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
<style>

</style>
