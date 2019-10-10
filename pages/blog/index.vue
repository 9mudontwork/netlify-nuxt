<template>
  <div>
    <p v-for="post in blogPosts" :key="post.title" class="post-link">
      {{ post.title }}
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
