import React from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  //--------------------------------------------------------------
  componentWillMount() {
  }
  render() {
    return (
      <div className="error-page">
        <h2 className="headline text-warning"> 404</h2>

        <div className="error-content">
          <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

          <p className="text-white">
            We could not find the page you were looking for.
            Meanwhile, you may <a href="/">return to dashboard</a> or try using the search form.
          </p>

         
        </div>
      </div>
    )
  }

}
export default NotFound;