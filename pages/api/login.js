const axios = require('axios');

export default async function handler(req, res) {
    let username = req.query.username;
    let password = req.query.password;
    await axios.get('http://159.223.194.251/api/auth/login?username='+username+"&password="+password).then(resp => {
        res.status(200).json({response:resp.data});
        return;
    });
}