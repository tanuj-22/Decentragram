import React, { Component } from "react";
import Identicon from "identicon.js";
import photo from "../photo.png";

class Navbar extends Component {
  render() {
    return (
      <>
        <div class="navigation">
          <div class="logo">
            <a class="no-underline" href={window.location.origin}>
              Decentragram
            </a>
          </div>

          <div class="navigation-icons">
            <span
              style={{ cursor: "pointer" }}
              onClick={this.props.showModal}
              className="material-symbols-outlined"
            >
              add_to_photos
            </span>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-secondary">
                  {/* <small id="account">{this.props.account}</small> */}
                </small>
                {this.props.account ? (
                  <>
                    <span
                      className="material-symbols-outlined hovertext"
                      data-hover={this.props.account}
                    >
                      account_circle
                    </span>
                    {/* <img
                      className="ml-2"
                      width="30"
                      height="30"
                      src={`data:image/png;base64,${new Identicon(
                        this.props.account,
                        30
                      ).toString()}`}
                    /> */}
                  </>
                ) : (
                  <span></span>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href={window.location.origin}
            rel="noopener noreferrer"
          >
            <img
              src={photo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Decentragram
          </a>
          
        </nav> */}
      </>
    );
  }
}

export default Navbar;
