var TwoCol = {
    template: `
    <div>
       <el-row
         :gutter="gutter"
         type = "flex"
         justify="center"
         v-for="item in cit"
         :key="item">
           <el-col 
             :style ="margin"
             :xs="layout.xs[0]" 
             :sm="layout.sm[0]" 
             :md="layout.md[0]" 
             :lg="layout.lg[0]" 
             :xl="layout.xl[0]"
           >
           </el-col>
           <el-col 
             :style ="margin"
             :xs="layout.xs[1]" 
             :sm="layout.sm[1]" 
             :md="layout.md[1]" 
             :lg="layout.lg[1]" 
             :xl="layout.xl[1]"
           >
             <el-image
             :src="item[0].picUrl"
             class="one"
             :name="item[0].id"
             @click="openUrl">
           </el-col>
           <el-col v-if="item.length===2" 
             :style ="margin"
             :xs="layout.xs[2]" 
             :sm="layout.sm[2]" 
             :md="layout.md[2]" 
            :lg="layout.lg[2]" 
             :xl="layout.xl[2]"
           >
             <el-image
             :src="item[1].picUrl"
             class="one"
             :name="item[1].id"
             @click="openUrl">
           </el-col>
           <el-col 
             :style ="margin"
             :xs="layout.xs[3]" 
             :sm="layout.sm[3]" 
             :md="layout.md[3]" 
             :lg="layout.lg[3]" 
             :xl="layout.xl[3]"
             >
         </el-row>
    </div>
    `,
    props: {
        cit : {
            field: Object,
            default:[],
        },
        gutter: {
            field: String,
            default: '',
        },
        margin: {
            field: String,
            default:"margin:0px 0px 0px 0px" 
            },
        layout: {
            field: Object,
            default: 
            {
                xs:[0,12,12,0],
                sm:[0,12,12,0],
                md:[0,8,8,0],
                lg:[0,8,8,0],
                xl:[0,8,8,0]
            },
        },
    },
    methods:{
        openUrl(event){
            this.$emit('open_url', event);
        }
    },
};

