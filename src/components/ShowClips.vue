<template>
    <div class="video-player">
      <video
        ref="video"
        :src="videos[currentVideoIndex]"
        @ended="playNextVideo"
        muted
        autoplay
        controls
      ></video>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShowClips',
    props: {
      videos: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentVideoIndex: 0
      };
    },
    methods: {
      playNextVideo() {
        if (this.currentVideoIndex < this.videos.length - 1) {
          this.currentVideoIndex += 1;
        } else {
          this.currentVideoIndex = 0; // Loop back to the first video if needed
        }
        this.$refs.video.load();
        this.$refs.video.play();
      }
    },
    mounted() {
      this.$refs.video.play();
    }
  };
  </script>
  
  <style scoped>
  .video-player {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 100%;
   
  }
  video {
    width: 100%;
    height: 100%;
  }
  </style>
  