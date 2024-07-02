<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router";

const router = useRouter();
const value = ref(0)


const goTo = (value: string) => {

    return router.push(value);

}

const color = computed(() => {
    switch (value.value) {
        case 0: {
            // goTo("/");
            return 'blue-grey'
        };
        case 1: {
            // goTo("/tickets")
            return 'teal'
        };
        case 2: {
            // goTo("/queue")
            return 'brown';
        }
        // case 3: {
        //     // goTo("/queue")
        //     return 'blue';
        // }
        default: return 'blue-grey';
    }
});
</script>
<template>
    <main>
        <v-layout class="overflow-visible" style="height: 100%;">
            <v-bottom-navigation style="height: 80px;" v-model="value" :bg-color="color" mode="shift">
                <v-btn @click="goTo('/')">
                    <v-icon>mdi-menu</v-icon>

                    <span>Меню</span>
                </v-btn>

                <v-btn @click="goTo('/tickets')">
                    <v-icon>mdi-ticket</v-icon>

                    <span>Билеты</span>
                </v-btn>

                <v-btn @click="goTo('/queue')">
                    <v-icon>mdi-human-queue</v-icon>

                    <span>Очередь</span>
                </v-btn>
                <!-- <v-btn  @click="goTo('/book')">
                    <v-icon>mdi-book-clock-outline</v-icon>

                    <span>Очередь</span>
                </v-btn> -->

                <!-- <v-btn>
                    <v-icon>mdi-image</v-icon>
            
                    <span>Image</span>
                  </v-btn> -->
            </v-bottom-navigation>
        </v-layout>
    </main>
</template>
<style lang="scss" scoped>
span {
    font-size: 20px;
    color: white;
}
</style>
