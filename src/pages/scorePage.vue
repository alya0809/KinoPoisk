<template>
  <div>
    <h2>
      Оцененные фильмы
    </h2>
    <v-container>
      <div>
        <label>
          Сортировать по:
          <select
            v-model="sortBy"
            @change="sortMovies"
          >
            <option value="year">
              Год
            </option>
            <option value="duration">
              Хронометраж
            </option>
            <option value="rating">
              Рейтинг
            </option>
          </select>
          <button @click="toggleSortDirection">
            {{ sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию' }}
          </button>
        </label>
      </div>
    </v-container>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col
          v-for="movie in scoreMovies"
          :key="movie.id"
          cols="10"
          class="mb-2"
        >
          <v-card class="movie-card">
            <img
              :src="movie.poster.url"
              alt="Movie Poster"
              style="max-width: 20%;"
            >
            <div class="movie-details">
              <p>
                {{ movie.name }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

  <script>
    import sortMovies from '@/services/sortMovies.js';
    import toggleSortDirection from '@/services/toggleSortDirection.js'

    export default {
      data() {
        return {
          favoriteMovies: [],
          sortBy: '',
          sortDirection: 'asc'
        };
      },
      mounted() {
        this.loadScoreMovies();
      },

      methods: {
        goToMoviePage(movie) {
          this.$goToMoviePage(movie);
        },

        loadScoreMovies() {
          this.scoreMovies = JSON.parse(localStorage.getItem('ratedMovies')) || [];
        },
        // loadScores() {
        //   this.score = JSON.parse(localStorage.getItem('movieRating')) || [];
        // },
        sortMovies() {
          this.scoreMovies = sortMovies(this.scoreMovies, this.sortBy, this.sortDirection);
        },
        toggleSortDirection() {
          this.sortDirection = toggleSortDirection(this.sortDirection);
          this.sortMovies();
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
