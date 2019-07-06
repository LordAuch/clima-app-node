const {getLugarLatLng} = require('./lugar/lugar');
const {getClima} = require('./clima/clima');
const colors = require('colors');

const argv = require('yargs').options({
  direccion: {
    alias: 'd',
    desc: 'Direccion de la ciudad para aobtener el clima',
    demand: true
  }
}).argv;

getLugarLatLng(argv.direccion)
          .then(console.log)
          .catch(console.log);

let getInfo = async(dir) => {
  let cord = await getLugarLatLng(dir);
  let clim = await getClima(cord.lat, cord.lng);
  return clim;
}

getInfo(argv.direccion)
      .then(resp =>{
        console.log(`El clima en ${argv.direccion} es de `,`${resp} °C`.yellow);
      })
      .catch(e =>{
        console.log(e.message.bgRed);
      });
