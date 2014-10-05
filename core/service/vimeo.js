var request = require('request');

var access_token = "65e4b5cfc44cb64668d49587be911a0c";
exports.getUploadToken = function (req, res, next) {
    request.post({
        url: 'https://api.vimeo.com/me/videos',
        headers: {
            Accept: "application/vnd.vimeo.*+json;version=3.2",
            Authorization: 'bearer 65e4b5cfc44cb64668d49587be911a0c'
        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return err;
        }
        return JSON.parse(httpResponse.body).upload_link_secure;
    });
}