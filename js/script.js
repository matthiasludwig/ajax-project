
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
      'q' : cityName
    });

    $.getJSON( url, function( data ) {
      var items = [];
      for (var i = 0, j = data.response.docs.length; i < j; i++){
          items.push("<li class='article'><a href=" + data.response.docs[i].web_url + "'>" + data.response.docs[i].headline.main + "</a><p>" + data.response.docs[i].lead_paragraph + "</p></li>");
      }
      $nytElem.append(items);
  });


    return false;
};

$('#form-container').submit(loadData);
