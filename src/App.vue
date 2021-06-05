<template>
  <div id="app">
    <!--选择算法-->
   <MySelect ref="child_select" @select="selection=$event" ></MySelect>

   <!--运行和重置-->
    <el-button round @click="isRun=true" style="position:absolute; top:10%;right:30%">RUN</el-button>
    <el-button round @click="clear" style="position:absolute; top:10%;right:20%">CLEAR</el-button>

    <!--结果表格-->
    <Result :isShow="isRun"></Result>
  </div>
</template>

<style></style>


<script>
import MySelect from "./components/SelectAlgo.vue";
import Result from './components/Result.vue';


export default{
 data:function(){
   return {
     selection:"", //选择的算法
     isRun:false, //是否运行
     
   }
 },
  components:{
    MySelect,
    Result
  },

  methods:{
    clear(){
      this.isRun=false;
      this.$refs.child_select.clear();
    }
  }

  
  
}

    

</script>
