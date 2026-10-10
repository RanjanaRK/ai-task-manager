import { useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type VoiceInputProps = {
  onTranscript: (text: string) => void;
  disabled?: boolean;
};

const VoiceInput = ({ onTranscript, disabled = false }: VoiceInputProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      onTranscript(transcript.trim());
      resetTranscript();
    }
  }, [listening, transcript, onTranscript, resetTranscript]);

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome or Edge.",
      );
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      return;
    }

    resetTranscript();

    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  return (
    <button
      type="button"
      onClick={handleVoiceInput}
      disabled={disabled}
      title={listening ? "Stop listening" : "Voice input"}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl hover:scale-125 duration-500 transition ${
        listening
          ? "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400"
          : "hover:bg-muted"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};

export default VoiceInput;
