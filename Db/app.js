var express = require('express');
var app = express();
const util = require('util');
const exec = util.promisify(require('child_process').exec);

app.post('/', function(req, res){
    try {
        console.log('executing deployment...');
        exec("ansible-pull -U git@github.com:<GitHubUser>/<repo-name>.git <playbook>.yml", (error, stdout, stderr) => {
                if (error) {
                console.log(`error: ${error.message}`);
                return;
        }
        if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
        }

        console.log(`stdout: ${stdout}`);

        });
    } catch (e) {
        console.log(e);
    }

    res.json({ received: true });
});

app.listen(8080, '127.0.0.1');