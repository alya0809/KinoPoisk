<template>
  <div class="sort">
    <label>
      Сортировать по:
      <select @sort-movies="updateLocalSortBy($event.target.value)">
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
        @togle-sort-direction="toggleSortDirection"
      >
        {{ sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию' }}
      </v-btn>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    sortDirection: {
      type: String,
      required: true
    }
  },
  emits: ['sort-movies', 'toggle-sort-direction'],
  data() {
    return {
      localSortBy: ''
    };
  },
  methods: {
    updateLocalSortBy(value) {
      this.localSortBy = value;
      this.sortMovies();
    },
    sortMovies() {
      this.$emit('sort-movies', this.localSortBy);
    },
    toggleSortDirection() {
      this.$emit('toggle-sort-direction');
    },
  },
};
</script>
