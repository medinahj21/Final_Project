const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

const {Event, Product, Group, Player, Order, Admin} = require("./src/db")

const eventsData = require("./Datos_de_prueba/Eventos.json");
const productsData = require("./Datos_de_prueba/Productos.json");
const groupsData = require("./Datos_de_prueba/Grupos.json");
const playersData = require("./Datos_de_prueba/datosJugadores.json");
const ordersData = require("./Datos_de_prueba/Ordenes.json");
const adminsData = require("./Datos_de_prueba/Admins.json");




const chargeDummyData = async ()=>{

  const bulkGroup = groupsData.map((obj)=>{ 
    return{
      ...obj,
      schedule: `${obj.days} | ${obj.start} - ${obj.end}`
    }
  });

  const bulkPlayers = playersData.map((obj)=>{
    return{
      personal_info: {...obj},
      debt_value: isNaN(obj["Tarifa Wolves"])? 0: obj["Tarifa Wolves"],
      payment_date: obj["Marca temporal"],
      shirt_number: isNaN(obj["Número camisa"])? 99:obj["Número camisa"]
    }
  });

  try {
    await Event.bulkCreate(eventsData);    
    await Product.bulkCreate(productsData)
    await Group.bulkCreate(bulkGroup);
    await Player.bulkCreate(bulkPlayers);
    await Order.bulkCreate(ordersData);
    
  } catch (error) {
    console.log(error.message)
  }

  
}


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  chargeDummyData();
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});
