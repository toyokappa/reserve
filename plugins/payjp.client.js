export default defineNuxtPlugin(() => {
  return {
    provide: {
      payjp: window.Payjp(useRuntimeConfig().public.payjpApiToken)
    }
  }
})