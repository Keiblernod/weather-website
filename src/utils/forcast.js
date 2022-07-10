const request = require('postman-request');

forcast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=2c81498d069a97fc569f734a0821dc71&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, {body}) => {
        if (!error && !body.error) {
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            });
        } else if (error) {
            callback("Unable to connect to weather Service.",undefined);
        } else {
            callback("unable to gather data from weather service.",undefined);
        }
    });
};

module.exports = forcast;