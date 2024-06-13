var page;
export function SetFoot (main = null)
    {
       if (main == null)
           {  return;  }

       var foot, anchor, request;
       page = main;
       foot = page.getElementsByClassName ("foot");
       if (foot.anchor == undefined)
           {  return;  }

       anchor = foot.anchor;
       request = new XMLHttpRequest ();
       request.addEventListener ("load", ShowStep);
       request.open ("GET", "/Shoot/Foot.svg", true);
       request.send ();

       function ShowStep ()
           {
              var response = this.responseText;
              if (response.length < 1)
                  {  return;  }
              anchor.innerHTML = response;
              WaitForTickles (anchor);
            }
     }

function WaitForTickles (anchor = null)
    {
       if (anchor == null)
           {  return;  }

       var foot, description, toe;
       foot = anchor.getElementsByClassName ("toe");
       for (toe in foot)
           {
              if (isNaN (toe))
                  {  continue;  }
              if (toe == 0)
                  {  foot [toe].classList.add ("flipped");  }
              foot [toe].addEventListener ("click", Tickle);
            }

       description = page.getElementsByClassName ("paragraph");
       if (description.length < 1)
           {  return;  }
       description [0].classList.remove ("hidden");
     }
function Tickle ()
    {
       if (this == undefined || this.tagName == undefined)
           {  return;  }

       var ground, toe, foot, print, description, flip;
       ground = this;
       while (ground != document.body)
           {
              if (ground.tagName == "SVG")
                  {  break;  }
              ground = ground.parentNode;
            }

       flip = { "from": -1, "to": -1 }
       foot = ground.getElementsByClassName ("toe");
       description = page.getElementsByClassName ("paragraph");
       for (toe in foot)
           {
              if (isNaN (toe))
                  {  continue;  }
              if (description.length > toe)
                  {  description [toe].classList.remove ("hidden", "from", "top", "shown", "to", "bottom");  }
              if (foot [toe] == this)
                  {
                     description [toe].classList.add ("shown");
                     description [toe].classList.remove ("hidden");
                     flip.to = toe;
                     continue;
                   }
              if (description.length > toe)
                  {
                     description [toe].classList.add ("hidden");
                     description [toe].classList.remove ("shown");
                   }
              if (foot [toe].classList.contains ("flipped"))
                  {  flip.from = toe;  }
              foot [toe].classList.remove ("flipped");
            }

       if (this.classList.contains ("flipped"))
           {  this.classList.remove ("flipped");  }
       else
           {  this.classList.add ("flipped");  }

       if (isNaN (flip.from) || isNaN (flip.to) || description.length <= Math.max (flip.from, flip.to) || Math.min (flip.from, flip.to) < 0)
           {  return;  }
       if (flip.from < flip.to)
           {
              description [flip.from].classList.add ("to", "bottom");
              description [flip.to].classList.add ("from", "top");
            }
       else
           {
              description [flip.from].classList.add ("to", "top");
              description [flip.to].classList.add ("from", "bottom");
            }
     }