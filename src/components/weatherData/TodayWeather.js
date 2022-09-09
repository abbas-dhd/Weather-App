import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const TodayWeather = (props) => {
    if (!props.todaysWeather) return;

    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weatherType = props.todaysWeather.weather[0].main;
    const currentTemp = `${Math.round(props.todaysWeather.main.temp)}°C`;

    const city = props.location;
    const date = new Date(props.todaysWeather.dt_txt);

    return (
        <Card
            sx={{
                background: "linear-gradient(to right, #ECE9E6, #FFFFFF)",
                width: "fit-content",
                m: "auto",
                mt: "2rem",
                mb: "2rem",
                p: "1rem",
                height: "fit-content",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
                borderRadius: "15px",
            }}
        >
            <CardMedia
                component="img"
                image={`https://openweathermap.org/img/wn/${props.todaysWeather.weather[0].icon}@2x.png`}
                sx={{
                    width: "150px",
                    alignSelf: "flex-start",
                    filter: "drop-shadow(5px 1px 15px  #00000075)",
                }}
            />
            <CardContent sx={{ m: 0, p: 1 }}>
                <Typography variant="h5" component="h3">
                    {weatherType}
                </Typography>
                <Typography variant="h2" component="h2">
                    {currentTemp}
                </Typography>

                <Typography variant="subtitle1" component="h4">
                    {city}
                </Typography>
                <Typography variant="subtitle2" component="h4">
                    {weekDay[date.getDay()]}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TodayWeather;
