<template lang="pug">
.complete
  img.complete-image(src="@/assets/images/complete.png")
  .complete-title 予約が完了しました
  .complete-text
    p この度は無料体験へお申し込みいただき
    p.mb-20 誠にありがとうございました。
    p このままページを閉じていただいて
    p.mb-20 問題ございません。
    p トップページへ戻られる方は
    p 下記のリンクをクリックしてください。
  nuxt-link.back-link(to="/") トップページへ戻る
</template>

<style lang="sass" scoped>
.complete
  text-align: center
  letter-spacing: 0.05em
  padding: 50px 0 80px
  .complete-image
    width: 300px
    height: auto
    margin: 0 auto 30px
  .complete-title
    font-size: 24px
    font-weight: bold
    margin-bottom: 30px
  .complete-text
    margin-bottom: 30px
  .back-link
    color: $primary
    text-decoration: none
</style>