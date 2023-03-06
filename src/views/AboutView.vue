<template>
  <div class="container">
    <div class="nav">
      <!-- @end="handleDragEnd" 
        :clone="handleContainerWidgetClone"
       -->

      <draggable
        class="nav-list"
        :list="nav"
        :group="{ name: 'people', pull: 'clone', put: false }"
        item-key="type"
        :sort="false"
        @end="handleDragEnd"
        @change="handleChange"
        :clone="handleContainerWidgetClone"
        @dragover="handleDragover"
      >
        <template #item="{ element }">
          <div class="nav-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="mainbody">
      <!-- @add="handleDragAdd"
        @sort="handleSort"
        @dragover="handleDragover"
        @dragover="handleDragover"
        @drop="handleDrop" 
      -->
      <draggable
        class="drop-main"
        :list="dragList"
        item-key="id"
        @end="handleDragEnd"
        v-bind="dragOptions"
        @add="handleContainerAdd"
      >
        <template #item="{ element, index }">
          <draggable
            class="drop-list"
            :list="element.tasks"
            item-key="name"
            v-bind="dragItemOptions"
            @end="handleDragEnd"
            @add="handleAdd($event, index)"
            :clone="handleClone"
          >
            <template #item="{ element: field, index: idx }">
              <div class="drop-item">
                {{ field.name }} {{ idx }}
              </div>
            </template>
          </draggable>
        </template>
      </draggable>

      <!-- {{ element }} -->

      <!-- <div
        v-for="(rows, index) in dragList"
        class="drop-list"
        :data-index="index"
      >
        <div
          v-for="(field, idx) in rows"
          class="drop-item"
          :draggable="true"
          @dragstart="handleItemDragstart($event, field, index, idx)"
          @dragend="handleDragEnd"
        >
          {{ index }} - {{ idx }} - {{ field.name }}
        </div>
      </div> -->
    </div>
    <!-- <div class="config">
      <div>宽度</div>
      <n-radio-group
        v-model:value="value"
        name="radiobuttongroup1"
        @change="handleWidthUpdate"
      >
        <n-radio-button
          v-for="song in songs"
          :key="song.value"
          :value="song.value"
          :label="song.label"
        />
      </n-radio-group>
    </div> -->
  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { generateId } from "@/utils/util";
import { NRadioGroup, NRadioButton } from "naive-ui";
import draggable from "vuedraggable";

const isToTop = ref(false);
const isToRight = ref(false);
const songs = reactive([
  {
    value: "25%",
    label: "1/4",
  },
  {
    value: "33.33%",
    label: "1/3",
  },
  {
    value: "50%",
    label: "1/2",
  },
  {
    value: "66.67%",
    label: "2/3",
  },
  {
    value: "75%",
    label: "3/4",
  },
  {
    value: "100%",
    label: "1",
  },
]);

const value = ref("25%");

const handleWidthUpdate = (value) => {
  console.log(value);
};

const nav = reactive([
  {
    type: "input",
    name: "姓名",
  },
  {
    type: "radio",
    name: "性别",
  },
]);

const dragList = reactive([
  {
    name: "task 1",
    tasks: [
      {
        name: "task 2",
        tasks: [],
      },
      {
        name: "task 22",
        tasks: [],
      },
    ],
  },
  {
    name: "task 3",
    tasks: [
      {
        name: "task 4",
        tasks: [],
      },
      
    ],
  },
  {
    name: "task 5",
    tasks: [],
  },
]);

const dragOptions = {
  animation: 250,
  group: "people",
  disabled: false,
  dragoverBubble: true,
  ghostClass: "ghost",
  direction: 'horizontal'
};

const dragItemOptions = {
  animation: 250,
  group: "people",
  disabled: false,
  ghostClass: "ghost-item",
  direction: "horizontal",
  put: false,
};

let dragEle = reactive({});

// const renderDragList = computed(() => {
//   const list = [];
//   const map = new Map();
//   for (const item of dragList) {
//     const arr = map.get(item.row) || []
//     map.set(item.row, [...arr, item]);
//   }
//   for (const [key, value] of map.entries()) {
//     list.push({
//       row: key,
//       fields: value
//     });
//   }

//   return list;
// });
const handleChange = (e) => {
  // console.log("caoyq0521 ~ file: AboutView.vue:199 ~ handleChange ~ e:", e)
  
}

const handleContainerAdd = (e) => {
  dragList[e.newIndex].tasks.push(dragEle);
}

const handleAdd = (e, index) => {
  dragList[index].tasks.splice(e.newIndex, 1, dragEle);
}
const handleCheckMove = (e) => {
  // return Array.from(e.to.children).length < 2;
  return true;
}

const handleClone = (e, index) => {
  dragEle = e;
  return {
    tasks: []
  }
}

const handleContainerWidgetClone = (origin) => {
  dragEle = {
    name: origin.name,
    tasks: []
  }

  return {
    tasks: []
  }
};

const handleContainerWidgetClone1 = (origin) => {
  return {}
}


const handleDragstart = (e) => {
  e.dataTransfer.setData("text", e.target.innerText);
  e.dataTransfer.setData("id", generateId());
};

const handleDragEnd = (e) => {
  console.log(dragList);
  // console.log("caoyq0521 ~ file: AboutView.vue:170 ~ handleDragEnd ~ e:", e);
  // // console.log(e);
  // // console.log('drag end');
  // isToTop.value = false;
  // isToRight.value = false;
  // const lineArr = document.querySelectorAll(".drop-item-line");
  // for (let ele of lineArr) {
  //   ele.remove();
  // }
};

const handleItemDragstart = (e, field, index, idx) => {
  e.dataTransfer.setData("fromIndex", index);
  e.dataTransfer.setData("text", field.name);
  e.dataTransfer.setData("idx", idx);
  e.dataTransfer.setData("id", field.id);
};

const handleDrop = (e) => {
  console.log(dragList);
  console.log("caoyq0521 ~ file: AboutView.vue:198 ~ handleDrop ~ e:", e);
};

const handleSort = (e) => {
  console.log("caoyq0521 ~ file: AboutView.vue:197 ~ handleSort ~ e:", e);
};

const handleDragAdd = (e) => {
  console.log("caoyq0521 ~ file: AboutView.vue:196 ~ handleDragAdd ~ e:", e);
  console.log(dragList);
  // const { target, dataTransfer } = e;
  // const name = dataTransfer.getData("text");
  // const id = dataTransfer.getData("id");
  // const fromIndex = dataTransfer.getData("fromIndex");
  // const idx = dataTransfer.getData("idx");
  // let index = +(target.dataset?.index || target.parentNode.dataset.index);

  // if (fromIndex) {
  //   dragList[fromIndex].splice(idx, 1);

  //   if (!dragList[fromIndex].length) {
  //     dragList.splice(fromIndex, 1);

  //     if (index !== undefined || index !== null) index--;
  //   }
  // }

  // let info = {
  //   id,
  //   name,
  // };
  // if (Array.from(target.classList).includes("mainbody")) {
  //   dragList.push([info]);
  //   return;
  // }

  // if (isToTop.value) {
  //   dragList.splice(index, 0, [info]);
  //   return;
  // }
  // if (isToRight.value) {
  //   dragList[index].push(info);
  // } else {
  //   dragList[index].unshift(info);
  // }
};

const handleDragover = (e) => {
  console.log("caoyq0521 ~ file: AboutView.vue:293 ~ handleDragover ~ e:", e)
  e.preventDefault();

  // const lineArr = document.querySelectorAll(".drop-item-line");
  // for (let ele of lineArr) {
  //   ele.remove();
  // }

  // const { clientX, clientY, target } = e;
  // const ele = document.createElement("div");
  // ele.classList.add("drop-item-line");

  // const { height, width, left, top } = target.getBoundingClientRect();
  // const isTop = (top + height) / 2 > clientY - 10;

  // if (isTop) {
  //   ele.classList.add("dropLineTop");
  //   if (Array.from(target.classList).includes("drop-item")) {
  //     target.parentNode.appendChild(ele);
  //     return;
  //   }
  //   target.appendChild(ele);
  //   return;
  // }
  // const isLeft = width / 2 > clientX - left;

  // if (target.className === "drop-main" && isLeft) {
  //   ele.classList.add("mainbodyTop");
  //   target.appendChild(ele);
  //   return;
  // }

  // const direction = isLeft ? "dropLineLeft" : "dropLineright";
  // ele.classList.add(direction);
  // target.appendChild(ele);
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
    width: 100%;
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

.mainbody {
  position: relative;
  flex: 1;


  .drop-main {
    height: 100%;
    padding: 10px;
  }

  .drop-list {
    display: flex;
    width: 100%;
    height: 60px;
    margin: 4px 0;
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

.ghost {
  content: "";
  font-size: 0;
  height: 6px;
  box-sizing: border-box;
  background: red;
  border-top: 2px solid red;
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
  border-left: 3px solid red;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
}
</style>
