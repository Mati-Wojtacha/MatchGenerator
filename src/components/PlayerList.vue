<template>
  <div>
    <h5>{{ $t('generator.title_playerList') }}</h5>
    <button class="btn btn-secondary" @click="toggleList">{{ $t('generator.btn_playerList') }}</button>
    <div  v-if="showList" style="margin-top: 10px;">
      <p v-for="(player, index) in playerNames" :key="index">
        {{ player }}      
        <button type="button" class="btn btn-secondary" @click="$emit('edit-player', index)"><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger" @click="$emit('delete-player', index)"><i class="fas fa-trash"></i></button>
      </p>
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
