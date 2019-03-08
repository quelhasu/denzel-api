<template>
  <div class="cards">
    <div class="card">
      <img class="card-image" src="https://placeimg.com/400/800/any">
      <div class="card-divider">
        <div class="vote">
          <i class="fas fa-film"/>
        </div>
      </div>
      <div class="card-body">
        <h2 class="body-title">Title</h2>
        <div class="body-inline">
          <p class="body-inline-title">Actors</p>
          <p class="body-inline-text">Name,</p>
        </div>
        <div class="body-inline">
          <p class="body-inline-title">Director</p>
          <p class="body-inline-text">Name</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-footer-left">
          <i class="fas fa-calendar"/>
          Year
        </div>
        <div style="display:flex">
          <p style>genre</p>
        </div>
        <div class="card-footer-right">
          Average
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
      movie: {}
    };
  },
  methods: {
    async getRandomMovie() {}
  }
};
</script>