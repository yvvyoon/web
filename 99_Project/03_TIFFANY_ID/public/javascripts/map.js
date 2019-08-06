function initMap() {
    myMap = new google.maps.Map(document.getElementById('map'), {
     center: {lat: 37.501349, lng: 127.039692},
     zoom: 8
   });
 }
 function geoLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }else
        alert("Geolocation is not supported by this browser.");
    }
//위치 추적 Success
function showPosition(position)   {         
    var latitude = 37.501349;
    var longitude = 127.039692;
    //alert(latitude+":"+longitude);
    //현재 위치로 지도 이동 
    var center = new google.maps.LatLng(latitude, longitude);
    var myMarker = new google.maps.Marker({ map : myMap, position : center });
myMap.setCenter(center);
myMap.setZoom(18);
}
//위치 추적 Faile
function showError(error)   {
    switch (error.code)   {
         case error.PERMISSION_DENIED:
alert("User denied the request for Geolocation.");
              break;
         case error.POSITION_UNAVAILABLE:
alert("Location information is unavailable.");
              break;
         case error.TIMEOUT:
alert("The request to get user location timed out.");
              break;
         case error.UNKNOWN_ERROR:
alert("An unknown error occurred.");
              break;
}
}