<!-- <template>
    <v-container class="content">
        <div class="block">
        <h1>ПоисКин</h1>
        <img src="@/components/img/futsmall.png">
        </div>
        <v-toolbar
        dense
        floating>
        <v-text-field
            prepend-icon="mdi-magnify"
            hide-details
            single-line
        ></v-text-field>
        </v-toolbar>
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
            movies: []
        };
    },
    mounted() {
        this.movies = moviesData.docs;
    },
    methods: {
        goToMoviePage(movie) {
            this.$router.push({ name: 'movie', params: { id: movie.id } });
        }
    }

};
</script> -->
<template>
    <v-container class="content">
      <div class="block">
        <h1>ПоискКин</h1>
        <img src="@/components/img/futsmall.png">
      </div>
      <v-toolbar dense floating>
        <v-text-field prepend-icon="mdi-magnify" hide-details single-line></v-text-field>
      </v-toolbar>
      <v-row>
        <v-col v-for="movie in movies" :key="movie.id" cols="12" sm="6" md="4">
          <moviePages :movie="movie" @click="goToMoviePage(movie.id)" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import moviePages from '@/pages/moviePages.vue'; // импортируем дочерний компонент
  import moviesData from '@/data/kinopoisk-1.json';
  
  export default {
    data() {
      return {
        movies: []
      };
    },
    mounted() {
      this.movies = moviesData.docs;
    },
    methods: {
      goToMoviePage(id) {
        this.$router.push({ name: 'movie', params: { id } });
      }
    },
    components: {
      moviePages // регистрируем дочерний компонент
    }
  };
  </script>
  