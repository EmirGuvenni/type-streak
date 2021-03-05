<template>
  <div class="flex flex-col container-fluid h-screen text-center bg-teal-900">
    <h1 class="text-yellow-300 font-extrabold text-4xl md:text-8xl my-28">
      TYPE-STREAK
    </h1>
    <figure class="mx-auto text-center self-center">
      <p class="font-semibold text-xl text-white unselectable">
        <span class="text-yellow-300">--&gt;</span> {{ word }}
        <span class="text-yellow-300">&lt;--</span>
      </p>
      <input
        type="text"
        v-model="wordInput"
        ref="input"
        class="border-black border-2 rounded-xl focus:outline-none px-2 py-1 m-5"
        placeholder="type here.."
        v-on:input="input()"
      />
      <p class="text-white font-semibold">
        🔥 Streak: <span class="text-yellow-300">{{ streak }}</span>
      </p>
      <p class="text-white font-semibold">
        👑 Highest streak:
        <span class="text-yellow-300">{{ highestStreak }}</span>
      </p>
      <p class="text-white font-semibold">
        🕒 10 words in:
        <span class="text-yellow-300">{{ timeM }}m {{ timeS }}s</span>
      </p>
      <p class="text-gray-400 font-semibold">
        Type the word in between of arrows and hit space to earn a point
      </p>
      <div class="my-10">
        <a
          href="https://github.com/EmirGuvenni/type-streak"
          target="_blank"
          class="text-pink-600 underline"
          >Github</a
        ><br />
        <a
          href="https://emirguvenni.com/"
          target="_blank"
          class="text-pink-600 underline"
          >Emir Güvenni ©2021</a
        >
      </div>
    </figure>
  </div>
</template>

<script>
import json from "./assets/words.json";

let interval;

export default {
  name: "App",
  data() {
    return {
      words: json,
      word: "",
      wordInput: "",
      streak: 0,
      highestStreak: 0,
      timeS: 0,
      timeM: 0,
      timer: 0,
    };
  },
  methods: {
    input: function () {
      if (this.wordInput.endsWith(" ")) {
        this.wordInput = this.wordInput.slice(0, -1);
        if (this.word == this.wordInput) this.correct();
        else this.wrong();
      }
    },
    changeWord: function () {
      let index = Math.floor(Math.random() * (this.words.length + 1));
      this.word = this.words[index];
      this.wordInput = "";
    },
    correct: function () {
      console.log(this.timer);
      this.streak++;
      if (this.streak % 10 == 1) {
        clearInterval(interval);
        interval = setInterval(() => {
          this.timer++;
        }, 1000);
      }

      if (this.streak % 10 == 0) this.timeFormater();

      this.$refs.input.style.backgroundColor = "#34D399";
      setTimeout(() => {
        this.$refs.input.style.backgroundColor = "white";
      }, 400);
      if (this.highestStreak < this.streak) this.highestStreak = this.streak;
      this.changeWord();
    },
    wrong: function () {
      clearInterval(interval);
      this.timer = 0;
      this.$refs.input.style.backgroundColor = "#F87171";
      setTimeout(() => {
        this.$refs.input.style.backgroundColor = "white";
      }, 400);
      this.streak = 0;
      this.changeWord();
    },
    timeFormater: function () {
      console.log(this.timer);
      this.timeM = Math.floor(this.timer / 60);
      this.timeS = this.timer % 60;
      this.timer = 0;
    },
  },
  beforeMount() {
    this.changeWord();
  },
};
</script>

<style lang="scss">
* {
  font-family: "Courier New", Courier, monospace;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
