<template lang="pug">
  v-toolbar(
      app
      color="primary"
      dark)
      v-toolbar-side-icon(@click.stop="toggleDrawer")
      v-btn(
        icon
        @click.stop="toggleMiniVariant"
        v-if="isDrawerOpen && !isMobile")
        v-icon(v-html="miniVariantToggleIcon")
      v-toolbar-title(v-text="currentTitle")
      v-spacer
      v-btn(flat
        to="/settings") 
        v-icon(left) settings
        span Settings
      v-btn(flat
        to="/logout")
        v-icon(left) exit_to_app
        span Logout
</template>

<script>
export default {
  name: "MainToolbar",
  props: {
    mobile: Boolean,
    drawer: Boolean,
    title: String,
    icon: String
  },
  computed: {
    isMobile() {
      return this.mobile;
    },
    isDrawerOpen() {
      return this.drawer;
    },
    currentTitle() {
      return this.title;
    },
    miniVariantToggleIcon() {
      return this.icon;
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    },
    toggleMiniVariant() {
      this.$emit("toggleMiniVariant");
    }
  }
};
</script>
