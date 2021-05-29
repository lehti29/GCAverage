var helpers = (function () {
    var toSeconds = function (duration) {
        var t = duration.split(':');
        var sec;
        if (t.length === 3) { //hh:mm:s
            t = t.map(x => parseInt(x, 10));
            sec = (t[0] * 60 * 60) + (t[1] * 60) + t2;
        } else if (t.length === 2) { //mm:s
            t = t.map(x => parseInt(x, 10));
            sec = t[0] * 60 + t[1];
        }
    }

    var toMinutes = function (avgSeconds) {
        const seconds = avgSeconds % 60;
        const minutes = Math.floor(avgSeconds / 60);
        return minutes.toString() + ':' + seconds.toString();
    }
    return {
        toSeconds: toSeconds,
        toMinutes: toMinutes
    }
})()