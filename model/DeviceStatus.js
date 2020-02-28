 class DeviceStatus {
    id;
    step;
    tumblingNumber;
    batteryStatus;
    toString(){
        let str= ','+this.step.toString()+","+this.tumblingNumber.toString()+","+
        this.batteryStatus.toString();
        return str;
    }
}

module.exports =DeviceStatus;