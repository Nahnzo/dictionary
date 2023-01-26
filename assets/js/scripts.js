const resultsWord = document.querySelector(".results-word");
const resultDefinition = document.querySelector(".results-item__definition");
const speechPart = document.querySelector(".results-item__part");
const btnSearch = document.querySelector(".search");
const example = document.querySelector(".results-item__example");
const results = document.querySelector(".results");
const sound = document.querySelector(".results-sound");
let audio = new Audio();
const getApi = async () => {
  const textInput = document.getElementById("word-input");

  try {
    const data = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${textInput.value}`
    );
    results.style.display = "block";
    const response = await data.json();
    resultsWord.innerHTML = response[0].word;
    resultDefinition.innerHTML =
      response[0].meanings[0].definitions[0].definition;
    speechPart.innerHTML = response[0].meanings[0].partOfSpeech;
    example.innerHTML = response[0].meanings[0].definitions[0].example;

    checkSpeech(response);
    setTimeout(() => {
      textInput.value = "";
    }, 0.1);
  } catch (error) {
    if (textInput.value === "") {
      resultsWord.innerHTML = "Please type something";
      sound.style.display = "none";
    } else {
      resultsWord.innerHTML = `Word '${textInput.value}' is not defined`;
      sound.style.display = "none";
      resultDefinition.innerHTML = "NOT DEFINED";
      speechPart.innerHTML = "";
    }
  }
};

btnSearch.addEventListener("click", (event) => {
  getApi();
  event.preventDefault();
});

const checkSpeech = (event) => {
  sound.style.display = event[0].phonetics[0].audio ? "block" : "none";
  sound.addEventListener("click", () => {
    audio.src = event[0].phonetics[0].audio ? event[0].phonetics[0].audio : "";
    audio.autoplay = true;
  });
};
