let Mastodon = require('mastodon-api');
let fs = require('fs');
let config = require('./config.json');

const M = new Mastodon({
    access_token: config.access_token,
    timeout_ms: 60 * 1000,
    api_url: config.api_url,
})

if (config.image_filename) {
    M.post('media', { file: fs.createReadStream(config.image_filename) }).then(resp => {
        const id = resp.data.id;
        M.post('statuses', { status: config.status_text, media_ids: [id], in_reply_to_id: config.in_reply_to_id }).then(resp => {
            console.log(resp.data);
        });
    });
} else if (config.status_text) {
    M.post('statuses', { status: config.status_text, in_reply_to_id: config.in_reply_to_id }).then(resp => {
        console.log(resp.data);
    });
}