const mariadb = require('mariadb');
class MariadbConnection{
     pool = mariadb.createPool({
        host: '198.143.182.60', 
        user:'traccar', 
        password: '2shm12345',
        connectionLimit: 5,
        database:'watch'
   });
 async   DeviceStatusInsert(deviceStatus) {
       
        let conn;
        try {
          conn = await this.pool.getConnection();
          const rows = await conn.query("SELECT 1 as val");
          console.log(rows); //[ {val: 1}, meta: ... ]
          const res = await conn.query("insert into  device_status (device_id, step, tumblingNumber, batteryStatus) value (?,?,?,?)",
                    [deviceStatus.id, deviceStatus.step,
                   deviceStatus.tumblingNumber,deviceStatus.batteryStatus]);
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      
        } catch (err) {
          throw err;
        } finally {
          if (conn) return conn.end();
        }
   }

   async   PositionInsert(positionData) {
       
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("insert into  position_data (date, time, aValidFlag, latitude,"+
        "latitudeCharactor, longitude, longitudeCharactor,"+
        "speed, direction, altitude, satelliteNumbers, gsmsignalStrength,"+
        "batteryStatus, pedometer, tumblingTimes, terminalStatus,"+
        "baseStationNumbers, baseStationInformation, wiFiNumber,"+
        "positioningAccuracy, device_id)"+
        "value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [positionData.date, positionData.time, positionData.aValidFlag, positionData.latitude,
                    positionData.latitudeCharactor, positionData.longitude, positionData.longitudeCharactor,
                    positionData.speed, positionData.direction, positionData.altitude, positionData.satelliteNumbers, 
                           positionData.gsmsignalStrength,
                    positionData.batteryStatus, positionData.pedometer, positionData.tumblingTimes, positionData.terminalStatus,
                    positionData.baseStationNumbers, 'positionData.baseStationInformation',positionData.wiFiNumber,
                    positionData.positioningAccuracy, positionData.id]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
}
}

module.exports =MariadbConnection;
