<template>
<div id="selectAlgo">
  <el-select  v-model="value" placeholder="请选择一种算法" @change="$emit('select',value)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.label"
      :disabled="able">
    </el-option>
  </el-select>

  </div>
</template>

<style scoped>
#selectAlgo{
    position: absolute;
    right:40%;
    top:200px

}
</style>

<script>
  export default {
    props:['able'],
     
    data() {
      return {
        options: [{
          value: '选项1',
          label: 'FIFO'
        }, {
          value: '选项2',
          label: 'LRU'
        }],
        value: ''
      }
    },

    methods:{
        clear(){
            this.value="";
        }
    }
  }
</script>