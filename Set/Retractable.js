export function ReadyBlinds ()
    {
       var folded, retractable, content;
       folded = new Array ();
       retractable = document.getElementsByClassName ("retractable");
       for (content in retractable)
           {
              if (isNaN (content))
                  {  continue;  }

              var shutter, root, label;
              shutter = retractable [content];
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

              var shutter;
              shutter = retractable [content];
              if (shutter.classList.contains ("hidden"))
                  {
                     shutter.classList.remove ("hidden");
                     this.classList.add ("reverse");
                   }
              else
                  {
                     shutter.classList.add ("hidden");
                     this.classList.remove ("reverse");
                   }
            }
       //console.log (retractable);
     }