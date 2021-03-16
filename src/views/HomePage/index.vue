<template>
<div>
    <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item :index="item.index" v-for="item in routerList" @click="setRouter(item)" >{{ item.name }}</el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>
</template>

<script>
    import routes from "../../router"
    export default {
        name: "index",
        data() {
          return {
              activeIndex:1,
              routerList:[]
          }
        },
        created() {
            let routers = routes.options.routes;
            routers.map((item)=>{
                if(item.path === "/HomePage"){
                    this.routerList = item.children;
                    let children = item.children;
                    children.map((items)=>{
                        if(items.path === this.$route.path){
                            this.activeIndex = items.index
                        }
                    })
                }
            })
        },
        methods:{
            setRouter(paths) {
                this.$router.push({
                    path: paths.path
                })
            }
        }
    }
</script>

<style scoped>

</style>
