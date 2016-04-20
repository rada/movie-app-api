app.factory('ProfileService', function(){
  return new (function(){
    var service = this;
    service.userLSId = "movieAppUser"

    service.getUserFromLS = function (){
      var user = {};
      try{
        user = JSON.parse(localStorage.getItem(service.userLSId));
        user.photo = localStorage.getItem("userPhoto");
      }catch(e){
        console.warn("Unable to get user details from localStorage: ", e);
      }
      return user;
    }

    service.getUserPic = function(imgElemId){
      navigator.camera.getPicture(service.camSuccess, service.camFail, { quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
      });
    }

    service.camSuccess = function (imageData) {
        var image = document.getElementById('userImage');
        image.src = "data:image/jpeg;base64," + imageData;
    }

    service.camFail = function (message) {
        alert('Failed because: ' + message);
    }
  })()
})
