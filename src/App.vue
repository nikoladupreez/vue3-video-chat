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

<style>
    body {
      margin: 0;
    }
</style>
