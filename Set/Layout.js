import { MovePointerTo } from "/Set/Navigation.js";
import { FillContent } from "/Set/Content.js";
import { AnimateHome } from "/Set/Life.js";
import { ScrollMonitor, LastScroll } from "/Set/Scroll.js";

export function SetWhole (room)
    {
       var main, page, path,
         current, body, request;

       body = document.body;
       main = document.getElementById ("main");
       if (main == null)
           {
              main = document.createElement ("SECTION");
              main.id = "main";
              body.appendChild (main);
            }

       page = document.getElementsByClassName ("page");
       current = page [room.path];
       if (current == undefined)
           {
              current = document.createElement ("SECTION");
              current.classList.add ("page");
              current.setAttribute ("tabindex", 0);
              current.setAttribute ("name", room.path);
              main.appendChild (current);
            }
       FlipPage (room, main);
       current.focus ({ preventScroll: true });

       path = "/Describe/Structure/";
       path += room.path + ".json";

       request = new XMLHttpRequest ();
       request.open ("GET", path, true);
       request.addEventListener ("load", CheckContent);
       request.send ();

       function CheckContent ()
           {
              var content;
              try
                  {  content = JSON.parse (this.response);  }
              catch (error)
                  {  console.log (error);  }

              current.innerHTML = null;
              AttachDescendants (current, content);
              FillContent (current, room);
              MovePointerTo ();
              //LastScroll ();

              if (location.pathname == "/")
                  {  AnimateHome ();  }
            }
     }

async function AttachDescendants (parent, child = null)
    {
       if (child == null)
           {  return;  }

       var current, fixed, step, name;
       if (typeof (child) == "object" && child.nature != undefined)
           {
              current = child.nested;
              fixed = document.createElement (child.nature);
              delete child.nature;
              delete child.nested;

              for (name in child)
                  {
                     if (name == "text")
                         {  fixed.innerHTML = child [name];  }
                     fixed.setAttribute (name, child [name]);
                   }
              parent.appendChild (fixed);
              parent = fixed;
            }
       else if (Array.isArray (child))
           {  current = child;  }

       for (step in current)
           {
              if (isNaN (step))
                  {  continue;  }
              AttachDescendants (parent, current [step]);
            }
     }
function FlipPage (room = null, root = null)
    {
       if (room == null)
           {  return;  }

       var active, page, navigation, sheet, name;
       if (root == null)
           {  root = document;  }

       page = root.getElementsByClassName ("page");
       page [room.path].classList.add ("active");
       navigation = document.getElementById ("navigation");
       if (navigation == null || navigation.children == undefined)
           {  return;  }

       navigation = navigation.children;
       for (sheet in page)
           {
              if (isNaN (sheet) || !page [sheet].classList.contains ("active") || page [sheet] == page [room.path])
                  {  continue;  }

              active = page [sheet];
              active.classList.remove ("hide", "active", "show", "from", "left", "to", "right");
              name = active.getAttribute ("name");
            }
       page [room.path].classList.remove ("hide", "show", "from", "left", "to", "right");
       if (navigation [name] == undefined)
           {  return;  }

       if (navigation [name].offsetLeft > navigation [room.path].offsetLeft)
           {
              active.classList.add ("hide", "to", "right");
              page [room.path].classList.add ("show", "from", "left");
            }
       else
           {
              active.classList.add ("hide", "to", "left");
              page [room.path].classList.add ("show", "from", "right");
            }
     }