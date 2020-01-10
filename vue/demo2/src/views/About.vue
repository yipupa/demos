<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{count}}</p>
    <p v-for="(item, index) in list" :key="index">{{item}}</p>
  </div>
</template>
<script>
import { mapState/* , mapActions */ } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            count: state => state.about.count,
            list: state => state.about.list,//将store中的list映射到data中来
        })
    },
    methods: {
        // ...mapActions([
        //     'increment',
        //     'getList'
        // ])
    },
    mounted() {
        // this.getList()
        this.$store.dispatch('getList')
        console.log('list', this.list)//此时this.list是空数组
    }
}
</script>