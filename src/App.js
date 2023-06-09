import { Toaster } from 'react-hot-toast';
import './App.css';
import PdfViewer from './component/PdfViewer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <PdfViewer />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: 'red',
              secondary: 'black',
            },
          },
        }
        }
      />
    </div>
  );
}

export default App;
