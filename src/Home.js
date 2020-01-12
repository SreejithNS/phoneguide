import React from 'react';
import Container from '@material-ui/core/Container';
import Questions from './ui/Questions';
import AboutUs from './ui/AboutUs'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default function Home(props) {
  return (
    <React.Fragment>
      <Router>
        <Route exact path="/">
          <Container style={{ height: 100 + "%" }}>
            <Questions />
          </Container>
        </Route>

        <Route path="/aboutus" component={AboutUs} />
      


      <div className="footer">
        <Link to="/"><a href="/">TWOMINUTEPHONES.COM</a></Link>
        <Link to="/aboutus"><a href="#d">ABOUT US</a></Link>
      </div>
      </Router>
    </React.Fragment >
  );
}
