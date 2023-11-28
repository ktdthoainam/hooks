import React from "react";

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log('content component did mount');
    console.log(this.props);
  }
  componentWillUnmount() {
    console.log("content component will Unmount");
  }
  componentDidUpdate() {
    console.log("content component did update");
  }
  render() {
    return (
      <h1 style={{ color: this.props.color, background: this.props.bgColor }}>
        Content
      </h1>
    );
  }
}
export default Content;
