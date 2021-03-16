<template lang="html">
    <div class="tool">
        <el-form inline size="middle" ref="form">
            <el-form-item>
                <el-input v-model="searchData.id" clearable placeholder="请输入表单Id"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.formName" clearable placeholder="请输入表单名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchData.orgId"
                        filterable
                        remote
                        clearable
                        :remote-method="getOrgList"
                        :loading="orgLoading"
                        placeholder="请选择组织">
                    <el-option
                            v-for="(i,j) in orgList"
                            :key="j"
                            :label="i.OrgName"
                            :value="i.OrgId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchData.categoryId" placeholder="请选择表单类型">
                    <el-option
                            v-for="(i, j) in typeList"
                            :key="j"
                            :label="i.label"
                            :value="i.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.creator" clearable placeholder="请输入创建人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.modifyOn" clearable placeholder="请输入修改人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        style="width:200px"
                        v-model="searchData.commCreateTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择创建日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        style="width:200px"
                        v-model="searchData.modifyTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择修改日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item>
                <el-select 
                     v-model="labelDate.searchId" 
                     filterable
                     remote
                     clearable
                    :remote-method="tableLabelList"
                    :loading="orgLoading"
                     placeholder="请选择表单标签">
                    <el-option
                            v-for="(i, j) in labelDate.labelList"
                            :key="i.id"
                            :label="i.label"
                            :value="i.id"></el-option>
                </el-select>
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
            <el-table-column label="名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.formName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.categoryId != '' ? typeList[scope.row.categoryId].label : typeList[0].label}}
                </template>
            </el-table-column>
            <el-table-column
                    label="标签"
                    prop="label"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="组织"
                    prop="orgName"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="创建人"
                    prop="creator"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="修改人"
                    prop="modifyOn"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="commCreateTime"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="修改时间"
                    prop="modifyTime"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="270px">
                <template slot-scope="scope">
                     <el-button
                            type="text"
                            @click="setLabel(scope.row)">
                        设置标签
                    </el-button>
                    <el-button
                            v-if="scope.row.categoryId != '2'"
                            type="text"
                            @click="goOuterLink(scope.row,1)">
                        设计
                    </el-button>
                    <el-button
                            type="text"
                            @click="goOuterLink(scope.row,2)">
                        设置
                    </el-button>
                    <el-button
                            type="text"
                            @click="goOuterLink(scope.row,3)">
                        修改
                    </el-button>
                    <el-button
                            v-if="scope.row.categoryId == 0"
                            type="text"
                            @click="goOuterLink(scope.row,4)">
                        导入数据
                    </el-button>
                    <el-button
                            v-if="scope.row.categoryId == 0"
                            type="text"
                            @click="goOuterLink(scope.row,5)">
                        模板顺序
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
                v-show="pages.total>0"
                :total="pages.total"
                :page.sync="pages.page"
                :limit.sync="pages.limit"
                @pagination="pageChange"
        ></Pagination>
        <OuterLink
                :OuterLinkShow="outerLink.show"
                :OuterLinkData="outerLink.data"
                @CloseOuterLink="CloseOuterLink">
        </OuterLink>
        <div v-if='labelDate.dialogFormVisible'>
            <el-dialog
            title="设置标签"
            :before-close="close"
            :append-to-body="true"
            :visible="true"
            width='550px'
            >
                <template>
                    <!-- @right-check-change='changeCheck' -->
                    <el-transfer
                        filterable
                        filter-placeholder="请输入标签名称"
                        v-model="labelDate.labelValue"
                        @right-check-change='changeCheck'
                        @change='changeCheck'
                        :right-default-checked='labelDate.checkVal'
                        :data="labelDate.labelList"
                        :titles="['未选标签', '已选标签']">
                    </el-transfer>
                </template>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="setBName()">确 定</el-button>
                </div>
            </el-dialog>
    </div>
    </div>
</template>


<script>
    import Pagination from '@/components/Pagination'
    import OuterLink from './outerLink.vue'

    export default {
        name: 'Home',
        components: {
            Pagination,
            OuterLink
        },
        data() {
            return {
                form: { // 提交
                    id: '',
                    formName: '',
                    orgId: '',
                    categoryId: '',
                    creator: '',
                    modifyOn: '',
                    commCreateTime: '',
                    modifyTime: ''
                },
                searchData: { // 表单
                    id: '',
                    formName: '',
                    orgId: '',
                    categoryId: '',
                    creator: '',
                    modifyOn: '',
                    commCreateTime: '',
                    modifyTime: ''
                },
                orgLoading: false, // 组织加载
                orgList: [], // 组织列表
                typeList: [ // 类型列表
                    {label: '录入表单', value: 0},
                    {label: '手机报表', value: 1},
                    {label: 'PC报表', value: 2},
                    {label: '报表页面', value: 3}
                ],
                tableList: [], // 表格
                tableHeight: 0,
                pages: { // 分页
                    limit: 20,
                    page: 1,
                    total: 0
                },
                outerLink: { // 弹层
                    show: false,
                    data: {
                        title: '',
                        width: '',
                        formId: '',
                    }
                },
                labelDate:{
                    labelList: [],//标签列表
                    searchId: '',//标签列表搜索
                    dialogFormVisible: false, // 判断显示隐藏模态框
                    labelValue: [],
                    checkVal:[], // 选中右侧数据
                    formId: ''
                }
            }
        },
        created() {
            // 需要重新更换CookieContextDTO和user, 如果存在两个JSESSIONID 删除第二个
            // var that = this;
            // if(!that.$utils.getCookie('JSESSIONID')){
            //     var cookies = "Secure; JSESSIONID=F5B4E3FDD1F42C991695380FCCC500B8; tempUserId=eff19a6b-e143-ec60-19d4-88a9ae6204fb; tempSessionId=1385644108; TY_SESSION_ID=25c75b4e-f425-464e-bf69-459d70e85c2d; Hm_lvt_3ba56120d95ba87ab56a6a0df627d0bb=1606975571; Hm_lpvt_3ba56120d95ba87ab56a6a0df627d0bb=1606986151; CookieContextDTO=%7B%22userId%22%3A%222f67d916-c224-419b-864e-e2a00573685f%22%2C%22sessionId%22%3A%22c8f68375-962d-423f-b41a-6bb2126c2a9b%22%2C%22changeOrg%22%3A%225f913c9c-20c6-4183-8f43-1143c733db07%22%7D; user=%7B%221%22%3A%7B%22account%22%3A%2218635606376%22%2C%22password%22%3A%22%22%2C%22name%22%3A%22186****6376%22%2C%22image%22%3A%22%22%2C%22lastTime%22%3A1607047914000%7D%7D; num=1"
            //     var cookieSPl = cookies.split(";");
            //     cookieSPl.forEach(function (item) {
            //         that.$utils.setCookie(item.split('=')[0], decodeURI(item.split('=')[1]), "", 10, 8)
            //     });
            // }
            this.tableLabelList();
        },
        mounted() {
            this.$nextTick(() => {
                this.tableHeight = document.body.clientHeight - this.$refs.form.$el.clientHeight - 120
            })

        },
        methods: {
            // 选中模态框右侧的标签发生变化触发
            changeCheck(value) {
                console.log('1',value)
                this.labelDate.checkVal = value;
            },
            //关闭设置标签模态框
            close() {
                this.labelDate.dialogFormVisible = false
            },
            //设置标签
            setLabel(k){
                console.log(k)
                this.labelDate.formId=k.formId
                this.labelDate.dialogFormVisible=true;
                let datas = {
                    'formId':k.formId
                };
                this.$api.getTableLabelIds(datas).then((res) => {
                    console.log(res)
                    var data=res.result.split(',')
                    this.labelDate.labelValue=data;
                    this.labelDate.checkVal=data
                })
            },
            //设置标签 确定事件
            setBName(value){
                let datas = {
                    'formId':this.labelDate.formId,
                    'ids':this.labelDate.checkVal.join(',')
                };
                this.$api.setTableLabel(datas).then((res) => {
                     if(res.result == "success"){
                        this.$message({
                            type: 'success',
                            message: '标签设置成功!'
                        });
                        this.labelDate.dialogFormVisible = false;
                        this.getTableList()
                    }else{
                        this.$message({
                            type: 'error',
                            message: '标签设置失败!'
                        });
                    }
                })
                
            },
            // 初始化
            init() {
            },
            // 获取组织列表
            getOrgList(k) {
                if (k.length < 2) {
                    this.message('请至少输入两个字符', -1)
                    return
                }
                if (this.orgLoading) {
                    this.message('正在查询中', -1)
                    return
                }
                this.orgLoading = true
                let p = {
                    params: {
                        Name: k
                    }
                }
                // 这里查询组织
                this.$api.getOrgList(p).then(res => {
                    this.orgLoading = false
                    if (res && res.IsSuccess) {

                        this.orgList = res.Data
                    }
                }).catch(() => {
                    this.orgLoading = false
                })
            },
            // 查询
            Search() {
                this.form = this.$utils.deepCopy(this.searchData)
                this.pages.page = 1
                this.getTableList()
            },
            // 获取表格数据
            getTableList() {
                let p = {
                    'pageSize': this.pages.limit,
                    'pageNo': this.pages.page,
                    'formType.formId': this.form.id,
                    'formType.formName': this.form.formName,
                    'formType.creator': this.form.creator,
                    'formType.commCreateTime': this.form.commCreateTime,
                    'formType.categoryId': this.form.categoryId,
                    'formType.modifyOn': this.form.modifyOn,
                    'formType.modifyTime': this.form.modifyTime,
                    'formType.orgId': this.form.orgId,
                    'formType.labelId':this.labelDate.searchId 
                }
                this.$api.getFormList(p).then(res => {
                    this.pages.total = res.totalCount
                    this.tableList = res.result
                }).catch(() => {
                })
            },
            // 获取标签列表
            tableLabelList(k) {
                let datas = {
                    'pageNo':1,
                    'pageSize':1000
                };
                if(k){
                  datas.tableLabelName=k  
                }
                this.labelDate.labelList=[]
                this.$api.tableLabelList(datas).then((res) => {
                    res.result.forEach((item, index) => {
                        this.labelDate.labelList.push({
                            label: item.tableLabelName,
                            key: item.id,
                            id: item.id
                        });
                    });
                })

            },
            // 翻页
            pageChange(v) {
                this.pages.page = v.page
                this.pages.limit = v.limit
                this.getTableList()
            },
            // 去设计 1 || 去设置 2 || 去修改 3 || 写入数据 || 模板顺序
            goOuterLink(o, k) {
                let url
                switch (k) {
                    case 1:
                        url = "/jc6/JForm/j-form!getDesignPage2point0.action?formId=" + o.formId
                        window.open(url, "表单设计")
                        break;
                    case 2:
                        url = "/jc6/JForm/j-form!setUp.action?currentFormId=" + o.formId + "&currentFormName=" + o.formName

                        this.outerLink = {
                            show: true,
                            data: {
                                title: '列表字段设置',
                                url: url,
                                width: "1000px",
                                height: "600px",
                            }
                        }
                        break;
                    case 3:
                        url = "/jc6/JForm/j-form!addFormPage.action?deptId=" + o.orgId + "&typeId=&formId=" + o.formId
                        this.outerLink = {
                            show: true,
                            data: {
                                title: "编辑表单",
                                url: url,
                                width: "420px",
                                height: "300px",
                            }
                        }
                        break;
                    case 4:
                        url = "/jc6/JForm/j-form!toImportData.action?&formId=" + o.formId
                        this.outerLink = {
                            show: true,
                            data: {
                                url: url,
                                title: "导入表单数据",
                                width: "700px",
                                height: "350px",
                            }
                        }
                        break;
                    case 5:
                        url = "/jc6/JForm/template!toSetTemplateOrderView.action?&formId=" + o.formId + "&modeType=1"
                        this.outerLink = {
                            show: true,
                            data: {
                                url: url,
                                title: "调整导入模板字段顺序",
                                width: "700px",
                                height: "550px"
                            }
                        }
                        break;
                }
            },
            // 关闭弹层
            CloseOuterLink() {
                this.outerLink = {
                    show: false,
                    data: {
                        title: '',
                        width: '',
                        height: '',
                        url: ''
                    }
                }
            },
        }
    }
</script>

<style lang="css" scoped>
    .tool {
        padding: 10px;
    }
</style>
