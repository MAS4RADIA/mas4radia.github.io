import { Switch } from "/Set/Room.js";
import { MovePointerTo } from "/Set/Navigation.js";

window.addEventListener ("popstate", Switch);
window.addEventListener ("resize", MovePointerTo);

Switch ();