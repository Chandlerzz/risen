<template>

  <el-select
    :clearable="clearable"
    v-model="value"
    @change="onChanged"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in statusList"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    />
  </el-select>
</template>

<script>
  import {DictToList} from "../dicts"

  export default {
    name: "DictSelect",

    model:{
      prop:"selectedValue",
      event:"onSelectedValueChanged"
    },

    data:function(){
      return {
        value:this.selectedValue

      }
    },
    watch:{
      selectedValue(val) {
        this.value = val
      }


    },
    props:{
      selectedValue:Number,
      clearable:Boolean,
      dict:String,
      placeholder:String
    },
    methods:{

      onChanged() {
        this.$emit('onSelectedValueChanged', this.value)
      },
    },

    computed:{
      statusList:function(){
        return DictToList(this.dict)
      }
    }
  }
</script>

<style scoped>

</style>