<template>
  <div id="app">
    <header>
      <!-- Navigation bar -->
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <!-- Footer content -->
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
</style>
