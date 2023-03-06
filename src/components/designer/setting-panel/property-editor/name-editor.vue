<template>
  <div>
    字段名
    <n-input v-model:value="optionModel.name" type="text" placeholder="基本的 Input" />
  </div>
</template>

<script setup lang="ts">
import { NInput } from "naive-ui";

const props = defineProps({
  optionModel: Object
});
</script>

<style scoped>

</style>