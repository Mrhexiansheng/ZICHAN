<template>
    <el-container>
        <el-header height="30px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>维修管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-card class="card">
            <el-col :span="15" style="margin-bottom: 20px">
                <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
                <el-button icon="el-icon-printer" >打印</el-button>
                <el-button icon="el-icon-s-promotion" >导出</el-button>
            </el-col>
            <el-col :span="9">
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
                            type="selection"
                            align="center"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                            width="100">
                        <template #default="obj">
                            <el-button type="primary" round size="mini" v-if="obj.row.state===1">已取消</el-button>
                            <el-button type="success" round size="mini" v-if="obj.row.state===2">已报修</el-button>
                            <el-button type="info" round size="mini" v-if="obj.row.state===3">已接单</el-button>
                            <el-button type="warning" round size="mini" v-if="obj.row.state===4">维修中</el-button>
                            <el-button type="danger" round size="mini" v-if="obj.row.state===5">维修失败</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="barcode"
                            label="维修单号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="btime"
                            label="保修时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="bpeople"
                            label="报修人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="rpeople"
                            label="维修人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="spend"
                            label="维修花费"
                            width="155">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            >
                        <template #default="obj">
                            <el-button type="text" size="small" @click="show">查看</el-button>
                            <el-button type="text" size="small" @click="edit">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
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
                title="新增维修单"
                :visible.sync="dialogVisible"
                width="75%"
                :before-close="handleClose">
            <el-steps :active="active" finish-status="success">
                <el-step title="报修"></el-step>
                <el-step title="已接单"></el-step>
                <el-step title="维修中"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
                <el-form  label-width="88px" :model="form" ref="myForm" :rules="rules">
                    <el-tabs tab-position="left" style="height: auto;">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="维修单号">
                                    <el-input
                                            :disabled="true">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="报修时间">
                                    <el-date-picker
                                            style="width:100%"
                                            type="date"
                                            placeholder="选择领用日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item  label=" 报修人"  prop="name">
                                    <el-input  class="input-with-select">
                                        <el-button slot="append" icon="el-icon-s-custom"></el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item  label="说明">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            v-model="form.remarks"
                                            placeholder="报废说明"
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
            title="查看维修单"
            :visible.sync="dialogVisible1"
            width="75%"
            :before-close="handleClose">
        <el-steps :active="active" finish-status="success">
            <el-step title="报修"></el-step>
            <el-step title="已接单"></el-step>
            <el-step title="维修中"></el-step>
            <el-step title="已完成"></el-step>
        </el-steps>
        <el-form  label-width="80px" :model="form2" ref="myForm" :rules="rules">
            <el-tabs tab-position="left" style="height: auto;">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="维修单号">
                            <el-input
                                    :readonly="true"
                                    v-model="form2.num"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报修时间">
                            <el-date-picker
                                    style="width:100%"
                                    :readonly="true"
                                    type="date"
                                    v-model="form2.time"
                                    placeholder="选择领用日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="报修人">
                            <el-input placeholder="报修人"  class="input-with-select" v-model="form2.user" :readonly="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维修状态">
                            <el-input placeholder="维修状态"  class="input-with-select" v-model="form2.state" :readonly="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维修人">
                            <el-input placeholder="报修人"  class="input-with-select" v-model="form2.people" :readonly="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维修时间">
                            <el-date-picker
                                    style="width:100%"
                                    :readonly="true"
                                    v-model="form2.date"
                                    type="date"
                                    placeholder="选择维修日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item  label="报修说明">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    :readonly="true"
                                    v-model="form2.sp"
                                    placeholder="报废说明"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item  label="维修说明">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    :readonly="true"
                                    v-model="form2.db"
                                    placeholder="报废说明"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维修费用">
                            <el-input placeholder="报修人"  class="input-with-select" v-model="form2.spend" :readonly="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
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
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="submit1">确 定</el-button>
  </span>
    </el-dialog>
        <el-dialog
                title="查看维修单"
                :visible.sync="dialogVisible2"
                width="75%"
                :before-close="handleClose">
            <el-steps :active="active" finish-status="success">
                <el-step title="报修"></el-step>
                <el-step title="已接单"></el-step>
                <el-step title="维修中"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
            <el-form  label-width="80px" :model="form2" ref="myForm" :rules="rules">
                <el-tabs tab-position="left" style="height: auto;">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="维修单号">
                                <el-input
                                        v-model="form2.num"
                                        :disabled="true">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="报修时间">
                                <el-date-picker
                                        style="width:100%"
                                        type="date"
                                        v-model="form2.time"
                                        placeholder="选择领用日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="报修人">
                                <el-input placeholder="报修人"  class="input-with-select" v-model="form2.user">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修状态">
                                <el-input placeholder="维修状态"  class="input-with-select" v-model="form2.state">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修人">
                                <el-input placeholder="报修人"  class="input-with-select" v-model="form2.people">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修时间">
                                <el-date-picker
                                        style="width:100%"
                                        v-model="form2.date"
                                        type="date"
                                        placeholder="选择维修日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item  label="报修说明">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-model="form2.sp"
                                        placeholder="报废说明"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item  label="维修说明">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        v-model="form2.db"
                                        placeholder="维修说明"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修费用">
                                <el-input placeholder="报修人"  class="input-with-select" v-model="form2.spend">
                                </el-input>
                            </el-form-item>
                        </el-col>
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
    <el-button type="primary" @click="submit2">确 定</el-button>
  </span>
        </el-dialog>
    </el-container>

</template>

<script>
    import axios from "axios"
    export default {
        name: "repair",
        data:()=>{
            return{
                tableData:[],
                active:0,
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                total:0,
                page:1,
                size:10,
                search:"",
                form:{
                    barcode:"",
                    btime: "",
                    bpeople: "",
                    rpeople: "",
                    spend:"",
                    state:""
                },
                form2:{
                    num:"785696",
                    time:"2019-08-01",
                    user:"小红",
                    people:"小强",
                    date:"2019-08-11",
                    sp:"不能打字",
                    db:"更换墨盒",
                    spend:"98"
                }
            }
        },
        methods:{
            fetchData(){
                axios.get("https://www.easy-mock.com/mock/5d2d5079f0939f1f0ce94a9c/dingai/repair",{
                    params:{page:this.page,size:this.size,search:this.search}
                }).then(res=>{
                    if(res.data.data.code===200){
                        this.tableData=res.data.data.data;
                        this.loading=false;
                        this.total=res.data.data.total;
                    }else{
                        this.$message.error("请求失败");
                    }
                })
            },
            currentChange(){
                this.fetchData();
            },
            sizeChange(){
                this.fetchData();
            },
            searchData(){
                this.page=1;
                this.fetchData();
            },
            add(){
                this.dialogVisible=true;
            },
            submit(){
                this.$message.success("添加成功");
                this.dialogVisible=false
            },
            show(){
                this.dialogVisible1=true;
            },
            submit1(){
                this.dialogVisible1=false
            },
            edit(){
                this.dialogVisible2=true;
            },
            submit2(){
                this.$message.success("编辑成功");
                this.dialogVisible2=false
            },
        },
        mounted(){
            this.fetchData();
        }
    }
</script>

<style scoped>
.card{
    width:100%;
}
</style>