export default class LazyLoader {
    /**
     * @param {target} An element whose visibility within the root is to be monitored. This element must be a descendant of the root element (or contained wtihin the current document, if the root is the document's viewport).
     * @param {root} An Element object which is an ancestor of the intended target, whose bounding rectangle will be considered the viewport. Any part of the target not visible in the visible area of the root is not considered visible.
     * @param {rootMargin} A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections, effectively shrinking or growing the root for calculation purposes. The syntax is approximately the same as that for the CSS margin property; see The root element and root margin in Intersection Observer API for more information on how the margin works and the syntax. The default is "0px 0px 0px 0px".
     * @param {threshold} Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area for the observed target. A value of 0.0 means that even a single visible pixel counts as the target being visible. 1.0 means that the entire target element is visible. See Thresholds in Intersection Observer API for a more in-depth description of how thresholds are used. The default is a threshold of 0.0.
     */
    constructor({
        target,
        root = null,
        rootMargin = '0px 0px 0px 0px',
        threshold = 0,
    }) {
        // if (!(target && (target instanceof HTMLElement || target instanceof SVGElement))) {
        //     console.warn('lazy target wrapper should instanceof HTMLElement or SVGElement!')
        //     return;
        // }
        this.target = target;
        this.options = { root, rootMargin, threshold };

        this.init();
    }

    init() {
        console.log('options', this.options)
        const observer = new IntersectionObserver(this.handleChange, this.options);
        this.observer = observer;
        window.observer = observer;
        // observer.observe.apply(null, this.target);
        // observer.observe(this.target);
        // observer.observe(this.observer.root.children[1]);
    }

    destroy() {
        if (this.observer) {
            this.observer.unobserve(this.target);
            this.observer.disconnect();
        }
    }

    //The IntersectionObserver method takeRecords() returns an array of IntersectionObserverEntry objects, one for each targeted element which has experienced an intersection change since the last time the intersections were checked, either explicitly through a call to this method or implicitly by an automatic call to the observer's callback.
    takeRecords() {
        return this.observer && this.observer.takeRecords();
    }

    handleChange = (entries, observer) => {
        console.log(entries, observer)
        // for (const change of entries) {
        //     console.log(change.time);
        //     // Timestamp when the change occurred
        //     // 当可视状态变化时，状态发送改变的时间戳
        //     // 对比时间为，实例化的时间，
        //     // 比如，值为1000时，表示在IntersectionObserver实例化的1秒钟之后，触发该元素的可视性变化
    
        //     console.log(change.rootBounds);
        //     // Unclipped area of root
        //     // 根元素的矩形区域信息，即为getBoundingClientRect方法返回的值
    
        //     console.log(change.boundingClientRect);
        //     // target.boundingClientRect()
        //     // 目标元素的矩形区域的信息
    
        //     console.log(change.intersectionRect);
        //     // boundingClientRect, clipped by its containing block ancestors,
        //     // and intersected with rootBounds
        //     // 目标元素与视口（或根元素）的交叉区域的信息
    
        //     console.log(change.intersectionRatio);
        //     // Ratio of intersectionRect area to boundingClientRect area
        //     // 目标元素的可见比例，即intersectionRect占boundingClientRect的比例，
        //     // 完全可见时为1，完全不可见时小于等于0
    
        //     console.log(change.target);
        //     // the Element target
        //     // 被观察的目标元素，是一个 DOM 节点对象
        //     // 当前可视区域正在变化的元素
    
        // }
    }
}
