
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

    //load NYT

    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "ac16f8df9a34441fa322642dbb19ed02",
      'q' : cityName
    });

    $.getJSON( url, function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
      });

    $( $nytHeaderElem, {
        "class": ".article",
        html: items.join( "" )
        }).appendTo( $nytHeaderElem );
    });


    return false;
};

$('#form-container').submit(loadData);
