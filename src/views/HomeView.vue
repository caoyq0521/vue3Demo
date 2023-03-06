<script setup lang="ts">
import { ref, reactive } from 'vue';
import WidgetPanel from '@/components/designer/widget-panel/index.vue';
import SettingPanel from '@/components/designer/setting-panel/index.vue';
import FieldWidget from '@/components/designer/field-widget/index.vue';
import { generateId } from '@/utils/util';
import { cloneDeep } from 'lodash';
const getRowsConfig = () => {
  return cloneDeep({
    rowId: generateId(),
    components: []
  })
}

const createDesigner = () => {
  return {
    widgetList: [],
    selectedId: undefined,
    selectedWidget: undefined,
    selectedWidgetName: undefined,
    copyNewFieldWidget: (origin: any) => {
      const newWidget = cloneDeep(origin);
      const tempId = generateId();
      newWidget.id = `${newWidget.type}-${tempId}`;
      return {
        ...newWidget,
      };
    },
    clearSelected: function() {
      this.selectedId = undefined
      this.selectedWidgetName = undefined
      this.selectedWidget = undefined
    },
    setSelected: function(selected: any){
      if (!selected) {
        this.clearSelected()
        return;
      }

      this.selectedWidget = selected
      if (!!selected.id) {
        this.selectedId = selected.id
        this.selectedWidgetName = selected.options.name
      }
    },
    dragEle: undefined,
    getRowsConfig
  }
}

const designer = reactive(createDesigner());
</script>

<template>
  <div class="container">
    <div class="field">
      <widget-panel :designer="designer" />
    </div>
    <div class="mainbody">
      <field-widget :designer="designer"/>
    </div>
    <div class="config">
      <setting-panel v-if="designer.selectedWidget" :selected-widget="designer.selectedWidget" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;

  & > div {
    height: 100vh;
  }

  .field {
    width: 230px;
    border-right: 1px solid #ccc;
  }

  .mainbody {
    flex: 1;
    background-color: #F4F4F6;
  }

  .config {
    width: 350px;
  }
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.list-group {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
}

.drag-handler {
    position: absolute;
    top: -2px;
    right: -2px;
    height: 22px;
    line-height: 22px;
    z-index: 9;
  }


</style>