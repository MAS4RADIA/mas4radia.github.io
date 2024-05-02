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

       var done, current, property, value;
       if (Array.isArray (structure))
           {  current = structure;  }
       else if (typeof (structure) == "object")
           {
              current = structure.nested;
              if (structure.text != undefined)
                  {  main.innerHTML = structure.text;  }

              delete structure ["class"];
              delete structure.nested;
              delete structure.name;
              delete structure.text;

              for (property in structure)
                  {
                     if (!isNaN (property))
                         {  continue;  }
                     main.setAttribute (property, structure [property]);
                   }
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
                     if (child == null)
                         {  continue;  }

                     if (child.length > value)
                         {  index = value;  }
                     if (child.length <= done [property])
                         {
                            addition = Template (child);
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
function Template (node = null)
    {
       if (node == null)
           {  return;  }
       if (node.length > 0)
           {  node = node [0];  }
       if (node.tagName == undefined)
           {  return;  }

       var raw, clean;
       raw = node.cloneNode (true);
       clean = ClearContents (raw);
       return (clean);

       function ClearContents (node = null)
           {
              if (node == null)
                  {  return;  }

              var child, element,
                parent, sibling, thing;
              child = node.children;

              if (child.length < 1 && node.tagName != undefined)
                  {
                     node.innerHTML = null;
                     if (node.parentNode == undefined)
                         {  return (node);  }
                     parent = node.parentNode;
                     sibling = parent.getElementsByClassName (node.className);
                     for (thing in sibling)
                         {
                            if (isNaN (thing) || sibling [thing] == node)
                                {  continue;  }
                            parent.removeChild (sibling [thing]);
                          }
                   }

              element = 0;
              while (element < child.length)
                  {
                     var current;
                     current = child [element];
                     sibling = node.getElementsByClassName (current.className);
                     if (sibling.length > 1)
                         {
                            node.removeChild (sibling [1]);
                            element = 0;
                            continue;
                          }
                     element ++;
                   }

              for (element in child)
                  {
                     if (isNaN (element))
                         {  continue;  }
                     ClearContents (child [element]);
                   }
              return (node);
            }
     }