
import Header from './Header';
import './style/Layout.css'

const Layout = ({ title, children}) => {
  return (
    <div>
      <Header />

      <main>
        <h2>{title}</h2>
        {children}
      </main>
      
    </div>
  );
};

export default Layout;
