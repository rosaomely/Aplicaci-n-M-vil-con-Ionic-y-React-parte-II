import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>¡Bienvenido! Profesor Carlos Márquez, esta es mi app con Ionic y React.
              La aplicación consta de tres pestañas que son: Inicio, Perfil y Contacto.</h3>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;