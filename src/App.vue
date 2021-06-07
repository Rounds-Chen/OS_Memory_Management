<template>
  <div id="app">
    <el-container>
       <el-header>Header</el-header>
       <el-main>
    <!--选择算法-->
    <MySelect ref="child_select" @select="selection = $event"></MySelect>

    <!--运行和重置-->
    <el-button
      round
      @click="run"
      style="position: absolute; top: 10%; right: 30%"
      >RUN</el-button
    >
    <el-button
      round
      @click="clear"
      style="position: absolute; top: 10%; right: 20%"
      >CLEAR</el-button
    >

    <!--结果表格-->
    <Result :algo="selection" @finRun="finRun" ref="child_result"></Result>

    <!--参数卡片-->
    <Paras />
    <!--结果卡片-->
    <Report :fifo_fault="fifo_fault" :lru_fault="lru_fault" />
    </el-main>
    </el-container>
  </div>
</template>

<style>
.el-container{
  height:100%;
}
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<script>
import MySelect from "./components/SelectAlgo.vue";
import Result from "./components/Result.vue";
import Paras from "./components/Paras.vue";
import Report from "./components/Report.vue";

export default {
  data: function () {
    return {
      selection: "", //选择的算法
      isRun: false, //是否正在运行

      fifo_fault: 0, //fifo结果缺页数
      lru_fault: 0, //lru结果缺页数
    };
  },
  components: {
    MySelect,
    Result,
    Paras,
    Report,
  },

  methods: {
    clear() {
      this.isRun = false;
      this.selection = "";
      this.fifo_fault = 0;
      this.lru_fault = 0;

      this.$refs.child_select.clear();
      this.$refs.child_result.reset();
    },

    run() {
      if (this.selection === "") {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "color: black;font-weight:500;font-size:17px" },
              "请选择一种算法！ "
            ),
          ]),
          type: "warning",
          duration: 2300,
          center: true,
        });
      } else if (this.isRun === false) {
        this.isRun = true;
        this.$refs.child_result.solve();
      }
    },

    finRun(count) {
      this.isRun = false;
      if (this.selection === "FIFO") {
        this.fifo_fault = count;
      } else {
        this.lru_fault = count;
      }
    },
  },
};
</script>
