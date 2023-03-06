<template>
  <div>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button> 鸭子 </n-button>
      </template>
      {{ field.options.tips }}
    </n-tooltip>
    {{ field.options.name || '字段名' }}
    <n-input type="textarea" maxlength="30" show-count v-model:value="value" placeholder="基本的 Input" />
  </div>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui';
import { ref } from 'vue';
const value = ref('');
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
</script>

<style scoped></style>