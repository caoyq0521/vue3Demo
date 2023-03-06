<script setup lang="ts">
import { NButton } from 'naive-ui';
import { ref, computed } from "vue";
import { useCounterStore } from '@/stores/counter';

const Counter = useCounterStore();

// import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
let index = ref(0);
function handleToggleTheme(num: number) {
  // index.value = num;
  window.document.documentElement.setAttribute(
        "data-theme",
        num ? "dark" : "light"
      );
}




</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div>
      <n-button @click="handleToggleTheme(0)">按钮1</n-button>
      <n-button @click="handleToggleTheme(1)">按钮2</n-button>
      <n-button @click="Counter.increment()">按钮2</n-button>
    </div>

    <div class="wrapper">
      <p>这是一段文字</p>
      <p>{{ Counter.count }}</p>
      <p>{{ Counter.doubleCount }}</p>
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style scoped lang="scss">

// p {
//   font-size: 18px;
//   @include font_color("font_title");
//   @include background_color("background_color1");
//   @include border_color("border_color1");
// }
</style>
