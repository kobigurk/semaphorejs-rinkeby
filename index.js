var childProcess = require('child_process');

function runScript(scriptPath, args, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    const env = process.env;
    env.BASE_DIR = __dirname;
    var p = childProcess.fork(scriptPath, args, {
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

const tar = childProcess.spawn('tar', ['xzf', __dirname + '/build.tgz', '-C', __dirname]);
tar.stdout.on( 'data', data => console.log( `stdout: ${data}` ) );
tar.stderr.on( 'data', data => console.log( `stderr: ${data}` ) );
tar.on('close', code => {
  if (code != 0) throw new Error(code);
  runScript(__dirname + '/node_modules/zkp-semaphorejs/src/client/client.js', process.argv.slice(2), function (err) {
      if (err) throw err;
  });
});
