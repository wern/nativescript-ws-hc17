var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable; 
var fromObject = require("data/observable").fromObject;
var requestPermission = require("~/util/permissions").requestPermission; // tns plugin add nativescript-permissions
var contacts = require( "nativescript-contacts" ); // tns plugin add nativescript-contacts
var openDrawer = require("~/shared/sideDrawer.js").openDrawer;

var localContacts = new Observable();

function contactSelected(args) {
    var page = args.object;
    var selectedIndex = args.index;
    var topmost = frameModule.topmost();

    localContacts.set("selectionIndex",selectedIndex);
    topmost.navigate({
        moduleName: "views/contact-details",
        context: page.bindingContext});
};

function fetchContacts(args){
    page = args.object;
    page.bindingContext = localContacts;

    requestPermission("android.permission.READ_CONTACTS");

    /*
     contactFields contains the fields to retrieve from native backend to reduce processing time
     var contactFields = ['name','organization','nickname','notes','photo','urls','phoneNumbers','emailAddresses','postalAddresses']
    */
    // We have to fetch emailAddresses also or postalAdresses are not fetched on Android devices!!!!
    var contactFields = ['name','postalAddresses','phoneNumbers','emailAddresses'] 
 
    contacts.getAllContacts(contactFields).then(function(args){
        console.log("getAllContacts Complete");
        console.log(JSON.stringify(args));
        /// Returns args: 
        /// args.data: Generic cross platform JSON object, null if no contacts were found. 
        /// args.reponse: "fetch" 
        var allContacts = fromObject(args);
        localContacts.set("allContacts",allContacts.get("data"));
    }, function(err){
        console.log("getAllContacts() failed: " + err);
    });
};

function addContact() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/contact-details");
};

function showSideDrawer() {
    openDrawer();
};

exports.addContact = addContact;
exports.contactSelected = contactSelected;
exports.fetchContacts = fetchContacts;
exports.showSideDrawer = showSideDrawer;