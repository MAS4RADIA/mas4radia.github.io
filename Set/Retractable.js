export function ReadyBlinds ()
    {
       var folded, retractable, content;
       folded = new Array ();
       retractable = document.getElementsByClassName ("retractable");
       for (content in retractable)
           {
              if (isNaN (content))
                  {  continue;  }

              var shutter, root, label, height;
              shutter = retractable [content];
              height = shutter.offsetHeight;
              if (height > 0)
                  {  shutter.setAttribute ("height", height);  }
              shutter.classList.add ("hidden");

              root = shutter.parentElement;
              if (root == undefined)
                  {  continue;  }
              label = root.getElementsByClassName ("label") [0];
              if (label == undefined || folded.includes (label))
                  {  continue;  }

              label.removeEventListener ("click", RollBlinds);
              label.addEventListener ("click", RollBlinds);
              folded.push (label);
            }
       //console.log (retractable);
     }
function RollBlinds ()
    {
       if (this == undefined || this.tagName == undefined)
           {  return;  }

       var retractable, content, root;
       root = this.parentElement;
       if (root == undefined)
           {  return;  }
       retractable = root.getElementsByClassName ("retractable");
       for (content in retractable)
           {
              if (isNaN (content))
                  {  continue;  }

              var shutter, height;
              shutter = retractable [content];
              if (shutter.classList.contains ("hidden"))
                  {
                     shutter.classList.remove ("hidden");
                     this.classList.add ("reverse");

                     height = shutter.getAttribute ("height");
                     if (height == null)
                         {  continue;  }
                     shutter.style.setProperty ("height", height + "px");
                   }
              else
                  {
                     shutter.removeAttribute ("style");
                     this.classList.remove ("reverse");
                     shutter.classList.add ("hidden");
                     height = shutter.offsetHeight;
                     if (height > 1)
                         {  continue;  }
                     shutter.setAttribute ("height", height);
                   }
            }
       //console.log (retractable);
     }