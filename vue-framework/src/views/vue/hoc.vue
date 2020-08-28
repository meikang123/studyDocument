<template>
  <el-row :gutter="20" style="padding: 20px">
    <el-col :span="4">
      <gt-input v-model="name" clearable />
    </el-col>
    <el-col :span="4">
      {{ name }}
    </el-col>
    <el-col :span="4">
      <el-form>
        <k-form-item label="Redis Key：" prop="data.key" placeholder="请输入键名" type="input" v-model="value"/>
        {{value}}
      </el-form>
    </el-col>
    <el-col :span="4">
      <test :form-data="formData" />
      {{formData.id}}-{{formData.age}}
    </el-col>
  </el-row>
</template>

<script>
import { Input } from 'element-ui';
import hoc from '@/utils/hoc';
import KFormItem from '@/components/KFormItem'
import Test from './components/test';

const GtInput = hoc(Input);

export default {
  components: { GtInput, KFormItem, Test },

  data() {
    return {
      formData: {},
      name: 'MK',
      value: null
    }
  }

};
</script>
