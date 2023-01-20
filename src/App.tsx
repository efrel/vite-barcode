import {
    DecodeHintType,
    BarcodeFormat,
    BrowserMultiFormatReader,
} from "@zxing/library/esm";
import { useEffect, useRef, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import QrCodeParser from "./QrCodeParser";

interface ISourceOption {
    text: string;
    value: string;
}
const App = () => {
    const videoRef = useRef(null);

    const [videoInputDevices, setVideoInputDevices] = useState<
        MediaDeviceInfo[]
    >([]);
    const [showSelectPanel, setShowSelectPanel] = useState<boolean>(false);
    const [sourceSelect, setSourceSelect] = useState<boolean>(false);
    const [sourceOption, setSourceOption] = useState<ISourceOption[]>([]);
    const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
    const [resultCode, setResultCode] = useState<string>("");

    const hints = new Map();
    const formats = [
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.EAN_8,
        BarcodeFormat.EAN_13,
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    const codeReader = new BrowserMultiFormatReader(hints);

    useEffect(() => {
        const funtVideo = async () => {
            const videoInputDeviceList =
                await codeReader.listVideoInputDevices();
            setVideoInputDevices(videoInputDeviceList);

            console.log("====================================");
            console.log(await codeReader.listVideoInputDevices());
            console.log("====================================");

            if (
                videoInputDeviceList.length > 0 &&
                selectedVideoDevice == null
            ) {
                setSelectedVideoDevice(videoInputDeviceList[0].deviceId);
            }

            // if (videoInputDeviceList.length > 1) {
            //     videoInputDeviceList.forEach((element) => {
            //         const opt: ISourceOption = {
            //             text: element.label,
            //             value: element.deviceId,
            //         };
            //         setSourceOption([...sourceOption, opt]);
            //     });

            //     setShowSelectPanel(true);
            // }
        };

        funtVideo();
    }, [selectedVideoDevice]);

    const scannerBarCode = () => {
        codeReader
            .decodeOnceFromVideoDevice(selectedVideoDevice, "video")
            .then((res) => {
                console.log("result", res);
                setResultCode(res.toString());
            })
            .catch((err) => console.log("error", err));
    };

    return (
        <div className="container mx-auto px-4 my-10">
            <header className="flex justify-center py-5">
                <h1>Escanear código de barras</h1>
            </header>
            <section className="space-y-4">
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-indigo-500 text-white rounded-md px-2 py-1"
                        type="button"
                        onClick={scannerBarCode}
                    >
                        Escanear
                    </button>
                    <button
                        className="bg-pink-500 text-white rounded-md px-2 py-1"
                        type="button"
                    >
                        Borrar
                    </button>
                </div>

                <div>
                    <video
                        className="border border-solid border-gray-500"
                        id="video"
                        width="300"
                        height="200"
                        ref={videoRef}
                    />
                </div>

                {/* <div
                    id="sourceSelectPanel"
                    className={showSelectPanel ? "flex" : "hidden"}
                >
                    <Select
                        label="Change video source:"
                        className="flex max-w-sm min-w-[4rem]"
                    >
                        {sourceOption.map((opt) => {
                            return (
                                <Option key={opt.value} value={opt.value}>
                                    {opt.text}
                                </Option>
                            );
                        })}
                    </Select>
                </div> */}

                <label>Result:</label>
                <pre>
                    <code>{resultCode}</code>
                </pre>
            </section>
        </div>
    );
};

export default App;
