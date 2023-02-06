<template lang="pug">
button.primary-button
  slot
</template>

<style lang="sass">
.primary-button
  width: 100%
  color: $white
  background-color: $primary
  padding: 8px 0
  border-radius: 3px
  &[disabled]
    background-color: $hint
</style>