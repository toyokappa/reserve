<template lang="pug">
button.image-upload-button
  img.icon(src="@/assets/images/image.svg")
  .text 画像を選択する
</template>

<style lang="sass" scoped>
.image-upload-button
  width: 100%
  color: $white
  background-color: $dark
  padding: 4px 0
  border-radius: 3px
  display: flex
  align-items: center
  justify-content: center
  .icon
    width: 16px
    height: auto
    margin-right: 3px
  .text
    font-size: 14px
</style>