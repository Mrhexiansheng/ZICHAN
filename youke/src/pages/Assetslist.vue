<template>
    <div>
        <el-breadcrumb separator="/" class="nav">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>资产登记</el-breadcrumb-item>
            <el-breadcrumb-item>资产清单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-tabs v-model="activeName">
                <el-tab-pane label="资产登记" name="first"></el-tab-pane>
            </el-tabs>
            <el-row style="margin-bottom: 10px">
                <el-col :span="18" style="line-height: 40px">
                    <el-dropdown size="small" split-button type="primary" style="margin-right: 10px"  @command="handleCommand">
                        <i class="el-icon-upload2"></i>
                        使用公司
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="obj in title" :command="obj">{{obj}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" size="small" @click="dialogFormVisible = true">
                        <i class="el-icon-pear"></i>
                        导出
                    </el-button>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select search">
                        <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <template>
                <el-table
                        :data="tableData"
                        border
                        v-loading="loading"
                        @selection-change="selectionChange"
                        :span-method="arraySpanMethod"
                        style="width: 100%;margin-bottom: 10px"
                >
                    <el-table-column
                            type="selection"
                            width="55"
                            align="center"
                            fixed>
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="资产状态"
                            width="100">
                        <template #default="state">
                            <el-row>
                                <el-button type="success" round size="mini" v-if="state.row.state===1">闲置</el-button>
                                <el-button type="primary" round size="mini" v-if="state.row.state===2">在用</el-button>
                                <el-button type="warning" round size="mini" v-if="state.row.state===3">维修中</el-button>
                                <el-button type="danger" round size="mini" v-if="state.row.state===4">报废</el-button>
                                <el-button type="info" round size="mini" v-if="state.row.state===5">借用</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="barcode"
                            label="资产条码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="资产名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="资产类型"
                            width="180">
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
                            prop="price"
                            label="金额"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="存放地点"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="company"
                            label="使用公司"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="department"
                            label="使用部门"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="购买时间"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="person"
                            label="使用人"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="administrator"
                            label="管理员"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="存放地点"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="deadline"
                            label="使用期限"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="source"
                            label="来源"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="100"
                            fixed="right">
                        <template #default="cz">
                            <el-row>
                                <el-button type="text" @click="view(cz.row.id)">查看</el-button>
                                <el-button type="text" @click="edit(cz.row.id)">编辑</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        background
                        layout=" sizes, prev, pager, next"
                        :page-size="size"
                        :total="total"
                        :page-sizes="[10, 20, 30, 40]"
                        @size-change="sizeChange"
                        @current-change="currentChange">
                </el-pagination>
            </template>
            <template>
                <el-dialog title="资产登记" :visible.sync="dialogFormVisible" width="80%">
                    <el-tabs :tab-position="tabPosition" style="height: auto;">
                        <el-tab-pane label="基本信息">
                            <el-row>
                                <el-form label-width="80px" :model="form" :rules="rules" ref="form">
                                    <el-col :span="8">
                                        <el-form-item label="资产条码">
                                            <el-input :disabled="true" placeholder="自动生成"
                                                      v-model="form.barcode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产名称" prop="name">
                                            <el-input placeholder="资产名称" v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产类型">
                                            <el-select v-model="form.type" placeholder="资产类型">
                                                <el-option
                                                        v-for="item in form.options"
                                                        :key="item.type"
                                                        :label="item.label"
                                                        :value="item.type">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="规格型号">
                                            <el-input placeholder="规格型号" v-model="form.model"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="SN号">
                                            <el-input placeholder="SN号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="计量单位">
                                            <el-input placeholder="计量单位" v-model="form.unit"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="金额">
                                            <el-input placeholder="金额" v-model="form.price"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用公司">
                                            <el-select placeholder="使用公司" v-model="form.company">
                                                <el-option
                                                        v-for="item in form.options1"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用部门">
                                            <el-select placeholder="使用部门" v-model="form.department">
                                                <el-option
                                                        v-for="item in form.options2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="购买时间">
                                            <el-date-picker
                                                    type="date"
                                                    placeholder="购买时间"
                                                    v-model="form.time">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用人">
                                            <el-select placeholder="使用人" v-model="form.person">
                                                <el-option
                                                        v-for="item in form.options3"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="管理员">
                                            <el-select v-model="form.administrator" placeholder="管理员">
                                                <el-option
                                                        v-for="item in form.options4"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="存放地点">
                                            <el-select v-model="form.address" placeholder="存放地点">
                                                <el-option
                                                        v-for="item in form.options5"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用期限">
                                            <el-input placeholder="使用期限(月)" v-model="form.deadline"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="来源">
                                            <el-select v-model="form.source" placeholder="来源">
                                                <el-option
                                                        v-for="item in form.options6"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-form-item label="备注">
                                            <el-input
                                                    type="textarea"
                                                    :autosize="{ minRows: 2, maxRows: 4}"
                                                    placeholder="备注">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产照片">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    action="https://jsonplaceholder.typicode.com/posts/"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon icon"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="维保信息">
                            <el-row>
                                <el-form label-width="80px">
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="资产登记" :visible.sync="dialogFormVisible" width="80%">
                    <el-tabs :tab-position="tabPosition" style="height: auto;">
                        <el-tab-pane label="基本信息">
                            <el-row>
                                <el-form label-width="80px" :model="form" :rules="rules" ref="form">
                                    <el-col :span="8">
                                        <el-form-item label="资产条码">
                                            <el-input :disabled="true" placeholder="自动生成"
                                                      v-model="form.barcode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产名称" prop="name">
                                            <el-input placeholder="资产名称" v-model="form.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产类型">
                                            <el-select v-model="form.type" placeholder="资产类型">
                                                <el-option
                                                        v-for="item in form.options"
                                                        :key="item.type"
                                                        :label="item.label"
                                                        :value="item.type">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="规格型号">
                                            <el-input placeholder="规格型号" v-model="form.model"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="SN号">
                                            <el-input placeholder="SN号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="计量单位">
                                            <el-input placeholder="计量单位" v-model="form.unit"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="金额">
                                            <el-input placeholder="金额" v-model="form.price"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用公司">
                                            <el-select placeholder="使用公司" v-model="form.company">
                                                <el-option
                                                        v-for="item in form.options1"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用部门">
                                            <el-select placeholder="使用部门" v-model="form.department">
                                                <el-option
                                                        v-for="item in form.options2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="购买时间">
                                            <el-date-picker
                                                    type="date"
                                                    placeholder="购买时间"
                                                    v-model="form.time">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用人">
                                            <el-select placeholder="使用人" v-model="form.person">
                                                <el-option
                                                        v-for="item in form.options3"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="管理员">
                                            <el-select v-model="form.administrator" placeholder="管理员">
                                                <el-option
                                                        v-for="item in form.options4"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="存放地点">
                                            <el-select v-model="form.address" placeholder="存放地点">
                                                <el-option
                                                        v-for="item in form.options5"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="使用期限">
                                            <el-input placeholder="使用期限(月)" v-model="form.deadline"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="来源">
                                            <el-select v-model="form.source" placeholder="来源">
                                                <el-option
                                                        v-for="item in form.options6"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <el-form-item label="备注">
                                            <el-input
                                                    type="textarea"
                                                    :autosize="{ minRows: 2, maxRows: 4}"
                                                    placeholder="备注">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="资产照片">
                                            <el-upload
                                                    class="avatar-uploader"
                                                    action="https://jsonplaceholder.typicode.com/posts/"
                                                    :show-file-list="false"
                                                    :on-success="handleAvatarSuccess"
                                                    :before-upload="beforeAvatarUpload">
                                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon icon"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="维保信息">
                            <el-row>
                                <el-form label-width="80px">
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="活动名称">
                                            <el-input></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-form>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </div>
                </el-dialog>
            </template>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Assetslist",
        data: () => {
            let validateName = (rule, value, callback) => {
                let exp = /[\u4E00-\u9FA5]{2,4}/;
                if (value.length < 2) {
                    callback(new Error("资产名称大于两位数"))
                } else if (!exp.test(value)) {
                    callback(new Error("资产名称必须是中文"))
                }
            };
            return {
                title:[],
                activeName: "first",
                tabPosition: 'left',
                search: "",
                page: 1,
                size: 10,
                total: 0,
                tableData: [],
                loading: true,
                dialogTableVisible: false,
                dialogFormVisible: false,
                arr: [],
                imageUrl: "",
                state1: true,
                form: {
                    id: Math.floor(Math.random() * 1000),
                    state: Math.ceil(Math.random() * 5),
                    barcode: Math.floor(Math.random() * 100000000),
                    name: "",
                    type: "",
                    options: [{
                        value: '01',
                        label: '01'
                    }, {
                        value: '02',
                        label: '02'
                    }, {
                        value: '03',
                        label: '03'
                    }],
                    options1: [{
                        value: '华为',
                        label: '华为'
                    }, {
                        value: '中兴',
                        label: '中兴'
                    }, {
                        value: '小米',
                        label: '小米'
                    }],
                    options2: [{
                        value: '研发部',
                        label: '研发部'
                    }, {
                        value: '市场部',
                        label: '市场部'
                    }, {
                        value: '人事部',
                        label: '人事部'
                    }],
                    options3: [{
                        value: '张三',
                        label: '张三'
                    }, {
                        value: '李四',
                        label: '李四'
                    }, {
                        value: '王五',
                        label: '王五'
                    }],
                    options4: [{
                        value: '张三',
                        label: '张三'
                    }, {
                        value: '李四',
                        label: '李四'
                    }, {
                        value: '王五',
                        label: '王五'
                    }],
                    options5: [{
                        value: '库房',
                        label: '库房'
                    }, {
                        value: '办公室',
                        label: '办公室'
                    }, {
                        value: '会议室',
                        label: '会议室'
                    }],
                    options6: [{
                        value: '购入',
                        label: '购入'
                    }, {
                        value: '自主研发',
                        label: '自主研发'
                    }],
                    model: "",
                    unit: "",
                    price: "",
                    time: "",
                    deadline: "",
                    company: "",
                    department: "",
                    person: "",
                    administrator: "",
                    address: "",
                    source: "",

                },
                rules: {
                    name: [
                        {required: true, message: "请输入资产名称", trigger: 'blur'},
                        {validator: validateName, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            getfecth() {
                axios.get("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property", {
                    params: {
                        page: this.page,
                        size: this.size
                    },
                }).then(res => {
                    if (res.data.data.code === 200) {
                        this.tableData = res.data.data.data;
                        this.total = res.data.data.total;
                        this.title = res.data.data.title;
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
                if (this.search === "") {
                    this.$message.error("请重新输入要搜索的内容");
                    return;
                }
                axios.get("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property", {
                    params: {
                        keywords: this.search,
                    },
                }).then(res => {
                    if (res.data.data.code === 200) {
                        this.tableData = res.data.data.data;
                        this.total = res.data.data.total;
                    } else {
                        this.$message.error("搜索失败")
                    }
                })
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {

            },
            selectionChange(selection) {
                this.arr = selection.map(v => v.id);
                console.log(this.arr.toString());
            },
            del() {
                if (this.arr.length === 0) {
                    this.$message.error("请重新选择要删除的选项");
                    return
                }
                axios.delete("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property", {
                    params: {
                        ids: this.arr.toString(),
                    },
                }).then(res => {
                    if (res.data.data.code === 200) {
                        this.$message.success("删除成功");
                        this.getfecth();
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submit() {
                this.dialogFormVisible = true;
                this.$refs.form.validate((res) => {
                    if (res) {
                        axios.post("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property").then(res => {
                            if (res.data.data.code === 200) {
                                this.$message.success("添加成功");
                                this.dialogFormVisible = false;
                                this.getfecth();
                            } else {
                                this.$message.error("添加失败")
                            }
                        })
                    } else {
                        this.$message.error("添加失败")
                    }
                });
            },
            view(id) {
                // this.dialogFormVisible = true;
                alert(id);
                axios.put("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property", {
                    params: {
                        id
                    }
                }).then(res => {
                    if (res.data.data.code === 200) {

                    } else {
                        this.$message.error("查询失败")
                    }
                })
            },
            edit() {

            },
            handleCommand(command) {
                axios.get("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/property",{
                    params:{
                        command
                    }
                }).then(res=>{
                    if (res.data.data.code === 200) {
                        this.tableData = res.data.data.data;
                        this.total = res.data.data.total;
                    } else {
                        this.$message.error("搜索失败")
                    }
                })
            }
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

    .search {
        width: 400px;
        float: right;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 250px;
    }

    .avatar-uploader:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 250px;
        line-height: 120px;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>