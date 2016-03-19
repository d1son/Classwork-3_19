angular.module('orderApp', [])
    .controller('OrderListController', function($http) {
      var orderList = this;
      orderList.orders = [];
      orderList.itemBoxes = [];
      orderList.itemBoxCounter = 1;

      orderList.addOrder = function() {
        var newOrder = {

          //Grab the recipe form data and complete this object to be submitted to the server
          //hint: check out the recipeList object
          address: orderList.address, //look for this in the HTML form
          notes: orderList.notes,
          items: orderList.itemBoxes
        };
        $http({
          method: 'POST',
          url:'/neworder',
          data: newOrder
        }).then(function (result){
          orderList.orders.push(result.data);
          orderList.address = '';
          orderList.notes = '';
          orderList.itemBoxes = [];
          orderList.itemBoxCounter = [];
          //push the result to the orderList.orders array
          //clear the form and reset the itemBoxCounter
        });
      };

      orderList.getOrders = function() {
        $http({
          method: 'GET',
          url: '/orders'
        }).then (function (results){
          console.log("we got orders back from the server")
          console.log(results);
          //loop over the results and push them to the orderList.orders array
          angular.forEach(results.data, function(order) {
            orderList.orders.push(order);
          });
        });
      };

      orderList.addItemBox = function(){
        orderList.itemBoxes.push({
          name:"item" + orderList.itemBoxCounter,
          placeholder: "Item #" +orderList.itemBoxCounter
        });
        orderList.itemBoxCounter++;
      };


      orderList.getOrders();
    });