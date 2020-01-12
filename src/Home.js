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
        <Link to="/"><span href="/">TWOMINUTEPHONES.COM</span></Link>
        <Link to="/aboutus"><span href="#d">ABOUT US</span></Link>
      </div>
      </Router>
    </React.Fragment >
  );
}
