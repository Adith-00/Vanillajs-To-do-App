const user_input = document.getElementById("input");
const data =document.getElementById("output")
const edit_btn = document.getElementById("save");
const complete_btn = document.getElementById("complete");
const pending_btn = document.getElementById("pending");
const all_btn = document.getElementById("all");
const add_btn = document.getElementById("add");
const finish =document.getElementById("finish");
const pend =document.getElementById("in-complete");
let stat="";
let task=[];
//Adding to array//
function add_task(){
    task.push( user_input.value);
    let ind= task.length-1;
    console.log('====>>',ind );
     data.innerHTML +=  `
     <div class="${ind}">
        <p>${user_input.value}</p>
        <button class= " btn btn-sm btn-success" id="complete" onclick="finish_task(${ind},this)">Completed</button> 
        <button class= " btn btn-sm btn-warning" id="edit" onclick="edit_task(${ind},this)">Edit</button>
        <button class= " btn btn-sm btn-danger" id="dlt" onclick="del(${ind},this)">Delete</button> 
        <button class= " btn btn-sm btn-primary hide " id="undo_btn" onclick="undo(${ind},this)">Undo</button> 
     </div> ` 
  
    user_input.value = '';
    console.log('jss====>>>',task);
}
//deleting task///
function del(ind,button){
    const prnt = button.parentElement;
    const inputval= prnt.querySelector('p')
    const valuess= inputval.textContent;
    const indexs=task.indexOf(valuess)
    task.splice(indexs,1);
    const divelement = button.parentElement;
    divelement.remove();
    position();
    
}
///editing //
function edit_task(ind,button){
    const prnt = button.parentElement;
    const inputval= prnt.querySelector('p')
    const valuess= inputval.textContent;
    const indexs=task.indexOf(valuess)
    console.log(valuess)
    user_input.value=task[ind];
    edit_btn.style.display="block";
    add_btn.style.display="none";
    pending_btn.style.display="none";
    complete_btn.style.display="none";
    all_btn.style.display="none";
     edit_btn.onclick = function edited(){
        if(user_input.value!=task[ind]){
          task[ind]= user_input.value;
         const updates=   `
         <div class="${ind}">
            <p>${user_input.value}</p>
            <button class= " btn btn-sm btn-success" id="complete" onclick="finish_task(${ind},this)">Completed</button> 
            <button class= " btn btn-sm btn-warning" id="edit" onclick="edit_task(${ind},this)">Edit</button>
            <button class= " btn btn-sm btn-danger" id="dlt" onclick="del(${ind},this)">Delete</button> 
            <button class= " btn btn-sm btn-primary hide " id="undo_btn" onclick="undo(${ind},this)">Undo</button> 
         </div> ` 
         const updtdiv=button.parentElement;
         updtdiv.innerHTML = updates;
      console.log('jss====>>>',task);
        }else{
          alert ("no change detected!");
        }
        user_input.value = '';
        edit_btn.style.display="none"
        add_btn.style.display="block";
        pending_btn.style.display="block";
        complete_btn.style.display="block";
        all_btn.style.display="block";
   }; 
   position()
}

// completing //
function finish_task(ind,button){
    const Item = button.parentElement;
    Item.querySelector('#complete').classList.add('completed');
    Item.querySelector('#undo_btn').classList.remove('hide');
    position()
}
//undo//
function undo(ind,button){
    const Item1 = button.parentElement;
    Item1.querySelector('#complete').classList.remove('completed');
    Item1.querySelector('#undo_btn').classList.add('hide');
    position()
    
}
//completed function//
function complete_task(vals){
    vals="complt";
    stat=vals
    console.log("stat=====>>",stat)
    const complete_items = data.getElementsByTagName('div');
        for (let i = 0; i < task.length; i++) {
            const Items = complete_items[i];
            const btns = Items.querySelector('#complete');
            if (btns.classList.contains('completed')) {
            Items.style.display = 'block';
            } else {
            Items.style.display = 'none';
            }
           
        }
   
}
// filter pending task //
function pending_task(){
  
    stat="pend"
    const complete_items = data.getElementsByTagName('div');
    for (let i = 0; i < task.length; i++) {
        const Items = complete_items[i];
        const btns = Items.querySelector('#complete');
        if (btns.classList.contains('completed')) {
        Items.style.display = 'none';
        } else {
        Items.style.display = 'block';
        }
    }
    
    console.log("stat=====>>",stat);
   
}

//all task//
function all_task(){
    
    stat="all"
    console.log("stat=====>>",stat)
    const complete_items = data.getElementsByTagName('div');
    for (let i = 0; i < task.length; i++) {
        const Items = complete_items[i];
        console.log('Items====>>>',Items);
        Items.style.display="block"
    }
}

function position(){
    switch (stat) {
        case "pend":
            pending_task();
            break;
        case "complt":
            complete_task();
            break;
        case "all":
            all_task();
            break;
        default:
            console.log("stat not found");
    }
}
console.log("stat=====>>",stat)
