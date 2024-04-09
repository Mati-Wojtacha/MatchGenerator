<template>
    <form @submit.prevent="addPlayer">
        <div class="d-flex align-items-center">
          <input class="form-control" type="text" id="playerName" maxlength="30" v-model="newPlayerName" style="min-width: 100px;" placeholder="Nazwa gracza">
          <button class="btn btn-primary ml-2" type="button" style="min-width: 125px;" @click="addPlayer">Dodaj gracza</button>
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
  