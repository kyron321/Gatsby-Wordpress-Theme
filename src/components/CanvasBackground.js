// src/components/CanvasBackground.js
import React, { useEffect } from 'react';

const CanvasBackground = () => {
  useEffect(() => {
    const canvasDotsBg = function () {
      const canvas = document.querySelector('.canvas-2'),
        ctx = canvas.getContext('2d'),
        colorDot = [
          'rgb(81, 162, 233)',
          'rgb(81, 162, 233)',
          'rgb(81, 162, 233)',
          'rgb(81, 162, 233)',
          'rgb(228,128,70)',
        ],
        color = 'rgb(81, 162, 233)';

      // Get the device pixel ratio, falling back to 1.
      const dpr = window.devicePixelRatio || 1;
      // Get the size of the canvas in CSS pixels.
      const rect = canvas.getBoundingClientRect();
      // Give the canvas pixel dimensions of their CSS size * the device pixel ratio.
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.display = 'block';
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = color;

      let mousePosition = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      };

      const windowSize = window.innerWidth;
      let dots;

      if (windowSize > 1600) {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      } else if (windowSize > 1300) {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      } else if (windowSize > 1100) {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      } else if (windowSize > 800) {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      } else if (windowSize > 600) {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      } else {
        dots = {
          nb: 500,
          distance: 100,
          d_radius: 150,
          array: [],
        };
      }

      function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();

        this.radius = Math.random() * 1.5;
        this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
      }

      Dot.prototype = {
        create: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

          ctx.fillStyle = this.colour;
          ctx.fill();
        },

        animate: function () {
          for (let i = 1; i < dots.nb; i++) {
            const dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {
              dot.vx = dot.vx;
              dot.vy = -dot.vy;
            } else if (dot.x < 0 || dot.x > canvas.width) {
              dot.vx = -dot.vx;
              dot.vy = dot.vy;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
          }
        },

        line: function () {
          for (let i = 0; i < dots.nb; i++) {
            for (let j = 0; j < dots.nb; j++) {
              const i_dot = dots.array[i];
              const j_dot = dots.array[j];

              if (
                i_dot.x - j_dot.x < dots.distance &&
                i_dot.y - j_dot.y < dots.distance &&
                i_dot.x - j_dot.x > -dots.distance &&
                i_dot.y - j_dot.y > -dots.distance
              ) {
                if (
                  i_dot.x - mousePosition.x < dots.d_radius &&
                  i_dot.y - mousePosition.y < dots.d_radius &&
                  i_dot.x - mousePosition.x > -dots.d_radius &&
                  i_dot.y - mousePosition.y > -dots.d_radius
                ) {
                  ctx.beginPath();
                  ctx.moveTo(i_dot.x, i_dot.y);
                  ctx.lineTo(j_dot.x, j_dot.y);

                  ctx.strokeStyle = color;
                  ctx.stroke();
                  ctx.closePath();
                }
              }
            }
          }
        },
      };

      function createDots() {
        for (let i = 0; i < dots.nb; i++) {
          dots.array.push(new Dot());
        }
      }

      function drawDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < dots.nb; i++) {
          var dot = dots.array[i];
          dot.create();
        }
        dots.array[0].radius = 1.5;
        dots.array[0].colour = '#51a2e9';
        dots.array[0].animate();
      }

      window.onscroll = function () {
        mousePosition.x = Math.random() * canvas.width;
        mousePosition.y = Math.random() * canvas.height;
      };

      createDots();
      const draw = setInterval(drawDots, 1000 / 30);

      window.onresize = function () {
        clearInterval(draw);
        canvasDotsBg();
      };
    };

    canvasDotsBg();
  }, []);

  return <canvas className="canvas-2" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default CanvasBackground;