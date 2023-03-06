<template>
  <div class="widget-panel">
    <draggable
      class="nav-list"
      :list="field"
      :group="{ name: 'people', pull: 'clone', put: false }"
      item-key="type"
      :clone="handleWidgetClone"
      :setData="handleSetData"
    >
      <template #item="{ element }">
        <div class="nav-item">
          {{ t(`designer.widgetLabel.${element.type}`) }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { field } from './widgetsConfig';
import draggable from "vuedraggable";
import { useI18n } from "vue-i18n";
import { cloneDeep } from 'lodash';
import type { Field } from './widgetsConfig';
const { t } = useI18n()
const props = defineProps({
  designer: {
    type: Object,
    required: true
  }
})
const handleWidgetClone = (origin: Field) => {
  const config = props.designer.copyNewFieldWidget(origin);
  props.designer.dragEle = cloneDeep(config);
  return props.designer.getRowsConfig();
}

const handleSetData = (dataTransfer: any) => {
  dataTransfer.setData('group', 'people');
}

const handleWidgetMove = (evt: any) => {
  if(!!evt.draggedContext && !!evt.draggedContext.element) {
    if(!!evt.to) {
      console.log(Array.from(evt.to.children).length <= 3);
      
      return !!(Array.from(evt.to.children).length <= 3)
    }
  }
  return true;
}

</script>

<style lang="scss" scoped>
.nav {
  width: 230px;
  border-right: 1px solid #ccc;

  &-list {
    padding: 10px;
  }

  &-item {
    width: 210px;
    line-height: 36px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    & + & {
      margin-top: 8px;
    }
  }
}
</style>