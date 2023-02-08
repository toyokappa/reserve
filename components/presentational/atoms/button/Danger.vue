<template lang="pug">
button.danger-button
  slot
</template>

<style lang="sass">
.danger-button
  width: 100%
  color: $white
  background-color: $red
  padding: 8px 0
  border-radius: 3px
  &[disabled]
    background-color: $hint
</style>