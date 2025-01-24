import React, { useState, useMemo, useCallback } from 'react';

// Sample Product Data
const fakeProducts = [
  { id: 1, name: 'Apple iPhone 13', imageUrl: 'https://media.croma.com/image/upload/v1664009277/Croma%20Assets/Communication/Mobiles/Images/243459_2_ey5pc4.jpg' },
  { id: 2, name: 'Samsung Galaxy S21', imageUrl: 'https://img.global.news.samsung.com/global/wp-content/uploads/2021/01/Galaxy-S21-Ultra-Press-Release_main1-768x1267.jpg' },
  { id: 3, name: 'Sony WH-1000XM4 Headphones', imageUrl: 'https://th.bing.com/th/id/OIP.zYL9rxkCyKVTi0CGoADCqwHaD4?rs=1&pid=ImgDetMain' },
  { id: 4, name: 'Apple MacBook Air', imageUrl: 'data:image/jpeg;base64,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' },
  { id: 5, name: 'Google Pixel 6', imageUrl: 'https://fdn2.gsmarena.com/vv/bigpic/google-pixel-6.jpg' },
  { id: 6, name: 'Dell XPS 13', imageUrl: 'https://www.windowscentral.com/sites/wpcentral.com/files/styles/large/public/field/image/2019/09/xps-13-2in1-7390-2.jpg' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize the filtered product list
  const filteredProducts = useMemo(() => {
    return fakeProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Callback for clearing search term
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Product List</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={clearSearch} style={styles.clearButton}>
            Clear Search
          </button>
        </div>
      </header>

      <div style={styles.productCount}>
        <p>Found {filteredProducts.length} product(s)</p>
      </div>

      <div style={styles.productList}>
        {filteredProducts.map(product => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} style={styles.productImage} />
            <h3 style={styles.productName}>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(45deg,rgb(31, 29, 29), #feb47b)', // Background gradient
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '200px',
  },
  clearButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ff5733',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  productCount: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '18px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '150px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default App;
