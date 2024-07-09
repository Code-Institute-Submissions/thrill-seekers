import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

import ContactForm from "./pages/contacts/ContactForm";
import About from "./pages/about/About";
import Home from "./pages/parks/Home";
import ParkCreateForm from "./pages/parks/ParkCreateForm";
import ParkPage from "./pages/parks/ParkPage";
import ParksPage from "./pages/parks/ParksPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route 
                exact 
                path="/" 
                render={() => (
                  <ParksPage message="No results found. Adjust the search keyword."/>
                )}
              /> 
              <Route exact path="/liked" render={() => (
                <ParksPage 
                  message="No results found. Adjust the search keyword or add a park to your bucketlist."
                  filter={`bucketlist__owner__profile=${profile_id}&ordering=-bucketlist__created_at&`}
                />
              )}
              />
              <Route exact path="/about" render={() => <About />} />
              <Route exact path="/contact" render={() => <ContactForm />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/parks/add" render={() => <ParkCreateForm />} />
              <Route exact path="/parks/:id" render={() => <ParkPage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;