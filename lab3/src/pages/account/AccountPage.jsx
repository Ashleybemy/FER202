import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import AboutForm from './forms/AboutForm';
import AccountForm from './forms/AccountForm';
import AddressForm from './forms/AddressForm';

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <Card>
      <Card.Body>
        <h4 className="mb-3">Build Your Profile</h4>
        <ProgressBar now={progress} className="mb-3" />
        <div className="mb-3">
          <Button variant={step===1?'primary':'outline-primary'} className="me-2" disabled>
            <i className="bi bi-person-circle me-1" /> About
          </Button>
          <Button variant={step===2?'primary':'outline-primary'} className="me-2" disabled>
            <i className="bi bi-lock me-1" /> Account
          </Button>
          <Button variant={step===3?'primary':'outline-primary'} disabled>
            <i className="bi bi-geo-alt me-1" /> Address
          </Button>
        </div>

        {step === 1 && <AboutForm onNext={() => setStep(2)} />}
        {step === 2 && <AccountForm onPrev={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <AddressForm onPrev={() => setStep(2)} />}
      </Card.Body>
    </Card>
  );
}
