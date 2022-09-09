function getURL(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=911180d8058f1bd89a55b56be4c070d1&units=metric`;
}

// makes an api call to fetch 5day weather data, 3 hours step each day.
//(total 40 data list, with each day containing 8 datapoints)
export const getWeather = async (lat, lon) => {
    let data = await fetch(getURL(lat, lon))
        .then((response) => response.json())
        .then((data) => data);

    return data;
};

// extracts only 1 weather data from each day
export const weatherDataParser = (data) => {
    let newdata = [];
    for (let i = 0; i < 40; i += 8) {
        newdata.push(data[i]);
    }
    return newdata;
};
