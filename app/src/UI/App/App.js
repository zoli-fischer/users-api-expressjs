import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="middle">
        <div className="container">
          <div className="row">
            <div className="col-md-4 offset-md-4">
                <form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <div className="invalid-feedback">Example invalid custom select feedback</div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="alert alert-danger" role="alert">
                    <small>Wrong email and/or password. Please try again.</small>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
