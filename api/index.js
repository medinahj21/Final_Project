const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;
const { Event, Product, Group } = require("./src/db")

const eventsData = require("./Datos_de_prueba/Eventos.json");
const productsData = require("./Datos_de_prueba/Productos.json");
const groupsData = require("./Datos_de_prueba/Grupos.json");


const chargeDummyData = async () => {

  const bulkGroup = groupsData.map((obj) => {
    return {
      ...obj,
      schedule: `${obj.days} | ${obj.start} - ${obj.end}`
    }
  })

  try {
    await Event.bulkCreate(eventsData);
    await Product.bulkCreate(productsData)
    await Group.bulkCreate(bulkGroup);

  } catch (error) {
    console.log(error.message)
  }

}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  chargeDummyData();
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});
