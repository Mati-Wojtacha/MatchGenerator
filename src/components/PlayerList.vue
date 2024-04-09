<template>
  <div>
    <h5>Lista graczy:</h5>
    <button class="btn btn-secondary" @click="toggleList">Pokaż/ukryj listę</button>
    <div style="margin: 10px;">
    <ul v-if="showList" >
      <p v-for="(player, index) in playerNames" :key="index">
        {{ player }}      
        <button type="button" class="btn btn-secondary" @click="$emit('edit-player', index)">Edytuj</button>
        <button type="button" class="btn btn-danger" @click="$emit('delete-player', index)">Usuń</button>
      </p>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playerNames"],
  data() {
    return {
      showList: true
    };
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
  }
};
</script>
