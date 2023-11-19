import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { ChangeEvent, useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [link, setLink] = useState("");

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleCaptureClick = async () => {
    const pricingTableElmt = document.querySelector<HTMLElement>("#qrcode");
    if (!pricingTableElmt) return;

    const canvas = await html2canvas(pricingTableElmt);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <h1 className="flex text-white text-5xl mt-[20px] text-center">
        QR-CODE GENERATOR
      </h1>

      <div className="flex flex-col mt-[200px]  items-center justify-center bg-slate-200 w-[70%] py-[30px] rounded-md">
        <div className="flex flex-col w-[75%] ">
          <p className="text-black">Enter link</p>
          <input
            value={link}
            className="py-[20px] w-[100%] px-[20px] text-black rounded-lg"
            onChange={handleLinkChange}
          ></input>
          <div className="mt-[20px]">
            <div
              id="qrcode"
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 128,
                width: "100%",
              }}
            >
              <QRCode
                size={512}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={link}
                viewBox={`0 0 512 512`}
              />
            </div>
          </div>

          <button
            className="text-white p-[20px] bg-slate-900 mt-[20px] rounded-lg"
            onClick={handleCaptureClick}
          >
            Save
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 mb-3">
        <div className="text-center mx-[20px]">
          Made by Mohammed Abid Nafi and this project is open sourced and
          available in my{" "}
          <a
            href="https://github.com/MohammedAbidNafi"
            className="text-blue-400 cursor-pointer"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
