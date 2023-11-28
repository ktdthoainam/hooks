import React from "react";
import Content from "./Content";
class AppCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      showContent: false,
    };
  }
  handleToggleContent = () => {
    this.setState({
      ...this.state,
      showContent: !this.state.showContent,
    });
  };
  handleDecreament = () => {
    this.setState({
      ...this.state,
      number: this.state.number - 1,
    });
  };
  handleIncreament = () => {
    this.setState({
      ...this.state,
      number: this.state.number + 1,
    });
  };

  render() {
    return (
      <>
        <h1>{this.state.number}</h1>
        <button onClick={this.handleIncreament}> Increament </button>
        <button onClick={this.handleDecreament}> Decreament </button>
        <br />
        <button onClick={this.handleToggleContent}>
          Toggle Content Componet
        </button>
        {this.state.showContent && <Content bgColor = {'green'} color = {'white'}/>}
      </>

    );
  }
}
export default AppCount;
