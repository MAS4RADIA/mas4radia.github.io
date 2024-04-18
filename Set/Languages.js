import { Switch } from "/Set/Room.js";

CheckSessionLanguage ();

export function SetLanguage (chart = null, room = null)
    {
       if (chart == null || room == null || chart.tagName == undefined || room.language == undefined)
           {  return;  }

return;
       var request;
       request = new XMLHttpRequest ();
       request.open ("GET", "/Set/Languages.php", true);
       request.addEventListener ("load", CheckResponse);
       request.send ();

       function CheckResponse ()
           {
              var select, language, name, id;
              try
                  {  language = JSON.parse (this.response);  }
              catch (error)
                  {
                     console.log (error);
                     return;
                   }

              id = "language_select";
              select = document.getElementById (id);
              if (select == null)
                  {
                     select = document.createElement ("SELECT");
                     select.id = id;
                     chart.appendChild (select);
                   }
              for (name in language)
                  {
                     if (isNaN (name))
                         {  continue;  }

                     var option, dialect;
                     dialect = language [name];
                     option = document.createElement ("OPTION");
                     option.innerHTML = FormatLanguage (dialect);
                     option.setAttribute ("name", dialect);
                     select.appendChild (option);
                   }
              select.children [room.language].setAttribute ("selected", "");;
              select.addEventListener ("click", ChangeLanguage);
              SetSessionLanguage (room.language);
            }
     }

function FormatLanguage (dialect)
    {
       var language, variant, name;
       language = dialect.split ("-");

       switch (language [0].toLowerCase ())
           {
              case "en":
                  variant = "English";
                break;
              case "fr":
                  variant = "Franc&#x327;ais"
                break;
              default:
                  variant = language [0];
                break;
            }
       if (language.length > 1)
           {  variant += " (" + language [1] + ")";  }
       return (variant);
     }
function ChangeLanguage ()
    {
       if (this == undefined || this.tagName == undefined)
           {  return;  }

       var selected, html, language;
       selected = this.selectedOptions [0];
       language = selected.getAttribute ("name");
       html = document.querySelector ("HTML");
       if (html == undefined || html == null)
           {  return;  }

       html.setAttribute ("lang", language);
       Switch ();
     }

function CheckSessionLanguage ()
    {
       var request, filter;
       filter = "type=fetch";
       filter += "&name=language";
return;
       request = new XMLHttpRequest ();
       request.open ("GET", "/Set/Session.php?" + filter, false);
       request.addEventListener ("load", CheckResponse);
       request.send ();

       function CheckResponse ()
           {
              var html, language;
              language = this.response.trim ();
              if (language.length < 1)
                  {  return;  }

              html = document.querySelector ("HTML");
              html.setAttribute ("lang", language);
            }
     }
function SetSessionLanguage (language)
    {
       var request, filter;
       filter = "name=language&";
       filter += "value=" + language;
       request = new XMLHttpRequest ();
       request.open ("GET", "/Set/Session.php?" + filter, true);
       request.send ();
     }