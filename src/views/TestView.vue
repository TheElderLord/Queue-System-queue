<template>
    <div>
      <audio ref="audio" :src="audioSource" @canplay="onCanPlay" @ended="onAudioEnded"></audio>
      <button @click="playAudio">Play</button>
      <button @click="pauseAudio">Pause</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        audioSource: '/public/audio.mp3' // Correct path to your audio file
      }
    },
    methods: {
      playAudio() {
        const audio = this.$refs.audio;
        if (audio && audio.readyState >= 3) { // Check if audio is ready to play
          audio.play();
        } else {
          console.warn('Audio is not ready to play');
        }
      },
      pauseAudio() {
        const audio = this.$refs.audio;
        if (audio) {
          audio.pause();
        }
      },
      onAudioEnded() {
        console.log('Audio has ended');
      },
      onCanPlay() {
        console.log('Audio can play');
        this.playAudio();
      }
    },
    mounted() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.load();
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  