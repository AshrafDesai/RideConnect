const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual TomTom API key
        const endpoint = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`;

        const response = await axios.get(endpoint, {
            params: {
                key: apiKey
            }
        });

        // Ensure we have results
        if (response.data.results && response.data.results.length > 0) {
            const { lat, lon } = response.data.results[0].position; // Extract latitude and longitude
            return { lat, lon };
        } else {
            throw new Error('No results found for the provided address.');
        }
    } catch (error) {
        console.error(`Error fetching coordinates: ${error.message}`);
        throw new Error('Failed to fetch coordinates.');
    }
};
