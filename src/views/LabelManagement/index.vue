<template>
<div class="tool">
    <el-form inline size="middle" ref="form">
        <el-form-item>
            <el-button type="primary" size="mini" @click="editNotice('creat')">
                新增
            </el-button>
            <el-button type="primary" size="mini" @click="deletedatas">
                删除
            </el-button>
        </el-form-item>
        <el-form-item>
            <el-input v-model="searchName"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" @click="Search">
                查询
            </el-button>
        </el-form-item>
    </el-form>
    <el-table 
        :data="tableList"
        :height="tableHeight"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55"
            align="left">
        </el-table-column>
        <el-table-column align="center" type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column align="left" label="标签名称" prop="tableLabelName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" label="创建人" prop="creator">
        </el-table-column>
        <el-table-column align="left" label="修改人" prop="modifyOn" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" label="创建时间" prop="commCreateTime" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" label="修改时间" prop="modifyTime" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                    align="center"
                    label="操作"
                    prop="Url">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            @click="editNotice('edit',scope.row)">
                        修改
                    </el-button>
                </template>
        </el-table-column>
    </el-table>
     <Pagination
            v-show="pages.totalCount>0"
            :total="pages.totalCount"
            :page.sync="pages.pageNo"
            :limit.sync="pages.pageSize"
            @pagination="pageChange"
    ></Pagination>
    <div v-if='dialogFormVisible'>
        <el-dialog
         :title="dialogTitle"
         :before-close="close"
         :append-to-body="true"
         :visible="true"
         width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标签名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="setBName('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
     components: {
        Pagination
    },
    data() {
        return {
            tableList: [],
            tableHeight: 0, // 列表高度
            dialogFormVisible: false, // 判断显示隐藏模态框
            pages: { // 分页
                    pageSize: 20,
                    pageNo: 1,
                    totalCount: 3
                },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '请输入名称，最多10个字', trigger: 'blur' }
                ]
            },
            ruleForm: {
                name: '',
                id:''
            },
            searchName: '',
            deleteList:''
        }
    },
    mounted() {
        // 初始化列表高度
        this.$nextTick(() => {
            this.tableHeight = document.body.clientHeight - this.$refs.form.$el.clientHeight - 180
        })
    },
    created() {
        this.getTableList();
    },
    methods: {
        // 新增/编辑台账
        editNotice(creatOrEaitType,value) {
            console.log(value)
            this.dialogFormVisible = true
            if(creatOrEaitType == 'creat'){
                this.dialogTitle='新增标签'
                this.ruleForm.name = ''
                this.ruleForm.id = ''
            }else{
               this.dialogTitle='修改标签'
               this.ruleForm.name = value.tableLabelName
               this.ruleForm.id = value.id
            }
        },
        close() {
            this.dialogFormVisible = false
        },
        //新增/修改标签 确定事件
        setBName(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let datas = {
                        'tableLabelName':this.ruleForm.name,
                    };
                    if(this.ruleForm.id){
                        datas.tableLabelId=this.ruleForm.id
                    }
                    this.$api.saveTableLabel(datas).then((res) => {
                       if(res.msg == "保存成功"){
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.getTableList()
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                        
                    })
                } else {
                    return false;
                }
            });
        },
        // 删除
        deletedatas() {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = this.deleteList;
                if(!params){
                    this.$message({
                        type: 'error',
                        message: '删除条数不能为0'
                    });
                    return false
                }
                console.log(params)
                let datas = {
                    'ids':params
               };
                this.$api.tableLabelDeletes(datas).then((res) =>{
                    if(res.result == "success"){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                   this.getTableList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSelectionChange(val) {
            let idArr=[]
            val.find(item=>{
                idArr.push(item.id)
            });
            this.deleteList=idArr.join()
        },
        // 获取列表
        getTableList() {
            // this.tableList=[
            //     {
            //         'name':'名称1',
            //         'Founder':'张明',
            //         'Modified':'张敏',
            //         'creatTime':'2020-11-18 16:36:56 ',
            //         'modifyTime':'2020-11-18 16:36:56 ',
            //     },
            //     {
            //         'name':'名称2',
            //         'Founder':'张明',
            //         'Modified':'张敏',
            //         'creatTime':'2020-11-18 16:36:56 ',
            //         'modifyTime':'2020-11-18 16:36:56 ',
            //     },
            //     {
            //         'name':'名称3',
            //         'Founder':'张明',
            //         'Modified':'张敏',
            //         'creatTime':'2020-11-18 16:36:56 ',
            //         'modifyTime':'2020-11-18 16:36:56 ',
            //     }
            // ]
            // 列表数据
            let datas = {
               'pageNo':this.pages.pageNo,
               'pageSize':this.pages.pageSize,
               'tableLabelName':this.searchName
            };
            this.$api.tableLabelList(datas).then((res) => {
                console.log(res.result)
                this.tableList=res.result;
                this.pages={
                    pageSize: res.pageSize,
                    pageNo: res.pageNo,
                    totalCount: res.totalCount
                }
            })
        },
        // 翻页
        pageChange(v) {
            this.pages.pageNo = v.page
            this.pages.pageSize = v.limit
            this.getTableList()
        },
        // 查询
        Search() {
            this.pages.pageNo = 1;
            this.getTableList()
        }
    }
}
</script>
<style>
.tool {
    padding: 10px;
}

.el-table .warning-row {
    background:oldlace;
}

.el-table .success-row {
    background:#f0f9eb;
}
</style>
