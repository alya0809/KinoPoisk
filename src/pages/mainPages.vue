<template>
  <v-container class="content">
    <div class="block">
      <h1>
        ПоисКин
      </h1>
      <img src="/futsmall.png">
    </div>
    <div>
      <v-toolbar
        dense
        floating
      >
        <v-text-field
          v-model="searchQuery"
          prepend-icon="mdi-magnify"
          hide-details
          single-line
          @input="searchMovie(searchQuery)"
        />
      </v-toolbar>
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
    <v-row>
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="2"
      >
        <v-card
          style="max-width: 110%"
          @click="goToMoviePage(movie)"
        >
          <img
            :src="movie.poster.url"
            alt="Movie Poster"
            style="max-width: 100%"
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moviesData from "@/data/kinopoisk-1.json";
import searchMovie from "@/services/searchMovie.js";
import sortMovies from "@/services/sortMovies.js";
import toggleSortDirection from "@/services/toggleSortDirection.js";

export default {
  data() {
    return {
      movies: [],
      searchQuery: "",
      sortBy: "",
      sortDirection: "asc",
    };
  },
  mounted() {
    this.movies = moviesData.docs;
  },
  methods: {
    goToMoviePage(movie) {
      this.$goToMoviePage(movie);
    },
    searchMovie(query) {
      this.movies = searchMovie(query, moviesData);
    },

    sortMovies() {
      this.movies = sortMovies(this.movies, this.sortBy, this.sortDirection);
    },
    toggleSortDirection() {
      this.sortDirection = toggleSortDirection(this.sortDirection);
      this.sortMovies();
    },
  },
};
</script>
