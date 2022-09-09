import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
} from "@mui/material";

const SingleDayWeather = (props) => {
    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(props.date);
    const temp = `${Math.round(props.temp)}°`;

    const icon = props.icon;

    return (
        <Card sx={{ m: 1, p: 1, width: "fit-content", borderRadius: "15px" }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "800" }}>
                    {weekDay[date.getDay()]}
                </Typography>
            </CardContent>

            <CardMedia
                component="img"
                image={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                sx={{
                    width: "75px",
                    alignSelf: "flex-start",
                    filter: "drop-shadow(5px 1px 15px  #00000075)",
                }}
            />

            <CardContent>
                <Typography>{temp}</Typography>
            </CardContent>
        </Card>
    );
};

const FiveDayWeather = (props) => {
    const weatherList = props.weatherList;

    const fiveDayWeather = weatherList.map((weather, index) => (
        <SingleDayWeather
            key={index}
            date={weather.dt_txt}
            temp={weather.main.temp}
            icon={weather.weather[0].icon}
        />
    ));

    return (
        <Container sx={{ display: "flex", justifyContent: "center", m: "0" }}>
            {fiveDayWeather}
        </Container>
    );
};

export default FiveDayWeather;
