import React from 'react';
import { RouteState, withRoute } from 'react-router-named-route';

const TIMEOUT = 5;

class NotFound extends React.PureComponent<{routeState:RouteState}> {
  state = {timeLeft:TIMEOUT};
  intervalHandler:any = null;
  timeoutHandler:any = null;

  componentDidMount(){
    const {goRoute} = this.props.routeState;

    this.intervalHandler = setInterval(()=>{
      this.setState({timeLeft:this.state.timeLeft - 1});
    },1000);
    this.timeoutHandler = setTimeout(()=>{
      goRoute('home');
    },1000 * TIMEOUT);
  }

  componentWillUnmount(){
    this.intervalHandler && clearInterval(this.intervalHandler);
    this.timeoutHandler && clearTimeout(this.timeoutHandler);
  }

  render (){
    return (
      <div className="App">
          404 Not Found, will redirect to home in {this.state.timeLeft} seconds
      </div>
    );
  }
}

export default withRoute(NotFound);
