<template>
    <div class='home'>
      <h1>Welcome {{username.data.username}} to Vue.js App</h1>
        <a class="nav-link" href @click.prevent="logout">LogOut
        </a>
    </div>
</template>


<script>
import axios from 'axios';
import router from '../router';

const API_URL = 'http://localhost:3000/';
export default {
  name: 'Logout',
  methods: {
    logout: (e) => {
      e.preventDefault();
      const logout = () => {
        axios.get(`${API_URL}${'logout'}`)
          .then((response) => {
            console.log('Logged out', response);
            localStorage.removeItem('user');
            router.push('/logout');
          })
          .catch((errors) => {
            console.log('Cannot log out', errors);
            localStorage.removeItem('user');
          });
      };
      logout();
    },
  },
  data() {
    console.log(localStorage.getItem('user'));
    return {
      username: JSON.parse(localStorage.getItem('user')),
    };
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
