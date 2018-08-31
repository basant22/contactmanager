import React, { Component } from "react";
import axios from "axios";
export const Context = React.createContext({
  contacts: [],
  dispatch: action => this.setState()
});
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: "John Doe",
      //   email: "jdoe@gmail.com",
      //   phone: "555-555-5555"
      // },
      // {
      //   id: 2,
      //   name: "Karen Willioms",
      //   email: "karen@gmail.com",
      //   phone: "222-222-2222"
      // },
      // {
      //   id: 3,
      //   name: "Hanery Jonshon",
      //   email: "hanery@gmail.com",
      //   phone: "111-111-1111"
      // }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({
      contacts: res.data
    });
  }
  render() {
    // console.log("state", this.props);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
