<template>
  <div>
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        // Save JWT token in local storage
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or any other route
        // this.$router.push('/dashboard');
        console.log('hi');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    }
  }
};
</script>
