function callback(){
  console.log(this.responseText);
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getProjects(id){
  var customerName;
  api(`customers/${getCookie('id')}/projects`).then(res=>{console.log(res);
    api(`customers/${getCookie('id')}`).then(cust=>{
      customerName=cust.Name;
      document.getElementById('title').innerHTML += customerName;
      res.forEach(item=>{
        console.log(item);
        var row = `<tr><td>${customerName}</td><td>${item.Name}</td><td>${item.DueDate}</td></tr>`;
        document.getElementById('tablebody').innerHTML+=row;
      })
    })
  }).catch(err=>{console.log(err);})
}
function getCustomers(){
  api("customers").then(res=>{console.log(res);
    res.forEach(item=>{
      console.log(item.Address2==null);
      var address= item.Address + " " + (item.Address2==null?"":item.Address2);
      var row = `<tr><td>${item.Name}</td><td>${address}</td><td>${item.City}</td><td>${item.Country}</td><td>${item.Email}</td><td>${item.Phone}</td><td>${item.Zip}</td><td><button onclick="()=>{document.cookie='id=${item.Id}';window.location.replace('projects.html')}">Projects</button></td></tr>`;
      document.getElementById('tablebody').innerHTML+=row;
    })
  }).catch(err=>{console.log(err);})
}

function getDevs(){
  api("developers").then(res=>{
    res.forEach(item=>{
      var a=`<tr><td>${item.Name}</td><td>${item.Email}</td></tr>`;
      document.getElementById("tablebody").innerHTML+=a;
    })
  }).catch(err=>{console.log(err);})
}

function api(endpoint){
  return new Promise((resolve,reject)=>{
    var conf={
      beforeSend:(request)=>{request.setRequestHeader("centisoft_toke", 'VerySecretToken1');},
      dataType: "json",
      url: `http://tropson-001-site1.itempurl.com/api/${endpoint}`,
      success: (data)=>{resolve(data);},
      error:(data)=>{reject(data);}
    };
    $.ajax(conf);
  })
}
