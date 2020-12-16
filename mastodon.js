let Mastodon = require('mastodon-api');
let fs = require('fs');
let config = require('./config.json');

const M = new Mastodon({
    access_token: config.access_token,
    timeout_ms: 60 * 1000,
    api_url: config.api_url,
})

let options = {};
options.status = config.status_text;
if (config.in_reply_to_id) {
    options.in_reply_to_id = config.in_reply_to_id;
}
if (config.image_filename) {
    M.post('media', { file: fs.createReadStream(config.image_filename) }).then(resp => {
        options.media_ids = [resp.data.id]
        post(options);
    });
} else if (config.status_text) {
    post(options);
}

function post(options) {
    M.post('statuses', options).then(resp => {
        console.log(resp.data);
    });
}