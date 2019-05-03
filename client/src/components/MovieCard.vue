<template>
  <div class="cards">
    <div class="card animated bounce-in" v-on:click="goToMovie(movie)">
      <img class="card-image" :src="movie.poster">
      <div class="card-divider">
        <div class="vote">
          <i class="fas fa-film"/>
        </div>
      </div>
      <div class="card-body">
        <h2 class="body-title">{{movie.title}}</h2>
        <div class="body-synopsis">
          <p>{{movie.synopsis}}</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-footer-left">
          <i class="fas fa-calendar"/>
          {{movie.year}}
        </div>
        <div style="display:flex">
          <p style>{{movie.metascore}} / 100</p>
        </div>
        <div class="card-footer-right">
          {{movie.rating}}
          <i class="fas fa-star"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MovieCard",
  props: {
    artist: String
  },
  data: function() {
    return {
      movie: {},
      errors: []
    };
  },
  methods: {
    async getRandomMovie() {
      await axios
        .get("https://denzel-api.herokuapp.com/movies")
        .then(resp => {
          this.movie = resp.data[0];
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    goToMovie(movie) {
      window.open(movie.link, "_blank");
    }
  },
  mounted() {
    this.getRandomMovie();
  }
};
</script>