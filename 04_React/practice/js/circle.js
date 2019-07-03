class Circle extends React.Component {
    render() {
        const circleStyle = {
            padding: 10,
            margin: 20,
            display: "inline-block",
            backgroundColor: this.props.bgColor,
            borderRadius: "50%",
            width: 100,
            height: 100,
        };

        return (
            <div style={circleStyle}>
            </div>
        );
    }
}

let renderData = [];

function ShowCircle() {
    const circleColors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363", "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

    for(let i = 0; i < circleColors.length; i++) {
        renderData.push(<Circle key={i} bgColor={circleColors[i]} />);
    }
}

ShowCircle();

ReactDOM.render(
    <div>
        {renderData}
    </div>,
    document.querySelector("#container")
);