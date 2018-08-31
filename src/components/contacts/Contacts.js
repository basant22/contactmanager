import React, { Component } from "react";
import Contact from "./Contact";
import { Context } from "../../Context";

class Contacts extends Component {
  //   deleteContact = id => {
  //     console.log(id);
  //     const { contacts } = this.state;
  //     const newContact = contacts.filter(contact => contact.id !== id);
  //     this.setState({
  //       contacts: newContact
  //     });
  //   };
  render() {
    return (
      <Context.Consumer>
        {value => {
          //console.log("COnsumer value", value);
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> list
              </h1>
              {contacts.map(contact => (
                <Contact
                  key={contact.id}
                  contact={contact}
                  // deleteClickHandler={this.deleteContact.bind(this, contact.id)}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default Contacts;
