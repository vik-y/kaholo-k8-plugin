const { runCommandSpawn } = require("./helpers");

runCommandSpawn("docker", ["run",  "--rm", "vikasy/kaholo-opta:latest" ])
