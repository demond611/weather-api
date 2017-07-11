function GetWeather() {
   var zip = Number($("#formGroupExampleInput").val());
    
    if (!Number.isInteger(zip)) {
        alert("Please enter a 5 digit zip code");
        $("#formGroupExampleInput").val("");
    }
   var params = {
      // Request parameters
      APPID : "e0ce69a812603753aaa00f52573acdde"
   };
      
   $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",US&units=imperial&" + $.param(params) + "",
      type: "GET",
      beforeSend: function(xhrObj) {
         // Request headers
         xhrObj.setRequestHeader("Content-Type","text/plain");
      },
      dataType : "json",
      contentType : "application/json",
      success: function (data) {
//         console.log(data);
         var cityName = data.name,
             dayHigh = parseInt(data.main.temp_max),
             dayLow = parseInt(data.main.temp_min),
             tempFah = data.main.temp;
         
         temp = {
            f : parseInt(tempFah) + "° F" ,
            c : parseInt((tempFah - 32) * 5/9) + "° C"
         };
         
         $("#weather-name").html("City of " + cityName);
         $("#current-temp").html(temp['f']);
         $("#todaysHigh").html("Todays High: " + dayHigh);
         $("#todaysLow").html("Todays Low: " + dayLow);
      },
      error: function() {
         console.log("error");
      }
   });
    $("#current-temp").click(function() {
        var current = $(this).data('nexttemp');
        
        $("#current-temp").text(temp[current]);
            
        if (current == 'c') {
           $(this).data('nexttemp', 'f');
           return;
        }
        $(this).data('nexttemp', 'c');
    });
}