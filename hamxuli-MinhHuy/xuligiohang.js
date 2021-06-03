$(document).ready(function(){
    
data = JSON.parse(localStorage.getItem('Product'))
var addChar = ''
var addChar2 = ''
var total =0
Object.keys(data).map(function(value,key){
    addChar += 
        '<tr>'+
            '<td class="cart_product">'+
                '<a href="">'+'<img src='+'"'+data[value]['image']+'"'+'alt="">'+'</a>'+
            '</td>'+
            ' <td class="cart_description">'+
                                '<h4>'+'<a href="">'+data[value]['name']+'</a>'+'</h4>'+
                                '<p>'+'Web ID:'+ `${key+1}` +'</p>'+
                            '</td>'+
            ' <td class="cart_price">'+
                '<p>'+data[value]['price']+'</p>'+
            '</td>'+
            '<td class="cart_quantity">'+
                '<div class="cart_quantity_button">'+
                    '<a class="cart_quantity_up" href="">'+ '+' + '</a>'+
                    '<input class="cart_quantity_input" type="text" name="quantity" value='+'"'+data[value]['quantity']+'"'+ 'autocomplete="off" size="2">'+
                    '<a class="cart_quantity_down" href="">'+ '-' + '</a>'+
                '</div>'+
            '</td>'+
            ' <td class="cart_total">'+
                '<p class="cart_total_price">'+ parseInt(data[value]['price'].substr(1,2))*data[value]['quantity']+' $ '+'</p>'+
            '</td>'+
            '<td class="cart_delete">'+
                ' <a class="cart_quantity_delete" href="">'+'<i class="fa fa-times"> '+'</i>'+'</a>'+
            '</td>'+
        '</tr>'

        total += parseInt(data[value]['price'].substr(1,2))*data[value]['quantity']
    })
    addChar2 += '<li>'+'Cart Sub Total'+ '<span class="total-price">'+`${total}`+' $'+'</span>'+'</li>' 
    
    // Thêm chuỗi
    $('tbody').append(addChar)
    $('div.total_area ul').append(addChar2)

    $('a.cart_quantity_up').click(function(e){
        e.preventDefault()
        image = $(this).closest('tr').find('td.cart_product img').attr('src')  // Dùng để kiểm tra value của từng sp khi click     
        price = parseInt($(this).closest('tr').find('td.cart_price p').text().substr(1,2))
        quantity = parseInt($(this).closest('tr').find('td.cart_quantity input').val())+1

        $(this).closest('tr').find('td.cart_quantity input').val(quantity) // thêm giá trị quantity + 1 khi click vào dấu '+'
        
        $(this).closest('tr').find('p.cart_total_price').text(price * quantity+' $')

        data[image].quantity = quantity // Lấy giá trị của thẻ input '+' thêm vào value quantity của object trong localStorage
        total = total + price // Xử lí cộng thêm giá tiền gốc vào tổng tiền của một khi click vào thẻ input

        localStorage.setItem('Product',JSON.stringify(data))
        $('span.total-price').text(total)
        
    })
    $('a.cart_quantity_down').click(function(e){
        e.preventDefault()
        image = $(this).closest('tr').find('td.cart_product img').attr('src') // Dùng để kiểm tra value của từng sp khi click   
        price = parseInt($(this).closest('tr').find('td.cart_price p').text().substr(1,2))
        quantity = parseInt($(this).closest('tr').find('td.cart_quantity input').val())-1

        data[image].quantity = quantity
        localStorage.setItem('Product',JSON.stringify(data))
        $(this).closest('tr').find('td.cart_quantity input').val(quantity)

        total = total - price
        $('span.total-price').text(total)

        
        if(quantity >= 1){
            $(this).closest('tr').find('p.cart_total_price').text((price*quantity)+' $')
        }else{
            alert('Do you want delete this product?')
            check = $(this).closest('tr').find('td.cart_product img').attr('src') // Biến key của từng sp
            delete data[check] // Xóa key của Object sp
            localStorage.setItem('Product',JSON.stringify(data)) // Update lại object 
            
        
            var count1 = 0
            Object.keys(data).map(function(value,key){
                count1 = key +1 
            }) // Đặt biến đếm cho sản phẩm tồn tại trong giỏ hàng
            localStorage.setItem('Count',count1) //Đưa sl sp đang có vào giỏ hàng
            $('li#cart p').text(count1) 

            $(this).closest('tr').remove() // Xóa chuỗi đã được append
            
        }
        
        
    })
    $('a.cart_quantity_delete').click(function(e){
        e.preventDefault()
        image = $(this).closest('tr').find(' img').attr('src') // Dùng để kiểm tra value của từng sp khi click   
        price = parseInt($(this).closest('tr').find('td.cart_price p').text().substr(1,2))
        quantity = parseInt($(this).closest('tr').find('td.cart_quantity input').val())
        
        delete data[image] 
        localStorage.setItem('Product',JSON.stringify(data))

        total = total -(quantity*price) // Lấy tổng tất cả sp hiện có từ cho tổng của từng sản phẩm
        $('span.total-price').text(total+' $') 
        
        var count1 = 0
        Object.keys(data).map(function(value,key){
            count1 = key +1
        })
        localStorage.setItem('Count',count1)
        $('li#cart p').text(count1)
        
        $(this).closest('tr').remove()

         
       
    })
    
    
})

        
   
