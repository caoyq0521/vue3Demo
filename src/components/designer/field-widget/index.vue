<template>
    <div class="mainbody" 
      @drop="handleDrop" 
      @dragover="handleDragover"
    >
      <div 
        v-for="(rows, index) in designer.widgetList" 
        class="drop-list" 
        :data-index="index"
      >
        <div 
          v-for="(field, idx) in rows.components" 
          class="drop-item"
          :style="setStyle(field)"
          @dragstart="handleItemDragstart($event, field, index, idx)"
          @dragend="handleDragEnd"
        >
          <component
            :is="getWidgetName(field)"
            :field="field"
            :designer="designer"
            :key="field.id"
            :parent-list="designer.widgetList"
            :index-of-parent-list="index"
            :parent-widget="null"
            :design-state="true"
            class="drop-item__container"
          ></component>
          <div 
            class="field-widget-drag" 
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"
          >
            +
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import getFieldWidget from "./widgets";
import { ref, computed, watchEffect, reactive, toRaw } from "vue";

const props = defineProps({
  designer: {
    type: Object,
    required: true,
  },
});

const isToTop = ref(false);
const isToRight = ref(false);

const handleDragEnd = (e: any) => {
  isToTop.value = false;
  isToRight.value = false;
  props.designer.dragEle = undefined;
  const lineArr = document.querySelectorAll(".drop-item-line");
  for (let ele of lineArr) {
    ele.remove();
  }
};

const handleMousedown = (e: any) => {
  e.target.parentNode.setAttribute('draggable', 'true')
}

const handleMouseup = (e: any) => {
  e.target.parentNode.setAttribute('draggable', 'false')
}

const handleItemDragstart = (e: any, field: any, index: number, idx: number) => {
  props.designer.dragEle = toRaw(field);
  e.dataTransfer.setData("fromIndex", index);
  e.dataTransfer.setData("idx", idx);
  e.dataTransfer.setData("group", 'people');
};

const handleDrop = (e: any) => {
  const { target, dataTransfer } = e;
  const group = dataTransfer.getData('group') || '';
  if (group !== 'people' || !props.designer.dragEle) return;
  const fromIndex = dataTransfer.getData("fromIndex");
  const idx = dataTransfer.getData("idx");
  let index = +(target.dataset?.index || target.parentNode.dataset.index);

  if (fromIndex) {
    props.designer.widgetList[fromIndex].components.splice(idx, 1);

    if (!props.designer.widgetList[fromIndex].components.length) {
      props.designer.widgetList.splice(fromIndex, 1);
      if (index) index--;
    }
  }
  if (Array.from(target.classList).includes("mainbody")) {
    const rowsConfig = props.designer.getRowsConfig();
    rowsConfig.components.push(props.designer.dragEle);
    props.designer.widgetList.push(rowsConfig);
  }else if (isToTop.value) {
    const rowsConfig = props.designer.getRowsConfig();
    rowsConfig.components.push(props.designer.dragEle);
    props.designer.widgetList.splice(index, 0, rowsConfig);
  }else if (isToRight.value) {
    props.designer.widgetList[index].components.push(props.designer.dragEle);
  } else {
    props.designer.widgetList[index].components.unshift(props.designer.dragEle);
  }
  props.designer.setSelected(props.designer.dragEle);
  props.designer.dragEle = undefined;
};

const handleDragover = (e: any) => {
  e.preventDefault();
  const { clientX, clientY, target } = e;
  if(!props.designer.dragEle) return;

  isToTop.value = false;
  isToRight.value = false;

  const lineArr = document.querySelectorAll(".drop-item-line");
  for (let ele of lineArr) {
    ele.remove();
  }

  const ele = document.createElement("div");
  ele.classList.add("drop-item-line");

  if (target.className === "mainbody") {
    ele.classList.add("mainbodyTop");
    target.appendChild(ele);
    return;
  }

  const { height, width, left, top } = target.getBoundingClientRect();
  const isTop = (top + height / 2 ) > clientY - 10;

  if (isTop) {
    isToTop.value = true;
    ele.classList.add("dropLineTop");
    if (Array.from(target.classList).includes("drop-item")) {
      target.parentNode.appendChild(ele);
      return;
    }
    target.appendChild(ele);
    return;
  }
  const isLeft = width / 2 > (clientX - left);

  const direction = isLeft ? "dropLineLeft" : "dropLineright";
  ele.classList.add(direction);

  target.appendChild(ele);
  isToRight.value = !isLeft;
};

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

<style lang="scss">
.mainbody {
  position: relative;
  flex: 1;
  height: 100%;
  padding: 14px;

  .drop-list {
    display: flex;
    width: 100%;
    position: relative;
    text-align: center;

    .drop-item {
      position: relative;
      height: 100%;
      padding: 6px;
      background-color: rgba(178, 174, 174, 0.5);
      transition: all 0.25s ease-in-out 0s;
      transform: translate3d(0px, 0px, 0px);

      &__container {
        pointer-events: none;
      }
    }
  }

  .drop-item-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: green;

    &.is-right {
      right: 0;
    }
  }

  .field-widget {

    &-delete,
    &-drag,
    &-hidden {
      position: absolute;
      top: 0px;
      cursor: move;

      img {
        width: 18px;
      }
    }

    &-drag {
      width: 20px;
      height: 24px;
      color: #fff;
      background-color: red;
    }

    &-delete {
      right: 20px;
    }

    &-hidden {
      right: 0;
    }
  }

  .dropLineLeft {
    left: 0;
  }

  .dropLineright {
    right: 0;
  }

  .dropLineTop {
    top: 0;
    width: 100%;
    height: 6px;
  }

  .mainbodyTop {
    position: relative;
    width: 100%;
    height: 6px;
  }

  .drop-line {
    height: 6px;
    background-color: green;
  }
}

</style>