<template>
<!--  <p>{{ $t('message.hello') }}</p>-->
  <div class="d-flex justify-content-center">
    <label for="teamId" style="font-weight: bold; margin-bottom: 0.5rem;">{{ $t('generator.title') }}</label>
  </div>
  <div class="d-flex justify-content-center">
    <div style="text-align: right">{{ $t('generator.right') }}</div>
    <div class="switch" style="min-width: 50px; margin-right: 10px; margin-left: 10px;">
      <input type="checkbox" id="switchView" v-model="isAddPlayerFormVisible" @input="changeIsPlayerForm()">
      <label for="switchView" class="switch-label"></label>
    </div>
    <div style="text-align: left">{{ $t('generator.left') }}</div>
  </div>

  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="fetchData">
          <AddPlayerForm v-if="isAddPlayerFormVisible" @add-player="addPlayer"/>
          <input v-else class="form-control mt-2" type="number" min="0" max="12" id="numberOfPlayers"
                 v-model="numberOfPlayers" required @input="handleInput($event)"
                 :placeholder="$t('generator.inputNumber_placeholder')" />
          <button class="btn btn-primary mt-3" type="submit" :disabled="playerNames.length < 2">{{ $t('generator.btn_generate') }}</button>
        </form>
        <div v-if="error" class="mt-2">{{ error }}</div>
      </div>

      <div class="col-md-6 mt-4 mt-md-0">
        <PlayerList ref="playerList" :playerNames="playerNames" @edit-player="editPlayer" @delete-player="deletePlayer"/>
      </div>
    </div>
  </div>


  <div class="container" ref="pdfContent">
    <div class="row">
      <div class="col-md-6 col-lg-6 order-2 order-md-1">
        <div v-if="data">
          <MatchForm style="height: 95vh;" :data="data" @changeIsRevenge="handeUpdateRevenge"></MatchForm>
        </div>
      </div>

      <div class="col-md-6 col-lg-6 order-1 order-md-2">
        <div v-if="data">
          <Summary :data="data"></Summary>
          <div class="text-center">
            <AddRevenge :data="data" :isRevenge="isRevenge" @updateData="handleUpdateData"/>
            <ShareMatches/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {blockNegativeNumbersAndText} from '@/functions/BlockNumbersAndText';
import Summary from "@/components/Summary.vue";
import {generateCombinations} from "@/functions/generateCombination";
import PlayerList from "@/components/PlayerList.vue";
import AddPlayerForm from "@/components/AddPlayerForm.vue";
import AddRevenge from "@/components/AddRevenge.vue";
import {generatePlayers} from "@/functions/generatePlayers";
import ShareMatches from "@/components/ShareMatches.vue";
import MatchForm from "@/components/MatchForm.vue";

export default {
  components: {
    MatchForm,
    ShareMatches,
    AddRevenge,
    AddPlayerForm,
    PlayerList,
    Summary,
  },
  data() {
    return {
      numberOfPlayers: null,
      isAddPlayerFormVisible: false,
      error: null,
      data: null,
      isRevenge: false,
      playerNames: [],
    };
  },
  methods: {
    changeIsPlayerForm() {
      this.numberOfPlayers = null;
      this.playerNames = [];
    },
    handeUpdateRevenge(isRevenge) {
      this.isRevenge = isRevenge;
    },
    handleUpdateData(newData, isRevenge) {
      this.data = newData;
      this.isRevenge = isRevenge;
    }
    ,
    handleInput(event) {
      if (event.target.value > 12) {
        this.error = this.$t('warnings.err_max_players');
        return;
      }
      this.error = null;
      this.playerNames = generatePlayers(event.target.value, this.$t('generator.player'));
      this.blockNegativeNumbersAndText(event);
    },
    blockNegativeNumbersAndText,
    fetchData() {
      this.error = null;
      this.$refs.playerList.showList = false;
      const nInput = this.playerNames.length;
      const combinations = generateCombinations(nInput);
      const stringList = [];
      this.isRevenge = false;
      for (const combination of combinations) {
        const id = combination[0];
        const firstHalf = combination[1].map(i => this.playerNames[i - 1]);
        const secondHalf = combination[2].map(i => this.playerNames[i - 1]);
        stringList.push({
          id: id,
          firstHalf: firstHalf,
          secondHalf: secondHalf
        });
      }
      this.data = stringList;
    }
    ,
    addPlayer(newPlayerName) {
      if (this.playerNames.length >= 12) {
        this.error = this.$t('warnings.err_max_players');
        return;
      }
      if (newPlayerName) {
        if (this.playerNames.includes(newPlayerName)) {
          this.error = this.$t('warnings.err_samePlayerName');
        } else {
          this.playerNames.push(newPlayerName);
          this.error = null;
        }
      }
    }
    ,
    editPlayer(index) {
      let newName = prompt(this.$t('warnings.edit_player'), this.playerNames[index]);
      if(newName === null) return;
      if (newName.length > 30) {
        newName = newName.substring(0, 30);
      }
      if (newName && newName !== this.playerNames[index]) {
        if (this.playerNames.includes(newName)) {
          this.error = this.$t('warnings.err_samePlayerName');
        } else {
          const oldName = this.playerNames[index];
          this.playerNames[index] = newName;
          if(this.data !== null) {
            this.data.forEach(match => {
              match.firstHalf = match.firstHalf.map(player => player === oldName ? newName : player);
              match.secondHalf = match.secondHalf.map(player => player === oldName ? newName : player);
            });
          }
          this.error = null;
        }
      }
    }
    ,
    deletePlayer(index) {
      this.playerNames.splice(index, 1);
      if (this.error !== null) this.error = null;
    }
    ,
  }
};
</script>

<style>

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196F3;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 24px;
}

.switch-label:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .switch-label:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>