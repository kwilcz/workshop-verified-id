import React, { useState } from 'react';
import { Button, Input, Container, Row, Col, Alert } from 'shadcn-ui';
import QrCode from '../../components/QrCode';

const IssueDemoFaceCheck = () => {
  const [photo, setPhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result.replace('data:image/jpeg;base64,', ''));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const request = {
      photo,
      firstName,
      lastName,
      dateOfBirth,
      address,
    };

    try {
      const response = await fetch('/api/issuance/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.error_description) {
        setMessage(data.error_description);
      } else {
        setQrCodeUrl(data.url);
        setPin(data.pin);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>EXPERIMENTAL - Be sure that you want to use it!</h1>
          <img id="vc-logo" style={{ maxWidth: '300px' }} alt="VC Logo" />
          <div className="issue-factorlabs-verified-employee factorlabs-pink">
            <h2>
              Hey! This is a DEMO page to issue the Verified ID Card with picture. Picture should be JPG, smaller than
              200x200 pixels and smaller than 200kb!!!
            </h2>
          </div>
          <div className="issue-factorlabs-card">
            Hey! This is the process to register new Factorlabs Portal Card. For MVP you need to provide the card
            number. Fill free to set you individual value.
          </div>
          {message && (
            <Alert variant="danger">
              <i className="fas fa-user-check green icon-text-large margin-bottom-25"></i>
              {message}
            </Alert>
          )}
          <div className="entry" id="selfAssertedClaims" style={{ display: 'none' }}></div>
          <Input type="file" onChange={handleFileChange} />
          <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <Input type="text" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Row>
            <Col>
              <Button onClick={handleSubmit}>Issue With Photo</Button>
            </Col>
            <Col>
              <Button href="/">Back</Button>
            </Col>
          </Row>
          {qrCodeUrl && (
            <>
              <div id="qr-text" style={{ display: 'none', fontSize: '18px' }}>
                <p>Please scan QR Code to present your Verified ID.</p>
              </div>
              <QrCode url={qrCodeUrl} />
              {pin && <div id="pin-code-text">Pin code: {pin}</div>}
            </>
          )}
          <div className="row justify-content-center content-mobile factorlabs-yellow">
            <div className="col-12">
              <p>You use mobile application. Please click button to issue your Verified Employee Credential via Authenticator App</p>
              <p>You need to redirect back manually from the Authenticator app to the browser</p>
            </div>
          </div>
          <div className="row justify-content-center content-mobile" style={{ padding: '25px' }}>
            <Button id="open-authenticator-app" href={qrCodeUrl} role="button">Issue your Verified Employee Credential via Authenticator App</Button>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 text-center factorlabs-green">
              <p>
                This is only DEMO - if doesn't work please let me know: via LinkedIn: <a href="https://www.linkedin.com/in/mjendza/">MJendza</a>
              </p>
            </div>
            <div className="col-md-3"></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default IssueDemoFaceCheck;
