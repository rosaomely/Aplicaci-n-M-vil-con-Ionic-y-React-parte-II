import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonAvatar, IonIcon, IonListHeader } from '@ionic/react';
import { personCircle, mail, call, location } from 'ionicons/icons';
import React from 'react';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonAvatar slot="start">
            <img alt="avatar" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar>
          <IonLabel>
            <h2>UNETI</h2>
            <h4>Carrera: Ingeniería en Informática</h4>
          </IonLabel>
        </IonItem>

        <IonListHeader>
          <h4>Alumna:</h4>
        </IonListHeader>
        <IonList>
          <IonItem>
            <IonIcon icon={personCircle} slot="start" />
            <IonLabel>Nombres y apellidos: Rosa Omely Palacios Arteaga</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={mail} slot="start" />
            <IonLabel>Email: omely.palacios@gmail.com</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={call} slot="start" />
            <IonLabel>Teléfono: +58 412 3965725</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={location} slot="start" />
            <IonLabel>Ubicación: Caracas, Venezuela</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;