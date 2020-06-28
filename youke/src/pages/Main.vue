<template>
    <el-container class="container">
        <el-aside class="side" width="auto">
            <div class="logo">
                <i class="el-icon-pear"></i>
                <span v-if="state===false">优客资产</span>
            </div>
            <el-menu
                    background-color="#2F3E4E"
                    text-color="#fff"
                    :collapse="state"
                    :router="state1"
            >
                <el-menu-item index="/main/dashboader">
                    <i class="el-icon-pear"></i>
                    <span slot="title">仪表盘</span>
                </el-menu-item>
                <el-menu-item index="/main/property">
                    <i class="el-icon-pear"></i>
                    <span slot="title">资产登记</span>
                </el-menu-item>
                <el-menu-item index="/main/recipients">
                    <i class="el-icon-pear"></i>
                    <span slot="title">领用退库</span>
                </el-menu-item>
                <el-menu-item index="/main/borrow">
                    <i class="el-icon-pear"></i>
                    <span slot="title">借用归还</span>
                </el-menu-item>
                <el-menu-item index="/main/message">
                    <i class="el-icon-pear"></i>
                    <span slot="title">信息修改</span>
                </el-menu-item>
                <el-menu-item index="/main/repair">
                    <i class="el-icon-pear"></i>
                    <span slot="title">维修管理</span>
                </el-menu-item>
                <el-menu-item index="/main/sarap">
                    <i class="el-icon-pear"></i>
                    <span slot="title">报废管理</span>
                </el-menu-item>
                <el-submenu index="8">
                    <template slot="title">
                        <i class="el-icon-pear"></i>
                        <span slot="title">资产统计</span>
                    </template>
                    <el-menu-item index="/main/assetslist">
                        <i class="el-icon-pear"></i>
                        <span slot="title">资产清单</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="head">
                <i :class="['menu',state ? 'el-icon-s-unfold':'el-icon-s-fold']" @click="shrink"></i>
                <el-col :span="2" class="msg">
                    <el-dropdown>
                        <span class="el-dropdown-link" style="line-height: 60px;font-size: 14px">
                            <i class="el-icon-pear"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">帮助中心</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">使用手册</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="2" class="msg">
                    <el-dropdown>
                        <span class="el-dropdown-link" style="line-height: 60px;font-size: 14px">
                            <i class="el-icon-pear"></i>
                            管理员
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">修改密码</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">修改资料</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="2" class="msg">
                    <el-dropdown>
                        <span class="el-dropdown-link" style="line-height: 60px;font-size: 14px">
                            <i class="el-icon-pear"></i>
                            消息
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-header>
            <el-main style="background: #f9f9f9;padding-top: 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main",
        data: () => ({
            state: false,
            state1: true
        }),
        methods: {
            shrink() {
                this.state = !this.state;
            },
        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
    }

    .side {
        background-color: #2F3E4E;
        color: #fff;
        /*height: 100%;*/
    }

    .logo {
        width: 100%;
        line-height: 80px;
        font-size: 22px;
        text-align: center;
    }

    .logo > i {
        margin-right: 10px;
    }

    .head {
        background: #FFFFFF;
        border-bottom: 1px solid rgb(230, 230, 230);
    }

    .menu {
        line-height: 60px;
        font-size: 30px;
    }

    ul {
        border: 0;
    }

    .msg {
        float: right;
    }
</style>