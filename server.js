const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
};
app.use(express.static('./dist/project-tao-lao'));

app.get('/*', function (req, res) {
    res.sendFile('/dist/project-tao-lao/index.html', { root: '.' });
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);