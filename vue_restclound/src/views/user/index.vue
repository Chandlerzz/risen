<template>
  <div class="hello">
 <el-table
    :data="accountData"
    border
    style="width:40%"
    >
    <el-table-column
      label="姓名"
      width="120">
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.name"
         v-on:input = "input"
>
         <span slot="content">{{scope.row.name}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="账号"
      width="120">
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.account"
         v-on:input = "input"
>
         <span slot="content">{{scope.row.account}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="密码"
      width="120">
        <editable-cell slot-scope="scope"
           :can-edit="scope.row.editModeEnabled"
           v-model="scope.row.password"
           v-on:input = "input"
>
          <span slot="content">{{scope.row.password}}</span>
        </editable-cell>

    </el-table-column>
    <el-table-column
      label="操作者"
      width="150">
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.operator"
         v-on:input = "input"
>
        <span slot="content">{{scope.row.operator}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { getAccount } from '@/api/user';
import EditableCell from "@/components/EditableCell";
export default {
    name: 'User',
    components: {
              EditableCell
    },
    data(){
        return{
           editModeEnabled:false,
            accountData:[],
        }
    },
    methods:{
        handleClick(row) {
            row.editModeEnabled = true
        },
        input(val){
            console.log(val)
        }
    },
    async created(){
        let accounts = await getAccount()
        accounts = accounts.data
        accounts = accounts.map(account => { 
            account.editModeEnabled = false 
            return account
        })
        this.accountData = accounts

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
