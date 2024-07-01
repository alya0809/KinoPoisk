export function goToMoviePage(movie) {
  this.$router.push({ name: 'movie', params: { id: movie.id } });
}
