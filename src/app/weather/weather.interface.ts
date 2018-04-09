export interface IWeatherResp {
  cnt: number;
  list: IWeather[];
}

export interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: string;
    sunset: string;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  list: number;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  id: number;
  name: string;
}
