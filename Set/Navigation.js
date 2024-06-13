import { Switch } from "/Set/Room.js";
import { SetLanguage } from "/Set/Languages.js";
import { SetWhole } from "/Set/Layout.js";

var chart, route;
export function SetNavigation (room)
    {
       var request, html, language, path;
       chart = document.getElementById ("navigation");
       html = document.querySelector ("HTML");
       if (html != null)
           {  language = html.lang  }
       if (room.path.length < 1 && route != undefined && route.length > 0 && route [0].name != undefined)
           {  room.path = route [0].name;  }

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
              var body, point;
              try
                  {  route = JSON.parse (this.response);  }
              catch (error)
                  {
                     console.log (error);
                     return;
                   }
              if (room.path.length < 1 && route.length > 0 && route [0].name != undefined)
                  {  room.path = route [0].name;  }

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

                     var anchor, link;
                     link = route [point].name;
                     if (point == 0)
                         {  link = "";  }

                     link = "/" + link;
                     anchor = document.createElement ("A");
                     anchor.setAttribute ("name", route [point].name);
                     anchor.setAttribute ("href", link);
                     anchor.innerHTML = route [point].content;
                     anchor.addEventListener ("click", MoveTo);
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
              if (anchor [room.path] == undefined)
                  {  return;  }

              while (current.length > 0)
                  {  current [0].classList.remove ("active");  }
              anchor [room.path].classList.add ("active");

              MovePointerTo (anchor [room.path]);
              room.title.innerHTML = anchor [room.path].innerHTML;
              SetWhole (room);
            }
       function MoveTo (click)
           {
              var first, hop;
              click.preventDefault ();
              hop = this.getAttribute ("name");
              first = chart.children [0];

              if (hop == room.path)
                  {  return;  }
              if (this == first)
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
       pointer.style.setProperty ("top", active.offsetTop + "px");
     }