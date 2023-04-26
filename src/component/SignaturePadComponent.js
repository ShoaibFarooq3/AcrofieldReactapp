import React, { useRef } from 'react';
import SignaturePad from 'react-signature-pad';

function SignaturePadComponent() {
    const signaturePadRef = useRef(null);

    const handleClear = () => {
        signaturePadRef.current.clear();
    };

    const handleSave = () => {
        const signatureData = signaturePadRef.current.toDataURL();
        console.log(signatureData);
    };

    return (
        <div>
            <SignaturePad ref={signaturePadRef} />
            <button onClick={handleClear}>Clear Signature</button>
            <button onClick={handleSave}>Save Signature</button>
        </div>
    );
}

export default SignaturePadComponent;
