module.exports = {
    time2Data: (timestamp) => {
        var date = new Date();
        date.setTime(timestamp * 1000);

        return date.getFullYear() + "-" + toDouble(date.getMonth() + 1) + "-" + toDouble(date.getDate()) + " " + toDouble(date.getHours()) + ":" + toDouble(date.getMinutes()) + ":" + toDouble(date.getSeconds());
    }
}

toDouble = n => {
    return n < 10 ? '0' + n : n;
}

