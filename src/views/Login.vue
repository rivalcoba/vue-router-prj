<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="username">Username</label>
      <input v-model="username" name="username" type="text" class="input" />
      <label for="password">Password</label>
      <input v-model="password" name="password" type="password" class="input" />
      <button @click="login" class="btn">Login</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      // Authenticate agains API
      store.user = this.username;
      // Accediendo al parámetro del query "redirect"
      const redirectPath = this.$route.query.redirect || "/";
      // Se redirecciona la pagina
      this.$router.push(redirectPath);
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>
