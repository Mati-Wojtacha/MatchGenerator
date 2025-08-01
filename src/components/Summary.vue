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
      <tr v-for="(player, index) in getPoints(data)" :key="player.name">
        <td class="text-wrap">
          {{ player.name }}
          <button type="button" class="btn btn-secondary" @click="$emit('edit-player', index)">
            <i class="fas fa-edit"></i>
          </button>
        </td>
        <td style="text-align: center;">{{ player.points }}</td>
        <td style="text-align: center;">{{ player.smallPoints }}</td>
        <td style="text-align: center;">{{ player.winMatches }}</td>
        <td style="text-align: center;">{{ player.lossMatches }}</td>
        <td style="text-align: center;">{{ player.drawMatches }}</td>
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