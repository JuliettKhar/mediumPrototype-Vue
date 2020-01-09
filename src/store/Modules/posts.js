/* eslint-disable */
import Vue from 'vue';
import axios from "axios";
import router from '../../router';

const posts = {
  namespaced: true,
  state: {
    posts: [],
    claps: 0,
    changingPost: {},
    total: 0
  },
  getters: {
    getAllPosts (state) {
      return state.posts;
    },
    getClaps (state) {
      return state.claps;
    },
    getChangingPost (state) {
      return state.changingPost;
    },
    getTotal (state) {
      return state.total;
    }

  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload;
    },
    changingPost (state, payload) {
      state.changingPost = payload;
    },
    setTotal (state, payload) {
      state.total = payload;
    },
    setClaps (state, payload) {
      state.claps = payload;
    }
  },
  actions: {
    getPosts ({commit}, payload) {
      axios.get(`http://localhost:3000/posts?_page=${payload}`)
        .then( response => {
          const { data } = response;
          commit('setPosts', data);
        })
    },
    addOnePost({ commit }, payload) {
      axios.post("http://localhost:3000/posts", payload)
        .then ( () => {
          router.push('/');
        });
    },
    deletePost ({ commit }, payload) {
      axios.delete(`http://localhost:3000/posts/${ payload }`);
    },
    changePost ({ commit }, payload) {
      axios.patch(`http://localhost:3000/posts/${ payload.id }`, {
        "title": payload.title,
        "description": payload.description,
        "updatedAt": payload.updatedDate
      })
      .then ( () => {
        router.push('/');
      });
    },
    getTotalPages ({ commit }) {
      axios.get('http://localhost:3000/posts')
        .then( response => {
          const { data } = response;
          const total = data.length;
          commit('setTotal', total);
        })
    },
    addClaps ({ commit }, payload) {
      console.log()
      axios.patch(`http://localhost:3000/posts/${ payload.id }`, {
        "claps": payload.claps
      })
    }
  }
}

export default posts;