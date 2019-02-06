function selectPeriod(mySelect) {
  switch (mySelect.value) {
    case 'year':
      window.location.href = '/?period=year';
      break;
    case 'threeYears':
      window.location.href = '/?period=threeYears';
      break;
    case 'fiveYears':
      window.location.href = '/?period=fiveYears';
      break;
    case 'tenYears':
      window.location.href = '/?period=tenYears';
      break;
    case 'all':
      window.location.href = '/?period=all';
      break;
  }
};


var resp ;
var xmlHttp ;

resp  = '' ;
xmlHttp = new XMLHttpRequest();

if (xmlHttp != null) {
    xmlHttp.open( "GET", 'https://datahub.io/core/co2-ppm-daily/datapackage.json', false );
    xmlHttp.send( null );
    resp = xmlHttp.responseText;
}

var PERIOD;
var DP_ID = JSON.parse(resp);

switch (window.location.href.split('?period=')[1]) {
  case 'year':
    PERIOD = 'SINCE LAST YEAR';
    DP_ID.views[0].resources[0].transform[0] = {
      "type": "filter",
      "expression": "(new Date(data['date'])).getFullYear() >= 2018"
    };
    document.getElementById("all").classList.add("year");
    break;
  case 'threeYears':
    PERIOD = 'SINCE LAST THREE YEARS';
    DP_ID.views[0].resources[0].transform[0] = {
      "type": "filter",
      "expression": "(new Date(data['date'])).getFullYear() >= 2016"
    };
    document.getElementById("threeYears").classList.add("active");
    break;
  case 'fiveYears':
    PERIOD = 'SINCE LAST FIVE YEARS';
    DP_ID.views[0].resources[0].transform[0] = {
      "type": "filter",
      "expression": "(new Date(data['date'])).getFullYear() >= 2014"
    };
    document.getElementById("fiveYears").classList.add("active");
    break;
  case '':
  case undefined:
  case 'tenYears':
    PERIOD = 'SINCE LAST TEN YEARS';
    DP_ID.views[0].resources[0].transform[0] = {
      "type": "filter",
      "expression": "(new Date(data['date'])).getFullYear() >= 2009"
    };
    document.getElementById("tenYears").classList.add("active");
    break;
  case 'all':
    PERIOD = 'SINCE 1958';
    DP_ID.views[0].resources[0].transform = [];
    document.getElementById("all").classList.add("active");
    break;
};

