function detectBrowser() 
   {
   var useragent = navigator.userAgent;
   var mapdiv = document.getElementById("map_canvas");
    
   if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) 
   {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
   } 
   else 
   {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '600px';
   }
   }
   
   window.onload = detectBrowswer();
   
   var initialLocation;
   var browserSupportFlag =  new Boolean();
   
   function initialize() 
   {
  var myOptions = 
  {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT}
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  map.setTilt(45);
  map.setHeading(90);
         
  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) 
  {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) 
    {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
    }, function() 
    {
      handleNoGeolocation(browserSupportFlag);
    });
  // Try Google Gears Geolocation
  } else if (google.gears) 
  {
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position) 
    {
      initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
      map.setCenter(initialLocation);
    }, function() 
    {
      handleNoGeoLocation(browserSupportFlag);
    });
  // Browser doesn't support Geolocation
  } else 
  {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }
  
  function handleNoGeolocation(errorFlag) 
  {
    if (errorFlag == true) 
    {
      alert("Geolocation service failed. So I put you in Tampa.");
      initialLocation = new google.maps.LatLng(27.950767,-82.457049);
      map.setHeading(90);
      map.setTilt(45);      
    } 
    else 
    {
      
      alert("Geolocation service failed. So I put you in Moscow.");
      initialLocation = new google.maps.LatLng(55.751218,37.617702);
      map.setHeading(90);
      map.setTilt(45);
    }
    map.setCenter(initialLocation);
  }
 } 

