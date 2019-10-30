cordova.define("cordova-plugin-camera.camera", function(require, exports, module) {


var argscheck = require('cordova/argscheck');
var exec = require('cordova/exec');
var Camera = require('./Camera');


var cameraExport = {};

for (var key in Camera) {
    cameraExport[key] = Camera[key];
}

cameraExport.getPicture = function (successCallback, errorCallback, options) {
    argscheck.checkArgs('fFO', 'Camera.getPicture', arguments);
    options = options || {};
    var getValue = argscheck.getValue;

    var quality = getValue(options.quality, 50);
    var destinationType = getValue(options.destinationType, Camera.DestinationType.FILE_URI);
    var sourceType = getValue(options.sourceType, Camera.PictureSourceType.CAMERA);
    var targetWidth = getValue(options.targetWidth, -1);
    var targetHeight = getValue(options.targetHeight, -1);
    var encodingType = getValue(options.encodingType, Camera.EncodingType.JPEG);
    var mediaType = getValue(options.mediaType, Camera.MediaType.PICTURE);
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = getValue(options.popoverOptions, null);
    var cameraDirection = getValue(options.cameraDirection, Camera.Direction.BACK);

    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
        mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions, cameraDirection];

    exec(successCallback, errorCallback, 'Camera', 'takePicture', args);
};


cameraExport.cleanup = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'Camera', 'cleanup', []);
};

module.exports = cameraExport;

});
