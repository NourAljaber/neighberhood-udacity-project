    var locations = [
          {title: 'Kingdom Center', location: {lat: 24.711534, lng: 46.674345}},
          {title: 'Abraj Al Bait', location: {lat: 21.418751, lng: 39.825556}},
          {title: 'Tahliha Street', location: {lat: 21.546254, lng: 39.130543}},
          {title: 'Quba Mosque', location: {lat: 24.439247, lng: 39.617289}},
          {title: 'Madain Saleh', location: {lat: 26.804012, lng: 37.957270}}
          
        ];

        //view model//
  var ViewModel = function() {
    var self = this;
  self.locations = ko.observableArray(locations);
  self.currentFilter = ko.observable();

};
ko.applyBindings(new ViewModel());

         var map;
      var markers = [];
      //var placeMarker = [];
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 23.885942, lng: 45.079162},
          zoom: 13
        });
       
        var Infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
          var lat = locations[i].location.lat;
          var lng = locations[i].location.lng;

          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            lat: lat,
            lng: lng,
            draggable: true,
            animation: google.maps.Animation.DROP,
            id: i
          });

          markers.push(marker);
          marker.addListener('click' ,function() {
            populateInfoWindow(this, Infowindow);
          });
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }


      function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>' + '( '+ marker.lat +'   ,   '+ marker.lng  + ' )' );
          infowindow.open(map, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }
      

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}


 //3rd party//
 function loadData(){
  $wikiElem = $('#wikipedia-links');
  $wikiElem.text("");
 }
  var getPosition = function(title){
    var wikipedia = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +title + '&format=json&callback=wikiCallback';

        $.ajax({
            url: wikiUrl,
            dataType: 'jsonp',
            success: function(response){
              var articleList = response[1];
               for (var i = 0; i < articleList.length; i++) {
                articaleStr = articleList[i];
                var url = 'http://en.wikipedia,org/wiki/' + articaleStr;
                $wikiElem.append('<li><a> href="' + url + '">' +articaleStr + '</a></li>');

               };
            }
        });
  }; 

$('#map')
.error(function() {
   alert( "Ops! API not loaded" )
});

  /* .error(function() {
   wikiElem.text(' wikipedia information could Not be loaded');
});
 */


