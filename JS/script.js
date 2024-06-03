function send_json(datas,urlp){
    fetch(urlp,{
        method:"POST",
        //headers:{'Content-Type':'application/json'},
        body:JSON.stringify(datas)
    })
    .then(response => response.json())
    .then(data =>{
        //console.log('server_response',data);
        //alert(`received json:${JSON.stringify(data)}`)
        if (data && data.redirect){
            if(data.info == 'verified'){
                export_data('./index.html',data.user_id)
            }
            if(data.info == 'order_made'){
                alert(data)
                alert('Order has been made, successfully')
                window.location.href='./index.html'
            }
        }
    })
    .catch(error =>{
        alert('no connection..')
        console.log('error',error)
    });
  
  }

//actual endpoint test
//var endpoint= "https://drum-clear-hawk.ngrok-free.app/api/";

//local endpoint
var endpoint= "http://127.0.0.1:3000/api/";

document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
        client_name: form.cname.value,
        email: form.email.value,
        service: form.service.value,
        amount: form.amount.value,
        message: form.message.value,
    };
    
    send_json(data,endpoint);
    
});
