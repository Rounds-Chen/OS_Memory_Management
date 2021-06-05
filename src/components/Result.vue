<template >
    <el-table 
    v-if="isShow"
    id="result"
      :data="tableData"
      height="250"
      style="width: 180"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="200">
      </el-table-column>
    </el-table>
  </template>

  <style scoped>
    #result{
        position:absolute;
        top:35%;
        left:40%;
    }

  t-body .warning-row {
    background: rgb(247, 183, 65);
  }
  </style>

  <script>
    export default {
        props:[
            'isShow'
        ],

      data() {
        return {
          tableData: ""
        }
      },

      created:function(){
          let d=[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小明',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }];

        this.tableData=d;
      },

      methods:{
        tableRowClassName({row, rowIndex}){
          console.log(row);
          if(this.tableData[rowIndex].name === '王小明'){
            console.log("目标选中",rowIndex)
            return  'warning-row';
          }
          return '';
        }
      }
      
    }
  </script>