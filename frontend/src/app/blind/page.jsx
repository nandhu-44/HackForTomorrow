"use client";
import { useEffect } from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Mic, FileSearch, FileText, Image } from "lucide-react";
import { useRouter } from "next/navigation";

const BlindPage = () => {
    const router = useRouter();

    const getFemaleVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        return voices.find((voice) =>
            voice.name.includes("Google UK English Female") ||
            voice.name.includes("Microsoft Zira") ||
            voice.name.includes("female") ||
            voice.name.includes("Female")
        ) || voices[0];
    };

    useEffect(() => {
        speakText(
            "Welcome to the Visual Assistance Tools. Hover over the options to hear their descriptions.",
        );
    }, []);

    const speakText = (text) => {
        try {
            const synthesis = window.speechSynthesis;
            synthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (synthesis.getVoices().length === 0) {
                synthesis.addEventListener("voiceschanged", () => {
                    utterance.voice = getFemaleVoice();
                    utterance.rate = 0.8;
                    utterance.pitch = 1.5;
                    utterance.volume = 1.0;
                    synthesis.speak(utterance);
                }, { once: true });
            } else {
                utterance.voice = getFemaleVoice();
                utterance.rate = 0.8;
                utterance.pitch = 1.5;
                utterance.volume = 1.0;
                synthesis.speak(utterance);
            }
        } catch (error) {
            console.error("Speech error:", error);
        }
    };

    const handleHover = (title, description) => {
        speakText(`${title}. ${description}`);
    };

    const features = [
        {
            title: "Topic Selection",
            description:
                "Select a topic to get detailed information using voice commands",
            icon: <Mic className="w-24 h-24 text-white" />,
            path: "/blind/topic-selection",
            bgColor: "bg-[#0A5EB0] hover:bg-[#0A5EB0]/90",
        },
        {
            title: "Image Recognition",
            description: "Upload and analyze images for detailed descriptions",
            icon: <Image className="w-24 h-24 text-white" />,
            path: "/blind/display",
            bgColor: "bg-[#4B4376] hover:bg-[#4B4376]/90",
        },
        {
            title: "Note Making",
            description: "Create and manage voice notes with AI assistance",
            icon: <FileText className="w-24 h-24 text-white" />,
            path: "/blind/notes",
            bgColor: "bg-[#c44601] hover:bg-[#c44601]/90",
        },
        {
            title: "Document Summarizer",
            description:
                "Convert and summarize documents into accessible formats",
            icon: <FileSearch className="w-24 h-24 text-white" />,
            path: "/blind/docs",
            bgColor: "bg-[#5ba300] hover:bg-[#5ba300]/90",
        },
    ];

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 p-0 h-full group">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className={`w-full h-full cursor-pointer transition-all duration-500 
              ${feature.bgColor}
              rounded-none border-0 shadow-2xl
              group-hover:opacity-[0.35] hover:!opacity-100`}
                        onClick={() => router.push(feature.path)}
                        onMouseEnter={() =>
                            handleHover(feature.title, feature.description)}
                        onFocus={() =>
                            handleHover(feature.title, feature.description)}
                    >
                        <CardHeader className="items-center justify-center h-full text-center space-y-8 p-8">
                            {feature.icon}
                            <CardTitle className="text-6xl font-bold text-white">
                                {feature.title}
                            </CardTitle>
                            <CardDescription className="text-3xl font-medium text-white/90 sr-only">
                                {feature.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BlindPage;
