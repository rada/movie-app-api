app.factory('CountryService', function($rootScope, APP_CONFIG, MoviesService){
  return new (function(){
    var service = this;

    service.getCountryDetails = function(countryName){
      country = APP_CONFIG.countries.find(function(country){
        return country.name == countryName;
      }) || ""
      return country;
    }

    service.displayCountryName = function(countryLabelId, countryName){
      var countryLabel = document.getElementById(countryLabelId);
      if(countryLabel) countryLabel.textContent = countryName;
      countryLabel.style.display = "inline-block";
    }

    service.drawMovieCountryMap = function(chartElementId, movie, labelElemId){
      // console.log("CoutnryService movie: ", movie);
      var chartCountry = service.getCountryDetails(movie.production_countries[0].name);

      var countryNames = movie.production_countries.map(function(country){
        region = service.getCountryDetails(country.name).region || "";
        if(chartCountry & chartCountry.region != region) chartCountry = "";

        return [country.name];
      })
      countryNames.unshift(["Country"]);

      var data = google.visualization.arrayToDataTable(countryNames);
      var options = {backgroundColor: '#81d4fa'};
      if(chartCountry) options.region = chartCountry.region;
      var chart = new google.visualization.GeoChart(document.getElementById(chartElementId));
      google.visualization.events.addListener(chart, 'regionClick', function(e) {
        options['region'] = e['region'];
        //chart.draw(data, options);
        var prodCountry = MoviesService.data.selectedMovie.production_countries.find(function(country){
          return country.iso_3166_1 == e['region'];
        })
        if(prodCountry) service.displayCountryName(labelElemId, prodCountry.name);
        console.log("Map clicked: ", prodCountry);
      });
      chart.draw(data, options);
    }
  })()
})
