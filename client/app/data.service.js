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
    };
    
    function getCollection() {
      var url = '/api/collection/' + encodeURIComponent(AuthenticationService.currentUser().email);
      return $http.get(url);
    };
    
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
    
    function remove(book) {
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
    
    return {
      getProfile: getProfile,
      getCollection: getCollection,
      addToCollection: addToCollection,
      remove: remove,
      getAllBooks: getAllBooks
    }
  }
  
})();