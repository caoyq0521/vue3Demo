<template>
  <div class="widget-panel">
    <div class="nav-list">
      <div 
        v-for="(item, index) in field" 
        class="nav-item" 
        :draggable="true" 
        @dragstart="handleDragstart($event, index)"
        @dragend="handleDragEnd">
        {{ t(`designer.widgetLabel.${item.type}`) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { field } from './widgetsConfig';
import { useI18n } from "vue-i18n";
import { cloneDeep } from 'lodash';
const { t } = useI18n()
const props = defineProps({
  designer: {
    type: Object,
    required: true
  }
})

const handleDragstart = (e: any, index: number) => {
  const config = props.designer.copyNewFieldWidget(field[index]);
  props.designer.dragEle = cloneDeep(config);
  e.dataTransfer.setData("group", 'people');
};

const handleDragEnd = () => {
  props.designer.dragEle = undefined;
  const lineArr = document.querySelectorAll(".drop-item-line");
  for (let ele of lineArr) {
    ele.remove();
  }
};

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

    &+& {
      margin-top: 8px;
    }
  }
}
</style>