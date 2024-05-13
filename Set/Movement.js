window.addEventListener ("resize", ResizeWindow);

var board;
export function SetWindows ()
    {
       var list, item;
       list = document.getElementsByClassName ("window") [0];
       if (list == undefined)
           {  return;  }
       list = list.children;

       for (item in list)
           {
              if (isNaN (item))
                  {  continue;  }

              var name = list [item];
              name.addEventListener ("click", SwitchActive);
            }
       SwitchActive (list);
     }
function SwitchActive (list = null)
    {
       var active = this;
       if (list != null && list.type == undefined && list.length > 0)
           {  active = list [0];  }
       if (active == undefined || active.tagName == undefined)
           {  return;  }

       var name, old, item, hash, parent, title;
       title = active.getElementsByClassName ("title") [0];
       if (title == undefined)
           {  return;  }

       name = title.innerText;
       name = name.replace (" ", "_");
       hash = name.toLowerCase ();
       if (location.hash == hash)
           {  return;  }

       parent = active.parentNode;
       if (parent == undefined)
           {  return;  }

       var dont_do_anything = false;
       old = parent.getElementsByClassName ("active");
       for (item in old)
           {
              if (isNaN (item))
                  {  continue;  }

              var element = old [item];
              if (element == active)
                  {
                     dont_do_anything = true;
                     continue;
                   }
              element.classList.remove ("active");
            }
       if (dont_do_anything)
           {  return;  }

       active.classList.add ("active");
       OpenWindow (active);
     }
function OpenWindow (active = null)
    {
       if (active == null)
           {  return;  }

       var root, parent;
       parent = active.parentNode;
       if (parent == undefined)
           {  return;  }

       root = parent.parentNode;
       if (root == undefined || root.innerHTML == undefined)
           {  return;  }

       board = root.getElementsByClassName ("widget") [0];
       if (board == undefined)
           {  return;  }

       board.innerHTML = active.innerHTML;
       ResizeWindow ();
     }
function ResizeWindow ()
    {
       if (board == null || board.tagName == undefined)
           {  return;  }

       var raw, width, clean, area, height;
       width = board.clientWidth;
       height = board.clientHeight;
       if (isNaN (width) || isNaN (height))
           {  return;  }

       area = width * height;
       raw = Math.sqrt (area / 2);
       clean = Math.ceil (raw);
       board.style.setProperty ("min-height", 0);
       board.style.setProperty ("width", (clean * 2) + "px");
     }