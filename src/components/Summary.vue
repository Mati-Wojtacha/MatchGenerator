<template>
  <div id="summary" style="overflow-x: auto;">
    <h4>Zestawienie punktowe:</h4>
    <table id="summary-table">
      <thead>
      <tr>
        <th>Nazwa Gracza</th>
        <th>Punkty</th>
        <th>Małe punkty</th>
        <th>W</th>
        <th>P</th>
        <th>R</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in getPoints(data)" :key="key">
        <td class="text-wrap">
          {{ key }}</td>
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