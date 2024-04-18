import { room } from "/Set/Room.js";

export function ScrollMonitor ()
    {
       var request, filter;
       filter = "name=" + room.path + "scroll";
       filter += "&value=" + this.scrollY;
       request = new XMLHttpRequest ();
       request.open ("GET", "/Set/Session.php?" + filter, true);
       request.send ();
     }
export function LastScroll ()
    {
       var filter, request, headers;
       filter = "name=" + room.path;
       filter += "scroll&type=fetch";
       request = new XMLHttpRequest ();
       request.open ("GET", "/Set/Session.php?" + filter, true);
       request.addEventListener ("load", SetPosition);
       request.send ();

       function SetPosition ()
           {
              var html, position;
              position = parseInt (this.response);
              if (position == NaN)
                  {  return;  }
              html = document.querySelector ("HTML");
              html.scrollTop = position;
            }
     }