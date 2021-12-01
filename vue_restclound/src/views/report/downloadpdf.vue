<template>
  <div 
    v-loading="loading"
  >
 <el-row class = "header" 
    >
      <el-col
          :span ="5"
          class="searchItem"
          >
         <el-select 
             v-model="accountId" 
             filterable 
             clearable
             placeholder="please enter account"
             @keydown.enter.native="handleEnter"
             :loading="loading"
             >
            <el-option
              v-for="item in accountData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> 
      </el-col>

      <el-col
             :span="18"
             class="b-text-right"
           >
            <el-button
              icon="el-icon-search"
              @click="search"
            />
            <el-button
              icon="el-icon-refresh"
              @click="clearSearch"
            />
            <el-button type="text" @click="handleDown">EXPORT</el-button>
       </el-col>
    </el-row>   

    <el-table id="pdf-demo"
      :data="list"
      class="b-full-width"
    >
    <el-table-column label="orderId" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="account" min-width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="barcode" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.barcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="state" min-width="100" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.state ===1 ?"TODE":"DONE"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="B-Voltage" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.voltageB}}</span>
        </template>
      </el-table-column>
      <el-table-column label="B-Image" min-width="100" align="center">
        <template slot-scope="scope">
            <el-image 
                 style="width: 100px; height: 100px"
                 :src="scope.row.imageB"
                 fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="B-Image" min-width="100" align="center">
        <template slot-scope="scope">
            <el-image 
                 style="width: 100px; height: 100px"
                 :src="scope.row.imageB1"
                 fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="A-Voltage" min-width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.voltageB}}</span>
        </template>
      </el-table-column>
      <el-table-column label="A-Image" min-width="100" align="center">
        <template slot-scope="scope">
            <el-image 
                 style="width: 100px; height: 100px"
                 :src="scope.row.imageF"
                 fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="A-Image" min-width="100" align="center">
        <template slot-scope="scope">
            <el-image 
                 style="width: 100px; height: 100px"
                 :src="scope.row.imageF1"
                 fit="fill"></el-image>
        </template>
      </el-table-column>
    </el-table>

    <div style="height: 20px;"></div>
    <!-- <el-row> -->
    <!--   <el-col :span="24"> -->
    <!--     <el-pagination -->
    <!--       style="float: right;" -->
    <!--       @size-change="changePageSize" -->
    <!--       @current-change="changeCurrentPage" -->
    <!--       :total="listSize" -->
    <!--       :current-page="currentPage" -->
    <!--       :page-sizes="[10,15,20,25]" -->
    <!--       :page-size="pageSize" -->
    <!--       layout="total, sizes, prev, pager, next, jumper" -->
    <!--     > -->
    <!--     </el-pagination> -->
    <!--   </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
  
<script>
import htmlToPdf from '@/functions/htmlToPdf';
import { getRepairInfo } from '@/api/report';
import { getAccount } from '@/api/user';
import listPage from '@/mixins/listPage';
export default {
    name: 'downloadpdf',
    mixins:[listPage(getRepairInfo)],
    data(){
        return{
            accountData:[],
            accountId:"",
        }
    },
    methods:{
		handleDown(){
		//导出PDF
            htmlToPdf.downloadPDF( document.querySelector('#pdf-demo'),'我的PDF');
		},
        async onCreated(){
            let accounts = await getAccount();
            accounts = accounts.data
            let list = this.list;
            this.list = list.map(item => {
                let account = accounts.filter(account => account.id === item.accountId )
                item.account = account[0].account
                return item
            })
            accounts = accounts.map(account => { 
                account.editModeEnabled = false 
                return account
            })
            this.accountData = accounts
        },
        async beforeCreated(){
            this.pageSize = 0 
        },
        async beforeSearch(){
            this.pageSize = 999
            let selectAccount = this.accountData.filter(item => item.id === this.accountId)
            let account = selectAccount[0].account
            this.searchCriteria.account = account
        },
        async afterSearch(){
            let accounts = this.accountData;
            let list = this.list;
            this.list = list.map(item => {
                let account = accounts.filter(account => account.id === item.accountId )
                item.account = account[0].account
                return item
            })
        },
        async clearSearch(){
            this.accountId = "";
            delete this.searchCriteria.account;
            this.currentPage = 1;
            await this.fetchList();
        },
        exportExcelHandel() {
            this.loading = true
            let account = ""
            if (this.accountId !== ""){
                let selectAccount = this.accountData.filter(item => item.id === this.accountId)
                account = selectAccount[0].account
            }
            getRepairInfo({
                account
            }).then((res) => {
                    if(res.data.length == 0){
                      this.$message.error('没有可导出数据')
                      this.loading = false
                      return
                    }
                    this.exportExcel(res.data)
                    this.$message.success('导出数据成功')
                    this.loading = false
                  }).catch(() => {
                    this.$message.error('导出数据失败')
                    this.loading = false
                  })
        },
        exportExcel(list) {
                  import('@/vendor/Export2Excel.js').then(excel => {
                      const tHeader = ['订单号', '账号', '状态', '一维码', '维修前电压','维修前电压']
                      const data = [];
                      const accounts = this.accountData;
                      list = list.map(item => {
                          let account = accounts.filter(account => account.id === item.accountId )
                          item.account = account[0].account
                          return item
                      })
                      for( let item of list){
                          const dataItem =[
                              item.order_id,
                              item.account,
                              item.state===1?"维修中":"完成",
                              item.barcode,
                              item.voltageB,
                              item.voltageF

                          ]
                        data.push(dataItem)
                      }

                      excel.export_json_to_excel({
                          header: tHeader,
                          data,
                          filename: `维修记录表`,
                          autoWidth: true,
                          bookType: this.bookType
                      })
                  })

              },

    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header{
margin:20px 0 30px 0;
}
.el-range-separator{
    margin:0 10px!important;
}
</style>
