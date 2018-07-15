<template lang="pug">
  v-navigation-drawer(
      persistent
      :mini-variant="isMiniVariant" 
      :value="drawerIsOpen"
      fixed
      app
      enable-resize-watcher
      v-resize="handleResize")
      v-list
        v-list-tile(
          value="true" 
          v-for="(item, index) in navigationItems"
          :key="index"
          :to="item.href")
          v-list-tile-action
            v-icon(v-html="item.icon")
          v-list-tile-content
            v-list-tile(v-text="item.title")
</template>

<script>
export default {
  name: "MainNavigation",
  props: {
    miniVariant: Boolean,
    items: Array,
    drawer: Boolean
  },
  methods: {
    handleResize() {
      this.$emit("resize");
    }
  },
  computed: {
    isMiniVariant() {
      return this.miniVariant;
    },
    navigationItems() {
      return this.items;
    },
    drawerIsOpen() {
      return this.drawer;
    }
  }
};
</script>
