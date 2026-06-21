import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonIcon, 
  IonButton, 
  IonText,
  IonInput,
  IonTextarea,
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonModal,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonChip
} from '@ionic/react';
import { 
  logoWhatsapp, 
  logoGithub, 
  mailOpen, 
  send,
  checkmarkCircle,
  alertCircle,
  archiveOutline,
  trashOutline,
  refreshOutline,
  createOutline,
  closeOutline,
  saveOutline,
  searchOutline,
  closeCircleOutline
} from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

// ============================================
// INTERFAZ PARA TIPO DE MENSAJE
// ============================================
interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha: string;
  fechaEdicion?: string;
}

const Contact: React.FC = () => {
  // ============================================
  // ESTADOS DEL FORMULARIO
  // ============================================
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [enviado, setEnviado] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [cargando, setCargando] = useState<boolean>(false);
  
  // ============================================
  // ESTADO PARA LOS MENSAJES GUARDADOS
  // ============================================
  const [mensajesGuardados, setMensajesGuardados] = useState<Mensaje[]>([]);
  const [mensajesFiltrados, setMensajesFiltrados] = useState<Mensaje[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  // ============================================
  // ESTADOS PARA EL MODAL DE EDICIÓN
  // ============================================
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [mensajeEditando, setMensajeEditando] = useState<Mensaje | null>(null);
  const [nombreEditado, setNombreEditado] = useState<string>('');
  const [emailEditado, setEmailEditado] = useState<string>('');
  const [mensajeEditado, setMensajeEditado] = useState<string>('');
  const [errorEdicion, setErrorEdicion] = useState<string>('');

  // ============================================
  // CARGAR MENSAJES GUARDADOS AL INICIAR
  // ============================================
  useEffect(() => {
    cargarMensajesDesdeLocalStorage();
  }, []);

  // ============================================
  // ACTUALIZAR MENSAJES FILTRADOS CUANDO CAMBIA LA BÚSQUEDA
  // ============================================
  useEffect(() => {
    if (terminoBusqueda.trim() === '') {
      setMensajesFiltrados(mensajesGuardados);
    } else {
      const filtrados = mensajesGuardados.filter(mensaje =>
        mensaje.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
      setMensajesFiltrados(filtrados);
    }
  }, [terminoBusqueda, mensajesGuardados]);

  // ============================================
  // FUNCIÓN PARA BUSCAR POR NOMBRE
  // ============================================
  const buscarPorNombre = (texto: string) => {
    setTerminoBusqueda(texto);
    console.log(`🔍 Buscando: "${texto}" - Encontrados: ${
      mensajesGuardados.filter(m => 
        m.nombre.toLowerCase().includes(texto.toLowerCase())
      ).length
    } mensajes`);
  };

  // ============================================
  // FUNCIÓN PARA LIMPIAR LA BÚSQUEDA
  // ============================================
  const limpiarBusqueda = () => {
    setTerminoBusqueda('');
    console.log('🧹 Búsqueda limpiada');
  };

  // ============================================
  // FUNCIÓN PARA CARGAR MENSAJES DE localStorage
  // ============================================
  const cargarMensajesDesdeLocalStorage = () => {
    const mensajesAlmacenados = localStorage.getItem('mensajes_contacto');
    if (mensajesAlmacenados) {
      try {
        const mensajes = JSON.parse(mensajesAlmacenados);
        setMensajesGuardados(mensajes);
        setMensajesFiltrados(mensajes);
        console.log('📦 Mensajes cargados desde localStorage:', mensajes.length);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    }
  };

  // ============================================
  // FUNCIÓN PARA GUARDAR MENSAJE EN localStorage
  // ============================================
  const guardarEnLocalStorage = (nuevoMensaje: Mensaje) => {
    const mensajesExistentes = localStorage.getItem('mensajes_contacto');
    let listaMensajes: Mensaje[] = [];
    
    if (mensajesExistentes) {
      listaMensajes = JSON.parse(mensajesExistentes);
    }
    
    listaMensajes.unshift(nuevoMensaje);
    
    if (listaMensajes.length > 20) {
      listaMensajes = listaMensajes.slice(0, 20);
    }
    
    localStorage.setItem('mensajes_contacto', JSON.stringify(listaMensajes));
    setMensajesGuardados(listaMensajes);
    
    console.log('💾 Mensaje guardado en localStorage. Total:', listaMensajes.length);
  };

  // ============================================
  // FUNCIÓN PARA ACTUALIZAR UN MENSAJE EXISTENTE
  // ============================================
  const actualizarMensajeEnLocalStorage = (mensajeActualizado: Mensaje) => {
    const mensajesExistentes = localStorage.getItem('mensajes_contacto');
    if (!mensajesExistentes) return;
    
    let listaMensajes: Mensaje[] = JSON.parse(mensajesExistentes);
    const indice = listaMensajes.findIndex(msg => msg.id === mensajeActualizado.id);
    
    if (indice !== -1) {
      listaMensajes[indice] = mensajeActualizado;
      localStorage.setItem('mensajes_contacto', JSON.stringify(listaMensajes));
      setMensajesGuardados(listaMensajes);
      console.log('✏️ Mensaje editado correctamente. ID:', mensajeActualizado.id);
      return true;
    }
    return false;
  };

  // ============================================
  // FUNCIÓN PARA ELIMINAR UN MENSAJE ESPECÍFICO
  // ============================================
  const eliminarMensaje = (id: number) => {
    if (confirm('¿Estás segura de que quieres eliminar este mensaje?')) {
      const mensajesExistentes = localStorage.getItem('mensajes_contacto');
      if (!mensajesExistentes) return;
      
      let listaMensajes: Mensaje[] = JSON.parse(mensajesExistentes);
      const nuevosMensajes = listaMensajes.filter(msg => msg.id !== id);
      
      localStorage.setItem('mensajes_contacto', JSON.stringify(nuevosMensajes));
      setMensajesGuardados(nuevosMensajes);
      
      console.log('🗑️ Mensaje eliminado. ID:', id);
    }
  };

  // ============================================
  // FUNCIÓN PARA ELIMINAR TODOS LOS MENSAJES
  // ============================================
  const eliminarTodosLosMensajes = () => {
    if (confirm('¿Estás segura de que quieres eliminar TODOS los mensajes guardados?')) {
      localStorage.removeItem('mensajes_contacto');
      setMensajesGuardados([]);
      setTerminoBusqueda('');
      alert('🗑️ Todos los mensajes han sido eliminados');
    }
  };

  // ============================================
  // FUNCIÓN PARA ABRIR EL MODAL DE EDICIÓN
  // ============================================
  const abrirModalEdicion = (mensaje: Mensaje) => {
    setMensajeEditando(mensaje);
    setNombreEditado(mensaje.nombre);
    setEmailEditado(mensaje.email);
    setMensajeEditado(mensaje.mensaje);
    setErrorEdicion('');
    setMostrarModal(true);
  };

  // ============================================
  // FUNCIÓN PARA GUARDAR LOS CAMBIOS EDITADOS (CORREGIDA)
  // ============================================
  const guardarEdicion = () => {
    // Validación 1: Nombre no vacío
    if (!nombreEditado.trim()) {
      setErrorEdicion('❌ Por favor, escribe tu nombre completo');
      return;
    }
    
    // ✅ Validación 2: Verificar NOMBRE + APELLIDO (mínimo 2 palabras)
    const palabrasEdit = nombreEditado.trim().split(' ');
    if (palabrasEdit.length < 2) {
      setErrorEdicion('❌ Por favor, escribe tu NOMBRE y APELLIDO (mínimo dos palabras)');
      return;
    }
    
    // ✅ Validación 3: Cada palabra debe tener al menos 2 caracteres
    for (let i = 0; i < palabrasEdit.length; i++) {
      if (palabrasEdit[i].length < 2) {
        setErrorEdicion('❌ Cada nombre y apellido debe tener al menos 2 caracteres');
        return;
      }
    }
    
    // ✅ Validación 4: Nombre completo mínimo 5 caracteres
    if (nombreEditado.trim().length < 5) {
      setErrorEdicion('❌ El nombre completo debe tener al menos 5 caracteres');
      return;
    }
    
    // Validación 5: Email no vacío
    if (!emailEditado.trim()) {
      setErrorEdicion('❌ El correo electrónico no puede estar vacío');
      return;
    }
    
    // Validación 6: Formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEditado)) {
      setErrorEdicion('❌ El correo electrónico no es válido');
      return;
    }
    
    // Validación 7: Mensaje no vacío
    if (!mensajeEditado.trim()) {
      setErrorEdicion('❌ El mensaje no puede estar vacío');
      return;
    }
    
    // Validación 8: Mensaje mínimo 10 caracteres
    if (mensajeEditado.trim().length < 10) {
      setErrorEdicion('❌ El mensaje debe tener al menos 10 caracteres');
      return;
    }
    
    // Validación 9: Mensaje máximo 500 caracteres
    if (mensajeEditado.trim().length > 500) {
      setErrorEdicion('❌ El mensaje es muy largo. Máximo 500 caracteres');
      return;
    }
    
    const mensajeActualizado: Mensaje = {
      ...mensajeEditando!,
      nombre: nombreEditado.trim(),
      email: emailEditado.trim(),
      mensaje: mensajeEditado.trim(),
      fechaEdicion: new Date().toLocaleString()
    };
    
    actualizarMensajeEnLocalStorage(mensajeActualizado);
    setMostrarModal(false);
    setMensajeEditando(null);
    alert('✏️ Mensaje editado correctamente');
  };

  // ============================================
  // FUNCIÓN PARA LIMPIAR EL FORMULARIO
  // ============================================
  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setMensaje('');
    setError('');
    setEnviado(false);
  };

  // ============================================
  // FUNCIÓN PRINCIPAL: ENVIAR MENSAJE (CORREGIDA)
  // ============================================
  const handleSubmit = async () => {
    setError('');
    
    // Validación 1: Nombre no vacío
    if (!nombre.trim()) {
      setError('❌ Por favor, escribe tu nombre completo');
      return;
    }
    
    // ✅ Validación 2: Verificar NOMBRE + APELLIDO (mínimo 2 palabras)
    const palabras = nombre.trim().split(' ');
    if (palabras.length < 2) {
      setError('❌ Por favor, escribe tu NOMBRE y APELLIDO (mínimo dos palabras)');
      return;
    }
    
    // ✅ Validación 3: Cada palabra debe tener al menos 2 caracteres
    for (let i = 0; i < palabras.length; i++) {
      if (palabras[i].length < 2) {
        setError('❌ Cada nombre y apellido debe tener al menos 2 caracteres');
        return;
      }
    }
    
    // ✅ Validación 4: Nombre completo mínimo 5 caracteres
    if (nombre.trim().length < 5) {
      setError('❌ El nombre completo debe tener al menos 5 caracteres');
      return;
    }
    
    // Validación 5: Email no vacío
    if (!email.trim()) {
      setError('❌ Por favor, escribe tu correo electrónico');
      return;
    }
    
    // Validación 6: Formato de email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('❌ El correo electrónico no es válido. Ejemplo: nombre@dominio.com');
      return;
    }
    
    // Validación 7: Mensaje no vacío
    if (!mensaje.trim()) {
      setError('❌ Por favor, escribe tu mensaje');
      return;
    }
    
    // Validación 8: Mensaje mínimo 10 caracteres
    if (mensaje.trim().length < 10) {
      setError('❌ El mensaje debe tener al menos 10 caracteres');
      return;
    }
    
    // Validación 9: Mensaje máximo 500 caracteres
    if (mensaje.trim().length > 500) {
      setError('❌ El mensaje es muy largo. Máximo 500 caracteres');
      return;
    }
    
    setCargando(true);
    
    const nuevoMensaje: Mensaje = {
      id: Date.now(),
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toLocaleString()
    };
    
    setTimeout(() => {
      guardarEnLocalStorage(nuevoMensaje);
      setCargando(false);
      setEnviado(true);
      
      setTimeout(() => {
        limpiarFormulario();
      }, 3000);
    }, 1000);
  };

  // ============================================
  // RENDERIZADO DE LA PANTALLA
  // ============================================
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>📬 Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        
        {/* SECCIÓN 1: REDES SOCIALES */}
        <IonText>
          <h3>📱 Conéctate conmigo</h3>
          <p>Puedes contactarme directamente a través de mis redes sociales:</p>
        </IonText>
        
        <IonList>
          <IonItem button={true} detail={false} href="https://wa.me/584123965725" target="_blank">
            <IonIcon icon={logoWhatsapp} slot="start" color="success" />
            <IonLabel>WhatsApp: +58 412 3965725</IonLabel>
          </IonItem>
          <IonItem button={true} detail={false} href="https://github.com/rosaomely" target="_blank">
            <IonIcon icon={logoGithub} slot="start" />
            <IonLabel>GitHub: /rosaomely</IonLabel>
          </IonItem>
          <IonItem button={true} detail={false} href="mailto:omely.palacios@gmail.com">
            <IonIcon icon={mailOpen} slot="start" />
            <IonLabel>omely.palacios@gmail.com</IonLabel>
          </IonItem>
        </IonList>

        <hr style={{ margin: '20px 0', border: '1px solid var(--ion-color-step-200, #ddd)' }} />
        
        {/* SECCIÓN 2: FORMULARIO DE CONTACTO */}
        <IonText>
          <h3>📝 O escríbeme directamente</h3>
          <p>Completa el siguiente formulario y te responderé lo antes posible:</p>
        </IonText>
        
        {enviado && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <IonIcon icon={checkmarkCircle} color="success" style={{ fontSize: '24px' }} />
            <span style={{ color: '#155724' }}>
              ✅ ¡Mensaje enviado con éxito! Se ha guardado en el historial.
            </span>
          </div>
        )}
        
        {error && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <IonIcon icon={alertCircle} color="danger" style={{ fontSize: '24px' }} />
            <span style={{ color: '#721c24' }}>{error}</span>
          </div>
        )}
        
        <IonItem>
          <IonLabel position="stacked">👤 Nombre completo *</IonLabel>
          <IonInput
            type="text"
            value={nombre}
            placeholder="Ej: Rosa Palacios"
            onIonChange={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">📧 Correo electrónico *</IonLabel>
          <IonInput
            type="email"
            value={email}
            placeholder="Ej: rosa@ejemplo.com"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">💬 Mensaje *</IonLabel>
          <IonTextarea
            rows={5}
            value={mensaje}
            placeholder="Escribe tu mensaje aquí (mínimo 10 caracteres, máximo 500)..."
            onIonChange={(e) => setMensaje(e.detail.value!)}
          />
          <div slot="helper" style={{ fontSize: '12px', padding: '5px 0', textAlign: 'right' }}>
            {mensaje.length}/500 caracteres
          </div>
        </IonItem>
        
        <IonButton 
          expand="block" 
          onClick={handleSubmit}
          disabled={cargando}
          style={{ marginTop: '20px' }}
        >
          <IonIcon icon={send} slot="start" />
          {cargando ? 'Enviando...' : '✉️ Enviar mensaje'}
        </IonButton>
        
        <IonButton 
          expand="block" 
          fill="outline"
          onClick={limpiarFormulario}
          disabled={cargando}
          style={{ marginTop: '10px' }}
        >
          🗑️ Limpiar formulario
        </IonButton>
        
        {/* SECCIÓN 3: BÚSQUEDA Y MENSAJES GUARDADOS */}
        <hr style={{ margin: '30px 0 20px 0', border: '1px solid var(--ion-color-step-200, #ddd)' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <IonText>
            <h3>📜 Historial de mensajes</h3>
          </IonText>
          
          {mensajesGuardados.length > 0 && (
            <IonButton 
              fill="clear" 
              color="danger"
              onClick={eliminarTodosLosMensajes}
              style={{ margin: 0 }}
            >
              <IonIcon icon={trashOutline} slot="start" />
              Eliminar todos
            </IonButton>
          )}
        </div>
        
        <IonSearchbar
          value={terminoBusqueda}
          onIonChange={(e) => buscarPorNombre(e.detail.value!)}
          placeholder="🔍 Buscar por nombre..."
          showCancelButton="focus"
          cancelButtonText="Cancelar"
          animated={true}
          style={{ marginVertical: '10px' }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <IonChip outline={true}>
              <IonIcon icon={archiveOutline} />
              <IonLabel>Total: {mensajesGuardados.length}</IonLabel>
            </IonChip>
            
            {terminoBusqueda && (
              <>
                <IonChip color="primary">
                  <IonIcon icon={searchOutline} />
                  <IonLabel>Buscando: "{terminoBusqueda}"</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonIcon icon={checkmarkCircle} />
                  <IonLabel>Encontrados: {mensajesFiltrados.length}</IonLabel>
                </IonChip>
                <IonChip color="warning" onClick={limpiarBusqueda}>
                  <IonIcon icon={closeCircleOutline} />
                  <IonLabel>Limpiar</IonLabel>
                </IonChip>
              </>
            )}
          </div>
        </div>
        
        {mensajesFiltrados.length === 0 ? (
          <IonCard>
            <IonCardContent style={{ textAlign: 'center', color: '#666' }}>
              {terminoBusqueda ? (
                <>
                  <IonIcon icon={searchOutline} style={{ fontSize: '48px', marginBottom: '10px' }} />
                  <p>No se encontraron mensajes con el nombre: <strong>"{terminoBusqueda}"</strong></p>
                  <IonButton fill="clear" size="small" onClick={limpiarBusqueda}>
                    Mostrar todos los mensajes
                  </IonButton>
                </>
              ) : (
                <>
                  <IonIcon icon={archiveOutline} style={{ fontSize: '48px', marginBottom: '10px' }} />
                  <p>No hay mensajes guardados aún.</p>
                  <p style={{ fontSize: '12px' }}>Envía un mensaje y aparecerá aquí.</p>
                </>
              )}
            </IonCardContent>
          </IonCard>
        ) : (
          <IonAccordionGroup>
            {mensajesFiltrados.map((msg) => (
              <IonAccordion key={msg.id} value={msg.id.toString()}>
                <IonItem slot="header">
                  <IonLabel>
                    <h3><strong>{msg.nombre}</strong></h3>
                    <p>{msg.email} | {msg.fecha}</p>
                    {msg.fechaEdicion && (
                      <p style={{ fontSize: '11px', color: '#666' }}>
                        ✏️ Editado: {msg.fechaEdicion}
                      </p>
                    )}
                  </IonLabel>
                  <div slot="end" style={{ display: 'flex', gap: '5px' }}>
                    <IonButton 
                      fill="clear" 
                      color="warning"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirModalEdicion(msg);
                      }}
                    >
                      <IonIcon icon={createOutline} />
                    </IonButton>
                    <IonButton 
                      fill="clear" 
                      color="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarMensaje(msg.id);
                      }}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>📝 Mensaje:</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {msg.mensaje}
                    </IonCardContent>
                  </IonCard>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        )}
        
        <IonText color="medium">
          <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
            Los campos marcados con * son obligatorios.<br />
            Tus datos serán utilizados solo para responder tu mensaje.<br />
            <strong>💾 Los mensajes se guardan automáticamente en localStorage</strong><br />
            <strong>✏️ Puedes editar o eliminar cualquier mensaje ✏️ 🗑️</strong><br />
            <strong>🔍 Puedes buscar mensajes por nombre en la barra de búsqueda</strong><br />
            <strong>⚠️ El nombre debe incluir NOMBRE y APELLIDO (mínimo dos palabras)</strong>
          </p>
        </IonText>
        
      </IonContent>
      
      {/* MODAL DE EDICIÓN */}
      <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
        <IonHeader>
          <IonToolbar color="warning">
            <IonTitle>✏️ Editar mensaje</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setMostrarModal(false)}>
                <IonIcon icon={closeOutline} />
                Cerrar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          <IonText>
            <h3>Editando mensaje de:</h3>
            <p><strong>{mensajeEditando?.nombre}</strong> - {mensajeEditando?.fecha}</p>
          </IonText>
          
          {errorEdicion && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              padding: '10px', 
              borderRadius: '8px',
              marginBottom: '15px',
              color: '#721c24'
            }}>
              {errorEdicion}
            </div>
          )}
          
          <IonItem>
            <IonLabel position="stacked">👤 Nombre completo</IonLabel>
            <IonInput
              type="text"
              value={nombreEditado}
              onIonChange={(e) => setNombreEditado(e.detail.value!)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">📧 Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={emailEditado}
              onIonChange={(e) => setEmailEditado(e.detail.value!)}
            />
          </IonItem>
          
          <IonItem>
            <IonLabel position="stacked">💬 Mensaje</IonLabel>
            <IonTextarea
              rows={6}
              value={mensajeEditado}
              onIonChange={(e) => setMensajeEditado(e.detail.value!)}
            />
            <div slot="helper" style={{ fontSize: '12px', padding: '5px 0', textAlign: 'right' }}>
              {mensajeEditado.length}/500 caracteres
            </div>
          </IonItem>
          
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton 
                  expand="block" 
                  color="warning"
                  onClick={guardarEdicion}
                >
                  <IonIcon icon={saveOutline} slot="start" />
                  Guardar cambios
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton 
                  expand="block" 
                  fill="outline"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
      
    </IonPage>
  );
};

export default Contact;