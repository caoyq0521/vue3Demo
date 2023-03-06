<template>
  <div class="the-mainbody">
    <draggable
      class="dragArea list-group"
      :list="filedList"
      item-key="id"
      handle=".drag-handler"
      v-bind="dragOptions"
    >
      <template #item="{ element }">
        <div class="list-group-item">
          {{ element.name }}
          <div class="drag-handler">
            <n-icon>+</n-icon>
            <i></i>
            <i class="iconfont icon-hide"></i>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";

interface Filed {
  id: number;
  type: string;
  name: string;
}

let filedList = ref([] as Filed[]);

const dragOptions = {
  animation: 250,
  group: "people",
  disabled: false,
  ghostClass: "ghost"
}
</script>

<style lang="scss" scoped>
.the-mainbody {
  height: 100%;
}

.dragArea {
  height: 100%;
}
</style>