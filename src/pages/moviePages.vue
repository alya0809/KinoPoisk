<template>
  <v-container>
    <div class="movie-details">
        <img v-if="movie" :src="movie.poster.url" alt="Movie Poster">
        <div>
            <h1 v-if="movie" v-text="movie.name"></h1>
            <p v-if="movie" v-text="movie.shortDescription"></p>
            <v-rating class="text-center"
              v-model="movieRating" 
              half-increments 
              hover 
              length="10" 
              size="small"
              @click="saveRating"
            ></v-rating> 
            <div class="d-flex justify-center">
              <pre class="text-center">{{ movieRating }}</pre> 
            </div>
            <v-btn density="default" @click="isFavorite ? deleteFromFavorites(movie) : 
            addToFavorites(movie)" :icon="isFavorite ? 'mdi-bookmark-off-outline' : 'mdi-bookmark-outline'"></v-btn>
            
        </div>
    </div>
    <p v-if="!movie">Фильм не найден</p>
</v-container>
  
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title>Больше информации о фильме</v-expansion-panel-title>
        <v-expansion-panel-text>
          <h2>Оригинальное название: <span>{{alternativeName}}</span></h2>
          <h2>Описание</h2>
          <p v-if="movie" v-html="movie.description"></p>
          <div class="ratingе">
            <v-icon icon='mdi-account-star-outline'></v-icon>
            <span>{{ ratingKp }} KP</span>
            <v-icon icon='mdi-account-star'></v-icon>
            <span>{{ ratingImdb }} IMDb</span>
          </div>
          <div>Хронометраж фильма: {{movieLength}} мин.</div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Где посмотреть</v-expansion-panel-title>
        <v-expansion-panel-text v-if="watchabilities">
          <div v-for="item in watchabilities" :key="item._id">
            <a :href="item.url" target="_blank">
              <img :src="item.logo.url" alt="logo" style="width: 50px; height: 50px;">
              <span>{{ item.name }}</span>
            </a>
          </div>
        </v-expansion-panel-text>
        <v-expansion-panel-text v-else>Нет информации о платформах для просмотра фильма</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

</template>

<script>
import moviesData from '@/data/kinopoisk-1.json';

export default {
  data() {
    return {
      movie: null,
      panel: [],
      ratingKp: null,
      ratingImdb: null,
      watchabilities: null,
      movieLength: null,
      alternativeName: null,
      isFavorite: false,
      movieRating: 0,
      isRating: false
    };
  },
  mounted() {
    const movieID = this.$route.params.id;
    this.movie = moviesData.docs.find(movie => movie.id.toString() === movieID);
    this.ratingKp = this.movie.rating.kp;
    this.ratingImdb = this.movie.rating.imdb;
    this.watchabilities = this.movie.watchability.items;
    this.movieLength = this.movie.movieLength;
    this.alternativeName = this.movie.alternativeName;
    this.checkIsFavorite();
    this.checkIsRating();
  },
  methods: {
    addToFavorites(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.find(item => item.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.isFavorite = true;
        
      } else {
        alert('Этот фильм уже добавлен в избранное');
      }
    },
    deleteFromFavorites(movie) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(item => item.id.toString() !== movie.id.toString());
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.isFavorite = false;
    },
    checkIsFavorite() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      this.isFavorite = favorites.some(item => item.id.toString() === this.movie.id.toString());
      
    },
    checkIsRating() {
      const savedRating = localStorage.getItem('ratedMovies');
      if (savedRating) {
        const ratedMovies = JSON.parse(savedRating);
        const ratedMovie = ratedMovies.find(item => item.id === this.movie.id);
        if (ratedMovie) {
          this.movieRating = ratedMovie.rating;
          this.isRating = true;
        }
      }
    },
    saveRating() {  
      console.log('Метод saveRating вызван!') 
      let ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || [];   
      if (!ratedMovies.find(item => item.id === this.movie.id)) {   
          ratedMovies.push({ id: this.movie.id, rating: this.rating });  // Сохраняем только id и рейтинг 
          localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies));   
          console.log(this.movie); 
          localStorage.setItem('movieRating', this.rating);  
          this.isRating = true;  
      }   
    }
  },
}

</script>

<style lang="scss" scoped>
</style>
