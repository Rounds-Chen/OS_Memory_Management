<template>
  <div id="app">
    <el-container>
      <el-header class="my-header"
        >
        <h1 style="font-size: 40px;margin-bottom:0;margin-top:20px">Memory Management</h1>
        <p style="font-size:20px">Request Page Scheduling</p>
        </el-header
      >
      <el-main>
        <!--选择算法-->
        <MySelect :able="oneStep" ref="child_select" @select="selection = $event"></MySelect>

        <!--运行和重置-->
        <!--连续执行-->
        <el-button
          round
          @click="run"
          style="position: absolute; top: 200px; right: 30%"
          >RUN ALL</el-button
        >
        <!--单步执行-->
        <el-button
          round
          @click="runOne"
          style="position: absolute; top: 200px; right: 20%"
          >RUN ONE</el-button
        >

        <!--重置-->
        <el-button
          round
          @click="clear"
          style="position: absolute; top: 200px; right: 10%"
          >CLEAR</el-button
        >

        <el-card
          class="box-card"
          style="
            position: absolute;
            left: 35%;
            top: 300px;
            width: 800px;
            height: 600px;
          "
        >
          <!--结果表格-->
          <Result
            :algo="selection"
            @finRun="finRun"
            ref="child_result"
          ></Result>
        </el-card>

        <!--参数卡片-->
        <Paras />
        <!--结果卡片-->
        <Report :fifo_fault="fifo_fault" :lru_fault="lru_fault" />
      </el-main>
      <el-footer class="my-footer">
        <el-link :underline="false" href="https://github.com/Rounds-Chen" target="_blank">
        <img style="margin-top:15px" src="./assets/GitHub.png">
        </el-link></el-footer>
    </el-container>
  </div>
</template>

<style>
.my-header {
  height: 150px !important;
  background-color: #99cccc !important;
}

.my-footer {
  height: 100px !important;
  background-color: #99cccc !important;
}

.el-header,
.el-footer {
  background-color: #057020;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 0;
}

.el-main {
  background-color: white;
  color: #333;
  height: 800px;
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
      oneStep:false, // 是否单步执行

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
      this.oneStep=false;
      this.isRun = false;
      this.selection = "";
      // this.fifo_fault = 0;
      // this.lru_fault = 0;

      this.$refs.child_select.clear();
      this.$refs.child_result.reset();
    },

    runOne(){
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
      }

      else{
        if(this.isRun===false){
        this.oneStep=true;
        if(this.$refs.child_result.seq!=320){
          this.$refs.child_result.solve();
        }
        else{
          const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "color: black;font-weight:500;font-size:17px" },
              "请先点击CLEAR!"
            ),
          ]),
          type: "warning",
          duration: 2300,
          center: true,
        });
        }
      }
      }
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
        this.$refs.child_result.RunAll();
      }
    },

    finRun(count) {
      this.isRun = false;
      if (this.selection === "FIFO") {
        this.fifo_fault = count;
      } else {
        this.lru_fault = count;
      }

      this.oneStep=false;
        const h = this.$createElement;

      this.$message({
          message: h("p", null, [
            h(
              "span",
              { style: "color: black;font-weight:500;font-size:17px" },
              "执行完毕320条指令！ "
            ),
          ]),
          type: "success",
          duration: 2300,
          center: true,
        });

      
    },
  },
};
</script>
