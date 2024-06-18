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
            <v-row>
              <v-col cols="3">
                <img
                  :src="movie.movie.poster.url"
                  alt="Movie Poster"
                  style="max-width: 90%;"
                >
              </v-col>
              <v-col cols="5">
                <div class="movie-favorites">
                  <h2>
                    {{ movie.movie.name }}
                  </h2>
                  <p>
                    {{ movie.movie.shortDescription }}
                  </p>
                  <div class="rating">
                    <span class="rating-value">
                      <v-icon icon="mdi-account-star-outline" />
                      {{ movie.movie.rating.kp }}
                      KP
                    </span>
                    <span class="rating-value">
                      <v-icon icon="mdi-account-star" />
                      {{ movie.movie.rating.imdb }}
                      IMDb
                    </span>
                  </div>
                  <v-row>
                    <v-col>
                      Моя оценка
                      <v-rating
                        v-model="movie.rating"
                        half-increments
                        readonly
                        hover
                        length="10"
                        size="small"
                        class="my-rate"
                      />
                      <div class="d-flex justify-center">
                        <pre class="text-center">{{ movie.rating }}</pre>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
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
