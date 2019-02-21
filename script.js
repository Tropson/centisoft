$(document).ready(function() {
  $("#formsubmit").click((event)=>{
    event.preventDefault();
    if($("#name").val().split(' ').join('')=="" || $("#email").val().split(' ').join('')=="")
    {
        alert("The fields are required");
    }
    else{
      $.ajax({
          headers: {
            "centisoft_toke":"VerySecretToken1"
          },
          url: `http://tropson-001-site1.itempurl.com/api/developers`,
          method:'POST',
          data:$("#form").serialize(),
          'success':()=>{window.location.replace("developers.html")},
          'error':()=>{alert("ERROR")}
      })
    }
  })
});
function test(){
  console.log($("#name").val().split(' ').join('')=="")
}
$(document).ready(function() {
  $("#customerSubmit").click((event)=>{
    event.preventDefault();
    if($("#name").val().split(' ').join('')=="" || $("#address").val().split(' ').join('')=="" || $("#city").val().split(' ').join('')=="" || $("#zip").val().split(' ').join('')=="" || $("#country").val().split(' ').join('')=="" || $("#email").val().split(' ').join('')=="")
    {
      alert("The fields are required!");
    }
    else{
      $.ajax({
        headers:{
          "centisoft_toke":"VerySecretToken1"
        },
        url: `http://tropson-001-site1.itempurl.com/api/customers/2`,
        method: 'POST',
        data: $("#formCustomer").serialize(),
        'success':()=>{window.location.replace("customers.html")},
        'error':()=>{alert("ERROR")}
      })
    }
  })
});
function redirect(id)
{
  window.localStorage.setItem('id', id);
  window.location.replace('projects.html')
}
function getProjects(id){
  var customerName;
  api(`customers/${window.localStorage.getItem('id')}/projects`).then(res=>{console.log(res);
    api(`customers/${window.localStorage.getItem('id')}`).then(cust=>{
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
      var row = `<tr><td>${item.Name}</td><td>${address}</td><td>${item.City}</td><td>${item.Country}</td><td>${item.Email}</td><td>${item.Phone}</td><td>${item.Zip}</td><td><button onclick="redirect(${item.Id})">Projects</button></td></tr>`;
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
