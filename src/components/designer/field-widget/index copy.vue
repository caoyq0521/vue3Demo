<template>
  <div class="the-mainbody">
    <draggable
      class="drop-main"
      :list="designer.widgetList"
      item-key="rowId"
      v-bind="dragOptions"
      @add="handleMainAdd"
    >
      <template #item="{ element, index }">
        <div class="drop-test">
          <draggable
            class="drop-list"
            :list="element.components"
            item-key="id"
            v-bind="dragItemOptions"
            :clone="handleFieldClone"
            @add="handleFieldAdd($event, index)"
            @change="handleDragChange($event, index)"
          >
            <template #item="{ element: field, index: idx }">
              <div class="drop-item">
                <component
                  :is="getWidgetName(field)"
                  :field="field"
                  :designer="designer"
                  :key="field.id"
                  :parent-list="designer.widgetList"
                  :index-of-parent-list="index"
                  :parent-widget="null"
                  :design-state="true"
                ></component>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
import getFieldWidget from "./widgets";
import { ref, computed, watchEffect } from "vue";

const props = defineProps({
  designer: {
    type: Object,
    required: true,
  },
});

const dragOptions = {
  animation: 250,
  group: "people",
  disabled: false,
  ghostClass: "ghost",
  direction: "horizontal",
  filter: '.drop-test'
};

const dragItemOptions = {
  animation: 250,
  group: "people",
  disabled: false,
  ghostClass: "ghost-item",
  direction: "horizontal",
  handle: '.field-widget-drag'
};

const handleMainAdd = (e: any) => {
  // console.log(e.dataTransfer.getData('group'));
  props.designer.dragEle.options.fieldWidth = 0;
  props.designer.widgetList[e.newIndex].components.push(props.designer.dragEle);
  props.designer.setSelected(props.designer.dragEle);
  props.designer.dragEle = undefined;
}

const handleDragChange = (e: any, index) => {
  if(e.removed) {
    if(!props.designer.widgetList[index].components.length) {
      props.designer.widgetList.splice(index, 1);
    }
  }
};

const handleFieldClone = (e: any) => {
  props.designer.dragEle = e;
  return props.designer.getRowsConfig();

}

const handleFieldAdd = (e: any, index: number) => {
  props.designer.widgetList[index].components.splice(e.newIndex, 1, props.designer.dragEle);
  props.designer.setSelected(props.designer.dragEle);
  props.designer.dragEle = undefined;
  const { length } = props.designer.widgetList[index].components;

  for(let field of props.designer.widgetList[index].components) {
    field.options.fieldWidth = length - 1;
  }
}

interface widgetObject {
  type: string;
}

const getWidgetName = (widget: widgetObject) => {
  return getFieldWidget(`${widget.type}-widget`);
};

const setStyle = (field: any) => {
  const { fieldWidth } = field.options;
  let width = '';
  switch (fieldWidth) {
    case 0:
      width = '100%'
      break;
    case 1:
      width = '50%'
      break;
    case 2:
      width = '33.33%'
      break;
    case 3:
      width = '25%'
      break;
    default:
      break;
  }
  return {
    width
  }
}
</script>

<style lang="scss" scoped>
.the-mainbody {
  height: 100%;
}

.dragArea {
  height: 100%;
}

.form-widget-canvas {
  display: inline-block;
  width: 50%;
}

.drop-test {
  padding: 4px;
}

.drop-main {
  padding: 10px;
  height: 100%;
}

.drop-list {
  display: flex;
  width: 100%;
  position: relative;
}

.drop-item {
      position: relative;
      width: 33.33%;
      height: 100%;
      background-color: rgba(178, 174, 174, 0.5);
      transition: all 0.25s ease-in-out 0s;
      transform: translate3d(0px, 0px, 0px);
    }
.ghost {
  content: "";
  font-size: 0;
  height: 3px;
  width: 100%;
  box-sizing: border-box;
  background: red;
  border: 3px solid red;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
}
.ghost-item {
  content: "";
  font-size: 0;
  width: 3px;
  height: 100%;
  box-sizing: border-box;
  background: red;
  border-left: 3px solid red;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
}
</style>