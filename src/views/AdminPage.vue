<script setup lang="ts">
import { onMounted, ref, } from "vue";


import type { Branch } from "../models/branch/branch.interface"
import { fetchBranches } from "../utils/branches.utils"

import { useRouter } from "vue-router";
// const token = ref(Cookies.get('token') || uuidv4() as string);
const branches = ref([] as Branch[]);
const selectedBranch = ref(0);

const router = useRouter();

const getBranches = async () => {
    branches.value = await fetchBranches();
    // console.log(branches.value)
}
const handleSelectBranches = () => {
    localStorage.setItem("branch", selectedBranch.value + "")
}
const goMain = () => {
    router.push("/");

}


onMounted(() => {

    getBranches()
})


</script>
<template>
    <main>

        <div class="admin-container w-1/2 ">

            <div class="title text-center text-3xl m-4">Админ панель</div>
            <div class="branches text-center">
                <h1 class="m-4 text-2xl">Выберите отделение</h1>
                <select v-model="selectedBranch" class="form-select" aria-label="Default select example"
                    @change="handleSelectBranches()">
                    <option selected value="null">Open this select menu</option>
                    <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                        {{ branch.name }}
                    </option>

                </select>

                <v-btn class="m-4" @click="goMain()">В главную</v-btn>
            </div>
        </div>
    </main>

</template>
<style lang="scss" scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;




}
</style>