<template>
  <div id="app">
    <header class="header">
      <template v-if="role === 'writer'">
        <b-button type="is-primary" class="header-post-btn" @click="addPost">
          <router-link to="/signin" class="signin">
            Добавить пост
          </router-link>
        </b-button>
      </template>

      <template v-if="!isAuthenticated">
        <b-button type="is-primary">
          <router-link to="/signin" class="signin">
            Войти
          </router-link>
        </b-button>
      </template>
      <template v-if="isAuthenticated">
        <b-button type="is-primary" @click="logout">
          Выйти
        </b-button>
      </template>
    </header>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    },
    role() {
      return this.$store.state.role;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    addPost() {
      this.$router.push("/addPost");
    }
  }
};
</script>

<style lang="scss">
@import './scss/main.scss';

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 20px 10px;

  &-post {
    &-btn {
      margin-right: 20px;
    }
  }
}

.signin {
  color: #fff;
}
</style>
