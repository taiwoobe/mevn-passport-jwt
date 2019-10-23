<template>
  <div id="main">
    <div class="page-not-found">
      <h1>Page Not Found</h1>
      <button class="btn btn-primary" @click="backToHome">Back to Home</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  transition: all 0.6s;
}
#main {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .page-not-found {
    h1 {
      font-size: 50px;
      padding-right: 12px;
      animation: type 0.5s alternate infinite;
    }
  }
}
@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>