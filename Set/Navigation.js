import { Switch } from "/Set/Room.js";
import { SetLanguage } from "/Set/Languages.js";

var chart;
export function SetNavigation (room)
    {
       var request, html, language, path;
       chart = document.getElementById ("navigation");
       html = document.querySelector ("HTML");
       if (html != null)
           {  language = html.lang  }

       if (chart == null || language != room.language)
           {
              room.language = language;
              path = "/Describe/Content/";
              path += language + "/navigation.json";

              request = new XMLHttpRequest ();
              request.open ("GET", path, true);
              request.addEventListener ("load", CheckStops);
              request.send ();
            }
       else
           {  MarkCurrent ();  }

       function CheckStops ()
           {
              var route, body, point;
              try
                  {  route = JSON.parse (this.response);  }
              catch (error)
                  {
                     console.log (error);
                     return;
                   }

              body = document.body;
              chart = document.getElementById ("navigation");
              if (chart == null)
                  {
                     chart = document.createElement ("SECTION");
                     chart.id = "navigation";
                     body.appendChild (chart);
                   }
              else
                  {  chart.innerHTML = null;  }
              for (point in route)
                  {
                     if (isNaN (point))
                         {  continue;  }

                     var anchor = document.createElement ("SPAN");
                     anchor.setAttribute ("name", route [point].name);
                     anchor.addEventListener ("click", MoveTo);
                     anchor.innerHTML = route [point].content;
                     anchor.className = "link";
                     chart.appendChild (anchor);
                   }
//              SetLanguage (chart, room);
              MarkCurrent ();
            }
       function MarkCurrent ()
           {
              var current, anchor;
              current = chart.getElementsByClassName ("active");
              anchor = chart.children;

              while (current.length > 0)
                  {  current [0].classList.remove ("active");  }
              anchor [room.path].classList.add ("active");

              MovePointerTo (anchor [room.path]);
              room.title.innerHTML = anchor [room.path].innerHTML;
            }
       function MoveTo ()
           {
              var hop = this.getAttribute ("name");
              if (hop == room.path)
                  {  return;  }
              if (hop == "introduction")
                  {  hop = "/";  }

              if (hop [0] != "/")
                  {  hop = "/" + hop;  }
              history.pushState (null, null, hop);
              Switch ();
            }
     }

export function MovePointerTo (active = null)
    {
       if ((this == window || active == null) && chart != null)
           {  active = chart.getElementsByClassName ("active") [0];  }
       if (active == null || active.tagName == undefined || active.parentNode == undefined)
           {  return;  }

       var pointer, parent;
       parent = active.parentNode;
       pointer = parent.getElementsByClassName ("pointer") [0];
       if (pointer == undefined)
           {
              pointer = document.createElement ("SPAN");
              pointer.classList.add ("pointer");
              parent.appendChild (pointer);
            }
       pointer.style.setProperty ("left", active.offsetLeft + "px");
       pointer.style.setProperty ("width", active.offsetWidth + "px");
     }