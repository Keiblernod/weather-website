const request = require('postman-request');

const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2VpYmxlcm5vZCIsImEiOiJjbDVkczR6OWcwZzJmM2lteHQ4Nm42dHl0In0.9-_EIdWaIDPSvcJa0glHqw&limit=1`;

    request({url:geoUrl,json:true},(error,{body}) => {
        if(!error && body.features.length !== 0){
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        } else if(error){
            callback("Unable to connect to geo-location services.",undefined);
        } else {
        callback("Unable to gather data from geo-location service",undefined);
        }
    });

};

module.exports = geocode;