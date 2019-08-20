const crypto = require("crypto");

module.exports = {
    MD5_SUFFIX: 'iewhfFE55as)_jh0987u)(*U#)(U(TF(GFHbgf4ewhg98hn)(*YUGT*(#GH',
    md5: str => {
        const obj = crypto.createHash("md5");
        obj.update(str);
        return obj.digest('hex');
    }
}







