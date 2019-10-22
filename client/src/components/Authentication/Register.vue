<template>
   <div class="register-form">
      <form @submit.prevent="register">
        <h2 class="text-center"> Create New Account </h2>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Username" required="required" v-model="username" />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Password" required="required" v-model="password"/>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>
      </form>
      <p class="text-center">
        <router-link to="/login">Already have an Account? Login </router-link>
      </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            register() {
                let user = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('register', user).then(() => {
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.register-form {
    width: 400px;
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