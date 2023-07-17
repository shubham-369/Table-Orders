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

    async function postData(url, data){
        try{
            const response = await axios.post(url, data,{
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            showUser(response.data);
        }
        catch(error) {console.log(error)}
    }
    const url = 'https://crudcrud.com/api/591c8a25b53241ed906b598270d45ac4/Orders';
    postData(url,jsn);
    document.getElementById('form').reset();
});
window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('https://crudcrud.com/api/591c8a25b53241ed906b598270d45ac4/Orders');
      for (let i = 0; i < response.data.length; i++) {
        showUser(response.data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  });

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

list.addEventListener('click', async function(e) {
    if (e.target.classList.contains('delete')) {
      try {
        await axios.delete(`https://crudcrud.com/api/591c8a25b53241ed906b598270d45ac4/Orders/${e.target.getAttribute('data-id')}`);
        console.log("Deleted");
        e.target.parentElement.remove();
      } catch (error) {
        console.log(error);
      }
    }
  });

  