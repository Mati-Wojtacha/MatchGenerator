<template>
  <MatchGeneratorCore
      :generatorFn="generateCombinations"
      :showRevenge="true"
      :texts="texts"
      :formRules="{
      inputMin: 2,
      generateButtonDisabled: (count) => count < 2
    }"
  />
</template>

<script>
import MatchGeneratorCore from "@/components/MatchGeneratorCore.vue";
import { generateCombinations } from "@/functions/generateCombination";

export default {
  components: { MatchGeneratorCore },
  computed: {
    texts() {
      return {
        title: this.$t("generator.title"),
        right: this.$t("generator.right"),
        left: this.$t("generator.left"),
        placeholder: this.$t("generator.inputNumber_placeholder"),
        btnGenerate: this.$t("generator.btn_generate"),
        maxPlayersError: this.$t("warnings.err_max_players"),
        invalidPlayersError: this.$t("warnings.err_invalid_players_number"),
        duplicateNameError: this.$t("warnings.err_samePlayerName"),
        editPrompt: this.$t("warnings.edit_player"),
        playerPrefix: this.$t("generator.player"),
      };
    }
  },
  methods: {
    generateCombinations,
  },
};
</script>