<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <Suspense>
                <template #default>
                    <component :is="Component" />
                </template>
                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
        </router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    setup() {
      return {

      }
    }
}
</script>

<style lang="scss">
    .view {
        position: relative;
        @include flex(flex-start, center, column);
        width: 100vw;
        height: 100vh;
    }
</style>
