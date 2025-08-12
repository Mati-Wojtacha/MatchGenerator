<template>
  <div v-if="data && data.length" id="matchForm" style="overflow-x: auto;">

    <div class="d-flex justify-content-end mb-2">
      <button
          class="btn btn-outline-primary btn-sm"
          @click="toggleAllMatches"
          :disabled="getMatchesWithData().length === 0"
      >
        {{ areAllWithDataCollapsed() ? $t('matchesTable.showBtn') : $t('matchesTable.hiddenBtn')  }}
      </button>
    </div>


    <div v-for="(item, indexMatch) in data" :key="item && item.id ? item.id : 'item-' + indexMatch">
      <div class="d-flex align-items-center" style="text-align: left;">
        <button
            v-if="item.isRevenge"
            class="btn btn-danger"
            @click="deleteMatch(item, indexMatch+1)"
        >
          <i class="fas fa-trash"></i>
        </button>&nbsp;

        <button
            v-if="hasBothScores(item)"
            class="btn btn-secondary"
            @click="toggleCollapse(item.id)"
            :title="isCollapsed(item.id) ? 'Show' : 'Hidden'"
        >
          <font-awesome-icon :icon="['fas', isCollapsed(item.id) ? 'eye' : 'eye-slash']" />
        </button>



        <h5 class="my-1">{{ $t('matchesTable.title') }} {{indexMatch+1}}:</h5>
      </div>

      <table :id="`match-table`" style="margin-bottom: 20px;" v-show="!isCollapsed(item.id)">
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
            <input style="width: 100px;"
                :id="`team1-${item.id}`"
                type="number"
                min="0"
                v-model="item.firstPoints"
                @input="handleInputChange($event)"
                @blur="onInputBlur(item)"
            >
          </td>
          <td>
            <input style="width: 100px;"
                :id="`team2-${item.id}`"
                type="number"
                min="0"
                v-model="item.secondPoints"
                @input="handleInputChange($event)"
                @blur="onInputBlur(item)"
            >
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { blockNegativeNumbersAndText } from '@/functions/BlockNumbersAndText';

export default {
  props: ["data"],
  data() {
    return {
      results: [],
      isMatchEdit: false,
      iterateMatches: 0,
      collapsed: {}
    };
  },
  provide() {
    return {
      isMatchEdit: this.isMatchEdit
    };
  },
  methods: {
    handleInputChange(event) {
      this.isMatchEdit = true;
      this.blockNegativeNumbersAndText(event);
    },
    onInputBlur(item) {
      if (!item || item.id == null) return;
      if (this.hasBothScores(item)) {
        this.collapsed[item.id] = true;
      }
    },
    deleteMatch(objectToDelete, indexMatch) {
      const index = this.data.findIndex(item => item.id === objectToDelete.id);
      if (window.confirm(`${this.$t('warnings.delete_match')} ${indexMatch}`)) {
        this.data.splice(index, 1);
        const isRevenge = this.data.some(item => item.isRevenge);
        this.$emit('changeIsRevenge', isRevenge);
        delete this.collapsed[objectToDelete.id];
      }
    },
    toggleCollapse(id) {
      this.collapsed[id] = !this.isCollapsed(id);
    },
    isCollapsed(id) {
      return Boolean(this.collapsed && this.collapsed[id]);
    },
    toggleAllMatches() {
      const shouldCollapse = !this.areAllWithDataCollapsed();
      const list = this.getMatchesWithData();
      for (const item of list) {
        if (item && item.id != null) {
          this.collapsed[item.id] = shouldCollapse;
        }
      }
    },
    hasBothScores(item) {
      if (!item) return false;

      const normalize = (v) => {
        if (typeof v === 'string') v = v.trim();
        if (v === '' || v === null || v === undefined) return null;
        const n = typeof v === 'number' ? v : Number(v);
        return Number.isFinite(n) ? n : null;
      };

      const a = normalize(item.firstPoints);
      const b = normalize(item.secondPoints);
      return a !== null && b !== null;
    },
    getMatchesWithData() {
      if (!Array.isArray(this.data)) return [];
      return this.data.filter(item => item && this.hasBothScores(item));
    },
    areAllWithDataCollapsed() {
      const list = this.getMatchesWithData();
      if (list.length === 0) return false;
      return list.every(item => item && item.id != null && this.collapsed[item.id] === true);
    },
    blockNegativeNumbersAndText,
  },
};
</script>
