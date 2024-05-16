var flip, name;
name = "card";
flip = [ "left", "top", "bottom", "right" ];

export function CardFlip (page = null)
    {
       if (page == null)
           {  return;  }

       var pocket;
       pocket = page.getElementsByClassName ("card");
       for (var content in pocket)
           {
              if (isNaN (content))
                  {  continue;  }

              var card, item;
              card = pocket [content];
              item = card.getElementsByClassName ("link");

              for (var name in item)
                  {
                     if (isNaN (name))
                         {  continue;  }
                     var link = item [name];
                     link.addEventListener ("click", FlipCard);
                   }
            }
     }
function FlipCard ()
    {
       if (this == undefined || this.tagName == undefined)
           {  return;  }

       var pack, from, target, root, trunk, holder;
       target = this.getAttribute ("name");
       if (target == null)
           {  return;  }

       trunk = this;
       while (trunk != document.body)
           {
              if (trunk.classList.contains (name))
                  {  break;  }
              trunk = trunk.parentNode;
            }
       if (trunk == document.body)
           {  return;  }

       root = trunk.parentNode;
       pack = root.getElementsByClassName (name);
       SetOrder (trunk, root, target, pack);
     }
function SetOrder (trunk = null, holder = null, target = null, packed = null)
    {
       if (trunk == null || holder == null || target == null || packed == null)
           {  return;  }

       var next, step, order;
       step = new Object ();
       order = new Object ();
       next = packed [target];
       for (var item in packed)
           {
              if (isNaN (item))
                  {  continue;  }

              var content = packed [item];
              if (content == trunk)
                  {
                     step.from = item;
                     content.classList.remove ("from", "left", "right", "to", "bottom", "top", "flip");
                   }
              if (content == next)
                  {
                     step.to = item;
                     content.classList.remove ("from", "left", "right", "to", "bottom", "top", "flip");
                   }
            }
       step.final = step.to - 1;
       if (step.from > step.to)
           {  step.final = flip.length - step.from;  }
       if (step.final < 0)
           {  step.final = flip.length - step.final;  }
       step.complement = flip.length - (step.final + 1);

       order.to = flip [step.final];
       order.from = flip [step.complement];
       trunk.classList.add ("flip", "to", order.to);
       next.classList.add ("flip", "from", order.from);
     }