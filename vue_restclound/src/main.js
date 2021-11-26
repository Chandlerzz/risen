import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 引入element
Vue.use(ElementUI);

// remote-script for dingtalk login
Vue.component('remote-script', {
  render: function (createElement) {
    var self = this;
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: function (event) {
          self.$emit('load', event);
        },
        error: function (event) {
          self.$emit('error', event);
        },
        readystatechange: function (event) {
          if (this.readyState == 'complete') {
            self.$emit('load', event);
          }
        }
      }
    });
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
});

router.beforeEach((to, from, next)=>{
 console.log(to.meta.title)
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
