<template lang="pug">
  HomeLayout
    NavBar(slot="navigation")
    HelloWorld(slot="content")
</template>

<script>
import HomeLayout from "@/layouts/HomeLayout.vue";
import NavBar from "@/components/home/NavBar.vue";
import HelloWorld from "@/components/home/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HomeLayout,
    HelloWorld,
    NavBar
  }
};
</script>
