
const MariadbConnection = require('../model/connections')
const DeviceStatus = require('../model/DeviceStatus');
const PositionData = require('../model/positionsData');
 class ContentFactory {
    /**
     *
     */
    
    constructor(command,content,id) {
       this.command=command;
       this.contents=content;
       this.id=id;
        
    }
    create(){
        let content;
        let mariadb=new MariadbConnection();
        switch(this.command){
            case "LK":
                if(this.contents.length==4){
                    content=new DeviceStatus();
                    content.step=this.contents[1];
                    content.tumblingNumber=this.contents[2];
                    content.batteryStatus=this.contents[3];
                    content.id=this.id;
                    mariadb.DeviceStatusInsert(content);
                }
                
                break;
            case "UD" ,"UD2","AL":
                if(this.contents.length>=17){
                    content=new PositionData();
                    content.date = this.contents[1];
                    content.time = this.contents[2];
                    content.aValidFlag = this.contents[3];
                    content.latitude = this.contents[4];
                    content.latitudeCharactor = this.contents[5];
                    content.longitude = this.contents[6];
                    content.longitudeCharactor = this.contents[7];
                    content.speed = this.contents[8];
                    content.direction = this.contents[9];
                    content.altitude = this.contents[10];
                    content.satelliteNumbers = this.contents[11];
                    content.gsmsignalStrength = this.contents[12];
                    content.batteryStatus = this.contents[13];
                    content.pedometer = this.contents[14];
                    content.tumblingTimes = this.contents[15];
                    content.terminalStatus = this.contents[16];
                    content.baseStationNumbers = this.contents[17];
                    //content.baseStationInformation = this.contents[2];
                    content.wiFiNumber = this.contents[this.contents.length-2];
                    content.positioningAccuracy = this.contents[this.contents.length-1];
                    content.id=this.id;
                    mariadb.PositionInsert(content);
                    
                }
                break;
            case"TKQ":
                break;
            case"TKQ2":
                break;
               
             
        }
        return content;
        
    }
}
module.exports =ContentFactory;
