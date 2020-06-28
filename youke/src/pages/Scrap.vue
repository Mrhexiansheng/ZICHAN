<template>
    <el-container>
        <el-header height="30px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>信息修改</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-card class="card">
            <el-tabs  v-model="activeName">
                <el-tab-pane label="借用" name="first">
                    <el-col :span="14" style="margin-bottom: 20px">
                        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
                        <el-button type="primary" icon="el-icon-plus" @click="del">还原</el-button>
                        <el-button icon="el-icon-printer" @click="del">打印</el-button>
                        <el-button icon="el-icon-s-promotion" @click="del">导出</el-button>
                    </el-col>
                    <el-col :span="10">
                        <el-date-picker
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                        <el-button icon="el-icon-search" style="margin-left: 10px"></el-button>
                    </el-col>
                    <template>
                        <el-table
                                :data="tableData"
                                border
                                v-loading="loading"
                                @selection-change="handleSelectionChange"
                                style="width: 100%;">
                            <el-table-column
                                    fixed
                                    type="selection"
                                    align="center"
                                    fiexd
                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="state"
                                    label="状态"
                                    width="100">
                                <template #default="obj">
                                    <el-button type="primary" round size="mini" v-if="obj.row.state===1">闲置</el-button>
                                    <el-button type="success" round size="mini" v-if="obj.row.state===2">借用</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="barcode"
                                    label="借用单号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="btime"
                                    label="借用时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="buser"
                                    label="借用人"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="bpeople"
                                    label="借用处理人"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="rpeople"
                                    label="归还处理人"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="retime"
                                    label="预计归还时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    prop="retime"
                                    label="归还时间"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                                    feixed="right"
                                    width="100">
                                <template #default="obj">
                                    <el-button type="text" size="small" @click="show(obj.row.id)">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <el-pagination
                    style="margin-top: 20px"
                    background
                    :page-sizes="[5, 10, 15, 20]"
                    layout="sizes, prev, pager, next"
                    :current-page.sync="page"
                    @current-change="currentChange"
                    :page-size.sync="size"
                    @size-change="sizeChange"
                    :total="total">
            </el-pagination>
        </el-card>
        <el-dialog
                title="借用单"
                :visible.sync="dialogVisible"
                width="75%"
        >
            <el-form  label-width="88px" :model="form" ref="myForm" :rules="rules">
                <el-tabs tab-position="left" style="height: auto;">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item  label=" 借用人"  prop="name">
                                <el-input  class="input-with-select">
                                    <el-button slot="append" icon="el-icon-s-custom"></el-button>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="借出日期"  prop="usetime">
                                <el-date-picker
                                        type="date"
                                        v-model="form.usetime"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择借出日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label=" 预计归还"  prop="retime">
                                <el-date-picker
                                        type="date"
                                        v-model="form.retime"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择预计归还日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item></el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="借出处理人">
                                <el-select placeholder="处理人"  v-model="form.company">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label=" 预计归还"  prop="retime">
                                <el-date-picker
                                        type="date"
                                        v-model="form.retime"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择预计归还日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="归还处理人">
                                <el-input placeholder="处理人"  v-model="form.space"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item style="height: 40px;">

                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>

                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item  label="说明">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-model="form.remarks"
                                        placeholder="借用备注"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-button>选择资产</el-button> <el-button type="danger">删除</el-button>
                    </el-row>
                    <el-table
                            border
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-top: 20px">
                        <el-table-column
                                type="selection"
                                fixed
                                align="center"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="资产名称"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="资产类型"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="model"
                                label="规格型号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="sequence"
                                label="产品序列"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="计量单位"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="amount"
                                label="金额"
                                width="100">
                        </el-table-column>


                        <el-table-column
                                prop="buyingtime"
                                label="购买时间"
                                width="100">
                        </el-table-column>

                        <el-table-column
                                prop="manager"
                                label="管理员"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="location"
                                label="存放地点"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="limit"
                                label="使用期限"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="src"
                                label="来源"
                                width="100">
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="借用单"
                :visible.sync="dialogVisible2"
                width="75%"
        >
            <el-form  label-width="88px" :model="form" ref="myForm" :rules="rules">
                <el-tabs tab-position="left" style="height: auto;">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item  label=" 借用人"  prop="buser">
                                <el-input  class="input-with-select" v-model="form.buser" :readonly="true">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="借出日期"  prop="btime">
                                <el-date-picker
                                        type="date"
                                        :readonly="true"
                                        v-model="form.btime"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择借出日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label=" 预计归还"  prop="retime">
                                <el-date-picker
                                        type="date"
                                        v-model="form.retime"
                                        :readonly="true"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择预计归还日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="归还处理人">
                                <el-input placeholder="处理人"  v-model="form.rpeople" :readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label="借出处理人">
                                <el-input placeholder="处理人"  v-model="form.bpeople" :readonly="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item  label=" 预计归还"  prop="retime">
                                <el-date-picker
                                        type="date"
                                        :readonly="true"
                                        v-model="form.retime"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择预计归还日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="16">
                            <el-form-item  label="说明">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-model="form.remarks"
                                        placeholder="借用备注"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-button>选择资产</el-button> <el-button type="danger">删除</el-button>
                    </el-row>
                    <el-table
                            border
                            @selection-change="handleSelectionChange"
                            style="width: 100%;margin-top: 20px">
                        <el-table-column
                                type="selection"
                                fixed
                                align="center"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="资产名称"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="资产类型"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="model"
                                label="规格型号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="sequence"
                                label="产品序列"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="计量单位"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="amount"
                                label="金额"
                                width="100">
                        </el-table-column>


                        <el-table-column
                                prop="buyingtime"
                                label="购买时间"
                                width="100">
                        </el-table-column>

                        <el-table-column
                                prop="manager"
                                label="管理员"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="location"
                                label="存放地点"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="limit"
                                label="使用期限"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="src"
                                label="来源"
                                width="100">
                        </el-table-column>
                    </el-table>
                </el-tabs>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import axios from "axios"
    export default {
        name: "Borrow",
        data:()=>{
            return {
                activeName:"first",
                tableData:[],
                loading:true,
                dialogVisible:false,
                dialogVisible2:false,
                total:0,
                page:1,
                size:5,
                search:"",
                form:{
                    barcode:"",
                    btime: "",
                    buser: "",
                    bpeople: "",
                    rpeople: "",
                    retime: "",
                },
                url:"https://www.easy-mock.com/mock/5d2d5079f0939f1f0ce94a9c/dingai/borrow"
            }
        },
        methods:{
            fetchData() {
                axios.get(this.url, {
                    params: {page: this.page, size: this.size, search: this.search}
                }).then(res => {
                    if (res.data.data.code === 200) {
                        this.tableData = res.data.data.data;
                        this.loading = false;
                        this.total = res.data.data.total;
                    } else {
                        this.$message.error("请求失败");
                    }
                })
            },
            add(){
                this.dialogVisible=true;
            },
            submit(){
                this.$refs.myForm.validate((res)=>{
                    if(res){
                        axios.post(this.url,this.form).then((res)=>{
                            if(res.data.data.code===200){
                                this.$message.success("新增成功");
                                this.dialogVisible=false;
                                this.fetchData();
                                this.$refs.myForm.resetFields();
                            }
                        })
                    }else{
                        return false;
                    }
                })
            },
            handleSelectionChange(val) {
                this.dels=val.map(v=>v.id);
            },
            del(){
                if(this.dels.length===0){
                    this.$message("还未选中要删除的条目");
                    return;
                }
                this.$confirm('是否已经确认归还资产信息, 是否继续?', '资产归还确认提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("https://www.easy-mock.com/mock/5d2d5079f0939f1f0ce94a9c/dingai/property",
                        {params:{id:this.dels.toString()}}).then(res=>{
                        if(res.data.data.code===200){
                            this.$message.success("归还成功");
                            this.fetchData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消归还'
                    });
                });
            },
            show(id){
                axios.get(this.url,{
                    params:{
                        id
                    }
                }).then((res)=>{
                    if(res.data.data.code===200){
                        this.form=res.data.data.data;
                    }
                });
                this.dialogVisible2=true;
            },
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<style scoped>
    .card{
        width: 100%;
    }
</style>