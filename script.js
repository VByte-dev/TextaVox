let character;
let chrB;
// Default Character
document.querySelector(".chr1").style.backgroundColor = '#fbca1f';
document.querySelector(".chr1").addEventListener("click", () => {
  character = "";
  character = "Dan";

  document.querySelector(".chr1").style.backgroundColor = '#fbca1f';
  document.querySelector(".chr2").style.backgroundColor = 'white';
  document.querySelector(".chr3").style.backgroundColor = 'white';
  document.querySelector(".chr4").style.backgroundColor = 'white';
  // console.log("Dan is selected");
});
document.querySelector(".chr2").addEventListener("click", () => {
  character = "";
  character = "Will";

  document.querySelector(".chr1").style.backgroundColor = 'white';
  document.querySelector(".chr2").style.backgroundColor = '#fbca1f';
  document.querySelector(".chr3").style.backgroundColor = 'white';
  document.querySelector(".chr4").style.backgroundColor = 'white';
  // console.log("Will is selected");
});
document.querySelector(".chr3").addEventListener("click", () => {
  character = "";
  character = "Scarlett";

  document.querySelector(".chr1").style.backgroundColor = 'white';
  document.querySelector(".chr2").style.backgroundColor = 'white';
  document.querySelector(".chr3").style.backgroundColor = '#fbca1f';
  document.querySelector(".chr4").style.backgroundColor = 'white';
  // console.log("Scarlett is selected");
});
document.querySelector(".chr4").addEventListener("click", () => {
  character = "";
  character = "Liv";

  document.querySelector(".chr1").style.backgroundColor = 'white';
  document.querySelector(".chr2").style.backgroundColor = 'white';
  document.querySelector(".chr3").style.backgroundColor = 'white';
  document.querySelector(".chr4").style.backgroundColor = '#fbca1f';
  // console.log("Liv is selected");
});

document.querySelector("#generateB").addEventListener("click", () => {
  document.querySelector('.loading').style.display = "flex";
  setTimeout(()=>{
    document.querySelector('.loading').style.display = "none";
  }, 3000)
  let speed = document.querySelector("#speedB").value;
  // console.log(`Speed is ${speed}`);
  let pitch = document.querySelector("#pitchB").value;
  // console.log(`Pitch is ${pitch}`);
  let textContent = document.querySelector("#textContent").value;

  const ttos = async () => {
    // Correcting the Character
    if (character === undefined) {
      character = "Dan";
    }
    // Correcting the Speed
    if (speed === "") {
      speed = 0;
    } else if (speed < -1.0) {
      document.querySelector("#speedB").value = 0;
      speed = 0;
    } else if (speed > 1.0) {
      document.querySelector("#speedB").value = 0;
      speed = 0;
    }
    // Correcting the Pitch
    if (pitch === "") {
      pitch = 1;
    } else if (pitch < 0) {
      document.querySelector("#pitchB").value = 1;
      pitch = 1;
    } else if (pitch > 1.5) {
      document.querySelector("#pitchB").value = 1;
      pitch = 1;
    }
    // Correcting the Text content
    // console.log(textContent);
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer gKCKisndVjP0mWjxQInOITOql5pZfZGJ61Mz7hzB5SgiiDiK37NyqK",
      },
      body: JSON.stringify({
        Text: textContent,
        VoiceId: character,
        Bitrate: "192k",
        Speed: Number(speed),
        Pitch: Number(pitch),
        TimestampType: "sentence",
      }),
    };
    try {
      const fData = await fetch(
        "https://api.v7.unrealspeech.com/speech",
        options
      );
      const jData = await fData.json();
      // console.log(jData);
      let audioFile = jData.OutputUri;
      // console.log(audioFile);
      document.querySelector("#audio").src = audioFile;
      document.querySelector("#audioD").href = audioFile;
    } catch {
      const next = confirm(`Something didn't work as expected`);
      location.reload();
    }
  };
  ttos();
});

document.querySelector('#playB').addEventListener('click', ()=>{
  document.querySelector("audio").play();
})
document.querySelector('#pauseB').addEventListener('click', ()=>{
  document.querySelector("audio").pause();
})
document.querySelector('#downloadB').addEventListener('click', ()=>{
  document.querySelector("#audioD").download = 'TextaVox.mp3';
})