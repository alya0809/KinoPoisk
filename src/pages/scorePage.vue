<template>
  <div class="background">
    <h2 class="head-text">
      Оцененные фильмы
    </h2>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col
          v-for="movie in ratedMovies"
          :key="movie.movie.id"
          cols="10"
          class="mb-2"
        >
          <v-card
            class="movie-card"
            @click="goToMoviePage(movie.movie)"
          >
            <img
              :src="movie.movie.poster.url"
              alt="Movie Poster"
              style="max-width: 20%;"
            >
            <v-rating
              v-model="movie.rating"
              class="text-center"
              half-increments
              readonly
              hover
              length="10"
              size="small"
            />
            <div class="d-flex justify-center">
              <pre class="text-center">{{ movie.rating }}</pre>
            </div>
            <div class="movie-details">
              <p>
                {{ movie.movie.name }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ratedMovies: [],
        sortBy: '',
        sortDirection: 'asc',
      };
    },
    mounted() {
      this.loadRatedMovies();
    },

    methods: {
      goToMoviePage(movie) {
        this.$goToMoviePage(movie);
      },
      loadRatedMovies() {
        const scoredRatings = JSON.parse(localStorage.getItem("movieRatings")) || [];
        this.ratedMovies = scoredRatings.map(item => ({ movie: item.movie, rating: item.rating }));
        console.log('Загруженные оцененные фильмы:', this.ratedMovies);
      },
      loadSavedRating() {
        const movieId = this.movie.id;
        const movieRatings = JSON.parse(localStorage.getItem('movieRatings')) || {};
        const ratingList = movieRatings['movieRating'] || [];

        const savedRating = ratingList.find(rating => rating.movieId === movieId);

        if (savedRating) {
          this.movieRating = savedRating.rating;
        }
      }
    }
  }
</script>
