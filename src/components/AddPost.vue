<template>
  <div class="form-wrapper">
    <form action="" class="form">
      <div :class="{ invalid: $v.postData.title.$error }">
        <b-field class="form-row">
          <b-input
            placeholder="Название поста"
            type="text"
            v-model="postData.title"
            @blur="$v.postData.title.$touch()"
          ></b-input>
        </b-field>
        <div v-if="$v.postData.title.$error">
          <p v-if="!$v.postData.title.required">
            Это поле обязательно!
          </p>
        </div>
      </div>
      <b-field>
        <b-input
          type="textarea"
          placeholder="Описание поста"
          v-model="postData.description"
          minLength="10"
        >
        </b-input>
      </b-field>
      <b-button type="is-primary" @click="addPost">Добавить</b-button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "addpost",
  data() {
    return {
      postData: {
        title: "",
        description: ""
      }
    };
  },
  validations: {
    postData: {
      title: {
        required
      }
    }
  },
  computed: {
    claps() {
      return this.$store.getters["posts/getClaps"];
    },
    userId() {
      return this.$store.getters["posts/getUserId"];
    }
  },
  methods: {
    addPost() {
      this.$store.dispatch("posts/addOnePost", {
        title: this.postData.title,
        description: this.postData.description,
        claps: this.claps.toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 40px 20px 20px;
  max-width: 50%;
  border: 1px solid lightgray;
}
</style>
