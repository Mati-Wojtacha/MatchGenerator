<template>
  <div v-if="data && data.length" id="matchForm" style="overflow-x: auto;">
    <div v-for="(item, indexMatch) in data" :key="item.id">
      <div class="d-flex align-items-center" style="text-align: left;">
        <button v-if="item.isRevenge" class="btn btn-danger" @click="deleteMatch(item, indexMatch+1)"><i class="fas fa-trash"></i></button>&nbsp;
        <h5>{{ $t('matchesTable.title') }} {{indexMatch+1}}:</h5>
      </div>
      <table :id="`match-table`" style="margin-bottom: 20px;">
        <thead>
        <tr>
          <th>{{ $t('matchesTable.team1') }}</th>
          <th>{{ $t('matchesTable.team2') }}</th>
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
          <td colspan="2" class="border-top border-bottom border-white text-center fw-bold">
            <label>{{ $t('matchesTable.points') }}:&nbsp</label>
          </td>
        </tr>
        <tr>
          <td>
            <input :id="`team1-${item.id}`" type="number" min="0" v-model="item.firstPoints"
                   @input="handleInputChange($event)">
          </td>
          <td>
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
      isMatchEdit: false,
      iterateMatches: 0
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
    deleteMatch(objectToDelete, indexMatch) {
      const index = this.data.findIndex(item => item.id === objectToDelete.id);
      if (window.confirm(`${this.$t('warnings.delete_match')} ${indexMatch}`)) {
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
