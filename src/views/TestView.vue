<script setup>
import { ref } from 'vue';

const audioPlayer = ref(null);
const audioSources = ref([
  '/src/assets/Voice/01_NUM_EN.wav',
  '/src/assets/Voice/2_EN.wav',
  '/src/assets/Voice/02_NUM_EN_FOLLOW.wav',
  '/src/assets/Voice/4_EN.wav',
]);
let currentAudioIndex = ref(0);

const playAudio = async () => {
  for (let i = 0; i < audioSources.value.length; i++) {
    audioPlayer.value.src = audioSources.value[i];
    await new Promise((resolve) => {
      audioPlayer.value.onended = resolve;
      audioPlayer.value.play();
    });
  }
};

const pauseAudio = () => {
  audioPlayer.value.pause();
};

const stopAudio = () => {
  audioPlayer.value.pause();
  audioPlayer.value.currentTime = 0;
  currentAudioIndex.value = 0; // Reset index to play from the beginning
};
</script>



<template>
  <div>
    <h1>WAV Audio Player</h1>
    <div>
      <button @click="playAudio">Play</button>
      <button @click="pauseAudio">Pause</button>
      <button @click="stopAudio">Stop</button>
    </div>
      <div class="aud">
        <audio ref="audioPlayer" controls />
      </div>
    
   
  </div>
</template>
<style>
.aud{
  display:none
}
</style>
