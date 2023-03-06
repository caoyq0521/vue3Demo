<template>
  <div class="container">
    <div class="nav">
      <div class="nav-list">
        <div 
          v-for="(item, index) in nav" 
          class="nav-item" 
          :draggable="true" 
          @dragstart="handleDragstart($event, index)"
          @dragend="handleDragEnd">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="mainbody" 
      @drop="handleDrop" 
      @dragover="handleDragover"
    >
      <div 
        v-for="(rows, index) in dragList" 
        class="drop-list" 
        :data-index="index"
      >
        <div 
          v-for="(field, idx) in rows" 
          class="drop-item" 
          @dragstart="handleItemDragstart($event, field, index, idx)"
          @dragend="handleDragEnd"
        >
          {{ index }} - {{ idx }} - {{ field.title }}
          <div class="field-widget-drag" 
            @mousedown="handleMousedown" 
            @mouseup="handleMouseup"
          >
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { reactive, ref, computed, toRaw } from "vue";
import { generateId } from "@/utils/util";

const isToTop = ref(false);
const isToRight = ref(false);

const nav = reactive([
  {
    id: 1,
    title: "姓名",
  },
  {
    id: 2,
    title: "性别",
  },
]);

const dragList = reactive([]);
let dragInfo = null;

const handleDragstart = (e, index) => {
  dragInfo = toRaw(nav[index])
  e.dataTransfer.setData("group", 'people');
};

const handleDragEnd = (e) => {
  isToTop.value = false;
  isToRight.value = false;
  dragInfo = null;
  const lineArr = document.querySelectorAll(".drop-item-line");
  for (let ele of lineArr) {
    ele.remove();
  }
};

const handleMousedown = (e) => {
  e.target.parentNode.setAttribute('draggable', 'true')
}

const handleMouseup = (e) => {
  e.target.parentNode.setAttribute('draggable', 'false')
}

const handleItemDragstart = (e, field, index, idx) => {
  dragInfo = field;
  e.dataTransfer.setData("fromIndex", index);
  e.dataTransfer.setData("idx", idx);
  e.dataTransfer.setData("group", 'people');
};

const handleDrop = (e) => {
  const { target, dataTransfer } = e;
  const group = dataTransfer.getData('group') || '';
  if (group !== 'people' || !dragInfo) return;
  const fromIndex = dataTransfer.getData("fromIndex");
  const idx = dataTransfer.getData("idx");
  let index = +(target.dataset?.index || target.parentNode.dataset.index);
  console.log("caoyq0521 ~ file: DragView.vue:101 ~ handleDrop ~ index:", index)
  debugger;

  if (fromIndex) {
    dragList[fromIndex].splice(idx, 1);

    if (!dragList[fromIndex].length) {
      dragList.splice(fromIndex, 1);
      if (index) index--;
    }
  }
  if (Array.from(target.classList).includes("mainbody")) {
    dragList.push([dragInfo]);
    return;
  }

  if (isToTop.value) {
    dragList.splice(index, 0, [dragInfo]);
    return;
  }
  if (isToRight.value) {
    dragList[index].push(dragInfo);
  } else {
    dragList[index].unshift(dragInfo);
  }
};

const handleDragover = (e) => {
  e.preventDefault();
  const { dataTransfer, clientX, clientY, target } = e;
  const group = dataTransfer.getData('group') || '';
  if(group !== 'people') return;

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
  const isTop = (top + height) / 2 > clientY - 10;

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
  const isLeft = width / 2 > clientX - left;

  const direction = isLeft ? "dropLineLeft" : "dropLineright";
  ele.classList.add(direction);

  target.appendChild(ele);
  isToRight.value = !isLeft;
};

</script>
<style lang="scss">
.container {
  display: flex;
  height: 100%;
}

.nav {
  width: 230px;
  border-right: 1px solid #ccc;

  &-list {
    padding: 10px;
  }

  &-item {
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

.mainbody {
  position: relative;
  flex: 1;

  .drop-list {
    display: flex;
    width: 100%;
    height: 60px;
    position: relative;
    text-align: center;
    background-color: rgb(162, 156, 156);

    .drop-item {
      position: relative;
      width: 33.33%;
      height: 100%;
      background-color: rgba(178, 174, 174, 0.5);
      transition: all 0.25s ease-in-out 0s;
      transform: translate3d(0px, 0px, 0px);
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

.config {
  width: 350px;
  padding: 20px 10px;
  border-left: 1px solid #ccc;
}
</style>
