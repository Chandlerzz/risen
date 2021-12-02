<template>
  <div class="hello"
  v-loading="loading"
      >
      <el-row>
        <el-col
          :span="24"
          class="b-text-right"
          style="margin:20px  0"
        >
            <el-button @click="submit">SUBMIT</el-button>
            <el-button
              @click = "add"
              icon="el-icon-plus"
            />
        </el-col>
      </el-row>
 <el-table
    :data="accountData"
    class="b-full-width"
    border
    >
    <el-table-column
      label="name"
      min-width="120"
      align = "center"
      >
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.name"
         v-on:input = "input"
>
         <span slot="content">{{scope.row.name}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="account"
      min-width="120"
      align = "center"
      >
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.account"
         v-on:input = "input"
>
         <span slot="content">{{scope.row.account}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="password"
      min-width="120"
      align = "center"
      >
        <editable-cell slot-scope="scope"
           :can-edit="scope.row.editModeEnabled"
           v-model="scope.row.password"
           v-on:input = "input"
>
          <span slot="content">{{scope.row.password}}</span>
        </editable-cell>

    </el-table-column>
    <el-table-column
      label="operator"
      min-width="120"
      align = "center"
      >
      <editable-cell slot-scope="scope"
         :can-edit="scope.row.editModeEnabled"
         v-model="scope.row.operator"
         v-on:input = "input"
>
        <span slot="content">{{scope.row.operator}}</span>
      </editable-cell>
    </el-table-column>
    <el-table-column
      label="action"
      min-width="120"
      align = "center"
      >
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { getAccount, createAndUpdateAccount  } from '@/api/user';
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
            loading:false,
        }
    },
    methods:{
        edit(row) {
            this.accountData = this.accountData.map(item => {
                item.editModeEnabled = false;
                return item;
            })
            row.editModeEnabled = true
            
        },
        async submit() {
            //test account blank
            let filter = this.accountData.filter(item => Object.values(item).includes(""))
            if (filter.length !== 0){
               this.$message.error( "blank is unacceptable") 
                return
            }
            //test account same
            filter = this.accountData.map(item => item.account)
            filter = Array.from(new Set(filter))
            if (filter.length !== this.accountData.length){
               this.$message.error( "account is unique") 
                return
            }

            this.loading = true
            for ( let index in this.accountData){
                const account = this.accountData[index]
                try{
                   await createAndUpdateAccount({
                        "name":account.name,
                        "password":account.password,
                        "account":account.account,
                        "operator":account.operator,
                        "id":account.id,
                    })
                }
                catch(err){
                    this.$message.error(err.message)
                    this.loading = false
                }
            }
            let accounts = await getAccount()
            accounts = accounts.data
            accounts = accounts.map(account => { 
                account.editModeEnabled = false 
                return account
            })
            this.accountData = accounts
            this.loading = false
        },
        add() {
            this.accountData = this.accountData.map(item => {
                item.editModeEnabled = false;
                return item;
            })
            this.accountData.push({
                name:"",
                password:"",
                account:"",
                operator:"",
                editModeEnabled : true,
            })
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
