<template>
  <div class="home">
    <div class="card-wrapper">
      <div class="card" v-for="post in posts" :key="post.id">
        <div class="card-content">
          <h1 class="card-header-title">{{ post.title }}</h1>
          <p class="card-description">{{ post.description }}</p>

          <template v-if="role === 'reader'">
            <div class="card-button">
              <b-button type="is-primary" @click="addLike(post)">
                <font-awesome-icon :icon="['fa', 'hand-paper']" />
                <span class="button-counter"></span>
              </b-button>
              <span class="counter">{{ post.claps }}</span>
            </div>
          </template>

          <template v-if="role === 'writer'">
            <div class="card-buttons">
              <b-button
                class="button-right"
                type="is-primary"
                @click="deletePost(post)"
              >
                <font-awesome-icon :icon="['fa', 'trash']" />
                Удалить
              </b-button>
              <b-button type="is-primary" @click="changePost(post)">
                <font-awesome-icon :icon="['fa', 'pen']" />
                Изменить
              </b-button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="custom-pagination" v-if="isPaginated">
      <b-pagination
        :total="total"
        :page="pagination.page"
        :current.sync="pagination.current"
        :per-page="pagination.perPage"
        @change="paginated((page = $event))"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "home",
  data() {
    return {
      pagination: {
        total: this.total,
        current: 1,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 3,
        page: 1,
        // prevIcon: 'arrow-left',
        // nextIcon: 'arrow-right',
        isPagination: false
      }
    };
  },
  computed: {
    role() {
      return this.$store.state.role;
    },

    posts() {
      return this.$store.getters["posts/getAllPosts"];
    },
    total() {
      return this.$store.getters["posts/getTotal"];
    },
    isPaginated() {
      if (this.total > 10) {
        return true;
      }
    },
    claps() {
      return this.$store.getters["posts/getClaps"];
    }
  },
  mounted() {
    this.$store.dispatch("refreshRole");
    this.$store.dispatch("posts/getTotalPages");
    this.$store.dispatch("posts/getPosts", this.page);
  },
  methods: {
    deletePost(post) {
      this.$store.dispatch("posts/deletePost", post.id);
      this.$store.dispatch("posts/getPosts", post.id);
    },
    changePost(post) {
      this.$store.commit("posts/changingPost", post);
      this.$router.push("/changepost");
    },
    paginated(page) {
      this.$store.dispatch("posts/getPosts", page);
    },
    addLike(post) {
      let currentClap = parseInt(post.claps);
      const newClaps = (currentClap += 1);
      this.$store.dispatch("posts/addClaps", {
        id: post.id,
        claps: newClaps
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  margin: 15px;
  width: 45%;

  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  &-description {
    padding: 0 0 20px 13px;
    text-align: left;
    color: #7a7a7a;
  }

  &-buttons,
  &-button {
    text-align: right;
  }
}

.button {
  &-right {
    margin-right: 10px;
  }
}

.custom {
  &-pagination {
    margin-top: 30px;
  }
}

.counter {
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
