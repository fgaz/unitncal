function run(){
  let text_in  = document.getElementById("uri_in");
  let text_out = document.getElementById("uri_out");

  let updater = function(){window.setTimeout(function(){
    let uri = URI(text_in.value);
    let new_uri = new URI({
      protocol: "https",
      hostname: "easyacademy.unitn.it",
      path: "/AgendaStudentiUnitn/ec_download_ical_list.php",
    });
    old_search = uri.search(true);
    switch (old_search["include"]) {
      case "corso":
        new_uri.search(
          { "form-type": "corso"
          , "anno": old_search["anno"]
          , "corso": old_search["corso"]
          , "anno2[]": old_search["anno2[]"]
          , "ar_codes_": old_search["ar_codes_"]
          , "ar_select_": old_search["ar_select_"]
        });
        break;
      case "docente":
        new_uri.search(
          { "form-type": "docente"
          , "anno": old_search["anno"]
          , "docente": old_search["docente"]
          , "date": old_search["date"] // needed to avoid getting lectures of first semester when downloading last semester
          , "attivita": old_search["attivita"]
          , "ar_codes_": old_search["ar_codes_"]
          , "ar_select_": old_search["ar_select_"]
        });
       break;
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
  }, 100);} // Leave it a bit of time to completely paste the url. Ugly but it works.
  text_in.onchange   = updater;
  text_in.onkeypress = updater;
  text_in.onpaste    = updater; //Warning: non-standard
}

