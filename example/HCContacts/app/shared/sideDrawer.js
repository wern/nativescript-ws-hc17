var frameModule = require("ui/frame");
var drawerId = "sideDrawer";

function closeDrawer() {
        var topmost = frameModule.topmost();
        var sideDrawer = topmost.getViewById(drawerId);
        sideDrawer.closeDrawer();
};

function openDrawer() {
        var topmost = frameModule.topmost();
        var sideDrawer = topmost.getViewById(drawerId);
        sideDrawer.showDrawer();
};

function openContacts() {
    var navigationEntry = {
        moduleName: "views/contacts",
        clearHistory: true
    };
    openPage(navigationEntry);
};

function openContactDetails() {
        var navigationEntry = {
        moduleName: "views/contact-details",
        clearHistory: false
    };
    openPage(navigationEntry);
};

function openPage(navigationEntry) {
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
};

exports.closeDrawer = closeDrawer;
exports.openDrawer = openDrawer;
exports.openContacts = openContacts;
exports.openContactDetails = openContactDetails;