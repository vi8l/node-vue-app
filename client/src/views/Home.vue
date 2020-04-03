<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Logout/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Logout from '@/components/LogoutComponent.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Logout,
  },
};
</script>
