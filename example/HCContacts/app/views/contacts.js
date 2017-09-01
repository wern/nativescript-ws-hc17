var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable; 
var fromObject = require("data/observable").fromObject;

var localContacts = new Observable();
var fakeData = {"data":[{"id":"9B5C7D31-1E62-406D-9864-27F8890AC95D","name":{"given":"John","middle":"","family":"Appleseed","prefix":"","suffix":"","displayname":"","phonetic":{"given":"","middle":"","family":""}},"organization":{"name":"","jobTitle":"","department":""},"nickname":"","notes":"","urls":[],"phoneNumbers":[{"id":"CA72AF43-4FA5-4BC3-9267-5CAD2A3CD8D8","label":"Mobile","value":"888-555-5512"},{"id":"288377DE-572E-4B09-A1ED-0634764A7399","label":"Home","value":"888-555-1212"}],"emailAddresses":[{"id":"6F4BA62A-B016-45E3-BE86-BB20FD9793B7","label":"Work","value":"John-Appleseed@mac.com"}],"postalAddresses":[{"id":"1A0C62AE-6743-4F92-8391-359CC1288A5A","label":"Work","location":{"street":"3494 Kuhl Avenue","city":"Atlanta","state":"GA","postalCode":"30303","country":"USA","countryCode":"ca","formatted":""}},{"id":"0F81DD1F-F720-49D4-93BE-CE8453110627","label":"Home","location":{"street":"1234 Laurel Street","city":"Atlanta","state":"GA","postalCode":"30303","country":"USA","countryCode":"us","formatted":""}}]},{"id":"26384BA8-82EB-4148-A9BB-F0725070C94F","name":{"given":"Katie","middle":"","family":"Bell","prefix":"","suffix":"","displayname":"","phonetic":{"given":"","middle":"","family":""}},"organization":{"name":"","jobTitle":"","department":""},"nickname":"","notes":"","urls":[],"phoneNumbers":[{"id":"8BBD54E1-5BC1-4F16-AABD-8F227E1D43FD","label":"Mobile","value":"(555) 564-8583"},{"id":"E010D8D3-A5E4-4B63-9F2E-F5903A9D5EAB","label":"Main","value":"(415) 555-3695"}],"emailAddresses":[{"id":"7B7B12AA-9DB1-4C2F-97FA-74E9B8F00BBE","label":"Work","value":"kate-bell@mac.com"},{"id":"446DAF70-57DA-4420-B521-0493495B91B7","label":"Work","value":"www.icloud.com"}],"postalAddresses":[{"id":"B8C13183-AAE5-4C5D-B8F9-98B08B31AC37","label":"Work","location":{"street":"165 Davis Street","city":"Hillsborough","state":"CA","postalCode":"94010","country":"","countryCode":"us","formatted":""}}]}],"response":"fetch"}

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

    var allContacts = fromObject(fakeData);
    localContacts.set("allContacts", allContacts.get("data"));
};

function addContact() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/contact-details");
};

exports.addContact = addContact;
exports.contactSelected = contactSelected;
exports.fetchContacts = fetchContacts;