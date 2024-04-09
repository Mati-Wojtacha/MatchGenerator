<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="navbar-btn" style="width: 20px;">
          <button class="toggle navbar-toggler" type="button" @click="toggleMenu"
                  aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span style="width: 1em; " class="navbar-toggler-icon"></span>
          </button>
        </div>
        <a class="mr-auto text-center mx-auto" href="#">
          <img :src="require('@/../public/logo.png')"  height="50" id="logo" alt="logo">
        </a>

        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navigate navbar-nav mr-auto text-center mx-auto">
            <li class="navigate-item nav-item">
              <RouterLink to="/" class="nav2" active-class="navi-activated">Generuj kombinacje
              </RouterLink>
            </li>
            <li class="navigate-item nav-item">
              <RouterLink to="/about" class="nav2" active-class="navi-activated">O aplikacji</RouterLink>
            </li>
          </ul>

        </div>
        <div style="position: absolute; right: 0; top: 15px;">
          <div class="theme-switch-wrapper">
            <label class="theme-switch" for="theme-switch">
              <input type="checkbox" id="theme-switch" v-model="isDark" @click="toggleTheme" />
              <div class="slider round">
                <span class="icon sun" v-if="isDark" >☀️</span>
                <span class="icon moon" v-if="!isDark">🌙</span>
              </div>
            </label>
          </div>

        </div>


      </div>
    </nav>
  </header>

  <RouterView/>
</template>

<script>

import {useDark} from "@vueuse/core";

export default {

  data() {
    return {
      dateFromToken: null,
      isDark: useDark(),
    }
  },

  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    toggleMenu() {
      const navbar = document.getElementById('navbarNavDropdown');
      const button = document.querySelector('.navbar-toggler');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      navbar.classList.toggle('show', !isExpanded);
    },
  }
}
</script>
<style>
.theme-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 40px;
}

.theme-switch input {
  display: none;
}

.slider {
  display: flex;
  align-items: center;
}


.slider.round {
  border: solid rgb(128, 128, 128);
  border-radius: 34px;
}

.sun, .moon {
  font-size: 18px;
}
.sun {
  margin-left: 4px;
}
.moon {
  margin-left: 26px;
}
</style>