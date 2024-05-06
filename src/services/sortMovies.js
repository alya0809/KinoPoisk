const sortMovies = function(movies, sortBy, sortDirection) {
    return movies.sort((a, b) => {
      let sortModifier = (sortDirection === 'asc') ? 1 : -1;
  
      if (sortBy === 'year') {
        return sortModifier * (a.year - b.year);
      } else if (sortBy === 'duration') {
        return sortModifier * (a.movieLength - b.movieLength);
      } else if (sortBy === 'rating') {
        return sortModifier * (b.rating.kp - a.rating.kp);
      }
      return 0;
    });
};
export default sortMovies;