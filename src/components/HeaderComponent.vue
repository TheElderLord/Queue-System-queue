<script setup lang="ts">
import { useLangStore } from '@/stores/ticket';
const store = useLangStore()

const handleClick = (value: string) => {
    store.setLang(value);
}
</script>
<template>
    <div class="header-container flex w-full h-full justify-between p-4">
        <div class="title w-full">
            <h1 class="text-3xl">Терминал</h1>
        </div>
        <div class="langs flex justify-around w-1/5">
            <div @click="handleClick('KAZ')"
                class="lang flex items-center bg-orange-600 px-4 text-white cursor-pointer">KZ</div>
            <div @click="handleClick('RUS')"
                class="lang flex items-center bg-orange-600 px-4 text-white cursor-pointer">RU</div>
            <!-- <div @click="handleClick('ENG')" class="lang flex items-center bg-orange-600 px-4  px-4 text-white cursor-pointer">EN</div> -->
        </div>
    </div>
</template>