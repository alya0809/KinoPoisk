<template>
  <div>
    <h2>
      Избранные фильмы
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
            {{ sortDirection === "asc" ? "По возрастанию" : "По убыванию" }}
          </button>
        </label>
      </div>
    </v-container>
    <v-container>
      <v-row class="justify-center align-center">
        <v-col
          v-for="movie in favoriteMovies"
          :key="movie.id"
          cols="10"
          class="mb-2"
        >
          <v-card class="movie-card">
            <img
              :src="movie.poster.url"
              alt="Movie Poster"
              style="max-width: 20%"
            >
            <div class="movie-details">
              <p>{{ movie.name }}</p>
              <v-btn @click="removeFromFavorites(movie)">
                Удалить из избранного
              </v-btn>
            </div>
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
      sortBy: "",
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

<style lang="scss" scoped>
.movie-card {
  border: 1px solid #ccc;
  width: 100%;
  height: 10%;
  margin: 0 auto;
}

.movie-details {
  margin-top: 10px;
}
</style>
