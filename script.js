function callback(){
  console.log(this.responseText);
}

function getProjects(){
  api("customers").then(res=>{console.log(res);
    res.forEach(item=>{
      console.log(item.Address2==null);
      var address= item.Address + " " + (item.Address2==null?"":item.Address2);
      var row = `<tr><td>${item.Name}</td><td>${address}</td><td>${item.City}</td><td>${item.Country}</td><td>${item.Email}</td><td>${item.Phone}</td><td>${item.Zip}</td></tr>`;
      document.getElementById('tablebody').innerHTML+=row;
    })
  }).catch(err=>{console.log("fuckin error");})
}

function getCustomers(){
  api("customers").then(res=>{console.log(res);
    res.forEach(item=>{
      console.log(item.Address2==null);
      var address= item.Address + " " + (item.Address2==null?"":item.Address2);
      var row = `<tr><td>${item.Name}</td><td>${address}</td><td>${item.City}</td><td>${item.Country}</td><td>${item.Email}</td><td>${item.Phone}</td><td>${item.Zip}</td></tr>`;
      document.getElementById('tablebody').innerHTML+=row;
    })
  }).catch(err=>{console.log("fuckin error");})
}

function getDevs(endpoint){
  api(endpoint).then(res=>{
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
