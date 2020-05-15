<template>
    <!-- 参数	             说明	              类型	            默认值 -->
    <!-- v-model	        是否处于加载中状态	    boolean	         - -->
    <!-- pulling-text	    下拉过程提示文案	    string	         下拉即可刷新... -->
    <!-- loosing-text	    释放过程提示文案	    string	         释放即可刷新... -->
    <!-- loading-text	    加载过程提示文案	    string	         加载中... -->
    <!-- success-text	    刷新成功提示文案	    string	         - -->
    <!-- success-duration	刷新成功提示展示时长(ms) number | string  500 -->
    <!-- animation-duration	动画时长	           number | string	300 -->
    <!-- head-height v2.4.2	顶部内容高度	        number | string	 50 -->
    <!-- disabled	        是否禁用下拉刷新	     boolean	      false -->
  <van-pull-refresh 
    v-model="refreshing"
    :pulling-text="下拉加载"
    @refresh="onRefresh"
  >
    <!-- 参数	           说明	                                                              类型	            默认值 -->
    <!-- v-model	      是否处于加载状态，加载过程中不触发load事件	                           boolean	        false -->
    <!-- finished	      是否已加载完成，加载完成后不再触发load事件	                           boolean	         false -->
    <!-- error	          是否加载失败，加载失败后点击错误提示可以重新触发load事件，必须使用sync修饰符	boolean	          false -->
    <!-- offset	          滚动条与底部距离小于 offset 时触发load事件	                          number | string	300 -->
    <!-- loading-text	  加载过程中的提示文案	                                                string	           加载中... -->
    <!-- finished-text	  加载完成后的提示文案	                                                string	           - -->
    <!-- error-text	      加载失败后的提示文案	                                                string	           - -->
    <!-- immediate-check  是否在初始化时立即执行滚动位置检查	                                   boolean	         true -->
    <!-- direction	      滚动触发加载的方向，可选值为up	                                      string	        down -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="憋刷了，下面啥都没了"
      @load="onLoad"
      @refresh="onRefresh"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh, List, Cell } from "vant";
import "vant/lib/index.less";

export default {
  data: function() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      refreshCount: 0
    };
  },
  mounted() {},
  methods: {
    //上拉加载更多
    onLoad() {
      //模拟请求接口延时
      setTimeout(() => {
        //模拟从接口获取的新数据
        //新获取的诗句需要和原来的数据加在一起，这里简单用push去模拟
        //每次上拉加载的数据数量，最好多于一屏的数量
        for (let i = 0; i < 30; i++) {
          this.list.push(
            `${this.refreshCount}---------${this.list.length + 1}`
          );
        }

        //关闭加载状态
        this.loading = false;

        //模拟总数据条数 finished 为 true 表示所有的数据都加载完了
        if (this.list.length >= 90) {
          this.finished = true;
        }
      }, 1000);
    },
    //下拉刷新
    onRefresh() {
      // 将finished 设置为 false，表示需要重新加载数据
      this.finished = false;

      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;

      //模拟请求接口延时
      setTimeout(() => {
        this.list = []; //刷新时先清空列表，重新初始化数据
        this.refreshing = false; //关闭刷新状态

        this.refreshCount++; //记录一下刷新次数，测试用，没有其他的用途

        //模拟从接口获取的新数据
        //每次加载的数据数量，最好多于一屏的数量
        for (let i = 0; i < 30; i++) {
          this.list.push(
            `${this.refreshCount}---------${this.list.length + 1}`
          );
        }

        //关闭加载状态
        this.loading = false;

        //模拟总数据条数 finished 为 true 表示所有的数据都加载完了
        if (this.list.length >= 90) {
          this.finished = true;
        }
      }, 1000);
    }
  },
  components: {
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell
  }
};
</script>

<style lang="scss">
.van-cell {
  font-size: 60px;
  line-height: 60px;
}
</style>