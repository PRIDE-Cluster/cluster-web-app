/**
 * Created with IntelliJ IDEA.
 * User: florian
 * Date: 14/02/13
 * Time: 12:29
 * To change this template use File | Settings | File Templates.
 */


function asperaDownload(sourceURL)
{
  document.getElementById('aspera-web').startDownload(sourceURL);

}

window.onload = function() {
    // Is Aspera Connect installed?
    connect_installed = asperaplugincheck();
    // aspera content is hidden by default (using a CSS class)
    if (connect_installed) { // if the aspera connect plugin is installed
        // un-hide the Aspera related content (e.g. remove the CSS class that hides the element)
        $(".aspera-content").attr("class", "aspera-content");
    } else {
        // un-hide the Aspera plugin download link (e.g. remove the CSS class that hides the element)
        // so users can easily download and install the plugin
        $(".aspera-plugin-link").attr("class", "aspera-plugin-link");
    }
}

function asperaplugincheck() {
    if (navigator.userAgent.indexOf('MSIE') != -1) {
      try {
        var activex = new ActiveXObject('Aspera.AsperaWebCtrl.1');
        return true;
      }
      catch (error) {
        return false;
      }
    }
    else {
      for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.substring(0,10) == "Aspera Web") {
          return true;
        }
      }
    }

    return false;
  }