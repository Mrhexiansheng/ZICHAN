<template>
    <div>
        <el-header style="height: 60px;padding-top: 20px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/main' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-row>
             <el-col :span="4"  v-for="item in countData" class="col">
               <div class="card">
                 <div>{{item.num}}</div>
                 <div>{{item.name}}</div>
               </div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;width: 100%;">
            <el-col :span="12" style="padding-right:20px;overflow: hidden;">
              <el-card>
                  <div slot="header" class="clearfix">
                      <span>资产概括</span>
                  </div>
                  <el-row>
                        <el-col :span="12">
                            <div ref="one" style="width: 100%;height: 300px;"></div>
                        </el-col>
                        <el-col :span="12">
                            <div ref="two" style="width: 100%;height: 300px;"></div>
                        </el-col>
                  </el-row>
              </el-card>
            </el-col>
            <el-col :span="12" style="padding-right: 20px;overflow: hidden;">
             <el-card>
                 <div slot="header" class="clearfix">
                     <span>资产状态占比</span>
                 </div>
                 <el-row>
                     <div ref="three" style="width: 100%;height: 300px;"></div>
                 </el-row>
             </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;width: 100%;">
           <el-card>
               <div slot="header" class="clearfix">
                   <span>资产分类统计</span>
               </div>
            <el-row>
                <div ref="four" style="width: 100%;height: 300px;"></div>
            </el-row>
           </el-card>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios"
    import echarts from "echarts"
    export default {
        name: "Dashboader",
        data:()=>({
            countData:[]
        }),
        mounted(){
            axios.get("https://www.easy-mock.com/mock/5d2d5079f0939f1f0ce94a9c/dingai/count").then((res)=>{
                this.countData=res.data.data.countData;
                let one=echarts.init(this.$refs.one);
                var option = {
                    title:{
                        text:"在用",
                        left:'center'
                    },
                    series: [
                        {
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value:res.data.data.usingRatio}]
                        }
                    ]
                };
                one.setOption(option);
                let two=echarts.init(this.$refs.two);
                var option = {
                    title:{
                        text:"闲置",
                        left:'center'
                    },
                    series: [
                        {
                            type: 'gauge',
                            detail: {formatter:'{value}%'},
                            data: [{value:res.data.data.freeRatio}]
                        }
                    ]
                };
                two.setOption(option);
                let three=echarts.init(this.$refs.three);
                var option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['报废','闲置','在用']
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'报废'},
                                {value:310, name:'闲置'},
                                {value:234, name:'在用'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                three.setOption(option);
                let four=echarts.init(this.$refs.four);
                var option = {
                    legend: {
                        data: "数量",
                        align: 'left'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['土地房屋及建筑物', '专用设备', '电气设备', '电子产品及通讯设备', '文艺体育设备', '', '家具用具及其他类']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [1393, 3530, 2923, 430, 923, 1920, 620],
                        type: 'bar'
                    }]
                };
                four.setOption(option);
            })
        }
    }
</script>

<style scoped>
.card{
    width:90%;
    height: 100px;
    background: #409eff;
    border-radius: 4px;
    text-align: center;
    color: white;
    line-height: 50px;
    font-size: 20px;
}
</style>