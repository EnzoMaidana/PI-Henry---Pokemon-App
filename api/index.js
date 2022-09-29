//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { PORT } = require('./src/config.js');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {default: axios} = require('axios');
const { Type } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

    const typeUrl = await axios.get('https://pokeapi.co/api/v2/type');
    const typeInfo = typeUrl.data.results.map((e) => {
            return {
                name: e.name,
            }
    })
  Type.bulkCreate(typeInfo);
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
