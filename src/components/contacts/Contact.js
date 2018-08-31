import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../Contact.css";
import { Context } from "../../Context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: true
  };
  onDeleteClick = async (id, dispatch) => {
    console.log("id=", id);
    try {
      await axios.delete("https://jsonplaceholder.typicode.com/users/" + id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }

    //  dispatch({ type: "DELETE_CONTACT", payload: id });
    //this.props.deleteClickHandler();
  };
  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Context.Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h3>
                {name}{" "}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ curser: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ curser: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={"/contact/edit/" + id}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      curser: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h3>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired
  //deleteClickHandler: PropTypes.func.isRequired
};
export default Contact;
