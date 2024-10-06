import React, { useState } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './Qrcode.scss';

const Qrcode = () => {
  const [url, setUrl] = useState('');
  const [count, setCount] = useState(1);
  const [qrCodes, setQrCodes] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const generateQRCodes = () => {
    const newQrCodes = [];
    for (let i = 1; i <= count; i++) {
      const qrUrl = `https://${url}?number=${i}`;
      QRCode.toDataURL(qrUrl)
        .then((dataUrl) => {
          newQrCodes.push({ src: dataUrl, label: `QR Code ${i}` });
          if (newQrCodes.length === count) {
            setQrCodes(newQrCodes);
            setIsDownloading(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleGenerateClick = () => {
    if (url && count > 0) {
      setIsDownloading(true);
      generateQRCodes();
    } else {
      alert('Please enter a valid URL and number.');
    }
  };

  const handleDownloadAll = () => {
    const zip = new JSZip();
    const folder = zip.folder("QRCodes");

    Promise.all(qrCodes.map((qrCode, index) => 
      fetch(qrCode.src)
        .then(res => res.blob())
        .then(blob => folder.file(`QRCode_${index + 1}.png`, blob))
    )).then(() => {
      zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, "QRCodes.zip");
      });
    });
  };

  return (
    <div className="qr-container">
    <div className="qr-sub">
      <h1>QR Code Generator</h1>
      <label htmlFor="urlInput">Enter URL:</label>
      <input
        type="text"
        id="urlInput"
        className='form-control w-50'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="example.com"
      />
      <label htmlFor="qrCount">Number of QR Codes:</label>
      <input
        type="number"
        id="qrCount"
        className='form-control w-50'
        min="1"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={handleGenerateClick} disabled={isDownloading}>
        Generate QR Codes
      </button>
      <div className="qr-dashboard">
        {qrCodes.map((qrCode, index) => (
          <div className="qr-item" key={index}>
            <img src={qrCode.src} alt={qrCode.label} />
            <p>{qrCode.label}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleDownloadAll}
        disabled={qrCodes.length === 0}
      >
        Download All QR Codes
      </button>
    </div>
    </div>
  );
};

export default Qrcode;
