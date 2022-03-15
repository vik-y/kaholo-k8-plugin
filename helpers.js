const child_process = require("child_process");
const fs = require("fs");
/**
 *
 * @param {String} cmd Command to run
 * @param {String} path Working directory inside which to run the command. We try to create this directory if it doesn't exist
 */

function runCommandSpawn(exe, params, env = {}) {
  /**
   * Uses spawnSync to run commands
   */
  const result = child_process.spawnSync(exe, params, {
    cwd: "/tmp",
    stdio: "inherit",
    encoding: "utf-8",
    env: env,
  });


  // Ensure that if a command fails then the entire plugin execution should fail
  if (result.status != 0) {
    throw new Error(
      `Failed to run command ${exe} ${params} with exit status ${result.status}`
    );
  }
}

function runOpta(action) {
  const env = {
    ...process.env,
    AWS_ACCESS_KEY_ID: action.params.ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: action.params.ACCESS_KEY_SECRET,
    NPM_CONFIG_UNSAFE_PERM: true,
  };
  runCommandSpawn("docker", ["pull", "vikasy/kaholo-opta:latest"]);
  // runCommandSpawn("docker", [
  //   "run", "-i", "--rm",
  //   "-e", `AWS_ACCESS_KEY_ID=${action.params.ACCESS_KEY_ID}`,
  //   "-e", `AWS_SECRET_ACCESS_KEY=${action.params.ACCESS_KEY_SECRET}`,
  //   "-e", `AWS_REGION=${action.params.AWS_REGION}`,
  //   "-e", `CLUSTER_NAME=${action.params.CLUSTER_NAME}`, 
  //   "-e", `USE_SPOT=${action.params.USE_SPOT}`,
  //   "vikasy/kaholo-opta:latest"                                        
  // ]);
  runCommandSpawn("docker", ["images"])
  child_process.execSync("docker run -i vikasy/kaholo-opta:latest", {
    stdio: "inherit"
  })
  // runCommandSpawn("docker", ["run", "--rm", "vikasy/kaholo-opta:latest" ])
}

module.exports = {
  runOpta,
  runCommandSpawn
};
