const validateArray = (arr) => {
    return Array.isArray(arr) && arr?.length;
};

// AI-Generated Partially
const processCurrencies = (raw) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        return {};
    }

    const result = {};
    for (const [code, value] of Object.entries(raw)) {
        // Handle both string format and { name, symbol } format
        if (typeof value === "string") {
            result[code] = value.charAt(0).toUpperCase() + value.slice(1);
        } else {
            // Adding symbol to the name if available, e.g. "Euro (€)"
            let name = value?.name || "Unknown";
            name = name.charAt(0).toUpperCase() + name.slice(1);
            const symbol = value?.symbol;
            if (symbol) {
                name += ` (${symbol})`;
            }
            result[code] = name;
        }
    }
    return result;
};

export const processData = (data) => {
    if (!data || typeof data !== "object") {
        throw new Error("No data");
    }

    return data.filter(c => c).map((countryApi) => {
        return {
            countryName: countryApi.name?.common || "N/A",
            capital: validateArray(countryApi.capital) ? countryApi.capital : ["No official capital."],
            population: countryApi.population || 0,
            languages: countryApi.languages || null,
            currencies: processCurrencies(countryApi.currencies),
            flags: countryApi.flags || { png: "", alt: "No flag." }
        };
    });
};