<template lang="pug">
  v-app
    MainNavigation(
      :miniVariant="isMiniVariant"
      :items="items"
      :drawer="drawerIsOpen"
      @resize="onResize"
    )
    MainToolbar(
      :mobile="isMobile"
      :drawer="drawerIsOpen"
      :title="title"
      :icon="miniVariantToggleIcon"
      @toggleDrawer="toggleDrawer"
      @toggleMiniVariant="toggleMiniVariant"
    )
    v-content
      span {{ isMobile }}
      router-view
</template>

<script>
import MainNavigation from "@/components/MainNavigation.vue";
import MainToolbar from "@/components/MainToolbar.vue";

export default {
  name: "App",
  data() {
    return {
      title: "Freies Digitales Schwarzes Brett",
      items: [
        {
          icon: "dashboard",
          title: "Arbeitsfläche",
          href: "/"
        },
        {
          icon: "bar_chart",
          title: "Statistiken",
          href: "/statistics"
        }
      ],
      drawer: true,
      miniVariant: false,
      isMobile: false
    };
  },
  methods: {
    toggleDrawer() {
      console.log(this.drawer);
      console.log("toggling ...");
      this.drawer = !this.drawer;
      console.log(this.drawer);
    },
    toggleMiniVariant() {
      this.miniVariant = !this.miniVariant;
    },
    onResize() {
      this.isMobile = window.innerWidth < 900 ? true : false;
    }
  },
  computed: {
    miniVariantToggleIcon() {
      return this.isMiniVariant ? "chevron_right" : "chevron_left";
    },
    isMiniVariant() {
      return this.miniVariant && !this.isMobile ? true : false;
    },
    drawerIsOpen() {
      return this.drawer;
    }
  },
  async mounted() {
    await this.onResize();
    this.isMobile ? (this.drawer = false) : (this.drawer = true);
  },
  components: {
    MainNavigation,
    MainToolbar
  }
};
</script>
