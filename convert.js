function preview(url){
  document.getElementById("preview").innerHTML = "<iframe id='cv_if5' src='http://cdn.instantcal.com/cvir.html?id=cv_nav5&file="
  + URI.encode(URI.decode(url))
  + "&theme=RE&ccolor=%23ffffc0&dims=1&gtype=cv_daygrid&gcloseable=0&gnavigable=1&gperiod=day5&itype=cv_simpleevent' allowTransparency=true scrolling='no' frameborder=0 height=600 width=800></iframe>";
}

function run(){
  let text_in  = document.getElementById("uri_in");
  let text_out = document.getElementById("uri_out");

  let updater = function(){
    let uri = URI(text_in.value);
    let new_uri = new URI({
      protocol: "https",
      hostname: "easyroom.unitn.it",
      path: "/Orario/ec_download_ical_list.php",
    });
    old_search = uri.search(true);
    switch (old_search["include"]) {
      case "corso":
        new_uri.search(
          { "form-type": "corso"
          , "anno": old_search["anno"]
          , "corso": old_search["corso"]
          , "anno2": old_search["anno2"]
          , "ar_codes_": old_search["ar_codes_"]
          , "ar_select_": old_search["ar_select_"]
        });
        break;
      case "docente":
        //TODO put this in a red box
        text_out.value = "Calendari per docente non ancora supportati. Contattami per richiedere la funzione.";
        return;
      case "attivita":
        new_uri.search(
          { "form-type": "attivita"
          , "anno": old_search["anno"]
          , "attivita": old_search["attivita"]
          , "ar_codes_": old_search["ar_codes_"]
          , "ar_select_": old_search["ar_select_"]
        });
        break;
      default:
        //TODO put this in a red box
        text_out.value = "URL non riconosciuto";
        return;
    }
    final_uri = new_uri.toString()
      + "&dummyext.ics"; // needed for gnome-calendar and other programs taht require an .ics extension
    text_out.value = final_uri;
    preview(final_uri);
  }
  text_in.onchange   = updater;
  text_in.onkeypress = updater;
}

