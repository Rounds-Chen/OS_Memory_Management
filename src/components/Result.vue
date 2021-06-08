<template>
    <el-table
      id="result"
      :data="tableData"
      height="500"
      width="100"
      :header-cell-style="tableHeaderStyle"
      :row-style="tableRowStyle"
    >
      <el-table-column  align="center" prop="seq" label="Seq No" width="100" >
      </el-table-column>
      <el-table-column align="center" prop="ins" label="Ins No" width="100">
      </el-table-column>
      <el-table-column align="center" prop="page1" label="Page 1" width="100">
      </el-table-column>
      <el-table-column align="center" prop="page2" label="Page 2" width="100">
      </el-table-column>
      <el-table-column align="center" prop="page3" label="Page 3" width="100">
      </el-table-column>
      <el-table-column align="center" prop="page4" label="Page 4" width="100">
      </el-table-column>
      <el-table-column align="center" prop="detail" label="Page Fault" width="180">
      </el-table-column>
      <el-table-column align="center" prop="addr" label="Addr" width="100"> </el-table-column>
    </el-table>
</template>

<style scoped>
#result {
  margin-top:20px;
}

.my-row{
  background: rgb(94, 92, 15);
  text-align: center;
  color:#e4f8d9 !important;
}

.el-table .warning-row {
    background: rgb(211, 210, 163);
  }


</style>

<script>
export default {
  props: [ "algo"],

  data() {
    return {
      tableData: "",
      pages: [-1, -1, -1, -1], //当前各页对应逻辑页号

      m: -1, //当前指令号
      seq: 0, //当前序列号

      count: 0, //当前缺页数

      times: [0, 0, 0, 0], // 记录各内存块中块存在时间
      loading:false
    };
  },

  methods: {
    tableRowStyle({rowIndex}){
      console.log(this.tableData[rowIndex].fault);
      let normalJson={
        'background-color':'white',
         'font-weight':500,
         'color':'black',
         'text-align':'center'
      };
      let faultJson={
        'background-color':'#e4f8d9',
         'font-weight':500,
         'color':'black',

      }
      
      if(this.tableData[rowIndex].fault===false){
        return normalJson;
      }
      else{
        return faultJson;
      }
    },
    tableHeaderStyle(){
      return "text-align:center;background-color:#abebd5;color:rgb(77, 75, 75);font-weight:500;font-size:20 !important;"
    }, 
    
    //重置组件数据
    reset(){
      this.tableData='';
      this.pages=[-1,-1,-1,-1];
      this.m=-1;
      this.seq=0;
      this.count=0;
      this.times=[0,0,0,0];
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

      let detail =
        "将页面Page" + String(index + 1) + "的内容置换为" + String(m_page);

      return detail;
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
      this.reset();
      let d = [];
      while (this.seq != 320) {
        let pi = 0;
        this.m = this.NextIns(this.m);
        console.log("新产生的指令：", this.m);

        let m_page = Math.floor(this.m / 10);
        let m_offset = this.m % 10;
        console.log("m_page:", m_page, " m_offset:", m_offset);

        let detail = "";
        let fault=false;
        for (pi = 0; pi < 4; pi++) {
          // 当前指令已在内存块p中
          if (this.pages[pi] === m_page) {
            detail = "当前指令已在内存块中";
            //若是LRU算法，更新该指令所在内存块的使用times
            if (this.algo === "LRU") {
              this.times[pi] = Math.max(this.times) + 1;
            }
            break;
          }
        }

        //当前指令不在内存中
        if (pi === 4) {
          fault=true;
          this.count++; //缺页数增加
          let j=0;
          for (j= 0; j < 4; j++) {
            if (this.pages[j] === -1) {
              this.pages[j] = m_page;
              detail =
                "当前指令不在内存块中，将其所在块放入内存页" + String(j + 1);
              break;
            }}
             if(j===4) {
              //根据算法移除一个页
              detail = this.Substitute(m_page);
            }
          }
        

        let new_seq = {
          seq: this.seq++,
          ins: this.m,
          page1: this.pages[0],
          page2: this.pages[1],
          page3: this.pages[2],
          page4: this.pages[3],

          detail: detail,
          addr: String(m_page) + " " + String(m_offset),

          fault:fault      
        };
        d.push(new_seq);
      }

      this.tableData = d;

      this.$emit('finRun',this.count);
      return;
    },
  },
};
</script>
