import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getWeather, weatherDataParser } from "../../api/wheatherApi";
import WeatherMap from "../weatherMap/WeatherMap";
import FiveDayWeather from "./FiveDayWeather";
import TodayWeather from "./TodayWeather";

const WeatherData = (props) => {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [weatherList, setWeatherList] = useState([]);
    const [city, setCity] = useState("");

    const locationIsValid = latitude && longitude;

    function showpositionCallback(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    useEffect(() => {
        const getWeatherDataHandler = async () => {
            if (!locationIsValid) return;

            const data = await getWeather(latitude, longitude);
            let newData = weatherDataParser(data.list);
            setWeatherList(newData);
            setCity(data.city.name);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showpositionCallback);
            getWeatherDataHandler();
        } else {
            alert("location services not supported in your browswer");
        }
    }, [latitude, longitude, locationIsValid]);

    return (
        <>
            {!locationIsValid ? (
                <p>Please allow location access</p>
            ) : (
                <>
                    <Container>
                        <TodayWeather
                            todaysWeather={weatherList[0]}
                            location={city}
                        />
                        <FiveDayWeather weatherList={weatherList} />
                    </Container>
                    <Container
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                        }}
                    >
                        <div>
                            <Typography variant="h6" sx={{ fontWeight: "800" }}>
                                Temperature Map
                            </Typography>
                            <WeatherMap
                                lat={latitude}
                                lon={longitude}
                                overlayType="temp_new"
                            />
                        </div>
                        <div>
                            <Typography variant="h6" sx={{ fontWeight: "800" }}>
                                Precipitation Map
                            </Typography>
                            <WeatherMap
                                lat={latitude}
                                lon={longitude}
                                overlayType="precipitation_new"
                            />
                        </div>
                    </Container>
                </>
            )}
        </>
    );
};

export default WeatherData;
