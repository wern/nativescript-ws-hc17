var frameModule = require("ui/frame");
var localContacts = null;

function back() {
    var topmost = frameModule.topmost();
    topmost.goBack();
};

function loaded(args) {
    page = args.object;
 
    if(page.navigationContext){
        localContacts = page.navigationContext;
        var selectedIndex = localContacts.selectionIndex;
        localContacts.set("displayContact", localContacts.allContacts[selectedIndex]);
        localContacts.set("editable", false);
        page.bindingContext = localContacts;
    }else{
       // Kommt mit Step-3 :)
    }
};

exports.back = back;
exports.loaded = loaded;
