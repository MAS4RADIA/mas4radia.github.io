export function FillContent (main = null, room = null)
    {
       if (main == null || room == null || main.tagName == undefined || room.language == undefined || room.path == undefined)
           {  return;  }

       var request, path;
       path = "/Describe/Content/" + room.language;
       path += "/" + room.path + ".json";

       request = new XMLHttpRequest ();
       request.open ("GET", path, true);
       request.addEventListener ("load", CheckContent);
       request.send ();

       function CheckContent ()
           {
              var structure, section, name;
              try
                  {  structure = JSON.parse (this.response);  }
              catch (error)
                  {
                     console.log (error);
                     return;
                   }
              name = document.getElementById ("app_name");
              if (name != null)
                  {  name.innerHTML = room.name;  }
              MarkContent (main, structure);
            }
     }

function MarkContent (main = null, structure = null)
    {
       if (main == null || structure == null || main.tagName == undefined)
           {  return;  }

       var current, done, value;
       if (Array.isArray (structure))
           {  current = structure;  }
       else if (typeof (structure) == "object")
           {
              current = structure.nested;
              delete structure.nested;
              if (structure.text != undefined)
                  {  main.innerHTML = structure.text;  }
            }

       done = new Object ();
       for (value in current)
           {
              if (isNaN (value))
                  {  continue;  }

              var child, content, index, addition, property;
              child = main.children;
              content = current [value];
              property = content ["class"];
              if (done [property] == undefined)
                  {  done [property] = 0;  }

              if (content.name != undefined)
                  {  child = child [content.name];  }
              if (property != undefined)
                  {
                     index = 0;
                     child = main.getElementsByClassName (property);
                     if (child.length > value)
                         {  index = value;  }
                     if (child.length <= done [property])
                         {
                            addition = child [child.length - 1].cloneNode (true);
                            main.appendChild (addition);
                            child = addition;
                          }
                     else
                         {  child = child [index];  }
                   }
              MarkContent (child, content);
              done [property] ++;
            }
     }