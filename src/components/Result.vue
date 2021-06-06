<template>
    <el-table
      v-if="isShow"
      id="result"
      :data="tableData"
      height="500"
      style="width: 100"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="seq" label="Seq no." width="100">
      </el-table-column>
      <el-table-column prop="ins" label="Ins no." width="100">
      </el-table-column>
      <el-table-column prop="page1" label="Page 1" width="100">
      </el-table-column>
      <el-table-column prop="page2" label="Page 2" width="100">
      </el-table-column>
      <el-table-column prop="page3" label="Page 3" width="100">
      </el-table-column>
      <el-table-column prop="page4" label="Page 4" width="100">
      </el-table-column>
      <el-table-column prop="fault" label="Page Fault" width="180">
      </el-table-column>
      <el-table-column prop="addr" label="Addr" width="100"> </el-table-column>
    </el-table>
</template>

<style scoped>
#result {
  position: absolute;
  top: 35%;
  left: 30%;
}

t-body .warning-row {
  background: rgb(247, 183, 65);
}
</style>

<script>
export default {
  props: ["toRun", "algo"],

  data() {
    return {
      tableData: "",
      pages: [-1, -1, -1, -1], //当前各页对应逻辑页号

      m: -1, //当前指令号
      seq: 0, //当前序列号

      count: 0, //当前缺页数

      times: [0, 0, 0, 0], // 记录各内存块中块存在时间
    };
  },

  computed:{
    isShow:function(){
      return this.toRun && this.algo!='';
    }
  },

  created(){
    if(this.algo!=''){
      console.log(this.algo);
    this.solve();
    }
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (this.tableData[rowIndex].name === "王小明") {
        console.log("目标选中", rowIndex);
        return "warning-row";
      }
      return "";
    },

    // 置换算法
    Substitute(m_page) {
      let index = 0;
      let minValue = this.times[0];
      let maxValue = this.times[0];
      for (let i = 0; i < 4; i++) {
        maxValue = this.times[i] > maxValue ? this.times[i] : maxValue;

        if (this.times[i] < minValue) {
          minValue = this.times[i];
          index = i;
        }
      }

      this.times[index] = maxValue + 1;
      this.pages[index] = m_page;

      let fault =
        "将页面Page" + String(index + 1) + "的内容置换为" + String(m_page);

      return fault;
    },

    // 获得下一条指令
    NextIns(m) {
      if (m === -1) {
        return Math.floor(Math.random() * 320);
      }

      let arr = [0, 0, 0, 0, 1, 1, 2, 2];
      let c = Math.floor(Math.random() * arr.length);

      switch (arr[c]) {
        // 顺序产生
        case 0:
          return m != 319 ? m + 1 : m;

        // 随机产生[0,m-1]之一
        case 1:
          return m != 0 ? Math.floor(Math.random() * m) : m;

        // 随机产生[m+1,319]之一
        case 2:
          return m != 319 ? Math.floor(Math.random() * (319 - m) + m + 1) : m;
      }
    },

    solve() {
      let d = [];
      while (this.seq != 320) {
        let pi = 0;
        this.m = this.NextIns(this.m);
        console.log("新产生的指令：", this.m);

        let m_page = Math.floor(this.m / 10);
        let m_offset = this.m % 10;
        console.log("m_page:", m_page, " m_offset:", m_offset);

        let fault = "";
        for (pi = 0; pi < 4; pi++) {
          // 当前指令已在内存块p中
          if (this.pages[pi] === m_page) {
            fault = "当前指令已在内存块中";
            //若是LRU算法，更新该指令所在内存块的使用times
            if (this.algo === "LRU") {
              this.times[pi] = Math.max(this.times) + 1;
            }
            break;
          }
        }

        //当前指令不在内存中
        if (pi === 4) {
          this.count++; //缺页数增加
          let j=0;
          for (j= 0; j < 4; j++) {
            if (this.pages[j] === -1) {
              this.pages[j] = m_page;
              fault =
                "当前指令不在内存块中，将其所在块放入内存页" + String(j + 1);
              break;
            }}
             if(j===4) {
              //根据算法移除一个页
              fault = this.Substitute(m_page);
            }
          }
        

        let new_seq = {
          seq: this.seq++,
          ins: this.m,
          page1: this.pages[0],
          page2: this.pages[1],
          page3: this.pages[2],
          page4: this.pages[3],

          fault: fault,
          addr: String(m_page) + " " + String(m_offset),
        };
        d.push(new_seq);
      }

      this.tableData = d;
      return;
    },
  },
};
</script>
