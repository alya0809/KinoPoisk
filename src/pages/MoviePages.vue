<template>
  <div
    class="background"
    style="height: 100%;"
  >
    <v-container>
      <div class="movie-details">
        <img
          v-if="movie"
          :src="movie.poster.url"
          alt="Movie Poster"
        >
        <div>
          <h1
            v-if="movie"
            v-text="movie.name"
          />
          <p
            v-if="movie"
            v-text="movie.shortDescription"
          />
          <v-rating
            v-model="movieRating"
            class="text-center my-rate"
            half-increments
            hover
            length="10"
            color="yellow"
            size="small"
            @click="saveRating"
          />
          <p class="score-movie">
            {{ movieRating }}
          </p>
          <v-btn
            color="#0a203b"
            :icon="
              isFavorite ? 'mdi-bookmark-off-outline' : 'mdi-bookmark-outline'
            "
            @click="
              isFavorite ? deleteFromFavorites(movie) : addToFavorites(movie)
            "
          />
        </div>
      </div>
      <p v-if="!movie">
        Фильм не найден
      </p>
    </v-container>
    <v-container>
      <v-expansion-panels
        v-model="panel"
        multiple
      >
        <v-expansion-panel class="background">
          <v-expansion-panel-title>
            Больше информации о фильме
          </v-expansion-panel-title>
          <v-expansion-panel-text class="background">
            <h2>
              Оригинальное название:
              <span>
                {{ alternativeName }}
              </span>
            </h2>
            <h2>
              Описание
            </h2>
            <p
              v-if="movie"
              v-text="movie.description"
            />
            <div class="rating">
              <span class="rating-value">
                <v-icon icon="mdi-account-star-outline" />
                {{ ratingKp }}
                KP
              </span>
              <span class="rating-value">
                <v-icon icon="mdi-account-star" />
                {{ ratingImdb }}
                IMDb
              </span>
            </div>
            <div class="margin-up">
              <v-icon icon="mdi-clock-outline" />
              {{ movieLength }} мин.
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel class="background">
          <v-expansion-panel-title>
            Где посмотреть
          </v-expansion-panel-title>
          <v-expansion-panel-text
            v-if="watchabilities"
            class="background"
          >
            <div
              v-for="item in watchabilities"
              :key="item._id"
            >
              <a
                :href="item.url"
                target="_blank"
                class="router d-flex align-center justify-content-center text-center"
              >
                <img
                  :src="item.logo.url"
                  alt="logo"
                  class="rote"
                >
                <span>
                  {{ item.name }}
                </span>
              </a>
            </div>
          </v-expansion-panel-text>
          <v-expansion-panel-text v-else>
            Нет информации о платформах для просмотра фильма
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import moviesData from "@/data/kinopoisk-1.json";

export default {
  data() {
    return {
      movie: null,
      panel: [0],
      ratingKp: null,
      ratingImdb: null,
      watchabilities: null,
      movieLength: null,
      alternativeName: null,
      isFavorite: false,
      movieRating: 0,
      isRating: false,
    };
  },
  mounted() {
    const movieID = this.$route.params.id;
    this.movie = moviesData.docs.find(
      (movie) => movie.id.toString() === movieID
    );
    this.ratingKp = this.movie.rating.kp;
    this.ratingImdb = this.movie.rating.imdb;
    this.watchabilities = this.movie.watchability.items;
    this.movieLength = this.movie.movieLength;
    this.alternativeName = this.movie.alternativeName;
    this.checkIsFavorite();
    this.loadSavedRating();
  },
  methods: {
    addToFavorites(movie) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.find((item) => item.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        this.isFavorite = true;
      } else {
        alert("Этот фильм уже добавлен в избранное");
      }
    },
    deleteFromFavorites(movie) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites = favorites.filter(
        (item) => item.id.toString() !== movie.id.toString()
      );
      localStorage.setItem("favorites", JSON.stringify(favorites));
      this.isFavorite = false;
    },
    checkIsFavorite() {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      this.isFavorite = favorites.some(
        (item) => item.id.toString() === this.movie.id.toString()
      );
    },
    saveRating() {
      let movieRatings = JSON.parse(localStorage.getItem('movieRatings')) || [];

      const ratingList = movieRatings || [];
      const existingRatingIndex = ratingList.findIndex(rating => rating.movieId === this.movie.id);
      if (existingRatingIndex !== -1) {
          ratingList[existingRatingIndex] = {
            movieId: this.movie.id,
            movie: this.movie,
            rating: this.movieRating
          };
        } else {
          ratingList.push({
            movieId: this.movie.id,
            movie: this.movie,
            rating: this.movieRating
          });
        }
      movieRatings = ratingList;
      localStorage.setItem('movieRatings', JSON.stringify(movieRatings));
    },
    loadSavedRating() {
      const movieId = this.movie.id;
      const movieRatings = JSON.parse(localStorage.getItem('movieRatings')) || [];
      const ratingList = movieRatings || [];

      const savedRating = ratingList.find(rating => rating.movieId === movieId);

      if (savedRating) {
        this.movieRating = savedRating.rating;
      }
    }
  }
};
</script>
