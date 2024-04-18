<template>
  <div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      <el-breadcrumb-item>分析列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
        <div class="num">总共美食数量：{{this.zongNum}}</div>
      <!-- 搜索与添加区域 -->
      <div id="myChart" :style="{width: '520px', height: '400px'}"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import _ from 'lodash'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      zongNum:0,
      list:[5, 20, 36, 10, 10,10],
      options:{ 
            title: { text: '小菜一碟后台管理系统数据分析' },
            tooltip: {},
            // X轴
            xAxis: {
                type: 'category',
                data: ["早餐","素食","荤菜","汤品","烘焙","其他"]
            },
            //Y轴
            yAxis: {    
                type: 'value'
                },
            series: [{
                name: '美食数量',
                showBackground: true,
                type: 'bar',
                data: []
            }]
        }
    }
  },
  created(){
      this.getUserList()
  },
  mounted(){
      this.drawLine();
  },
  methods: {
      async getUserList() {
      const { data: res } = await this.$http.get("getCaipin");
      // if (res.meat.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.list;
      console.log(res.list);
      const arr = [0,0,0,0,0,0]
     var a=0;
     var b=0;
     var c=0;
     var d=0;
     var e=0;
     var f=0;
      res.list.forEach(item => {
          console.log(item.num)
          if(item.num==0){
              a += 1
          }else if(item.num==1){
              b += 1
          }else if(item.num==2){
              c += 1
          }else if(item.num==3){
              d += 1
          }else if(item.num==4){
              e += 1
          }else{
            f+=1;
          }
      });
          this.list[0]=a;
          this.list[1]=b;
          this.list[2]=c;
          this.list[3]=d;
          this.list[4]=e;
          this.list[5]=f;
          // 总交易额 
          this.zongNum = (a+b+c+d+e+f);
          console.log(this.list)
           this.options.series[0].data = this.list;   // 配置数据  
            // 第一步：基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 4. 准备数据和配置项
        const result = _.merge(this.options)
         // 5. 展示数据
        myChart.setOption(this.options)
    },
  }
}
</script>
<style lang="less" scoped>
.img {
  width: 120px;
  height: 80px;
}
.name_img{
    width: 30rpx;
    height: 30rpx;
    border-radius: 10000px;
}
.num{
    width: 220px;
    height: 60px;
    background-color: #E6A23C;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
}
</style>