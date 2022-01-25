import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AudioRecorder from "./AudioRecorder";
import "./UserDataForm.css";

interface I_UserData {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function UserDataForm() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<number>(0);
  const [passValue, setPassValue] = useState<string>("");
  const [confirmPassValue, setConfirmPassValue] = useState<string>("");
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean | null>(false);

  const onEmailChange = (e: any) => setEmailValue(e.target.value);
  const onNameChange = (e: any) => setNameValue(e.target.value);
  const onPhoneChange = (e: any) => setPhoneValue(e.target.value);
  const onPassChange = (e: any) => setPassValue(e.target.value);
  const onConfirmPassChange = (e: any) => setConfirmPassValue(e.target.value);

  const handleTnc = () => {
    const allDataValid =
      !!nameValue.length &&
      !termsChecked &&
      passValue === confirmPassValue &&
      !!passValue.length &&
      validateEmail(emailValue) &&
      phoneValue.toString().length < 11;
    setTermsChecked(!termsChecked);
    setEnableSubmit(allDataValid);
  };

  const handleSubmit = () => {
    console.log(emailValue, nameValue, phoneValue, passValue, audioURL);
    const formData = {
      name: nameValue,
      email: emailValue,
      pass: passValue,
      phoneNo: phoneValue,
      audioRecord: audioURL,
    };
    fetch("api/SampleData", {
      body: formData,
      method: "post",
    });
  };
  const [audioURL, isRecording, startRecording, stopRecording] =
    AudioRecorder();
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <div className="main-form">
      <Paper className="form-data">
        <h2>User Data</h2>
        <TextField
          onChange={onEmailChange}
          error={!validateEmail(emailValue)}
          value={emailValue}
          label={"Email"}
          className="input-data"
          helperText={!validateEmail(emailValue) ? "Enter a valid email" : ""}
        />
        <TextField
          onChange={onNameChange}
          value={nameValue}
          label={"Name"}
          className="input-data"
        />
        <TextField
          onChange={onPhoneChange}
          error={phoneValue.toString().length > 10}
          value={phoneValue}
          label={"Phone Number"}
          type="number"
          className="input-data"
          helperText={
            phoneValue.toString().length > 10
              ? "Phone No should be less than 10 digits"
              : ""
          }
        />
        <TextField
          onChange={onPassChange}
          value={passValue}
          label={"Password"}
          type="password"
          className="input-data"
        />
        <TextField
          onChange={onConfirmPassChange}
          error={confirmPassValue !== passValue}
          value={confirmPassValue}
          label={"Confirm Password"}
          type="password"
          className="input-data"
          helperText={
            confirmPassValue !== passValue
              ? "Password and confirm password does'nt match"
              : ""
          }
        />
        <div className="audio-record">
          <span style={{ margin: "8px" }}>Record Data </span>
          <audio src={String(audioURL)} controls />
          <div className="recorder">
            <Button
              onClick={() => startRecording()}
              disabled={isRecording}
              variant="outlined"
            >
              Start
            </Button>
            <Button
              onClick={() => stopRecording()}
              disabled={!isRecording}
              variant="outlined"
            >
              Stop
            </Button>
          </div>
        </div>
        <FormControlLabel
          control={<Checkbox checked={termsChecked} onChange={handleTnc} />}
          label={
            <p>
              Agree <a href="url">TnC</a>
            </p>
          }
        />
        <div>
          <Button
            style={{ margin: "8px" }}
            variant="contained"
            disabled={!enableSubmit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
}
