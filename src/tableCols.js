const toImage = (png, alt) => {
    return `<img width='32px' src=${png} alt='${alt}' />`;
};

const tableColumns = [
    {
        displayName: "Country Name",
        key: "countryName",
    },
    {
        displayName: "Capital",
        key: "capital",
    },
    {
        displayName: "Population",
        key: "population",
        format: (val) => Intl.NumberFormat("en-US").format(val)
    },
    {
        displayName: "Currency",
        key: "currencies",
    },
    {
        displayName: "flag",
        key: "flags",
        htmlOnly: true,
        format: ({ png, alt }) => toImage(png, alt)
    },
];

export default tableColumns;