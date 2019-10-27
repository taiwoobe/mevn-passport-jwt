<template>
  <div>
    <p>This page is visible to logged in users (general & admin)</p>
    <ul class="test-list" v-for="post in posts" :key="post.id">
      <li class="test-list--item" @click="singlePost(post)">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.$http.get("https://jsonplaceholder.typicode.com/posts/").then(response => {
        this.posts = [...response.data].slice(0, 10);
    })
    .catch(err => {
    console.log(err);
    });
  },
  methods: {
    singlePost(post) {
        this.$router.push(`/dashboard/${post.id}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.test-list {
  font-family: Roboto;
  list-style: none;
  margin: 20px auto;
  width: 50%;
}

.test-list--item {
  border: 1px solid rgb(41, 41, 41);
  border-radius: 5px;
  text-align: center;
  display: block;
  box-shadow: 2px 2px rgba(138, 124, 124, 0.4);
  cursor: pointer;
}

.test-list--id {
  font-weight: 300;
  margin: 10px auto;
}

.test-list--title {
  font-weight: 500;
  margin: 20px auto;
  text-transform: capitalize;
}

.test-list--complete {
  font-weight: 600;
  margin: 10px auto;
  color: #56ca86;
}

.test-list--incomplete {
  font-weight: 600;
  margin: 10px auto;
  color: #ca5656;
}
</style>