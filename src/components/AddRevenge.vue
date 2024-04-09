<template>
  <button class="btn btn-info" @click="addRevenge" :disabled="isRevenge">
    <i class="fas fa-sync-alt"></i><br>Dodaj<br> rewanże
  </button>
</template>

<script>
export default {
  props: ["data", "isRevenge"],

  methods: {
    addRevenge() {
      let reversedData = this.data.map(item => ({
        ...item,
        firstHalf: item.secondHalf,
        secondHalf: item.firstHalf,
        id: item.id + this.data.length,
        firstPoints: null,
        secondPoints: null,
        isRevenge: true
      }));
      console.log("Reversed Data", reversedData);
      this.data.concat(true);
      this.$emit('updateData', this.data.concat(reversedData), true);
    },
  }
};
</script>