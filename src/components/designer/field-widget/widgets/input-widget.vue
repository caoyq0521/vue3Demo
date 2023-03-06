<template>
  <div>
    <!-- <n-tooltip trigger="hover">
      <template #trigger>
        <n-button> 鸭子 </n-button>
      </template>
      {{ field.options.tips }}
    </n-tooltip> -->
    {{ field.options.name || '字段名' }}
    <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
  </div>
</template>

<script setup lang="ts">
import { NInput, NTooltip } from "naive-ui";
import { ref } from "vue";
const props = defineProps({
  field: Object,
  parentWidget: Object,
  parentList: Array,
  indexOfParentList: Number,
  designer: {
    type: Object,
    required: true,
  },
});
const value = ref("");
</script>

<style scoped></style>