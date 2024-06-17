<template>
  <div class="background">
    <h2 class="head-text">
      Избранные фильмы
    </h2>
    <v-container class="sort">
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
        <v-btn
          :prepend-icon="sortDirection === 'asc' ?
            'mdi-arrow-up-circle-outline' : 'mdi-arrow-down-circle-outline'"
          variant="plain"
          @click="toggleSortDirection"
        >
          {{ sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию' }}
        </v-btn>
      </label>
    </v-container>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col
          v-for="movie in favoriteMovies"
          :key="movie.id"
          cols="5"
          class="mb-2"
        >
          <v-card
            class="movie-card background"
            @click="goToMoviePage(movie)"
          >
            <v-row>
              <v-col cols="6">
                <img
                  :src="movie.poster.url"
                  alt="Movie Poster"
                  style="max-width: 100%"
                >
              </v-col>
              <v-col cols="6">
                <div class="movie-favorites">
                  <p>
                    {{ movie.name }}
                  </p>
                  <v-row align="end">
                    <v-col cols="12">
                      <v-icon @click="removeFromFavorites(movie)">
                        mdi-trash-can-outline
                      </v-icon>
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
import sortMovies from "@/services/sortMovies.js";
import toggleSortDirection from "@/services/toggleSortDirection.js";

export default {
  data() {
    return {
      favoriteMovies: [],
      sortDirection: "asc",
    };
  },
  mounted() {
    this.loadFavoriteMovies();
  },
  methods: {
    goToMoviePage(movie) {
      this.$goToMoviePage(movie);
    },

    loadFavoriteMovies() {
      this.favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];
    },
    removeFromFavorites(movie) {
      const index = this.favoriteMovies.findIndex(
        (favMovie) => favMovie.id === movie.id
      );
      if (index !== -1) {
        this.favoriteMovies.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(this.favoriteMovies));
      }
    },
    sortMovies() {
      this.favoriteMovies = sortMovies(
        this.favoriteMovies,
        this.sortBy,
        this.sortDirection
      );
    },
    toggleSortDirection() {
      this.sortDirection = toggleSortDirection(this.sortDirection);
      this.sortMovies();
    },
  },
};
</script>
