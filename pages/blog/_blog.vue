<template>
  <article>
    <h1>{{ blogPost.title }}</h1>
    <div>{{ blogPost.body }}</div>
  </article>
</template>
<script>
export default {
  created() {
    console.log(this.$store.state.blogPosts)
  },
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  }
}
</script>
