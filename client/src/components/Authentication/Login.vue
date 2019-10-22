<template>
    <div class="login-form">
      <form @submit.prevent="login">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" required="required" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" required="required" />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block" @click="login">Log in</button>
        </div>
      </form>
      <p class="text-center">
        <router-link to="/register">Create an Account </router-link>
      </p>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>

<style lang="scss" scoped>
.login-form {
    width: 340px;
    margin: 50px auto;
    form {
        margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
        h2 {
            margin: 0 0 15px;
        }
        .form-control, .btn {
            min-height: 38px;
            border-radius: 2px;
        }
        .btn {        
            font-size: 15px;
            font-weight: bold;
        }
    }
}
</style>