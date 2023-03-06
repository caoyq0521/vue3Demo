<template>
  <div class="container">
    <div class="nav">
      <draggable
        class="nav-list"
        :list="nav"
        :group="{ name: 'g1', pull: 'clone', put: false }"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="nav-item">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
    <div class="mainbody">
      <nested-draggable :tasks="list" @add="handelAdd">
        <!-- <template #data="{ type = '', options }">
          {{ type }}
          <el-input :placeholder="options.name"></el-input>
        </template> -->
        <!-- <el-input placeholder="options.name"></el-input> -->
        <template #filed="{ config }">
          {{ config }}
          <el-input :placeholder="config.options.name"></el-input>
        </template>
      </nested-draggable>
    </div>
  </div>
</template>

<script setup>
import nestedDraggable from "../components/NestedDraggable.vue";
import draggable from "vuedraggable";
import { reactive } from "vue";

const nav = reactive([
  {
    id: 1,
    name: "姓名",
    tasks: [],
  },
  {
    id: 2,
    name: "性别",
    tasks: [],
  },
]);

const list = reactive([
  {
    name: "task 1",
    tasks: [
      {
        name: "task 2",
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

// const list = reactive([
//   [
//     {
//       type: 'input',
//       options: {
//         name: '姓名',
//         width: '50%'
//       }
//     },
//     {
//       type: 'input',
//       options: {
//         name: '手机号',
//         width: '50%'
//       }
//     }
//   ],
//   [
//     {
//       type: 'input',
//       options: {
//         name: '性别',
//         width: '50%'
//       }
//     },
//     {
//       type: 'input',
//       options: {
//         name: '名称',
//         width: '50%'
//       }
//     }
//   ]
// ]);

const handelAdd = () => {
  console.log(list);
};
</script>

<style lang="scss" scoped>
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

    & + & {
      margin-top: 8px;
    }
  }
}

.mainbody {
  flex: 1;
}
</style>