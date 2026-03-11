import { getCountries } from "./src/api.js";
import { createTable } from "./src/createTable.js";
import { writeFile, mkdir } from "fs";

// AI-Generated 
const ensureOutputDir = () => {
    const dir = "output";
    mkdir(dir, { recursive: true }, (err) => {
        if (err) console.error("Unable to create output directory:", err);
    });
    return dir;
};

const writeToHtml = (html) => {
    const dir = ensureOutputDir();
    return new Promise((resolve, reject) => {
        writeFile(`${dir}/countries.html`, html, (err) => {
            if (err) {
                console.error("Error writing HTML file:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


// AI-Generated 
const writeToCsv = (countries) => {
    const dir = ensureOutputDir();
    const header = "Country Name,Capital,Population,Languages,Currencies\n";
    const rows = countries.map(c => {
        const languages = c.languages
            ? Object.values(c.languages).join("|")
            : "N/A";
        const currencies = c.currencies && Object.keys(c.currencies).length
            ? Object.values(c.currencies).join("|")
            : "N/A";
        return `${c.countryName},${c.capital.join("|")},${c.population},${languages},${currencies}`;
    }).join("\n");

    const csvContent = header + rows;
    return new Promise((resolve, reject) => {
        writeFile(`${dir}/countries.csv`, csvContent, (err) => {
            if (err) {
                console.error("Error writing CSV file:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const run = async () => {
    try {
        let countries = await getCountries();
        // sort the list alphabetically by country name before rendering
        countries = countries.sort((a, b) => a.countryName.localeCompare(b.countryName));

        const html = createTable(countries);
        await writeToHtml(html);
        await writeToCsv(countries);
        process.exit(0);
    } catch (err) {
        // any error should lead to exit code 1
        process.exit(1);
    }
};

run();