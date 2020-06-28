<template>
    <div class="bg">
        <el-row type="flex" justify="center" class="row" align="middle">
            <el-col :span="8">
                <h2 class="title">用户登录</h2>
                <el-col :span="18">
                    <el-form :model="form" ref="form" :rules="rules">
                        <el-form-item prop="username">
                            <el-input placeholder="请输入用户名" v-model="form.username" clearable></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="请输入密码" v-model="form.password" show-password clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"  class="btn" @click="submit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Login",
        data: () => ({
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: 'blur'},
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: 'blur'},
                ]
            }
        }),
        methods: {
            submit() {
                this.$refs.form.validate((res) => {
                    if (res) {
                        this.$message.success("登录成功");
                        this.$router.push({name: "main"});
                        window.sessionStorage.setItem("login", this.form.username);
/*                        //  https://www.easy-mock.com/mock/5d2d4250113a00460bcc35a3/dingai/checklogin
                        axios.post("https://www.easy-mock.com/mock/5d2d749489a4187429346960/login/login", this.form).then(res => {
                            if (res.data.data.code === 200) {
                                this.$message.success("登录成功");
                                window.sessionStorage.setItem("login", this.form.username);
                                this.$router.push({name: "main"});
                            } else {
                                this.$message.error("登录失败")
                            }
                        })*/
                    } else {
                        this.$message.error("登录失败")
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .bg {
        width: 100%;
        height: 100%;
        background: url("../assets/img/bg.jpg");
    }

    .title {
        color: #fff;
        margin-bottom: 10px;
    }

    .row {
        height: 100%;
    }

    .btn {
        width: 100%;
    }
</style>