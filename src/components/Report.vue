<template>
<el-card id="report" >
  <div  class="title">
      FIFO:
  </div>
  <div  class=" item">
      缺页数:&emsp;&emsp;{{fifo_fault}}
  </div>
  <div  class=" item">
      缺页率:&emsp;&emsp;{{fifo_rate}}
  </div>
  <div  class="title">
      LRU:
  </div>
  <div  class=" item">
      缺页数:&emsp;&emsp;{{lru_fault}}
  </div>
  <div  class=" item">
      缺页率:&emsp;&emsp;{{lru_rate}}
  </div>
</el-card>    
</template>

<style >

  .title{
      padding-top: 30px;
      padding-bottom: 20px;
    font-size: 18px;
    color: rgb(33, 102, 39);
    font-weight: 800;
  }

  .item {
    font-size: 14px;
    font-weight:700 ;
    padding: 10px 40px;
  }

  #report {
    width: 320px;
    position:absolute;
    top:500px;
    left:4%;
    background-color: #f3f9f1 ;

  }
</style>

<script>
export default {
    props:['fifo_fault','lru_fault'],
    computed:{
        fifo_rate:function(){
        return this.fifo_fault/320;
    },

    lru_rate:function(){
        return this.lru_fault/320;
    }
    }
}
</script>