require('dotenv').config()

const { leerInput, inquireMenu, pausar, listarLugares } = require("./helpers/inquireMenu");
const Busquedas = require("./models/busquedas");

console.log(process.env.OPEANWEATHER_KEY);

const main = async () => {
    const busquedas = new Busquedas();
    let opt = '';

    do {

        opt = await inquireMenu();
        switch (opt) {
            case 1:
                //mostar mensaje
                const termino = await leerInput('Ciudad :');
                const lugares = await busquedas.ciudad(termino);
                //seleccionar ele lugar
                const idSeleccionado = await listarLugares(lugares);
                if(idSeleccionado==='0') continue;
                //buscar los lugares
                const lugarSel = lugares.find(l => l.id === idSeleccionado);

                busquedas.agregarHistorial(lugarSel.nombre);
            
                //clima
                const temp = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //mostrar resultados

                console.log('\n Informacion de la ciudad \n'.green);
                console.log('Ciudad :', lugarSel.nombre);
                console.log('Lat :', lugarSel.lat);
                console.log('Lng :', lugarSel.lng);
                console.log('Descriction :', temp.desc.green);
                console.log('Temp :', temp.temp);
                console.log('Temp Max:', temp.max);
                console.log('Temp min :', temp.min);
                break;
            case 2:
                busquedas.historialCapi.forEach((lugar,i) => {
                    const idx =`${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
            case 0:
                console.log('opcion 0');
                break;

            default:
                break;


        }
        if (opt !== 0) {
            await pausar();
        }
    } while (opt !== 0);



}

main();