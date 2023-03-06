<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g1' }"
    item-key="name"
    ghostClass="ghost"
  >
    <template #item="{ element }">
      <li class="drag-list">
        <p>{{ element.name }}</p>
        <nested-draggable :tasks="element.tasks" />
      </li>
    </template>
  </draggable>
</template>

<script setup>
import draggable from "vuedraggable";

const props = defineProps({
  tasks: {
    required: true,
    type: Array
  }
})

</script>

<style lang="scss" scoped>
.drag-list {
  .dragArea {
    display: flex;
  }
}

.ghost{
  content: '';
  font-size: 0;
  height: 3px;
  box-sizing: border-box;
  background: red;
  border: 2px solid red;
  outline-width: 0;
  padding: 0;
  overflow: hidden;
}
</style>