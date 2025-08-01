<template>
  <div id="summary" style="overflow-x: auto;">
    <h4>{{ $t('summaryTable.title') }}</h4>
    <table id="summary-table">
      <thead>
      <tr>
        <th>{{ $t('summaryTable.player_name') }}</th>
        <th>{{ $t('summaryTable.points') }}</th>
        <th>{{ $t('summaryTable.small_points') }}</th>
        <th>{{ $t('summaryTable.win') }}</th>
        <th>{{ $t('summaryTable.lose') }}</th>
        <th>{{ $t('summaryTable.draw') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key, index) in getPoints(data)" :key="key">
        <td class="text-wrap">
          {{ key }}
          <button type="button" class="btn btn-secondary" @click="$emit('edit-player', index)"><i class="fas fa-edit"></i></button>
        </td>
        <td style="text-align: center;">{{ value.points }}</td>
        <td style="text-align: center;">{{ value.smallPoints }}</td>
        <td style="text-align: center;">{{ value.winMatches }}</td>
        <td style="text-align: center;">{{ value.lossMatches }}</td>
        <td style="text-align: center;">{{ value.drawMatches }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getPoints } from '@/functions/calc-points';

export default {
  props: ["data"],
  methods: {
    getPoints,
  },
};
</script>