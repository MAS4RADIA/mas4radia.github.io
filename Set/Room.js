import { SetNavigation } from "/Set/Navigation.js";
import { SetWhole } from "/Set/Layout.js";

export var room;
room = new Object ();
room.title = document.querySelector ("TITLE");
room.name = room.title.innerHTML;

export function Switch ()
    {
       var path = location.pathname;
       if (path == "/")
           {  path = "/introduction";  }
       if (path [0] == "/")
           {  path = path.slice (1);  }

       room.path = path;
       SetNavigation (room);
       SetWhole (room);
     }