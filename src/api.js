import { processData } from "./process-data.js";

const url = "https://restcountries.com/v3.1";
const endpoint = "/region/europe";

export const getCountries = async () => {
    const response = await fetch(url + endpoint);
    if (!response.ok) {
        console.error(response);
        throw new Error("Unable to get countries.");
    }

    const countries = await response.json();
    return processData(countries);
};