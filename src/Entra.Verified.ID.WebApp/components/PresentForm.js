import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Alert } from 'shadcn-ui';
import QrCode from './QrCode';

const PresentForm = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [message, setMessage] = useState('');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchPresentationRequest = async () => {
      try {
        const response = await fetch('/api/presentation/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ faceCheckEnabled: true }),
        });

        const data = await response.json();
        if (data.error_description) {
          setMessage(data.error_description);
        } else {
          setQrCodeUrl(data.url);
          checkStatus(data.id);
        }
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchPresentationRequest();
  }, []);

  const checkStatus = async (id) => {
    try {
      const response = await fetch(`/api/presentation/status?id=${id}`);
      const data = await response.json();

      if (data.status === 2) {
        const summaryResponse = await fetch('/api/presentation/response-html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const summaryData = await summaryResponse.json();
        setSummary(summaryData);
      } else if (data.status === 99) {
        setMessage('Presentation failed');
      } else {
        setTimeout(() => checkStatus(id), 3000);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Present Verified ID</h1>
          {message && (
            <Alert variant="danger">
              <i className="fas fa-user-check green icon-text-large margin-bottom-25"></i>
              {message}
            </Alert>
          )}
          {qrCodeUrl && (
            <>
              <div id="qr-text" style={{ fontSize: '18px' }}>
                <p>Please scan QR Code to present your Verified ID.</p>
              </div>
              <QrCode url={qrCodeUrl} />
            </>
          )}
          {summary && (
            <div className="summary-content">
              <div className="row">
                <div className="col-12 text-center factorlabs-green" style={{ fontSize: '52px', margin: '15px' }}>
                  <p>Good work! I'm happy to see the person from</p>
                  <p id="vc-iss-name">{summary.vcIss}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center factorlabs-yellow" style={{ fontSize: '42px', margin: '15px' }}>
                  <p>We want to give you a 25% discount on the shopping based on your cooperation.</p>
                  <p>Here is your discount code: VerifiedId</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center factorlabs-green" style={{ fontSize: '36px' }}>
                  Also, this is a demo page, so you can check what is inside your credential:
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-right table-title">Claim</div>
                <div className="col-4 table-title">Value</div>
              </div>
              <div className="row">
                <div className="col-3 text-right first-color">Credential Type</div>
                <div className="col-4 text-left first-color">{summary.vcType}</div>
              </div>
              <div className="row">
                <div className="col-3 text-right next-color">Issuer</div>
                <div className="col-8 text-truncate text-left next-color">{summary.vcIss}</div>
              </div>
              <div className="row">
                <div className="col-3 text-right first-color">Issuer Link</div>
                <div className="col-8 text-left first-color">
                  <a href="https://verifiedid.did.msidentity.com/v1.0/tenants/6790fadf-9751-4f73-8f65-844675b9a22a/verifiableCredentials/contracts/f68164e0-f53d-686d-2d9c-cd147fa0f341/manifest">Link</a>
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-right next-color">Subject (wallet owner)</div>
                <div className="col-8 text-truncate text-left next-color">{summary.vcSub}</div>
              </div>
              <div className="row">
                <div className="col-3 text-right first-color">Subject ION Link</div>
                <div className="col-4 text-left first-color">
                  <a href={`https://identity.foundation/ion/explorer/?did=${summary.vcSub}`}>Link</a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right next-color">Display Name</div>
                <div className="col-md-4 text-left next-color">{summary.displayName}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right first-color">First name</div>
                <div className="col-md-4 text-left first-color">{summary.firstName}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right next-color">Last name</div>
                <div className="col-md-4 text-left next-color">{summary.lastName}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right first-color">Address</div>
                <div className="col-md-4 text-left first-color">{summary.address}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right next-color">Date of birth</div>
                <div className="col-md-4 text-left next-color">{summary.dateOfBirth}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right first-color">Face Confidence</div>
                <div className="col-md-4 text-left first-color">{summary.faceCheckMatchConfidenceScore}</div>
              </div>
              <div className="row">
                <div className="col-md-3 text-right next-color">Your Photo From Verified ID</div>
                <div className="col-md-4 text-left next-color">
                  <img alt="your photo" src={`data:image/jpg;base64,${summary.photo}`} />
                </div>
              </div>
            </div>
          )}
          <div className="row col-12 align-items-center justify-content-center">
            <Button href="/">Back</Button>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p style={{ fontSize: '16px', color: '#8BD3AB' }}>
                This is only DEMO - NOT PRODUCTION ready system :)
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PresentForm;
