<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import BottomNavigation from './components/BottomNavigation.vue'
import HeaderComponent from './components/HeaderComponent.vue'

import { useStore } from "./stores/ticket";
import QueuePage from './views/QueuePage.vue';
const store = useStore();

const route = useRoute();
const isMobile = ref(false);




onMounted(() => {
  
  // Add event listener for window resize
 
  localStorage.setItem("branch", "1")
})


</script>

<template>
  <main>
    <!-- <QueuePage /> -->
    <!-- <header v-if="!isAdminPage()">
      <HeaderComponent/>
    </header>
   
    <div v-if="!isAdminPage() && isMobile" class="footer">
      <BottomNavigation />
    </div> -->

    <RouterView />

  </main>

</template>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;

  header {
    width: 100%;
    height: 10vh;
  }

  .footer {
    width: 100%;

  }
}
</style>
