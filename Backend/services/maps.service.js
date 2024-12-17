const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API;
        const endpoint = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`;

        const response = await axios.get(endpoint, {
            params: { key: apiKey }
        });

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lon } = response.data.results[0].position;
            return { lat, lon };
        } else {
            throw new Error('No results found for the provided address.');
        }
    } catch (error) {
        console.error(`Error fetching coordinates: ${error.response?.data || error.message}`);
        throw new Error('Failed to fetch coordinates.');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    try {
        // Resolve origin and destination into coordinates
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destinationCoords = await module.exports.getAddressCoordinate(destination);

    
        const url = `https://api.tomtom.com/routing/1/calculateRoute/${originCoords.lat},${originCoords.lon}:${destinationCoords.lat},${destinationCoords.lon}/json`;

        const response = await axios.get(url, {
            params: { key: apiKey }
        });

        if (response.data.routes && response.data.routes.length > 0) {
            const { summary } = response.data.routes[0];
            const distanceInKm = (summary.lengthInMeters / 1000).toFixed(2);
            const durationInSeconds = summary.travelTimeInSeconds;

            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;

            const durationText = days > 0 
                ? `${days} day${days > 1 ? 's' : ''} ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
                : `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;

            return {
                distance: {
                    text: `${distanceInKm} km`,
                    value: summary.lengthInMeters
                },
                duration: {
                    text: durationText,
                    value: durationInSeconds
                },
                status: 'OK'
            };
        } else {
            console.error('No routes found in response:', response.data);
            throw new Error('No routes found');
        }
    } catch (err) {
        console.error(`Error fetching distance and time:`, err.response?.data || err.message);
        throw new Error('Failed to fetch distance and time.');
    }
};


module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required for autocomplete suggestions');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;  // Ensure this API key is correct
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(input)}.json`;

    try {
        
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                limit: 5
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            // Mapping the results to match the required output format
            const results = response.data.results.map(result => {
                const isPOI = result.poi != null;

                return {
                    type: isPOI ? 'POI' : 'Geography',
                    id: result.id,
                    score: result.score,
                    entityType: isPOI ? 'Point of Interest' : 'Municipality',
                    address: {
                        freeformAddress: result.address.freeformAddress || 'N/A',
                        municipality: result.address.municipality || 'N/A',
                        countrySecondarySubdivision: result.address.countrySecondarySubdivision || 'N/A',
                        countrySubdivision: result.address.countrySubdivision || 'N/A',
                        countrySubdivisionName: result.address.countrySubdivisionName || 'N/A',
                        countrySubdivisionCode: result.address.countrySubdivisionCode || 'N/A',
                        countryCode: result.address.countryCode || 'N/A',
                        country: result.address.country || 'N/A',
                        countryCodeISO3: result.address.countryCodeISO3 || 'N/A',
                    },
                    position: {
                        lat: result.position.lat || 'N/A',
                        lon: result.position.lon || 'N/A'
                    },
                    viewport: {
                        topLeftPoint: {
                            lat: result.viewport?.topLeftPoint?.lat || 'N/A',
                            lon: result.viewport?.topLeftPoint?.lon || 'N/A'
                        },
                        btmRightPoint: {
                            lat: result.viewport?.btmRightPoint?.lat || 'N/A',
                            lon: result.viewport?.btmRightPoint?.lon || 'N/A'
                        }
                    },
                    boundingBox: {
                        topLeftPoint: {
                            lat: result.boundingBox?.topLeftPoint?.lat || 'N/A',
                            lon: result.boundingBox?.topLeftPoint?.lon || 'N/A'
                        },
                        btmRightPoint: {
                            lat: result.boundingBox?.btmRightPoint?.lat || 'N/A',
                            lon: result.boundingBox?.btmRightPoint?.lon || 'N/A'
                        }
                    },
                    dataSources: {
                        geometry: {
                            id: result.dataSources?.geometry?.id || 'N/A'
                        }
                    }
                };
            });

            const summary = {
                query: input,
                queryType: 'NON_NEAR',
                queryTime: 109,  // Simulating query time, you can adjust this if needed
                numResults: results.length,
                offset: 0,
                totalResults: 100,  // Simulating total results, adjust as needed
                fuzzyLevel: 1,
                queryIntent: []  // Empty array for now, you can populate if needed
            };

            return {
                summary,
                results
            };
        } else {
            console.error('No suggestions found');
            throw new Error('No suggestions found');
        }
    } catch (err) {
        console.error('Error in getAutoCompleteSuggestions:', err.response?.data || err.message);
        throw new Error('Failed to fetch autocomplete suggestions');
    }
};
