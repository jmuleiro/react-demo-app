import './App.css';
import 'http';
import React from 'react';

const http = require('http');

function getExternalIp(){
  return '35.225.6.46';
}


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      getmsg: ''
    };
  }

  requestExpress(opt){
    let chunks = [];
    const req = http.request(opt, (res) =>{
      res.on('data', (chunk) =>{
        console.log("chunk n°" + (chunks.length + 1));
        chunks.push(chunk);
      });
      
      res.on('end', ()=>{
        chunks = chunks.join();
        console.log("request ended. final string: " + chunks);
        this.setState({getmsg:chunks});
      });
  
    });
    req.method = 'GET';
    req.on('error', (err) =>{
      if (opt.hostname == 'localhost'){
        let ipExt = getExternalIp();
        opt.hostname = ipExt;
        return this.requestExpress(opt);
      }
      else
        throw err;
    });
    req.end();
  }

  getExpress(){
    const httpOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };

    this.requestExpress(httpOptions);
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
