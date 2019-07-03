class Counter extends React.Component {
    render() {
        console.log("Counter");
        return (
            <div>
                {this.props.display}
            </div>
        );
    }
}

class CounterParent extends React.Component {
    state = {
        count: 0,
    };

    increase = (e) => {
        if(e.shiftKey) {    // shift키를 입력했을 때의 이벤
            this.state.count += 10;
        }
        else {
            this.state.count += 1;
        }

        this.setState({
            count: this.state.count,
        });
    }

    render() {
        console.log("CounterParent");
        return (
            <div>
                <Counter display={this.state.count}/>
                <button onClick={this.increase}> ++++++++++ </button>  {/* 버튼 클릭했을 때 증가시키는 increase 함수 호출 */}
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <CounterParent/>
    </div>,
    document.querySelector("#container")
);