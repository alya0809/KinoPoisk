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
          class="text-center"
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
          cols="10"
        >
          <v-card
            class="movie-card"
            @click="goToMoviePage(movie)"
          >
            <v-row>
              <v-col cols="3">
                <img
                  :src="movie.poster.url"
                  alt="Movie Poster"
                >
              </v-col>
              <v-col cols="5">
                <div class="movie-favorites">
                  <h2>
                    {{ movie.name }}
                  </h2>
                  <p>
                    {{ movie.shortDescription }}
                  </p>
                  <div class="rating">
                    <span class="rating-value">
                      <v-icon icon="mdi-account-star-outline" />
                      {{ movie.rating.kp }}
                      KP
                    </span>
                    <span class="rating-value">
                      <v-icon icon="mdi-account-star" />
                      {{ movie.rating.imdb }}
                      IMDb
                    </span>
                  </div>
                  <v-row>
                    <v-col>
                      <v-btn
                        color="#0a203b"
                        icon="mdi-trash-can-outline"
                        style="margin-top: 3%;"
                        @click.stop="removeFromFavorites(movie)"
                      />
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
