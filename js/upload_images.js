'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-user__pic');
  var housingPhotoChooser = document.querySelector('.ad-form__input');
  var housingPreview = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

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
        var photoElement = document.createElement('div');
        photoElement.classList.add('ad-form__photo');
        photoContainer.appendChild(photoElement);

        var photo = document.createElement('img');
        photo.style.height = '90%';
        photo.style.width = '90%';
        photo.src = reader.result;

        photoElement.appendChild(photo);
      });

      reader.readAsDataURL(el);
    }
  };

  var onAvatarUpload = function () {
    var file = avatarChooser.files[0];

    if (checkMatch(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onHousePhotosUpload = function () {
    photoContainer.removeChild(housingPreview);
    [].forEach.call(housingPhotoChooser.files, addPhoto);
  };

  avatarChooser.addEventListener('change', onAvatarUpload);

  housingPhotoChooser.addEventListener('change', onHousePhotosUpload);
})();
