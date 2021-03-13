import React from 'react';

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
      <div className="d-flex flex-row justify-content-center">
        <div className="error-page">
          <h2 className="headline text-warning"> 404</h2>

          <div className="error-content">
            <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

            <p className="text-white">
              We could not find the page you were looking for.
            Meanwhile, you may <a href="/">return to Home</a> or try using the search form.
          </p>


          </div>
        </div>
      </div>
    )
  }

}
export default NotFound;