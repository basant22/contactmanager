import React, { Component } from "react";
import { Context } from "../../Context";
//import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    if (name === "") {
      this.setState({
        errors: { name: "Name is reqired" }
      });
      return;
    }
    if (email === "") {
      this.setState({
        errors: { email: "Email is reqired" }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        errors: { phone: "Phone is reqired" }
      });
      return;
    }
    const newContact = {
      name,
      email,
      phone
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    //dispatch({ type: "ADD_CONTACT", payload: newContact });
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
    // if (
    //   newContact.name.length > 0 &&
    //   newContact.email.length > 0 &&
    //   newContact.name.length > 0
    // ) {

    // }

    //console.log(this.state);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  //   onEmailChange = e => this.setState({ email: e.target.value });
  //   onPhoneChange = e => this.setState({ phone: e.target.value });
  render() {
    const { name, email, phone } = this.state;
    return (
      <Context.Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={this.state.errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={this.state.errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={this.state.errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default AddContact;
