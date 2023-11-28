import React from "react";
import { render } from "@testing-library/react";

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selected:'football',
      hobbies: ["football", "swiming", "walking"],
    };
    // handleChangeHobby = (e) =>{
    //     this.setState({
    //         ...this.state,
    //         selected: e.target.value
    //     })
    // }
   
  }
  componentDidUpdate(){
    console.log(this.state.selected);
}
  render() {
    return (
      <>
        <h3> please choice a hobby</h3>
        {this.state.hobbies.map((hobby) => (
          <div key ={hobby}>
            <label>
              <input type="radio" name="hobby" value = {hobby}
              checked = {this.state.selected===hobby}
              onChange={(e) =>this.setState({
            ...this.state,
            selected: e.target.value
        })} />
              {hobby}
            </label>
          </div>
        ))}
      </>
    );
  }
}
export default RadioGroup;
