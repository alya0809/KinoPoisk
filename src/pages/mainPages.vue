<template>
  <div class="background">
    <v-container class="content">
      <v-container class="d-flex align-center justify-content-center text-center header">
        <h1 class="head-text">
          ПоисКин
        </h1>
        <img src="/futsmall.png">
      </v-container>
      <div>
        <v-container class="d-flex justify-center align-center">
          <v-toolbar
            class="background width"
            dense
            floating
          >
            <v-text-field
              v-model="searchQuery"
              class="background"
              prepend-icon="mdi-magnify"
              hide-details
              single-line
              @input="searchMovie(searchQuery)"
            />
          </v-toolbar>
        </v-container>
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
      </div>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="movie in paginatedMovies"
          :key="movie.id"
          cols="2"
        >
          <v-card
            class="main-card"
            @click="goToMoviePage(movie)"
          >
            <img
              :src="movie.poster.url"
              alt="Movie Poster"
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="!searchQuery"
      class="text-center"
    >
      <v-pagination
        v-model="currentPage"
        :length="5"
        rounded="circle"
      />
    </v-container>
  </div>
</template>

<script>
import moviesData from "@/data/kinopoisk-1.json";
import sortMovies from "@/services/sortMovies.js";
import toggleSortDirection from "@/services/toggleSortDirection.js";

export default {
  data() {
    return {
      movies: [],
      allMoviesData: [],
      searchQuery: "",
      sortBy: "",
      sortDirection: "asc",
      currentPage: 1,
      moviesPerPage: 24,
    };
  },
  computed: {
    paginatedMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      return this.movies.slice(startIndex, startIndex + this.moviesPerPage);
    },
  },
  mounted() {
    this.movies = moviesData.docs;
    this.allMoviesData = moviesData.docs;
  },
  methods: {
    goToMoviePage(movie) {
      this.$goToMoviePage(movie);
    },
    searchMovie(query) {
      const searchTerm = query.toLowerCase();
      this.movies = this.allMoviesData.filter(movie => movie.name.toLowerCase().includes(searchTerm));
      this.currentPage = 1;
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
