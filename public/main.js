var update=document.getElementById('update')
var del = document.getElementById('delete')




update.addEventListener('click',function(){
    fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'id': id.value,
    'name': name.value,
    'quote': lastname.value,
    'date': date.value,
    'state': state.value
  })
})
    fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
})
console.log("Recogiendo data")

del.addEventListener('click', function () {
  var id = document.getElementById('id')
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': id.value
      
    })
  }).then(function (response) {
    console.log(name)
    window.location.reload()
  })
})

