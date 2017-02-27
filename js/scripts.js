$(document).ready(function(){
  $.getJSON("products.json",
    function(data) {
      Object.keys(data.itemList).forEach(function(key, index) {
        $('ul').append('<li><img src="img/products/' + data.itemList[key].img + '" class="productImg">' + '<span class="itemName">' + data.itemList[key].name + '</span>' + '<span class="spanDescription">' + data.itemList[key].description + '</span>' + '<img src="img/cart.png" class="shopingCartImg"><span class="price">' + data.itemList[key].price + '€</span></li>');
      });
  });
});
