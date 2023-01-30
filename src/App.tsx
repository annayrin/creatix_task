import React, {memo, PureComponent, useRef, useState} from "react";
import "./App.css";

interface IDataRecord {
    label: string;
    value: number;
}

interface IAppProps {
    size?: number;
}

interface IRowProps {
    label: string;
    value: number;
    index: number;
    onUpdate: (index: number) => void;
}

class Row extends PureComponent<IRowProps> {

    renderCount = 0;
    handleUpdate = () => {
        this.props.onUpdate(this.props.index);
    };

    render() {
        this.renderCount++;
        return (
            <div>
                <span className="label">{this.props.label}:</span>
                <span>{this.props.value}</span> <span>({this.renderCount})</span>{" "}
                <button className="button" onClick={this.handleUpdate}>
                    Update
                </button>
            </div>
        );
    }
}


export class App extends React.Component<IAppProps, { list: IDataRecord[] }> {
    state = {
        list: Array.from({length: this.props.size ?? 200}, (_el, index) => ({
            label: `label ${index + 1}`,
            value: App.generateValue()
        }))
    };

    static generateValue() {
        return Math.round(100 + Math.random() * 900);
    }

    handleUpdate = (index: number) => {
        let changedList = [...this.state.list]
        changedList[index].value = 1
        this.setState({list: changedList})

    };

    render() {
        return (
            <div>
                <h1>Test app</h1>
                {this.state.list.map((el, index) => (
                    <Row
                        key={`list_item_${index}`}
                        label={el.label}
                        value={el.value}
                        index={index}
                        onUpdate={this.handleUpdate}
                    />
                ))}
            </div>
        );
    }
}

const MemoRow = memo(({label, value, index, onUpdate}: IRowProps) => {

    const renderCount = useRef(0)
    const handleUpdate = () => {
        onUpdate(index);
    };
    return (
        (<li>
            <span>{label}:</span>
            <span>{value} ({renderCount.current++})</span>
            <button onClick={handleUpdate}>
                Update
            </button>
        </li>)
    );
}, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
})

function App2({size}: IAppProps) {

    const [list, setList] = useState<IDataRecord[]>(Array.from({length: size ?? 200}, (_el, index) => ({
            label: `Label ${index + 1}`,
            value: generateValue()
        }))
    )

    function generateValue() {
        return Math.round(100 + Math.random() * 900);
    }

    const handleUpdate = (index: number) => {
        let changedList = [...list]
        changedList[index].value = 1
        setList(changedList)
    };

    return (
        <div className="wrapper">
            <h2> Test App 2</h2>
            <ul className="list">
                {
                    list.map((item, index) =>
                        <MemoRow
                            key={`list_item_${index}`}
                            label={item.label}
                            value={item.value}
                            index={index}
                            onUpdate={() => handleUpdate(index)}/>
                    )
                }
            </ul>
        </div>
    );
}


export default App2;



