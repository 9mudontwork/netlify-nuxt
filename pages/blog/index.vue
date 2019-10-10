<template>
  <div>
    <p v-for="post in blogPosts" :key="post.slug">
      <nuxt-link :to="post.slug">{{ post.title }}</nuxt-link>
    </p>
  </div>
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
