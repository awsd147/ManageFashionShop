
$(document).ready(function(){
    var bigproduct = {}
    var count = 0
    
    if(localStorage.getItem('Product')){
        bigproduct = JSON.parse(localStorage.getItem('Product'))
    }//Xử lí khi F5 vẫn lưu object

    if(localStorage.getItem('Count')){
            count = localStorage.getItem('Count')
            $('li#cart p').text(count)
    }//Xử lí khi F5 vẫn lưu object
    
    $('a.add-to-cart').click(function(){
        event.preventDefault();
        var image = $(this).closest('div.product-image-wrapper').find('img').attr('src')
        var price = $(this).closest('div.product-overlay').find('h2').text()
        var nameproduct = $(this).closest('div.product-overlay').find('p').text()
     
        var product ={}

        var product = {
            'name' : nameproduct,
            'price' : price,
            'image' : image,
            'quantity': 1
        }
        if(!bigproduct[image])
        {
            bigproduct[image] = product
            console.log(bigproduct[image])
            
        }    
        else{
            bigproduct[image]['quantity']+=1;
            console.log(bigproduct[image]['quantity'])
        }
        localStorage.setItem('Product',JSON.stringify(bigproduct))

      
         Object.keys(bigproduct).map(function(value,key){
                count = key +1    
        })    
        localStorage.setItem('Count',count)
        $('li#cart p').text(count)
        
        // Nếu mà sp có rồi thì lấy dữ liệu tren localstore chuyen qua object
        //object.qrt +=1
        // Luu ngược lại localstore

    })
})