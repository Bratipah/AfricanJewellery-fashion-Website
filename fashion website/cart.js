$(".cart_text_quantity").html("Ksh. 0");
$(".cart_quantity").html("0");
$("#cart_form").submit(function(e) {
    e.preventDefault();
});
var cartData = [];
$.getJSON('products.json', function(data) {
    var htm = "";
    for (var i =0; i<data.length; i++){
        var oneprod = data[i];
        var thisprod = oneprod;
        htm += '<div class="col-sm-3"><div class="single_product"><div class="product_thumb"> <a href="#" class="primary_img"><img src="' + oneprod.product_image + '"alt="product1" class="oneproduct-image"></a><div class="quick_button"> <a class="quick_view_btn" data-string=\'' + JSON.stringify(thisprod) + '\' data-placement="top"data-original-title="quick view">Quick View</a> </div> </div> <div class="product_content"> <div class="tag_cate"> <a >' + oneprod.product_category + '</a> </div> <h3><a >' + oneprod.product_name + '</a></h3> <div class="price_box"> <span class="current_price">Ksh. ' + oneprod.product_price + '</span> </div> <div class="product_hover"> <div class="product_ratings"> <ul> <li><a href="#"><iclass="ion-ios-star-outline"></i></a> </li> <li><a href="#"><iclass="ion-ios-star-outline"></i></a> </li> <li><a href="#"><iclass="ion-ios-star-outline"></i></a> </li> <li><a href="#"><iclass="ion-ios-star-outline"></i></a> </li> <li><a href="#"><iclass="ion-ios-star-outline"></i></a> </li> </ul> </div> <div class="product_desc"> <p>' + oneprod.product_description + '</p> </div> <div class="action_links"> <ul> <li><a data-placement="top"title="Add to Wishlist"data-toggle="tooltip"><spanclass="ion-heart"></span></a></li> <li class="add_to_cart"><a class="add_to_cart_btn" data-string=\' ' + JSON.stringify(thisprod) + '\' title="Add to Cart">Add to Cart</a></li> <li><a href="#" title="Compare"><iclass="ion-ios-settings-strong"></i></a> </li> </ul> </div> </div> </div> </div> </div>';

    }
    $("#product_row").append(htm);
});

$(document).on('click', '.add_to_cart_btn', function () {
    var thisprod = JSON.parse($(this).attr("data-string"));
    $("#prodimage").html('<img src="' + thisprod.product_image + '"alt="product1" class="oneproduct-image-large">');
    $('#prodprice').html("Ksh. "+thisprod.product_price);
    $('#prodname').html(thisprod.product_name);
    $('#proddescr').html(thisprod.product_description);
    $('#submit_Cart').attr("data-string",JSON.stringify(thisprod));
    $('#oneproduct').modal('show');
});
$(document).on('click', '.quick_view_btn', function () {
    var thisprod = JSON.parse($(this).attr("data-string"));
    $("#prodimage").html('<img src="' + thisprod.product_image + '"alt="product1" class="oneproduct-image-large">');
    $('#prodprice').html("Ksh. "+thisprod.product_price);
    $('#prodname').html(thisprod.product_name);
    $('#proddescr').html(thisprod.product_description);
    $('#submit_Cart').attr("data-string",JSON.stringify(thisprod));
    $('#oneproduct').modal('show');
});
$('#submit_Cart').click(function(){

    var thisprod = JSON.parse($(this).attr("data-string"));
    var qty = $("#qty").val();
    if (qty > 0){
        var onecart = [];
        onecart["prodid"] =thisprod.product_id;
        onecart["product_price"] = thisprod.product_price;
        onecart["product_name"] = thisprod.product_name;
        onecart["product_image"] = thisprod.product_image;
        onecart["product_descr"] = thisprod.product_descr;
        onecart["product_qty"] = qty;
        onecart["product_total"] = thisprod.product_price*qty;
        cartData.push(onecart);
        updateTotal();
    }else {
        alert("You must add quantity!");
    }

});
function updateTotal(){
    var cartTot = 0;
    var cartItems = 0;
    for (var i =0; i<cartData.length; i++){
        var oneTotal = cartData[i]['product_total'];
        cartTot += oneTotal;
        cartItems = cartData.length;
    }
    $(".cart_text_quantity").html("Ksh. "+cartTot);
    $("#final_cart_total").html("Ksh. "+cartTot);
    $(".cart_quantity").html(cartItems);
    alert("Product added to cart!");
    $('#oneproduct').modal('hide');
}
$('.cart_view_link').click(function(){
    populateItems();
});
function populateItems()
{
    var html = "";
    $("#final_cart_items").html(html);
    if (cartData.length > 0){}else {
        html = "<div class='alert alert-danger'>No Items in the cart!</div>";
        $("#final_cart_total").html("Ksh. 0");
    }
    for(var i =0; i<cartData.length; i++){
        html += '<div class="cart_item"> <div class="cart_img"> <a href="#"><img src="' + cartData[i].product_image + '" class="small_cart_image" alt=""></a> </div> <div class="cart_info"> <a href="#">' + cartData[i].product_name + '</a> <span class="quantity">Qty : ' + cartData[i].product_qty + '</span> <span class="price_cart">Ksh. ' + cartData[i].product_total + '</span> </div> <div class="cart_remove"> <a href="#"><i class="ion-android-close"></i></a> </div> </div>';
    }
    $("#final_cart_items").append(html);

}