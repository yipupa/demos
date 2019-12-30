import './intersection-observer';

export default class LazyLoader {
    /**
     * @param {target} An element whose visibility within the root is to be monitored. This element must be a descendant of the root element (or contained wtihin the current document, if the root is the document's viewport).
     * @param {root} An Element object which is an ancestor of the intended target, whose bounding rectangle will be considered the viewport. Any part of the target not visible in the visible area of the root is not considered visible.
     * @param {rootMargin} A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections, effectively shrinking or growing the root for calculation purposes. The syntax is approximately the same as that for the CSS margin property; see The root element and root margin in Intersection Observer API for more information on how the margin works and the syntax. The default is "0px 0px 0px 0px".
     * @param {threshold} Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area for the observed target. A value of 0.0 means that even a single visible pixel counts as the target being visible. 1.0 means that the entire target element is visible. See Thresholds in Intersection Observer API for a more in-depth description of how thresholds are used. The default is a threshold of 0.0.
     */
    constructor({
        target,
        options: {
            root = null,
            rootMargin = '0px 0px 0px 0px',
            threshold = 0,
        },
        onChange,
    }) {
        this.target = target;
        this.options = { root, rootMargin, threshold };
        this.onChange = onChange;

        this.init();
    }

    init() {
        const observer = new IntersectionObserver(this.handleChange, this.options);
        this.observer = observer;
        this.handlObserve(this.target);
    }

    handlObserve(target) {
        if (!target) {
            return;
        }
        const root = this.options.root || this.observer.root;
        if (target instanceof Element && root.contains(target)) {
            this.observer.observe(target);
        } else if (Object.prototype.toString.call(target) === '[object Array]' || Object.prototype.toString.call(target) === '[object HTMLCollection]') {
            for (let index = 0; index < target.length; index++) {
                const element = target[index];
                if (element instanceof Element && root.contains(element)) {
                    this.handlObserve(element);
                }
            }
        } else {
            console.warn('target should instanceof Element!')
            return;
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    //The IntersectionObserver method takeRecords() returns an array of IntersectionObserverEntry objects, one for each targeted element which has experienced an intersection change since the last time the intersections were checked, either explicitly through a call to this method or implicitly by an automatic call to the observer's callback.
    takeRecords() {
        return this.observer && this.observer.takeRecords();
    }

    handleChange = (entries, observer) => {
        this.onChange && this.onChange(entries, observer);
        // for (const change of entries) {
            // boundingClientRect 目标元素的矩形信息
            // intersectionRatio 相交区域和目标元素的比例值 intersectionRect/boundingClientRect 不可见时小于等于0
            // intersectionRect 目标元素和视窗（根）相交的矩形信息 可以称为相交区域
            // isIntersecting 目标元素当前是否可见 Boolean值 可见为true
            // rootBounds 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息
            // target 观察的目标元素
            // time 返回一个记录从IntersectionObserver的时间到交叉被触发的时间的时间戳
        // }
    }
}
