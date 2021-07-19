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
const nextButton = document.querySelector(".nextButton");
const backButton = document.querySelector(".backButton");

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

function buildSection(element, value, sect){
  if (sect === undefined) return element.innerHTML = value;
  element.innerHTML = `${sect} ${value}`;
};

function buildImageSection(element, value){
  element.src = value
};

function buildProfile(result){
  buildSection(nameEl, result.name);
  buildSection(speciesEl, result.species, "Species: ");
  buildSection(genderEl, result.gender, "Gender: ");
  buildSection(statusEl, result.status, "Status:");
  buildImageSection(imageEl, result.image);
  profile.style.display = "block";
};

function buildDidYouMean(results){
  const sectionTitle = document.createElement("h4");
  sectionTitle.innerText = "Did you mean?"
  sectionTitle.classList.add("dym-title")
  didYouMeanEl.innerHTML = ""
  didYouMeanEl.appendChild(sectionTitle)
  for (let i = 1; i < results.length; i++) {
    const item = document.createElement("li");
    item.innerHTML = `${results[i].name} - ${results[i].origin.name}`;
    item.addEventListener("click", (e) => {
      buildProfile(results[i])
    })
    didYouMeanEl.appendChild(item);
  }
};

let pageNumber = 1;

function loadCharacters(page) {
  fetch(`${charApiUrl}?page=${page}`)
    .then((responce) => {
      return responce.json();
    })
    .then(data => {
      console.log(data);
      buildCharList(charList, data.results)
    })
};

if(charList) {
  loadCharacters(pageNumber);
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

nextButton.addEventListener("click",() => {
  if(pageNumber < 34) {
    pageNumber++;
    loadCharacters(pageNumber);
  }
});

backButton.addEventListener("click",() => {
  if(pageNumber > 1) {
    pageNumber--;
    loadCharacters(pageNumber);
  }
});