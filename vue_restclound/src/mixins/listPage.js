export default (fetchApi, deleteApi,editApi)=> {
  return {
    data: function () {
      return {
        searchCriteria: {},
        currentPage: 1,
        pageSize: 10,
        listSize: 0,
        loading: false,
        advancedVisible: false,
        list: [],
      }
    },


    methods: {

      async search() {
        //搜索按钮
        this.beforeSearch && this.beforeSearch()
        this.currentPage = 1
        await this.fetchList()
        this.afterSearch && this.afterSearch()
      },
      async changePageSize(pageSize) {
        //更改每页条数
        this.pageSize = pageSize
        this.list = []
        await this.search()
      },
      async changeCurrentPage(currentPage) {
        //更改当前页数
        this.currentPage = currentPage
        // if(this.filter){
        //     const filterValues = Object.keys(this.filter)
        //     const filterValuesSet = new Set(filterValues)
        //     if (filterValues.length != 0 || (filterValuesSet.size ===1 && filterValuesSet.has(""))){
        //         await this.filterFetchList()
        //         return
        //     }
        // }
        await this.fetchList();
      },

      deleteRecord(data) {
        const {id,} = data
        let content = '此操作将删除该记录,及其相关信息，是否继续？'

        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warninig'
        }).then(async () => {
          await this.callDeleteApi(id)
          this.$message.success('删除成功')
        }).then(async ()=>{
          await this.fetchList()
        }).catch(() => {
          this.loading = false
        })
      },
      async updateStatus(data,status){
        const {id} = data
        let content = '此操作将' + (data.status == 1 ? '发布' : '完成' )+ '该信息，是否继续？'
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warninig'
        }).then(async () => {
          await editApi(id,{status:status})
          this.$message.success((data.status == 1 ? '发布' : '完成')+'成功')
        }).then(async ()=>{
          await this.fetchList()
        }).catch(() => {
          this.loading = false
        })
      },
      async fetchList() {
        this.loading = true
        const offset = this.pageSize * (this.currentPage - 1)
        const limit = this.pageSize

        let extraParams = {}
        if(this.prepareParameters){
          extraParams = await this.prepareParameters()
        }

        const res = await fetchApi({
          ...this.searchCriteria,
          ...extraParams,
          offset,
          limit
        })

        this.list = res.data
        this.list = this.list.map(item =>{
            const baseUrl = "https://object.risen.com/risen-repair-img/"
            item.imageB =baseUrl+item.imageB
            item.imageB1 =baseUrl+item.imageB1
            item.imageF =baseUrl+item.imageF
            item.imageF1 =baseUrl+item.imageF1
            return item
          })
        this.listSize = res.count
        this.loading = false
      },

      async callDeleteApi(id) {
        this.loading = true
        await deleteApi(id)
        this.loading = false

      },

      reset() {
        this.$refs.searchForm.resetFields()
      },

    },

    async created() {
      this.beforeCreated && this.beforeCreated()
      await this.fetchList()
      this.onCreated &&  this.onCreated()
    }
  }
}
