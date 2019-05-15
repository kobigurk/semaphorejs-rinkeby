var childProcess = require('child_process');

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    const env = process.env;
    env.BASE_DIR = __dirname;
    var p = childProcess.fork(scriptPath, process.argv.slice(2), {
      env
    });

    // listen for errors as they may prevent the exit event from firing
    p.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    p.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript(__dirname + '/node_modules/zkp-semaphorejs/src/client/client.js', function (err) {
    if (err) throw err;
});
