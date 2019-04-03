import React, { PureComponent } from 'react';

export default class index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
        this.lengthInput = React.createRef(this.lengthInput);
        this.maxInput = React.createRef(this.maxInput);
        this.indexInput = React.createRef(this.indexInput);
        // this.handleClick = ::this.handleClick;
    }

    componentDidMount() {

    }

    // handleClick = () => {
    handleClick() {
        const length = +this.lengthInput.current.value || 10;
        const max = +this.maxInput.current.value || 10;
        const index = +this.indexInput.current.value || 1;
        const list = this.getList(length, max);
        const result = this.getCountBySortIndex(list, index);
        this.setState({ result });
    }

    getList(length = 10, max = 10) {
        const list = [];
        let i = 1;
        while (i <= length) {
            list.push(Math.ceil(Math.random() * max))
            i++;
        }
        return list;
    }

    getCountBySortIndex(list, index = 1) {
        const copyList = [...list];
        copyList.sort((a, b) => b - a);
        const temp = [];
        for (let i = 0; i < copyList.length; i++) {
            let saveIndex = -1;
            temp.forEach((item, k) => {
                if (item.key === copyList[i]) {
                    saveIndex = k;
                }
            });
            if (saveIndex < 0) {
                temp.push({
                    key: copyList[i],
                    count: 1
                });
            } else {
                temp[saveIndex].count = temp[saveIndex].count + 1;
            }
        }
        console.log(list, copyList, temp, temp[index - 1].count);
        return temp[index - 1].count;
    }

    render() {
        const { result } = this.state;
        return (
            <div>
                <h2>Algorithm</h2>
                <p>
                    數組長度<input ref={this.lengthInput} type="text" />
                </p>
                <p>
                    最大值<input ref={this.maxInput} type="text" />
                </p>
                <p>
                    排序後的下標<input ref={this.indexInput} type="text" />
                </p>
                <p>
                    <button onClick={this.handleClick.bind(this)}>排序</button>
                </p>
                <p>{result}</p>
            </div>
        )
    }
}

