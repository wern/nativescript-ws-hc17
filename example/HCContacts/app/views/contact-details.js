var frameModule = require("ui/frame");

function back() {
    var topmost = frameModule.topmost();
    topmost.goBack();
};

exports.back = back;
