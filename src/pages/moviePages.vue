<template>
  <div>
    <h1 v-if="movie" v-text="movie.name"></h1>
    <p v-if="movie" v-text="movie.shortDescription"></p>
    <img v-if="movie" :src="movie.poster.url" alt="Movie Poster">
    <p v-if="!movie">Фильм не найден</p>
  </div>
  <v-container>
    <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title>Больше информации о фильме</v-expansion-panel-title>
        <v-expansion-panel-text>
           <h2>Описание</h2>
           <p v-if="movie" v-text="movie.description"></p>
           <v-rating v-model="rating" length="10" readonly>
            <template #icon="{ isFilled, index }">
              <v-icon>{{ index < Math.ceil(movie.rating.kp) && index >= Math.floor(movie.rating.kp) ? 'mdi-star-half' : isFilled ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
            </template>
          </v-rating>
          
            <pre>{{ rating }}</pre>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  
</template>
  
<script>
import moviesData from '@/data/kinopoisk-1.json';

export default {
  data() {
    return {
      movie: null,
      panel: [0, 1],
      rating: null 
    };
  },
  mounted() {
    const movieID = this.$route.params.id;
    this.movie = moviesData.docs.find(movie => movie.id.toString() === movieID);
    this.rating = Math.floor(this.movie.rating.kp); 
    this.decimalRating = Math.round((this.movie.rating.kp - this.rating) * 10);

  }
}
</script>

<style lang="scss" scoped>
</style>
