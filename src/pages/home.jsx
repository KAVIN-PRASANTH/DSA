import React from 'react';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';
import "../styles/home.css";

function Home() {
  function encryptData(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  function decryptData(data, key) {
    try {
      const decryptedData = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } catch (error) {
      return null;
    }
  }

  function handleEncryptDecrypt(encryptMode) {
    Swal.fire({
      title: `Enter ${encryptMode ? 'Data' : 'Encrypted Data'} and Key`,
      html:
        `<input id="inputData" class="swal2-input" placeholder="Enter ${encryptMode ? 'Data' : 'Encrypted Data'}">` +
        `<input id="key" class="swal2-input" placeholder="Enter Key" type="password">`,
      focusConfirm: false,
      preConfirm: () => {
        const inputData = Swal.getPopup().querySelector('#inputData').value;
        const key = Swal.getPopup().querySelector('#key').value;

        if (!inputData.trim() || !key.trim()) {
          Swal.showValidationMessage(`${encryptMode ? 'Data' : 'Encrypted Data'} and Key cannot be empty`);
          return false;
        }

        if (encryptMode) {
          const encryptedData = encryptData(inputData, key);
          // Automatically download the encrypted file
          const blob = new Blob([encryptedData], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'encrypted_data.txt';
          link.click();

          return encryptedData;
        } else {
          const decryptedData = decryptData(inputData, key);

          return decryptedData; // Return decrypted data for further validation in the then block
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (encryptMode) {
          Swal.fire({
            title: 'Encrypted Data',
            text: result.value,
            icon: 'success',
          });
        } else {
          if (result.value) {
            // Automatically download the decrypted file
            const blob = new Blob([result.value], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'decrypted_data.txt';
            link.click();

            Swal.fire({
              title: 'Decrypted Data',
              text: result.value,
              icon: 'success',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Decryption Error',
              text: 'Invalid Decryption Key',
            });
          }
        }
      }
    });
  }

  return (
    <div className='home'>
      <button className='btn btn-danger  m-3' style={{padding:"15px 45px"}} onClick={() => handleEncryptDecrypt(true)}>
        Encrypt
      </button>
      <button className='btn btn-primary  m-3' style={{padding:"15px 45px"}} onClick={() => handleEncryptDecrypt(false)}>
        Decrypt
      </button>
    </div>
  );
}

export default Home;
