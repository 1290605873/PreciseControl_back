<template>
    <div class="tool">
        <el-form inline size="middle" ref="form">
            <el-form-item label="APPID">
                <el-input v-model="searchData.APPID" clearable placeholder="请输入APPID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="Search">
                    查询
                </el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableList"
                :height="tableHeight">
            <el-table-column
                    align="center"
                    label="菜单名称"
                    prop="Name"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="链接"
                    prop="Url">
                <template slot-scope="scope">
                    <el-popover placement="top-start" title="字段权限" trigger="hover" >
                        <div v-html="setstyles(scope.row.Url)" style="max-width: 400px"></div>
                        <span slot="reference">{{ scope.row.Url | fizeLen }}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="菜单ID"
                    prop="Id"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <!--<Pagination-->
                <!--v-show="pages.total>0"-->
                <!--:total="pages.total"-->
                <!--:page.sync="pages.page"-->
                <!--:limit.sync="pages.limit"-->
                <!--@pagination="pageChange"-->
        <!--&gt;</Pagination>-->
    </div>
</template>

<script>
    // import Pagination from '@/components/Pagination'
    export default {
        name: "index",
        // components: {
        //     Pagination
        // },
        filters: {
            // 过滤控件样式展示
            fizeLen: function (value) {
                if (!value) return '';
                if(value.length>150){
                    return value.substr(0,150)+'...'
                }else{
                    return value;
                }
            },
        },
        data() {
            return {
                searchData: {
                    APPID: ""
                },
                // pages: { // 分页
                //     limit: 20,
                //     page: 1,
                //     total: 3
                // },
                tableList:[],// 列表数据
                tableHeight: 0,// 列表高度
            }
        },
        mounted() {
            // 初始化列表高度
            this.$nextTick(() => {
                this.tableHeight = document.body.clientHeight - this.$refs.form.$el.clientHeight - 120
            })
        },
        methods:{
            // 查询列表
            Search() {
                // this.pages.page = 1
                this.getTableList()
            },
            // 翻页
            pageChange(v) {
                this.pages.page = v.page
                this.pages.limit = v.limit
                this.getTableList()
            },
            // 获取列表
            getTableList() {
                let datas = {
                    // AppId:"cb5d29ee-8ee4-44c4-93af-c0118e87c8eb",
                    AppId: this.searchData.APPID,
                    Filter: "jianguan"
                };
                let params = {
                    url:"http://api.iuoooo.com/bac.api/Jinher.AMP.BAC.SV.AppDataServiceSV.svc/GetAppH5Menus",
                    params: JSON.stringify(datas)
                }
                console.log(params);
                this.$api.getcrossDomain(params).then((res)=>{
                    if(res.IsSuccess){
                        this.tableList = res.Data
                    }else{
                        this.tableList = []
                    }
                })
            },
            // 控件列表选中弹框过滤
            setstyles(value) {
                let AllValue = "<p style='font-weight: bold;word-break: break-all'>"+value+"</p>";
                return AllValue
            },
        }
    }
</script>

<style scoped>
    .tool {
        padding: 10px;
    }
</style>
