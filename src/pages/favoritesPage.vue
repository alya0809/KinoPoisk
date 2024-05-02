<template>
    <div>
      <h2>Избранные фильмы</h2>
      <v-container>
        <v-row class="justify-center align-center">
          <v-col v-for="movie in favoriteMovies" :key="movie.id" cols="10" class="mb-2">
            <v-card class="movie-card">
              <img :src="movie.poster.url" alt="Movie Poster" style="max-width: 20%;">
              <div class="movie-details">
                <p >{{ movie.name }}</p>
                <v-btn @click="removeFromFavorites(movie)">Удалить из избранного</v-btn>
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
          favoriteMovies: []
        };
      },
      mounted() {
        this.loadFavoriteMovies();
      },
      methods: {
        goToMoviePage(movie) {
          this.$router.push({ name: 'movie', params: { id: movie.id } });
        },
        loadFavoriteMovies() {
          this.favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
        },
        removeFromFavorites(movie) {
          const index = this.favoriteMovies.findIndex(favMovie => favMovie.id === movie.id);
          if (index !== -1) {
            this.favoriteMovies.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(this.favoriteMovies));
          }
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
  .movie-card {
    border: 1px solid #ccc;
    width: 100%; /* Занимает 95% ширины экрана */
    height: 10%; /* Высота рамки 20 пикселей */
    margin: 0 auto; /* Центрируем рамку по горизонтали */
  }
  
  .movie-details {
    margin-top: 10px;
  }
  </style>
  