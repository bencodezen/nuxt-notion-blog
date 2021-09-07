<template>
  <main>
    <ul>
      <li v-for="blog in mostRecentBlogPosts" :key="blog.id">
        <button @click="getPageContent(blog.id)">
          {{ blog.properties.Name.title[0].plain_text }}
        </button>
        <p>{{ new Date(blog.properties['Publish On'].date.start) }}</p>
        <p>{{ blog }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data: () => ({
    blogPost: [],
  }),
  computed: {
    mostRecentBlogPosts() {
      return this.blogPost.slice().sort((a, b) => {
        const dateA = new Date(a.properties['Publish On'].date.start)
        const dateB = new Date(b.properties['Publish On'].date.start)

        return dateB - dateA
      })
    },
  },
  methods: {
    async getPageContent(id) {
      const postResponse = await fetch('/.netlify/functions/post', {
        method: 'POST',
        body: JSON.stringify({
          pageId: id,
        }),
      }).then((res) => res.json())

      console.log({ postResponse })
    },
  },
  async mounted() {
    const response = await fetch('/.netlify/functions/blog').then((res) =>
      res.json()
    )

    this.blogPost = response.results
  },
}
</script>
