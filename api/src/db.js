require("dotenv").config();

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          dialectOptions: {
            ssl: {
              require: true,
              // Ref.: https://github.com/brianc/node-postgres/issues/2009
              rejectUnauthorized: false,
            },
            keepAlive: true,
          },
          ssl: true,
        },
      })
    : //cuando use heroku la base de datos es ClubDB
      new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/clubdb`, {
        logging: false,
        native: false,
      });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Admin,
  Event,
  Group,
  Order,
  Player,
  Product,
  ProductRequest,
  RoleRequest,
  FilterTags,
} = sequelize.models;

// Aca vendrian las relaciones

Order.belongsTo(Player); /**ready*/
Player.hasMany(Order);

Player.belongsTo(Group); /**ready*/
Group.hasMany(Player);

Player.belongsToMany(Event, { through: "player-event" }); /**ready*/
Event.belongsToMany(Player, { through: "player-event" });

Group.belongsToMany(Admin, { through: "group-admin" }); /*ready**/
Admin.belongsToMany(Group, { through: "group-admin" });

Order.belongsToMany(Product, { through: "product-order" }); /*ready**/
Product.belongsToMany(Order, { through: "product-order" });

Event.belongsToMany(Admin, { through: "admin-event" }); /*ready**/
Admin.belongsToMany(Event, { through: "admin-event" });

Product.belongsToMany(FilterTags, { through: "product-filter" }); /*ready**/
FilterTags.belongsToMany(Product, { through: "product-filter" });

// Product.hasMany(ProductRequest);
// ProductRequest.belongsTo(Product, { foreignKey: "productId" });   /*Pending**/

// Player.hasMany(ProductRequest);
// ProductRequest.belongsTo(Player, { foreignKey: "playerId" });     /*Pending**/

Player.hasOne(RoleRequest); /*ready**/
RoleRequest.belongsTo(Player);

Group.hasOne(RoleRequest); /*ready**/
RoleRequest.belongsTo(Group);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
