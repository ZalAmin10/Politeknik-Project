<template>
  <div id="app">
    <v-row>
      <header>
        <!-- Navigation bar -->
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </header>
    </v-row>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      All right reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Global styles */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100vh;
  width: 100%;
}
</style>
