<template>
  <v-container fluid>
    <!-- <v-row> -->
      <!-- <v-col cols="12"> -->
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field v-model="name" label="Name" required></v-text-field>
              <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-text-field v-model="verifyPassword" label="Verify Password" type="password" required></v-text-field>
              <v-select v-model="role" label="Role" :items="roles" required></v-select>
              <v-btn type="submit" color="primary">Register</v-btn>
            </v-form>
          </v-card-text>
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
        </v-card>
      <!-- </v-col> -->
    <!-- </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      name: '',
      email: '',
      role: '',
      password: '',
      verifyPassword: '',
      error: '',
      roles: ['Student', 'Pensyarah', 'Ketua Jabatan', 'PRO']
    };
  },
  methods: {
    register() {
      if (this.password !== this.verifyPassword) {
        this.error = "Passwords do not match";
        return;
      }

      this.$axios.post('http://localhost:3000/register', {
        name: this.name,
        email: this.email,
        role: this.role,
        password: this.password
      })
      .then(response => {
        console.log(response.data);
        this.name = '';
        this.email = '';
        this.role = '';
        this.password = '';
        this.verifyPassword = '';
        this.error = '';
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
