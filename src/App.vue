<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        methods: {},
        // watch: {
        //     $route(to, from) {
        //         debugger;
        //         window.console.log(to);
        //         // window.console.log(from);
        //         // to.fullPath = to.fullPath+"$time="+new Date().getTime();
        //         // to.query.time = +new Date().getTime();
        //         this.$router.push({
        //             path:to.path,
        //             query:{
        //                 t:Date.now(),
        //             },
        //         });
        //     }
        // },

    }
</script>
<style>
  #app{
    background-color: rgba(255,255,255,1)
  }
</style>
