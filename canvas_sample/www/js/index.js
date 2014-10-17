/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
       console.log('init');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log(app);
        app.prepareCanvas();
    },
    prepareCanvas: function(){
      console.log('test');
      var canvas, context, canvaso, contexto;

      // The active tool instance.
      var tool;
      var tool_default = 'pencil';

      this.init = function() {
        // Find the canvas element.
        canvaso = document.getElementById('imageView');
        if (!canvaso) {
          alert('Error: I cannot find the canvas element!');
          return;
        }

        if (!canvaso.getContext) {
          alert('Error: no canvas.getContext!');
          return;
        }

        // Get the 2D canvas context.
        contexto = canvaso.getContext('2d');
        if (!contexto) {
          alert('Error: failed to getContext!');
          return;
        }

        // Add the temporary canvas.
        var container = canvaso.parentNode;
        canvas = document.createElement('canvas');
        if (!canvas) {
          alert('Error: I cannot create a new canvas element!');
          return;
        }

        canvas.id     = 'imageTemp';
        canvas.width  = canvaso.width;
        canvas.height = canvaso.height;
        container.appendChild(canvas);

        context = canvas.getContext('2d');


        // Activate the default tool.
        if (tools[tool_default]) {
          tool = new tools[tool_default]();
        }

        // Attach the mousedown, mousemove and mouseup event listeners.
        canvas.addEventListener('mousedown', this.ev_canvas, false);
        canvas.addEventListener('mousemove', this.ev_canvas, false);
        canvas.addEventListener('mouseup',   this.ev_canvas, false);
        document.addEventListener("touchend", function(e) { e.preventDefault(); }, false);
        canvas.addEventListener("touchstart", this.ev_canvas, false);
        canvas.addEventListener("touchmove", this.ev_canvas, false);
        canvas.addEventListener("touchend", this.ev_canvas, false);
      }

      // The general-purpose event handler. This function just determines the mouse 
      // position relative to the canvas element.
      this.ev_canvas = function (ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
          ev._x = ev.layerX;
          ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
          ev._x = ev.offsetX;
          ev._y = ev.offsetY;
        }
        console.log("The event was" + ev.type);

        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
          func(ev);
        }
      }

      // This function draws the #imageTemp canvas on top of #imageView, after which 
      // #imageTemp is cleared. This function is called each time when the user 
      // completes a drawing operation.
      this.img_update  = function () {
        contexto.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      // This object holds the implementation of each drawing tool.
      var tools = {};

      // The drawing pencil.
      tools.pencil = function () {
        var tool = this;
        this.started = false;

        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.mousedown = function (ev) {
            context.beginPath();
            context.moveTo(ev._x, ev._y);
            tool.started = true;
        };
        this.touchstart = this.mousedown;

        // This function is called every time you move the mouse. Obviously, it only 
        // draws if the tool.started state is set to true (when you are holding down 
        // the mouse button).
        this.mousemove = function (ev) {
          if (tool.started) {
            context.lineTo(ev._x, ev._y);
            context.stroke();
          }
        };
        this.touchmove = function(ev){ console.log(ev) };

        // This is called when you release the mouse button.
        this.mouseup = function (ev) {
          if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            main.img_update();
          }
        };
        this.touchend = this.mouseup;
      };

      main = this;
      this.init();
    }
};


// Keep everything in anonymous function, called on window load.


// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
