<template>
  <div v-if="data && data.length" id="matchForm" style="overflow-x: auto;">
    <div v-for="item in data" :key="item.id">
      <div class="d-flex align-items-center" style="text-align: left;">
        <button v-if="item.isRevenge" class="btn btn-danger" @click="deleteMatch(item)"><i class="fas fa-trash"></i></button>&nbsp;
        <h5>Mecz {{ item.id }}:</h5>
      </div>
      <table :id="`match-table-${item.id}`" style="margin-bottom: 20px;">
        <thead>
        <tr>
          <th>1 drużyna</th>
          <th>2 drużyna</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(half, index) in item.firstHalf" :key="`match-${item.id}-half-${index}`">
          <td class="text-wrap">
            {{ half }}
          </td>
          <td class="text-wrap">{{ item.secondHalf[index] }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" style="    border-top: 2px solid white">
            <label :for="`team1-${item.id}`">Punkty drużyny 1:&nbsp</label>
            <input :id="`team1-${item.id}`" type="number" min="0" v-model="item.firstPoints"
                   @input="handleInputChange($event)">
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <label :for="`team2-${item.id}`" class="form-label">Punkty drużyny 2:&nbsp</label>
            <input :id="`team2-${item.id}`" type="number" min="0" v-model="item.secondPoints"
                   @input="handleInputChange($event)">
          </td>
        </tr>
        </tfoot>

      </table>

    </div>
  </div>
</template>

<script>
import {blockNegativeNumbersAndText} from '@/functions/BlockNumbersAndText';
import index from "vuex";

export default {
  computed: {
    index() {
      return index
    }
  },
  props: ["data"],
  data() {
    return {
      results: [],
      isMatchEdit: false
    };
  },
  provide() {
    return {
      isMatchEdit: this.isMatchEdit
    };
  },
  methods: {
    handleInputChange(event) {
      console.log(this.isMatchEdit);
      this.isMatchEdit = true;
      this.blockNegativeNumbersAndText(event);
    },
    deleteMatch(objectToDelete) {
      const index = this.data.findIndex(item => item.id === objectToDelete.id);
      if (window.confirm(`Czy na pewno chcesz usunąć mecz numer ${objectToDelete.id} `)) {
        console.log("Index", index)
        this.data.splice(index, 1);
        const isRevenge = this.data.some(item => item.isRevenge);
        this.$emit('changeIsRevenge', isRevenge);
      }
    },
    blockNegativeNumbersAndText,
  },
  watch: {
    'item.firstPoints'(newVal, oldVal) {
    },
    'item.secondPoints'(newVal, oldVal) {
    }
  },
};
</script>
