const path = require('path');

module.exports = (controller) => {
  const controllersPath = path.resolve(__dirname, '..', 'controllers');
  const controllerPath = path.resolve(
    controllersPath,
    path.extname(controller) === '.js' ? controller : `${controller}.js`
  );

  const Controller = require(`${controllerPath}`)

  return Controller

};
