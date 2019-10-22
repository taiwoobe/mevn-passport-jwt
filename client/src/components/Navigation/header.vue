<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/"> Home </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about"> About </router-link>
                    </li>
                </ul>
                <router-link v-if="!isLoggedIn" class="btn btn-primary" to="/login"> Login </router-link>
                <button v-else> Logout </button>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoggedIn: false
            }
        },
        created() {
            this.$store.getters.isLoggedIn;
        }
    }
</script>

<style lang="scss" scoped>

</style>