import React, { Component } from 'react';
import { Dragact } from 'dragact'
import './index.scss';

const fakeData = [
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '0' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '1' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '2' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '3' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '4' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '5' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '6' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '7' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '8' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '9' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '10' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '11' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '12' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '13' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '14' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '15' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '16' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '17' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '18' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '19' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '20' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '21' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '22' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '23' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '24' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '25' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '26' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '27' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '28' },
    { GridX: 0, GridY: 0, w: 4, h: 2, key: '29' },
];

const getblockStyle = isDragging => {
    return {
        background: isDragging ? '#1890ff' : 'white'
    };
};

export default class index extends Component {
    render() {
        return (
            <Dragact
                layout={fakeData} //必填项
                col={16} //必填项
                width={800} //必填项
                rowHeight={40} //必填项
                margin={[5, 5]} //必填项
                className="plant-layout" //必填项
                style={{ background: '#333' }} //非必填项
                placeholder={true}
            >
                {(item, provided) => {
                    return (
                        <div
                            {...provided.props}
                            {...provided.dragHandle}
                            style={{
                                ...provided.props.style,
                                ...getblockStyle(provided.isDragging)
                            }}
                        >
                            {provided.isDragging ? '正在抓取' : '停放'}
                        </div>
                    )
                }}
            </Dragact>
        )
    }
}
