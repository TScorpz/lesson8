$(document).ready(function() {
  var products = [];
  var cart = JSON.parse(localStorage.getItem("cart"));
  updateShoppingCart();

  //Get data from json file and display it in 'details' view
  $.getJSON("products.json",
    function(data) {
      Object.keys(data.itemList).forEach(function(key, index) {
        products.push(data.itemList[key]);
        $('ul').append('<li><img src="img/products/' + data.itemList[key].img + '" class="productImg"><span class="itemName">' + data.itemList[key].name + '</span><span class="spanDescription">' + data.itemList[key].description + '</span> Model: <span class="spanModel">' + data.itemList[key].model + '</span><img src="img/delete.png" class="removeFromCartImg"><img src="img/cart.png" class="shoppingCartImg"><span class="price">' + data.itemList[key].price + '€</span><span class="itemsLeft">' + data.itemList[key].itemsLeft + '</span></li>');
      });
  });

  //If 'list' icon is clicked - get data from json file and display it in 'list' view
  $(".viewButton.list").on('click', function() {
    $("ul").empty();
    $.getJSON("products.json",
      function(data) {
        Object.keys(data.itemList).forEach(function(key, index) {
          $('ul').append('<li><span class="itemName">' + data.itemList[key].name + '</span><span class="spanDescriptionShort">' + data.itemList[key].descriptionShort + '</span> Model: <span class="spanModel">' + data.itemList[key].model + '</span><img src="img/delete.png" class="removeFromCartImg"><img src="img/cart.png" class="shoppingCartImg"><span class="price">' + data.itemList[key].price + '€</span><span class="itemsLeft">' + data.itemList[key].itemsLeft + '</span></li>');
        });
    });
    $(".viewButton.active").removeClass("active");
    $(this).addClass("active");
  });

  //If 'details' icon is clicked - get data from json file and display it in 'details' view
  $(".viewButton.details").on('click', function(){
    $("ul").empty();
    $.getJSON("products.json",
      function(data) {
        Object.keys(data.itemList).forEach(function(key, index) {
          $('ul').append('<li><img src="img/products/' + data.itemList[key].img + '" class="productImg"><span class="itemName">' + data.itemList[key].name + '</span><span class="spanDescription">' + data.itemList[key].description + '</span> Model: <span class="spanModel">' + data.itemList[key].model + '</span><img src="img/delete.png" class="removeFromCartImg"><img src="img/cart.png" class="shoppingCartImg"><span class="price">' + data.itemList[key].price + '€</span><span class="itemsLeft">' + data.itemList[key].itemsLeft + '</span></li>');
        });
    });
    $(".viewButton.active").removeClass("active");
    $(this).addClass("active");
  });

  //If clicked on shopping cart icon
  $("div").on('click', '.shoppingCartImg', function() {
    var model = $(this).parent().find(".spanModel").html();
    var itemIndex = searchArrayByModel(products, model);
    if(products[itemIndex].itemsLeft > 0) {
      addToCart(products[itemIndex]);
      $(this).parent().find('.itemsLeft').html(--(products[itemIndex].itemsLeft));
      updateShoppingCart();
    }
  });

  //If clicked on remove from cart icon
  $("div").on('click', '.removeFromCartImg', function() {
    var model = $(this).parent().find(".spanModel").html();
    removeFromCart(model);
    updateShoppingCart();
  });

  //Pushes passed object into 'cart' array and updates local storage
  function addToCart(obj) {
    cart.push(obj);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //Removes specified object from cart array and updates local storage
  function removeFromCart(model) {
    for(var i = cart.length - 1; i >= 0; i--) {
      if(cart[i].model == model) {
        cart.splice(i, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //Searches specified array for 'value' and returns its index if found, -1 otherwise
  function searchArrayByModel(arr, value) {
    var index = -1;
    for(var i = 0, len = arr.length; i < len; i++) {
      if(arr[i].model == value) {
        index = i;
        return index;
      }
    }
  }

  //Updates shopping cart
  function updateShoppingCart() {
    var sum = 0;
    $('.spanCartItems').html(cart.length);
    for(var i = 0, len = cart.length; i < len; i++) {
      sum += cart[i].price;
    }
    $('.spanCartSum').html(sum.toFixed(2));
  }
});
