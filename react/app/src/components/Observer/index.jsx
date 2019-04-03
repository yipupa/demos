import React, { PureComponent } from 'react';
// import ISObserver from './IntersectionObserver';
import PFOberver from './PerformanceObserver';

export default class index extends PureComponent {
    render() {
        return (
            <div ref={this.$App}>
                {/* <ISObserver /> */}
                <PFOberver />
            </div>
        )
    }
}
