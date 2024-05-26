<template>
    <div>
        <div class="bg-red-400">{{ name }}{{ age }}</div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/module/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { name, age } = storeToRefs(userStore);
</script>

<style scoped></style>
