<template lang="pug">
  b-navbar(variant="light" toggleable="md")
    b-container
      b-navbar-brand(to="/") Hello World
      b-navbar-toggle(target="nav_collapse")
      b-collapse(is-nav=true)#nav_collapse
        b-navbar-nav
          b-nav-item(v-for="link in links" :key="link.href + link.name" :to="link.href") {{ link.name }}
        b-navbar-nav.ml-auto
          b-nav-form
            b-input-group
              b-form-input(placeholder="Docs, News, ..." size="sm")
              b-input-group-append
                b-btn(size="sm") Search
          b-nav-item
            b-button(variant="primary" block=true size="sm") Download
      </b-nav-form>
</template>

<script>
export default {
  name: "NavBar",
  data: () => {
    return {
      links: [
        {
          name: "Home",
          href: "/"
        },
        {
          name: "Features",
          href: "#"
        },
        {
          name: "Documentation",
          href: "#"
        },
        {
          name: "Wiki",
          href: "#"
        },
        {
          name: "Blog",
          href: "#"
        },
        {
          name: "Contribute",
          href: "#"
        }
      ]
    };
  }
};
</script>

<style scoped>
.navbar-nav:first-child {
  overflow-x: auto;
}
</style>
