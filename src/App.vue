<template>
  <div id="aws-workbench-app">
    <div class="container">
    <div class="row mt-5">
      <div class="col-sm-12 col-md-3">
        <nav class="nav flex-column">
          <router-link class="navbar-brand" to="/">
            Recent Conversations
          </router-link>
        </nav>
      </div>
      <div class="col-sm-12 col-md-9">
        <router-view/>
      </div>
    </div>
    <!-- End container -->
    </div>
    <!-- End App container -->
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: 'App'
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
