import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class ThirdpartyDocer extends PureComponent {
    static propTypes = {

    }

    state = {
        loading: true,
        id: -1
    }

    componentDidMount() {
        window.addEventListener('message', e => {
            console.log('parent receive message:', e);
            const { data } = e;
            if (typeof data === 'number') {
                this.setState({
                    id: data
                });
            }
        })
    }

    handleIframeLoad = () => {
        this.setState({
            loading: false
        })
    }

    postMessage = () => {
        const origin = 'http://69.171.77.14:7000';
        this.iframeRef.current.contentWindow.postMessage('haha', origin);
    }

    iframeRef = React.createRef()

    render() {
        const { loading, id } = this.state;
        // const url = 'https://www.kdocs.cn/p/786510976?from=docs&source=docsWeb';
        // const url = 'http://69.171.77.14:7000/';
        const url = 'http://localhost:8111/newslide';
        return (
            <div className="wrapper">
                <div className="cover"></div>
                <div>
                    <p>{id}</p>
                    <button onClick={this.postMessage}>post message</button>
                </div>
                <div className="layout">
                    {/* <iframe src="http://69.171.77.14:7000/" /> */}
                    <iframe title="iframe" ref={this.iframeRef} onLoad={this.handleIframeLoad} src={url} />
                </div>
                {
                    loading &&
                    <div className="loading"></div>
                }
            </div>
        )
    }
}
