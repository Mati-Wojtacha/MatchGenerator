<template>
  <div v-if="data && data.length" id="matchForm" style="overflow-x: auto;">
    <div v-for="item in data" :key="item.id" >
      <h5>Mecz {{ item.id }}:</h5>

      <table :id="`match-table-${item.id}`">
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
          <label :for="`team2-${item.id}`" class="form-label">Punkty drużyny 2:&nbsp </label>
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

export default {
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
