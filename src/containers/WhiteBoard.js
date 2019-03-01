import React, { Component } from 'react';
import './WhiteBoard.scss';
import io from 'socket.io-client';

class WhiteBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: "http://localhost:4000",
      drawing: false,
      x: null,
      y: null,
      color: 'black'
    };
    this.drawLine = this.drawLine.bind(this);
    this.onDrawingEvent = this.onDrawingEvent.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onColorUpdate = this.onColorUpdate.bind(this);
    this.onEraseWhiteboard = this.onEraseWhiteboard.bind(this);
  }

  drawLine(x0, y0, x1, y1, color, emit) {
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();

    if (!emit) { return; }
    
    var w = this.canvas.width;
    var h = this.canvas.height;

    this.state.socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  onMouseDown(e) {    
    this.setState({
      drawing: true,
      x: e.clientX||e.touches[0].clientX,
      y: e.clientY||e.touches[0].clientY
    });
    // drawing = true;
    // current.x = e.clientX||e.touches[0].clientX;
    // current.y = e.clientY||e.touches[0].clientY;
  }

  onMouseUp(e) {
    if (!this.state.drawing) { return; }
    this.setState({ drawing: false });
    this.drawLine(this.state.x, this.state.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, this.state.color, true);

    // if (!drawing) { return; }
    // drawing = false;
    // this.drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
  }

  onMouseMove(e) {
    if (!this.state.drawing) { return; }
    this.drawLine(this.state.x, this.state.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, this.state.color, true);
    this.setState({
      x: e.clientX||e.touches[0].clientX,
      y: e.clientY||e.touches[0].clientY
    });
    
    // if (!drawing) { return; }
    // this.drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
    // current.x = e.clientX||e.touches[0].clientX;
    // current.y = e.clientY||e.touches[0].clientY;
  }

  // onColorPick() {
  //   for (var i = 0; i < colors.length; i++){
  //     colors[i].addEventListener('click', onColorUpdate, false);
  //   }
  // }

  onColorUpdate(e){
    this.setState({
      color: e.target.className.split(' ')[1]
    })
    // current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onDrawingEvent(data){
    var w = this.canvas.width;
    var h = this.canvas.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill its parent
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  onEraseWhiteboard() {
    // Remove
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element. 
    this.canvas.width = 1000;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    

    const socket = io(this.state.endpoint);
    socket.on('drawing', this.onDrawingEvent);
    this.setState({ socket });
  }

  render() {
    
    return (
      <div data-id="main">
        <div className="colors">
          <div className="color black" onClick={this.onColorUpdate}></div>
          <div className="color red" onClick={this.onColorUpdate}></div>
          <div className="color green" onClick={this.onColorUpdate}></div>
          <div className="color blue" onClick={this.onColorUpdate}></div>
          <div className="color yellow" onClick={this.onColorUpdate}></div>
          <i className="fas fa-eraser" onClick={this.onEraseWhiteboard}></i>
        </div>
        <canvas
          // We use the ref attribute to get direct access to the canvas element. 
            ref={(ref) => (this.canvas = ref)}
            style={{ background: 'white' }}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            // mouseout={this.onMouseUp}
            onMouseMove={this.onMouseMove}            
          />
      </div>
    );
  }
}

export default WhiteBoard;
