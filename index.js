//alert("Hello walker")
let extensionsData = [];


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




