const apiUrl = "https://rickandmortyapi.com/api/character/?name="
const characterId = document.querySelector(".characterId");
const submit = document.querySelector(".submitButton");
const nameEl = document.querySelector(".name");
const speciesEl = document.querySelector(".species");
const genderEl = document.querySelector(".gender");
const statusEl = document.querySelector(".status");
const responce = document.querySelector(".responce");
const profile = document.querySelector(".profile");
const imageEl = document.querySelector(".image");
const didYouMeanEl = document.querySelector(".didYouMean");
const charSelect = document.querySelector(".charSelect")
const charApiUrl = "https://rickandmortyapi.com/api/character";
const charList = document.querySelector(".charList");

if(submit) {
  submit.addEventListener("click",(e) => {
  
    console.log(characterId.value);
   
    e.preventDefault()
  
    fetch(`${apiUrl}${characterId.value}`)
      .then((responce) => {
        return responce.json();
      })
      .then(data => {
        console.log(data);
        buildProfile(data.results[0])
        buildDidYouMean(data.results)
      })
  
  });
}

function buildSection(element, value){
  element.innerHTML = value
};

function buildImageSection(element, value){
  element.src = value
};

function buildProfile(result){
  buildSection(nameEl, result.name);
  buildSection(speciesEl, result.species);
  buildSection(genderEl, result.gender);
  buildSection(statusEl, result.status);
  buildImageSection(imageEl, result.image);
  profile.style.display = "block";
};

function buildDidYouMean(results){
  didYouMeanEl.innerHTML = ""
  for (let i = 1; i < results.length; i++) {
    const item = document.createElement("li");
    item.innerHTML = `${results[i].name} - ${results[i].origin.name}`;
    item.addEventListener("click", (e) => {
      buildProfile(results[i])
    })
    didYouMeanEl.appendChild(item);
  }
};

function loadCharacters() {
  fetch(`${charApiUrl}`)
    .then((responce) => {
      return responce.json();
    })
    .then(data => {
      console.log(data);
      buildCharList(charList, data.results)
    })
};

if(charList) {
  loadCharacters();
};

function buildCharList(element, value){
  element.innerHTML = ""
  value.forEach(char => {
    const item = document.createElement("li");
    item.innerHTML = `${char.name}`
    element.appendChild(item);
    item.addEventListener("click", (e) => {
      buildProfile(char)
    })
  });
};