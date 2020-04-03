<template>
    <div class='home'>
        <h2>Login</h2>
        <form v-on:submit='login'>
            <input type='text' name='username'/><br>
            <input type='password' name='password'/><br>
            <input type='submit' value='Login'/>
            <div v-if='error' class='alert alert-dismissible alert-warning'>
              <button type='button' class='close' data-dismiss='alert'>&times;</button>
              <h4 class='alert-heading'>Error!</h4>
              <p class='mb-0'>{{error}}</p>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
import router from '../router';

const API_URL = 'http://localhost:3000/';
export default {
  name: 'Login',
  data() {
    return {
      error: '',
    };
  },
  methods: {
    login: (e) => {
      e.preventDefault();
      const username = e.target.elements.username.value;
      const password = e.target.elements.password.value;
      const login = () => {
        const data = {
          username,
          password,
        };
        axios.post(`${API_URL}${'login'}`, data)
          .then((response) => {
            console.log('Logged in', response);
            if (response.username) {
              localStorage.setItem('user', JSON.stringify(response));
              router.push('/home');
            } else {
              console.log('Wrong credentials');
            }
          })
          .catch(() => {
            console.log('Wrong credentials');
          });
      };
      login();
    },
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
