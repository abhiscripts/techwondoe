import { useEffect, useState } from "react";

const AudioRecorder = () => {
  const [audioURL, setAudioURL] = useState<Blob>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<any>(null);
  //const [blobData, setBlobData] = useState("");
  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }
    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e: any) => {
      //var reader = new FileReader();
      // reader.onload = function () {
      //   console.log(reader.result);
      // };
      // e.data && reader.readAsText(e.data);
      console.log(e);
      //e.data.text().then((text) => setBlobData(text));
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    console.log("here")
    setIsRecording(true);
  };
  console.log("url", audioURL);
  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default AudioRecorder;
