import "/src/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrum } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Container() {
  const drumPad = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
  const DrumId = [
    [
      "Heater 1",
      "Heater 2",
      "Heater 3",
      "Heater 4",
      "Clap",
      "Open-HH",
      "Kick-n'-Hat",
      "Kick",
      "Closed-HH",
    ],
    [
      "Chord 1",
      "Chord 2",
      "Chord 3",
      "Shaker",
      "Open HH",
      "Closed HH",
      "Punchy Kick",
      "Side Stick",
      "Snare",
    ],
  ];
  const DrumSoundSrc = [
    [
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    ],
    [
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    ],
  ];
  //get power switch
  const [bankSwitchState, setbankSwitchState] = useState(0);
  const [powerSwitchState, setpowerSwitchState] = useState(true);

  //FUNCTION TO HANDLE POWER SWITCH
  function PowerSwitcher() {
    if (powerSwitchState) {
      setpowerSwitchState(false);
    } else {
      setpowerSwitchState(true);
    }
    CheckPower();
  }
  //FUNCTION TO HANDLE BANK SWITCH
  function BankSwitcher() {
    const display = document.getElementById("display");
    if (bankSwitchState == 0) {
      setbankSwitchState(1);
      display.textContent = "Smooth Piano Kit";
    } else {
      setbankSwitchState(0);
      display.textContent = "Heater Kit";
    }
  }
  //FUNCTION TO GET THE SOUND OF BUTTONS
  function GetSound(index) {
    const volumeRanger = document.getElementById("volumeRanger");
    let sound = new Audio(DrumSoundSrc[bankSwitchState][index]);
    sound.volume = volumeRanger.value / 100;
    display.textContent = DrumId[bankSwitchState][index];
    sound.play();
  }
  //FUNCTION TO SET VOLUME
  function ShowVolume() {
    display.textContent = "volume :" + volumeRanger.value;
    setTimeout(() => {
      if (display.textContent == "volume :" + volumeRanger.value)
        display.textContent = "";
    }, 1500);
  }
  //FUNCTION TO CHECK THE POWER
  function CheckPower() {
    const OnOff = document.querySelectorAll(".OnOff");
    const display = document.getElementById("display");
    if (powerSwitchState) {
      display.textContent = "";
      OnOff.forEach((elem) => elem.setAttribute("disabled", "true"));
    } else {
      OnOff.forEach((elem) => elem.removeAttribute("disabled"));
    }
  }

  //handle the click even for buttons
  useEffect(() => {
    drumPad.forEach((element) => {
      //EVENT TO HANDLE PRESS BUTTON TO MAKE SOUND AND SHOW THE BUTTON GET CLICKED
      document.addEventListener("keydown", function (event) {
        if (event.key == element) {
          let btn = document.getElementById(
            DrumId[bankSwitchState][drumPad.indexOf(event.key)]
          );
          btn.classList.add("active");
          btn.click();
        }
      });
      // REMOVE THE EFFECT OF CLICK AFRED KEYUP
      document.addEventListener("keyup", function (event) {
        if (event.key == element) {
          let btn = document.getElementById(
            DrumId[bankSwitchState][drumPad.indexOf(event.key)]
          );
          btn.classList.remove("active");
        }
      });
    });
  }, []);

  return (
    <div id="drum-machine" className="row container">
      <div id="logoDiv">
        <div id="logoText" className="txtFont">
          HDF
        </div>
        <FontAwesomeIcon icon={faDrum} size="2xl" id="logoDrum" />
      </div>
      <div className="col-md-5 col-sm-5 innerContainer">
        <div className="row row-cols-4 gap-2 d-flex justify-content-center">
          {drumPad.map((item, index) => (
            <button
              id={DrumId[0][index]}
              className="drum-pad OnOff"
              type="button"
              key={item}
              onClick={() => GetSound(index)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div id="drumControl" className="col">
        <div id="displayDiv">
          <p id="powerLabel" className="txtFont">
            POWER
          </p>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              defaultChecked="true"
              onChange={() => PowerSwitcher()}
              id="powerSwitch"
            ></input>
          </div>
          <p id="display" className="txtFont  OnOff"></p>
          <input
            type="range"
            class="form-range  OnOff"
            min="0"
            max="100"
            onChange={() => ShowVolume()}
            id="volumeRanger"
          />
          <p id="bankLabel" className="txtFont">
            BANK
          </p>
          <div class="form-check form-switch">
            <input
              class="form-check-input  OnOff"
              type="checkbox"
              role="switch"
              id="bankSwitch"
              onChange={() => BankSwitcher()}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Container;
