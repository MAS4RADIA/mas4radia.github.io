window.addEventListener ("resize", SetSize);

export function AnimateHome ()
    {
       var canvas, brush, radius, angle, animation;
       canvas = document.querySelector ("CANVAS");
       if (canvas == null || canvas.getContext == undefined)
           {  return;  }

       radius = SetSize (canvas);
       brush = canvas.getContext ("2d");

       angle = 0;
       Move ();

       function Move ()
           {
              if (angle >= Math.PI * 2)
                  {
                     cancelAnimationFrame (animation);
                     return;
                   }

              brush.beginPath ();
              brush.clearRect (0, 0, canvas.width, canvas.height);
              brush.arc (canvas.width / 2, canvas.height / 2, radius, 0, angle);
              brush.stroke ();

              angle += Math.PI / 100;
              animation = requestAnimationFrame (Move);
            }
     }

function SetSize (canvas = null)
    {
       if (this == window)
           {  canvas = document.querySelector ("CANVAS");  }
       if (canvas == null || canvas.parentNode == undefined)
           {  return;  }

       var banner, reference, radius, brush, origin;
       reference = canvas.parentNode;
       canvas.width = reference.offsetWidth;
       canvas.height = reference.offsetHeight;

       banner = reference.getElementsByClassName ("banner") [0];
       if (banner == undefined)
           {
              radius = Math.min (canvas.width, canvas.height) / 4;
              return (radius * 1.3);
            }

       origin = new Object ();
       radius = (banner.clientWidth / 2) * 1.3;
       if (canvas.getContext != undefined)
           {
              brush = canvas.getContext ("2d");
              brush.strokeStyle = "#FFF";
              brush.lineWidth = 2;
              brush.shadowBlur = 10;
              brush.shadowColor = "#FFF";

              origin.x = banner.offsetLeft + banner.clientWidth / 2;
              origin.y = banner.offsetTop + banner.clientHeight / 2;

              brush.beginPath ();
              brush.clearRect (0, 0, canvas.width, canvas.height);
              brush.arc (origin.x, origin.y, radius, 0, Math.PI * 2);
              brush.stroke ();
            }
       return (radius);
     }