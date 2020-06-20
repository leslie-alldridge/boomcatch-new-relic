var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Send beacon information to New Relic Events Endpoint
function sendBeacon(data) {
  var data = JSON.stringify(data);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open(
    "POST",
    `https://insights-collector.newrelic.com/v1/accounts/${process.env.NR_ACCOUNT}/events`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Insert-Key", process.env.INSIGHTS_API_KEY);

  xhr.send(data);
}

exports.initialise = function () {
  return function (data, type, separator, callback) {
    try {
      obj = JSON.parse(data);
        
      // Customize Beacon Data suit the New Relic Events endpoint
      var beaconData = {};
      beaconData.browser = {
        eventType: "Browser",
        name: obj.browser.name,
        version: obj.browser.version,
        referer: obj.referer,
        userAgent: obj.userAgent,
        pid: obj.data.pid
      };

      console.log("sending");
      console.log(JSON.stringify(beaconData.browser));
      sendBeacon(beaconData.browser)
    } catch (e) {
      console.log("found an error");
      console.log(e);
      callback(false, byteCount(data));
    }
  };
};
