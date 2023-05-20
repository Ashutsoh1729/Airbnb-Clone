import countries from 'world-countries';


// Here we are trying to return an object so warpup the curly-brackets inside a parenthesis
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    region: country.region,
    latlng: country.latlng,
}))



const useCountries = () => {
    const getAll = () => formattedCountries;
    const getByValue = (value: string) => {
        return formattedCountries.find((item)=>item.value===value)
    };

    return {
        getAll,
        getByValue
    }
}



export default useCountries;




