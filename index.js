

let extensionsData = [];

function loadExtensionsData(){
  const savedData = localStorage.getItem("extensionsData");

  if (savedData){
    return  Promise .resolve(JSON.parse(savedData));
  } else {
    fetch("./data.json")
      .then(response => response.json())
      .then(data => {
        extensionsData = data;
      })
      .catch(error =>{ console.error("Error fetching data" , error);
        return [];
      });
      
  }
}


function renderExtensions(list){
  const container = document.getElementById("extension-list")

  container.innerHTML = '';
  list.forEach(extension => {
    const item = createExtensionItem(extension);
    container.appendChild(item);
  });
}


function createExtensionItem(extension){
  const item = document.createElement("div");
  item.classList.add("grid-item");

  item.innerHTML = `
    <div class="content">
      <div class="content-image">
        <img src="${extension.logo}" alt="${extension.name}">
      </div>
      <div class="content-description">
        <h3>${extension.name}</h3>
        <p>${extension.description}</p>
      </div>
    </div>
    <div class="content_footer">
      <button class="remove_btn" type="button">Remove</button>
      <div class="custom-switch ${extension.active ? 'active' : ''}">
        <div class="slider"></div>
      </div>
    </div>
  `;

  addToggleEvent(item,extension);
  addRemoveEvent(item, extension);

  return item ;
}

function addToggleEvent(item, extension){
  const toggle = item.querySelector(".custom-switch");

  toggle.addEventListener("click" , () => {
    toggle.classList.toggle("active");
    extension.active = !extension.active;

    saveExtensionsData();
  });
}


function addRemoveEvent(item,extension){
  const RemoveBtn = item.querySelector(".remove_btn");
  RemoveBtn.addEventListener("click" , () => {
    extensionsData = extensionsData.filter(e => e!== extension);

    saveExtensionsData();
    renderExtensions(extensionsData);
  })
}

function saveExtensionsData(){
  localStorage.setItem("extensionsData" , JSON.stringify(extensionsData));
}

function setupFilters(){
  document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click" , () => {
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');


      const filter = button.dataset.filter;
      if(filter === "all"){
        renderExtensions(extensionsData);
      } else if (filter === "active"){
        renderExtensions(extensionsData.filter(item => item.active));
      }else if (filter === "inactive"){
        renderExtensions(extensionsData.filter(item => !item.active));
      }
    });
  });
}


function initializeApp(){
  loadExtensionsData().then(data => {
    extensionsData = data;
    renderExtensions(extensionsData);
    setupFilters();
  })
}

initializeApp();
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // Optional: swap icon
  const icon = themeToggle.querySelector("img");
  const isLight = document.body.classList.contains("light-theme");
  icon.src = isLight 
    ? "./assets/images/icon-moon.svg" 
    : "./assets/images/icon-sun.svg";
  icon.alt = isLight ? "dark mode" : "light mode";

  // Optional: persist theme
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Load persisted theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    const icon = document.querySelector(".theme-toggle img");
    icon.src = "./assets/images/icon-moon.svg";
    icon.alt = "dark mode";
  } else {
    icon.src = "./assets/images/icon-sun.svg";
    icon.alt = "light mode";
  }
});

/*let extensionsData = [];


// load JSON data

const savedData = localStorage.getItem("extensionsData");

if(savedData){
  extensionsData = JSON.parse(savedData);
  renderExtensions(extensionsData);


} else {
  fetch("./data.json")
  .then(response => response.json())
  .then( data => {
    extensionsData = data;
    renderExtensions(extensionsData);
  });

}
function renderExtensions(list){
  const container = document.getElementById("extension-list");

  container.innerHTML = '';

  list.forEach(extension => {
    const item = document.createElement("div");
    item.classList.add("grid-item")

    item.innerHTML = `
        <div class="content">
          <div class="content-image">
            <img src="${extension.logo}" alt="${extension.name}">
          </div>
          <div class="content-description">
            <h3>${extension.name}</h3>
            <p>${extension.description}</p>
          </div>
        </div>
        <div class="content_footer">
          <button class="remove_btn" type="button">Remove</button>
          <div class="custom-switch ${extension.active ? 'active' : ''}">
            <div class="slider"></div>
        </div>
    `;
    const toggle = item.querySelector(".custom-switch");

    toggle.addEventListener("click" , ()=>{
    toggle.classList.toggle("active");
    extension.active = !extension.active

     localStorage.setItem("extensionsData" , JSON.stringify(extensionsData));


    });

   
    container.appendChild(item);

    const RemoveBtn = item.querySelector(".remove_btn") ;

    RemoveBtn.addEventListener("click" , ()=> {
      extensionsData = extensionsData.filter(e => e !== extension);

     localStorage.setItem("extensionsData", JSON.stringify(extensionsData));

      renderExtensions(extensionsData);
    });
    
  });
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener("click" , () => {

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    const filter = button.dataset.filter;
    if(filter === 'all'){
      renderExtensions(extensionsData);
    } else if (filter === 'active') {
      renderExtensions(extensionsData.filter(item => item.active));
    } else if ( filter === 'inactive') {
      renderExtensions(extensionsData.filter(item => !item.active));
    }
  })
});




*/