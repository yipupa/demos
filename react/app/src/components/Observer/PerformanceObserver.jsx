import React, { PureComponent } from 'react'

export default class index extends PureComponent {
    componentDidMount() {
        this.init();
    }

    init() {
        if (window.PerformanceObserver) {
            this.performanceObserver();
        } else if (window.performance) {
            window.addEventListener('load', () => {
                let timing = window.performance.timing;
                let performanceData = this.handleData(timing);
                performanceData.timestamp = Date.now();
                performanceData.url = window.location.href;
                performanceData.from = 'window.performance';
                performanceData = Object.assign({}, performanceData, this.getPaintTime());
                this.send(performanceData);
            });
            // window.onload = function () {
            //     let timing = window.performance.timing;
            //     let performanceData = handleData(timing);
            //     performanceData.timestamp = Date.now();
            //     performanceData.url = window.location.href;
            //     performanceData.from = 'window.performance';
            //     performanceData = Object.assign({}, performanceData, getPaintTime());
            //     send(performanceData);
            // }
        }
    }

    // performanceObserver进行监控
    performanceObserver() {
        let obj = {};
        var observer = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => {
                console.log(entry)
                if (entry.entryType === 'paint') {
                    obj[entry.name] = entry.startTime
                } else {
                    let temp = this.handleData(entry);
                    obj = Object.assign({}, obj, temp);
                }
            });
            obj.from = 'window.PerformanceObserver';
            obj.url = window.location.href;
            obj.timestamp = Date.now();
            this.send(obj);
        });
        observer.observe({ entryTypes: ['navigation', 'paint'] });
    }

    // 获取first-paint及first-contentful-paint的时间
    getPaintTime() {
        let obj = {}
        if (window.performance && window.performance.getEntriesByType) {
            let paintArr = window.performance.getEntriesByType('paint');
            if (paintArr && paintArr.length) {
                paintArr.forEach(function (item) {
                    obj[item.name] = item.startTime;
                });
            }
        }
        return obj;
    }

    // 处理数据
    handleData(performance) {
        let navigationStart = performance.navigationStart || performance.fetchStart;
        let performanceData = {};
        if (performance) {
            // 重定向时间
            performanceData.redirectTime = performance.redirectEnd - performance.redirectStart;
            // 缓存时间
            performanceData.cacheTime = performance.domainLookupStart - performance.fetchStart;
            // dns查询时间
            performanceData.dnsTime = performance.domainLookupEnd - performance.domainLookupStart;
            // tcp握手时间
            performanceData.tcpTime = performance.connectEnd - performance.connectStart;
            // ajax请求时间
            performanceData.ajaxTime = performance.responseEnd - performance.requestStart;
            // 开始解析dom时间，此时document.readyState 变为 loading
            performanceData.domLoadingTime = performance.domLoading ? performance.domLoading - navigationStart : null;
            // dom解析完成时间，此时document.readyState 变为 interactive
            performanceData.domInteractiveTime = performance.domInteractive - navigationStart;
            // dom解析完成，资源加载完成，脚本完成
            performanceData.domContentLoadedEventEndTime = performance.domContentLoadedEventEnd - navigationStart;
            // 页面从开始到结束的全部时间时间
            performanceData.loadPageTime = performance.loadEventEnd ? performance.loadEventEnd - navigationStart : null;
        }
        return performanceData;
        // return performance;
        // return Object.assign({}, performanceData, performance);
    }

    // 上报函数
    send(data) {
        // 发起ajax请求
        console.table(data);
    }

    render() {
        return (
            <div>
                PerformanceObserver
            </div>
        )
    }
}
