// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Banner from './components/Banner.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div>
      {/* Header cam + logo + menu */}
      <Banner />

      {/* About + Contact + Footer */}
      <Navbar />
    </div>
  );
}

export default App;
