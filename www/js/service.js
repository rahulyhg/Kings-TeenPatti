myApp = angular.module('starter.service', []);
var url = adminUUU + '/api/';
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
myApp.factory('Service', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  io.socket.on('connect', function (socket) {
    socketId = io.socket._raw.id;
    $.jStorage.set("socketId", io.socket._raw.id);
    obj.connectSocket(function () {});
  });

  var obj = {
    all: function () {
      return chats;
    },
    getNavigation: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    removeAccessToken: function (data, callback) {
      $.jStorage.flush();
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    playerLogin: function (data, callback) {
      return $http.post(adminurl + 'member/playerLogin', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },
    playerLogout: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(adminurl + 'member/logout', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    passwordchange: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(adminurl + 'member/changePassword', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      }
    },

    sendAccessToken: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(adminurl + 'member/getAccessLevel', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      } else {
        $state.go("login");
      }
    },
    // giveTip: function (data, callback) {
    //   console.log("give", data);
    //   $http.post(adminurl + 'member/giveTip', {
    //     "id": data.memberId,
    //     "amount": data.amount
    //   }).then(function (data) {
    //     console.log("give Tip Response", data);
    //     callback(data);
    //   });
    // },
    searchPlayerTransaction: function (data, callback) {
      console.log(data._id);
      $http.post(adminurl + 'transaction/searchPlayerTransactionData', {
        _id: data._id,
        pageNo: data.pageNo
      }).then(function (data) {
        callback(data);
      });
    },

    //from teenpatti 
    tableData: function (callback) {
      $http({
        url: url + 'Table/search',
        method: 'POST'
      }).then(function (data) {
        callback(data);
      });
    },

    getPrivateTables: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(url + 'Table/getPrivateTables', {
          accessToken: accessToken,
          page: 1
        }).then(function (data) {
          callback(data);
        });
      }
    },
    getOneTable: function (id, callback) {
      $http.post(url + 'Table/getOne', {
        _id: id
      }).then(function (data) {
        callback(data);
      });
    },
    getAccessToTable: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Table/getAccessToTable', {
          'tableId': data.tableId,
          'password': data.password
        }).then(function (data) {
          callback(data);
        });
      }
    },
    getAll: function (data, callback) {
      $http({
        url: url + 'Player/getAll',
        method: 'POST',
        data: data
      }).then(function (data) {
        callback(data);
      });
    },
    savePlayerToTable: function (dataPlayer, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http({
          url: url + 'Table/addUserToTable',
          method: 'POST',
          data: {
            playerNo: dataPlayer.playerNo,
            tableId: dataPlayer.tableId,
            socketId: socketId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },

    getOnePlayer: function (id, callback) {
      $http.post(url + 'Player/getOne', {
        _id: id
      }).then(function (data) {
        callback(data);
      });
    },


    makeSeen: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/makeSeen', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    chaal: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/chaal', {
          "tableId": data.tableId,
          "accessToken": accessToken,
          "amount": data.amount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    pack: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/fold', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    sideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/sideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data.data);
        });
      }
    },
    doSideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/doSideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    showWinner: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/showWinner', {
          "accessToken": accessToken,
          "tableId": tableId,
        }).then(function (data) {
          callback(data);
        });
      }
    },
    rejectSideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/cancelSideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },

    deletePlayer: function (playerdetails, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/deletePlayer', {
          "tableId": playerdetails.tableId,
          "accessToken": accessToken,
        }).then(function (data) {
          callback(data);
        });
      }
    },

    connectSocket: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(url + 'Player/updateSocket', {
          accessToken: accessToken,
          socketId: socketId
        }).then(function (data) {
          callback(data);
        });
      }

    },
    getTransaction: function (pageNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Transaction/getPlayerTransaction', {
          "page": pageNo,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    getByPlrId: function (data, callback) {
      $http.post(url + 'Player/getByPlrId', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    makeDealer: function (data, callback) {
      $http.post(url + 'Player/makeDealer', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    deductBootAmount: function (data, callback) {
      $http.post(url + 'Player/deductBootAmount', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    serve: function (data, callback) {
      $http.post(url + 'Player/serve', {
        "tableId": data.tableId,
      }).then(function (data) {
        callback(data);
      });
    },

    createPot: function (data, callback) {
      $http.post(url + 'Pot/createPot', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },
    createTable: function (data, callback) {
      $http.post(url + 'Table/createPrivateTable', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },
    addAmountToPot: function (data, callback) {
      $http.post(url + 'Pot/addAmountToPot', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    }
  };
  return obj;
});
