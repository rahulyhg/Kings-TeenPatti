myApp.controller("LobbyCtrl", function ($scope, $state, $ionicModal, $ionicPlatform, Service, $http, $timeout) {

  $ionicPlatform.ready(function () {
    screen.orientation.lock('landscape');
  })
  screen.orientation.lock('landscape');


  $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
  }, 100);
  //reset Page
  $scope.resetpage = function () {
    $scope.pageNo = 1;
    $scope.cachedPage = 1;
    $scope.loadingDisable = false;
    $scope.results = [];
    $scope.transferStatementData = [];
    $scope.privateTableDatas = [];
    $scope.tablesData = [];
    $scope.tablesDataFilter = [];
    $scope.noDataFound = false;
    $scope.paging = {
      maxPage: 1
    };
  }

  $scope.resetpage();
  $scope.filterType = ['private', 'public'];

  $scope.accessToken = $.jStorage.get("accessToken");

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      $scope.image = $scope.singlePlayerData.image;
      $scope.memberId = $scope.singlePlayerData._id;
      $scope.username = $scope.singlePlayerData.username;
      $scope.userType = $scope.singlePlayerData.userType;
      $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
    })
  };

  $scope.playerData();
  //to close all tab and side menu
  $scope.closeAllTab = function () {
    $scope.VariationActive = false;
    $scope.sideMenu = false;
    $scope.showType = false;
  }
  $scope.closeAllTab();

  $scope.closeMenu = function () {
    $scope.sideMenu = false;
  }
  $scope.openMenu = function ($event) {
    $event.stopPropagation();
    $scope.sideMenu = true;
  }


  //storing all model in $scope

  //profit and loss
  $ionicModal.fromTemplateUrl('templates/model/profit-loss-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.PLModal = modal;
  });

  $scope.openPLModal = function () {
    $scope.PLModal.show();
  }
  $scope.closePLModal = function () {
    $scope.PLModal.hide();
  };

  //account statementloadingDisable
  $ionicModal.fromTemplateUrl('templates/model/account-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.results = [];
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal = modal;
  });

  $scope.openACStatement = function () {
    $scope.results = [];
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.paging = {
      maxPage: 1
    };
    $scope.ACStatementModal.show();
  }
  $scope.closeACStatement = function () {
    $scope.ACStatementModal.hide();
  }

  //Account Statement
  $scope.loadMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement();
    } else {

    }
  };

  $scope.accountStatement = function () {
    Service.getTransaction($scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "<p>No Data Found.</p>",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.results.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };


  //transfer statement
  $ionicModal.fromTemplateUrl('templates/model/transfer-statement.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.transferStatementModal = modal;
  });



  $scope.openTransferStatement = function () {
    $scope.transferStatementData = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.transferStatementModal.show();
  }
  $scope.closeTransferStatement = function () {
    $scope.transferStatementModal.hide();
  }

  //Transfer Statement
  $scope.loadTransferMore = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.accountStatement();
    } else {

    }
  };

  $scope.transferStatement = function () {
    Service.searchPlayerTransaction($scope.memberId, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "<p>No Data Found.</p>",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.transferStatementData.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };


  //password change

  $ionicModal.fromTemplateUrl('templates/model/change-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.changePasswordModel = modal;
  });

  $scope.openChangePasswordModel = function () {
    $scope.data = {};
    $scope.fail1 = false;
    $scope.success = false;
    $scope.fail2 = false;
    $scope.changePasswordModel.show();
  }
  $scope.closeChangePasswordModel = function () {
    $scope.changePasswordModel.hide();
  }
  //game price range 
  $ionicModal.fromTemplateUrl('templates/model/table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.tablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.priceRangeModal = modal;
  });
  $scope.openPriceRangeModal = function () {
    $scope.tablesDataFilter = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.priceRangeModal.show();
  }
  $scope.closePriceRangeModal = function () {
    $scope.priceRangeModal.hide();
  }

  //for table selection//
  $scope.playNow = function ($event) {
    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal();
      $event.stopPropagation();
    }
  }

  $scope.getcheck = function () {
    return $scope.loadingDisable;
  }
  $scope.loadMoreFilterTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.filterTables();
    } else {}
  };

  //Filter Table Data

  $scope.filterTables = function () {
    Service.getFilterTableData($scope.filterData, $scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "<p>No Data Found.</p>",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.tablesDataFilter.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  //resetFilter
  $scope.resetFilter = function () {
    $scope.filterData = {};
    $scope.filterTables();
  };

  //my private Table Info 
  $ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.myPrivateModal = modal;
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
  });
  $scope.openMyPrivateModal = function () {
    $scope.privateTableDatas = [];
    $scope.paging = {
      maxPage: 1
    };
    $scope.pageNo = 1;
    $scope.loadingDisable = false;
    $scope.myPrivateModal.show();
  }
  $scope.closeMyPrivateModal = function () {
    $scope.myPrivateModal.hide();
  }

  //Private Table Info
  $scope.loadMorePrivateTable = function () {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.pageNo++;
      $scope.loadingDisable = true;
      $scope.myPrivateTable();
    } else {

    }
  };

  $scope.myPrivateTable = function () {
    Service.getPrivateTables($scope.pageNo, function (data) {
      if (data) {
        if (data.data.data.total === 0) {
          $scope.noDataFound = true;
          // Error Message or no data found 
          $scope.displayMessage = {
            main: "<p>Your Private table is empty.</p><p>Create your private table to view.</p>",
          };
        }
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function (n) {
          $scope.privateTableDatas.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {}
    });
  };

  //logout
  $scope.logout = function () {
    Service.playerLogout(function (data) {
      if (data.data.value) {
        $.jStorage.flush();
        $state.go('login');
      }
    });
  }


  // going to next SVGViewElement
  $scope.goTO = function (view) {
    $scope.gameType = view;
    if ($scope.gameType == "playnow") {}
  }

  //onclick for each play type
  $scope.variationToggle = function ($event) {
    $event.stopPropagation();
    if ($scope.VariationActive) {
      $scope.VariationActive = false;
    } else {
      $scope.VariationActive = true;
    }
  }


  $scope.playJoker = function ($event) {

    if (!$scope.VariationActive) {
      $scope.openPriceRangeModal();
      $event.stopPropagation();

    }
  }


  $scope.goToTable = function (table) {
    $scope.tableId = table._id;
    $scope.closePriceRangeModal();
    $timeout(function () {
      $state.go('table', {
        'id': $scope.tableId
      });
    }, 300)


  }


  //change password//

  $scope.passwordChange = function (data) {
    $scope.passwordData = data;
    if (data.newPassword == data.repeatPassword) {
      $scope.playerData = $.jStorage.get("player");
      $scope.passwordData._id = $scope.memberId;

      $scope.changePasswordPromise = Service.passwordchange(data, function (data) {
        if (data.data == "Old password did not match") {
          $scope.fail1 = true;
          $scope.success = false;
          $scope.fail2 = false;
        } else if (data.data == "Password changed") {
          $scope.success = true;
          $scope.fail1 = false;
          $scope.fail2 = false;
        }

      });

    } else {
      $scope.fail2 = true;
      $scope.success = false;
      $scope.fail1 = false;
    }
  };



  //private Table

  $ionicModal.fromTemplateUrl('templates/model/create-private-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalCreate = modal;
  });

  $scope.createPrivateModal = function ($event) {
    $scope.ModalCreate.show();
    $event.stopPropagation();
  }
  $scope.closePrivateTable = function () {
    $scope.ModalCreate.hide();
  };

  //Rules

  $ionicModal.fromTemplateUrl('templates/model/rules.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.rulesModal = modal;
  });

  $scope.openRulesModal = function ($event) {
    $scope.rulesModal.show();
    $event.stopPropagation();
  }
  $scope.closeRulesModal = function () {
    $scope.rulesModal.hide();
  };


  //private table info modal

  $ionicModal.fromTemplateUrl('templates/model/private-table-info.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalInfo = modal;
  });

  $scope.openMyPrivateTable = function () {
    $scope.privateTableDatas = [];
    $scope.ModalInfo.show();

  }
  //search table
  $ionicModal.fromTemplateUrl('templates/model/search-table.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.ModalSearch = modal;
  });

  $scope.opensearchModal = function () {
    $scope.ModalSearch.show();
  }



  //privatetable call
  $scope.createPrivateTable = function (formData) {
    Service.createTable(formData, function (data) {
      if (data.value) {
        $scope.privateTableData = data.data;
        $timeout(function () {
          $scope.privateTableData = false;
        }, 10000);
      } else {}
    });
  };

  //private table  login in 
  $ionicModal.fromTemplateUrl('templates/model/private-table-login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.privateLogInModal = modal;
  });

  $scope.showPrivateLogInModal = function () {
    $scope.privateLogInModal.show();
  }
  $scope.closePrivateLogInModal = function () {
    $scope.privateLogInModal.hide();
  };

  $scope.goToPrivateTableLogIn = function (data) {
    $scope.privateDataForModal = data;
    $scope.showPrivateLogInModal();
    //
  }

  $scope.goToPrivateTable = function (tableID, password) {
    Service.getAccessToTable({
      'tableId': tableID,
      'password': password
    }, function (data) {
      if (data.data.value) {
        $scope.tableId = data.data.data._id;
        $scope.closePrivateLogInModal();
        $scope.closePriceRangeModal();
        $timeout(function () {
          $state.go('table', {
            'id': $scope.tableId
          });
        }, 300)
      } else {
        $scope.errorInPrivateLogIn = true;
      }

    })

  };


  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.PLModal.remove();
    $scope.ACStatementModal.remove();
    $scope.transferStatementModal.remove();
    $scope.changePasswordModel.remove();
    $scope.priceRangeModal.remove();
    $scope.privateLogInModal.remove();
    $scope.rulesModal.remove();
    $scope.closeAllTab();
  });

});
