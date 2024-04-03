<template>
    <div>
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',

    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        this.$axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          // Handle successful registration
        })
        .catch(error => {
          console.error(error.response.data);
          // Handle registration failure
        });
      }
    }
  };
  </script>
  