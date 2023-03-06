<template>
  <div class="field">
    <draggable
      class="field-list"
      :list="filedList"
      :group="{ name: 'people', pull: 'clone', put: false }"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="field-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
    <n-button>{{ $t("menus.home") }}</n-button>
    <el-button>{{ $t("buttons.login") }}</el-button>
    <n-select
      v-model:value="value"
      :options="options"
      @update:value="handleUpdateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { NSelect, NButton } from "naive-ui";
import draggable from "vuedraggable";
// import { useI18n } from "vue-i18n";
import { ref, reactive } from "vue";

// const { t, locale } = useI18n();

interface Filed {
  id: number;
  type: string;
  name: string;
}

let filedList = ref([] as Filed[]);

filedList.value = [
  {
    id: 1,
    type: "input",
    name: "姓名",
  },
  {
    id: 2,
    type: "radio",
    name: "性别",
  },
  {
    id: 3,
    type: "input",
    name: "电话",
  },
];

const value = ref(null);
const options = reactive([
  {
    label: "中文",
    value: "zh",
  },
  {
    label: "English",
    value: "en",
  },
]);

const handleUpdateValue = (e: any) => {
  // locale.value = e;
  localStorage.setItem("lang", e);
};
</script>

<style lang="scss" scoped>
.field {
  padding: 20px;

  &-item {
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    background-color: #f4f4f6;
    border-radius: 4px;
  }

  &-item + &-item {
    margin-top: 6px;
  }
}
</style>