<template>
  <div id="app">
    <!--选择算法-->
   <MySelect ref="child_select" @select="selection=$event" ></MySelect>

   <!--运行和重置-->
    <el-button round @click="run" style="position:absolute; top:10%;right:30%">RUN</el-button>
    <el-button round @click="clear" style="position:absolute; top:10%;right:20%">CLEAR</el-button>

    <!--结果表格-->
    <Result :toRun="toRun" :algo="selection" ></Result>

    <!--参数卡片-->
    <Paras/>
    <!--结果卡片-->
    <Report :fifo_fault="fifo_fault" :lru_fault="lru_fault"/>
  </div>
</template>

<style></style>


<script>
import MySelect from "./components/SelectAlgo.vue";
import Result from './components/Result.vue';
import Paras from './components/Paras.vue'
import Report from './components/Report.vue'


export default{
 data:function(){
   return {
     selection:"", //选择的算法
     isRun:false, //是否正在运行
     toRun:false, //是否点击了运行按钮

     fifo_fault:0, //fifo结果缺页数
     lru_fault:0, //lru结果缺页数
     
   }
 },
  components:{
    MySelect,
    Result,
    Paras,
    Report
  },

  methods:{
    clear(){
      this.isRun=false;
      this.$refs.child_select.clear();
    },
    
    run(){
      if(this.isRun==false){
        this.isRun=true;
        this.toRun=true;
      }
    }
  }

  
  
}

    

</script>
