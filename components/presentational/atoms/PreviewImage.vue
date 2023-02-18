<template lang="pug">
.preview
  img(:src="preview")
</template>

<script setup>
const props = defineProps({
  image: [String, Blob],
});

const preview = computed(() => {
  if (!props.image) return;

  if (typeof props.image === "string") {
    return props.image;
  } else {
    return URL.createObjectURL(props.image);
  }
});
</script>

<style lang="sass" scoped>
.preview
  display: flex
  flex-wrap: wrap
  img
    width: calc(50% - 2px)
    height: auto
    margin-bottom: 5px
    &:nth-child(odd)
      margin-right: 4px
</style>
