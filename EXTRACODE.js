    var locations = [
          {title: 'Kingdom Centre', location: {lat: 24.711534, lng: 46.674345}},
          {title: 'Abraj Al Bait', location: {lat: 21.418751, lng: 39.825556}},
          {title: 'Tahliha Street', location: {lat: 21.546254, lng: 39.130543}},
          {title: 'Quba Mosque', location: {lat: 24.439247, lng: 39.617289}},
          {title: 'Madain Saleh', location: {lat: 26.804012, lng: 37.957270}}
          
        ];
         //3rd party//
  /*var getPosition = function(title){
    var wikipedia = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +title + '&format=json&callback=wikiCallback';

        $.ajax({
            url: wikipedia,
            dataType: 'jsonp',
        })
  };*/

        //view model//
  var ViewModel = function() {
    var self = this;
  self.locations = ko.observableArray(locations);
  self.currentFilter = ko.observable();

};
ko.applyBindings(new ViewModel());

         var map;
      // Create a new blank array for all the listing markers.
      var markers = [];
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 23.885942, lng: 45.079162},
          zoom: 5
        });
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
       
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
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
 /* var KingdomCenter = {lat: 24.711534, lng: 46.674345};
        var marker = new google.maps.Marker({
          position: KingdomCenter,
          map: map
        });
        var infowindow = new google.maps.InfoWindow({
          content: 'hello from here!'
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });*/


        google.maps.event.addListener(map, 'center_changed', function () {
            var location = map.getCenter();
            document.getElementById("lat").innerHTML = location.lat();

            document.getElementById("lon").innerHTML = location.lng();
            // call function to reposition marker location
            placeMarker(location);
        });

        
          google.maps.event.addListener(marker, "click", function (event) {
    var latitude = this.position.lat();
    var longitude = this.position.lng();
    alert(this.position);
}); //end addListener






             // initialize searchTerm which is used to filter the list of locations displayed
    this.searchTerm = ko.observable('');
  
    // compute the list of locations filtered by the searchTerm
    this.filteredLocations = ko.computed(function() {
      
        // return a list of locations filtered by the searchTerm
        return self.locationsList().filter(function (location) {
            var display = true;
            if (self.searchTerm() !== ''){
                // check if the location name contains the searchTerm
                if (location.name().toLowerCase().indexOf(self.searchTerm().toLowerCase()) !== -1){
                    display = true;
                }else {
                    display = false;
                }
            }
            
            // toggle map marker based on the filter
            location.marker.setVisible(display);

            return display;
        });
    });
//html
    <input id="filter" class="filter form-control" type="text" data-bind="textInput: searchTerm" placeholder="Search by Location ">






//html
        <input id="filter" class="filter form-control" type="text" data-bind="textInput: searchTerm" placeholder="Search by Location ">




        var viewModel = {
  locations: ko.observableArray([]),
  query: ko.observable(''),

  search: function(value) {
    viewModel.locations.removeAll();

    if (value == '') return;

    for (var Nlocation in locations) {
      if (locations[Nlocation].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.locations.push(locations[Nlocation]);
      }
    }
  }
};

viewModel.query.subscribe(viewModel.search);




var searchBox = new google.maps.places.searchBox(
      document.getElementById('places-search'));
        searchBox.setBounds(map.getBounds());

        searchBox.addListener('places-changed', function() {
          searchBoxPlaces(this);
        });
        document.getElementById('go-places').addEventListener('click', textSearchPlaces);

      function hidMarkers(markers) {
        for (var i =0; i < markers.length; i++){
          markers[i].setMap(null);
        }
      }
      function searchBoxPlaces(searchBox){
        hidMarkers(placeMarkers);
        var places = searchBox.getPlaces();
        creatMarkersForPlaces(places);
        if (places.length == 0){
          window.alert(' No places matching that search !');
        }
      }
      function textSearchPlaces(){
        var bounds = map.getBounds();
        var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query : document.getElementById('places-search').value,
          bounds :bounds
        },
        function(results, status){
          if ( status === google.maps.places.PlacesServiceStatus.OK){
            creatMarkersForPlaces(results);
          }
        });        }
        }
        }
      }














this.currentFilter = ko.computed( function() {
    var filter = self.currentFilter().toLowerCase();
    if (!filter) {
      self.locations().forEach(function(locationItem){
        locationItem.visible(true);
      });
      return self.locations();
    } else {
      return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
        var string = locationItem.title.toLowerCase();
        var result = (string.search(filter) >= 0);
        locationItem.visible(result);
        return result;
      });
    }
  }, self);












.fail(function() {
                // Send alert
                alert(
                    "There was an issue loading the Foursquare API. Please refresh your page to try again."
                );



                .fail(function() {
    alert( "error" );
  })



9
$.ajax({
        url: "/backend/data/ajax1.htm",
        success: function(){
                //your code here
        },
        error: function(){
                //your code here
        }
}




//filter the items using the filter text
self.filteredItems = ko.computed(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
        return this.locations();
    } 
    else {
        return ko.utils.arrayFilter(this.locations(), function(loc) {
            return ko.utils.stringStartsWith(loc.title().toLowerCase(), filter);
        });
    }
});
