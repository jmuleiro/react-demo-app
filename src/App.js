import './App.css';
import 'http';
import React from 'react';

const http = require('http');

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      getmsg: ''
    };
  }

  getExpress(){
    let chunks = [];
    const httpOptions = {
      hostname: 'http://localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };
    const req = http.request(httpOptions, (res) =>{
      
      res.on('data', (chunk) =>{
        chunks.push(chunk);
      });
      
      res.on('end', ()=>{
        chunks = chunks.join();
        this.setState({getmsg:chunks});
        console.log(chunks);
      });
    });
    req.method = 'GET';
    req.end();
    
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
