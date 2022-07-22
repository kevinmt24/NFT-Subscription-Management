const routes = require("next-routes")();

routes
  .add("./pages/campaigns/:address", "./pages/campaigns/show");

module.exports = routes;
