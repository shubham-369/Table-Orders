"use strict"

var price = document.getElementById('price');
var dish = document.getElementById('dish');
var table = document.getElementById('table');
var t1 = document.getElementById('table1');
var t2 = document.getElementById('table2');
var t3 = document.getElementById('table3');

document.getElementById('form').addEventListener('submit',(e) => {
    e.preventDefault();

    let obj = {
        price:price.value,
        dish:dish.value,
        table:table.value
    }
    let jsn = JSON.stringify(obj);

    axios.post('https://crudcrud.com/api/c3f4898c7983409e803a1b3a377b5bd2/Orders',jsn, {
        headers:{
            'Content-Type':'application/json'
        }    
    })
    .then((response) => showUser(response.data))
    .catch((error) => console.log(error));

    document.getElementById('form').reset();
});

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/c3f4898c7983409e803a1b3a377b5bd2/Orders')
    .then((response) => {for(let i=0; i<response.data.length; i++){
        showUser(response.data[i]);
    }}
    )
    .catch((error) => console.log(error));
})
function showUser(user){
    const li = document.createElement('li');
    li.innerHTML=` ${user.price} - ${user.table} - ${user.dish}<button data-id="${user._id}"class="btn btn-light m-1 py-0 delete">Delete</button>`;
    if(user.table == "table-1"){
        t1.appendChild(li);
    }
    else if(user.table == "table-2"){
        t2.appendChild(li);
    }
    else if(user.table == "table-3"){
        t3.appendChild(li);
    }
}
let list = document.getElementById('list');
list.addEventListener('click', function(e){
    if(e.target.classList.contains('delete')){
        axios.delete(`https://crudcrud.com/api/c3f4898c7983409e803a1b3a377b5bd2/Orders/${e.target.getAttribute('data-id')}`)
        .then(() => console.log("Deleted"))
        .catch((error) => console.log(error));
        
        e.target.parentElement.remove();
    }
});