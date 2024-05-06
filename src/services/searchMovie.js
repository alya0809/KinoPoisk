const searchMovie = function(query, moviesData) {
    const searchTerm = query.toLowerCase();
    return moviesData.docs.filter(movie => movie.name.toLowerCase().includes(searchTerm));
  };
  export default searchMovie;