<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label>Username:</label>
        <input type="text" v-model="username">
        <label>Password:</label>
        <input type="password" v-model="password">
        <button type="submit">Register</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Register',

    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      register() {
        this.$axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.data);
          // Handle successful registration
        })
        .catch(error => {
          console.error(error.response.data);
          this.error = error.response.data.error;
        });
      }
    }
  };
  </script>
  