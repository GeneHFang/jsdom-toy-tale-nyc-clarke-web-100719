let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  const addToyFrm = document.querySelector("div.container form.add-toy-form")
  // debugger;
  addToyFrm.addEventListener("submit", (event)=>{
    // debugger;
    event.preventDefault();
    let form = event.target;
    addToyEle(form.name.value,form.image.value);  
    console.log("past toyele");
  })

  const toyCollectionList = document.querySelector("#toy-collection");

  let tURL = 'http://localhost:3000/toys';

  fetch(tURL)
    .then(resp => resp.json())
    .then(json => renderToys(json));

    // debugger;

// arrayOfToyObjects
  //forEach
  //return object.likes where object.id === dataset.toyID 


  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

function addToyEle(name, img){
  let toyConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
    })
  };
  // debugger;
fetch(tURL, toyConfig)
  .then(resp => resp.json())
  .then(json => appendToy(json));
  // debugger;
}

function appendToy(toy){
//   let toyHTML = ` <h2>${toy.name}</h2>
//   <img src="${toy.image}" class="toy-avatar"/>
//   <p><span>${toy.likes}</span> Likes</p>
//   <button class="like-btn">Like <3</button>
//  `;
//  let toyElement = document.createElement('div');
//   toyElement.className = "card";
//   // toyElement.dataset.toyID = toy.id;

//   toyElement.innerHTML = toyHTML;

  // toyCollectionList.appendChild(toyElement);
  makeToyCard(toy);
}

function makeToyCard(toy){
  let toyHTML = ` <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p><span>${toy.likes}</span> Likes</p>
    <button class="like-btn">Like <3</button>
   `;
   let toyElement = document.createElement('div');
    toyElement.className = "card";
    toyElement.dataset.toyID = toy.id;

    toyElement.innerHTML = toyHTML;

    toyCollectionList.appendChild(toyElement);
}

function renderToys(json){  
  json.forEach( function(toy){
    makeToyCard(toy);
    //  let toyHTML = ` <h2>${toy.name}</h2>
  //   <img src="${toy.image}" class="toy-avatar"/>
  //   <p><span>${toy.likes}</span> Likes</p>
  //   <button class="like-btn">Like <3</button>
  //  `;
  //   let toyElement = document.createElement('div');
  //   toyElement.className = "card";

  //   toyElement.innerHTML = toyHTML;

  //   toyCollectionList.appendChild(toyElement);

  });


}


document.addEventListener('click', (event)=>{
  if (event.target.className === "like-btn"){
    addLike(event.target.parentNode);
  }
})

function addLike(toy){
  let likeCount = parseInt(toy.querySelector("p span").innerText);
  let stURL = `${tURL}/${toy.dataset.toyID}`
  // debugger;
 
  

  let toyConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likeCount+1
    })
  };
  // debugger;
fetch(stURL, toyConfig)
  .then(resp => resp.json())
  .then(json => updateToyLikes(json));
  // debugger;
}

function updateToyLikes(toy){
  let toyCardLikes = document.querySelector(`div[data-toy-i-d="${toy.id}"] p span`);
  // debugger;
  toyCardLikes.innerText = toy.likes;
}


})
