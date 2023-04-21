const inputElement = document.getElementById("input")
const infoElement = document.getElementById("info")
const meaningContainerElement = document.getElementById("meaning-container")
const titleElement = document.getElementById("title")
const meaningElement = document.getElementById("meaning")
const audioElement = document.getElementById("audio")

async function fetchApi (word){
  //    line 6 12 17 is used to display and undisplay the line 7
  infoElement.style.display = "block";

  // line 10 to undisplay meaning container
  meaningContainerElement.style.display = "none";

  infoElement.innerText = `Searching the meaning of "${word}"`;

  // line 10 to 16 is used to fetch api
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    console.log(result);

    //line 24-28 condition for word that are not found while searching 
    if(result.title){
        meaningContainerElement.style.display = "block";
        infoElement.style.display = "none";
        titleElement.innerText = word;
        meaningElement.innerText = "Sorry! Not Found."
        audioElement.style.display = "none";
    }else{
  infoElement.style.display = "none";

  //    to display meaning container
  meaningContainerElement.style.display = "block";

  audioElement.style.display = "inline-flex"

  //   display title and meaning  and audio
  titleElement.innerText = result[0].word;
  meaningElement.innerText = result[0].meanings[0].definitions[0].definition;
  audioElement.src = result[0].phonetics[0].audio;
}

    

  } catch (error) {
    console.log(error);
  }

}



inputElement.addEventListener("keyup", (e)=>{
    // console.log(e.target.value)

    if(e.target.value && e.key === "Enter"){
        fetchApi(e.target.value)
    }
})