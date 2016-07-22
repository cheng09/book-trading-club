(function() {
  
  angular
    .module('app')
    .service('DataService', DataService);
    
  DataService.$inject = ['$http', 'AuthenticationService'];
  
  function DataService($http, AuthenticationService) {
    
    function getProfile() {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + AuthenticationService.getToken()
        }
      });
    }
    
    function setProfile(user) {
      return $http.post('/api/profile', user);
    }
    
    function getCollection() {
      var url = '/api/collection/' + encodeURIComponent(AuthenticationService.currentUser().email);
      return $http.get(url);
    }
    
    function getWishlist() {
      var url = '/api/wishlist/' + encodeURIComponent(AuthenticationService.currentUser().email);
      return $http.get(url);
    }
    
    function getPending() {
      var url = '/api/pending/' + encodeURIComponent(AuthenticationService.currentUser().email);
      return $http.get(url);
    }
    
    function addToCollection(book) {
      return new Promise(function(resolve, reject) {
        var user = AuthenticationService.currentUser();
        $http.post('/api/collection', {
          user: user,
          book: book
        }).catch(function(err) {
          reject(err);
        }).then(function(result) {
          resolve(book.id);
        });
      });
    }
    
    function removeFromCollection(book) {
      return new Promise(function(resolve, reject) {
        var user = AuthenticationService.currentUser();
        $http.get('/api/collection/' + encodeURIComponent(user.email) + '/' + book.id )
          .then(function(result) {
            resolve(result.data);
          });
      });
    }
    
    function getAllBooks() {
      console.log("Calling all books api");
      return $http.get('/api/books');
    }
    
    function addToWishlist(book) {
      return new Promise(function(resolve, reject) {
        var user = AuthenticationService.currentUser();
        $http.post('/api/wishlist', {
          user: user,
          book: book
        }).catch(function(err) {
          reject(err);
        }).then(function(result) {
          resolve(book.id);
        });
      });
    }
    
    function removeFromWishlist(book) {
      return new Promise(function(resolve, reject) {
        var user = AuthenticationService.currentUser();
        $http.get('/api/wishlist/' + encodeURIComponent(user.email) + '/' + book.id )
          .then(function(result) {
            resolve(result.data);
          });
      });
    }
    
    return {
      getProfile: getProfile,
      setProfile: setProfile,
      getCollection: getCollection,
      getWishlist: getWishlist,
      getPending: getPending,
      addToCollection: addToCollection,
      removeFromCollection: removeFromCollection,
      addToWishlist: addToWishlist,
      removeFromWishlist: removeFromWishlist,
      getAllBooks: getAllBooks
    };
    
    
  }
  
})();