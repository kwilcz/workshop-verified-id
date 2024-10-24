import React from 'react';
import QRCode from 'qrcode.react';

const QrCode = ({ url }) => {
  return (
    <div className="qr-code">
      <QRCode value={url} size={256} />
    </div>
  );
};

export default QrCode;
