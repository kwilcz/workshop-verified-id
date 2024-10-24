import React from 'react';
import { Button } from 'shadcn-ui';

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Welcome to the Entra Verified ID Workshop</h1>
          <p>Be sure that you want to use it!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Button href="/issue/demo-face-check">Issue Demo FaceCheck</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Button href="/present/demo-face-check?faceCheckEnabled=1">Present Demo FaceCheck</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Button href="/present/demo-face-check">Present Demo</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
