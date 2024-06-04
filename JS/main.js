
function showImage() {
  const mobileLogo = document.
querySelector('.mobile-logo');
  const tabletLogo = document.querySelector('.tablet-logo');
  const desktopLogo = document.querySelector('.desktop-logo');

  const windowWidth = window.innerWidth;

  if (windowWidth <= 767) {
    mobileLogo.style.
display = 'block';
    tabletLogo.style.display = 'none';
    desktopLogo.style.display = 'none';
  } else if (windowWidth <= 991) {
    mobileLogo.style.display = 'none';
    tabletLogo.style.display = 'block';
    desktopLogo.style.display = 'none';
  } else {
    mobileLogo.style.display = 'none';
    tabletLogo.style.display = 'none';
    desktopLogo.style.display = 'block';
  }
}

// Call the function on page load and resize
window.addEventListener('load', showImage);
window.addEventListener('resize', showImage);

function show_services() {
  var obj = document.getElementById('drop_grid');

  // Check if the element is currently displayed
  if (obj.style.display === 'none') {
    obj.style.display = 'block'; // Show the element
  } else {
    obj.style.display = 'none'; // Hide the element
  }
}

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
          if(data.info == 'user already exists'){
              alert(JSON.stringify(data))
              alert('user already exists..')
              window.location.href="./login_page.html"
          }
          if(data.info == 'Account_created'){
              alert(data)
              alert('account has been created, now login..')
              window.location.href='./login_page.html'
          }
      }
  })
  .catch(error =>{
      alert('no connection..')
      console.log('error',error)
  });

}

//const data = {
  //name: 'John Doe',
  //age: 30,
//};

async function send_data(data) {
  const url = 'http://localhost:3000/api/data';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const jsonResponse = await response.json();
    console.log('Response from server:', jsonResponse);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}


