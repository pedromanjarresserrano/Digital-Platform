import React from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  //--------------------------------------------------------------
  componentWillMount(){
  }
  render(){
    return(
      <div>
        <h4 >Página no encontrada</h4>
      </div>
    )
  }

}
export default NotFound;