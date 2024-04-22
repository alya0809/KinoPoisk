<!-- <template>
    <div>
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.description }}</p>
      <img :src="movie.poster.url" alt="Movie Poster">
    </div>
</template>
  
<script>
  import moviesData from '@/data/kinopoisk-1.json';
  export default {
    data() {
        return {
            movie: {}
        };
    },
    mounted() {
        const movieID = this.$route.params.id;
        this.movie = moviesData.docs.find(movie => movie.id.toString() === movieID);
    }
}
</script>

<style lang="scss" scoped>

</style> -->
<template>
    <v-card @click="handleClick" style="max-width: 100%">
      <h2>{{ movie.title }}</h2>
      <img :src="movie.poster.url" alt="Movie Poster" style="max-width: 100%">
    </v-card>
</template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', this.movie.id);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  