import noble from 'noble';

class BluetoothDataProvider {
  constructor () {
    noble.on('stateChange', function(state) {
      // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
      console.log(state);
      if (state === 'poweredOn') {
        //noble.startScanning();
      } else {
        //noble.stopScanning();
      }
    });

    noble.on('discover', this.discover.bind(this));
  }

  discover(peripheral) {
    peripheral.connect(function(error) {
      console.log('connected to peripheral: ' + peripheral.uuid);
      peripheral.discoverServices(['180f'], function(error, services) {
        var powerMeterService = services[0];
        console.log('discovered Power Meter Service');

        powerMeterService.discoverCharacteristics(['0x2a63'], function(error, characteristics) {
          var powerMeasurementCharacteristic = characteristics[3];
          console.log('discovered power measurement characteristic');

          powerMeasurementCharacteristic.on('data', function(data, isNotification) {
            console.log('Power: ' + data.readUInt16BE(1));
            this.setState({power: data.readUInt16BE(1)})
          }.bind(this));

          // to enable notify
          powerMeasurementCharacteristic.subscribe(function(error) {
            console.log('power measurement notification on');
          });
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }

  startScanning() {
    noble.startScanning("0x1818", true);
  }
}

export default BluetoothDataProvider;
