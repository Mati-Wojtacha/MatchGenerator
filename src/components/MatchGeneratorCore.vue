<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <label style="font-weight: bold; margin-bottom: 0.5rem;">{{ texts.title }}</label>
    </div>

    <div v-if="!data">
      <div class="d-flex justify-content-center">
        <div>{{ texts.right }}</div>
        <div class="switch mx-2">
          <input type="checkbox" id="switchView" v-model="isAddPlayerFormVisible" @input="resetForm()" />
          <label for="switchView" class="switch-label"></label>
        </div>
        <div>{{ texts.left }}</div>
      </div>

      <!-- Form -->
      <div  class="row mt-4">
        <div class="col-md-6">
          <form @submit.prevent="fetchData">
            <AddPlayerForm v-if="isAddPlayerFormVisible" @add-player="addPlayer" />
            <input
                v-else
                class="form-control"
                type="number"
                :min="formRules.inputMin"
                max="12"
                v-model="numberOfPlayers"
                @input="handleInput"
                :placeholder="texts.placeholder"
                required
            />
            <div class="d-flex gap-2 mt-3">
              <button
                  class="btn btn-primary"
                  type="submit"
                  :disabled="formRules.generateButtonDisabled(playerNames.length)"
              >
                {{ texts.btnGenerate }}
              </button>
            </div>
          </form>
        </div>
        <div v-if="playerNames.length > 0" class="col-md-6">
          <PlayerList
              ref="playerList"
              :playerNames="playerNames"
              @edit-player="editPlayer"
              @delete-player="deletePlayer"
          />
        </div>
      </div>
    </div>
    <button
        v-if="data"
        type="button"
        class="btn btn-warning w-100 mt-3"
        @click="confirmReset"
    >
      <i class="fas fa-trash-alt"></i> {{ texts.btnReset }}
    </button>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <!-- Matches -->
    <div v-if="data" class="row mt-4" ref="pdfContent">
      <div class="col-md-6">
        <MatchForm :data="data" @changeIsRevenge="updateRevenge" />
      </div>
      <div class="col-md-6">
        <Summary
            :data="data"
            @edit-player="editPlayer"
        />
        <div class="text-center">
          <AddRevenge
              v-if="showRevenge"
              :data="data"
              :isRevenge="isRevenge"
              @updateData="handleUpdateData"
          />
          <ShareMatches />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddPlayerForm from "@/components/AddPlayerForm.vue";
import PlayerList from "@/components/PlayerList.vue";
import MatchForm from "@/components/MatchForm.vue";
import Summary from "@/components/Summary.vue";
import ShareMatches from "@/components/ShareMatches.vue";
import AddRevenge from "@/components/AddRevenge.vue";
import { generatePlayers } from "@/functions/generatePlayers";
import { blockNegativeNumbersAndText } from "@/functions/BlockNumbersAndText";

export default {
  props: {
    texts: Object,
    generatorFn: Function,
    showRevenge: Boolean,
    formRules: {
      type: Object,
      default: () => ({
        inputMin: 0,
        generateButtonDisabled: playerCount => playerCount < 0,
      }),
    },
  },
  components: {
    AddPlayerForm,
    PlayerList,
    MatchForm,
    Summary,
    ShareMatches,
    AddRevenge,
  },
  data() {
    return {
      numberOfPlayers: null,
      isAddPlayerFormVisible: false,
      error: null,
      data: null,
      playerNames: [],
      isRevenge: false,
    };
  },
  methods: {
    confirmReset() {
        if (confirm(this.texts.confirmReset)) {
          this.data = null;
          this.isRevenge = false;
          this.error = null;
          this.playerNames = [];
          this.numberOfPlayers = null;
          if (this.$refs.playerList) {
            this.$refs.playerList.showList = false;
          }
        }
      },
      resetForm() {
      this.numberOfPlayers = null;
      this.playerNames = [];
    },
    handleInput(event) {
      if (event.target.value > 12) {
        this.error = this.texts.maxPlayersError;
        return;
      }
      this.error = null;
      this.playerNames = generatePlayers(event.target.value, this.texts.playerPrefix);
      blockNegativeNumbersAndText(event);
    },
    fetchData() {
      this.error = null;
      this.$refs.playerList.showList = false;
      try {
        const combinations = this.generatorFn(this.playerNames.length);
        this.data = combinations.map(([id, firstHalf, secondHalf]) => ({
          id,
          firstHalf: firstHalf.map(i => this.playerNames[i - 1]),
          secondHalf: secondHalf.map(i => this.playerNames[i - 1]),
        }));
        this.isRevenge = false;
      } catch (e) {
        this.error = this.texts.invalidPlayersError;
        this.data = null;
      }
    },
    addPlayer(name) {
      if (this.playerNames.length >= 12) {
        this.error = this.texts.maxPlayersError;
        return;
      }
      if (this.playerNames.includes(name)) {
        this.error = this.texts.duplicateNameError;
        return;
      }
      this.playerNames.push(name);
      this.error = null;
    },
    editPlayer(index) {
      let newName = prompt(this.texts.editPrompt, this.playerNames[index]);
      if (!newName) return;
      if (newName.length > 30) newName = newName.slice(0, 30);
      if (this.playerNames.includes(newName)) {
        this.error = this.texts.duplicateNameError;
        return;
      }
      const oldName = this.playerNames[index];
      this.playerNames[index] = newName;
      if (this.data) {
        this.data.forEach(match => {
          match.firstHalf = match.firstHalf.map(p => (p === oldName ? newName : p));
          match.secondHalf = match.secondHalf.map(p => (p === oldName ? newName : p));
        });
      }
    },
    deletePlayer(index) {
      this.playerNames.splice(index, 1);
      this.error = null;
    },
    updateRevenge(val) {
      this.isRevenge = val;
    },
    handleUpdateData(newData, isRevenge) {
      this.data = newData;
      this.isRevenge = isRevenge;
    },
  },
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

.alert {
  animation: fadeIn 0.3s ease-in;
  border-left: 5px solid #842029;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>