var permissions = require( "nativescript-permissions" );

function requestPermission(permissionRequested) {
  permissions.requestPermission(permissionRequested, "I need these permissions to complete the tutorial.")
    .then(function() {
      console.log(permissionRequested + " granted :)");
    })
    .catch(function() {
      console.log(permissionRequested + " denied :(");
    });
}

exports.requestPermission = requestPermission;