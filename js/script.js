
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetName = $('#street').val();
    var cityName = $('#city').val();
    var addressName = streetName + ', ' + cityName;
    var googleImg = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + streetName + ', ' + cityName;
    $body.append('<img class="bgimg" src="' + googleImg + '">');

    $greeting.text("So you want to live at " + addressName);

    //load NYT articles
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "ac16f8df9a34441fa322642dbb19ed02",
      'q' : cityName,
      'sort' : "newest"
    });

    $.getJSON( url, function( data ) {
      var items = [];
      for (var i = 0, j = data.response.docs.length; i < j; i++){
          items.push("<li class='article'><a href=" + data.response.docs[i].web_url + "'>" + data.response.docs[i].headline.main + "</a><p>" + data.response.docs[i].lead_paragraph + "</p></li>");
      }
      $nytElem.append(items);
      $nytHeaderElem.text("This is what the NYT has for " + cityName);
      })
      .fail(function(e) {
          $nytHeaderElem.text("Unfortunately the NYT is not accesible at the moment. Please try again later!");
      });

    //load wikipedia articles

    var wikiTimeOut = setTimeout(function (){
        $wikiElem.text("Failed to get wikipedia articles. Please try again later!");
    }, 8000);

    $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityName + "&format=json",
    type: "GET",
    dataType: 'jsonp',
    })
    .done(function(data) {
        var items = [];
        for (var i = 0, j = data.length; i < j; i++)
        {
            items.push("<li><a href='https://en.wikipedia.org/wiki/" + data[1][i] + "'>" + data[1][i] + "</a></li>")
        }
        $wikiElem.append(items);
        clearTimeout(wikiTimeOut);
    });

    return false;
};

$('#form-container').submit(loadData);
