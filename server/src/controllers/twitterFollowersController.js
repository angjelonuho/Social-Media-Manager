const Twit = require('twit')


const apikey = "KtxbL80iSKuPU2aTr9erCIvdJ";
const apiSecretKey = "eaTtJn44wjk5t78PWy111ZrFyuzPLkQRdZC9uNpJL1Oo199ZDt";
const accessToken = "155157343-qjeoze2STw75BqYTKx3CdWTbD2OKSz3rgwie7PH6";
const accessTokenSecret = "HZNUqt4b1sPVmifphLj7oF94q0L0OfgjALjJ0XkDTs3Gd";

var T = new Twit({
    consumer_key: apikey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
});



module.exports = {
    twitterFollowers(req, res) {
        (async () => {
            T.get('friends/list', { screen_name: 'Angelo_Nuho' }, function (err, data, response) {
                res.send({
                    data
                })
            })
        })();
    }
}