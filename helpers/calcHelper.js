//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calcCrow = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    let dLon = toRad(lon2-lon1);
    let radLat1 = toRad(lat1);
    let radLat2 = toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(radLat1) * Math.cos(radLat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
};

// Converts numeric degrees to radians
const toRad = (Value) => {
    return Value * Math.PI / 180;
};

const computeTotal = (price, discount, quantity) => {
    const tax = 1.13;
    const total = Math.ceil(((price - discount) * quantity) * tax);
    return total;
};

module.exports = {
    calcCrow,
    computeTotal,
};
