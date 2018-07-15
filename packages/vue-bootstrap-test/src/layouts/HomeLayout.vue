<template lang="pug">
  div
    slot(name="navigation")
    b-container
      slot(name="content")
</template>

<script>
export default {
  name: "HomeLayout"
};
</script>
