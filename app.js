const { runOpta } = require("./helpers");

async function createCluster(action, settings) {
  runOpta(action);
}

module.exports = {
  createCluster,
};
