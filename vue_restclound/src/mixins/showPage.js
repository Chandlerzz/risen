
import role from '@/directives/role'

export default (getApi)=> {
  return {
    directives: { role },

    data() {
      return {
        loading: false,
        formData: {},
        id:null,
      }
    },
    methods:{


      async fetchData() {
        this.loading = true
        try {
          const res = await getApi(this.id)
          this.formData = {
            ...res
          }

          this.onDataFetched && await this.onDataFetched()

        } catch (e) {

        }
        this.loading = false
      }
    },
    created() {
      const { id } = this.$router.history.current.query
      this.id = id
      this.fetchData()
    }

  }
}
