function initMap(){
    var coord = {lat:21.424796899757414,lng:-104.89682827035779};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}