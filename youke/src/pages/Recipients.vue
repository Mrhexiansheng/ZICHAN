<template>
    <div>
        <el-breadcrumb separator="/" class="nav">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>领用退库</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-tabs v-model="activeName">
                <el-tab-pane label="领用" name="first"></el-tab-pane>
                <el-tab-pane label="退库" name="second"></el-tab-pane>
            </el-tabs>
            <el-row style="margin-bottom: 10px">
                <el-col :span="15" style="line-height: 40px">
                    <el-button type="primary" size="small">
                        <i class="el-icon-plus"></i>
                        新增
                    </el-button>
                    <el-button size="small">
                        <i class="el-icon-plus"></i>
                        打印
                    </el-button>
                    <el-button size="small">
                        <i class="el-icon-plus"></i>
                        导出
                    </el-button>
                </el-col>
                <el-col :span="9">
                    <el-button size="middle" style="float: right" @click="searchData">
                        <i class="el-icon-search"></i>
                    </el-button>
                    <el-date-picker
                            v-model="dataSelect"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="margin-right: 20px;float: right">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    border
                    v-loading="loading"
                    @selection-change="selectionChange"
                    :span-method="arraySpanMethod"
                    style="width: 100%;margin-bottom: 10px">
                <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                        fixed>
                </el-table-column>
                <el-table-column
                        prop="order"
                        label="领用单号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="领用时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="person"
                        label="领用人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="领用部门"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="company"
                        label="领用使用公司"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="withdrawing"
                        label="预计退库时间"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="125"
                        fixed="right">
                    <template #default="cz">
                        <el-row>
                            <el-button type="text" @click="view(cz.row.id)">查看</el-button>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="sizes, prev, pager, next"
                    :page-size="size"
                    :total="total"
                    :page-sizes="[10, 20, 30, 40]"
                    @size-change="sizeChange"
                    @current-change="currentChange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Recipients",
        data: () => {
            return {
                activeName: "first",
                value1: "",
                search: "",
                page: 1,
                size: 10,
                total: 0,
                tableData: [],
                loading: true,
                dataSelect: ""
            }
        },
        methods: {
            getfecth() {
                axios.get("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/recipients", {
                    params: {
                        page: this.page,
                        size: this.size
                    }
                }).then(res => {
                    if (res.data.data.code === 200) {
                        this.tableData = res.data.data.data;
                        this.total = res.data.data.total;
                        this.loading = false;
                    } else {
                        this.$message.error("获取失败")
                    }
                })
            },
            sizeChange(val) {
                if (this.search) {
                    return;
                } else {
                    this.size = val;
                    this.getfecth()
                }
            },
            currentChange(val) {
                if (this.search) {
                    return;
                } else {
                    this.page = val;
                    this.getfecth()
                }
            },
            searchData() {
                let _this = this;
                if (this.dataSelect === "") {
                    _this.$message.error("请重新输入要搜索的日期范围");
                    return;
                }
                let startTime = Number(this.dataSelect[0].split("-").join(""));
                let endTime = Number(this.dataSelect[1].split("-").join(""));
                axios.get("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/recipients", {
                    params: {
                        startTime,
                        endTime
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data.data.code === 200) {
                        console.log(1);
                        _this.tableData = res.data.data.data;
                        _this.total = res.data.data.total;
                    } else {
                        _this.$message.error("获取失败")
                    }
                })
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {

            },
            selectionChange(selection) {
                this.arr = selection.map(v => v.id);
                console.log(this.arr.toString());
            },
        },
        mounted() {
            this.getfecth()
        }
    }
</script>

<style scoped>
    .nav {
        line-height: 50px;
        width: 100%;
    }
</style>