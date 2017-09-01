var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable; 
var contacts = require( "nativescript-contacts" );
var requestPermission = require("~/util/permissions").requestPermission;
var dialogs = require("ui/dialogs");

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
    }else{
        localContacts = new Observable();
        localContacts.set("displayContact", new contacts.Contact());
        localContacts.set("editable", true);
    }

    // Damit ist auf jeden Fall mindestens ein Eintrag in den Listen ,)
    localContacts.get("displayContact").postalAddresses.push({location:{street:"",city:"",postalCode:""}});
    localContacts.get("displayContact").phoneNumbers.push({value:""});
    page.bindingContext = localContacts;
};

function save() {

    requestPermission("android.permission.WRITE_CONTACTS");
    requestPermission("android.permission.GET_ACCOUNTS");
    
    dialogs.confirm("Sind sie sicher?").then(function (confirmed) {
        if(confirmed){
            // Wir muessen kopieren, da displayContact evtl. kein gueltiges Contact Objekt ist!
            var newContact = new contacts.Contact();
            newContact.name.given = localContacts.get("displayContact").name.given;
            newContact.name.family = localContacts.get("displayContact").name.family;
            newContact.postalAddresses.push(localContacts.get("displayContact").postalAddresses[0]); 
            newContact.phoneNumbers.push(localContacts.get("displayContact").phoneNumbers[0]); 
            newContact.save();
            exports.back();
        }
    });
};

exports.back = back;
exports.loaded = loaded;
exports.save = save;
