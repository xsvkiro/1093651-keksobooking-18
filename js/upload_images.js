'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooserElement = document.querySelector('.ad-form-header__input');
  var avatarPreviewElement = document.querySelector('.ad-form-user__pic');
  var housingPhotoChooserElement = document.querySelector('.ad-form__input');
  var housingPreviewElement = document.querySelector('.ad-form__photo');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');

  var checkMatch = function (el) {
    var fileName = el.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  var addPhoto = function (el) {
    if (checkMatch(el)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photoParentElement = document.createElement('div');
        photoParentElement.classList.add('ad-form__photo');
        photoContainerElement.appendChild(photoParentElement);

        var photoElement = document.createElement('img');
        photoElement.style.height = '90%';
        photoElement.style.width = '90%';
        photoElement.src = reader.result;

        photoParentElement.appendChild(photoElement);
      });

      reader.readAsDataURL(el);
    }
  };

  var onAvatarUpload = function () {
    var file = avatarChooserElement.files[0];

    if (checkMatch(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onHousePhotosUpload = function () {
    photoContainerElement.removeChild(housingPreviewElement);
    [].forEach.call(housingPhotoChooserElement.files, addPhoto);
  };

  avatarChooserElement.addEventListener('change', onAvatarUpload);

  housingPhotoChooserElement.addEventListener('change', onHousePhotosUpload);
})();
