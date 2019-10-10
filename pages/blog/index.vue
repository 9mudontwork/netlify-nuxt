<template>
  <article>
    <h1>{{ blogPost.title }}</h1>
    <div>{{ blogPost.body }}</div>
  </article>
</template>

<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  }
}
</script>
