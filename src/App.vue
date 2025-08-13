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
          <img :src="require('@/../public/logo.webp')" height="50" id="logo" alt="logo">
        </a>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navigate navbar-nav mr-auto text-center mx-auto">
            <li class="navigate-item nav-item">
              <RouterLink to="/" class="nav2" active-class="navi-activated">{{ $t('nav.home') }}</RouterLink>
            </li>
            <li class="navigate-item nav-item">
              <RouterLink to="/2vs2" class="nav2" active-class="navi-activated">{{ $t('nav.2vs2') }}</RouterLink>
            </li>
            <li class="navigate-item nav-item">
              <RouterLink to="/about" class="nav2" active-class="navi-activated">{{ $t('nav.about') }}</RouterLink>
            </li>
            <li class="navigate-item nav-item">
              <div class="container-langSwitcher">
                <button class="language-button" @click="toggleLocaleMenu">
                  <i class="fas fa-language" style="height: 25px; margin-right: 5px;"></i>
                  <i class="fa-solid fa-angles-down"></i>
                </button>
                <div v-if="showLocaleMenu" class="buttons-container-langSwitcher">
                  <div v-for="locale in $i18n.availableLocales" :key="locale">
                    <button
                        class="btn btn-secondary lang-btn"
                        :class="{ active: isCurrent(locale) }"
                        @click="setLocaleLanguage(locale)"
                        style="width: 65px;"
                    >
                      <img
                          :src="require('@/../public/flags_icons/'+locale+'.svg')"
                          :alt="'flag_'+locale"
                          style="width: 20px;"
                      >
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="position: absolute; right: 0; top: 15px;">
          <div class="theme-switch-wrapper">
            <label class="theme-switch" for="theme-switch">
              <input type="checkbox" id="theme-switch" v-model="isDark" @click="toggleTheme"/>
              <span class="slider round">
                <span class="icon sun" v-if="isDark">☀️</span>
                <span class="icon moon" v-if="!isDark">🌙</span>
              </span>
            </label>
          </div>

        </div>
      </div>
    </nav>
  </header>

  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<script>

import {useDark} from "@vueuse/core";

export default {

  data() {
    return {
      dateFromToken: null,
      isDark: useDark(),
      showLocaleMenu: false,
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
    toggleLocaleMenu() {
      this.showLocaleMenu = !this.showLocaleMenu;
    },
    setLocaleLanguage(locale) {
      this.$i18n.locale = locale;
      this.showLocaleMenu = false;
      this.$nextTick(() => {
        const key = this.$route.meta?.titleKey || 'title.home';
        document.title = this.$t(key);
        document.documentElement.setAttribute('lang', locale);
      });
    },
    isCurrent(locale) {
      return this.$i18n.locale === locale;
    }
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

.language-button {
  background-color: transparent;
  color: black;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.language-button:hover, .language-button:focus {
  background-color: #0d6efd;
  color: white;
  outline: none;
}
.container-langSwitcher {
  z-index: 9;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
}
.buttons-container-langSwitcher {
  z-index: 9;
  position: absolute;
  max-height: 200px;
  overflow: auto;
  top: 100%;
}
.dark .buttons-container-langSwitcher .btn.lang-btn.active {
  background-color: rgba(255, 255, 255, 0.87);
}
.buttons-container-langSwitcher .btn.lang-btn.active {
  background-color: rgba(20, 20, 20, 0.98);
  transform: translateY(-1px);
}

</style>