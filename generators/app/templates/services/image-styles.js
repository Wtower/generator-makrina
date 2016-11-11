/**
 * Handle image styles
 * Created by yeoman generator-makrina <%= version %> on <%= date %>.
 */
var Promise = require('bluebird');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var gm = require('gm').subClass({imageMagick: true});
Promise.promisifyAll(gm.prototype);

/**
 * Helper private function to get the output image filename
 * @param name: the style name
 * @param image: the image filename
 * @returns {string}
 */
var outputFilename = function(name, image) {
  return '_' + name + '_' + image;
};

/**
 * Check that an image of a certain style exists or create it
 * @param images: an array of images.image filenames
 * @param options: an options object:
 * @param options.path: the images path, eg. 'uploads/product'
 * @param options.name: the image style name, eg. 'thumbnail'
 * @param options.size: an array of the image size. eg. [240, 240]
 * @param options.style: a function to style the image, eg. imagestyles.thumbnail
 * @returns {*|Promise}
 */
var check = function(images, options) {
  return Promise.map(images, function(image) {
    return fs.statAsync(path.join(options.path, outputFilename(options.name, image.image)))
      .catch(function () {
        return options.style(image.image, options);
      });
  });
};

/**
 * Image style: resize an image
 * @param image: image filename
 * @param options: @see check()
 * @returns {*|Promise}
 */
var resize = function (image, options) {
  return gm(path.join(options.path, image))
    .resize(options.size[0], options.size[1])
    .writeAsync(path.join(options.path, outputFilename(options.name, image)))
    .catch(function (err) {
      console.log(err);
    });
};

/**
 * Image style: resize and crop an image
 * @param image: image filename
 * @param options: @see check()
 * @returns {*|Promise}
 */
var resizeCrop = function (image, options) {
  return gm(path.join(options.path, image))
    .resize(options.size[0], options.size[1], '^')
    .gravity('Center')
    .crop(options.size[0], options.size[1])
    .writeAsync(path.join(options.path, outputFilename(options.name, image)))
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = {
  check: check,
  resize: resize,
  resizeCrop: resizeCrop
};
