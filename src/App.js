import './App.css';
import 'http';
import React from 'react';

const http = require('http');

function getExternalIp(){
  return '35.225.6.46';
}

function requestExpress(opt){
  let chunks = [];
  const req = http.request(opt, (res) =>{
    res.on('data', (chunk) =>{
      chunks.push(chunk);
    });
    
    res.on('end', ()=>{
      chunks = chunks.join();
      return chunks;
    });

    res.on('error', (err) => {
      if (err)
        throw err;
    });
  });
  req.method = 'GET';
  req.end();
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      getmsg: ''
    };
  }

  getExpress(){
    let msg;
    const httpOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };
    try {
      msg = requestExpress(httpOptions);
      this.setState({getmsg:msg});
    } catch (err) {
      if (httpOptions.hostname = 'localhost'){
        let ipExt = getExternalIp();
        httpOptions.hostname = ipExt;
        msg = requestExpress(httpOptions);
      }
    }
    
  }

  render(){
    return (
      <div className="App">
        <button onClick={() => this.getExpress()}>Enviar</button> <br/>
        {this.state.getmsg}
      </div>
    );
  }
}

export default App;
