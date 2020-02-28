class PositionData {
    id;
    date;
    time;
    aValidFlag;
    latitude;
    latitudeCharactor;
    longitude;
    longitudeCharactor;
    speed;
    direction;
    altitude;
    satelliteNumbers;
    gsmsignalStrength;
    batteryStatus;
    pedometer;
    tumblingTimes;
    terminalStatus;
    baseStationNumbers;
    baseStationInformation;
    wiFiNumber;
    positioningAccuracy;
    toString(){
        let str= '';
        return str;
    }
}

module.exports =PositionData;