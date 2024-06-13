import { room } from "/Set/Room.js";

export function ScrollMonitor ()
    {
       var request, filter;
       filter = "name=" + room.path + "scroll";
       filter += "&value=" + this.scrollY;
console.log (filter);
     }
export function LastScroll ()
    {
       var filter, request, headers;
       filter = "name=" + room.path;
       filter += "scroll&type=fetch";
console.log (filter);
     }