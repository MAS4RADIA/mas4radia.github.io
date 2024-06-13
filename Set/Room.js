import { SetNavigation } from "/Set/Navigation.js";

export var room;
room = new Object ();
room.title = document.querySelector ("TITLE");
room.name = room.title.innerHTML;

export function Switch ()
    {
       var path = location.pathname;
       if (path [0] == "/")
           {  path = path.slice (1);  }
       if (path [path.length - 1] == "/")
           {  path = path.slice (0, path.length - 1);  }

       room.path = path;
       SetNavigation (room);
     }