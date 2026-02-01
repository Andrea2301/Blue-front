<template>
  <div class="netflix-container">
    <nav class="nav-bar">
      <img src="../../public/logo.png" alt="Netflix" class="logo" />
      <div class="nav-links">
        <a href="#">Home</a>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>

    <header class="hero-banner">
      <div class="hero-content">
        <h1 class="hero-title">The Witcher</h1>
        <p class="hero-description">
          Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.
        </p>
        <div class="hero-actions">
          <Button label="Play" icon="pi pi-play" class="p-button-raised p-button-secondary play-btn" />
          <Button label="More Info" icon="pi pi-info-circle" class="p-button-outlined info-btn" />
        </div>
      </div>
    </header>

    <section class="movie-row">
      <h2 class="row-header">Trending Now</h2>
      <div class="row-posters">
        <!-- <img 
          v-for="n in 1" 
          :key="n" 
          src="../assets/img/cover1.jpg" 
          alt="Movie Poster" 
          class="poster-placeholder" 
        />
         <img 
          v-for="n in 1" 
          :key="n" 
          src="../assets/img/cover2.jpg" 
          alt="Movie Poster" 
          class="poster-placeholder" 
        />
         <img 
          v-for="n in 1" 
          :key="n" 
          src="../assets/img/cover3.jpg" 
          alt="Movie Poster" 
          class="poster-placeholder" 
        /> -->
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>

<style scoped>
.netflix-container {
  background-color: #141414;
  color: #fff;
  min-height: 100vh;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 20px 4%;
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
  z-index: 100;
}

.logo {
  height: 25px;
  margin-right: 25px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  margin-left: 20px;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.hero-banner {
  height: 80vh;
  background: linear-gradient(to right, rgba(0,0,0,0.8), transparent), 
              url('https://occ-0-116-114.1.nflxso.net/dnm/api/v6/6AYY37jWKu2o9jwDoWlY8mW5UXQ/AAAABU7D_2n3LHS67pJpmNa4HSZFZ1LIRreZSkDOm5Tv6SryH5l6SJzL5S6V4V0CUEUv6fG_u5_Y3fL6qL6qL6qL6qL6qL6q.jpg?r=92a');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 4%;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero-actions .play-btn {
  background-color: white;
  color: black;
  border: none;
  margin-right: 12px;
  font-weight: bold;
}

.hero-actions .info-btn {
  color: white;
  background-color: rgba(109, 109, 110, 0.7);
  border: none;
  font-weight: bold;
}

.movie-row {
  padding: 20px 4%;
}

.row-header {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.row-posters {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.poster-placeholder {
  min-width: 170px;
  height: 210px;
  background-color: #333;
  border-radius: 5px;
  transition: transform 0.3s;
  cursor: pointer;
}

.poster-placeholder:hover {
  transform: scale(1.08);
}

.row-posters::-webkit-scrollbar {
  display: none;
}
</style>
