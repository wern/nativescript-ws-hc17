var frameModule = require("ui/frame");

function addContact() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/contact-details");
};

exports.addContact = addContact;
