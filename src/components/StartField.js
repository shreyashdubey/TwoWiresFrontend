import React, { useEffect, useRef } from "react";

const Starfield = ({
  speedFactor = 0.1,
  backgroundColor = "black",
  starColor = [255, 255, 255],
  starCount = 2500,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        let w = window.innerWidth;
        let h = window.innerHeight;

        const setCanvasExtents = () => {
          canvas.width = w;
          canvas.height = h;
        };

        setCanvasExtents();

        window.addEventListener("resize", () => {
          w = window.innerWidth;
          h = window.innerHeight;
          setCanvasExtents();
        });

        const makeStars = (count) => {
          const out = [];
          for (let i = 0; i < count; i++) {
            const s = {
              x: Math.random() * 1600 - 800,
              y: Math.random() * 900 - 450,
              z: Math.random() * 1000,
            };
            out.push(s);
          }
          return out;
        };

        const stars = makeStars(starCount);

        const clear = () => {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const putPixel = (x, y, brightness) => {
          const rgb =
            "rgba(" +
            starColor[0] +
            "," +
            starColor[1] +
            "," +
            starColor[2] +
            "," +
            brightness +
            ")";
          ctx.fillStyle = rgb;
          ctx.fillRect(x, y, 1, 1);
        };

        const moveStars = (distance) => {
          const count = stars.length;
          for (let i = 0; i < count; i++) {
            const s = stars[i];
            s.z -= distance;
            while (s.z <= 1) {
              s.z += 1000;
            }
          }
        };

        let prevTime;

        const init = (time) => {
          prevTime = time;
          requestAnimationFrame(tick);
        };

        const tick = (time) => {
          const elapsed = time - prevTime;
          prevTime = time;

          moveStars(elapsed * speedFactor);

          clear();

          const cx = w / 2;
          const cy = h / 2;

          const count = stars.length;
          for (let i = 0; i < count; i++) {
            const star = stars[i];

            const x = cx + star.x / (star.z * 0.001);
            const y = cy + star.y / (star.z * 0.001);

            if (x < 0 || x >= w || y < 0 || y >= h) {
              continue;
            }

            const d = star.z / 1000.0;
            const b = 1 - d * d;

            putPixel(x, y, b);
          }

          requestAnimationFrame(tick);
        };

        requestAnimationFrame(init);
      } else {
        console.error("Could not get 2d context from canvas element");
      }
    } else {
      console.error("Could not find canvas element");
    }

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [starColor, backgroundColor, speedFactor, starCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10,
        opacity: 1,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default Starfield;
