import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom";
import {Layout} from 'antd';
import MovieSearch from './routes/search'
import Details from './routes/details'
import 'antd/dist/antd.css';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Content>
          <Switch>
            <Route path="/details/:id" component={Details} />
            <Route path="/">
              <MovieSearch />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
