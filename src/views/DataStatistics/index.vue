<template>
<div class="tool">
    <el-form inline size="middle" ref="form">
        <el-form-item>
            <el-button type="primary" size="mini" @click="getFormData">
                获取当前录入表单数据
            </el-button>
            <el-button type="primary" size="mini" @click="getFormInfos">
                获取详情数据
            </el-button>
            <el-button type="danger" size="mini" @click="operateDatabase">
                操作当前数据库
            </el-button>
        </el-form-item>
    </el-form>
    <el-table :data="tableList" :height="tableHeight" style="width: 100%" stripe>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column align="left" label="表名" prop="tableName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" label="表单Id" prop="formId">
        </el-table-column>
        <el-table-column align="left" label="表单名称" prop="formName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="left" label="数据量" prop="dataCount" show-overflow-tooltip>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableList: [], // 列表数据
            tableHeight: 0, // 列表高度
        }
    },
    mounted() {
        // 初始化列表高度
        this.$nextTick(() => {
            this.tableHeight = document.body.clientHeight - this.$refs.form.$el.clientHeight - 120
        })
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 4 === 1) {
                return 'warning-row';
            } else if (rowIndex % 4 === 2) {
                return '';
            } else if (rowIndex % 4 === 3) {
                return 'success-row';
            }
            return '';
        },
        getFormData() {
            this.$api.getInputFormAmount().then((res) => {
                if (res > 0) {
                    this.$alert('录入表单数量为：' + res, '', {
                        confirmButtonText: '确定'
                    });
                }
            })
        },
        confirmOperateDataBase() {
            this.$api.operateDatabase().then((res) => {
                if (res.success == 1) {
                    this.$message({
                        message: '数据操作成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(res.mes);
                }
            });
        },
        operateDatabase() {
            this.$confirm('此操作会先进行数据操作，时间较长,请慎重进行, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let msgRet = await this.confirmOperateDataBase();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消执行!'
                });
            });
        },
        getFormInfos() {
            this.$prompt('请输入查询数量', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\+?[1-9][0-9]*$/,
                inputErrorMessage: '请输入非零正整数'
            }).then(({
                value
            }) => {
                this.getTableList(value);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        // 获取列表
        getTableList(value) {
            let datas = {
                count: value
            };
            this.$api.getFormInfos(datas).then((res) => {
                if (res.length > 0) {
                    let list = [];
                    res.forEach((item) => {
                        let info = {
                            tableName: '',
                            formId: '',
                            formName: '',
                            dataCount: ''
                        };
                        info.tableName = item[0];
                        info.formId = item[1];
                        info.formName = item[2];
                        info.dataCount = item[3];
                        list.push(info);
                    })
                    this.tableList = list;
                } else {
                    this.tableList = [];
                }
            })
        },
        // 控件列表选中弹框过滤
        setstyles(value) {
            let AllValue = "<p style='font-weight: bold;word-break: break-all'>" + value + "</p>";
            return AllValue
        },
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
