import { defineAsyncComponent } from 'vue';
const modulesFiles = import.meta.glob('./**/*.vue');

const getFieldWidget = (fieldName: string) => {
  return defineAsyncComponent(() => import(`./${fieldName}.vue`))
}

export default getFieldWidget;
