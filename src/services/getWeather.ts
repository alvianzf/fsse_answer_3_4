// weather?q=jakarta&appid=48e925a7b864a4cfe6ad113b3ea4eabd
import axios from 'axios';

const data = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5"
});

const API_KEY = import.meta.env.VITE_API_KEY;

const getCurrent = async (location: any) => {

    let res = {}

    await data.get('/weather',
    { params: {
            "q": location,
            appid: API_KEY,
            units: "metric"
        }
    })
        .then(response => {
            res = response.data;
        })
        .catch(err => {
            res = err
        })

    return res;
}

export default getCurrent;
