mergeInto(LibraryManager.library, {

  GetTypePlatformDevice: function () {
    getTypeDevice();
  },

  GiveMePlayerData: function () {

    initPlayer().then((_player)=>
    if(_player.getMode()==='lite'){
      gameInstance.SendMessage("GameManager","SetName","101");
    }
    else{
       gameInstance.SendMessage("GameManager","SetName",_player.getName());
    }
    )
   /*  var checkGetMode = setInterval(function(){
      if (player.getMode != null) {
        clearInterval(checkGetMode);
        if(player.getMode()==='lite'){

    gameInstance.SendMessage("GameManager","SetName","101");
    }
    else{
    gameInstance.SendMessage("GameManager","SetName",player.getName());
    }
  }},1000)
     console.log("ошибку тут2");*/
  },
AuthPlayer: function(){
  auth();
},
  RateGame: function() {
      console.log("ошибку тут3");
   ysdk.feedback.canReview()
        .then(({ value, reason }) => {
            if (value) {
                ysdk.feedback.requestReview()
                    .then(({ feedbackSent }) => {
                        console.log(feedbackSent);
                    })
            } else {
                console.log(reason)
            }
        })
         console.log("ошибку тут3");
  },
CanRateGame: function(){
   console.log("ошибку тут4");
   ysdk.feedback.canReview()
        .then(({ value, reason }) => {
            if (value) {
                gameInstance.SendMessage("GameController","CheckRateGame", 1);
            } else {
                gameInstance.SendMessage("GameController","CheckRateGame", 2);
            }
        });
           console.log("ошибку тут4");
},
TestExtern: function(date2){

  initPlayer().then((_player)=>
  if(_player.getMode()=== 'lite'){
  gameInstance.SendMessage('GameManager', 'SavePlayerPrefs', "2");
}
else{
  var dateString = UTF8ToString(date2);
  var myobj = JSON.parse(dateString);
   _player.setStats(myobj);
}
)
  /*
    if (player.getMode() === 'lite') {
         console.log("ошибку тут5");
      
       gameInstance.SendMessage('GameManager', 'SavePlayerPrefs', "2");
      
    }

        var dateString = UTF8ToString(date2);
         
          var myobj = JSON.parse(dateString);
         
        player.setStats(myobj);
         console.log("ошибку тут5");
      
*/
},

LoadExtern: function(){
  initPlayer().then((_player)=>
   if(_player.getMode()==='lite'){
      var checkInstance = setInterval(function() {
            if (gameInstance != null) {
              clearInterval(checkInstance);
              gameInstance.SendMessage('GameManager', 'LoadPlayerPrefs', "zero");
            }},1000);
   }
   else{
     _player.getStats().then(_date => {
              console.log("ошибку тут62");
          
            const myJSON = JSON.stringify(_date);
               console.log("ошибку тут67");
            gameInstance.SendMessage('GameManager', 'SetPlayerInfo', myJSON);
   })
   }
  )
  /*
    var checkGetMode = setInterval(function(){
       console.log("ошибку тут6");

      if (player.getMode != null) {
        clearInterval(checkGetMode);
      console.log(player);
       console.log(gameInstance);
       if (player.getMode() === 'lite') {
          var checkInstance = setInterval(function() {
            if (gameInstance != null) {
              clearInterval(checkInstance);
              gameInstance.SendMessage('GameManager', 'LoadPlayerPrefs', "zero");
            }
          }, 1000); // Проверка каждую секунду
       } else {
          console.log("ошибку тут61");
         player.getStats().then(_date => {
              console.log("ошибку тут62");
          
            const myJSON = JSON.stringify(_date);
               console.log("ошибку тут67");
            gameInstance.SendMessage('GameManager', 'SetPlayerInfo', myJSON);
               console.log("ошибку тут68");
            })
        
     
       }
      }
    }, 1000);
     console.log("ошибку тут6");
       // Установите интервал в нужное значение, например, 100 мс
  */},   
  isAuth: function() {
     console.log("ошибку тут7");
      
    var checkGetMode = setInterval(function(){
      if (player.getMode != null) {
        clearInterval(checkGetMode);
        if (player.getMode() === 'lite') {
          gameInstance.SendMessage('GameManager', 'isAuth2', 'false');
        } else {
          gameInstance.SendMessage('GameManager', 'isAuth2', 'true');
        }
      }
    }, 1000); // Установите интервал в нужное значение, например, 1000 мс
 
  console.log("ошибку тут7");
       },
AddCoinExtern: function(){

ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => {
          console.log('Video ad open.');
        },
        onRewarded: () => {
          gameInstance.SendMessage('ScriptAd','AddCoin',100);
        },
        onClose: () => {
          console.log('Video ad closed.');
        }, 
        onError: (e) => {
          console.log('Error while open video ad:', e);
        }
    }
})
},
  SetToLeaderboard: function(value){
     
    ysdk.getLeaderboards()
      .then(lb =>{
        lb.setLeaderboardScore("MaxWave", value)
      })
  },

  GetToLeaderboard: function(){
  
  ysdk.getLeaderboards().then(lb => {
    lb.getLeaderboardEntries('MaxWave', { quantityTop: 6, includeUser: true, quantityAround: 3}).then(res => gameInstance.SendMessage('GameController', 'GetLeaderBoard', JSON.stringify(res)));
        
});
},
RestartExtern: function(){
  ysdk.adv.showRewardedVideo({
    callbacks: {
        onOpen: () => {
          console.log('Video ad open.');
        },
        onRewarded: () => {
          gameInstance.SendMessage('ScriptAd','SucRestart',1);
        },
        onClose: () => {
          console.log('Video ad closed.');
        }, 
        onError: (e) => {
          console.log('Error while open video ad:', e);
        }
    }
})
},
WatchAd: function(value){
ysdk.adv.showFullscreenAdv({
    callbacks: {
        onClose: function(wasShown) {
          // some action after close
          gameInstance.SendMessage('GameManager','SucAd2',value);
          
        },
        onError: function(error) {
          gameInstance.SendMessage('GameManager','SucAd2',value);
        }
    }
})
},
  GetLang: function(){
     console.log("ошибку тут8");
      
  var lang = ysdk.environment.i18n.lang;

    var bufferSize = lengthBytesUTF8(lang)+1;

    var buffer = _malloc(bufferSize);

    stringToUTF8(lang,buffer,bufferSize);

    return buffer;

      
    
    }


});

var FileIO = {

  SaveToLocalStorage : function(key, data) {
	try {
		localStorage.setItem(UTF8ToString(key), UTF8ToString(data));
	}
	catch (e) {
		console.error('Save to Local Storage error: ', e.message);
	}
  },

  LoadFromLocalStorage : function(key) {
    var returnStr = localStorage.getItem(UTF8ToString(key));
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  },

  RemoveFromLocalStorage : function(key) {
    localStorage.removeItem(UTF8ToString(key));
  },

  HasKeyInLocalStorage : function(key) {
	try {
		if (localStorage.getItem(UTF8ToString(key))) {
		  return 1;
		}
		else {
		  return 0;
		}
	}
	catch (e) {
		console.error('Has key in Local Storage error: ', e.message);
		return 0;
	}
  }
};
mergeInto(LibraryManager.library, FileIO);
