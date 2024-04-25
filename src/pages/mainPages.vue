<template>
    <v-container class="content">
        <div class="block">
        <h1>ПоисКин</h1>
        <img src="@/components/img/futsmall.png">
        </div>
        <div>
          <v-toolbar dense floating>
            <v-text-field 
              v-model="searchQuery"
              @input="searchMovie(searchQuery)"
              prepend-icon="mdi-magnify" 
              hide-details 
              single-line
            ></v-text-field> 
          </v-toolbar>
          <label>
            Сортировать по:
            <select v-model="sortBy" @change="sortMovies">
              <option value="year">Год</option>
              <option value="duration">Хронометраж</option>
              <option value="rating">Рейтинг</option>
            </select>
            <button @click="toggleSortDirection">
              {{ sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию' }}
            </button>
          </label>
        </div>
    </v-container>
    <v-container>
        <v-row>
            <v-col v-for="movie in movies" :key="movie.id" cols="2">
                <v-card @click="goToMoviePage(movie)" style="max-width: 110%;">
                    <img :src="movie.poster.url" alt="Movie Poster" style="max-width: 100%;">
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import moviesData from '@/data/kinopoisk-1.json';

export default {
  data() {
    return {
      movies: [],
      searchQuery: '',
      sortBy: '',
      sortDirection: 'asc'
    };
  },
  mounted() {
    this.movies = moviesData.docs;
  },
  methods: {
    goToMoviePage(movie) {
      this.$router.push({ name: 'movie', params: { id: movie.id } });
    },

    searchMovie(query) {
      const searchTerm = query.toLowerCase();
      this.movies = moviesData.docs.filter(movie => movie.name.toLowerCase().includes(searchTerm));
    },

    sortMovies() {
      this.movies.sort((a, b) => {
        let sortModifier = (this.sortDirection === 'asc') ? 1 : -1;

        if (this.sortBy === 'year') {
          return sortModifier * (a.year - b.year);
        } else if (this.sortBy === 'duration') {
          return sortModifier * (a.movieLength - b.movieLength);
        } else if (this.sortBy === 'rating') {
          return sortModifier * (b.rating.kp - a.rating.kp);
        }
        return 0;
      });
    },
    toggleSortDirection() {
      this.sortDirection = (this.sortDirection === 'asc') ? 'desc' : 'asc';
      this.sortMovies();
    }
  }
};
</script>