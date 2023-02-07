<template lang="pug">
BlockText.mb-line 購入するチケットを選択してください。
BlockProduct.mb-line(
  v-for="product in productList"
  :key="product.id"
  :name="product.name"
  :description="product.description"
  :price="product.price"
  :hasPurchaseLimit="product.hasPurchaseLimit"
  :purchaseLimit="product.purchaseLimit"
  @click="router.push(`/ticket/${product.id}`)"
)
</template>

<script setup>
import BlockText from '~/components/presentational/molescules/block/Text.vue'
import BlockProduct from '~/components/presentational/molescules/block/Product.vue'

import sampleData from '@/data/sample'
const { productList } = sampleData
const router = useRouter()
</script>

<style lang="sass" scoped>
</style>