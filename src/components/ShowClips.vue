<template>
  <div class="video-player">
    <template v-if="isYouTubeVideo(currentVideoSrc)">
      <iframe
        ref="iframe"
        :src="youtubeEmbedUrl(currentVideoSrc)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </template>
    <video
      v-else
      ref="video"
      :src="currentVideoSrc"
      @ended="playNextVideo"
      muted
      autoplay
      controls
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Video {
  type: 'youtube' | 'local';
  src: string;
}

const props = defineProps<{
  videos: string[];
}>();

const currentVideoIndex = ref(0);

const currentVideoSrc = computed(() => props.videos[currentVideoIndex.value]);

const isYouTubeVideo = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const youtubeEmbedUrl = (url: string): string => {
  let videoId = '';
  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\s]{11})/i;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    videoId = match[1];
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`;
};

const playNextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % props.videos.length;
  if (!isYouTubeVideo(currentVideoSrc.value)) {
    const videoElement = ref<null | HTMLVideoElement>(null);
    videoElement.value?.load();
    videoElement.value?.play();
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

video,
iframe {
  width: 100%;
  height: 100%;
}
</style>
