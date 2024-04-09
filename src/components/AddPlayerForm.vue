<template>
    <form @submit.prevent="addPlayer">
      <div class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start">
        <input class="form-control me-2 mb-2 mb-sm-0" type="text" id="playerName" maxlength="30" v-model="newPlayerName" style="min-width: 100px;" placeholder="Nazwa gracza">
        <button class="btn btn-primary" type="button" style="min-width: 135px;" @click="addPlayer">Dodaj gracza</button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newPlayerName: "",
      };
    },
    methods: {
      addPlayer() {
        this.$emit('add-player', this.newPlayerName);
        this.newPlayerName = "";
      }
    }
  };
  </script>
  