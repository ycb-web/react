import { Component } from "react";

interface IState {
  name: string;
  counter: number;
}

export default class helloWorld extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "John",
      counter: 0,
    };

    // this.changeName = this.changeName.bind(this);
  }

  // 箭头函数的this指向当前组件实例
  // changeName = () => {
  //   this.setState({
  //     counter: this.state.counter + 1,
  //   });
  // };
  //
  // 直接调用的话 函数的this指向window
  changeName() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  render() {
    return (
      <>
        <h1>Hello {this.state.name}</h1>
        <button onClick={() => this.setState({ name: "Jane" })}>
          change name
        </button>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={this.changeName}>change counter</button>
      </>
    );
  }
}
