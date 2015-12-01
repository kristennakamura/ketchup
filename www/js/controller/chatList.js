var app = angular.module('ketchup.chatList', [])

app.controller('chatListCtrl', function ($scope,
                                     FIREBASE_URL,
                                     UserService,$localstorage) {
  $scope.title = 'Chat List';
 function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
  var user = $localstorage.get('ketchup-user');
  console.log(user)
  var ref = new Firebase(FIREBASE_URL);
  var postsRef = new Firebase(FIREBASE_URL + "/users/" + user + "/messages");
  postsRef.push({
        'chatID': makeid() ,
        'timePosted' : "13/03/2015",
        'chatPartners' : [
          "facebook:10154494517268975", 
          "facebook:10207042891024578"
        ]
        });


  postsRef.on("value", function(snapshot) {
      $scope.postInfo = snapshot.val();
      $scope.$broadcast('scroll.refreshComplete');
      console.log($scope.postInfo)
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  });
  
  // for (var i = 0; i < $scope.postInfo.length; i++) {
  //   var chatList = $scope.postInfo[i];
  //   console.log(chatList)
  //     // for (var i = 0; i < chatList.length; i++) {
  //     //   var partnerIds =chatList.chatpartners[i]

  //     // };
      
   
  // };
  // function getUserPictures(userIds) {
  //   for (var i = 0; i < userIds.length; i++) {
  //     var postsRef2 = new Firebase(FIREBASE_URL + "/users" + userIds[i] );
  //     postsRef2.on("value", function(snapshot) {
  //       $scope.postInfo2 = snapshot.val();
  //       $scope.$broadcast('scroll.refreshComplete');
  //       console.log($scope.postInfo2)
  //         }, function (errorObject) {
  //       console.log("The read failed: " + errorObject.code);
  //     });
  //   };
  // }
  
  


  $scope.loadMessages = function () {
    postsRef.on("value", function(snapshot) {
      $scope.postInfo = snapshot.val();
      $scope.$broadcast('scroll.refreshComplete');
      console.log("done 1")
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  });
  };




  $scope.$on("$ionicView.enter", function () {
    console.log("chatCtrl-Enter");
  });

  $scope.$on("$ionicView.beforeLeave", function () {
    console.log("chatCtrl-Leave");
  });

});