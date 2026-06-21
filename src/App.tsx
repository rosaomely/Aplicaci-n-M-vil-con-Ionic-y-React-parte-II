import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, call } from 'ionicons/icons';

// Importa páginas renombradas
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Rutas renovadas con los nuevos nombres */}
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        
        {/* Barra de menú inferior */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="contact" href="/contact">
            <IonIcon icon={call} />
            <IonLabel>Contacto</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;