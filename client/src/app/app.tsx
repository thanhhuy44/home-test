import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import RequiredAuth from '../HOC/auth';
import Providers from '../components/providers';

export function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Layout = route.layout;
          const Page = route.page;
          const auth = route.auth ?? false;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Providers>
                  {auth ? (
                    <RequiredAuth>
                      <Layout>
                        <Page />
                      </Layout>
                    </RequiredAuth>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )}
                </Providers>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
