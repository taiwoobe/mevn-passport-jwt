<template>
    <div>
        <h1> {{ post.title }}</h1>
        <p> {{ post.body }} </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                post: {}
            }
        },
        mounted() {
            this.$http.get(`https://jsonplaceholder.typicode.com/posts/${this.id}`).then(response => {
                this.post = response.data;
            });
        },
    }
</script>

<style lang="scss" scoped>

</style>