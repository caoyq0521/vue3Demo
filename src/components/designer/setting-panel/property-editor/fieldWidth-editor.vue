<template>
  <div>
    <h4>字段宽度</h4>
    <n-radio-group
        v-model:value="optionModel.fieldWidth"
        name="radiobuttongroup1"
      >
        <n-radio-button
          v-for="song in songs"
          :key="song.value"
          :value="song.value"
          :label="song.label"
        />
      </n-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NRadioGroup, NRadioButton } from "naive-ui";

const props = defineProps({
  optionModel: Object
});

const songs = reactive([
  {
    value: 0,
    label: "整行",
  },
  {
    value: 1,
    label: "1/2",
  },
  {
    value: 2,
    label: "1/3",
  },
  {
    value: 3,
    label: "1/4",
  }
]);

</script>

<style scoped>

</style>