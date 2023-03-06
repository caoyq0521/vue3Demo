<template>
  <div class="setting-area">
    <template v-if="!!selectedWidget">
      <template v-for="config of PROPERTY">
        <component 
          :is="getWidgetName(config)" 
          :option-model="optionModel" 
          :selected-widget="selectedWidget"
        ></component>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import modules from "./property-editor";
import { PROPERTY } from './propertyRegister';
const props = defineProps<{
  selectedWidget: {
    type: string,
    options: object
  }
}>();

const optionModel = computed({
  get: () => props.selectedWidget.options,
  set: (val: object) => {
    props.selectedWidget.options = val;
  }
});

const getWidgetName = (config: string) => {
  return modules[config];
}
</script>

<style lang="scss" scoped>
.setting-area {
  height: 100%;
  padding: 20px;
}
</style>