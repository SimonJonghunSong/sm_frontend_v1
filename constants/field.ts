export const FIELD_VALIDATIONS = {
  "1000": {
    title: {
      en: "Authentication",
      pt: "Autenticação",
      es: "Autenticación",
    },
    tooltip: {
      en: "APN authentication for the network that connects to the device.\r\n• Option\r\n- PAP\r\n- CHAP\r\n- Automatic(Default)\r\n- None",
      es: "Autenticación APN para la red que se conecta al dispositivo.\r\n• Opción\r\n- PAP\r\n- CHAP\r\n- Automático (Predeterminado)\r\n- Ninguno",
      pt: "Autenticação APN para a rede que conecta ao dispositivo.\r\n• Opção\r\n- PAP\r\n- CHAP\r\n- Automático (Padrão)\r\n- Nenhum",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "PAP",
          es: "PAP",
          pt: "PAP",
        },
      },
      {
        value: "01",
        label: {
          en: "CHAP",
          es: "CHAP",
          pt: "CHAP",
        },
      },
      {
        value: "02",
        label: {
          en: "Automatic",
          es: "Automático",
          pt: "Automático",
        },
      },
      {
        value: "03",
        label: {
          en: "None",
          es: "Ninguno",
          pt: "Nenhum",
        },
      },
    ],
  },
  "1001": {
    title: {
      en: "APN",
      pt: "APN",
      es: "APN",
    },
    tooltip: {
      en: "APN(Access Point Name) for the carrier/network that connects to the device.\r\n* The APN must be no longer than 100 characters and can only contain the characters A-Z, a-z, and 0-9.",
      es: "APN (Nombre del Punto de Acceso) para la operadora/red que se conecta al dispositivo.\r\n* El APN no debe tener más de 100 caracteres y solo puede contener A-Z, a-z y 0-9.",
      pt: "APN (Nome do Ponto de Acesso) para a operadora/rede que conecta ao dispositivo.\r\n* O APN não deve ter mais de 100 caracteres e só pode conter os caracteres A-Z, a-z e 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1002": {
    title: {
      en: "Username",
      pt: "Nome de usuário",
      es: "Nombre de usuario",
    },
    tooltip: {
      en: "The ID required by the network for APN access.\r\n* The User ID must be no longer than 32 characters and can only contain the characters A-Z, a-z, and 0-9.",
      es: "La ID requerida por la red para el acceso APN.\r\n* La ID de usuario no debe tener más de 32 caracteres y solo puede contener A-Z, a-z y 0-9.",
      pt: "O ID exigido pela rede para acesso ao APN.\r\n* O ID do Usuário não deve ter mais de 32 caracteres e só pode conter os caracteres A-Z, a-z e 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1003": {
    title: {
      en: "Password",
      pt: "Senha",
      es: "Contraseña",
    },
    tooltip: {
      en: "The Password required by the network for GPRS/HSPA access.\r\n* The User Password must be no longer than 32 characters and can only contain the characters A-Z, a-z, and 0-9.",
      es: "La contraseña requerida por la red para acceder a GPRS/HSPA.\r\n* La contraseña de usuario no debe tener más de 32 caracteres y solo puede contener A-Z, a-z y 0-9.",
      pt: "A Senha exigida pela rede para acesso ao GPRS/HSPA.\r\n* A Senha do Usuário não deve ter mais de 32 caracteres e só pode conter os caracteres A-Z, a-z e 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1004": {
    title: {
      en: "PIN Number",
      pt: "Número PIN",
      es: "Número PIN",
    },
    tooltip: {
      en: "PIN to release PIN lock if it is enabled on the SIM.\r\n* The PIN must be no longer than 8 characters and can only contain the characters 0-9.",
      es: "PIN para liberar el bloqueo de PIN si está habilitado en la SIM.\r\n* El PIN no debe tener más de 8 caracteres y solo puede contener los caracteres 0-9.",
      pt: "PIN para liberar o bloqueio de PIN se estiver habilitado no SIM.\r\n* O PIN não deve ter mais de 8 caracteres e só pode conter os caracteres 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1005": {
    title: {
      en: "Server IP",
      pt: "IP do Servidor",
      es: "IP del Servidor",
    },
    tooltip: {
      en: "IP address of the Server/Platform the device will send it’s reports to.\r\n* This can be a number in IP format or a domain name.\r\n* The DNS must be at least 5 characters and no longer than 64 characters, and can only contain the characters A-Z, a-z, 0-9, and symbols -,.",
      es: "Dirección IP del servidor/plataforma a la que el dispositivo enviará sus informes.\r\n* Esto puede ser un número en formato IP o un nombre de dominio.\r\n* El DNS debe tener al menos 5 y no más de 64 caracteres, y solo puede contener A-Z, a-z, 0-9 y los símbolos -,.",
      pt: "Endereço IP do Servidor/Plataforma para o qual o dispositivo enviará seus relatórios.\r\n* Isso pode ser um número no formato IP ou um nome de domínio.\r\n* O DNS deve ter pelo menos 5 caracteres e não mais que 64 caracteres, e só pode conter os caracteres A-Z, a-z, 0-9 e símbolos -,.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1006": {
    title: {
      en: "Server Port",
      pt: "Porta do Servidor",
      es: "Puerto del Servidor",
    },
    tooltip: {
      en: "Port of the Server/Platform that the device will send it’s reports to.\r\n• Range : 0~65535\r\n• Default : 0",
      es: "Puerto del servidor/plataforma al que el dispositivo enviará sus informes.\r\n• Rango: 0~65535\r\n• Predeterminado: 0",
      pt: "Porta do Servidor/Plataforma para o qual o dispositivo enviará seus relatórios.\r\n• Intervalo : 0~65535\r\n• Padrão : 0",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "1007": {
    title: {
      en: "Server Type",
      pt: "Tipo de Servidor",
      es: "Tipo de Servidor",
    },
    tooltip: {
      en: "The type of server the device will be connected to.\r\n• Option\r\n- TCP(Default)\r\n- UDP",
      es: "El tipo de servidor al que el dispositivo estará conectado.\r\n• Opción\r\n- TCP (Predeterminado)\r\n- UDP",
      pt: "O tipo de servidor ao qual o dispositivo estará conectado.\r\n• Opção\r\n- TCP (Padrão)\r\n- UDP",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "TCP",
          es: "TCP",
          pt: "TCP",
        },
      },
      {
        value: "01",
        label: {
          en: "UDP",
          es: "UDP",
          pt: "UDP",
        },
      },
    ],
  },
  "1008": {
    title: {
      en: "Backup Server IP",
      pt: "IP do Servidor de Backup",
      es: "IP del Servidor de Respaldo",
    },
    tooltip: {
      en: "If it cannot connect to the main server, the IP address of the backup server to which the device will send its reports.\r\n* This can be a number in IP format or a domain name.\r\n* The DNS must be at least 5 characters and no longer than 64 characters, and can only contain the characters A-Z, a-z, 0-9, and symbols -,.",
      es: "Si no puede conectarse al servidor principal, la dirección IP del servidor de respaldo al que el dispositivo enviará sus informes.\r\n* Esto puede ser un número en formato IP o un nombre de dominio.\r\n* El DNS debe tener al menos 5 y no más de 64 caracteres, y solo puede contener A-Z, a-z, 0-9 y los símbolos -,.",
      pt: "Se não puder se conectar ao servidor principal, o endereço IP do servidor de backup para o qual o dispositivo enviará seus relatórios.\r\n* Isso pode ser um número no formato IP ou um nome de domínio.\r\n* O DNS deve ter pelo menos 5 caracteres e não mais que 64 caracteres, e só pode conter os caracteres A-Z, a-z, 0-9 e símbolos -,.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1009": {
    title: {
      en: "Backup Server Port",
      pt: "Porta do Servidor de Backup",
      es: "Puerto del Servidor de Respaldo",
    },
    tooltip: {
      en: "If it cannot connect to the main server, the port of the backup server to which the device will send its reports.\r\n• Range : 0~65535\r\n• Default : 0",
      es: "Si no puede conectarse al servidor principal, el puerto del servidor de respaldo al que el dispositivo enviará sus informes.\r\n• Rango: 0~65535\r\n• Predeterminado: 0",
      pt: "Se não puder se conectar ao servidor principal, a porta do servidor de backup para o qual o dispositivo enviará seus relatórios.\r\n• Intervalo : 0~65535\r\n• Padrão : 0",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "1010": {
    title: {
      en: "Backup Server Type",
      pt: "Tipo de Servidor de Backup",
      es: "Tipo de Servidor de Respaldo",
    },
    tooltip: {
      en: "If it cannot connect to the main server, the type of the backup server to which the device will send its reports.\r\n• Option\r\n- TCP(Default)\r\n- UDP",
      es: "Si no puede conectarse al servidor principal, el tipo de servidor de respaldo al que el dispositivo enviará sus informes.\r\n• Opción\r\n- TCP (Predeterminado)\r\n- UDP",
      pt: "Se não puder se conectar ao servidor principal, o tipo do servidor de backup para o qual o dispositivo enviará seus relatórios.\r\n• Opção\r\n- TCP (Padrão)\r\n- UDP",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "TCP",
          es: "TCP",
          pt: "TCP",
        },
      },
      {
        value: "01",
        label: {
          en: "UDP",
          es: "UDP",
          pt: "UDP",
        },
      },
    ],
  },
  "1011": {
    title: {
      en: "UDP ACK",
      pt: "UDP ACK",
      es: "UPD ACK",
    },
    tooltip: {
      en: "When using a UDP server type, you can choose to have the server send a signal that the data was successfully transmitted.",
      es: "Al usar un tipo de servidor UDP, puede optar por hacer que el servidor envíe una señal de que los datos se transmitieron con éxito.",
      pt: "Quando estiver usando um tipo de servidor UDP, você pode optar por fazer com que o servidor envie um sinal indicando que os dados foram transmitidos com sucesso.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Status",
          es: "Estado",
          pt: "Status",
        },
      },
      {
        value: "b1",
        label: {
          en: "Alert",
          es: "Alerta",
          pt: "Alerta",
        },
      },
      {
        value: "b2",
        label: {
          en: "Travel",
          es: "Viaje",
          pt: "Viagem",
        },
      },
      {
        value: "b3",
        label: {
          en: "External Serial",
          es: "Serial Externo",
          pt: "Serial Externo",
        },
      },
      {
        value: "b4",
        label: {
          en: "OBDII Travel",
          es: "vViaje OBDII",
          pt: "Viagem OBDII",
        },
      },
      {
        value: "b5",
        label: {
          en: "OBDII",
          es: "OBDII",
          pt: "OBDII",
        },
      },
      {
        value: "b6",
        label: {
          en: "RFA",
          es: "RFA",
          pt: "RFA",
        },
      },
      {
        value: "b7",
        label: {
          en: "PID",
          es: "PID",
          pt: "PID",
        },
      },
      {
        value: "b8",
        label: {
          en: "OVD",
          es: "OVD",
          pt: "OVD",
        },
      },
      {
        value: "b9",
        label: {
          en: "CAM",
          es: "CAM",
          pt: "CAM",
        },
      },
      {
        value: "b10",
        label: {
          en: "BLE",
          es: "BLE",
          pt: "BLE",
        },
      },
      {
        value: "b11",
        label: {
          en: "TWS",
          es: "TWS",
          pt: "TWS",
        },
      },
      {
        value: "b12",
        label: {
          en: "TIC",
          es: "TIC",
          pt: "TIC",
        },
      },
      {
        value: "b13",
        label: {
          en: "TIS",
          es: "TIS",
          pt: "TIS",
        },
      },
      {
        value: "b14",
        label: {
          en: "TRQ",
          es: "TRQ",
          pt: "TRQ",
        },
      },
      {
        value: "b15",
        label: {
          en: "TPR",
          es: "TPR",
          pt: "TPR",
        },
      },
      {
        value: "b16",
        label: {
          en: "Sensor (ASNB)",
          es: "Sensor (ASNB)",
          pt: "Sensor (ASNB)",
        },
      },
      {
        value: "b17",
        label: {
          en: "Sensor (ASNE)",
          es: "Sensor (ASNE)",
          pt: "Sensor (ASNE)",
        },
      },
      {
        value: "b18",
        label: {
          en: "BSA",
          es: "BSA",
          pt: "BSA",
        },
      },
      {
        value: "b29",
        label: {
          en: "EMD",
          es: "EMD",
          pt: "EMD",
        },
      },
      {
        value: "b30",
        label: {
          en: "CID",
          es: "CID",
          pt: "CID",
        },
      },
      {
        value: "b31",
        label: {
          en: "JID\r\n(Add Neighbor Cell Report:  NBR)",
          es: "JID",
          pt: "JID",
        },
      },
    ],
  },
  "1012": {
    title: {
      en: "Device Port",
      pt: "Porta do Dispositivo",
      es: "Puerto del Dispositivo",
    },
    tooltip: {
      en: "When using a UDP server type, this is the port used for receiving commands from the server via UDP. \r\n• Range : 0~65535\r\n• Default : 0\r\n* If set to '0' or left empty, the device will use port 9000.",
      es: "Cuando se utiliza un tipo de servidor UDP, este es el puerto utilizado para recibir comandos del servidor a través de UDP.\r\n• Rango: 0~65535\r\n• Predeterminado: 0\r\n* Si se establece en '0' o se deja en blanco, el dispositivo utilizará el puerto 9000.",
      pt: "When using a UDP server type, this is the port used for receiving commands from the server via UDP.\r\n• Intervalo : 0~65535\r\n• Padrão : 0\r\n* Se configurado como '0' ou deixado em branco, o dispositivo usará a porta 9000.",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "1013": {
    title: {
      en: "Connection Type",
      pt: "Tipo de Conexão",
      es: "Tipo de Conexión",
    },
    tooltip: {
      en: "Type of maintaining connection with the server.\r\n• Option\r\n- Keep connected(Default) : The device always stays connected and can receive commands via GPRS.\r\n- Close Connection : The device stays connected while sending data to the server. It disconnects within 3 minutes after sending all data. During disconnection, it cannot receive commands via GPRS.",
      es: "Tipo de mantenimiento de la conexión con el servidor.\r\n• Opción\r\n- Mantener conectado (Predeterminado): El dispositivo siempre permanece conectado y puede recibir comandos a través de GPRS.\r\n- Cerrar conexión: El dispositivo permanece conectado mientras envía datos al servidor. Se desconecta dentro de los 3 minutos posteriores al envío de todos los datos. Durante la desconexión, no puede recibir comandos a través de GPRS.",
      pt: "Tipo de manutenção da conexão com o servidor.\r\n• Opção\r\n- Manter conectado (Padrão) : O dispositivo permanece sempre conectado e pode receber comandos via GPRS.\r\n- Fechar Conexão : O dispositivo permanece conectado enquanto envia dados ao servidor. Ele se desconecta dentro de 3 minutos após enviar todos os dados. Durante a desconexão, ele não pode receber comandos via GPRS.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Keep Connected",
          es: "Mantener conectado",
          pt: "Manter conectado",
        },
      },
      {
        value: "01",
        label: {
          en: "Close Connection",
          es: "Cerrar Conexión",
          pt: "Fechar Conexão",
        },
      },
    ],
  },
  "1014": {
    title: {
      en: "AGPS Mode",
      pt: "Modo AGPS",
      es: "Modo AGPS",
    },
    tooltip: {
      en: "Use of AGPS mode.\r\n• Default : Off",
      es: "Uso del modo AGPS.\r\n• Predeterminado: Desactivado",
      pt: "Uso do modo AGPS.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1015": {
    title: {
      en: "AGPS Server URL",
      pt: "URL do Servidor AGPS",
      es: "URL del Servidor AGPS",
    },
    tooltip: {
      en: "AGPS Server URL. \r\n• Default : http://xtrapath3.izatcloud.net \r\n* The URL must start with 'http', be at least 7 characters long, and no longer than 64 characters. It can only contain the characters A-Z, a-z, 0-9, and symbols -,.",
      es: "URL del servidor AGPS.\r\n• Predeterminado: http://xtrapath3.izatcloud.net\r\n* El URL debe comenzar con 'http', tener al menos 7 y no más de 64 caracteres. Solo puede contener A-Z, a-z, 0-9 y los símbolos -,.",
      pt: "URL do Servidor AGPS.\r\n• Padrão : http://xtrapath3.izatcloud.net\r\n* O URL deve começar com 'http', ter pelo menos 7 caracteres e no máximo 64 caracteres. Pode conter apenas os caracteres A-Z, a-z, 0-9 e os símbolos -,.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1016": {
    title: {
      en: "Country",
      pt: "País",
      es: "País",
    },
    tooltip: {
      en: "Scanning Band Mode type.\r\n• Option\r\n- Global(Defualt) : LTE Cat M1(or Cat 1) and GSM all bands\r\n- Mexico : LTE Cat M1(or Cat 1) Band 4, NB Band 5 and GSM all bands.\r\n- Europe : LTE Cat M1(or Cat 1), NB Band 3, 8, 20 and GSM all bands.\r\n- Brazil : LTE Cat M1(or Cat 1), NB Band 1,3,5,28 and GSM all bands.\r\n* Some technologies may not be available depending on the device model.\r\n* Brazil is the default for 'Brazil'",
      es: "Tipo de modo de escaneo de banda.\r\n• Opción\r\n- Global (Predeterminado): LTE Cat M1 (o Cat 1) y GSM en todas las bandas\r\n- México: LTE Cat M1 (o Cat 1) Banda 4, NB Banda 5 y GSM en todas las bandas.\r\n- Europa: LTE Cat M1 (o Cat 1), NB Banda 3, 8, 20 y GSM en todas las bandas.\r\n- Brasil: LTE Cat M1 (o Cat 1), NB Banda 1, 3, 5, 28 y GSM en todas las bandas.\r\n* Algunas tecnologías pueden no estar disponibles dependiendo del modelo del dispositivo.\r\n* Brasil es el predeterminado para 'Brasil'",
      pt: "Tipo de Modo de Varredura de Banda.\r\n• Opção\r\n- Global (Padrão): LTE Cat M1 (ou Cat 1) e GSM todas as bandas\r\n- México : LTE Cat M1 (ou Cat 1) Banda 4, NB Banda 5 e GSM todas as bandas.\r\n- Europa : LTE Cat M1 (ou Cat 1), NB Banda 3, 8, 20 e GSM todas as bandas.\r\n- Brasil : LTE Cat M1 (ou Cat 1), NB Banda 1, 3, 5, 28 e GSM todas as bandas.\r\n* Algumas tecnologias podem não estar disponíveis dependendo do modelo do dispositivo.\r\n* Brasil é o padrão para 'Brasil'",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Global",
          es: "Global",
          pt: "Global",
        },
      },
      {
        value: "01",
        label: {
          en: "Mexico",
          es: "México",
          pt: "México",
        },
      },
      {
        value: "02",
        label: {
          en: "Europe",
          es: "Europa",
          pt: "Europa",
        },
      },
      {
        value: "03",
        label: {
          en: "Brazil",
          es: "Brasil",
          pt: "Brasil",
        },
      },
    ],
  },
  "1017": {
    title: {
      en: "UDP ACK Waiting Time (seconds)",
      pt: "Tempo de Espera do UDP ACK (segundos)",
      es: "Tiempo de Espera del UDP ACK (segundos)",
    },
    tooltip: {
      en: "When UDP ACK is enabled, the UDP ACK Waiting Time specifies how long the device waits for UDP ACK after sending report data to the UDP server. \r\n• Range : 10~255\r\n• Default : 60\r\n* If no ACK is received within this time, the report will be resent.",
      es: "Cuando el UDP ACK está habilitado, el Tiempo de Espera del UDP ACK especifica cuánto tiempo espera el dispositivo por el UDP ACK después de enviar datos de informe al servidor UDP.\r\n• Rango: 10~255\r\n• Predeterminado: 60\r\n* Si no se recibe ningún ACK dentro de este tiempo, el informe se reenviará.",
      pt: "Quando o UDP ACK está habilitado, o Tempo de Espera do UDP ACK especifica quanto tempo o dispositivo espera pelo UDP ACK após enviar dados de relatório para o servidor UDP.\r\n• Intervalo : 10~255\r\n• Padrão : 60\r\n* Se nenhum ACK for recebido dentro desse tempo, o relatório será reenviado.",
    },
    min: 10,
    max: 255,
    list: null,
  },
  "1018": {
    title: {
      en: "UDP ACK Reopen Time (times)",
      pt: "Tempo de Reabertura do UDP ACK (vezes)",
      es: "Tiempo de Reapertura del UDP ACK (veces)",
    },
    tooltip: {
      en: "The number of retries to reopen the UDP socket when UDP ACK is not received.\r\n• Range : 2~255\r\n• Default : 2",
      es: "El número de reintentos para reabrir el socket UDP cuando no se recibe el UDP ACK.\r\n• Rango: 2~255\r\n• Predeterminado: 2",
      pt: "O número de tentativas para reabrir o soquete UDP quando o UDP ACK não é recebido.\r\n• Intervalo : 2~255\r\n• Padrão : 2",
    },
    min: 2,
    max: 255,
    list: null,
  },
  "1019": {
    title: {
      en: "UDP ACK Reboot Time (times)",
      pt: "Tempo de Reinicialização do UDP ACK (vezes)",
      es: "Tiempo de Reinicio del UDP ACK (veces)",
    },
    tooltip: {
      en: "The number of retries to reboot the Network Module when UDP ACK is not received. \r\n• Range : 2~255\r\n• Default : 4\r\n* The retry count is reset after rebooting.",
      es: "El número de reintentos para reiniciar el Módulo de Red cuando no se recibe el UDP ACK.\r\n• Rango: 2~255\r\n• Predeterminado: 4\r\n* El número de reintentos se restablece después de reiniciar.",
      pt: "O número de tentativas para reiniciar o Módulo de Rede quando o UDP ACK não é recebido.\r\n• Intervalo : 2~255\r\n• Padrão : 4\r\n* A contagem de tentativas é redefinida após a reinicialização.",
    },
    min: 2,
    max: 255,
    list: null,
  },
  "1020": {
    title: {
      en: "Maintenance Server IP",
      pt: "IP do Servidor de Manutenção",
      es: "IP del Servidor de Mantenimiento",
    },
    tooltip: {
      en: "IP address of the maintenance server for firmware or configuration updates on the device.\r\n• Default : maintenance.suntecheu.com(EU), suntechscuti.com(USA, STG)\r\n* This can be a number in IP format or a domain name.\r\n* The DNS must be at least 5 characters and no longer than 64 characters, and can only contain the characters A-Z, a-z, 0-9, and symbols -,.",
      es: "Dirección IP del servidor de mantenimiento para actualizaciones de firmware o configuración en el dispositivo.\r\n• Predeterminado : maintenance.suntecheu.com(UE), suntechscuti.com(EE. UU., STG)\r\n* Esto puede ser un número en formato IP o un nombre de dominio.\r\n* El DNS debe tener al menos 5 y no más de 64 caracteres, y solo puede contener A-Z, a-z, 0-9 y los símbolos -,.",
      pt: "Endereço IP do servidor de manutenção para atualizações de firmware ou configuração no dispositivo.\r\n• Padrão : maintenance.suntecheu.com(UE), suntechscuti.com(EUA, STG)\r\n* Isso pode ser um número no formato IP ou um nome de domínio.\r\n* O DNS deve ter pelo menos 5 caracteres e no máximo 64 caracteres, e pode conter apenas os caracteres A-Z, a-z, 0-9 e os símbolos -,.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1021": {
    title: {
      en: "Maintenance Server Port",
      pt: "Porta do Servidor de Manutenção",
      es: "Puerto del Servidor de Mantenimiento",
    },
    tooltip: {
      en: "Port of the maintenance server for firmware or configuration updates on the device.\r\n• Range : 0~65535\r\n• Default : 0",
      es: "Puerto del servidor de mantenimiento para actualizaciones de firmware o configuración en el dispositivo.\r\n• Rango: 0~65535\r\n• Predeterminado: 0",
      pt: "Porta do servidor de manutenção para atualizações de firmware ou configuração no dispositivo.\r\n• Intervalo : 0~65535\r\n• Padrão : 0",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "1022": {
    title: {
      en: "Access Interval (hours)",
      pt: "Intervalo de Acesso (horas)",
      es: "Intervalo de Acceso (horas)",
    },
    tooltip: {
      en: "The interval at which the device will check in with the maintenance server.\r\n• Range(On) : 24~999\r\n• Default : 24",
      es: "El intervalo en el cual el dispositivo se conectará con el servidor de mantenimiento.\r\n• Rango ( Activado): 24~999\r\n• Predeterminado: 24",
      pt: "O intervalo em que o dispositivo verificará o servidor de manutenção.\r\n• Intervalo (Ligado) : 24~999\r\n• Padrão : 24",
    },
    min: 24,
    max: 999,
    list: null,
  },
  "1023": {
    title: {
      en: "Access Time",
      pt: "Hora de Acesso",
      es: "Hora de Acceso",
    },
    tooltip: {
      en: "The time when the device will check in with the maintenance server every day.\r\n• Range(On) : 01~12:00 AM/PM\r\n• Default : Off",
      es: "El tiempo en que el dispositivo se conectará con el servidor de mantenimiento cada día.\r\n• Rango ( Activado): 01~12:00 AM/PM\r\n• Predeterminado: Desactivado",
      pt: "O horário em que o dispositivo verificará o servidor de manutenção todos os dias.\r\n• Intervalo (Ligado) : 01~12:00 AM/PM\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: null,
  },
  "1025": {
    title: {
      en: "SMS Number",
      pt: "Número de SMS",
      es: "Número de SMS",
    },
    tooltip: {
      en: "The phone number where you will receive SMS reports from the device.\r\n* Values for 1005, 1006, 1008, 1009 must be 0 to report to SMS.\r\n* The SMS Number must be no longer than 20 digits.",
      es: "El número de teléfono donde recibirá informes SMS del dispositivo.\r\n* Los valores para 1005, 1006, 1008, 1009 deben ser 0 para informar a SMS.\r\n* El Número de SMS no debe tener más de 20 dígitos.",
      pt: "O número de telefone onde você receberá os relatórios SMS do dispositivo.\r\n* Os valores para 1005, 1006, 1008, 1009 devem ser 0 para relatar ao SMS.\r\n* O Número SMS não deve ter mais de 20 dígitos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1027": {
    title: {
      en: "Connection Duration (seconds)",
      pt: "Duração da Conexão (segundos)",
      es: "Duración de la Conexión (segundos)",
    },
    tooltip: {
      en: "Time to keep server connection after successful initial data transmission. \r\n• Range : 10~7,200\r\n• Default : 10\r\n* This timer starts upon receiving the ACK for the report to ensure adequate connection time for receiving server data.",
      es: "Tiempo para mantener la conexión con el servidor después de la transmisión inicial de datos exitosa.\r\n• Rango: 10~7,200\r\n• Predeterminado: 10\r\n* Este temporizador comienza al recibir el ACK del informe para garantizar un tiempo de conexión adecuado para recibir datos del servidor.",
      pt: "Tempo para manter a conexão com o servidor após a transmissão inicial de dados bem-sucedida.\r\n• Intervalo : 10~7,200\r\n• Padrão : 10\r\n* Este temporizador começa ao receber o ACK do relatório para garantir tempo de conexão adequado para receber os dados do servidor.",
    },
    min: 10,
    max: 7200,
    list: null,
  },
  "1030": {
    title: {
      en: "SMS Lock",
      pt: "Bloqueio de SMS",
      es: "Bloqueo de SMS",
    },
    tooltip: {
      en: "When SMS Lock is enabled, only the phone numbers listed in parameters 1031 to 1034 can send SMS commands to the device. \r\n• Default : Off\r\n* Commands from other numbers will be ignored.\r\n* The SMS MT must be no longer than 20 digits.",
      es: "Cuando el Bloqueo de SMS está habilitado, solo los números de teléfono listados en los parámetros 1031 a 1034 pueden enviar comandos SMS al dispositivo.\r\n• Predeterminado: Desactivado\r\n* Los comandos de otros números serán ignorados.\r\n* El SMS MT no debe tener más de 20 dígitos.",
      pt: "Quando o Bloqueio de SMS estiver ativado, apenas os números de telefone listados nos parâmetros 1031 a 1034 poderão enviar comandos SMS para o dispositivo.\r\n• Padrão  : Desativado\r\n* Comandos de outros números serão ignorados.\r\n* O SMS MT não deve ter mais de 20 dígitos.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1031": {
    title: {
      en: "SMS MT1",
      pt: "SMS MT1",
      es: "SMS MT1",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1032": {
    title: {
      en: "SMS MT2",
      pt: "SMS MT2",
      es: "SMS MT2",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1033": {
    title: {
      en: "SMS MT3",
      pt: "SMS MT3",
      es: "SMS MT3",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1034": {
    title: {
      en: "SMS MT4",
      pt: "SMS MT4",
      es: "SMS MT4",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1035": {
    title: {
      en: "Call Lock",
      pt: "Bloqueio de Chamada",
      es: "Bloqueo de Llamada",
    },
    tooltip: {
      en: "If Call Lock is enabled, only calls from numbers listed in CALL MT1~MT5 can be accepted.\r\n• Default : Off\r\n* The Call MT must be no longer than 20 digits.",
      es: "Si el Bloqueo de Llamadas está habilitado, solo se aceptan llamadas de los números listados en CALL MT1~MT5.\r\n• Predeterminado: Desactivado\r\n* El Call MT no debe tener más de 20 dígitos.",
      pt: "Se o Bloqueio de Chamadas estiver ativado, apenas chamadas de números listados em CALL MT1~MT5 podem ser aceitas.\r\n• Padrão  : Desativado\r\n* O Call MT não deve ter mais de 20 dígitos.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1036": {
    title: {
      en: "Call MT1",
      pt: "Chamada MT1",
      es: "Llamada MT1",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1037": {
    title: {
      en: "Call MT2",
      pt: "Chamada MT2",
      es: "Llamada MT2",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1038": {
    title: {
      en: "Call MT3",
      pt: "Chamada MT3",
      es: "Llamada MT3",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1039": {
    title: {
      en: "Call MT4",
      pt: "Chamada MT4",
      es: "Llamada MT4",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1040": {
    title: {
      en: "Call MT5",
      pt: "Chamada MT5",
      es: "Llamada MT5",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1041": {
    title: {
      en: "Call MO 1",
      pt: "Chamada MO 1",
      es: "Llamada MO 1",
    },
    tooltip: {
      en: "The phone number for outgoing calls from the device.\r\n* The Call MO must be no longer than 20 digits.",
      es: "El número de teléfono para llamadas salientes desde el dispositivo.\r\n* El Call MO no debe tener más de 20 dígitos.",
      pt: "O número de telefone para chamadas originadas do dispositivo.\r\n* O Call MO não deve ter mais de 20 dígitos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1042": {
    title: {
      en: "Call MO 1",
      pt: "Chamada MO 1",
      es: "Llamada MO 1",
    },
    tooltip: {
      en: "The phone number for outgoing calls from the device. \r\n* The Call MO must be no longer than 20 digits.",
      es: "El número de teléfono para llamadas salientes desde el dispositivo.\r\n* El Call MO no debe tener más de 20 dígitos.",
      pt: "O número de telefone para chamadas originadas do dispositivo.\r\n* O Call MO não deve ter mais de 20 dígitos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1043": {
    title: {
      en: "Headset Support",
      pt: "Suporte para Headset",
      es: "Soporte de Auriculares",
    },
    tooltip: {
      en: "Use call with headset.\r\n• Default : On",
      es: "Atender llamada con auriculares.\r\n• Predeterminado: Activado",
      pt: "Usar chamada com fone de ouvido.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1046": {
    title: {
      en: "Immobilizer Cycle",
      pt: "Ciclo do Imobilizador",
      es: "Ciclo del Inmovilizador",
    },
    tooltip: {
      en: 'The Immobilizer Cycle function available on the device is used to protect the vehicle from potential theft by utilizing the door immobilizer.\r\n* The Immobilizer Cycle should be set to "Enable," and the speed limit for the Immobilizer Cycle should be greater than 0.\r\n* Timer1 and Timer2 must not be set to 0.\r\n* One of the inputs should be configured as "Door Sensor."\r\n* One of the outputs should be configured as "Immobilizer."\r\n* The anti-theft button should not be assigned to any input.\r\n* If the door is opened while driving and the speed is below the limit, the immobilizer cycle is immediately activated, and an alert is sent.\r\n* If the speed is above the limit, the system waits until the speed drops below the limit before activating the immobilizer cycle.\r\n* If GPS is not fixed, the device assumes the speed is above the limit.\r\n* The immobilizer remains active for Timer1 and deactivates for Timer2, repeating this cycle until a disable command is received.\r\n* If the ignition is on, the immobilizer gradually activates and fully engages after 3 minutes.\r\n* If Timer1 is set to less than 180 seconds (3 minutes), full activation of the immobilizer is delayed.',
      es: 'La función de Ciclo del Inmovilizador disponible en el dispositivo se utiliza para proteger el vehículo de posibles robos utilizando el inmovilizador de la puerta.\r\n* El Ciclo del Inmovilizador debe configurarse en Activar", y el límite de velocidad para el Ciclo del Inmovilizador debe ser mayor que 0.\r\n* Timer1 y Timer2 no deben configurarse en 0.\r\n* Una de las entradas debe configurarse como "Sensor de Puerta".\r\n* Una de las salidas debe configurarse como "Inmovilizador".\r\n* El botón antirrobo no debe asignarse a ninguna entrada.\r\n* Si la puerta se abre mientras se conduce y la velocidad está por debajo del límite, el ciclo del inmovilizador se activa inmediatamente y se envía una alerta.\r\n* Si la velocidad está por encima del límite, el sistema espera hasta que la velocidad descienda por debajo del límite antes de activar el ciclo del inmovilizador.\r\n* Si el GPS no está fijado, el dispositivo asume que la velocidad está por encima del límite.\r\n* El inmovilizador permanece activo durante Timer1 y se desactiva durante Timer2, repitiendo este ciclo hasta que se reciba un comando de desactivación.\r\n* Si el Activado está activado, el inmovilizador se activa gradualmente y se activa por completo después de 3 minutos.\r\n* Si Timer1 se establece en menos de 180 segundos (3 minutos), la activación completa del inmovilizador se retrasa.',
      pt: "A função de Ciclo do Imobilizador disponível no dispositivo é usada para proteger o veículo de possíveis roubos utilizando o imobilizador da porta.\r\n* O Ciclo do Imobilizador deve ser definido como 'Ativar' e o limite de velocidade para o Ciclo do Imobilizador deve ser superior a 0.\r\n* O Timer1 e o Timer2 não devem ser definidos como 0.\r\n* Uma das entradas deve ser configurada como 'Sensor de Porta.'\r\n* Uma das saídas deve ser configurada como 'Imobilizador.'\r\n* O botão anti-roubo não deve ser atribuído a nenhuma entrada.\r\n* Se a porta for aberta enquanto estiver dirigindo e a velocidade estiver abaixo do limite, o ciclo do imobilizador é imediatamente ativado e um alerta é enviado.\r\n* Se a velocidade estiver acima do limite, o sistema espera até que a velocidade caia abaixo do limite antes de ativar o ciclo do imobilizador.\r\n* Se o GPS não estiver fixado, o dispositivo assume que a velocidade está acima do limite.\r\n* O imobilizador permanece ativo por Timer1 e desativa por Timer2, repetindo este ciclo até que um comando de desativação seja recebido.\r\n* Se a ignição estiver ligada, o imobilizador é gradualmente ativado e totalmente engajado após 3 minutos.\r\n* Se Timer1 for definido como menos de 180 segundos (3 minutos), a ativação total do imobilizador é atrasada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "1047": {
    title: {
      en: "Speed Limit for Immobilizer Cycle (km/h)",
      pt: "Limite de Velocidade para Ciclo do Imobilizador (km/h)",
      es: "Límite de Velocidad para el Ciclo del Inmovilizador (km/h)",
    },
    tooltip: {
      en: "• Range : 1~150\r\n• Default : 30",
      es: "• Rango: 1~150\r\n• Predeterminado: 30",
      pt: "• Intervalo: 1~150\r\n• Padrão: 30",
    },
    min: 1,
    max: 150,
    list: null,
  },
  "1048": {
    title: {
      en: "Timer1 for Immobilizer Cycle (seconds)",
      pt: "Temporizador 1 para Ciclo do Imobilizador (segundos)",
      es: "Temporizador 1 para el Ciclo del Inmovilizador (segundos)",
    },
    tooltip: {
      en: "• Range : 0~43,200\r\n• Default : 120",
      es: "• Rango: 0~43,200\r\n• Predeterminado: 120",
      pt: "• Intervalo: 0~43.200\r\n• Padrão: 120",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1049": {
    title: {
      en: "Timer2 for Immobilizer Cycle (seconds)",
      pt: "Temporizador 2 para Ciclo do Imobilizador (segundos)",
      es: "Temporizador 2 para el Ciclo del Inmovilizador (segundos)",
    },
    tooltip: {
      en: "• Range : 1~150 \r\n• Default : 30",
      es: "• Rango: 1~150\r\n• Predeterminado: 30",
      pt: "• Intervalo: 1~150\r\n• Padrão: 30",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1050": {
    title: {
      en: "Anti-Theft Delay (seconds)",
      pt: "Atraso do Anti-Roubo (segundos)",
      es: "Retraso del Antirrobo (segundos)",
    },
    tooltip: {
      en: "When the ignition is on, the Anti-Theft violation starts after the delay time.\r\n• Range : 10~60,000\r\n• Default : 30",
      es: "Cuando la ignición está encendida, el exceso de antirrobo comienza después del tiempo de retraso.\r\n• Rango: 10~60,000\r\n• Predeterminado: 30",
      pt: "Quando a ignição está ligada, a violação anti-roubo começa após o tempo de atraso.\r\n• Intervalo : 10~60,000\r\n• Padrão : 30",
    },
    min: 10,
    max: 60000,
    list: null,
  },
  "1051": {
    title: {
      en: "Anti-Theft Alert Delay (seconds)",
      pt: "Atraso do Alerta de Anti-Roubo (segundos)",
      es: "Retraso de Alerta de Antirrobo (segundos)",
    },
    tooltip: {
      en: "When the Anti-Theft violation occurs, it sends an alert report after the delay time.\r\n• Range : 0~60,000\r\n• Default : 0",
      es: "Cuando ocurre un exceso de antirrobo, envía un informe de alerta después del tiempo de retardo.\r\n• Rango: 0~60,000\r\n• Predeterminado: 0",
      pt: "Quando a violação anti-roubo ocorre, ele envia um relatório de alerta após o tempo de atraso.\r\n• Intervalo : 0~60,000\r\n• Padrão : 0",
    },
    min: 0,
    max: 60000,
    list: null,
  },
  "1052": {
    title: {
      en: "Satellite Output",
      pt: "Saída de Satélite",
      es: "Salida de Satélite",
    },
    tooltip: {
      en: "When the network status is 'No Network,' the output to activate.",
      es: "Cuando el estado de la red es 'Sin Red', la salida se activará.",
      pt: "Quando o status da rede for 'Sem Rede', a saída a ser ativada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "None",
          es: "Ninguno",
          pt: "Nenhum",
        },
      },
      {
        value: "02",
        label: {
          en: "Output1",
          es: "Salida 1",
          pt: "Saída 1",
        },
      },
      {
        value: "03",
        label: {
          en: "Output2",
          es: "Salida 2",
          pt: "Saída 2",
        },
      },
      {
        value: "04",
        label: {
          en: "Output1 + Output2",
          es: "Salida 1 + Salida 2",
          pt: "Saída 1 + Saída 2",
        },
      },
    ],
  },
  "1053": {
    title: {
      en: "Satellite Delay (seconds)",
      pt: "Atraso do Satélite (segundos)",
      es: "Retraso del Satélite (segundos)",
    },
    tooltip: {
      en: "Time delay before deactivating the output after losing the network signal.\r\n• Range : 20~86,400\r\n• Default : 20",
      es: "Tiempo de retraso antes de desactivar la salida después de perder la señal de red.\r\n• Rango: 20~86,400\r\n• Predeterminado: 20",
      pt: "Tempo de atraso antes de desativar a saída após a perda do sinal da rede.\r\n• Intervalo : 20~86,400\r\n• Padrão : 20",
    },
    min: 20,
    max: 86400,
    list: null,
  },
  "1054": {
    title: {
      en: "Technology",
      pt: "Tecnologia",
      es: "Tecnología",
    },
    tooltip: {
      en: "RAT(Radio Access Technology) to be searched.\r\n• Option\r\n- LTE Cat M1/Cat 1 only(Default-USA)\r\n- LTE Cat M1/Cat 1 & GSM(Default-LATAM/Brazil)\r\n- LTE Cat NB only\r\n- LTE Cat M1/Cat 1 & Cat NB\r\n- LTE Cat M1/Cat 1 & Cat NB & GSM\r\n- GSM only\r\n- LTE Cat NB & GSM",
      es: "RAT (Tecnología de Acceso por Radio) a buscar.\r\n• Opción\r\n- Solo LTE Cat M1/Cat 1 (Predeterminado-EE. UU.)\r\n- LTE Cat M1/Cat 1 & GSM (Predeterminado-LATAM/Brasil)\r\n- Solo LTE Cat NB\r\n- LTE Cat M1/Cat 1 & Cat NB\r\n- LTE Cat M1/Cat 1 & Cat NB & GSM\r\n- Solo GSM\r\n- LTE Cat NB & GSM",
      pt: "RAT (Tecnologia de Acesso por Rádio) a ser pesquisada.\r\n• Opção\r\n- Apenas LTE Cat M1/Cat 1 (Padrão-EUA)\r\n- LTE Cat M1/Cat 1 & GSM (Padrão-LATAM/Brasil)\r\n- Apenas LTE Cat NB\r\n- LTE Cat M1/Cat 1 & Cat NB\r\n- LTE Cat M1/Cat 1 & Cat NB & GSM\r\n- Apenas GSM\r\n- LTE Cat NB & GSM",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "LTE Cat M1/Cat 1 only",
          es: "Solo LTE Cat M1/Cat 1",
          pt: "LTE Cat M1/Cat 1 apenas",
        },
      },
      {
        value: "01",
        label: {
          en: "LTE Cat M1/Cat 1 & GSM",
          es: "LTE Cat M1/Cat 1 & GSM",
          pt: "LTE Cat M1/Cat 1 & GSM",
        },
      },
      {
        value: "02",
        label: {
          en: "LTE Cat NB only",
          es: "Solo LTE Cat NB",
          pt: "LTE Cat NB apenas",
        },
      },
      {
        value: "03",
        label: {
          en: "LTE Cat M1/Cat 1 & Cat NB",
          es: "LTE Cat M1/Cat 1 & Cat NB",
          pt: "LTE Cat M1/Cat 1 & Cat NB",
        },
      },
      {
        value: "04",
        label: {
          en: "LTE Cat M1/Cat 1 & Cat NB & GSM",
          es: "LTE Cat M1/Cat 1 & Cat NB & GSM",
          pt: "LTE Cat M1/Cat 1 & Cat NB & GSM",
        },
      },
      {
        value: "05",
        label: {
          en: "GSM only",
          es: "Solo GSM",
          pt: "GSM apenas",
        },
      },
      {
        value: "06",
        label: {
          en: "LTE Cat NB & GSM",
          es: "LTE Cat NB & GSM",
          pt: "LTE Cat NB & GSM",
        },
      },
    ],
  },
  "1055": {
    title: {
      en: "Reporting Format",
      pt: "Formato de Relatório",
      es: "Formato de reporte",
    },
    tooltip: {
      en: "Reporting format settings.\r\n• Option\r\n- Normal(Default)\r\n- Zip",
      es: "Configuraciones de formato de informes.\r\n• Opción\r\n- Normal (Predeterminado)\r\n- Zip",
      pt: "Configurações de formato de relatório.\r\n• Opção\r\n- Normal (Padrão)\r\n- Zip",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Normal",
          es: "Normal",
          pt: "Normal",
        },
      },
      {
        value: "01",
        label: {
          en: "Zip",
          es: "Zip",
          pt: "Zip",
        },
      },
    ],
  },
  "1058": {
    title: {
      en: "Command Response",
      pt: "Resposta de Comando",
      es: "Respuesta de Comando",
    },
    tooltip: {
      en: "Where the device will send a response message when it receives a command from SMS or a server/platform.\r\n• Option(On)\r\n- Server\r\n- SMS\r\n• Default : Off",
      es: "Dónde el dispositivo enviará un mensaje de respuesta cuando reciba un comando por SMS o desde un servidor/plataforma.\r\n• Opción (Activado)\r\n- Servidor\r\n- SMS\r\n• Predeterminado: Desactivado",
      pt: "Onde o dispositivo enviará uma mensagem de resposta quando receber um comando por SMS ou de um servidor/plataforma.\r\n• Opção (Ativado)\r\n- Servidor\r\n- SMS\r\n• Padrão: Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Server",
          es: "Servidor",
          pt: "Servidor",
        },
      },
      {
        value: "02",
        label: {
          en: "SMS",
          es: "SMS",
          pt: "SMS",
        },
      },
      {
        value: "03",
        label: {
          en: "Server + SMS",
          es: "Servidor + SMS",
          pt: "Servidor + SMS",
        },
      },
    ],
  },
  "1060": {
    title: {
      en: "Keep Alive Interval (minutes)",
      pt: "Intervalo Keep Alive (minutos)",
      es: "Intervalo de Keep Alive (minutos)",
    },
    tooltip: {
      en: "If there is no data communication between the server and the device for a long time (It depends on the network service provider), the mobile network will disconnect. \r\nTo prevent this, you can set the 1060(Keep Alive Interval) time, which sends a 'KEEP_ALIVE' message to the server before the network is disconnected.\r\n• Range : 0~432,000\r\n• Default : 0",
      es: "Si no hay comunicación de datos entre el servidor y el dispositivo durante mucho tiempo (depende del proveedor de servicios de red), la red móvil se desconectará.\r\nPara evitar esto, puede configurar el tiempo 1060 (Intervalo de Keep Alive), que envía un mensaje 'KEEP_ALIVE' al servidor antes de que la red se desconecte.\r\n• Rango: 0~432,000\r\n• Predeterminado: 0",
      pt: "Se não houver comunicação de dados entre o servidor e o dispositivo por um longo período (Depende do provedor de serviço de rede), a rede móvel será desconectada.\r\nPara evitar isso, você pode definir o tempo 1060 (Intervalo de Manutenção) que envia uma mensagem 'KEEP_ALIVE' ao servidor antes que a rede seja desconectada.\r\n• Intervalo : 0~432,000\r\n• Padrão : 0",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1061": {
    title: {
      en: "Jamming Detection",
      pt: "Detecção de Bloqueio",
      es: "Detección de Interferencias",
    },
    tooltip: {
      en: "If jamming detection is enabled, configure the actions to be taken when jamming is detected.\r\n* Device will send an alert after recovering the GSM network. It takes about 2 minutes.",
      es: "Si la detección de interferencias está habilitada, configurar las acciones a tomar cuando se detecte una interferencia.\r\n* El dispositivo enviará una alerta después de recuperar la red GSM. Esto tarda aproximadamente 2 minutos.",
      pt: "Se a detecção de interferência estiver ativada, configure as ações a serem tomadas quando a interferência for detectada.\r\n* O dispositivo enviará um alerta após recuperar a rede GSM. Isso leva cerca de 2 minutos.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Alert",
          es: "Alerta",
          pt: "Alerta",
        },
      },
      {
        value: "02",
        label: {
          en: "Alert + Immobilizer",
          es: "Alerta + Inmovilizador",
          pt: "Alerta + Imobilizador",
        },
      },
      {
        value: "03",
        label: {
          en: "Alert + Buzzer",
          es: "Alerta + Zumbador",
          pt: "Alerta + Buzzer",
        },
      },
      {
        value: "04",
        label: {
          en: "Alert + Immobilizer + Buzzer",
          es: "Alerta + Inmovilizador + Zumbador",
          pt: "Alerta + Imobilizador + Buzzer",
        },
      },
      {
        value: "05",
        label: {
          en: "Jamming detection cycle\r\nTemporary Emergency + Alert",
          es: "Ciclo de detección de interferencias\r\nEmergencia Temporal + Alerta",
          pt: "Ciclo de detecção de bloqueio\r\nEmergência Temporária + Alerta",
        },
      },
      {
        value: "06",
        label: {
          en: "Temporary Emergency + Alert + Immobilizer",
          es: "Emergencia Temporal + Alerta + Inmovilizador",
          pt: "Emergência Temporária + Alerta + Imobilizador",
        },
      },
      {
        value: "07",
        label: {
          en: "Temporary Emergency + Alert + Buzzer",
          es: "Emergencia Temporal + Alerta + Zumbador",
          pt: "Emergência Temporária + Alerta + Buzzer",
        },
      },
      {
        value: "08",
        label: {
          en: "Temporary Emergency + Alert + Immobilizer + Buzzer",
          es: "Emergencia Temporal + Alerta + Inmovilizador + Zumbador",
          pt: "Emergência Temporária + Alerta + Imobilizador + Buzzer",
        },
      },
      {
        value: "09",
        label: {
          en: "Temporary Emergency + Jamming detection cycle",
          es: "Emergencia Temporal + Ciclo de detección de interferencia",
          pt: "Emergência Temporária + Ciclo de detecção de interferência",
        },
      },
      {
        value: "10",
        label: {
          en: "Permanent Emergency + Alert",
          es: "Emergencia Permanente + Alerta",
          pt: "Emergência Permanente + Alerta",
        },
      },
      {
        value: "11",
        label: {
          en: "Permanent Emergency + Alert + Immobilizer",
          es: "Emergencia Permanente + Alerta + Inmovilizador",
          pt: "Emergência Permanente + Alerta + Imobilizador",
        },
      },
      {
        value: "12",
        label: {
          en: "Permanent Emergency + Alert + Buzzer",
          es: "Emergencia Permanente + Alerta + Zumbador",
          pt: "Emergência Permanente + Alerta + Buzzer",
        },
      },
      {
        value: "13",
        label: {
          en: "Permanent Emergency + Alert + Immobilizer + Buzzer",
          es: "Emergencia Permanente + Alerta + Inmovilizador + Zumbador",
          pt: "Emergência Permanente + Alerta + Imobilizador + Buzzer",
        },
      },
      {
        value: "14",
        label: {
          en: "Permanent Emergency + Jamming detection cycle",
          es: "Emergencia Permanente + Ciclo de detección de interferencia",
          pt: "Emergência Permanente + Ciclo de detecção de interferência",
        },
      },
      {
        value: "15",
        label: {},
      },
    ],
  },
  "1062": {
    title: {
      en: "Check Distance for Jamming (meters)",
      pt: "Verificar Distância para Bloqueio (metros)",
      es: "Comprobar Distancia para Interferencias (metros)",
    },
    tooltip: {
      en: "When jamming is detected on GPRS/HSPA, the device checks the distance between the vehicle's current location and the FP(First Geographical Point). If the distance exceeds the 'Check Distance for Jamming' value for a period, Jamming Detection mode is triggered. \r\n• Range : 0~60,000\r\n• Default : 500\r\n* Set to ‘0’ to skip this process.",
      es: "Cuando se detecta interferencia en GPRS/HSPA, el dispositivo verifica la distancia entre la ubicación actual del vehículo y el FP (Primer Punto Geográfico). Si la distancia supera el valor de 'Distancia de Verificación para Interferencia' durante un período, se activa el modo de Detección de Interferencia.\r\n• Rango: 0~60,000\r\n• Predeterminado: 500\r\n* Configúrelo en '0' para omitir este proceso.",
      pt: "Quando a interferência é detectada no GPRS/HSPA, o dispositivo verifica a distância entre a localização atual do veículo e o FP (Primeiro Ponto Geográfico). Se a distância exceder o valor de 'Distância de Verificação para Interferência' por um período, o modo de Detecção de Interferência é ativado.\r\n• Intervalo : 0~60,000\r\n• Padrão : 500\r\n* Configure para ‘0’ para pular este processo.",
    },
    min: 0,
    max: 60000,
    list: null,
  },
  "1063": {
    title: {
      en: "Check No GPS Duration for Jamming (seconds)",
      pt: "Verificar Duração Sem GPS para Bloqueio (segundos)",
      es: "Comprobar Duración sin GPS para Interferencias (segundos)",
    },
    tooltip: {
      en: "This function supports GPRS/HSPA jamming detection in areas without GPS. After detecting jamming, the device measures two times 'A - Time to complete jamming detection' and 'B - Time needed for the vehicle to drive through the area', If the total time (A + B) exceeds the Jamming Check Time, the device confirms jamming. \r\n• Range : 0~43,200\r\n• Default : 300\r\n* If the vehicle doesn't move, jamming detection is ignored until reset. \r\n* Set to ‘0’ to skip this process.",
      es: "Esta función admite la detección de interferencias GPRS/HSPA en áreas sin GPS. Después de detectar interferencia, el dispositivo mide dos tiempos 'A - Tiempo para completar la detección de interferencia' y 'B - Tiempo necesario para que el vehículo atraviese el área'. Si el tiempo total (A + B) supera el Tiempo de Verificación de Interferencia, el dispositivo confirma la interferencia.\r\n• Rango: 0~43,200\r\n• Predeterminado: 300\r\n* Si el vehículo no se mueve, la detección de interferencia se ignora hasta que se reinicie.\r\n* Configúrelo en '0' para omitir este proceso.",
      pt: "Esta função suporta a detecção de interferência GPRS/HSPA em áreas sem GPS. Após detectar interferência, o dispositivo mede duas vezes 'A - Tempo para concluir a detecção de interferência' e 'B - Tempo necessário para o veículo atravessar a área'. Se o tempo total (A + B) exceder o Tempo de Verificação de Interferência, o dispositivo confirma a interferência.\r\n• Intervalo : 0~43,200\r\n• Padrão : 300\r\n* Se o veículo não se mover, a detecção de interferência será ignorada até o reset.\r\n* Configure para ‘0’ para pular este processo.",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1064": {
    title: {
      en: "Speed Buzzer Alert",
      pt: "Alerta de Velocidade com Buzzer",
      es: "Alerta de Velocidad con Zumbador",
    },
    tooltip: {
      en: "When exceeding the 1621(Speed Threshold)', the buzzer alerts.\r\n• Default : Off\r\n* Output type must be set to ‘Buzzer’",
      es: "Cuando se excede el 'Umbral de Velocidad' (1621), la alerta del zumbido.\r\n• Predeterminado: Desactivado\r\n* El tipo de salida debe estar configurado en ‘Zumbido’",
      pt: "Quando exceder o '1621 (Limite de Velocidade)', o alarme alerta.\r\n• Padrão  : Desativado\r\n* O tipo de saída deve ser configurado como 'Alarme'.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1065": {
    title: {
      en: "Jamming Detection Cycle Time 1 (seconds)",
      pt: "Tempo do Ciclo de Detecção de Bloqueio 1 (segundos)",
      es: "Tiempo del Ciclo de Detección de Interferencias 1 (segundos)",
    },
    tooltip: {
      en: "The device will activate the buzzer after this time following jamming detection.\r\n• Range : 0~43,200\r\n• Default : 60",
      es: "El dispositivo activará el zumbido después de este tiempo tras la detección de interferencia.\r\n• Rango: 0~43,200\r\n• Predeterminado: 60",
      pt: "O dispositivo ativará o alarme após esse tempo após a detecção de interferência.\r\n• Intervalo : 0~43,200\r\n• Padrão : 60",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1066": {
    title: {
      en: "Jamming Detection Cycle Time 2 (seconds)",
      pt: "Tempo do Ciclo de Detecção de Bloqueio 2 (segundos)",
      es: "Tiempo del Ciclo de Detección de Interferencias 2 (segundos)",
    },
    tooltip: {
      en: "The device will activate the immobilizer and deactivate the buzzer after this time following buzzer activation.\r\n• Range : 0~43,200\r\n• Default : 60",
      es: "El dispositivo activará el inmovilizador y desactivará el zumbido después de este tiempo tras la activación del zumbido \r\n• Rango: 0~43.200\r\n• Predeterminado: 60",
      pt: "O dispositivo ativará o imobilizador e desativará o alarme após esse tempo após a ativação do alarme.\r\n• Intervalo : 0~43.200\r\n• Padrão : 60",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1067": {
    title: {
      en: "Jamming Detection Cycle Time 3 (seconds)",
      pt: "Tempo do Ciclo de Detecção de Bloqueio 3 (segundos)",
      es: "Tiempo del Ciclo de Detección de Interferencias 3 (segundos)",
    },
    tooltip: {
      en: "The device will deactivate the immobilizer after this time following its activation.\r\n• Range : 0~43,200 \r\n• Default : 60",
      es: "El dispositivo desactivará el inmovilizador después de este tiempo tras su activación.\r\n• Rango: 0~43,200\r\n• Predeterminado: 60",
      pt: "O dispositivo desativará o imobilizador após esse tempo após sua ativação.\r\n• Intervalo : 0~43,200\r\n• Padrão : 60",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1068": {
    title: {
      en: "Jamming Detection Cycle Timer 4 (seconds)",
      pt: "Tempo do Ciclo de Detecção de Bloqueio 4 (segundos)",
      es: "Tiempo del Ciclo de Detección de Interferencias 4 (segundos)",
    },
    tooltip: {
      en: "The device will check if jamming detection is still active after this time.\r\n• Range : 0~43,200\r\n• Default : 60",
      es: "El dispositivo verificará si la detección de interferencia sigue activa después de este tiempo.\r\n• Rango: 0~43,200\r\n• Predeterminado: 60",
      pt: "O dispositivo verificará se a detecção de interferência ainda está ativa após esse tempo.\r\n• Intervalo : 0~43,200\r\n• Padrão : 60",
    },
    min: 0,
    max: 43200,
    list: null,
  },
  "1069": {
    title: {
      en: "GNSS Report Mode",
      pt: "Modo de Relatório GNSS",
      es: "Modo de reporte GNSS",
    },
    tooltip: {
      en: "Settings for whether to include GNSS information when sending Status Report.\r\n• Default : On",
      es: "Configuraciones para incluir o no información GNSS al enviar el Informe de Estado.\r\n• Predeterminado: Activado",
      pt: "Configurações para incluir ou não informações GNSS ao enviar Relatório de Status.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1070": {
    title: {
      en: "TCP Keep Alive",
      pt: "TCP Keep Alive",
      es: "TCP Keep Alive",
    },
    tooltip: {
      en: "TCP Keep Alive maintains TCP connections during periods of no data transfer on specific networks.\r\n• Default : On, Off(STG)",
      es: "TCP Keep Alive mantiene las conexiones TCP durante períodos sin transferencia de datos en redes específicas.\r\n• Predeterminado: Activado, Desactivado(STG)",
      pt: "TCP Keep Alive mantém conexões TCP durante períodos de ausência de transferência de dados em redes específicas.\r\n• Padrão  : Ativado, Desligado(STG)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1071": {
    title: {
      en: "TCP Keep Alive Idle Time (seconds)",
      pt: "Tempo de Ociosidade do TCP Keep Alive (segundos)",
      es: "Tiempo de Inactividad de TCP Keep Alive (segundos)",
    },
    tooltip: {
      en: "Interval time for TCP keep-alive probes when the 1070 (TCP Keep Alive) function is enabled.\r\n• Range : 60~7,200, 1~1,800(EG915U)\r\n• Default : 150",
      es: "Tiempo de intervalo para las sondas TCP keep-alive cuando la función 1070 (TCP Keep Alive) está habilitada.\r\n• Rango: 60~7,200, 1~1,800(EG915U)\r\n• Predeterminado: 150",
      pt: "Tempo de intervalo para sondas de manutenção de TCP quando a função 1070 (TCP Keep Alive) está habilitada.\r\n• Intervalo : 60~7,200, 1~1,800(EG915U)\r\n• Padrão : 150",
    },
    min: 60,
    max: 7200,
    list: null,
  },
  "1072": {
    title: {
      en: "AES128",
      pt: "AES128",
      es: "AES128",
    },
    tooltip: {
      en: "Secure encryption method using a 128-bit key to protect data.\r\n• Default : Off",
      es: "Método de cifrado seguro que utiliza una clave de 128 bits para proteger los datos.\r\n• Predeterminado: Desactivado",
      pt: "Método de criptografia seguro usando uma chave de 128 bits para proteger os dados.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Reserved",
          es: "Reservado",
          pt: "Reservado",
        },
      },
      {
        value: "02",
        label: {
          en: "User Encyption Key",
          es: "Clave de Cifrado del Usuario",
          pt: "Chave de Criptografia do Usuário",
        },
      },
    ],
  },
  "1073": {
    title: {
      en: "AES128 Key",
      pt: "Chave AES128",
      es: "Clave AES128",
    },
    tooltip: {
      en: "User encryption key settings.\r\n* The AES128 Key must be 32 characters long and can only contain the characters A-Z, a-z, and 0-9.",
      es: "Configuraciones de la clave de cifrado del usuario.\r\n* La clave AES128 debe tener 32 caracteres y solo puede contener los caracteres A-Z, a-z y 0-9.",
      pt: "Configurações de chave de criptografia do usuário.\r\n* A chave AES128 deve ter 32 caracteres e pode conter apenas os caracteres A-Z, a-z e 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1074": {
    title: {
      en: "Send Interval in Emergency (seconds)",
    },
    tooltip: {
      en: "Interval to send the Emergency Mode.",
      es: "Configuración del intervalo para el envío de informes del Modo de Emergencia.",
      pt: "Configuração do intervalo para envio de relatórios do Modo de Emergência.",
    },
    min: 60,
    max: 99999,
    list: null,
  },
  "1075": {
    title: {
      en: "Emergency Report Type",
    },
    tooltip: {
      en: "Select Emergency Report Type.",
      es: "Seleccionar el Tipo de Informe de Emergencia.",
      pt: "Selecionar o Tipo de Relatório de Emergência.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Status Report",
          es: "Informe de Estado",
          pt: "Relatório de Status",
        },
      },
      {
        value: "01",
        label: {
          en: "Alert Report",
          es: "Informe de Alerta",
          pt: "Relatório de Alerta",
        },
      },
    ],
  },
  "1076": {
    title: {
      en: "NTP Server IP",
      pt: "IP do Servidor NTP",
      es: "IP del Servidor NTP",
    },
    tooltip: {
      en: "NTP Server Address for synchronizing RTC with NTP. \r\n• Default : time.windows.com \r\n* This can be a number in IP format or a domain name. \r\n* The DNS must be at least 5 characters and no longer than 64 characters, and can only contain the characters A-Z, a-z, 0-9, and symbols -,.",
      es: "Dirección del servidor NTP para sincronizar el RTC con NTP.\r\n• Predeterminado: time.windows.com\r\n* Esto puede ser un número en formato IP o un nombre de dominio.\r\n* El DNS debe tener al menos 5 y no más de 64 caracteres, y solo puede contener A-Z, a-z, 0-9 y los símbolos -,.",
      pt: "Endereço do Servidor NTP para sincronizar o RTC com o NTP.\r\n• Padrão : time.windows.com\r\n* Isso pode ser um número no formato IP ou um nome de domínio.\r\n* O DNS deve ter pelo menos 5 caracteres e no máximo 64 caracteres, e pode conter apenas os caracteres A-Z, a-z, 0-9 e os símbolos -,.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1077": {
    title: {
      en: "NTP Server Port",
      pt: "Porta do Servidor NTP",
      es: "Puerto del Servidor NTP",
    },
    tooltip: {
      en: "NTP Server Port for synchronizing RTC with NTP.\r\n• Range : 0~65535\r\n• Default : 123",
      es: "Puerto del servidor NTP para sincronizar el RTC con NTP.\r\n• Rango: 0~65535\r\n• Predeterminado: 123",
      pt: "Porta do Servidor NTP para sincronizar o RTC com o NTP.\r\n• Intervalo : 0~65535\r\n• Padrão : 123",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "1078": {
    title: {
      en: "Minimum Time of Mode",
      pt: "Tempo Mínimo do Modo",
      es: "Tiempo Mínimo del Modo",
    },
    tooltip: {
      en: "Minimum time settings for the Mode",
      es: "Configuraciones de tiempo mínimo para el modo.",
      pt: "Configurações mínimas de tempo para o modo.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1079": {
    title: {
      en: "Check Sent Data Count",
      pt: "Verificar Contagem de Dados Enviados",
      es: "Verificar Contador de Datos Enviados",
    },
    tooltip: {
      en: "Device checks the sent data count to ensure TCP messages are transmitted.\r\n• Default : On",
      es: "El dispositivo verifica el conteo de datos enviados para asegurar que los mensajes TCP sean transmitidos.\r\n• Predeterminado: Activado",
      pt: "O dispositivo verifica a contagem de dados enviados para garantir que as mensagens TCP sejam transmitidas.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1080": {
    title: {
      en: "Status Report Map",
      pt: "Mapa de Relatório de Status",
      es: "Mapa de reporte de estados",
    },
    tooltip: {
      en: "Setting report fields to be included in Status Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Estado.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório de Status.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reporte",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Cell ID",
          es: "ID de Celda",
          pt: "ID da Célula",
        },
      },
      {
        value: "b7",
        label: {
          en: "MCC",
          es: "MCC",
          pt: "MCC",
        },
      },
      {
        value: "b8",
        label: {
          en: "MNC",
          es: "MNC",
          pt: "MNC",
        },
      },
      {
        value: "b9",
        label: {
          en: "LAC – Local Area Code",
          es: "LAC – Código de Área Local",
          pt: "LAC – Código de Área Local",
        },
      },
      {
        value: "b10",
        label: {
          en: "RX_LVL",
          es: "RX_LVL",
          pt: "RX_LVL",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b13",
        label: {
          en: "Speed",
          es: "Velocidad",
          pt: "Velocidade",
        },
      },
      {
        value: "b14",
        label: {
          en: "Course/Heading",
          es: "Curso/Rumbo",
          pt: "Curso/Rumo",
        },
      },
      {
        value: "b15",
        label: {
          en: "Satellite Count",
          es: "Contador de Satélites",
          pt: "Contagem de Satélites",
        },
      },
      {
        value: "b16",
        label: {
          en: "GPS Fix Status",
          es: "Estado de fix GPS",
          pt: "Status de Fixação do GPS",
        },
      },
      {
        value: "b17",
        label: {
          en: "Input States",
          es: "Estado de Entradas",
          pt: "Estados de Entrada",
        },
      },
      {
        value: "b18",
        label: {
          en: "Output States",
          es: "Estado de Salidas",
          pt: "Estados de Saída",
        },
      },
      {
        value: "b19",
        label: {
          en: "Mode",
          es: "Modo",
          pt: "Modo",
        },
      },
      {
        value: "b20",
        label: {
          en: "Status Report Type",
          es: "Tipo de reporte de estados",
          pt: "Tipo de Relatório de Status",
        },
      },
      {
        value: "b21",
        label: {
          en: "Message Number",
          es: "Número de Mensaje",
          pt: "Número da Mensagem",
        },
      },
      {
        value: "b22",
        label: {
          en: "Reserved",
          es: "Reservado",
          pt: "Reservado",
        },
      },
      {
        value: "b23",
        label: {
          en: "Assign Map",
          es: "Asignar Mapa",
          pt: "Atribuir Mapa",
        },
      },
    ],
  },
  "1082": {
    title: {
      en: "Alert Report Map",
      pt: "Mapa de Relatório de Alerta",
      es: "Mapa de reportes de alerta",
    },
    tooltip: {
      en: "Setting report fields to be included in Alert Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Alerta.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório de Alerta.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de Informe",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Cell ID",
          es: "ID de Celda",
          pt: "ID da Célula",
        },
      },
      {
        value: "b7",
        label: {
          en: "MCC",
          es: "MCC",
          pt: "MCC",
        },
      },
      {
        value: "b8",
        label: {
          en: "MNC",
          es: "MNC",
          pt: "MNC",
        },
      },
      {
        value: "b9",
        label: {
          en: "LAC – Local Area Code",
          es: "LAC – Código de Área Local",
          pt: "LAC – Código de Área Local",
        },
      },
      {
        value: "b10",
        label: {
          en: "RX_LVL",
          es: "RX_LVL",
          pt: "RX_LVL",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b13",
        label: {
          en: "Speed",
          es: "Velocidad",
          pt: "Velocidade",
        },
      },
      {
        value: "b14",
        label: {
          en: "Course/Heading",
          es: "Curso/Rumbo",
          pt: "Curso/Rumo",
        },
      },
      {
        value: "b15",
        label: {
          en: "Satellite Count",
          es: "Contador de Satélites",
          pt: "Contagem de Satélites",
        },
      },
      {
        value: "b16",
        label: {
          en: "GPS Fix Status",
          es: "Estado de Fijación del GPS",
          pt: "Status de Fixação do GPS",
        },
      },
      {
        value: "b17",
        label: {
          en: "Input States",
          es: "Estados de Entrada",
          pt: "Estados de Entrada",
        },
      },
      {
        value: "b18",
        label: {
          en: "Output States",
          es: "Estados de Salida",
          pt: "Estados de Saída",
        },
      },
      {
        value: "b19",
        label: {
          en: "Mode",
          es: "Modo",
          pt: "Modo",
        },
      },
      {
        value: "b20",
        label: {
          en: "Status Report Type",
          es: "Tipo de Informe de Estado",
          pt: "Tipo de Relatório de Status",
        },
      },
      {
        value: "b21",
        label: {
          en: "Message Number",
          es: "Número de Mensaje",
          pt: "Número da Mensagem",
        },
      },
      {
        value: "b22",
        label: {
          en: "Reserved",
          es: "Reservado",
          pt: "Reservado",
        },
      },
      {
        value: "b23",
        label: {
          en: "Assign Map",
          es: "Asignar Mapa",
          pt: "Atribuir Mapa",
        },
      },
    ],
  },
  "1084": {
    title: {
      en: "External Serial Report Map",
      pt: "Mapa de Relatório de Serial Externo",
      es: "Mapa de reporte de serial externo",
    },
    tooltip: {
      en: "Setting report fields to be included in the External Serial Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe Serial Externo.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório Serial Externo.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes de alerta",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data\r\nHora",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "ID da Célula",
        },
      },
      {
        value: "b6",
        label: {
          en: "Cell ID",
          es: "ID de Celda",
          pt: "MCC\r\nMNC",
        },
      },
      {
        value: "b7",
        label: {
          en: "MCC",
          es: "MCC",
          pt: "LAC – Código de Área Local",
        },
      },
      {
        value: "b8",
        label: {
          en: "MNC",
          es: "MNC",
          pt: "RX_LVL",
        },
      },
      {
        value: "b9",
        label: {
          en: "LAC – Local Area Code",
          es: "LAC – Código de Área Local",
          pt: "Latitude",
        },
      },
      {
        value: "b10",
        label: {
          en: "RX_LVL",
          es: "RX_LVL",
          pt: "Longitude",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Velocidade",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Curso/Rumo",
        },
      },
      {
        value: "b13",
        label: {
          en: "Speed",
          es: "Velocidad",
          pt: "Contagem de Satélites",
        },
      },
      {
        value: "b14",
        label: {
          en: "Course/Heading",
          es: "Curso/Rumbo",
          pt: "Status de Fixação do GPS",
        },
      },
      {
        value: "b15",
        label: {
          en: "Satellite Count",
          es: "Contador de Satélites",
          pt: "Estados de Entrada",
        },
      },
      {
        value: "b16",
        label: {
          en: "GPS Fix Status",
          es: "Estado de fix GPS",
          pt: "Estados de Saída",
        },
      },
      {
        value: "b17",
        label: {
          en: "Input States",
          es: "Estado de Entradas",
          pt: "Comprimento dos Dados",
        },
      },
      {
        value: "b18",
        label: {
          en: "Output States",
          es: "Estados de Salida",
          pt: "Dados",
        },
      },
      {
        value: "b19",
        label: {
          en: "Length of Data",
          es: "Longitud de los Datos",
          pt: "Checksum",
        },
      },
      {
        value: "b20",
        label: {
          en: "Data",
          es: "Datos",
        },
      },
      {
        value: "b21",
        label: {
          en: "Checksum",
          es: "Checksum",
        },
      },
    ],
  },
  "1086": {
    title: {
      en: "Travel Event",
      pt: "Evento de Viagem",
      es: "Evento de Viaje",
    },
    tooltip: {
      en: "When the ignition is turned off, it reports summarized driving information.\r\n• Default : Off",
      es: "Cuando se apaga la ignición, se revela información resumida de conducción.\r\n• Predeterminado: Desactivado",
      pt: "Quando a ignição é desligada, ele reporta informações resumidas da condução.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1087": {
    title: {
      en: "Travel Report Map",
      pt: "Mapa de Relatório de Viagem",
      es: "Mapa de reportes de viaje",
    },
    tooltip: {
      en: "Setting report fields to be included in the Travel Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Viaje.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório de Viagem.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Travel Start Latitude",
          es: "Latitud de Inicio de Viaje",
          pt: "Latitude de Início da Viagem",
        },
      },
      {
        value: "b7",
        label: {
          en: "Travel Start Longitude",
          es: "Longitud de Inicio de Viaje",
          pt: "Longitude de Início da Viagem",
        },
      },
      {
        value: "b8",
        label: {
          en: "Travel End Latitude",
          es: "Latitud de Fin de Viaje",
          pt: "Latitude de Fim da Viagem",
        },
      },
      {
        value: "b9",
        label: {
          en: "Travel End Longitude",
          es: "Longitud de Fin de Viaje",
          pt: "Longitude de Fim da Viagem",
        },
      },
      {
        value: "b10",
        label: {
          en: "Driver ID",
          es: "ID del Conductor",
          pt: "ID do Motorista",
        },
      },
      {
        value: "b11",
        label: {
          en: "Travel Distance",
          es: "Distancia del Viaje",
          pt: "Distância de Viagem",
        },
      },
      {
        value: "b12",
        label: {
          en: "Driving Time",
          es: "Tiempo de Conducción",
          pt: "Tempo de Condução",
        },
      },
      {
        value: "b13",
        label: {
          en: "Time in Idle Mode",
          es: "Tiempo en Modo de Inactividad",
          pt: "Tempo em Modo de Inatividade",
        },
      },
      {
        value: "b14",
        label: {
          en: "Idle events",
          es: "Eventos de Inactividad",
          pt: "Eventos de Inatividade",
        },
      },
      {
        value: "b15",
        label: {
          en: "Time in Speed Mode",
          es: "Tiempo en Modo de Velocidad",
          pt: "Tempo em Modo de Velocidade",
        },
      },
      {
        value: "b16",
        label: {
          en: "Speed Mode",
          es: "Modo de Velocidad",
          pt: "Modo de Velocidade",
        },
      },
      {
        value: "b17",
        label: {
          en: "Maximum Speed",
          es: "Velocidad Máxima",
          pt: "Velocidade Máxima",
        },
      },
      {
        value: "b18",
        label: {
          en: "Average Speed",
          es: "Velocidad Promedio",
          pt: "Velocidade Média",
        },
      },
      {
        value: "b19",
        label: {
          en: "Odometer",
          es: "Odómetro",
          pt: "Odômetro",
        },
      },
      {
        value: "b20",
        label: {
          en: "Speed Histogram",
          es: "Histograma de Velocidad",
          pt: "Histograma de Velocidade",
        },
      },
      {
        value: "b21",
        label: {
          en: "Reserved",
          es: "Reserved",
          pt: "Reserved",
        },
      },
      {
        value: "b22",
        label: {
          en: "Reserved",
          es: "Reserved",
          pt: "Reserved",
        },
      },
      {
        value: "b23",
        label: {
          en: "Time Eco Up",
          es: "Tiempo Eco Subida",
          pt: "Tempo Eco Subida",
        },
      },
      {
        value: "b24",
        label: {
          en: "Time Eco Down",
          es: "Tiempo Eco Bajada",
          pt: "Tempo Eco Descida",
        },
      },
      {
        value: "b25",
        label: {
          en: "Time Eco INSIDE",
          es: "Tiempo Eco Dentro",
          pt: "Tempo Eco Dentro",
        },
      },
      {
        value: "b26",
        label: {
          en: "Time Over RPM",
          es: "Tiempo Sobre RPM",
          pt: "Tempo Acima do RPM",
        },
      },
      {
        value: "b27",
        label: {
          en: "Time Dead Center",
          es: "Tiempo Punto Muerto",
          pt: "Tempo Ponto Morto",
        },
      },
    ],
  },
  "1088": {
    title: {
      en: "OBD Travel Report",
      pt: "Relatório de Viagem OBD",
      es: "Reporte de viaje OBD",
    },
    tooltip: {
      en: "The OBD Travel report is sent to the server when the vehicle enters parking mode.\r\n• Default : Off",
      es: "El informe de Viaje OBD se envía al servidor cuando el vehículo entra en modo de estacionamiento.\r\n• Predeterminado: Desactivado",
      pt: "O relatório de Viagem OBD é enviado ao servidor quando o veículo entra no modo de estacionamento.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1089": {
    title: {
      en: "OBD Travel Report Map",
      pt: "Mapa de Relatório de Viagem OBD",
      es: "Mapa de reporte de Viaje OBD",
    },
    tooltip: {
      en: "Setting report fields to be included in the OBD Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe OBD.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório OBD.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "OTR Report Map",
          es: "Mapa de reporte OTR",
          pt: "Mapa de Relatório OTR",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Vehicle ID",
          es: "ID del Vehículo",
          pt: "ID do Veículo",
        },
      },
      {
        value: "b7",
        label: {
          en: "DTC Count",
          es: "Contador de DTC",
          pt: "Contagem de DTC",
        },
      },
      {
        value: "b8",
        label: {
          en: "MIL Indicator",
          es: "Indicador MIL",
          pt: "Indicador MIL",
        },
      },
      {
        value: "b9",
        label: {
          en: "MIL On Time",
          es: "Tiempo con MIL Activado",
          pt: "Tempo com MIL Ligado",
        },
      },
      {
        value: "b10",
        label: {
          en: "MIL On Distance",
          es: "Distancia con MIL Activado",
          pt: "Distância com MIL Ligado",
        },
      },
      {
        value: "b11",
        label: {
          en: "Trip Distance",
          es: "Distancia del Viaje",
          pt: "Distância da Viagem",
        },
      },
      {
        value: "b12",
        label: {
          en: "Engine Run Time",
          es: "Tiempo de Funcionamiento del Motor",
          pt: "Tempo de Funcionamento do Motor",
        },
      },
      {
        value: "b13",
        label: {
          en: "Run Time",
          es: "Tiempo de Funcionamiento",
          pt: "Tempo de Funcionamento",
        },
      },
      {
        value: "b14",
        label: {
          en: "Max Speed",
          es: "Velocidad Máxima",
          pt: "Velocidade Máxima",
        },
      },
      {
        value: "b15",
        label: {
          en: "Avg Speed",
          es: "Velocidad Promedio",
          pt: "Velocidade Média",
        },
      },
      {
        value: "b16",
        label: {
          en: "Max RPM",
          es: "RPM Máximo",
          pt: "RPM Máxima",
        },
      },
      {
        value: "b17",
        label: {
          en: "Avg RPM",
          es: "RPM Promedio",
          pt: "RPM Média",
        },
      },
      {
        value: "b18",
        label: {
          en: "RPM Exceeds Count",
          es: "Contador de Excesos de RPM",
          pt: "Contagem de Excedentes de RPM",
        },
      },
      {
        value: "b19",
        label: {
          en: "Max Engine Oil Temp",
          es: "Temperatura Máxima del Aceite del Motor",
          pt: "Temperatura Máxima do Óleo do Motor",
        },
      },
      {
        value: "b20",
        label: {
          en: "Avg Coolant Temp",
          es: "Temperatura Promedio del Refrigerante",
          pt: "Temperatura Média do Líquido de Arrefecimento",
        },
      },
      {
        value: "b21",
        label: {
          en: "Fuel Level (%)",
          es: "Nivel de Combustible (%)",
          pt: "Nível de Combustível (%)",
        },
      },
      {
        value: "b22",
        label: {
          en: "Fuel Level Change (%)",
          es: "Cambio en el Nivel de Combustible (%)",
          pt: "Mudança no Nível de Combustível (%)",
        },
      },
      {
        value: "b23",
        label: {
          en: "Fuel Economy (km/L)",
          es: "Economía de Combustible (km/L)",
          pt: "Economia de Combustível (km/L)",
        },
      },
      {
        value: "b24",
        label: {
          en: "Fuel Usage in Idle Mode (%)",
          es: "Uso de Combustible en Modo de Inactividad (%)",
          pt: "Uso de Combustível no Modo Inativo (%)",
        },
      },
      {
        value: "b25",
        label: {},
      },
      {
        value: "b26",
        label: {},
      },
    ],
  },
  "1090": {
    title: {
      en: "OBDII Report",
      pt: "Relatório OBDII",
      es: "Informe OBDII",
    },
    tooltip: {
      en: "The OBDII report is sent to the server when the vehicle starts driving.\r\n• Default : Off",
      es: "El informe OBDII se envía al servidor cuando el vehículo comienza a conducir.\r\n• Predeterminado: Desactivado",
      pt: 'O relatório OBDII é enviado ao servidor quando o veículo começa a dirigir.\r\n• Padrão  : Desativado"',
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1091": {
    title: {
      en: "OBDII Report Map",
      pt: "Mapa de Relatório OBDII",
      es: "Mapa de Informe OBDII",
    },
    tooltip: {
      en: "Setting report fields to be included in the OBDII Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe OBDII.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório OBDII.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "OBD Report Map",
          es: "Mapa de Informe OBD",
          pt: "Mapa de Relatório OBD",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Vehicle ID",
          es: "ID del Vehículo",
          pt: "ID do Veículo",
        },
      },
      {
        value: "b7",
        label: {
          en: "OBD Type",
          es: "Tipo OBD",
          pt: "Tipo OBD",
        },
      },
      {
        value: "b8",
        label: {
          en: "DTC Count",
          es: "Contador de DTC",
          pt: "Contagem de DTC",
        },
      },
      {
        value: "b9",
        label: {
          en: "MIL Indicator",
          es: "Indicador MIL",
          pt: "Indicador MIL",
        },
      },
      {
        value: "b10",
        label: {
          en: "MIL On Time",
          es: "Tiempo con MIL Activado",
          pt: "Tempo com MIL Ligado",
        },
      },
      {
        value: "b11",
        label: {
          en: "MIL On Distance",
          es: "Distancia con MIL Activado",
          pt: "Distância com MIL Ligado",
        },
      },
      {
        value: "b12",
        label: {
          en: "Odometer",
          es: "Odómetro",
          pt: "Odômetro",
        },
      },
      {
        value: "b13",
        label: {
          en: "Engine Run Time",
          es: "Tiempo de Funcionamiento del Motor",
          pt: "Tempo de Funcionamento do Motor",
        },
      },
      {
        value: "b14",
        label: {
          en: "Fuel Type",
          es: "Tipo de Combustible",
          pt: "Tipo de Combustível",
        },
      },
      {
        value: "b15",
        label: {
          en: "Fuel Level (%)",
          es: "Nivel de Combustible (%)",
          pt: "Nível de Combustível (%)",
        },
      },
      {
        value: "b16",
        label: {
          en: "PIDs Bitmask (0x01–0x20)",
          es: "Máscara de PIDs (0x01–0x20)",
          pt: "Máscara de PIDs (0x01–0x20)",
        },
      },
      {
        value: "b17",
        label: {
          en: "PIDs Bitmask (0x21–0x40)",
          es: "Máscara de PIDs (0x21–0x40)",
          pt: "Máscara de PIDs (0x21–0x40)",
        },
      },
      {
        value: "b18",
        label: {
          en: "PIDs Bitmask (0x41–0x60)",
          es: "Máscara de PIDs (0x41–0x60)",
          pt: "Máscara de PIDs (0x41–0x60)",
        },
      },
      {
        value: "b19",
        label: {
          en: "PIDs Bitmask (0x61–0x80)",
          es: "Máscara de PIDs (0x61–0x80)",
          pt: "Máscara de PIDs (0x61–0x80)",
        },
      },
    ],
  },
  "1092": {
    title: {
      en: "CAM Report Map",
      pt: "Mapa de Relatório CAM",
      es: "Mapa de reporte CAM",
    },
    tooltip: {
      en: "Setting report fields to be included in the CAM Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe CAM.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório CAM.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Cell ID",
          es: "ID de Celda",
          pt: "ID da Célula",
        },
      },
      {
        value: "b7",
        label: {
          en: "MCC",
          es: "MCC",
          pt: "MCC",
        },
      },
      {
        value: "b8",
        label: {
          en: "MNC",
          es: "MNC",
          pt: "MNC",
        },
      },
      {
        value: "b9",
        label: {
          en: "LAC – Local Area Code",
          es: "LAC – Código de Área Local",
          pt: "LAC – Código de Área Local",
        },
      },
      {
        value: "b10",
        label: {
          en: "RX_LVL",
          es: "RX_LVL",
          pt: "RX_LVL",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b13",
        label: {
          en: "Speed",
          es: "Velocidad",
          pt: "Velocidade",
        },
      },
      {
        value: "b14",
        label: {
          en: "Course/Heading",
          es: "Curso/Rumbo",
          pt: "Curso/Rumo",
        },
      },
      {
        value: "b15",
        label: {
          en: "Satellite Count",
          es: "Contador de Satélites",
          pt: "Contagem de Satélites",
        },
      },
      {
        value: "b16",
        label: {
          en: "GPS Fix Status",
          es: "Estado de fix GPS",
          pt: "Status de Fixação do GPS",
        },
      },
      {
        value: "b17",
        label: {
          en: "Input States",
          es: "Estados de Entrada",
          pt: "Estados de Entrada",
        },
      },
      {
        value: "b18",
        label: {
          en: "Output States",
          es: "Estados de Salida",
          pt: "Estados de Saída",
        },
      },
      {
        value: "b19",
        label: {
          en: "Pack Number",
          es: "Número de Paquete",
          pt: "Número do Pacote",
        },
      },
      {
        value: "b20",
        label: {
          en: "Total Packet Size",
          es: "Tamaño Total del Paquete",
          pt: "Tamanho Total do Pacote",
        },
      },
      {
        value: "b21",
        label: {
          en: "Packet Size",
          es: "Tamaño del Paquete",
          pt: "Tamanho do Pacote",
        },
      },
      {
        value: "b22",
        label: {
          en: "Packet Data",
          es: "Datos del Paquete",
          pt: "Dados do Pacote",
        },
      },
    ],
  },
  "1093": {
    title: {
      en: "PID Report",
      pt: "Relatório PID",
      es: "Informe PID",
    },
    tooltip: {
      en: "The PID report is sent to the server along with the periodic Status Report.\r\n• Default : Off",
      es: "El informe PID se envía al servidor junto con el Informe de Estado periódico.\r\n• Predeterminado: Desactivado",
      pt: "O relatório PID é enviado ao servidor junto com o Relatório de Status periódico.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1094": {
    title: {
      en: "PID Report Map",
      pt: "Mapa de Relatório PID",
      es: "Mapa de reporte PID",
    },
    tooltip: {
      en: "Setting report fields to be included in the PID Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe PID.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório PID.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "PID Report Map",
          es: "Mapa de reporte PID",
          pt: "Mapa de Relatório PID",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "PID_DATA Length",
          es: "Longitud de PID_DATA",
          pt: "Comprimento dos DADOS_PID",
        },
      },
      {
        value: "b7",
        label: {
          en: "PID_DATA",
          es: "PID_DATA",
          pt: "DADOS_PID",
        },
      },
      {
        value: "b8",
        label: {
          en: "8-bit PID_DATA Checksum",
          es: "Checksum de PID_DATA de 8 bits",
          pt: "Checksum de DADOS_PID de 8 bits",
        },
      },
    ],
  },
  "1095": {
    title: {
      en: "OVD Report",
      pt: "Relatório OVD",
      es: "Reporte OVD",
    },
    tooltip: {
      en: "The OVD report is sent to the Maintenance server.\r\n• Default : Off",
      es: "El informe OVD se envía al servidor de Mantenimiento.\r\n• Predeterminado: Desactivado",
      pt: "O relatório OVD é enviado para o servidor de manutenção.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1096": {
    title: {
      en: "OVD Report Map",
      pt: "Mapa do Relatório OVD",
      es: "Mapa de reporte OVD",
    },
    tooltip: {
      en: "Setting report fields to be included in the OVD Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe OVD.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório OVD.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "OVD Report Map",
          es: "Mapa de reporte OVD",
          pt: "Mapa do Relatório OVD",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "OVD_DATA Length",
          es: "Longitud de OVD_DATA",
          pt: "Comprimento do Dado OVD",
        },
      },
      {
        value: "b7",
        label: {
          en: "OVD_DATA",
          es: "OVD_DATA",
          pt: "Dado OVD",
        },
      },
      {
        value: "b8",
        label: {
          en: "8-bit OVD_DATA Checksum",
          es: "Checksum de OVD_DATA de 8 bits",
          pt: "Checksum de 8 bits do Dado OVD",
        },
      },
    ],
  },
  "1097": {
    title: {
      en: "PRM Report",
      pt: "Relatório PRM",
      es: "Reporte PRM",
    },
    tooltip: {
      en: "Use of PRM Report.\r\n• Default : On(STG), Off(USA/EU)",
      es: "Uso del Informe PRM.\r\n• Predeterminado: Activado (STG), Desactivado (EE. UU./UE)",
      pt: "Uso do Relatório PRM.\r\n• Padrão  : Ativado (STG), Desligado (EUA/UE)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1099": {
    title: {
      en: "Wi-Fi Report",
      pt: "Relatório Wi-Fi",
      es: "Reporte Wi-Fi",
    },
    tooltip: {
      en: "Assigning the MAC address field of Wi-Fi in Status Report and Alert Report.\r\n• Default : Off\r\n* This is activated only when the GPS is not fixed.\r\n* Need to assign the Wi-Fi field in the Assign Header.",
      es: "Asignación del campo de dirección MAC de Wi-Fi en el Informe de Estado e Informe de Alerta.\r\n• Predeterminado: Desactivado\r\n\r\nEsto se activa solo cuando el GPS no está fijado.\r\nEs necesario asignar el campo de Wi-Fi en el Encabezado de Asignación.",
      pt: "Atribuição do campo de endereço MAC do Wi-Fi no Relatório de Status e no Relatório de Alerta.\r\n• Padrão  : Desativado\r\n* Isso é ativado apenas quando o GPS não está fixo.\r\n* É necessário atribuir o campo Wi-Fi no Cabeçalho Atribuído.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1300": {
    title: {
      en: "Ignition On (33)",
      pt: "Ignição Ligada (33)",
      es: "Ignición activa (33)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1301": {
    title: {
      en: "Ignition Off (34)",
      pt: "Ignição Desligada (34)",
      es: "Ignición apagada (34)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1302": {
    title: {
      en: "Enter Drive Mode (29)",
      pt: "Entrar no Modo de Condução (29)",
      es: "Entrar en Modo de Conducción (29)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1304": {
    title: {
      en: "Enter Park Mode (31)",
      pt: "Entrar no Modo de Estacionamento (31)",
      es: "Entrar en Modo de Estacionamiento (31)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1306": {
    title: {
      en: "Enter Idle Mode (68)",
      pt: "Entrar no Modo de Inatividade (68)",
      es: "Entrar en Modo de Inactividad (68)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1308": {
    title: {
      en: "Excess Idle (35)",
      pt: "Excesso de Inatividade (35)",
      es: "Exceso de Inactividad (35)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1311": {
    title: {
      en: "Enter Speeding Mode (36)",
      pt: "Entrar no Modo de Excesso de Velocidade (36)",
      es: "Entrar en Modo de Exceso de Velocidad (36)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1313": {
    title: {
      en: "Over Speed (1)",
      pt: "Velocidade Excessiva (1)",
      es: "Velocidad Excesiva (1)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1314": {
    title: {
      en: "Under Speed (2)",
      pt: "Velocidade Abaixo do Permitido (2)",
      es: "Velocidad por Debajo del Límite (2)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1321": {
    title: {
      en: "Enter Speeding Mode (36)",
      pt: "Entrar no Modo de Excesso de Velocidade (36)",
      es: "Entrar en Modo de Exceso de Velocidad (36)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1325": {
    title: {
      en: "Enter Sleep (9)",
      pt: "Entrar no Modo de Suspensão (9)",
      es: "Entrar en modo sleep (9)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1326": {
    title: {
      en: "Exit Sleep (10)",
      pt: "Sair do Modo de Suspensão (10)",
      es: "Salir de modo sleep(10)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1328": {
    title: {
      en: "Back-Up Battery Low (43)",
      pt: "Bateria de Backup Baixa (43)",
      es: "Batería de Respaldo Baja (43)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1329": {
    title: {
      en: "Power Up (99)",
      pt: "Ligar (99)",
      es: "Activado (99)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1330": {
    title: {
      en: "Main Power Connected (40)",
      pt: "Energia Principal Conectada (40)",
      es: "Energía Principal Conectada (40)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1331": {
    title: {
      en: "Main Power Disconnected (41)",
      pt: "Energia Principal Desconectada (41)",
      es: "Energía Principal Desconectada (41)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1332": {
    title: {
      en: "Connected to Back-up Battery (44)",
      pt: "Conectado à Bateria de Backup (44)",
      es: "Conectado a la Batería de Respaldo (44)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1333": {
    title: {
      en: "Disconnected from Back-Up Battery (45)",
      pt: "Desconectado da Bateria de Backup (45)",
      es: "Desconectado de la Batería de Respaldo (45)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1334": {
    title: {
      en: "Battery Error (13)",
      pt: "Erro na Bateria (13)",
      es: "Error de Batería (13)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1335": {
    title: {
      en: "Battery Low (14)",
      pt: "Bateria Baixa (14)",
      es: "Batería Baja (14)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1336": {
    title: {
      en: "GPS Antenna Disconnected (3)",
      pt: "Antena GPS Desconectada (3)",
      es: "Antena GPS Desconectada (3)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1337": {
    title: {
      en: "GPS Antenna Connected (4)",
      pt: "Antena GPS Conectada (4)",
      es: "Antena GPS Conectada (4)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1338": {
    title: {
      en: "GPS Antenna Shorted (8)",
      pt: "Antena GPS em Curto (8)",
      es: "Antena GPS en Cortocircuito (8)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1339": {
    title: {
      en: "Sim Card Removed (72)",
      pt: "Cartão SIM Removido (72)",
      es: "Tarjeta SIM Removida (72)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1340": {
    title: {
      en: "Mode Change (18)",
      pt: "Mudança de Modo (18)",
      es: "Cambio de Modo (18)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1341": {
    title: {
      en: "Shutdown (55)",
      pt: "Desligamento (55)",
      es: "Desactivado (55)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1342": {
    title: {
      en: "Detection of Light (20)",
      pt: "Detecção de Luz (20)",
      es: "Detección de Luz (20)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1350": {
    title: {
      en: "Shocked (15)",
      pt: "Impacto Detectado (15)",
      es: "Impacto Detectado (15)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1351": {
    title: {
      en: "Collision Detected (16)",
      pt: "Colisão Detectada (16)",
      es: "Colisión Detectada (16)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1352": {
    title: {
      en: "Motion Detected (17)",
      pt: "Movimento Detectado (17)",
      es: "Movimiento Detectado (17)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1354": {
    title: {
      en: "Alert of Fast Acceleration: Driver Pattern (46)",
      pt: "Alerta de Aceleração Rápida: Padrão de Condução (46)",
      es: "Alerta de Aceleración Rápida: Patrón de Conducción (46)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1355": {
    title: {
      en: "Power Key Pressed from low-battery (55)",
      pt: "Tecla de Energia Pressionada com Bateria Baixa (55)",
      es: "Tecla de Activado Presionada con Batería Baja (55)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1356": {
    title: {
      en: "Sharp turn left alert: Driver Pattern (48)",
      pt: "Alerta de Curva Acentuada à Esquerda: Padrão de Condução (48)",
      es: "Alerta de Giro Brusco a la Izquierda: Patrón de Conducción (48)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1357": {
    title: {
      en: "Sharp turn right alert: Driver Pattern (49)",
      pt: "Alerta de Curva Acentuada à Direita: Padrão de Condução (49)",
      es: "Alerta de Giro Brusco a la Derecha: Patrón de Conducción (49)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1360": {
    title: {
      en: "Driver Pattern Calibrated (21)",
      pt: "Padrão de Condução Calibrado (21)",
      es: "Patrón de Conducción Calibrado (21)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1365": {
    title: {
      en: "Exit Circular Geofence (5)",
      pt: "Saída de Geofence Circular (5)",
      es: "Salir de Geocerca Circular (5)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1366": {
    title: {
      en: "Enter Circular Geofence (6)",
      pt: "Entrada em Geofence Circular (6)",
      es: "Entrar en Geocerca Circular (6)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1367": {
    title: {
      en: "Exit Poly Geofence (74)",
      pt: "Saída de Geofence Poligonal (74)",
      es: "Salir de Geocerca Poligonal (74)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1368": {
    title: {
      en: "Enter Poly Geofence (79)",
      pt: "Entrada em Geofence Poligonal (79)",
      es: "Entrar en Geocerca Poligonal (79)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1371": {
    title: {
      en: "Alert Input goes to Open status (11)",
      pt: "Alerta de Entrada vai para Status Aberto (11)",
      es: "Alerta de Entrada va a Estado Abierto (11)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1372": {
    title: {
      en: "Alert Input goes to Ground (12)",
      pt: "Alerta de Entrada vai para Status Aterramento (12)",
      es: "Alerta de Entrada va a Estado de Tierra (12)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1373": {
    title: {
      en: "Alert Enter Disconnect Mode (144)",
      pt: "Alerta de Entrada no Modo de Desconexão (144)",
      es: "Alerta de Entrada en Modo de Desconexión (144)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1377": {
    title: {
      en: "Alert Enter Normal Mode (3)",
      pt: "Alerta de Entrada no Modo Normal (3)",
      es: "Alerta de Entrada en Modo Normal (3)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1400": {
    title: {
      en: "Temp High (75)",
      pt: "Temperatura Alta (75)",
      es: "Temperatura Alta (75)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1401": {
    title: {
      en: "Temp Low (76)",
      pt: "Temperatura Baixa (76)",
      es: "Temperatura Baja (76)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1402": {
    title: {
      en: "Temp Return (77)",
      pt: "Retorno de Temperatura (77)",
      es: "Retorno de Temperatura (77)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1403": {
    title: {
      en: "I-button Inserted/Read (59)",
      pt: "I-button Inserido/Lido (59)",
      es: "I-button Insertado/Leyó (59)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1404": {
    title: {
      en: "I-button Removed (60)",
      pt: "I-button Removido (60)",
      es: "I-button Removido (60)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1405": {
    title: {
      en: "RFID Tag Detection (93)",
      pt: "Detecção de Tag RFID (93)",
      es: "Detección de Etiqueta RFID (93)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1406": {
    title: {
      en: "Voice Call (67)",
      pt: "Chamada de Voz (67)",
      es: "Llamada de Voz (67)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1407": {
    title: {
      en: "RS232 Connection/Disconnection (69)",
      pt: "Conexão/Desconexão RS232 (69)",
      es: "Conexión/Desconexión RS232 (69)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1413": {
    title: {
      en: "OBD Disconnected (80)",
      pt: "OBD Desconectado (80)",
      es: "OBD Desconectado (80)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1414": {
    title: {
      en: "OBD Reconnected (81)",
      pt: "OBD Reconectado (81)",
      es: "OBD Reconectado (81)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1415": {
    title: {
      en: "OBD DTC Detected (83)",
      pt: "DTC OBD Detectado (83)",
      es: "DTC OBD Detectado (83)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1416": {
    title: {
      en: "OBD DTC Cleared (84)",
      pt: "DTC OBD Desactivado (84)",
      es: "DTC OBD Borrado (84)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1417": {
    title: {
      en: "GPS Fix (97)",
      pt: "Fixação GPS (97)",
      es: "Fijación GPS (97)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1418": {
    title: {
      en: "ST25T Connect (85)",
      pt: "Conexão ST25T (85)",
      es: "Conexión ST25T (85)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1419": {
    title: {
      en: "ST25T Disconnect (86)",
      pt: "Desconexão ST25T (86)",
      es: "Desconexión ST25T (86)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1420": {
    title: {
      en: "RS232 Fuel Net Address Scan Fail (87)",
      pt: "Falha na Varredura de Endereço de Rede de Combustível RS232 (87)",
      es: "Fallo en Escaneo de Dirección de Red de Combustible RS232 (87)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1421": {
    title: {
      en: "RS232 Fuel Max Level Excess (88)",
      pt: "Excesso de Nível Máximo de Combustível RS232 (88)",
      es: "Exceso de Nivel Máximo de Combustible RS232 (88)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1422": {
    title: {
      en: "Fuel Connect (89)",
      pt: "Conexão de Combustível (89)",
      es: "Conexión de Combustible (89)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1423": {
    title: {
      en: "Fuel Disconnect (90)",
      pt: "Desconexão de Combustível (90)",
      es: "Desconexión de Combustible (90)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1424": {
    title: {
      en: "Fuel Level Lower (91)",
      pt: "Nível de Combustível Baixo (91)",
      es: "Nivel de Combustible Bajo (91)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1425": {
    title: {
      en: "Fuel Level Upper (92)",
      pt: "Nível de Combustível Alto (92)",
      es: "Nivel de Combustible Alto (92)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1426": {
    title: {
      en: "Engine: Exceed Speed (61)",
      pt: "Motor: Excesso de Velocidade (61)",
      es: "Motor: Exceso de Velocidad (61)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1427": {
    title: {
      en: "Engine: Vehicle Speed Violation (62)",
      pt: "Motor: Violação de Velocidade do Veículo (62)",
      es: "Motor: Exceso de Velocidad del Vehículo (62)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1428": {
    title: {
      en: "Engine: Coolant Temperature Violation (63)",
      pt: "Motor: Violação de Temperatura do Líquido de Arrefecimento (63)",
      es: "Motor: Exceso de temperatura de refrigerante (63)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1429": {
    title: {
      en: "Engine: Oil Pressure Violation (64)",
      pt: "Motor: Violação de Pressão do Óleo (64)",
      es: "Motor: Abuso de Presión del Aceite (64)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1430": {
    title: {
      en: "Engine: RPM Violation (65)",
      pt: "Motor: Violação de RPM (65)",
      es: "Motor: Exceso de RPM (65)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1431": {
    title: {
      en: "Engine: Error Code - DTC (66)",
      pt: "Motor: Código de Erro - DTC (66)",
      es: "Motor: Código de Error - DTC (66)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1432": {
    title: {
      en: "ST20U Connect (70)",
      pt: "Conexão ST20U (70)",
      es: "Conexión ST20U (70)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1433": {
    title: {
      en: "ST20U Disconnect (71)",
      pt: "Desconexão ST20U (71)",
      es: "Desconexión ST20U (71)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1434": {
    title: {
      en: "Over Speed in Polygon (100)",
      pt: "Excesso de Velocidade em Polígono (100)",
      es: "Exceso de Velocidad en Polígono (100)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1435": {
    title: {
      en: "Under Speed in Polygon (101)",
      pt: "Velocidade Abaixo do Permitido em Polígono (101)",
      es: "Velocidad por Debajo del Límite en Polígono (101)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1437": {
    title: {
      en: "Magnet Detected (56)",
      pt: "Ímã Detectado (56)",
      es: "Imán Detectado (56)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1438": {
    title: {
      en: "Magnet Released (57)",
      pt: "Ímã Solto (57)",
      es: "Imán Liberado (57)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1443": {
    title: {
      en: "Alert by Panic Button (42)",
      pt: "Alerta por Botão de Pânico (42)",
      es: "Alerta por Botón de Pánico (42)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1444": {
    title: {
      en: "Violation by Anti-theft (73)",
      pt: "Violação por Anti-roubo (73)",
      es: "Abuso por Antirrobo (73)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1445": {
    title: {
      en: "OBD Parameter Setting Completed (82)",
      pt: "Configuração de Parâmetro OBD Concluída (82)",
      es: "Configuración de Parámetro OBD Completada (82)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1446": {
    title: {
      en: "MDSM-7 Event (103)",
      pt: "Evento MDSM-7 (103)",
      es: "Evento MDSM-7 (103)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1447": {
    title: {
      en: "MDAS-9 Event (104)",
      pt: "Evento MDAS-9 (104)",
      es: "Evento MDAS-9 (104)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1453": {
    title: {
      en: "Over Speed in Circular (129)",
      pt: "Excesso de Velocidade em Circular (129)",
      es: "Exceso de Velocidad en Circular (129)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1454": {
    title: {
      en: "Under Speed in Circular (130)",
      pt: "Velocidade Abaixo do Permitido em Circular (130)",
      es: "Velocidad por Debajo del Límite en Circular (130)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1455": {
    title: {
      en: "Disconnected from Trailer (131)",
      pt: "Desconectado do Reboque (131)",
      es: "Desconectado del Remolque (131)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1456": {
    title: {
      en: "In Temp High (110)",
      pt: "Alta Temperatura Interna (110)",
      es: "Alta Temperatura Interna (110)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1457": {
    title: {
      en: "In Temp Low (111)",
      pt: "Baixa Temperatura Interna (111)",
      es: "Baja Temperatura Interna (111)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1458": {
    title: {
      en: "In Temp Return (112)",
      pt: "Retorno de Temperatura Interna (112)",
      es: "Retorno de Temperatura Interna (112)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1459": {
    title: {
      en: "In Hum. High (113)",
      pt: "Alta Umidade Interna (113)",
      es: "Alta Humedad Interna (113)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1460": {
    title: {
      en: "In Hum. Low (114)",
      pt: "Baixa Umidade Interna (114)",
      es: "Baja Humedad Interna (114)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1461": {
    title: {
      en: "In Hum. Return (115)",
      pt: "Retorno de Umidade Interna (115)",
      es: "Retorno de Humedad Interna (115)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1462": {
    title: {
      en: "D_BLE IN Alert (119)",
      pt: "Alerta D_BLE IN (119)",
      es: "Alerta D_BLE IN (119)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1463": {
    title: {
      en: "D_BLE OUT Alert (120)",
      pt: "Alerta D_BLE OUT (120)",
      es: "Alerta D_BLE OUT (120)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1464": {
    title: {
      en: "D_BLE Temp. High (121)",
      pt: "Alta Temperatura D_BLE (121)",
      es: "Alta Temperatura D_BLE (121)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1465": {
    title: {
      en: "D_BLE Temp. Low (122)",
      pt: "Baixa Temperatura D_BLE (122)",
      es: "Baja Temperatura D_BLE (122)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1466": {
    title: {
      en: "D_BLE Temp. Return (123)",
      pt: "Retorno de Temperatura D_BLE (123)",
      es: "Retorno de Temperatura D_BLE (123)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1467": {
    title: {
      en: "D_BLE Hum. High (124)",
      pt: "Alta Umidade D_BLE (124)",
      es: "Alta Humedad D_BLE (124)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1468": {
    title: {
      en: "D_BLE Hum. Low (125)",
      pt: "Baixa Umidade D_BLE (125)",
      es: "Baja Humedad D_BLE (125)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1469": {
    title: {
      en: "D_BLE Hum. Return (126)",
      pt: "Retorno de Umidade D_BLE (126)",
      es: "Retorno de Humedad D_BLE (126)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1471": {
    title: {
      en: "Lose Network Connection (141)",
      pt: "Perda de Conexão de Rede (141)",
      es: "Pérdida de Conexión de Red (141)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1472": {
    title: {
      en: "Sensor RPT Mode/Interval Changed (134)",
      pt: "Modo/Intervalo de Relatório de Sensor Alterado (134)",
      es: "Modo/Intervalo de Informe del Sensor Cambiado (134)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1473": {
    title: {
      en: "D_BLE Door State (135)",
      pt: "Estado da Porta D_BLE (135)",
      es: "Estado de la Puerta D_BLE (135)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1474": {
    title: {
      en: "D_BLE Panic State (136)",
      pt: "Estado de Pânico D_BLE (136)",
      es: "Estado de Pánico D_BLE (136)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1475": {
    title: {
      en: "D_BLE Light State (137)",
      pt: "Estado de Luz D_BLE (137)",
      es: "Estado de Luz D_BLE (137)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1476": {
    title: {
      en: "D_BLE Low Battery (138)",
      pt: "Bateria Baixa D_BLE (138)",
      es: "Batería Baja D_BLE (138)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1477": {
    title: {
      en: "D_BLE Impact Detected (139)",
      pt: "Impacto Detectado D_BLE (139)",
      es: "Impacto Detectado D_BLE (139)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1478": {
    title: {
      en: "Tilt Angle Alert (140)",
      pt: "Alerta de Ângulo de Inclinação (140)",
      es: "Alerta de Ángulo de Inclinación (140)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1481": {
    title: {
      en: "Buzzer Active by overspeed (152)",
      pt: "Buzzer Ativo por Excesso de Velocidade (152)",
      es: "Zumbido Activo por Exceso de Velocidad (152)",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "1600": {
    title: {
      en: "Drive Mode",
      pt: "Modo de Condução",
      es: "Modo de Conducción",
    },
    tooltip: {
      en: "The mode to be assigned to Drive Mode.\r\n• Default : Mode 4",
      es: "El modo que se asignará al Modo de Conducción.\r\n• Predeterminado: Modo 4",
      pt: "O modo a ser atribuído ao Modo de Condução.\r\n• Padrão : Modo 4",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1601": {
    title: {
      en: "Drive Mode Entry Delay (seconds)",
      pt: "Atraso de Entrada no Modo de Condução (segundos)",
      es: "Retraso de Entrada en Modo de Conducción (segundos)",
    },
    tooltip: {
      en: "Delay time in entering Drive Mode after Ignition On.\r\n• Range : 0~255\r\n• Default : 0",
      es: "Tiempo de retraso para entrar en Modo de Conducción después de encender la ignición.\r\n• Rango: 0~255\r\n• Predeterminado: 0",
      pt: "Tempo de atraso para entrar no Modo de Condução após a Ignição Ligada.\r\n• Intervalo : 0~255\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1602": {
    title: {
      en: "Install Mode",
      pt: "Modo de Instalação",
      es: "Modo de Instalación",
    },
    tooltip: {
      en: "The mode to be assigned to Install Mode.\r\n• Default : Mode 4",
      es: "El modo que se asignará al Modo de Instalación.\r\n• Predeterminado: Modo 4",
      pt: "O modo a ser atribuído ao Modo de Instalação.\r\n• Padrão : Modo 4",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1603": {
    title: {
      en: "Preset Time (seconds)",
      pt: "Tempo Pré-definido (segundos)",
      es: "Tiempo Predefinido (segundos)",
    },
    tooltip: {
      en: "Duration of operation in install mode.\r\n• Range : 0~255\r\n• Default : 0",
      es: "Duración de la operación en modo de instalación.\r\n• Rango: 0~255\r\n• Predeterminado: 0",
      pt: "Duração da operação no modo de instalação.\r\n• Intervalo : 0~255\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1605": {
    title: {
      en: "Park Mode",
      pt: "Modo de Estacionamento",
      es: "Modo de Estacionamiento",
    },
    tooltip: {
      en: "The mode to be assigned to Park Mode.\r\n• Default : Mode 1",
      es: "El modo que se asignará al Modo de Estacionamiento.\r\n• Predeterminado: Modo 1",
      pt: "O modo a ser atribuído ao Modo de Estacionamento.\r\n• Padrão : Modo 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1606": {
    title: {
      en: "Park Mode Entry Delay (seconds)",
      pt: "Atraso de Entrada no Modo de Estacionamento (segundos)",
      es: "Retraso de Entrada en Modo de Estacionamiento (segundos)",
    },
    tooltip: {
      en: "Delay time in entering Drive Mode after Ignition Off.\r\n• Range : 0~255\r\n• Default : 0",
      es: "Tiempo de retraso para entrar en Modo de Conducción después de apagar la ignición.\r\n• Rango: 0~255\r\n• Predeterminado: 0",
      pt: "Tempo de atraso para entrar no Modo de Condução após a Ignição Desligada.\r\n• Intervalo : 0~255\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1610": {
    title: {
      en: "Idle Mode",
      pt: "Modo de Inatividade",
      es: "Modo de Inactividad",
    },
    tooltip: {
      en: "The mode to be assigned to Idle Mode.\r\n• Default : Mode 2",
      es: "El modo que se asignará al Modo Inactivo.\r\n• Predeterminado: Modo 2",
      pt: "O modo a ser atribuído ao Modo Ocioso.\r\n• Padrão : Modo 2",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1611": {
    title: {
      en: "Idle Mode Entry Delay - No GPS Movement (seconds)",
      pt: "Atraso de Entrada no Modo de Inatividade - Sem Movimento GPS (segundos)",
      es: "Retraso de Entrada en Modo de Inactividad - Sin Movimiento GPS (segundos)",
    },
    tooltip: {
      en: "The time after no GPS movement to enter Idle mode.\r\n• Range(On) : 0~65,535\r\n• Default : 0\r\n* Off means the device will not check the GPS condition.",
      es: "El tiempo después de que no haya movimiento del GPS para entrar en modo Inactivo.\r\n• Rango ( Activado): 0~65,535\r\n• Predeterminado: 0\r\n* Desactivado significa que el dispositivo no verificará la condición del GPS.",
      pt: "O tempo sem movimento GPS para entrar no modo Ocioso.\r\n• Intervalo (Ligado) : 0~65.535\r\n• Padrão : 0\r\n* Desligado significa que o dispositivo não verificará a condição do GPS.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1612": {
    title: {
      en: "Idle Mode Entry Delay - No Acc Movement (seconds)",
      pt: "Atraso de Entrada no Modo de Inatividade - Sem Movimento Acc (segundos)",
      es: "Retraso de Entrada en Modo de Inactividad - Sin Movimiento Acc (segundos)",
    },
    tooltip: {
      en: "The time after no accelerometer movement to enter Idle mode.\r\n• Range(On) : 0~65,535\r\n• Default : 30\r\n* Off means the device will not check the accelerometer condition.",
      es: "El tiempo después de que no haya movimiento del acelerómetro para entrar en modo Inactivo.\r\n• Rango ( Activado): 0~65,535\r\n• Predeterminado: 30\r\n* Desactivado significa que el dispositivo no verificará la condición del acelerómetro.",
      pt: "O tempo sem movimento do acelerômetro para entrar no modo Ocioso.\r\n• Intervalo (Ligado) : 0~65,535\r\n• Padrão : 30\r\n* Desligado significa que o dispositivo não verificará a condição do acelerômetro.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1613": {
    title: {
      en: "Idle Mode Exit Delay - No GPS Movement (seconds)",
      pt: "Atraso de Saída no Modo de Inatividade - Sem Movimento GPS (segundos)",
      es: "Retraso de Salida en Modo de Inactividad - Sin Movimiento GPS (segundos)",
    },
    tooltip: {
      en: "The time after detecting GPS movement to exit Idle mode.\r\n• Range(On) : 0~255\r\n• Default : 30\r\n* Off means the device will not check the GPS condition.",
      es: "El tiempo después de detectar movimiento del GPS para salir del modo Inactivo.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 30\r\n* Desactivado significa que el dispositivo no verificará la condición del GPS.",
      pt: "O tempo após detectar movimento GPS para sair do modo Ocioso.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 30\r\n* Desligado significa que o dispositivo não verificará a condição do GPS.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1614": {
    title: {
      en: "Idle Mode Exit Delay - No Acc Movement (seconds)",
      pt: "Atraso de Saída no Modo de Inatividade - Sem Movimento Acc (segundos)",
      es: "Retraso de Salida en Modo de Inactividad - Sin Movimiento Acc (segundos)",
    },
    tooltip: {
      en: "The time after detecting accelerometer movement to exit Idle mode.\r\n• Range(On) : 0~255\r\n• Default : 30\r\n* Off means the device will not check the accelerometer condition.",
      es: "El tiempo después de detectar movimiento del acelerómetro para salir del modo Inactivo.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 30\r\n* Desactivado significa que el dispositivo no verificará la condición del acelerómetro.",
      pt: "O tempo após detectar movimento do acelerômetro para sair do modo Ocioso.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 30\r\n* Desligado significa que o dispositivo não verificará a condição do acelerômetro.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1615": {
    title: {
      en: "Excess Idle Mode Threshold 1 (seconds)",
      pt: "Limiar de Excesso de Inatividade 1 (segundos)",
      es: "Umbral de Exceso de Inactividad 1 (segundos)",
    },
    tooltip: {
      en: "Time in Idle mode before the device sends an Excess Idle Mode Alert.\r\n• Range(On) : 0~86,400\r\n• Default : 0",
      es: "Tiempo en modo Inactivo antes de que el dispositivo envíe una Alerta de Modo Inactivo Excesivo.\r\n• Rango ( Activado): 0~86,400\r\n• Predeterminado: 0",
      pt: "Tempo em modo Ocioso antes que o dispositivo envie um Alerta de Modo Ocioso Excessivo.\r\n• Intervalo (Ligado) : 0~86,400\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1616": {
    title: {
      en: "Excess Idle Mode Threshold 2 (seconds)",
      pt: "Limiar de Excesso de Inatividade 2 (segundos)",
      es: "Umbral de Exceso de Inactividad 2 (segundos)",
    },
    tooltip: {
      en: "Time in Idle mode before the device sends an Excess Idle Mode Alert.\r\n• Range(On) : 0~86,400\r\n• Default : 0",
      es: "Tiempo en modo Inactivo antes de que el dispositivo envíe una Alerta de Modo Inactivo Excesivo.\r\n• Rango ( Activado): 0~86,400\r\n• Predeterminado: 0",
      pt: "Tempo em modo Ocioso antes que o dispositivo envie um Alerta de Modo Ocioso Excessivo.\r\n• Intervalo (Ligado) : 0~86,400\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1617": {
    title: {
      en: "Excess Idle Mode Threshold 3 (seconds)",
      pt: "Limiar de Excesso de Inatividade 3 (segundos)",
      es: "Umbral de Exceso de Inactividad 3 (segundos)",
    },
    tooltip: {
      en: "Time in Idle mode before the device sends an Excess Idle Mode Alert.\r\n• Range(On) : 0~86,400\r\n• Default : 0",
      es: "Tiempo en modo Inactivo antes de que el dispositivo envíe una Alerta de Modo Inactivo Excesivo.\r\n• Rango ( Activado): 0~86,400\r\n• Predeterminado: 0",
      pt: "Tempo em modo Ocioso antes que o dispositivo envie um Alerta de Modo Ocioso Excessivo.\r\n• Intervalo (Ligado) : 0~86,400\r\n• Padrão : 0",
    },
    min: null,
    max: null,
    list: null,
  },
  "1620": {
    title: {
      en: "Speeding Mode",
      pt: "Modo de Velocidade",
      es: "Modo de Velocidad",
    },
    tooltip: {
      en: "The mode to be assigned to Speeding Mode.\r\n• Default : Mode 5",
      es: "El modo que se asignará al Modo de Exceso de Velocidad.\r\n• Predeterminado: Modo 5",
      pt: "O modo a ser atribuído ao Modo de Excesso de Velocidade.\r\n• Padrão : Modo 5",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1621": {
    title: {
      en: "Speed Threshold (km/h)",
      pt: "Limiar de Velocidade (km/h)",
      es: "Umbral de Velocidad (km/h)",
    },
    tooltip: {
      en: "Threshold for the device to enter Speeding Mode.\r\n• Range(On) : 0~300\r\n• Default : 100(STG), 112(USA), 112(EU)",
      es: "Umbral para que el dispositivo ingrese en Modo de Exceso de Velocidad.\r\n• Rango ( Activado): 0~300\r\n• Predeterminado: 100 (STG), 112 (EE. UU.), 112 (UE)",
      pt: "Limite para o dispositivo entrar no Modo de Excesso de Velocidade.\r\n• Intervalo (Ligado) : 0~300\r\n• Padrão : 100 (STG), 112 (EUA), 112 (UE)",
    },
    min: 0,
    max: 300,
    list: null,
  },
  "1622": {
    title: {
      en: "Speed Mode Entry Delay (seconds)",
      pt: "Atraso de Entrada no Modo de Velocidade (segundos)",
      es: "Retraso de Entrada en Modo de Velocidad (segundos)",
    },
    tooltip: {
      en: "The time that GPS speed must exceed the speed threshold to enter Speeding Mode.\r\n• Range(On) : 0~255\r\n• Default : 10",
      es: "El tiempo que la velocidad del GPS debe exceder el umbral de velocidad para ingresar en Modo de Exceso de Velocidad.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 10",
      pt: "O tempo que a velocidade do GPS deve exceder o limite de velocidade para entrar no Modo de Excesso de Velocidade.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 10",
    },
    min: 1,
    max: 255,
    list: null,
  },
  "1623": {
    title: {
      en: "Speed Mode Exit Delay (seconds)",
      pt: "Atraso de Saída no Modo de Velocidade (segundos)",
      es: "Retraso de Salida en Modo de Velocidad (segundos)",
    },
    tooltip: {
      en: "The time that GPS speed must be below the speed threshold to exit Speeding Mode.\r\n• Range(On) : 0~255\r\n• Default : 10",
      es: "El tiempo que la velocidad del GPS debe estar por debajo del umbral de velocidad para salir del Modo de Exceso de Velocidad.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 10",
      pt: "O tempo que a velocidade do GPS deve estar abaixo do limite de velocidade para sair do Modo de Excesso de Velocidade.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 10",
    },
    min: 1,
    max: 255,
    list: null,
  },
  "1624": {
    title: {
      en: "Speed Above Alert Delay (seconds)",
      pt: "Atraso de Alerta de Velocidade Acima (segundos)",
      es: "Retraso de Alerta de Velocidad Excesiva (segundos)",
    },
    tooltip: {
      en: "The time that GPS speed must exceed the speed threshold to trigger the Speed Above Alert.\r\n• Range(On) : 0~255\r\n• Default : 5",
      es: "El tiempo que la velocidad del GPS debe exceder el umbral de velocidad para activar la Alerta de Velocidad Alta.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 5",
      pt: "O tempo que a velocidade do GPS deve exceder o limite de velocidade para acionar o Alerta de Velocidade Acima.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 5",
    },
    min: 1,
    max: 255,
    list: null,
  },
  "1625": {
    title: {
      en: "Speed Below Alert Delay (seconds)",
      pt: "Atraso de Alerta de Velocidade Abaixo (segundos)",
      es: "Retraso de Alerta de Velocidad Baja (segundos)",
    },
    tooltip: {
      en: "The time that GPS speed must be below the speed threshold to trigger the Speed Below Alert.\r\n• Range(On) : 0~255\r\n• Default : 10",
      es: "El tiempo que la velocidad del GPS debe estar por debajo del umbral de velocidad para activar la Alerta de Velocidad Baja.\r\n• Rango ( Activado): 0~255\r\n• Predeterminado: 10",
      pt: "O tempo que a velocidade do GPS deve estar abaixo do limite de velocidade para acionar o Alerta de Velocidade Abaixo.\r\n• Intervalo (Ligado) : 0~255\r\n• Padrão : 10",
    },
    min: 1,
    max: 255,
    list: null,
  },
  "1636": {
    title: {
      en: "Towing Mode",
      pt: "Modo de Reboque",
      es: "Modo de Remolque",
    },
    tooltip: {
      en: "The mode to be assigned to Towing Mode.",
      es: "El modo que se asignará al Modo de Remolque.",
      pt: "O modo a ser atribuído ao Modo de Reboque.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1637": {
    title: {
      en: "Report Schedule",
      pt: "Agendamento de Relatório",
      es: "Agendado de reporte",
    },
    tooltip: {
      en: "Reports are sent to the server within the allowed time range and on specific days of the week.\r\n• Default : Off\r\n* Only Status Report with a set interval are affected by the schedule.",
      es: "Los informes se envían al servidor dentro del rango de tiempo permitido y en días específicos de la semana.\r\n• Predeterminado: Desactivado\r\n* Solo los Informes de Estado con un intervalo establecido se ven afectados por el horario.",
      pt: "Os relatórios são enviados ao servidor dentro do intervalo de tempo permitido e em dias específicos da semana.\r\n• Padrão  : Desativado\r\n* Apenas o Relatório de Status com um intervalo definido é afetado pelo cronograma.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1638": {
    title: {
      en: "Report Time (hours)",
      pt: "Horário do Relatório (horas)",
      es: "Hora de reporte (horas)",
    },
    tooltip: {
      en: "The report's start and end times.\r\n• Default : 12:00AM~12:00AM",
      es: "Los tiempos de inicio y finalización del informe.\r\n• Predeterminado: 12:00 AM~12:00 AM",
      pt: "Os horários de início e término do relatório.\r\n• Padrão : 12:00AM~12:00AM",
    },
    min: null,
    max: null,
    list: null,
  },
  "1639": {
    title: {
      en: "Report Time (hours)",
      pt: "Horário do Relatório (horas)",
      es: "Hora de reporte (horas)",
    },
    tooltip: {
      en: "The report's start and end times.\r\n• Default : 12:00AM~12:00AM",
      es: "Los tiempos de inicio y finalización del informe.\r\n• Predeterminado: 12:00 AM~12:00 AM",
      pt: "Os horários de início e término do relatório.\r\n• Padrão : 12:00AM~12:00AM",
    },
    min: null,
    max: null,
    list: null,
  },
  "1640": {
    title: {
      en: "Report Day",
      pt: "Dia do Relatório",
      es: "Día de reporte",
    },
    tooltip: {
      en: "Days of the week for the report.",
      es: "Días de la semana para el informe.",
      pt: "Dias da semana para o relatório.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1641": {
    title: {
      en: "Disconnected Mode",
      pt: "Modo Desconectado",
      es: "Modo Desconectado",
    },
    tooltip: {
      en: "The mode to be assigned to Disconnected Mode.",
      es: "El modo que se asignará al Modo Desconectado.",
      pt: "O modo a ser atribuído ao Modo Desconectado.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1642": {
    title: {
      en: "Presence Mode",
      pt: "Modo de Presença",
      es: "Modo de Presencia",
    },
    tooltip: {
      en: "Device will report messages in Presence Mode. The mode to be assigned to Precence Mode.\r\n• Option(On)\r\n- Mode 1\r\n- Mode 2\r\n- Mode 3\r\n- Mode 4\r\n- Mode 5\r\n- Mode 6\r\n• Default : Off\r\n* The device enters Presence mode when Presence Device is absent.",
      es: "El dispositivo informará los mensajes en Modo de Presencia. El modo que se asignará al Modo de Presencia.\r\n• Opción( Activado)\r\n- Modo 1\r\n- Modo 2\r\n- Modo 3\r\n- Modo 4\r\n- Modo 5\r\n- Modo 6\r\n• Predeterminado: Desactivado\r\n* El dispositivo entra en modo de presencia cuando el dispositivo de presencia está ausente.",
      pt: "O dispositivo enviará mensagens no Modo Presença. O modo a ser atribuído ao Modo Presença.\r\n• Opção(Ligado)\r\n- Modo 1\r\n- Modo 2\r\n- Modo 3\r\n- Modo 4\r\n- Modo 5\r\n- Modo 6\r\n• Padrão : Desativado\r\n* O dispositivo entra no modo de presença quando o Dispositivo de Presença está ausente.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Mode 1",
          es: "Modo 1",
          pt: "Modo 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Mode 2",
          es: "Modo 2",
          pt: "Modo 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Mode 3",
          es: "Modo 3",
          pt: "Modo 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Mode 4",
          es: "Modo 4",
          pt: "Modo 4",
        },
      },
      {
        value: "05",
        label: {
          en: "Mode 5",
          es: "Modo 5",
          pt: "Modo 5",
        },
      },
      {
        value: "06",
        label: {
          en: "Mode 6",
          es: "Modo 6",
          pt: "Modo 6",
        },
      },
    ],
  },
  "1649": {
    title: {
      en: "Scheduled Report1 UTC time",
      pt: "Horário do Relatório 1 em UTC",
      es: "Hora de reporte Programado 1 en UTC",
    },
    tooltip: {
      en: "Time that wakes up the device, reports to the user platform.",
      es: "Tiempo en que el dispositivo se despierta, informa a la plataforma del usuario.",
      pt: "Hora de ativação do dispositivo, relatórios para a plataforma do usuário.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1650": {
    title: {
      en: "Scheduled Report2 UTC time",
      pt: "Horário do Relatório 2 em UTC",
      es: "Hora de reporte Programado 2 en UTC",
    },
    tooltip: {
      en: "Time that wakes up the device, reports to the user platform.",
      es: "Tiempo en que el dispositivo se despierta, informa a la plataforma del usuario.",
      pt: "Hora de ativação do dispositivo, relatórios para a plataforma do usuário.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1651": {
    title: {
      en: "Scheduled Report3 UTC time",
      pt: "Horário do Relatório 3 em UTC",
      es: "Hora de reporte Programado 3 en UTC",
    },
    tooltip: {
      en: "Time that wakes up the device, reports to the user platform.",
      es: "Tiempo en que el dispositivo se despierta, informa a la plataforma del usuario.",
      pt: "Hora de ativação do dispositivo, relatórios para a plataforma do usuário.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1652": {
    title: {
      en: "Scheduled Report4 UTC time",
      pt: "Horário do Relatório 4 em UTC",
      es: "Hora de reporte Programado 4 en UTC",
    },
    tooltip: {
      en: "Time that wakes up the device, reports to the user platform.",
      es: "Tiempo en que el dispositivo se despierta, informa a la plataforma del usuario.",
      pt: "Hora de ativação do dispositivo, relatórios para a plataforma do usuário.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1653": {
    title: {
      en: "PID report time (seconds)",
      pt: "Tempo de Relatório de PID (segundos)",
      es: "Tiempo de reporte de PID (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send PID Reports. \r\n• Range(On) : 5~86,400 \r\n• Default : 180",
      es: "Intervalo de tiempo para el cual el dispositivo enviará Informes PID.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatórios de PID.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180",
    },
    min: null,
    max: null,
    list: null,
  },
  "1655": {
    title: {
      en: "Status Report Start Time",
      pt: "Horário de Início do Relatório de Status",
      es: "Hora de Inicio del reporte de estado",
    },
    tooltip: {
      en: "The start time for Status Report to be sent to the server.\r\n• Default(On) : 09:00AM",
      es: "Hora de inicio para que se envíe el Informe de Estado al servidor.\r\n• Predeterminado ( Activado): 09:00 AM",
      pt: "Hora de início para o Relatório de Status ser enviado ao servidor.\r\n• Padrão (Ligado) : 09:00AM",
    },
    min: null,
    max: null,
    list: null,
  },
  "1656": {
    title: {
      en: "Siren Mode",
      pt: "Modo de Sirene",
      es: "Modo de Sirena",
    },
    tooltip: {
      en: "Status Report is sent every second without TCP ACK\r\nchecking.\r\n• Default : Off",
      es: "El Informe de Estado se envía cada segundo sin verificar el ACK de TCP.\r\n• Predeterminado: Desactivado",
      pt: "O Relatório de Status é enviado a cada segundo sem verificação de ACK TCP.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disabled",
          es: "Desactivado",
          pt: "Desativado",
        },
      },
      {
        value: "01",
        label: {
          en: "Input1",
          es: "Entrada 1",
          pt: "Entrada 1",
        },
      },
      {
        value: "02",
        label: {
          en: "Input2",
          es: "Entrada 2",
          pt: "Entrada 2",
        },
      },
      {
        value: "03",
        label: {
          en: "Input3",
          es: "Entrada 3",
          pt: "Entrada 3",
        },
      },
      {
        value: "04",
        label: {
          en: "Input4",
          es: "Entrada 4",
          pt: "Entrada 4",
        },
      },
    ],
  },
  "1670": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 1.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 1.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 1.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1670_1": {
    title: {
      en: "Parking Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Estacionamento (segundos)",
      es: "Tiempo de Rastreo en Estacionamiento (segundos)",
    },
    tooltip: {
      en: "Time interval during which the device will send Status Reports when parked or when the ‘Motion Sensor’ option is disabled.\r\n• Range(On) : 5~86,400\r\n• Default : ST4932(600), ST4955LCBW(600)",
      es: 'El intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción "sensor de movimiento" esté desactivada. \r\n• Rango ( Activado): 5~86,400',
      pt: "El intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción de ‘sensor de movimiento’ esté desactivada.\r\n• Rango( Activado): 5~86,400",
    },
    min: 600,
    max: 86400,
    list: null,
  },
  "1671": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 1.\r\n• Range(On) : 50~65,535\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 1.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: Desactivado\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 1.\r\n• Intervalo (Ligado) : 50~65,535\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1672": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 1.\r\n• Range(On) : 10~179\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 1.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: Desactivado\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 1.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1673": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 2.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 2.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 2.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1673_1": {
    title: {
      en: "Power Saving 1 Parking Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Estacionamento com Economia de Energia 1 (segundos)",
      es: "Tiempo de Rastreo en Estacionamiento con Ahorro de Energía 1 (segundos)",
    },
    tooltip: {
      en: "In Power Saving 1 Mode: Time interval during which the device will send Status Reports when parked or when the ‘Motion Sensor’ option is disabled.\r\n• Range(On) : 21,600~86,400\r\n• Default : ST4932(21600), ST4955LCBW(21600)\r\n* Refer to parameter 1949 for the conditions to enter and exit Power Saving 1 Mode.",
      es: "En el modo Ahorro de energía 1, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción \"Sensor de movimiento\" esté desactivada. \r\n• Rango (activado): 21.600~86.400 \r\n• Por defecto : \r\n* Para conocer las condiciones para entrar y salir del modo Ahorro de energía 1, consulte el parámetro '1949'.",
      pt: "En el modo de Ahorro de Energía 1, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción de ‘sensor de movimiento’ esté desactivada.\r\n• Rango( Activado): 21,600~86,400\r\n• Predeterminado:\r\n* Para las condiciones para entrar y salir del modo de Ahorro de Energía 1, consulte el parámetro '1949'.",
    },
    min: 21600,
    max: 86400,
    list: null,
  },
  "1674": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 2.\r\n• Range(On) : 50~65,535\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 2.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: Desactivado\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 2.\r\n• Intervalo (Ligado) : 50~65,535\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1675": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 2.\r\n• Range(On) : 10~179\r\n• Default : Off\r\n* If the device detects either a change in 'Time' or 'Distance' or 'Heading/Angle', sends a status report.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 2.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: Desactivado\r\n* Si el dispositivo detecta un cambio en 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía un informe de estado.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 2.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1676": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 3.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 3.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 3.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1676_1": {
    title: {
      en: "Power Saving 2 Parking Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Estacionamento com Economia de Energia 2 (segundos)",
      es: "Tiempo de Rastreo en Estacionamiento con Ahorro de Energía 2 (segundos)",
    },
    tooltip: {
      en: "In Power Saving 2 Mode: Time interval during which the device will send Status Reports when parked or when the ‘Motion Sensor’ option is disabled.\r\n• Range(On) : 21,600~86,400\r\n• Default : ST4932(43200), ST4955LCBW(43200)\r\n* Refer to parameter 1949 for the conditions to enter and exit Power Saving 2 Mode.",
      es: "En el modo Ahorro de energía 2, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción \"Sensor de movimiento\" esté desactivada. \r\n• Rango (activado): 21.600~86.400 \r\n• Por defecto : \r\n* Para conocer las condiciones para entrar y salir del modo Ahorro de energía 2, consulte el parámetro '1949'.",
      pt: "En el modo de Ahorro de Energía 2, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté estacionado o cuando la opción de ‘sensor de movimiento’ esté desactivada.\r\n• Rango( Activado): 21,600~86,400\r\n• Predeterminado:\r\n* Para las condiciones para entrar y salir del modo de Ahorro de Energía 2, consulte el parámetro '1949'.",
    },
    min: 43200,
    max: 86400,
    list: null,
  },
  "1677": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 3.\r\n• Range(On) : 50~65,535\r\n• Default : Off\r\n* If the device detects either a change in 'Time' or 'Distance' or 'Heading/Angle', sends a status report.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 3.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: Desactivado\r\n\r\nSi el dispositivo detecta un cambio en 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía un informe de estado.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 3.\r\n• Intervalo (Ligado) : 50~65,535\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1678": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 3.\r\n• Range(On) : 10~179\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 3.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: Desactivado\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 3.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1679": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 4.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 4.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 4.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1679_1": {
    title: {
      en: "Driving Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Condução (segundos)",
      es: "Tiempo de Rastreo en Conducción (segundos)",
    },
    tooltip: {
      en: "Time interval during which the device will send Status Reports while driving.\r\n• Range(On) : 30~86,400(ST4910(5)B, ST4950(5)B, ST4950(5)BDS), 600~86,400(ST4955LCB, ST4955LCBW, ST4915LCBF)\r\n• Default : ST4932(600), ST4955LCBW(600)\r\n* When 4021 is disabled, the range is 30 to 86,400.\r\n* If either 1679 or 1682 is less than 600, 4021 cannot be enabled.",
      es: "El intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras conduce.\r\n• Rango ( Activado): 30~86,400(ST4910(5)B, ST4950(5)B, ST4950(5)BDS), 600~86,400(ST4955LCB, ST4955LCBW, ST4915LCBF)\r\n• Por defecto : \r\n* Cuando 4021 está deshabilitado, el rango es de 30 a 86,400.\r\n* Si 1679 o 1682 es menor que 600, no se puede habilitar 4021.",
      pt: "El intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras está conduciendo.\r\n• Rango( Activado): 3086,400 (ST4910(5)B, ST4950(5)B, ST4950(5)BDS), 60086,400 (ST4955LCB, ST4955LCBW, ST4915LCBF)\r\n• Predeterminado:\r\n* Cuando el 4021 está desactivado, el rango es de 30 a 86,400.\r\n* Si 1679 o 1682 es menor que 600, 4021 no se puede habilitar.",
    },
    min: 30,
    max: 86400,
    list: null,
  },
  "1680": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 4.\r\n• Range(On) : 50~65,535\r\n• Default : 1,000, 1,000(USA&OBD), 1,000(EU&OBD), Off(ST4210 Series Model)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 4.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: 1,000, 1,000 (EE. UU. y OBD), 1,000 (UE y OBD), Desactivado (Modelo Serie ST4210)\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 4.\r\n• Intervalo (Ligado) : 50~65,535\r\n• Padrão : 1,000, 1,000 (EUA & OBD), 1,000 (UE & OBD), Desligado (Modelo da Série ST4210)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1681": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 4.\r\n• Range(On) : 10~179\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 4.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: Desactivado\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 4.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1681_1": {
    title: {
      en: "Driving Angle (degrees)",
      pt: "Ângulo de Condução (graus)",
      es: "Ángulo de Conducción (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Reports during Driving Tracking Time.\r\n• Range(On) : 10~179\r\n• Default : ",
      es: "Rumbo/ángulo para el cual el dispositivo enviará el informe de estado durante el tiempo de seguimiento de conducción. \r\n• Rango ( Activado): 10~179 \r\n• Por defecto :",
      pt: "Rumbo/Ángulo para el cual el dispositivo enviará un informe de estado durante el Tiempo de Rastreo en Conducción.\r\n• Rango( Activado): 10~179\r\n• Predeterminado:",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1682": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 5.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 5.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 5.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1682_1": {
    title: {
      en: "DC.Power Tracking Time - Only driving (seconds)",
      pt: "Tempo de Rastreamento com Alimentação DC - Apenas condução (segundos)",
      es: "Tiempo de Rastreo con Alimentación DC - Solo conducción (segundos)",
    },
    tooltip: {
      en: "Time interval during which the device will send Status Reports with external DC power connected and driving.\r\n• Range(On) : 30~86,400(ST4950(5), ST4950(5)DS, ST4030_Series), 600~86,400(ST4950(5)B, ST4950(5)BDS), \r\n• Default : ST4932(600), ST4955LCBW(600)\r\n* When 4021 (Beacon Scan) is disabled, the range is 30 to 86,400.\r\n* If either 1679 or 1682 is less than 600, 4021 cannot be enabled.\r\n* For ST4955LCB and ST4955LCBW, when BLE_SCAN (4021) is enabled, the range is 600~86,400.",
      es: "El intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando la alimentación (CC) esté conectada y funcionando.\r\n• Rango ( Activado): 30~86,400(ST4950(5), ST4950(5)DS, ST4030_Series), 600~86,400(ST4950(5)B, ST4950(5)BDS), \r\n• Por defecto : \r\n* Cuando 4021 (Beacon Scan) está deshabilitado, el rango es de 30 a 86,400.\r\n* Si 1679 o 1682 es menor que 600, no se puede habilitar 4021.\r\n* Para ST4955LCB y ST4955LCBW, cuando BLE_SCAN (4021) está habilitado, el rango es 600~86,400.",
      pt: "El intervalo de tiempo durante el cual el dispositivo enviará informes de estado cuando esté conectado a la corriente (DC) y conduciendo.\r\n• Rango( Activado): 3086,400 (ST4950(5), ST4950(5)DS, ST4030_Series), 60086,400 (ST4950(5)B, ST4950(5)BDS)\r\n• Predeterminado:\r\n* Cuando el 4021 (Escaneo de Beacon) está desactivado, el rango es de 30 a 86,400.\r\n* Si 1679 o 1682 es menor que 600, 4021 no se puede habilitar.\r\n* Para ST4955LCB y ST4955LCBW, cuando BLE_SCAN (4021) está habilitado, el rango es 600~86,400.",
    },
    min: 30,
    max: 86400,
    list: null,
  },
  "1683": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 5.\r\n• Range(On) : 50~65,535\r\n• Default : 1,000, 1,000(USA&OBD), 1,000(EU&OBD), Off(ST4210 Series Model)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 5.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: 1,000, 1,000 (EE. UU. y OBD), 1,000 (UE y OBD), Desactivado (Modelo Serie ST4210)\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 5.\r\n• Intervalo (Ligado) : 50~65,535\r\n• Padrão : 1,000, 1,000 (EUA & OBD), 1,000 (UE & OBD), Desligado (Modelo da Série ST4210)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1684": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 5.\r\n• Range(On) : 10~179\r\n• Default : Off\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 5.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: Desactivado\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 5.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão  : Desativado\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1684_1": {
    title: {
      en: "DC.Power Driving Angle (degrees)",
      pt: "Ângulo de Condução com Alimentação DC (graus)",
      es: "Ángulo de Conducción con Alimentación DC (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Reports during DC.PWR and Driving Tracking Time.\r\n• Range(On) : 10~179\r\n• Default : ",
      es: "Rumbo/ángulo para el cual el dispositivo enviará el informe de estado durante DC.PWR y el tiempo de seguimiento de conducción. \r\n• Rango ( Activado): 10~179 \r\n• Por defecto :",
      pt: "Rumbo/Ángulo para el cual el dispositivo enviará un informe de estado durante el Tiempo de Rastreo con Energía DC y Conducción.\r\n• Rango( Activado): 10~179\r\n• Predeterminado:",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1685": {
    title: {
      en: "Time (seconds)",
      pt: "Tempo (segundos)",
      es: "Tiempo (segundos)",
    },
    tooltip: {
      en: "Time Interval for which the device will send Status Report in Mode 5.\r\n• Range(On) : 5~86,400\r\n• Default : 180, 3,600(USA&OBD), 3,600(EU&OBD)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de tiempo para el cual el dispositivo enviará el Informe de Estado en el Modo 5.\r\n• Rango ( Activado): 5~86,400\r\n• Predeterminado: 180, 3,600 (EE. UU. y OBD), 3,600 (UE y OBD)\r\n* Si el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\n* Después de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Tempo para o qual o dispositivo enviará Relatório de Status no Modo 5.\r\n• Intervalo (Ligado) : 5~86,400\r\n• Padrão : 180, 3,600 (EUA & OBD), 3,600 (UE & OBD)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 5,
    max: 86400,
    list: null,
  },
  "1685_1": {
    title: {
      en: "Power Saving 1 Driving Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Condução com Economia de Energia 1 (segundos)",
      es: "Tiempo de Rastreo en Conducción con Ahorro de Energía 1 (segundos)",
    },
    tooltip: {
      en: "In Power Saving 1 Mode: Time interval during which the device will send Status Reports while driving.\r\n• Range(On) : 3,600~86,400\r\n• Default : ST4932(3600), ST4955LCBW(3600)\r\n* For the conditions for entering and exiting Power Saving 1 mode, refer to the '1949: Power Saving Profile' parameter.",
      es: "En el modo Ahorro de energía 1, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras conduce.\r\n• Rango (activado): 3.600~86.400\r\n• Por defecto : \r\n* Para conocer las condiciones para ingresar y salir del modo Ahorro de energía 1, consulte el parámetro '1949: Perfil de ahorro de energía'.",
      pt: "En el modo de Ahorro de Energía 1, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras está conduciendo.\r\n• Rango( Activado): 3,600~86,400\r\n• Predeterminado:\r\n* Para las condiciones para entrar y salir del modo de Ahorro de Energía 1, consulte el parámetro '1949: Perfil de Ahorro de Energía'.",
    },
    min: 3600,
    max: 86400,
    list: null,
  },
  "1686": {
    title: {
      en: "Distance (meters)",
      pt: "Distância (metros)",
      es: "Distancia (metros)",
    },
    tooltip: {
      en: "Distance Interval for which the device will send Status Report in Mode 6.\r\n• Range(On) : 50~65,535\r\n• Default : 1,000, 1,000(USA&OBD), 1,000(EU&OBD), Off(ST4210 Series Model)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Intervalo de distancia para el cual el dispositivo enviará el Informe de Estado en el Modo 6.\r\n• Rango ( Activado): 50~65,535\r\n• Predeterminado: 1,000, 1,000 (EE. UU. y OBD), 1,000 (UE y OBD), Desactivado (Modelo Serie ST4210)\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Intervalo de Distância para o qual o dispositivo enviará Relatório de Status no Modo 6.\r\n• Intervalo (Ligado) : 50~65.535\r\n• Padrão : 1,000, 1,000 (EUA & OBD), 1,000 (UE & OBD), Desligado (Modelo da Série ST4210)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 50,
    max: 65535,
    list: null,
  },
  "1687": {
    title: {
      en: "Heading/Angle (degrees)",
      pt: "Direção/Ângulo (graus)",
      es: "Dirección/Ángulo (grados)",
    },
    tooltip: {
      en: "Heading/Angle for which the device will send Status Report in Mode 6.\r\n• Range(On) : 10~179\r\n• Default : 30, 30(USA&OBD), 30(EU&OBD), Off(ST4210 Series Model)\r\n* If the device detects a change in any of 'Time', 'Distance', or 'Heading/Angle', it sends Status Report.\r\n* After sending Status Report for any change, the time is always reset.",
      es: "Dirección/Ángulo para el cual el dispositivo enviará el Informe de Estado en el Modo 6.\r\n• Rango ( Activado): 10~179\r\n• Predeterminado: 30, 30 (EE. UU. y OBD), 30 (UE y OBD), Desactivado (Modelo Serie ST4210)\r\n\r\nSi el dispositivo detecta un cambio en cualquiera de 'Tiempo', 'Distancia' o 'Dirección/Ángulo', envía el Informe de Estado.\r\nDespués de enviar el Informe de Estado por cualquier cambio, el tiempo siempre se restablece.",
      pt: "Direção/Ângulo para o qual o dispositivo enviará Relatório de Status no Modo 6.\r\n• Intervalo (Ligado) : 10~179\r\n• Padrão : 30, 30 (EUA & OBD), 30 (UE & OBD), Desligado (Modelo da Série ST4210)\r\n* Se o dispositivo detectar uma mudança em qualquer um dos 'Tempo', 'Distância' ou 'Direção/Ângulo', ele enviará o Relatório de Status.\r\n* Após enviar o Relatório de Status para qualquer alteração, o tempo é sempre redefinido.",
    },
    min: 10,
    max: 179,
    list: null,
  },
  "1688": {
    title: {
      en: "Power Saving 2 Driving Tracking Time (seconds)",
      pt: "Tempo de Rastreamento de Condução com Economia de Energia 2 (segundos)",
      es: "Tiempo de Rastreo en Conducción con Ahorro de Energía 2 (segundos)",
    },
    tooltip: {
      en: "In Power Saving 2 Mode: Time interval during which the device will send status reports while driving.\r\n• Range(On) : 3,600~86,400\r\n• Default : ST4932(7200), ST4955LCBW(7200)\r\n* For the conditions for entering and exiting Power Saving 2 mode, refer to the '1949: Power Saving Profile' parameter.",
      es: "En el modo Ahorro de energía 2, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras conduce.\r\n• Rango (activado): 3.600~86.400\r\n• Por defecto : \r\n* Para conocer las condiciones para ingresar y salir del modo Ahorro de energía 2, consulte el parámetro '1949: Perfil de ahorro de energía'.\r\n",
      pt: "En el modo de Ahorro de Energía 2, este es el intervalo de tiempo durante el cual el dispositivo enviará informes de estado mientras está conduciendo.\r\n• Rango( Activado): 3,600~86,400\r\n• Predeterminado:\r\n* Para las condiciones para entrar y salir del modo de Ahorro de Energía 2, consulte el parámetro '1949: Perfil de Ahorro de Energía'.",
    },
    min: 7200,
    max: 86400,
    list: null,
  },
  "1697": {
    title: {
      en: "Driving Logging Count",
      pt: "Contagem de Registro de Condução",
      es: "Conteo de Registro de Conducción",
    },
    tooltip: {
      en: "The device stores multiple Status Reports up to this number before sending them all at once.\r\n• Range(On) : 1~99\r\n• Default : ST4932(1)",
      es: "\r\nEl dispositivo almacena varios informes de estado hasta este número antes de enviarlos todos a la vez.\r\n• Rango ( Activado): 1~99\r\n• Por defecto :",
      pt: "El dispositivo almacena varios informes de estado hasta este número antes de enviarlos todos de una vez.\r\n• Rango( Activado): 1~99\r\n• Predeterminado:",
    },
    min: 1,
    max: 99,
    list: null,
  },
  "1698": {
    title: {
      en: "Operation Mode",
      pt: "Modo de Operação",
      es: "Modo de Operación",
    },
    tooltip: {
      en: "Device Operation Mode type.\r\n• Option\r\n- IMS(Inventory Management System) : Dealer mode. No GPS for trip start alerts, but other alerts and trip stop have GPS positions. Detects start/stop and collisions.\r\n- Consumer : Post-sale mode. Checks position once per day, only detects collisions. Only one Status Report per day has a GPS position.\r\n- Away : Notification when the vehicle is used. Periodic position checks, detects start/stop and collisions. Most alerts include GPS positions.\r\n- Recovery : Emergency mode for stolen vehicles. All reports include GPS positions, constant server connection.\r\n- BOT (Battery Operating Tracking) (Default) : Common mode for general use. All reports include GPS positions.",
      es: "Tipo de Modo de Operación del Dispositivo.\r\n• Opción\r\n- SGI (Sistema de Gestión de Inventario): Modo de distribuidor. No hay GPS para alertas de inicio de viaje, pero otras alertas y parada de viaje tienen posiciones GPS. Detecta inicio/parada y colisiones.\r\n- Consumidor: Modo postventa. Verifica la posición una vez al día, solo detecta colisiones. Solo un Informe de Estado por día tiene una posición GPS.\r\n- Ausente: Notificación cuando se usa el vehículo. Verificaciones periódicas de posición, detecta inicio/parada y colisiones. La mayoría de las alertas incluyen posiciones GPS.\r\n- Recuperación: Modo de emergencia para vehículos robados. Todos los informes incluyen posiciones GPS, conexión constante al servidor.\r\n- SOB (Seguimiento Operativo por Batería) (Predeterminado): Modo común para uso general. Todos los informes incluyen posiciones GPS.",
      pt: "Tipo de Modo de Operação do Dispositivo.\r\n• Opção\r\n- IMS (Sistema de Gerenciamento de Inventário): Modo do distribuidor. Sem GPS para alertas de início de viagem, mas outros alertas e paradas de viagem têm posições GPS. Detecta início/parada e colisões.\r\n- Consumidor: Modo pós-venda. Verifica a posição uma vez por dia, detecta apenas colisões. Apenas um Relatório de Status por dia tem uma posição GPS.\r\n- Ausente: Notificação quando o veículo é usado. Verificações periódicas de posição, detecta início/parada e colisões. A maioria dos alertas inclui posições GPS.\r\n- Recuperação: Modo de emergência para veículos roubados. Todos os relatórios incluem posições GPS, conexão constante com o servidor.\r\n- BOT (Battery Operating Tracking) (Padrão): Modo comum para uso geral. Todos os relatórios incluem posições GPS.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "IMS",
          es: "IMS",
          pt: "IMS",
        },
      },
      {
        value: "1",
        label: {
          en: "Consumer",
          es: "Consumidor",
          pt: "Consumidor",
        },
      },
      {
        value: "2",
        label: {
          en: "Away",
          es: "Ausente",
          pt: "Ausente",
        },
      },
      {
        value: "3",
        label: {
          en: "Recovery",
          es: "Recuperación",
          pt: "Recuperação",
        },
      },
      {
        value: "4",
        label: {
          en: "BOT",
          es: "BOT",
          pt: "BOT",
        },
      },
    ],
  },
  "1700": {
    title: {
      en: "Ignition Type",
      pt: "Tipo de Ignição",
      es: "Tipo de Ignición",
    },
    tooltip: {
      en: "The type of ignition detection to use.\r\n• Option\r\n- Ignition Line(Default)\r\n- Power Ignition : Determines ignition based on changes in vehicle voltage.\r\n- Motion Ignition : Determines ignition based on Accelerometer.\r\n* Using Motion Ignition will disable idle and tow modes.\r\n* The default setting for ST45XX and ST35XX models is Power Ignition.",
      es: "El tipo de detección de Activado a utilizar.\r\n• Opción\r\n- Línea de Activado (Predeterminado)\r\n- Activado por Energía: Determina el Activado basado en cambios en el voltaje del vehículo.\r\n- Activado por Movimiento: Determina el Activado basado en el Acelerómetro.\r\n* Usar el Activado por Movimiento desactivará los modos inactivo y de remolque.\r\n* La configuración predeterminada para los modelos ST45XX y ST35XX es Ignición por energía.",
      pt: "O tipo de detecção de ignição a ser utilizado.\r\n• Opção\r\n- Linha de Ignição (Padrão)\r\n- Ignição por Potência: Determina a ignição com base nas mudanças de voltagem do veículo.\r\n- Ignição por Movimento: Determina a ignição com base no Acelerômetro.\r\n* Usar a Ignição por Movimento desativará os modos de marcha lenta e reboque.\r\n* A configuração padrão para os modelos ST45XX e ST35XX é Ignição por Potência.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "Ignition Line",
          es: "Línea de Ignición",
          pt: "Linha de Ignição",
        },
      },
      {
        value: "02",
        label: {
          en: "Power Ignition",
          es: "Ignición por Energía",
          pt: "Ignição por Energia",
        },
      },
      {
        value: "03",
        label: {
          en: "Motion Ignition",
          es: "Ignición por Movimiento",
          pt: "Ignição por Movimento",
        },
      },
    ],
  },
  "1701": {
    title: {
      en: "Ignition Off Delay (seconds)",
      pt: "Atraso para Desligar Ignição (segundos)",
      es: "Retraso de ignición apagada (segundos)",
    },
    tooltip: {
      en: "The time required for the Ignition input to be ‘Off’ before the device recognizes the Ignition Off state and sends out the Alert ID for Ignition On.\r\n• Range : 0~255\r\n• Default : 60",
      es: "El tiempo requerido para que la entrada de la ignición esté 'Apagada' antes de que el dispositivo reconozca el estado de ignición apagada y envíe el ID de Alerta para apagarla.\r\n• Rango: 0~255\r\n• Predeterminado: 60",
      pt: "O tempo necessário para que a entrada de ignição esteja 'Desligada' antes que o dispositivo reconheça o estado de Ignição Desligada e envie o Alerta de Ignição Desligada.\r\n• Intervalo : 0~255\r\n• Padrão : 60",
    },
    min: 0,
    max: 255,
    list: null,
  },
  "1702": {
    title: {
      en: "Ignition On Delay (seconds)",
      pt: "Atraso para Ligar Ignição (segundos)",
      es: "Retraso de ignición activada (segundos)",
    },
    tooltip: {
      en: "The time required for the Ignition input to be ‘On’ before the device recognizes the Ignition On state and sends out the Alert ID for Ignition On.\r\n• Range : 0~255\r\n• Default : 60",
      es: "El tiempo requerido para que la entrada de la ignición esté 'Activa' antes de que el dispositivo reconozca el estado de la ignición activa y envíe el ID de Alerta para activarla.\r\n• Rango: 0~255\r\n• Predeterminado: 60",
      pt: "O tempo necessário para que a entrada de ignição esteja 'Ligada' antes que o dispositivo reconheça o estado de Ignição Ligada e envie o Alerta de Ignição Ligada.\r\n• Intervalo : 0~255\r\n• Padrão : 60",
    },
    min: 0,
    max: 255,
    list: null,
  },
  "1705": {
    title: {
      en: "Motion Ignition On Threshold (1/255G)",
      pt: "Limiar de Ligação de Ignição por Movimento (1/255G)",
      es: "Umbral de ignición activa por Movimiento (1/255G)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting is the motion threshold used to determine Ignition On.\r\n• Range(On) : 3~100\r\n• Default : 5\r\n* Cannot set off when ether 1711 or 1713 is off.\r\n* Cannot be less than the value of 1708.",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración es el umbral de movimiento utilizado para determinar la ignición activa.\r\n• Rango ( Activado) : 3~100\r\n• Predeterminado: 5\r\n* No se puede desactivar cuando 1711 o 1713 están Desactivados.\r\n* No puede ser inferior al valor de 1708.",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração é o limite de movimento usado para determinar a Ignição Ligada.\r\n• Intervalo(Ligado) : 3~100\r\n• Padrão : 5\r\n* Não pode ser desativado quando 1711 ou 1713 estiver desligado.\r\n* Não pode ser inferior ao valor de 1708.",
    },
    min: 3,
    max: 100,
    list: null,
  },
  "1706": {
    title: {
      en: "Motion Ignition On Delay (seconds)",
      pt: "Atraso para Ligação de Ignição por Movimento (segundos)",
      es: "Retraso de ignición activa por Movimiento (segundos)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting is the delay time for Motion Ignition On.\r\n• Range : 3~999\r\n• Default : 10",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración es el tiempo de retraso para la ignición por Movimiento.\r\n• Rango: 3~999\r\n• Predeterminado : 10",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração é o tempo de atraso para a Ignição Ligada.\r\n• Intervalo : 3~999\r\n• Padrão : 10",
    },
    min: 3,
    max: 999,
    list: null,
  },
  "1707": {
    title: {
      en: "Motion Ignition On Percent (%)",
      pt: "Porcentagem de Ligação de Ignição por Movimento (%)",
      es: "Porcentaje de ignición activa por Movimiento (%)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the percentage of time that 'No Motion' must be detected during the Ignition Off Delay.\r\n• Range : 30~100\r\n• Default : 70",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el porcentaje de tiempo que se debe detectar 'Sin Movimiento' durante el Retraso de Ignición Apagada.\r\n• Rango: 30~100\r\n• Predeterminado: 70",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina a porcentagem de tempo em que 'Sem Movimento' deve ser detectado durante o Atraso de Desligamento da Ignição.\r\n• Intervalo : 30~100\r\n• Padrão : 70",
    },
    min: 30,
    max: 100,
    list: null,
  },
  "1708": {
    title: {
      en: "Motion Ignition Off Threshold (1/255G)",
      pt: "Limiar de Desligamento de Ignição por Movimento (1/255G)",
      es: "Umbral de ignición apagada por Movimiento (1/255G)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting is the motion threshold used to determine Ignition Off.\r\n• Range(On) : 3~100\r\n• Default : 5\r\n* Cannot set off when ether 1711 or 1713 is off.\r\n* Cannot be greater than the value of 1705.",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración es el umbral de movimiento utilizado para determinar la ignición apagada\r\n• Rango ( Activado) : 3~100\r\n• Predeterminado : 5\r\n* No se puede desactivar cuando 1711 o 1713 están Desactivados.\r\n* No puede ser superior al valor de 1705.",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração é o limite de movimento usado para determinar a Ignição Desligada.\r\n• Intervalo(Ligado) : 3~100\r\n• Padrão : 5\r\n* Não pode ser desativado quando 1711 ou 1713 estiver desligado.\r\n* Não pode ser superior ao valor de 1705.",
    },
    min: 3,
    max: 100,
    list: null,
  },
  "1709": {
    title: {
      en: "Motion Ignition Off Delay (seconds)",
      pt: "Atraso para Desligamento de Ignição por Movimento (segundos)",
      es: "Retraso de ignición apagada por Movimiento (segundos)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting is the delay time for Motion Ignition Off.\r\n• Range : 3~999\r\n• Default : 10",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración es el tiempo de retraso para la ignición por Movimiento.\r\n• Rango: 3~999\r\n• Predeterminado : 10",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração é o tempo de atraso para a Ignição Desligada.\r\n• Intervalo : 3~999\r\n• Padrão : 10",
    },
    min: 3,
    max: 999,
    list: null,
  },
  "1710": {
    title: {
      en: "Motion Ignition Off Percent (%)",
      pt: "Porcentagem de Desligamento de Ignição por Movimento (%)",
      es: "Porcentaje de ignición apagada por Movimiento (%)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the percentage of time that 'No Motion' must be detected during the Ignition Off Delay.\r\n• Range : 30~100\r\n• Default : 70",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el porcentaje de tiempo que se debe detectar 'Sin Movimiento' durante el Retraso de la Ignición Apagada.\r\n• Rango: 30~100\r\n• Predeterminado: 70",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina a porcentagem de tempo em que 'Sem Movimento' deve ser detectado durante o Atraso de Desligamento da Ignição.\r\n• Intervalo : 30~100\r\n• Padrão : 70",
    },
    min: 30,
    max: 100,
    list: null,
  },
  "1711": {
    title: {
      en: "Motion Ignition On Rotation Threshold (deg/s)",
      pt: "Limiar de Giroscópio para Ligação de Ignição por Movimento (deg/s)",
      es: "Umbral del Giroscopio para la ignición activa por Movimiento (grados/s)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the Gyroscope Threshold used for Ignition On.\r\nWhen you turn off this fuction Ignition is not affected by Gyroscope.\r\n• Range(On) : 5.0~125.0\r\n• Default : 5.0\r\n* Cannot set off when ether 1705 or 1708 is off.",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el Umbral del Giroscopio utilizado para la ignición activa\r\nCuando se apaga esta función, la ignición no se ve afectado por el giroscopio.\r\n• Rango( Activado) : 5.0~125.0\r\n• Predeterminado : 5.0\r\n* No se puede desactivar cuando 1705 o 1708 están Desactivados.",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina o Limite do Giroscópio usado para Ignição Ligada.\r\nQuando você desativa esta função, a Ignição não é afetada pelo Giroscópio.\r\n• Intervalo(Ligado) : 5.0~125.0\r\n• Padrão : 5.0\r\n* Não pode ser desativado quando 1705 ou 1708 estiver desligado.",
    },
    min: 5,
    max: 125,
    list: null,
  },
  "1712": {
    title: {
      en: "Motion Ignition On Rotation Delay (seconds)",
      pt: "Atraso para Ligação de Ignição por Movimento com Giroscópio (segundos)",
      es: "Retraso del Giroscopio para la ignición activa por Movimiento (segundos)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the delay time for Ignition On.\r\n• Range : 3~999\r\n• Default : 10",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el tiempo de retraso para la ignición activa\r\n• Rango: 3~999\r\n• Predeterminado: 10",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina o tempo de atraso para a Ignição Ligada.\r\n• Intervalo : 3~999\r\n• Padrão : 10",
    },
    min: 3,
    max: 999,
    list: null,
  },
  "1713": {
    title: {
      en: "Motion Ignition Off Rotation Threshold (deg/s)",
      pt: "Limiar de Giroscópio para Desligamento de Ignição por Movimento (deg/s)",
      es: "Umbral del Giroscopio para la ignición apagada por Movimiento (grados/s)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the Gyroscope Threshold used for Ignition Off.\r\nWhen you turn off this fuction Ignition is not affected by Gyroscope.\r\n• Range(On) : 5.0~125.0\r\n• Default : 5.0\r\n* Cannot set off when ether 1705 or 1708 is off.",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el Umbral del Giroscopio utilizado para la ignición apagada.\r\nCuando apaga esta función, la ignición no se ve afectado por el giroscopio.\r\n• Rango( Activado) : 5.0~125.0\r\n• Predeterminado : 5.0\r\n* No se puede desactivar cuando 1705 o 1708 están Desactivados",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina o Limite do Giroscópio usado para Ignição Desligada.\r\nQuando você desativa esta função, a Ignição não é afetada pelo Giroscópio.\r\n• Intervalo(Ligado) : 5.0~125.0\r\n• Padrão : 5.0\r\n* Não pode ser desativado quando 1705 ou 1708 estiver desligado.",
    },
    min: 5,
    max: 125,
    list: null,
  },
  "1714": {
    title: {
      en: "Motion Ignition Off Rotation Delay (seconds)",
      pt: "Atraso para Desligamento de Ignição por Movimento com Giroscópio (segundos)",
      es: "Retraso del Giroscopio para la ignición apagada por Movimiento (segundos)",
    },
    tooltip: {
      en: "When using Motion Ignition, this setting determines the delay time for Ignition Off.\r\n• Range : 3~999\r\n• Default : 10",
      es: "Cuando se utiliza la ignición por Movimiento, esta configuración determina el tiempo de retraso para la ignición apagada\r\n• Rango: 3~999\r\n• Predeterminado: 10",
      pt: "Quando estiver usando a Ignição por Movimento, esta configuração determina o tempo de atraso para a Ignição Desligada.\r\n• Intervalo : 3~999\r\n• Padrão : 10",
    },
    min: 3,
    max: 999,
    list: null,
  },
  "1715": {
    title: {
      en: "Power Ignition High (Volts DC)",
      pt: "Ignição por Energia Alta (Volts DC)",
      es: "Ignición por Energía Alta (Voltios DC)",
    },
    tooltip: {
      en: "When using Power Ignition, this setting determines the threshold voltage for Ignition On.\r\nOnce the vehicle voltage rises above this level, the device will recognize it as Ignition On.\r\n• Range : 0~30\r\n• Default : 0\r\n* When set to '0', the device automatically checks for parking and driving.",
      es: "Cuando se utiliza la ignición por energía, esta configuración determina el voltaje umbral para la ignición activa\r\nUna vez que el voltaje del vehículo supere este nivel, el dispositivo lo reconocerá como la ignición activa\r\n• Rango: 0~30\r\n• Predeterminado: 0\r\n* Cuando se establece en '0', el dispositivo verifica automáticamente el estacionamiento y la conducción.",
      pt: "Quando estiver usando a Ignição por Potência, esta configuração determina a voltagem limite para Ignição Ligada.\r\nUma vez que a voltagem do veículo ultrapasse este nível, o dispositivo a reconhecerá como Ignição Ligada.\r\n• Intervalo : 0~30\r\n• Padrão : 0\r\n* Quando configurado como '0', o dispositivo verifica automaticamente estacionamento e condução.",
    },
    min: 0,
    max: 30,
    list: null,
  },
  "1716": {
    title: {
      en: "Power Ignition Low (Volts DC)",
      pt: "Ignição por Energia Baixa (Volts DC)",
      es: "Ignición por Energía Baja (Voltios DC)",
    },
    tooltip: {
      en: "When using Power Ignition, this setting determines the threshold voltage for Ignition Off.\r\nOnce the vehicle voltage rises above this level, the device will recognize it as Ignition Off.\r\n• Range : 0~30\r\n• Default : 0\r\n* When set to '0', the device automatically checks for parking and driving.",
      es: "Cuando se utiliza la ignición por energía, esta configuración determina el voltaje umbral para la ignición apagada\r\nUna vez que el voltaje del vehículo supere este nivel, el dispositivo lo reconocerá como la ignición apagada\r\n• Rango: 0~30\r\n• Predeterminado: 0\r\n* Cuando se establece en '0', el dispositivo verifica automáticamente el estacionamiento y la conducción.",
      pt: "Quando estiver usando a Ignição por Potência, esta configuração determina a voltagem limite para Ignição Desligada.\r\nUma vez que a voltagem do veículo ultrapasse este nível, o dispositivo a reconhecerá como Ignição Desligada.\r\n• Intervalo : 0~30\r\n• Padrão : 0\r\n* Quando configurado como '0', o dispositivo verifica automaticamente estacionamento e condução.",
    },
    min: 0,
    max: 30,
    list: null,
  },
  "1717": {
    title: {
      en: "GPS On at Motion",
      pt: "GPS ligado em Movimento",
      es: "GPS Activado en Movimiento",
    },
    tooltip: {
      en: "The device turns on GPS when motion is detected in Motionless Mode.\r\n• Default : On",
      es: "El dispositivo enciende el GPS cuando se detecta movimiento en el Modo Sin Movimiento. \r\n• Predeterminado: Activado",
      pt: "O dispositivo ativa o GPS quando o movimento é detectado no Modo Sem Movimento. \r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1720": {
    title: {
      en: "Input 1 Type",
      pt: "Entrada 1 Tipo",
      es: "Entrada 1 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\r\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\r\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\r\n- Panic Button : Sends an alert report when the Panic Button is pressed.\r\n* If an SMS number is set, pressing the panic button will send the current location to that number.\r\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\r\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\r\n- ADC(Analog-to-Digital Converter) :Analog Input.\r\n- Anti-Theft Button :\r\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\r\n* To use the Door Sensor, the Anti-theft button must be On.\r\n- Ignition\r\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\r\n- Speaker Volume : Adjust the speaker volume during a phone call.\r\n- 1-Wire \r\n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\r\n* Device will activate Output1 if the trailer is disconnected.\r\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\r\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\r\n* The expiration time is 12 seconds.\r\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\r\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'",
      es: "• Opción\r\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\r\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\r\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\r\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\r\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\r\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\r\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\r\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\r\n- Botón Antirrobo:\r\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\r\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\r\n- Ignición\r\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\r\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\r\n- 1-Wire\r\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\r\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\r\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\r\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\r\n* El tiempo de expiración es de 12 segundos.\r\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\r\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
      pt: "• Opção\r\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\r\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\r\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\r\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\r\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\r\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\r\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\r\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\r\n- Botão Anti-Roubo\r\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\r\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\r\n- Ignição\r\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\r\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\r\n- 1-Wire\r\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\r\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\r\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\r\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\r\n* O tempo de expiração é de 12 segundos.\r\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\r\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Descendente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Ascendente",
        },
      },
      {
        value: "02",
        label: {
          en: "Both Edge",
          es: "Ambos Bordes",
          pt: "Ambas as Bordas",
        },
      },
      {
        value: "03",
        label: {
          en: "Panic Button",
          es: "Botón de Pánico",
          pt: "Botão de Pânico",
        },
      },
      {
        value: "04",
        label: {
          en: "Call 1 Button",
          es: "Botón de Llamada 1",
          pt: "Botão de Chamada 1",
        },
      },
      {
        value: "05",
        label: {
          en: "Call 2 Button",
          es: "Botón de Llamada 2",
          pt: "Botão de Chamada 2",
        },
      },
      {
        value: "06",
        label: {
          en: "ADC",
          es: "ADC",
          pt: "ADC",
        },
      },
      {
        value: "07",
        label: {
          en: "Anti-Theft Button",
          es: "Botón Antirrobo",
          pt: "Botão Anti-Roubo",
        },
      },
      {
        value: "11",
        label: {
          en: "Door Sensor",
          es: "Sensor de Puerta",
          pt: "Sensor de Porta",
        },
      },
      {
        value: "12",
        label: {
          en: "Ignition",
          es: "Ignición",
          pt: "Ignição",
        },
      },
      {
        value: "13",
        label: {
          en: "Immobilizer Off",
          es: "Desactivación del Inmovilizador",
          pt: "Imobilizador Desligado",
        },
      },
      {
        value: "16",
        label: {
          en: "Speaker Volume",
          es: "Volumen del Altavoz",
          pt: "Volume do Alto-falante",
        },
      },
      {
        value: "18",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "19",
        label: {
          en: "Trailer Edge",
          es: "Borde del Remolque",
          pt: "Borda do Reboque",
        },
      },
      {
        value: "20",
        label: {},
      },
      {
        value: "21",
        label: {},
      },
      {
        value: "22",
        label: {},
      },
      {
        value: "23",
        label: {},
      },
      {
        value: "24",
        label: {},
      },
    ],
  },
  "1721": {
    title: {
      en: "Input 1 Delay Time",
      pt: "Tempo de Atraso da Entrada 1",
      es: "Tiempo de Retardo de Entrada 1",
    },
    tooltip: {
      en: "How long an input change must last before sending a report. \r\nIt helps to ignore noise and only responds to actual signal changes.\r\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\r\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
      es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe.\r\nAyuda a ignorar el ruido y solo responde a cambios de señal reales.\r\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\r\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
      pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório.\r\nIsso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\r\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\r\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
    },
    min: null,
    max: 9999,
    list: null,
  },
  "1722": {
    title: {
      en: "Input 2 Type",
      pt: "Entrada 2 Tipo",
      es: "Entrada 2 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\r\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\r\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\r\n- Panic Button : Sends an alert report when the Panic Button is pressed.\r\n* If an SMS number is set, pressing the panic button will send the current location to that number.\r\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\r\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\r\n- ADC(Analog-to-Digital Converter) :Analog Input.\r\n- Anti-Theft Button :\r\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\r\n* To use the Door Sensor, the Anti-theft button must be On.\r\n- Ignition\r\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\r\n- Speaker Volume : Adjust the speaker volume during a phone call.\r\n- 1-Wire \r\n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\r\n* Device will activate Output1 if the trailer is disconnected.\r\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\r\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\r\n* The expiration time is 12 seconds.\r\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\r\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'",
      es: "• Opción\r\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\r\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\r\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\r\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\r\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\r\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\r\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\r\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\r\n- Botón Antirrobo:\r\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\r\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\r\n- Ignición\r\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\r\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\r\n- 1-Wire\r\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\r\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\r\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\r\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\r\n* El tiempo de expiración es de 12 segundos.\r\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\r\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
      pt: "• Opção\r\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\r\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\r\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\r\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\r\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\r\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\r\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\r\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\r\n- Botão Anti-Roubo\r\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\r\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\r\n- Ignição\r\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\r\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\r\n- 1-Wire\r\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\r\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\r\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\r\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\r\n* O tempo de expiração é de 12 segundos.\r\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\r\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Descendente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Ascendente",
        },
      },
      {
        value: "02",
        label: {
          en: "Both Edge",
          es: "Ambos Bordes",
          pt: "Ambas as Bordas",
        },
      },
      {
        value: "03",
        label: {
          en: "Panic Button",
          es: "Botón de Pánico",
          pt: "Botão de Pânico",
        },
      },
      {
        value: "04",
        label: {
          en: "Call 1 Button",
          es: "Botón de Llamada 1",
          pt: "Botão de Chamada 1",
        },
      },
      {
        value: "05",
        label: {
          en: "Call 2 Button",
          es: "Botón de Llamada 2",
          pt: "Botão de Chamada 2",
        },
      },
      {
        value: "06",
        label: {
          en: "ADC",
          es: "ADC",
          pt: "ADC",
        },
      },
      {
        value: "07",
        label: {
          en: "Anti-Theft Button",
          es: "Botón Antirrobo",
          pt: "Botão Anti-Roubo",
        },
      },
      {
        value: "11",
        label: {
          en: "Door Sensor",
          es: "Sensor de Puerta",
          pt: "Sensor de Porta",
        },
      },
      {
        value: "12",
        label: {
          en: "Ignition",
          es: "Ignición",
          pt: "Ignição",
        },
      },
      {
        value: "13",
        label: {
          en: "Immobilizer Off",
          es: "Desactivación del Inmovilizador",
          pt: "Imobilizador Desligado",
        },
      },
      {
        value: "16",
        label: {
          en: "Speaker Volume",
          es: "Volumen del Altavoz",
          pt: "Volume do Alto-falante",
        },
      },
      {
        value: "18",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "19",
        label: {
          en: "Trailer Edge",
          es: "Borde del Remolque",
          pt: "Borda do Reboque",
        },
      },
      {
        value: "20",
        label: {},
      },
      {
        value: "21",
        label: {},
      },
      {
        value: "22",
        label: {},
      },
      {
        value: "23",
        label: {},
      },
      {
        value: "24",
        label: {},
      },
    ],
  },
  "1723": {
    title: {
      en: "Input 2 Delay Time",
      pt: "Tempo de Atraso da Entrada 2",
      es: "Tiempo de Retardo de Entrada 2",
    },
    tooltip: {
      en: "How long an input change must last before sending a report. \r\nIt helps to ignore noise and only responds to actual signal changes.\r\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\r\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
      es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe.\r\nAyuda a ignorar el ruido y solo responde a cambios de señal reales.\r\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\r\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
      pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório.\r\nIsso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\r\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\r\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
    },
    min: null,
    max: 9999,
    list: null,
  },
  "1724": {
    title: {
      en: "Input 3 Type",
      pt: "Entrada 3 Tipo",
      es: "Entrada 3 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\r\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\r\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\r\n- Panic Button : Sends an alert report when the Panic Button is pressed.\r\n* If an SMS number is set, pressing the panic button will send the current location to that number.\r\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\r\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\r\n- ADC(Analog-to-Digital Converter) :Analog Input.\r\n- Anti-Theft Button :\r\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\r\n* To use the Door Sensor, the Anti-theft button must be On.\r\n- Ignition\r\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\r\n- Speaker Volume : Adjust the speaker volume during a phone call.\r\n- 1-Wire \r\n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\r\n* Device will activate Output1 if the trailer is disconnected.\r\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\r\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\r\n* The expiration time is 12 seconds.\r\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\r\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'",
      es: "• Opción\r\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\r\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\r\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\r\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\r\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\r\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\r\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\r\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\r\n- Botón Antirrobo:\r\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\r\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\r\n- Ignición\r\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\r\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\r\n- 1-Wire\r\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\r\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\r\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\r\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\r\n* El tiempo de expiración es de 12 segundos.\r\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\r\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
      pt: "• Opção\r\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\r\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\r\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\r\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\r\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\r\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\r\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\r\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\r\n- Botão Anti-Roubo\r\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\r\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\r\n- Ignição\r\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\r\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\r\n- 1-Wire\r\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\r\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\r\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\r\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\r\n* O tempo de expiração é de 12 segundos.\r\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\r\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Descendente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Ascendente",
        },
      },
      {
        value: "02",
        label: {
          en: "Both Edge",
          es: "Ambos Bordes",
          pt: "Ambas as Bordas",
        },
      },
      {
        value: "03",
        label: {
          en: "Panic Button",
          es: "Botón de Pánico",
          pt: "Botão de Pânico",
        },
      },
      {
        value: "04",
        label: {
          en: "Call 1 Button",
          es: "Botón de Llamada 1",
          pt: "Botão de Chamada 1",
        },
      },
      {
        value: "05",
        label: {
          en: "Call 2 Button",
          es: "Botón de Llamada 2",
          pt: "Botão de Chamada 2",
        },
      },
      {
        value: "06",
        label: {
          en: "ADC",
          es: "ADC",
          pt: "ADC",
        },
      },
      {
        value: "07",
        label: {
          en: "Anti-Theft Button",
          es: "Botón Antirrobo",
          pt: "Botão Anti-Roubo",
        },
      },
      {
        value: "11",
        label: {
          en: "Door Sensor",
          es: "Sensor de Puerta",
          pt: "Sensor de Porta",
        },
      },
      {
        value: "12",
        label: {
          en: "Ignition",
          es: "Ignición",
          pt: "Ignição",
        },
      },
      {
        value: "13",
        label: {
          en: "Immobilizer Off",
          es: "Desactivación del Inmovilizador",
          pt: "Imobilizador Desligado",
        },
      },
      {
        value: "16",
        label: {
          en: "Speaker Volume",
          es: "Volumen del Altavoz",
          pt: "Volume do Alto-falante",
        },
      },
      {
        value: "18",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "19",
        label: {
          en: "Trailer Edge",
          es: "Borde del Remolque",
          pt: "Borda do Reboque",
        },
      },
      {
        value: "20",
        label: {},
      },
      {
        value: "21",
        label: {},
      },
      {
        value: "22",
        label: {},
      },
      {
        value: "23",
        label: {},
      },
      {
        value: "24",
        label: {},
      },
    ],
  },
  "1725": {
    title: {
      en: "Input 3 Delay Time",
      pt: "Tempo de Atraso da Entrada 3",
      es: "Tiempo de Retardo de Entrada 3",
    },
    tooltip: {
      en: "How long an input change must last before sending a report. \r\nIt helps to ignore noise and only responds to actual signal changes.\r\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\r\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
      es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe.\r\nAyuda a ignorar el ruido y solo responde a cambios de señal reales.\r\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\r\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
      pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório.\r\nIsso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\r\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\r\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
    },
    min: null,
    max: 9999,
    list: null,
  },
  "1726": {
    title: {
      en: "Input 4 Type",
      pt: "Entrada 4 Tipo",
      es: "Entrada 4 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\r\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\r\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\r\n- Panic Button : Sends an alert report when the Panic Button is pressed.\r\n* If an SMS number is set, pressing the panic button will send the current location to that number.\r\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\r\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\r\n- ADC(Analog-to-Digital Converter) :Analog Input.\r\n- Anti-Theft Button :\r\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\r\n* To use the Door Sensor, the Anti-theft button must be On.\r\n- Ignition\r\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\r\n- Speaker Volume : Adjust the speaker volume during a phone call.\r\n- 1-Wire \r\n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\r\n* Device will activate Output1 if the trailer is disconnected.\r\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\r\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\r\n* The expiration time is 12 seconds.\r\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\r\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'",
      es: "• Opción\r\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\r\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\r\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\r\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\r\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\r\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\r\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\r\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\r\n- Botón Antirrobo:\r\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\r\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\r\n- Ignición\r\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\r\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\r\n- 1-Wire\r\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\r\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\r\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\r\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\r\n* El tiempo de expiración es de 12 segundos.\r\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\r\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
      pt: "• Opção\r\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\r\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\r\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\r\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\r\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\r\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\r\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\r\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\r\n- Botão Anti-Roubo\r\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\r\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\r\n- Ignição\r\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\r\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\r\n- 1-Wire\r\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\r\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\r\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\r\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\r\n* O tempo de expiração é de 12 segundos.\r\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\r\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Descendente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Ascendente",
        },
      },
      {
        value: "02",
        label: {
          en: "Both Edge",
          es: "Ambos Bordes",
          pt: "Ambas as Bordas",
        },
      },
      {
        value: "03",
        label: {
          en: "Panic Button",
          es: "Botón de Pánico",
          pt: "Botão de Pânico",
        },
      },
      {
        value: "04",
        label: {
          en: "Call 1 Button",
          es: "Botón de Llamada 1",
          pt: "Botão de Chamada 1",
        },
      },
      {
        value: "05",
        label: {
          en: "Call 2 Button",
          es: "Botón de Llamada 2",
          pt: "Botão de Chamada 2",
        },
      },
      {
        value: "06",
        label: {
          en: "ADC",
          es: "ADC",
          pt: "ADC",
        },
      },
      {
        value: "07",
        label: {
          en: "Anti-Theft Button",
          es: "Botón Antirrobo",
          pt: "Botão Anti-Roubo",
        },
      },
      {
        value: "11",
        label: {
          en: "Door Sensor",
          es: "Sensor de Puerta",
          pt: "Sensor de Porta",
        },
      },
      {
        value: "12",
        label: {
          en: "Ignition",
          es: "Ignición",
          pt: "Ignição",
        },
      },
      {
        value: "13",
        label: {
          en: "Immobilizer Off",
          es: "Desactivación del Inmovilizador",
          pt: "Imobilizador Desligado",
        },
      },
      {
        value: "16",
        label: {
          en: "Speaker Volume",
          es: "Volumen del Altavoz",
          pt: "Volume do Alto-falante",
        },
      },
      {
        value: "18",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "19",
        label: {
          en: "Trailer Edge",
          es: "Borde del Remolque",
          pt: "Borda do Reboque",
        },
      },
      {
        value: "20",
        label: {},
      },
      {
        value: "21",
        label: {},
      },
      {
        value: "22",
        label: {},
      },
      {
        value: "23",
        label: {},
      },
      {
        value: "24",
        label: {},
      },
    ],
  },
  "1727": {
    title: {
      en: "Input 4 Delay Time",
      pt: "Tempo de Atraso da Entrada 4",
      es: "Tiempo de Retardo de Entrada 4",
    },
    tooltip: {
      en: "How long an input change must last before sending a report. \r\nIt helps to ignore noise and only responds to actual signal changes.\r\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\r\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
      es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe.\r\nAyuda a ignorar el ruido y solo responde a cambios de señal reales.\r\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\r\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
      pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório.\r\nIsso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\r\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\r\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
    },
    min: null,
    max: 9999,
    list: null,
  },
  "1728": {
    title: {
      en: "Input 5 Type",
      pt: "Entrada 5 Tipo",
      es: "Entrada 5 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\r\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\r\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\r\n- Panic Button : Sends an alert report when the Panic Button is pressed.\r\n* If an SMS number is set, pressing the panic button will send the current location to that number.\r\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\r\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\r\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\r\n- ADC(Analog-to-Digital Converter) :Analog Input.\r\n- Anti-Theft Button :\r\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\r\n* To use the Door Sensor, the Anti-theft button must be On.\r\n- Ignition\r\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\r\n- Speaker Volume : Adjust the speaker volume during a phone call.\r\n- 1-Wire \r\n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\r\n* Device will activate Output1 if the trailer is disconnected.\r\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\r\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\r\n* The expiration time is 12 seconds.\r\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\r\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'",
      es: "• Opción\r\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\r\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\r\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\r\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\r\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\r\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\r\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\r\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\r\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\r\n- Botón Antirrobo:\r\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\r\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\r\n- Ignición\r\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\r\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\r\n- 1-Wire\r\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\r\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\r\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\r\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\r\n* El tiempo de expiración es de 12 segundos.\r\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\r\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
      pt: "• Opção\r\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\r\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\r\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\r\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\r\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\r\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\r\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\r\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\r\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\r\n- Botão Anti-Roubo\r\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\r\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\r\n- Ignição\r\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\r\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\r\n- 1-Wire\r\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\r\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\r\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\r\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\r\n* O tempo de expiração é de 12 segundos.\r\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\r\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Descendente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Ascendente",
        },
      },
      {
        value: "02",
        label: {
          en: "Both Edge",
          es: "Ambos Bordes",
          pt: "Ambas as Bordas",
        },
      },
      {
        value: "03",
        label: {
          en: "Panic Button",
          es: "Botón de Pánico",
          pt: "Botão de Pânico",
        },
      },
      {
        value: "04",
        label: {
          en: "Call 1 Button",
          es: "Botón de Llamada 1",
          pt: "Botão de Chamada 1",
        },
      },
      {
        value: "05",
        label: {
          en: "Call 2 Button",
          es: "Botón de Llamada 2",
          pt: "Botão de Chamada 2",
        },
      },
      {
        value: "06",
        label: {
          en: "ADC",
          es: "ADC",
          pt: "ADC",
        },
      },
      {
        value: "07",
        label: {
          en: "Anti-Theft Button",
          es: "Botón Antirrobo",
          pt: "Botão Anti-Roubo",
        },
      },
      {
        value: "11",
        label: {
          en: "Door Sensor",
          es: "Sensor de Puerta",
          pt: "Sensor de Porta",
        },
      },
      {
        value: "12",
        label: {
          en: "Ignition",
          es: "Ignición",
          pt: "Ignição",
        },
      },
      {
        value: "13",
        label: {
          en: "Immobilizer Off",
          es: "Desactivación del Inmovilizador",
          pt: "Imobilizador Desligado",
        },
      },
      {
        value: "16",
        label: {
          en: "Speaker Volume",
          es: "Volumen del Altavoz",
          pt: "Volume do Alto-falante",
        },
      },
      {
        value: "18",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "19",
        label: {
          en: "Trailer Edge",
          es: "Borde del Remolque",
          pt: "Borda do Reboque",
        },
      },
      {
        value: "20",
        label: {},
      },
      {
        value: "21",
        label: {},
      },
      {
        value: "22",
        label: {},
      },
      {
        value: "23",
        label: {},
      },
      {
        value: "24",
        label: {},
      },
    ],
  },
  "1729": {
    title: {
      en: "Input 5 Delay Time",
      pt: "Tempo de Atraso da Entrada 5",
      es: "Tiempo de Retardo de Entrada 5",
    },
    tooltip: {
      en: "How long an input change must last before sending a report. \r\nIt helps to ignore noise and only responds to actual signal changes.\r\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\r\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
      es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe.\r\nAyuda a ignorar el ruido y solo responde a cambios de señal reales.\r\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\r\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
      pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório.\r\nIsso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\r\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\r\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
    },
    min: null,
    max: 9999,
    list: null,
  },
  "1760": {
    title: {
      en: "Output 1 Type",
      pt: "Saída 1 Tipo",
      es: "Salida 1 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- GPIO(Default)\r\n- Immobilizer\r\n- Immobilizer Auto : The immobilizer is automatically activated when the vehicle begins to park.\r\n- Pulse\r\n- Call LED\r\n- Buzzer\r\n- Horn Pulse\r\n- Buzzer Pulse\r\n- Disabled\r\n* In the case of a pulse, the pulse time may vary by approximately dozens of milliseconds (ms).\r\n* The immobilizer, LED blink line, and buzzer types cannot be set on both Output1 and Output2 simultaneously.\r\n* Even if an activation command is sent, the output of a disabled type will not be activated.",
      es: "• Opción\r\n- GPIO (Predeterminado)\r\n- Inmovilizador\r\n- Inmovilizador Automático: El inmovilizador se activa automáticamente cuando el vehículo comienza a estacionarse.\r\n- Pulso\r\n- LED de Llamada\r\n- Zumbador\r\n- Pulso de Bocina\r\n- Pulso del Zumbido\r\n- Desactivado\r\n* En el caso de un pulso, el tiempo del pulso puede variar aproximadamente en decenas de milisegundos (ms).\r\n* El inmovilizador, la línea de parpadeo del LED y los tipos de zumbidos no se pueden configurar simultáneamente en Output1 y Output2.\r\n* Incluso si se envía un comando de activación, la salida de un tipo deshabilitado no se activará.",
      pt: "• Opção\r\n- GPIO (Padrão)\r\n- Imobilizador\r\n- Imobilizador Automático : O imobilizador é ativado automaticamente quando o veículo começa a estacionar.\r\n- Pulso\r\n- LED de Chamada\r\n- Alarme\r\n- Pulso de Buzina\r\n- Pulso de Alarme\r\n- Desativado\r\n* No caso de um pulso, o tempo do pulso pode variar em aproximadamente dezenas de milissegundos (ms).\r\n* Os tipos imobilizador, linha de pisca-pisca de LED e alarme não podem ser configurados em Output1 e Output2 simultaneamente.\r\n* Mesmo que um comando de ativação seja enviado, a saída de um tipo desativado não será ativada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "GPIO",
          es: "GPIO",
          pt: "GPIO",
        },
      },
      {
        value: "01",
        label: {
          en: "Immobilizer",
          es: "Inmovilizador",
          pt: "Imobilizador",
        },
      },
      {
        value: "02",
        label: {
          en: "Immobilizer Auto",
          es: "Auto Inmovilizador",
          pt: "Imobilizador Automático",
        },
      },
      {
        value: "03",
        label: {
          en: "Pulse",
          es: "Pulso",
          pt: "Pulso",
        },
      },
      {
        value: "04",
        label: {
          en: "Call LED",
          es: "LED de Llamada",
          pt: "LED de Chamada",
        },
      },
      {
        value: "05",
        label: {
          en: "Buzzer",
          es: "Zumbador",
          pt: "Buzzer",
        },
      },
      {
        value: "16",
        label: {
          en: "Horn Pulse",
          es: "Pulso de Bocina",
          pt: "Pulso de Buzina",
        },
      },
      {
        value: "17",
        label: {
          en: "Buzzer Pulse",
          es: "Pulso de Zumbador",
          pt: "Pulso de Buzzer",
        },
      },
      {
        value: "18",
        label: {
          en: "Disabled",
          es: "Desactivado",
          pt: "Desativado",
        },
      },
      {
        value: "19",
        label: {},
      },
    ],
  },
  "1761": {
    title: {
      en: "Output 1 Active",
      pt: "Saída 1 Ativo",
      es: "Salida 1 Ativo",
    },
    tooltip: {
      en: "When the output is activated, this parameter controls whether the line is left Open or Grounded.\r\n• Option\r\n- Open\r\n- Ground(Default)",
      es: "Cuando se activa la salida, este parámetro controla si la línea se deja Abierta o Conectada a Tierra.\r\n• Opción\r\n- Abierto\r\n- Conectada a Tierra (Predeterminado)",
      pt: "Quando a saída é ativada, este parâmetro controla se a linha é deixada Aberta ou Aterrada.\r\n• Opção\r\n- Aberta\r\n- Aterrada (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Open",
          es: "Abierto",
          pt: "Aberto",
        },
      },
      {
        value: "01",
        label: {
          en: "Ground",
          es: "Tierra",
          pt: "Aterramento",
        },
      },
    ],
  },
  "1762": {
    title: {
      en: "Output 2 Type",
      pt: "Saída 2 Tipo",
      es: "Salida 2 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- GPIO(Default)\r\n- Immobilizer\r\n- Immobilizer Auto : The immobilizer is automatically activated when the vehicle begins to park.\r\n- Pulse\r\n- Call LED\r\n- Buzzer\r\n- Horn Pulse\r\n- Buzzer Pulse\r\n- Disabled\r\n* In the case of a pulse, the pulse time may vary by approximately dozens of milliseconds (ms).\r\n* The immobilizer, LED blink line, and buzzer types cannot be set on both Output1 and Output2 simultaneously.\r\n* Even if an activation command is sent, the output of a disabled type will not be activated.",
      es: "• Opción\r\n- GPIO (Predeterminado)\r\n- Inmovilizador\r\n- Inmovilizador Automático: El inmovilizador se activa automáticamente cuando el vehículo comienza a estacionarse.\r\n- Pulso\r\n- LED de Llamada\r\n- Zumbador\r\n- Pulso de Bocina\r\n- Pulso del Zumbido\r\n- Desactivado\r\n* En el caso de un pulso, el tiempo del pulso puede variar aproximadamente en decenas de milisegundos (ms).\r\n* El inmovilizador, la línea de parpadeo del LED y los tipos de zumbidos no se pueden configurar simultáneamente en Output1 y Output2.\r\n* Incluso si se envía un comando de activación, la salida de un tipo deshabilitado no se activará.",
      pt: "• Opção\r\n- GPIO (Padrão)\r\n- Imobilizador\r\n- Imobilizador Automático : O imobilizador é ativado automaticamente quando o veículo começa a estacionar.\r\n- Pulso\r\n- LED de Chamada\r\n- Alarme\r\n- Pulso de Buzina\r\n- Pulso de Alarme\r\n- Desativado\r\n* No caso de um pulso, o tempo do pulso pode variar em aproximadamente dezenas de milissegundos (ms).\r\n* Os tipos imobilizador, linha de pisca-pisca de LED e alarme não podem ser configurados em Output1 e Output2 simultaneamente.\r\n* Mesmo que um comando de ativação seja enviado, a saída de um tipo desativado não será ativada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "GPIO",
          es: "GPIO",
          pt: "GPIO",
        },
      },
      {
        value: "01",
        label: {
          en: "Immobilizer",
          es: "Inmovilizador",
          pt: "Imobilizador",
        },
      },
      {
        value: "02",
        label: {
          en: "Immobilizer Auto",
          es: "Auto Inmovilizador",
          pt: "Imobilizador Automático",
        },
      },
      {
        value: "03",
        label: {
          en: "Pulse",
          es: "Pulso",
          pt: "Pulso",
        },
      },
      {
        value: "04",
        label: {
          en: "Call LED",
          es: "LED de Llamada",
          pt: "LED de Chamada",
        },
      },
      {
        value: "05",
        label: {
          en: "Buzzer",
          es: "Zumbador",
          pt: "Buzzer",
        },
      },
      {
        value: "16",
        label: {
          en: "Horn Pulse",
          es: "Pulso de Bocina",
          pt: "Pulso de Buzina",
        },
      },
      {
        value: "17",
        label: {
          en: "Buzzer Pulse",
          es: "Pulso de Zumbador",
          pt: "Pulso de Buzzer",
        },
      },
      {
        value: "18",
        label: {
          en: "Disabled",
          es: "Desactivado",
          pt: "Desativado",
        },
      },
      {
        value: "19",
        label: {},
      },
    ],
  },
  "1763": {
    title: {
      en: "Output 2 Active",
      pt: "Saída 2 Ativo",
      es: "Salida 2 Ativo",
    },
    tooltip: {
      en: "When the output is activated, this parameter controls whether the line is left Open or Grounded.\r\n• Option\r\n- Open\r\n- Ground(Default)",
      es: "Cuando se activa la salida, este parámetro controla si la línea se deja Abierta o Conectada a Tierra.\r\n• Opción\r\n- Abierto\r\n- Conectada a Tierra (Predeterminado)",
      pt: "Quando a saída é ativada, este parâmetro controla se a linha é deixada Aberta ou Aterrada.\r\n• Opção\r\n- Aberta\r\n- Aterrada (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Open",
          es: "Abierto",
          pt: "Aberto",
        },
      },
      {
        value: "01",
        label: {
          en: "Ground",
          es: "Tierra",
          pt: "Aterramento",
        },
      },
    ],
  },
  "1764": {
    title: {
      en: "Output 3 Type",
      pt: "Saída 3 Tipo",
      es: "Salida 3 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- GPIO(Default)\r\n- Immobilizer\r\n- Immobilizer Auto : The immobilizer is automatically activated when the vehicle begins to park.\r\n- Pulse\r\n- Call LED\r\n- Buzzer\r\n- Horn Pulse\r\n- Buzzer Pulse\r\n- Disabled\r\n* In the case of a pulse, the pulse time may vary by approximately dozens of milliseconds (ms).\r\n* The immobilizer, LED blink line, and buzzer types cannot be set on both Output1 and Output2 simultaneously.\r\n* Even if an activation command is sent, the output of a disabled type will not be activated.",
      es: "• Opción\r\n- GPIO (Predeterminado)\r\n- Inmovilizador\r\n- Inmovilizador Automático: El inmovilizador se activa automáticamente cuando el vehículo comienza a estacionarse.\r\n- Pulso\r\n- LED de Llamada\r\n- Zumbador\r\n- Pulso de Bocina\r\n- Pulso del Zumbido\r\n- Desactivado\r\n* En el caso de un pulso, el tiempo del pulso puede variar aproximadamente en decenas de milisegundos (ms).\r\n* El inmovilizador, la línea de parpadeo del LED y los tipos de zumbidos no se pueden configurar simultáneamente en Output1 y Output2.\r\n* Incluso si se envía un comando de activación, la salida de un tipo deshabilitado no se activará.",
      pt: "• Opção\r\n- GPIO (Padrão)\r\n- Imobilizador\r\n- Imobilizador Automático : O imobilizador é ativado automaticamente quando o veículo começa a estacionar.\r\n- Pulso\r\n- LED de Chamada\r\n- Alarme\r\n- Pulso de Buzina\r\n- Pulso de Alarme\r\n- Desativado\r\n* No caso de um pulso, o tempo do pulso pode variar em aproximadamente dezenas de milissegundos (ms).\r\n* Os tipos imobilizador, linha de pisca-pisca de LED e alarme não podem ser configurados em Output1 e Output2 simultaneamente.\r\n* Mesmo que um comando de ativação seja enviado, a saída de um tipo desativado não será ativada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "GPIO",
          es: "GPIO",
          pt: "GPIO",
        },
      },
      {
        value: "01",
        label: {
          en: "Immobilizer",
          es: "Inmovilizador",
          pt: "Imobilizador",
        },
      },
      {
        value: "02",
        label: {
          en: "Immobilizer Auto",
          es: "Auto Inmovilizador",
          pt: "Imobilizador Automático",
        },
      },
      {
        value: "03",
        label: {
          en: "Pulse",
          es: "Pulso",
          pt: "Pulso",
        },
      },
      {
        value: "04",
        label: {
          en: "Call LED",
          es: "LED de Llamada",
          pt: "LED de Chamada",
        },
      },
      {
        value: "05",
        label: {
          en: "Buzzer",
          es: "Zumbador",
          pt: "Buzzer",
        },
      },
      {
        value: "16",
        label: {
          en: "Horn Pulse",
          es: "Pulso de Bocina",
          pt: "Pulso de Buzina",
        },
      },
      {
        value: "17",
        label: {
          en: "Buzzer Pulse",
          es: "Pulso de Zumbador",
          pt: "Pulso de Buzzer",
        },
      },
      {
        value: "18",
        label: {
          en: "Disabled",
          es: "Desactivado",
          pt: "Desativado",
        },
      },
      {
        value: "19",
        label: {},
      },
    ],
  },
  "1765": {
    title: {
      en: "Output 3 Active",
      pt: "Saída 3 Ativo",
      es: "Salida 3 Ativo",
    },
    tooltip: {
      en: "When the output is activated, this parameter controls whether the line is left Open or Grounded.\r\n• Option\r\n- Open\r\n- Ground(Default)",
      es: "Cuando se activa la salida, este parámetro controla si la línea se deja Abierta o Conectada a Tierra.\r\n• Opción\r\n- Abierto\r\n- Conectada a Tierra (Predeterminado)",
      pt: "Quando a saída é ativada, este parâmetro controla se a linha é deixada Aberta ou Aterrada.\r\n• Opção\r\n- Aberta\r\n- Aterrada (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Open",
          es: "Abierto",
          pt: "Aberto",
        },
      },
      {
        value: "01",
        label: {
          en: "Ground",
          es: "Tierra",
          pt: "Aterramento",
        },
      },
    ],
  },
  "1766": {
    title: {
      en: "Output 4 Type",
      pt: "Saída 4 Tipo",
      es: "Salida 4 Tipo",
    },
    tooltip: {
      en: "• Option\r\n- GPIO(Default)\r\n- Immobilizer\r\n- Immobilizer Auto : The immobilizer is automatically activated when the vehicle begins to park.\r\n- Pulse\r\n- Call LED\r\n- Buzzer\r\n- Horn Pulse\r\n- Buzzer Pulse\r\n- Disabled\r\n* In the case of a pulse, the pulse time may vary by approximately dozens of milliseconds (ms).\r\n* The immobilizer, LED blink line, and buzzer types cannot be set on both Output1 and Output2 simultaneously.\r\n* Even if an activation command is sent, the output of a disabled type will not be activated.",
      es: "• Opción\r\n- GPIO (Predeterminado)\r\n- Inmovilizador\r\n- Inmovilizador Automático: El inmovilizador se activa automáticamente cuando el vehículo comienza a estacionarse.\r\n- Pulso\r\n- LED de Llamada\r\n- Zumbador\r\n- Pulso de Bocina\r\n- Pulso del Zumbido\r\n- Desactivado\r\n* En el caso de un pulso, el tiempo del pulso puede variar aproximadamente en decenas de milisegundos (ms).\r\n* El inmovilizador, la línea de parpadeo del LED y los tipos de zumbidos no se pueden configurar simultáneamente en Output1 y Output2.\r\n* Incluso si se envía un comando de activación, la salida de un tipo deshabilitado no se activará.",
      pt: "• Opção\r\n- GPIO (Padrão)\r\n- Imobilizador\r\n- Imobilizador Automático : O imobilizador é ativado automaticamente quando o veículo começa a estacionar.\r\n- Pulso\r\n- LED de Chamada\r\n- Alarme\r\n- Pulso de Buzina\r\n- Pulso de Alarme\r\n- Desativado\r\n* No caso de um pulso, o tempo do pulso pode variar em aproximadamente dezenas de milissegundos (ms).\r\n* Os tipos imobilizador, linha de pisca-pisca de LED e alarme não podem ser configurados em Output1 e Output2 simultaneamente.\r\n* Mesmo que um comando de ativação seja enviado, a saída de um tipo desativado não será ativada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "GPIO",
          es: "GPIO",
          pt: "GPIO",
        },
      },
      {
        value: "01",
        label: {
          en: "Immobilizer",
          es: "Inmovilizador",
          pt: "Imobilizador",
        },
      },
      {
        value: "02",
        label: {
          en: "Immobilizer Auto",
          es: "Auto Inmovilizador",
          pt: "Imobilizador Automático",
        },
      },
      {
        value: "03",
        label: {
          en: "Pulse",
          es: "Pulso",
          pt: "Pulso",
        },
      },
      {
        value: "04",
        label: {
          en: "Call LED",
          es: "LED de Llamada",
          pt: "LED de Chamada",
        },
      },
      {
        value: "05",
        label: {
          en: "Buzzer",
          es: "Zumbador",
          pt: "Buzzer",
        },
      },
      {
        value: "16",
        label: {
          en: "Horn Pulse",
          es: "Pulso de Bocina",
          pt: "Pulso de Buzina",
        },
      },
      {
        value: "17",
        label: {
          en: "Buzzer Pulse",
          es: "Pulso de Zumbador",
          pt: "Pulso de Buzzer",
        },
      },
      {
        value: "18",
        label: {
          en: "Disabled",
          es: "Desactivado",
          pt: "Desativado",
        },
      },
      {
        value: "19",
        label: {},
      },
    ],
  },
  "1767": {
    title: {
      en: "Output 4 Active",
      pt: "Saída 4 Ativo",
      es: "Salida 4 Ativo",
    },
    tooltip: {
      en: "When the output is activated, this parameter controls whether the line is left Open or Grounded.\r\n• Option\r\n- Open\r\n- Ground(Default)",
      es: "Cuando se activa la salida, este parámetro controla si la línea se deja Abierta o Conectada a Tierra.\r\n• Opción\r\n- Abierto\r\n- Conectada a Tierra (Predeterminado)",
      pt: "Quando a saída é ativada, este parâmetro controla se a linha é deixada Aberta ou Aterrada.\r\n• Opção\r\n- Aberta\r\n- Aterrada (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Open",
          es: "Abierto",
          pt: "Aberto",
        },
      },
      {
        value: "01",
        label: {
          en: "Ground",
          es: "Tierra",
          pt: "Aterramento",
        },
      },
    ],
  },
  "1775": {
    title: {
      en: "Pulse 1 No",
      pt: "Pulso 1 Não",
      es: "Pulso 1 No",
    },
    tooltip: {
      en: "Number of pulses for the output.\r\n• Range : 0~9,999\r\n• Default : 0",
      es: "Número de pulsos para la salida.\r\n• Rango : 0~9,999\r\n• Predeterminado: 0",
      pt: "Número de pulsos para a saída.\r\n• Intervalo : 0~9,999\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1776": {
    title: {
      en: "Pulse 1 ON(100ms)",
      pt: "Pulso 1 Ligado (100ms)",
      es: "Pulso 1 Activado (100ms)",
    },
    tooltip: {
      en: "The length of the High Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Alto.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Alto.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1777": {
    title: {
      en: "Pulse 1 OFF(100ms)",
      pt: "Pulso 1 Desligado (100ms)",
      es: "Pulso 1 Desactivado (100ms)",
    },
    tooltip: {
      en: "The length of the Low Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Bajo.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Baixo.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1780": {
    title: {
      en: "Pulse 2 No",
      pt: "Pulso 2 Não",
      es: "Pulso 2 No",
    },
    tooltip: {
      en: "Number of pulses for the output.\r\n• Range : 0~9,999\r\n• Default : 0",
      es: "Número de pulsos para la salida.\r\n• Rango : 0~9,999\r\n• Predeterminado: 0",
      pt: "Número de pulsos para a saída.\r\n• Intervalo : 0~9,999\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1781": {
    title: {
      en: "Pulse 2 ON(100ms)",
      pt: "Pulso 2 Ligado (100ms)",
      es: "Pulso 2 Activado (100ms)",
    },
    tooltip: {
      en: "The length of the High Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Alto.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Alto.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1782": {
    title: {
      en: "Pulse 2 OFF(100ms)",
      pt: "Pulso 2 Desligado (100ms)",
      es: "Pulso 2 Desactivado (100ms)",
    },
    tooltip: {
      en: "The length of the Low Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Bajo.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Baixo.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1783": {
    title: {
      en: "Pulse 3 No",
      pt: "Pulso 3 Não",
      es: "Pulso 3 No",
    },
    tooltip: {
      en: "Number of pulses for the output.\r\n• Range : 0~9,999\r\n• Default : 0",
      es: "Número de pulsos para la salida.\r\n• Rango : 0~9,999\r\n• Predeterminado: 0",
      pt: "Número de pulsos para a saída.\r\n• Intervalo : 0~9,999\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1784": {
    title: {
      en: "Pulse 3 ON(100ms)",
      pt: "Pulso 3 Ligado (100ms)",
      es: "Pulso 3 Activado (100ms)",
    },
    tooltip: {
      en: "The length of the High Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Alto.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Alto.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1785": {
    title: {
      en: "Pulse 3 OFF(100ms)",
      pt: "Pulso 3 Desligado (100ms)",
      es: "Pulso 3 Desactivado (100ms)",
    },
    tooltip: {
      en: "The length of the Low Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Bajo.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Baixo.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1786": {
    title: {
      en: "Pulse 4 No",
      pt: "Pulso 4 Não",
      es: "Pulso 4 No",
    },
    tooltip: {
      en: "Number of pulses for the output.\r\n• Range : 0~9,999\r\n• Default : 0",
      es: "Número de pulsos para la salida.\r\n• Rango : 0~9,999\r\n• Predeterminado: 0",
      pt: "Número de pulsos para a saída.\r\n• Intervalo : 0~9,999\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1787": {
    title: {
      en: "Pulse 4 ON(100ms)",
      pt: "Pulso 4 Ligado (100ms)",
      es: "Pulso 4 Activado (100ms)",
    },
    tooltip: {
      en: "The length of the High Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Alto.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Alto.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1788": {
    title: {
      en: "Pulse 4 OFF(100ms)",
      pt: "Pulso 4 Desligado (100ms)",
      es: "Pulso 4 Desactivado (100ms)",
    },
    tooltip: {
      en: "The length of the Low Pulse.\r\n• Range : 0~9,999\r\n• Units : 100ms\r\n• Default : 0",
      es: "La duración del Pulso Bajo.\r\n• Rango: 0~9,999\r\n• Unidades: 100ms\r\n• Predeterminado: 0",
      pt: "O comprimento do Pulso Baixo.\r\n• Intervalo : 0~9,999\r\n• Unidades : 100ms\r\n• Padrão : 0",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "1900": {
    title: {
      en: "Motion Sensor",
      pt: "Sensor de Movimento",
      es: "Sensor de Movimiento",
    },
    tooltip: {
      en: "Motion Sensor settings\r\n• Option\r\n- Motion(Default) : Motion detection\r\n- Shock(Default) : Shock detection\r\n- Collision(Default) : Accident detection",
      es: "Configuraciones del Sensor de Movimiento\r\n• Opción\r\n- Movimiento(Predeterminado) : Detección de movimiento\r\n- Choque(Predeterminado) : Detección de choque\r\n- Colisión(Predeterminado) : Detección de accidentes",
      pt: "Configurações do Sensor de Movimento\r\n• Opção\r\n- Movimento(Padrão) : Detecção de movimento\r\n- Choque(Padrão) : Detecção de choque\r\n- Colisão(Padrão) : Detecção de acidente",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Motion",
          es: "Movimiento",
          pt: "Movimento",
        },
      },
      {
        value: "b1",
        label: {
          en: "Shock",
          es: "Choque",
          pt: "Choque",
        },
      },
      {
        value: "b2",
        label: {
          en: "Collision",
          es: "Colisión",
          pt: "Colisão",
        },
      },
    ],
  },
  "1901": {
    title: {
      en: "Motion Threshold (G’s)",
      pt: "Limiar de Movimento (G’s)",
      es: "Umbral de Movimiento (G’s)",
    },
    tooltip: {
      en: "Motion detection level.\r\n• Range : 0.06~8.0\r\n• Default : 0.06\r\n* Cannot be greater than the value of 1903.",
      es: "Nivel de detección de movimiento.\r\n• Rango: 0.06~8.0\r\n• Predeterminado: 0.06\r\n* No puede ser superior al valor de 1903.",
      pt: "Nível de detecção de movimento.\r\n• Intervalo : 0.06~8.0\r\n• Padrão : 0.06\r\n* Não pode ser superior ao valor de 1903.",
    },
    min: 0.06,
    max: 8,
    list: null,
  },
  "1902": {
    title: {
      en: "Shock Detection Delay (seconds)",
      pt: "Atraso na Detecção de Choque (segundos)",
      es: "Retraso en la Detección de Choque (segundos)",
    },
    tooltip: {
      en: "Delay in entering shock detection mode after ignition off.\r\n• Range : 15~21,600\r\n• Default : 600\r\n* Cannot be less than the value of 1901.",
      es: "Retraso para entrar en el modo de detección de choque después de apagar la ignición.\r\n• Rango: 15~21,600\r\n• Predeterminado: 600\r\n* No puede ser inferior al valor de 1901.",
      pt: "Atraso na entrada no modo de detecção de choque após a ignição ser desligada.\r\n• Intervalo : 15~21.600\r\n• Padrão : 600\r\n* Não pode ser inferior ao valor de 1901.",
    },
    min: 15,
    max: 21600,
    list: null,
  },
  "1903": {
    title: {
      en: "Shock Threshold (G’s)",
      pt: "Limiar de Choque (G’s)",
      es: "Umbral de Choque (G’s)",
    },
    tooltip: {
      en: "Shock detection level.\r\n• Range : 0.06~8.0\r\n• Default : 0.7\r\n* Cannot be less than the value of 1901.",
      es: "Nivel de detección de choque.\r\n• Rango: 0.06~8.0\r\n• Predeterminado: 0.7\r\n* No puede ser inferior al valor de 1901.",
      pt: "Nível de detecção de choque.\r\n• Intervalo : 0.06~8.0\r\n• Padrão : 0.7\r\n* Não pode ser inferior ao valor de 1901.",
    },
    min: 0.06,
    max: 8,
    list: null,
  },
  "1904": {
    title: {
      en: "Collision Threshold (G’s)",
      pt: "Limiar de Colisão (G’s)",
      es: "Umbral de Colisión (G’s)",
    },
    tooltip: {
      en: "Collision detection level.\r\n• Range : 0.1~8.0\r\n• Default : 1.5\r\n* Cannot be less than the value of 1903.",
      es: "Nivel de detección de colisión.\r\n• Rango: 0.1~8.0\r\n• Predeterminado: 1.5\r\n* No puede ser inferior al valor de 1903.",
      pt: "Nível de detecção de colisão.\r\n• Intervalo : 0.1~8.0\r\n• Padrão : 1.5\r\n* Não pode ser inferior ao valor de 1903.",
    },
    min: 0.1,
    max: 8,
    list: null,
  },
  "1910": {
    title: {
      en: "Driver Pattern",
      pt: "Padrão de Condução",
      es: "Patrón de conducción",
    },
    tooltip: {
      en: "Driver Pattern Behavior function settings.\r\n• Default : Off",
      es: "Configuraciones de la función de Comportamiento del Patrón del Conductor.\r\n• Predeterminado: Desactivado",
      pt: "Configurações da função de Comportamento de Padrão do Motorista.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1911": {
    title: {
      en: "Base Speed (km/h)",
      pt: "Velocidade Base (km/h)",
      es: "Velocidad Base (km/h)",
    },
    tooltip: {
      en: "The device checks Driver Pattern Data when the speed exceeds this value.\r\n• Range : 1~512\r\n• Default : 10",
      es: "El dispositivo verifica los Datos del Patrón del Conductor cuando la velocidad excede este valor.\r\n• Rango: 1~512\r\n• Predeterminado: 10",
      pt: "O dispositivo verifica os Dados do Padrão do Motorista quando a velocidade excede este valor.\r\n• Intervalo : 1~512\r\n• Padrão : 10",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1912": {
    title: {
      en: "Fast Acceleration Detection Threshold (1/256G)",
      pt: "Limiar para Detecção de Aceleração Rápida (1/256G)",
      es: "Umbral de Detección de Aceleración Rápida (1/256G)",
    },
    tooltip: {
      en: "Detection of fast acceleration violations through accelerometer.\r\n• Range : 1~512\r\n• Default : 10\r\n* This is based on the speed difference over 1 second.",
      es: "Detección de exceso de aceleración rápida a través del acelerómetro.\r\n• Rango: 1~512\r\n• Predeterminado: 10\r\n* Esto se basa en la diferencia de velocidad en 1 segundo.",
      pt: "Detecção de violações de aceleração rápida através do acelerômetro.\r\n• Intervalo : 1~512\r\n• Padrão : 10\r\n* Isso é baseado na diferença de velocidade em 1 segundo.",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1913": {
    title: {
      en: "Harsh Brake Detection Threshold (1/256G)",
      pt: "Limiar para Detecção de Freio Brusco (1/256G)",
      es: "Umbral de Detección de Freno Brusco (1/256G)",
    },
    tooltip: {
      en: "Detection of harsh brake violations through accelerometer.\r\n• Range : 1~512\r\n• Default : 20\r\n* This is based on the speed difference over 1 second.",
      es: "Detección de exceso de frenado brusco a través del acelerómetro.\r\n• Rango: 1~512\r\n• Predeterminado: 20\r\n* Esto se basa en la diferencia de velocidad en 1 segundo.",
      pt: "Detecção de violações de freio brusco através do acelerômetro.\r\n• Intervalo : 1~512\r\n• Padrão : 20\r\n* Isso é baseado na diferença de velocidade em 1 segundo.",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1914": {
    title: {
      en: "Sharp Turn Detection Threshold (1/256G)",
      pt: "Limiar para Detecção de Curva Acentuada (1/256G)",
      es: "Umbral de Detección de Giro Brusco (1/256G)",
    },
    tooltip: {
      en: "Detection of sharp turn violations through accelerometer.\r\n• Range : 1~512\r\n• Default : 40\r\n* This is based on the speed difference over 1 second.",
      es: "Detección de exceso de giros bruscos a través del acelerómetro.\r\n• Rango: 1~512\r\n• Predeterminado: 40\r\n* Esto se basa en la diferencia de velocidad en 1 segundo.",
      pt: "Detecção de violações de curva acentuada através do acelerômetro.\r\n• Intervalo : 1~512\r\n• Padrão : 40\r\n* Isso é baseado na diferença de velocidade em 1 segundo.",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1915": {
    title: {
      en: "Crash Reconstruction Report",
      pt: "Relatório de Reconstrução de Acidente",
      es: "Informe de Reconstrucción de Accidentes",
    },
    tooltip: {
      en: "Crash reconstruction report settings on the device.\r\n• Default : Off\r\n* To set this function to 'On,' the ‘Collision’ option in 1900 must be checked.",
      es: "Configuraciones del informe de reconstrucción de accidentes en el dispositivo.\r\n• Predeterminado: Desactivado\r\n* Para activar esta función, debe estar marcada la opción ‘Colisión’ en 1900.",
      pt: "Configurações de relatório de reconstrução de acidente no dispositivo.\r\n• Padrão  : Desativado\r\n* Para definir esta função como 'Ligado', a opção 'Colisão' em 1900 deve estar marcada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1916": {
    title: {
      en: "Before Collision (seconds)",
      pt: "Antes da Colisão (segundos)",
      es: "Antes de la Colisión (segundos)",
    },
    tooltip: {
      en: "Record time before crash occurs.\r\n• Range(On) : 1~15\r\n• Default : 3",
      es: "Tiempo de grabación antes de que ocurra el accidente.\r\n• Rango ( Activado) : 1~15\r\n• Predeterminado: 3",
      pt: "Tempo de gravação antes do acidente ocorrer.\r\n• Intervalo(Ligado) : 1~15\r\n• Padrão : 3",
    },
    min: 1,
    max: 15,
    list: null,
  },
  "1917": {
    title: {
      en: "After Collision (seconds)",
      pt: "Depois da Colisão (segundos)",
      es: "Después de la Colisión (segundos)",
    },
    tooltip: {
      en: "Record time after crash occurs.\r\n• Range(On) : 1~15\r\n• Default : 1",
      es: "Tiempo de grabación después de que ocurra el accidente.\r\n• Rango ( Activado) : 1~15\r\n• Predeterminado: 1",
      pt: "Tempo de gravação após o acidente ocorrer.\r\n• Intervalo(Ligado) : 1~15\r\n• Padrão : 1",
    },
    min: 1,
    max: 15,
    list: null,
  },
  "1918": {
    title: {
      en: "Sampling Rate",
      pt: "Taxa de Amostragem",
      es: "Frecuencia de Muestreo",
    },
    tooltip: {
      en: "Accelerometer sampling rate per second.\r\n• Option\r\n- 4 Hz\r\n- 100 Hz(Default)\r\n- 800 Hz\r\n* Sampling is the process of converting continuous data or signals into discrete data by taking measurements at regular intervals.",
      es: "Tasa de muestreo del acelerómetro por segundo.\r\n• Opción\r\n- 4 Hz\r\n- 100 Hz (Predeterminado)\r\n- 800 Hz\r\n* El muestreo es el proceso de convertir datos o señales continuas en datos discretos tomando mediciones a intervalos regulares.",
      pt: "Taxa de amostragem do acelerômetro por segundo.\r\n• Opção\r\n- 4 Hz\r\n- 100 Hz (Padrão)\r\n- 800 Hz\r\n* A amostragem é o processo de converter dados ou sinais contínuos em dados discretos, realizando medições em intervalos regulares.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "4 Hz",
          es: "4 Hz",
          pt: "4 Hz",
        },
      },
      {
        value: "01",
        label: {
          en: "100 Hz",
          es: "100 Hz",
          pt: "100 Hz",
        },
      },
      {
        value: "02",
        label: {
          en: "800 Hz",
          es: "800 Hz",
          pt: "800 Hz",
        },
      },
    ],
  },
  "1919": {
    title: {
      en: "Motion Mode",
      pt: "Modo de Movimento",
      es: "Modo de Movimiento",
    },
    tooltip: {
      en: "Motion Mode settings.\r\n• Default : Off\r\n* When Motion Mode is On, Ignition and Deep Sleep states are controlled by 1902 and 1920.",
      es: "Configuraciones del Modo de Movimiento.\r\n• Predeterminado: Desactivado\r\n* Cuando el Modo de Movimiento está activado, la ignición y el deep sleep son controlados por 1902 y 1920.",
      pt: "Configurações do Modo de Movimento.\r\n• Padrão  : Desativado\r\n* Quando o Modo de Movimento está ativado, os estados de Ignição e Sono Profundo são controlados por 1902 e 1920.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1920": {
    title: {
      en: "Motion TMR2 - Deep Sleep Delay (seconds)",
      pt: "Motion TMR2 - Atraso para Sono Profundo (segundos)",
      es: "Movimiento TMR2 - Retraso en la deep sleep (segundos)",
    },
    tooltip: {
      en: "When Motion Mode is on, the delay time before entering Deep Sleep State after ignition is turned off.\r\n• Range : 1~1,800\r\n• Default : 600",
      es: "Cuando el Modo de Movimiento está activado, el tiempo de retraso anterior entra en Estado de deep sleep después de que se apaga la ignición.\r\n\r\n• Rango: 1~1,800\r\n• Predeterminado: 600",
      pt: "Quando o Modo de Movimento está ativado, o tempo de atraso antes de entrar no Estado de Sono Profundo após a ignição ser desligada.\r\n• Intervalo : 1~1,800\r\n• Padrão : 600",
    },
    min: 1,
    max: 1800,
    list: null,
  },
  "1921": {
    title: {
      en: "Base Speed of Fast Acceleration Detection (km/h)",
      pt: "Velocidade Base para Detecção de Aceleração Rápida (km/h)",
      es: "Velocidad Base para Detección de Aceleración Rápida (km/h)",
    },
    tooltip: {
      en: "Base Speed Limit value for detecting fast acceleration violations. The device checks Driver Pattern Data when the current speed exceeds this value.\r\n• Range : 1.0~512.0\r\n• Default : 10",
      es: "Valor del Límite de Velocidad Base para detectar exceso de aceleración rápida. El dispositivo verifica los Datos del Patrón del Conductor cuando la velocidad actual excede este valor.\r\n• Rango: 1.0~512.0\r\n• Predeterminado: 10",
      pt: "Valor do Limite de Velocidade Base para detectar violações de aceleração rápida. O dispositivo verifica os Dados do Padrão do Motorista quando a velocidade atual excede este valor.\r\n• Intervalo : 1.0~512.0\r\n• Padrão : 10",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1922": {
    title: {
      en: "Base Speed of Harsh Brake Detection (km/h)",
      pt: "Velocidade Base para Detecção de Freio Brusco (km/h)",
      es: "Velocidad Base para Detección de Freno Brusco (km/h)",
    },
    tooltip: {
      en: "Base Speed Limit value for detecting Harsh Brake violations. The device checks Driver Pattern Data when the current speed exceeds this value.\r\n• Range : 1.0~512.0\r\n• Default : 10",
      es: "Valor del Límite de Velocidad Base para detectar excesos de Frenado Brusco. El dispositivo verifica los Datos del Patrón del Conductor cuando la velocidad actual excede este valor.\r\n• Rango: 1.0~512.0\r\n• Predeterminado: 10",
      pt: "Valor do Limite de Velocidade Base para detectar violações de freio brusco. O dispositivo verifica os Dados do Padrão do Motorista quando a velocidade atual excede este valor.\r\n• Intervalo : 1.0~512.0\r\n• Padrão : 10",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1923": {
    title: {
      en: "Base Speed of Sharp Turn Detection (km/h)",
      pt: "Velocidade Base para Detecção de Curva Acentuada (km/h)",
      es: "Velocidad Base para Detección de Giro Brusco (km/h)",
    },
    tooltip: {
      en: "Base Speed Limit value for detecting Sharp Turn violations. The device checks Driver Pattern Data when the current speed exceeds this value.\r\n• Range : 1.0~512.0\r\n• Default : 10",
      es: "Valor del Límite de Velocidad Base para detectar excesos de Giros Bruscos. El dispositivo verifica los Datos del Patrón del Conductor cuando la velocidad actual excede este valor.\r\n• Rango: 1.0~512.0\r\n• Predeterminado: 10",
      pt: "Valor do Limite de Velocidade Base para detectar violações de curva acentuada. O dispositivo verifica os Dados do Padrão do Motorista quando a velocidade atual excede este valor.\r\n• Intervalo : 1.0~512.0\r\n• Padrão : 10",
    },
    min: 1,
    max: 512,
    list: null,
  },
  "1924": {
    title: {
      en: "DPA Buzzer",
      pt: "Buzzer DPA",
      es: "Zumbador DPA",
    },
    tooltip: {
      en: "When DPA events (such as fast acceleration, harsh braking, or sharp turns left or right) are detected, the buzzer sounds.\r\n• Default : Off",
      es: "Cuando se detectan eventos de DPA (como aceleración rápida, frenado brusco o giros bruscos a la izquierda o derecha), suena el zumbido.\r\n• Predeterminado: Desactivado",
      pt: "Quando eventos DPA (como aceleração rápida, freios bruscos ou curvas acentuadas à esquerda ou à direita) são detectados, o alarme soa.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1925": {
    title: {
      en: "DPA Buzzer Timer (seconds)",
      pt: "Temporizador do Buzzer DPA (segundos)",
      es: "Temporizador del Zumbador DPA (segundos)",
    },
    tooltip: {
      en: "When the buzzer activates due to DPA events, it will turn off automatically after the set time.\r\n• Range : 0~120\r\n• Default : 0",
      es: "Cuando el zumbido se activa debido a eventos de DPA, se apagará automáticamente después del tiempo configurado.\r\n• Rango: 0~120\r\n• Predeterminado: 0",
      pt: "Quando o alarme é ativado devido a eventos DPA, ele será desligado automaticamente após o tempo definido.\r\n• Intervalo : 0~120\r\n• Padrão : 0",
    },
    min: 0,
    max: 120,
    list: null,
  },
  "1930": {
    title: {
      en: "Sleep Mode",
      pt: "Modo de Suspensão",
      es: "Modo sleep",
    },
    tooltip: {
      en: "Sleep Mode Settings.\r\n• Option(On)\r\n- Deep Sleep Mode : GPS and Cell are both turned off during sleep\r\n- Sleep Mode : Only GPS is turned off during sleep\r\n- PSM Pref : Prefer the PSM of the modem\r\n- Modem Sleep Mode : Only Cell is turned off during sleep (GPS is always on)\r\n• Default : Off\r\n* If this is Off, GPS and Cell will be on all the time.",
      es: "Configuraciones del modo sleep\r\n• Opción( Activado)\r\n- Modo de deep sleep: GPS y celular están Desactivados durante el sueño\r\n- Modo de Suspensión: Solo el GPS está Desactivado durante el sueño\r\n- PSM Pref: Prefiere el PSM del módem\r\n- Modo sleep del Módem: Solo celular está Desactivado durante el sueño (GPS siempre está Activado)\r\n• Predeterminado: Desactivado\r\n* Si esto está Desactivado, el GPS y celular estarán Activados todo el tiempo.",
      pt: "Configurações do Modo de Sono.\r\n• Opção(Ligado)\r\n- Modo de Sono Profundo: GPS e Celular são ambos desligados durante o sono\r\n- Modo de Sono: Apenas o GPS é desligado durante o sono\r\n- PSM Pref: Preferir o PSM do modem\r\n- Modo de Sono do Modem: Apenas o Celular é desligado durante o sono (GPS está sempre ligado)\r\n• Padrão  : Desativado\r\n* Se esta opção estiver desligada, GPS e Celular estarão ligados o tempo todo.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Deep Sleep Mode",
          es: "Modo de deep sleep",
          pt: "Modo de Sono Profundo",
        },
      },
      {
        value: "02",
        label: {
          en: "Sleep Mode",
          es: "Modo sleep",
          pt: "Modo de Suspensão",
        },
      },
      {
        value: "03",
        label: {
          en: "Power Save Mode",
          es: "Modo de Ahorro de Energía",
          pt: "Modo de Economia de Energia",
        },
      },
      {
        value: "04",
        label: {
          en: "Modem Sleep Mode",
          es: "Modo sleep del Módem",
          pt: "Modo de Suspensão do Modem",
        },
      },
    ],
  },
  "1931": {
    title: {
      en: "Main Power Check",
      pt: "Verificação de Energia Principal",
      es: "Verificación de Energía Principal",
    },
    tooltip: {
      en: "Checking Main Power Disconnection.\r\n• Default : On",
      es: "Verificación de la Desconexión de la Alimentación Principal.\r\n• Predeterminado: Activado",
      pt: "Verificação de Desconexão da Alimentação Principal.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1932": {
    title: {
      en: "Backup Battery Error Check",
      pt: "Verificação de Erro na Bateria de Backup",
      es: "Verificación de Error de la Batería de Respaldo",
    },
    tooltip: {
      en: "Backup Battery Error Check.\r\n• Default : On",
      es: "Verificación de Error de la Batería de Respaldo.\r\n• Predeterminado: Activado",
      pt: "Verificação de Erro da Bateria de Backup.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1933": {
    title: {
      en: "Vehicle Battery Reference Voltage (Volts DC)",
      pt: "Voltagem de Referência da Bateria do Veículo (Volts DC)",
      es: "Voltaje de Referencia de la Batería del Vehículo (Voltios DC)",
    },
    tooltip: {
      en: "The Voltage Value setting determines whether the vehicle’s battery is 12V or 24V. \r\n(If set to 18V, voltages below 18V are considered 12V, and voltages above 18V are considered 24V.)\r\n• Range : 16.00~20.00\r\n• Default : 17.00\r\n* This uses the Shutdown Threshold Voltage to trigger Deep Sleep Mode and prevent battery drain.",
      es: "La configuración del Valor de Voltaje determina si la batería del vehículo es de 12V o 24V.\r\n(Si se configura en 18V, los voltajes por debajo de 18V se consideran 12V, y los voltajes por encima de 18V se consideran 24V.)\r\n• Rango: 16.00~20.00\r\n• Predeterminado: 17.00\r\n* Esto utiliza el Voltaje Umbral de Desactivado para activar el Modo de deep sleep y prevenir el drenaje de la batería.",
      pt: "A configuração do Valor de Voltagem determina se a bateria do veículo é 12V ou 24V.\r\n(Se configurado para 18V, tensões abaixo de 18V são consideradas 12V, e tensões acima de 18V são consideradas 24V.)\r\n• Intervalo : 16.00~20.00\r\n• Padrão : 17.00\r\n* Isso usa a Voltagem Limite de Desligamento para acionar o Modo de Sono Profundo e evitar o esgotamento da bateria.",
    },
    min: 16,
    max: 20,
    list: null,
  },
  "1934": {
    title: {
      en: "Shutdown Threshold - 12V Vehicle Battery (Volts DC)",
      pt: "Limiar de Desligamento - Bateria de Veículo 12V (Volts DC)",
      es: "Umbral de Desactivado - Batería de Vehículo de 12V (Voltios DC)",
    },
    tooltip: {
      en: "This voltage setting protects the 12V vehicle battery by turning off the device if the battery voltage drops below it.\r\n• Range : 6.00~14.00\r\n• Default : 8.00\r\n* This only works when the vehicle ignition is off.",
      es: "Esta configuración de voltaje protege la batería de un vehículo de 12V apagando el dispositivo si el voltaje de la batería cae por debajo de este.\r\n• Rango: 6.00~14.00\r\n• Predeterminado: 8.00\r\n* Esto solo funciona cuando la ignición del vehículo está apagada.",
      pt: "Esta configuração de voltagem protege a bateria do veículo de 12V, desligando o dispositivo se a voltagem da bateria cair abaixo deste valor.\r\n• Intervalo : 6.00~14.00\r\n• Padrão : 8.00\r\n* Isso só funciona quando a ignição do veículo está desligada.",
    },
    min: 6,
    max: 14,
    list: null,
  },
  "1935": {
    title: {
      en: "Shutdown Threshold - 24V Vehicle Battery (Volt DC)",
      pt: "Limiar de Desligamento - Bateria de Veículo 24V (Volts DC)",
      es: "Umbral de Desactivado - Batería de Vehículo de 24V (Voltios DC)",
    },
    tooltip: {
      en: "This voltage setting protects the 24V vehicle battery by turning off the device if the battery voltage drops below it.\r\n• Range : 16.00~24.00\r\n• Default : 18.00\r\n* This only works when the vehicle ignition is off.",
      es: "Esta configuración de voltaje protege la batería de un vehículo de 24V apagando el dispositivo si el voltaje de la batería cae por debajo de este.\r\n• Rango: 16.00~24.00\r\n• Predeterminado: 18.00\r\n* Esto solo funciona cuando la ignición del vehículo está apagada.",
      pt: "Esta configuração de voltagem protege a bateria do veículo de 24V, desligando o dispositivo se a voltagem da bateria cair abaixo deste valor.\r\n• Intervalo : 16.00~24.00\r\n• Padrão : 18.00\r\n* Isso só funciona quando a ignição do veículo está desligada.",
    },
    min: 16,
    max: 24,
    list: null,
  },
  "1936": {
    title: {
      en: "Low Backup Battery Shutdown",
      pt: "Desligamento por Baixa Bateria de Backup",
      es: "Desactivado por Baja Batería de Respaldo",
    },
    tooltip: {
      en: "Device powers off when vehicle battery is disconnected and backup battery voltage is low.\r\n• Default : On\r\n* When set to Off, the device stays on.",
      es: "El dispositivo se apaga cuando la batería del vehículo se desconecta y el voltaje de la batería de respaldo es bajo.\r\n• Predeterminado: Activado\r\n* Cuando se establece en Desactivado, el dispositivo permanece Activado.",
      pt: "O dispositivo desliga quando a bateria do veículo é desconectada e a voltagem da bateria de backup está baixa.\r\n• Padrão  : Ativado\r\n* Quando configurado para Desligado, o dispositivo permanece ligado.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1937": {
    title: {
      en: "Low Backup Battery Shutdown Threshold (Volts DC)",
      pt: "Limiar de Desligamento por Baixa Bateria de Backup (Volts DC)",
      es: "Umbral de Desactivado por Baja Batería de Respaldo (Voltios DC)",
    },
    tooltip: {
      en: "Backup battery voltage threshold for power off.\r\n• Range : 3.40~3.80\r\n• Default : 3.40",
      es: "Umbral de voltaje de la batería de respaldo para apagar.\r\n• Rango: 3.40~3.80\r\n• Predeterminado: 3.40",
      pt: "Limite de voltagem da bateria de backup para desligamento.\r\n• Intervalo : 3.40~3.80\r\n• Padrão : 3.4",
    },
    min: 3.4,
    max: 3.8,
    list: null,
  },
  "1938": {
    title: {
      en: "Low Backup Battery Alert Threshold (Volt DC)",
      pt: "Limiar de Alerta por Baixa Bateria de Backup (Volts DC)",
      es: "Umbral de Alerta por Baja Batería de Respaldo (Voltios DC)",
    },
    tooltip: {
      en: "Backup battery voltage threshold for the alert.\r\n• Range : 3.50~3.90\r\n• Default : 3.50\r\n* This only works when the vehicle ignition is off.",
      es: "Umbral de voltaje de la batería de respaldo para la alerta.\r\n• Rango: 3.50~3.90\r\n• Predeterminado: 3.50\r\n* Esto solo funciona cuando la ignición del vehículo está apagada.",
      pt: "Limite de voltagem da bateria de backup para alerta.\r\n• Intervalo : 3.50~3.90\r\n• Padrão : 3.50\r\n* Isso só funciona quando a ignição do veículo está desligada.",
    },
    min: 3.5,
    max: 3.9,
    list: null,
  },
  "1939": {
    title: {
      en: "Backup Battery Turn-On Threshold (Volt DC)",
      pt: "Limiar de Ligação da Bateria de Backup (Volts DC)",
      es: "Umbral de Activado de la Batería de Respaldo (Voltios DC)",
    },
    tooltip: {
      en: "Battery voltage threshold for automatic reboot after a low battery shutdown.\r\n• Range : 10~3,600",
      es: "Umbral de voltaje de la batería para reinicio automático después de un Desactivado por batería baja.\r\n• Rango: 10~3,600",
      pt: "Limite de voltagem da bateria para reinicialização automática após um desligamento por baixa bateria.\r\n• Intervalo : 10~3,600",
    },
    min: 10,
    max: 3600,
    list: null,
  },
  "1940": {
    title: {
      en: "Normal State Exit Delay (seconds)",
      pt: "Atraso para Saída do Estado Normal (segundos)",
      es: "Retraso de Salida de Estado Normal (segundos)",
    },
    tooltip: {
      en: "Normal level state exit delay time.\r\n• Range : 10~3,600",
      es: "Tiempo de retraso para salir del estado de nivel normal.\r\n• Rango: 10~3,600",
      pt: "Tempo de atraso para sair do estado de nível normal.\r\n• Intervalo : 10~3,600",
    },
    min: 10,
    max: 3600,
    list: null,
  },
  "1941": {
    title: {
      en: "Normal State Entry Voltage (Volt DC)",
      pt: "Voltagem de Entrada no Estado Normal (Volts DC)",
      es: "Voltaje de Entrada en Estado Normal (Voltios DC)",
    },
    tooltip: {
      en: "Normal level state entry voltage.\r\n• Range : 5.00~99.99",
      es: "Voltaje de entrada en estado de nivel normal.\r\n• Rango: 5.00~99.99",
      pt: "Voltagem de entrada no estado de nível normal.\r\n• Intervalo : 5.00~99.99",
    },
    min: 5,
    max: 99.99,
    list: null,
  },
  "1942": {
    title: {
      en: "Low State Entry Voltage (Volt DC)",
      pt: "Voltagem de Entrada no Estado de Baixa (Volts DC)",
      es: "Voltaje de Entrada en Estado Bajo (Voltios DC)",
    },
    tooltip: {
      en: "Low-level state entry voltage.\r\n• Range : 5.00~99.99",
      es: "Voltaje de entrada en estado de nivel bajo.\r\n• Rango: 5.00~99.99",
      pt: "Voltagem de entrada no estado de nível baixo.\r\n• Intervalo : 5.00~99.99",
    },
    min: 5,
    max: 99.99,
    list: null,
  },
  "1943": {
    title: {
      en: "Very Low State Entry Voltage (Volt DC)",
      pt: "Voltagem de Entrada no Estado de Muito Baixa (Volts DC)",
      es: "Voltaje de Entrada en Estado Muy Bajo (Voltios DC)",
    },
    tooltip: {
      en: "Very low level state entry voltage.\r\n• Range : 5.00~99.99",
      es: "Voltaje de entrada en estado de nivel muy bajo.\r\n• Rango: 5.00~99.99",
      pt: "Voltagem de entrada no estado de nível muito baixo.\r\n• Intervalo : 5.00~99.99",
    },
    min: 5,
    max: 99.99,
    list: null,
  },
  "1944": {
    title: {
      en: "eDRX Mode",
      pt: "Modo eDRX",
      es: "Modo eDRX",
    },
    tooltip: {
      en: "The eDRX (extended Discontinuous Reception) mode is a feature used in cellular networks to reduce power consumption.\r\n• Default : Off",
      es: "El modo eDRX (Recepción Discontinua Extendida) es una función utilizada en redes celulares para reducir el consumo de energía.\r\n• Predeterminado: Desactivado",
      pt: "O modo eDRX (Recepção Discontinua Estendida) é um recurso usado em redes celulares para reduzir o consumo de energia.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1945": {
    title: {
      en: "eDRX Value (seconds)",
      pt: "Valor eDRX",
      es: "Valor eDRX",
    },
    tooltip: {
      en: "eDRX Value sets the timing cycle for how long a device stays idle before periodically reconnecting to the network in eDRX mode.\r\n• Range : 0~15 (5.12 ~ 10,485.76 seconds)\r\n• Default : 0",
      es: "El Valor de eDRX establece el ciclo de tiempo para cuánto tiempo un dispositivo permanece inactivo antes de reconectarse periódicamente a la red en modo eDRX.\r\n• Rango: 0~15 (5.12 ~ 10,485.76 segundos)",
      pt: "O Valor eDRX define o ciclo de tempo para quanto tempo um dispositivo permanece inativo antes de se reconectar periodicamente à rede no modo eDRX.\r\n• Intervalo : 0~15 (5.12 ~ 10,485.76 segundos)",
    },
    min: 0,
    max: 15,
    list: null,
  },
  "1946": {
    title: {
      en: "eDRX PTW (seconds)",
      pt: "eDRX PTW",
      es: "eDRX PTW",
    },
    tooltip: {
      en: "eDRX PTW (Paging Time Window) is the time window during which a device can receive paging signals from the network in eDRX mode.\r\n• Range : 0~15 (1.28 ~ 20.48 seconds)\r\n• Default : 0",
      es: "eDRX PTW (Ventana de Tiempo de Paginación) es la ventana de tiempo durante la cual un dispositivo puede recibir señales de paginación de la red en modo eDRX.\r\n• Rango: 0~15 (1.28 ~ 20.48 segundos)",
      pt: "O eDRX PTW (Janela de Tempo de Paginação) é a janela de tempo durante a qual um dispositivo pode receber sinais de paginação da rede no modo eDRX.\r\n• Intervalo : 0~15 (1.28 ~ 20.48 segundos)",
    },
    min: 0,
    max: 15,
    list: null,
  },
  "1947": {
    title: {
      en: "Low Backup Battery Alert Capacity (%)",
      pt: "Capacidade de Alerta por Baixa Bateria de Backup (%)",
      es: "Capacidad de Alerta por Baja Batería de Respaldo (%)",
    },
    tooltip: {
      en: "Battery capacity threshold for the alert.\r\n• Range : 1~30\r\n• Default : 10",
      es: "Umbral de capacidad de la batería para la alerta.\r\n• Rango: 1~30\r\n• Predeterminado: 10",
      pt: "Limite de capacidade da bateria para alerta.\r\n• Intervalo : 1~30\r\n• Padrão : 10",
    },
    min: 1,
    max: 30,
    list: null,
  },
  "1948": {
    title: {
      en: "Charger Type",
      pt: "Tipo de Carregador",
      es: "Tipo de Cargador",
    },
    tooltip: {
      en: "Determine which is connected as the charger.\r\n• Option\r\n- Normal : Device operates independently most of the time and is connected to the charger occasionally.\r\n- Wall : Charger is always connected.\r\n- Vehicle (ACC) : Charges by using the vehicle's ACC power.\r\n* When this option is set, the ignition status is detected as a DC connection state rather than as motion.",
      es: "Determinar cuál está conectado como el cargador.\r\n• Opción\r\n- Normal: El dispositivo opera de manera independiente la mayor parte del tiempo y se conecta al cargador ocasionalmente.\r\nPared: El cargador siempre está conectado.\r\n- Vehículo (ACC): Se carga utilizando la energía ACC del vehículo.\r\n* Cuando esta opción está configurada, el estado de la ignición se detecta como un estado de conexión de CC en lugar de como movimiento.",
      pt: "Determinar qual está conectado como o carregador.\r\n• Opção\r\n- Normal : O dispositivo opera de forma independente na maior parte do tempo e é conectado ao carregador ocasionalmente.\r\n- Parede : O carregador está sempre conectado.\r\n- Veículo (ACC): Carrega usando a alimentação ACC do veículo.\r\n* Quando esta opção está configurada, o estado de ignição é detectado como um estado de conexão DC em vez de como movimento.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Normal",
          es: "Normal",
          pt: "Normal",
        },
      },
      {
        value: "1",
        label: {
          en: "Wall",
          es: "Pared",
          pt: "Parede",
        },
      },
      {
        value: "2",
        label: {
          en: "Vehicle(ACC)",
          es: "Vehículo (ACC)",
          pt: "Veículo (ACC)",
        },
      },
    ],
  },
  "1949": {
    title: {
      en: "Power Saving Mode",
      pt: "Modo de Economia de Energia",
      es: "Modo de Ahorro de Energía",
    },
    tooltip: {
      en: "Using Power Saving Mode\r\n• Option(On)\r\n- Power Saving Mode1 : Status Report interval is changed to Power Saving 1 Parking/Driving tracking time.\r\n- Power Saving Mode2 : Status Report interval is changed to Power Saving 2 Parking/Driving tracking time.\r\n• Default : Off\r\n* 2621 (Sensor Scan Power Saving) must be set On\r\n* The sensor report interval is adjusted to scan and report once per day.",
      es: "Uso del Modo de Ahorro de Energía\r\n• Opción ( Activado)\r\n- Modo de Ahorro de Energía 1: El intervalo de informes de estado se cambia al tiempo de seguimiento de Estacionamiento/Conducción de Ahorro de Energía 1.\r\n- Modo de Ahorro de Energía 2: El intervalo de informes de estado se cambia al tiempo de seguimiento de Estacionamiento/Conducción de Ahorro de Energía 2.\r\n• Predeterminado: Desactivado\r\n* 2621 (Ahorro de Energía de Escaneo de Sensores) debe estar activado\r\nEl intervalo de informes del sensor se ajusta para escanear e informar una vez al día.",
      pt: "Uso do Modo de Economia de Energia\r\n• Opção (Ligado)\r\n- Modo de Economia de Energia 1: O intervalo de relatório de status é alterado para Tempo de Rastreamento de Estacionamento/Condução de Economia de Energia 1.\r\n- Modo de Economia de Energia 2: O intervalo de relatório de status é alterado para Tempo de Rastreamento de Estacionamento/Condução de Economia de Energia 2.\r\n• Padrão  : Desativado\r\n* 2621 (Sensor Scan Power Saving) deve estar ativado\r\n* O intervalo de relatório do sensor é ajustado para escanear e relatar uma vez por dia.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Power Saving Mode1",
          es: "Modo de Ahorro de Energía1",
          pt: "Modo de Economia de Energia1",
        },
      },
      {
        value: "2",
        label: {
          en: "Power Saving Mode2",
          es: "Modo de Ahorro de Energía2",
          pt: "Modo de Economia de Energia2",
        },
      },
      {
        value: "3",
        label: {
          en: "Power Saving Mode1 + Power Saving Mode2",
          es: "Modo de Ahorro de Energía1 + Modo de Ahorro de Energía2",
          pt: "Modo de Economia de Energia1 + Modo de Economia de Energia2",
        },
      },
    ],
  },
  "1950": {
    title: {
      en: "RS232 Device",
      pt: "Dispositivo RS232",
      es: "Dispositivo RS232",
    },
    tooltip: {
      en: "Accessory that will be connected to the RS232 port.\r\n• Option(On)\r\n- RFID Reader : The RS232 port will be set to recognize the RFID format.\r\nThe device will send an alert when an ID is read. (The alert report will contain the ID.)\r\n- ST25T\r\n* Baud Rate must be set to 9,600bps.\r\n- ST20U\r\n* Baud Rate must be set to 115,200bps.\r\n- Fuel Sensor : The Fuel Sensor is connected to Output 2.\r\n* Output 2 must be set to Type: GPIO, Active: Ground\r\n* Baud Rate must be set to 9600bps.\r\n- Movon MDSM-7\r\n* The device sends alert ID 103, which includes various warnings depending on the setting conditions.\r\n- Movon MDSM-7 for UEX : The device sends a UEX Report whenever received states from MDSM-7 are changed.\r\n- Movon MDAS-9 : The device sends alert ID 104, which includes various warnings.\r\n- ST25TPM : ST25TPM uses the alert ID, parameters, and commands of ST25T\r\n* Baud Rate must be set to 9600bps.\r\n- Fuel Escort\r\n* Baud Rate must be set to 19,200bps.\r\n- THINK-i DSM\r\n* Baud Rate must be set to 115,200bps.",
      es: "Accesorio que se conectará al puerto RS232.\r\n• Opción( Activado)\r\n- Lector RFID: El puerto RS232 se configurará para reconocer el formato RFID.\r\nEl dispositivo enviará una alerta cuando se lea un ID. (El informe de alerta contendrá el ID).\r\n- ST25T\r\n* La tasa de baudios debe configurarse a 9,600bps.\r\n- ST20U\r\n* La tasa de baudios debe configurarse a 115,200bps.\r\n- Sensor de Combustible: El Sensor de Combustible está conectado a la Salida 2.\r\n* La Salida 2 debe configurarse como Tipo: GPIO, Activo: Tierra.\r\n* La tasa de baudios debe configurarse a 9600bps.\r\n- Movon MDSM-7\r\n* El dispositivo envía la alerta ID 103, que incluye varias advertencias dependiendo de las condiciones configuradas.\r\n- Movon MDSM-7 para UEX: El dispositivo envía un Informe UEX cada vez que cambian los estados recibidos de MDSM-7.\r\n- Movon MDAS-9: El dispositivo envía la alerta ID 104, que incluye varias advertencias.\r\n- ST25TPM: ST25TPM utiliza la alerta ID, parámetros y comandos de ST25T.\r\n* La tasa de baudios debe configurarse a 9600bps.\r\n- Fuel Escort\r\n* La tasa de baudios debe configurarse a 19,200bps.\r\n- THINK-i DSM\r\n* La tasa de baudios debe configurarse a 115,200bps.",
      pt: "Acessório que será conectado à porta RS232.\r\n• Opção(Ligado)\r\n- Leitor RFID: A porta RS232 será configurada para reconhecer o formato RFID.\r\nO dispositivo enviará um alerta quando um ID for lido. (O relatório de alerta conterá o ID.)\r\n- ST25T\r\n* A Taxa de Baud deve ser configurada para 9.600bps.\r\n- ST20U\r\n* A Taxa de Baud deve ser configurada para 115.200bps.\r\n- Sensor de Combustível: O Sensor de Combustível é conectado à Saída 2.\r\n* A Saída 2 deve ser configurada para Tipo: GPIO, Ativo: Terra.\r\n* A Taxa de Baud deve ser configurada para 9.600bps.\r\n- Movon MDSM-7\r\n* O dispositivo envia o alerta ID 103, que inclui vários avisos dependendo das condições de configuração.\r\n- Movon MDSM-7 para UEX: O dispositivo envia um Relatório UEX sempre que os estados recebidos do MDSM-7 são alterados.\r\n- Movon MDAS-9: O dispositivo envia o alerta ID 104, que inclui vários avisos.\r\n- ST25TPM: O ST25TPM usa o alerta ID, parâmetros e comandos do ST25T.\r\n* A Taxa de Baud deve ser configurada para 9.600bps.\r\n- Fuel Escort\r\n* A Taxa de Baud deve ser configurada para 19.200bps.\r\n- THINK-i DSM\r\n* A Taxa de Baud deve ser configurada para 115.200bps.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "RFID Reader",
          es: "Lector RFID",
          pt: "Leitor RFID",
        },
      },
      {
        value: "06",
        label: {
          en: "ST25T",
          es: "ST25T",
          pt: "ST25T",
        },
      },
      {
        value: "07",
        label: {
          en: "ST20U",
          es: "ST20U",
          pt: "ST20U",
        },
      },
      {
        value: "08",
        label: {
          en: "Fuel Sensor",
          es: "Sensor de Combustible",
          pt: "Sensor de Combustível",
        },
      },
      {
        value: "09",
        label: {
          en: "Movon MDSM-7",
          es: "Movon MDSM-7",
          pt: "Movon MDSM-7",
        },
      },
      {
        value: "10",
        label: {
          en: "Movon MDSM-7 for UEX",
          es: "Movon MDSM-7 para UEX",
          pt: "Movon MDSM-7 para UEX",
        },
      },
      {
        value: "11",
        label: {
          en: "Movon MDAS-9",
          es: "Movon MDAS-9",
          pt: "Movon MDAS-9",
        },
      },
      {
        value: "12",
        label: {
          en: "ST25TPM",
          es: "ST25TPM",
          pt: "ST25TPM",
        },
      },
      {
        value: "15",
        label: {
          en: "Fuel Escort",
          es: "Fuel Escort",
          pt: "Fuel Escort",
        },
      },
      {
        value: "16",
        label: {
          en: "THINK-i DSM",
          es: "THINK-i DSM",
          pt: "THINK-i DSM",
        },
      },
      {
        value: "18",
        label: {},
      },
    ],
  },
  "1951": {
    title: {
      en: "Baud Rate",
      pt: "Taxa de Baud",
      es: "Velocidad de Baud",
    },
    tooltip: {
      en: "Baud rate to be used on the RS232 port of the device.\r\n• Option\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps",
      es: "Tasa de baudios a utilizar en el puerto RS232 del dispositivo.\r\n• Opción\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps",
      pt: "Taxa de Baud a ser usada na porta RS232 do dispositivo.\r\n• Opção\r\n- 2.400bps\r\n- 4.800bps\r\n- 9.600bps\r\n- 19.200bps\r\n- 38.400bps\r\n- 115.200bps",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "No Use",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "2,400bps",
          es: "2,400bps",
          pt: "2,400bps",
        },
      },
      {
        value: "02",
        label: {
          en: "4,800bps",
          es: "4,800bps",
          pt: "4,800bps",
        },
      },
      {
        value: "03",
        label: {
          en: "9,600bps",
          es: "9,600bps",
          pt: "9,600bps",
        },
      },
      {
        value: "04",
        label: {
          en: "19,200bps",
          es: "19,200bps",
          pt: "19,200bps",
        },
      },
      {
        value: "05",
        label: {
          en: "38,400bps",
          es: "38,400bps",
          pt: "38,400bps",
        },
      },
      {
        value: "06",
        label: {
          en: "115,200bps",
          es: "115,200bps",
          pt: "115,200bps",
        },
      },
    ],
  },
  "1952": {
    title: {
      en: "Charging in Parking Mode",
      pt: "Carregando no Modo de Estacionamento",
      es: "Carga en Modo de Estacionamiento",
    },
    tooltip: {
      en: "Charging backup battery in parking mode.\r\n• Default : Off",
      es: "Carga de la batería de respaldo en modo de estacionamiento.\r\n• Predeterminado: Desactivado",
      pt: "Carregamento da bateria de backup no modo de estacionamento.\r\n• Padrão  : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1953": {
    title: {
      en: "Charging Stop Voltage - 12V (Volt DC)",
      pt: "Voltagem de Parada de Carregamento - 12V (Volts DC)",
      es: "Voltaje de Parada de Carga - 12V (Voltios DC)",
    },
    tooltip: {
      en: "Threshold to stop charging the backup battery in parking mode for a 12V vehicle.\r\n• Range(On) : 10.5~14.0\r\n• Default : Off",
      es: "Umbral para detener la carga de la batería de respaldo en modo de estacionamiento para un vehículo de 12V.\r\n• Rango ( Activado): 10.5~14.0\r\n• Predeterminado: Desactivado",
      pt: "Limite para parar o carregamento da bateria de backup no modo de estacionamento para um veículo de 12V.\r\n• Intervalo (Ligado) : 10.5~14.0\r\n• Padrão  : Desativado",
    },
    min: 10.5,
    max: 14,
    list: null,
  },
  "1954": {
    title: {
      en: "Charging Stop Voltage - 24V (Volt DC)",
      pt: "Voltagem de Parada de Carregamento - 24V (Volts DC)",
      es: "Voltaje de Parada de Carga - 24V (Voltios DC)",
    },
    tooltip: {
      en: "Threshold to stop charging the backup battery in parking mode for a 24V vehicle.\r\n• Range(On) : 10.5~26.0 \r\n• Default : Off",
      es: "Umbral para detener la carga de la batería de respaldo en modo de estacionamiento para un vehículo de 24V.\r\n• Rango ( Activado): 10.5~26.0\r\n• Predeterminado: Desactivado",
      pt: "Limite para parar o carregamento da bateria de backup no modo de estacionamento para um veículo de 24V.\r\n• Intervalo (Ligado) : 10.5~26.0\r\n• Padrão  : Desativado",
    },
    min: 10.5,
    max: 26,
    list: null,
  },
  "1956": {
    title: {
      en: "Disconnect Timeout (seconds)",
      pt: "Tempo Limite de Desconexão (segundos)",
      es: "Tiempo de Espera de Desconexión (segundos)",
    },
    tooltip: {
      en: "A warning is triggered after the set timeout period following a 'Status Request' sent via RS232.\r\n• Range : 30~72,000\r\n• Default : 30",
      es: "Se activa una advertencia después del período de tiempo de espera establecido tras un 'Solicitud de Estado' enviada a través de RS232.\r\n• Rango: 30~72,000\r\n• Predeterminado: 30",
      pt: "Um aviso é acionado após o tempo limite definido após uma 'Solicitação de Status' enviada via RS232.\r\n• Intervalo: 30~72.000\r\n• Padrão: 30",
    },
    min: 30,
    max: 72000,
    list: null,
  },
  "1957": {
    title: {
      en: "MDSM-7/9 Alert Delay",
      pt: "Atraso de Alerta MDSM-7/9",
      es: "Retraso de Alerta MDSM-7/9",
    },
    tooltip: {
      en: "If a warning from MDSM-7 occurs and does not end during the delay time, the device will send an alert to the server.\r\n• Range : 0~120\r\n• Default : 30",
      es: "Si una advertencia de MDSM-7 ocurre y no termina durante el tiempo de retardo, el dispositivo enviará una alerta al servidor.\r\n• Rango: 0~120\r\n• Predeterminado: 30",
      pt: "Se um aviso do MDSM-7 ocorrer e não terminar durante o tempo de atraso, o dispositivo enviará um alerta ao servidor.\r\n• Intervalo: 0~120\r\n• Padrão: 30",
    },
    min: 0,
    max: 120,
    list: null,
  },
  "1958": {
    title: {
      en: "Alert Report Through RS232",
      pt: "Relatório de Alerta via RS232",
      es: "Informe de Alerta a través de RS232",
    },
    tooltip: {
      en: "Sending Alert Report via RS232.\r\n• Default : Off\r\n* The RS232 setting must be set to Normal Mode.\r\n* Baud Rate must be configured.",
      es: "Enviar Informe de Alerta vía RS232.\r\n• Predeterminado: Desactivado\r\n* La configuración de RS232 debe estar en Modo Normal.\r\n* La tasa de baudios debe configurarse.",
      pt: "Envio de Relatório de Alerta via RS232.\r\n• Padrão : Desativado\r\n* A configuração RS232 deve ser definida para Modo Normal.\r\n* A Taxa de Baud deve ser configurada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1959": {
    title: {
      en: "Reboot Interval (minutes)",
      pt: "Intervalo de Reinicialização (minutos)",
      es: "Intervalo de Reinicio (minutos)",
    },
    tooltip: {
      en: "Periodic Reboot Interval.\r\n• Range(On) : 1~1,440\r\n• Default : 1,440\r\n* When set to 'Off,' periodic reboot is disabled.",
      es: "Intervalo de reinicio periódico.\r\n• Rango ( Activado): 1~1,440\r\n• Predeterminado: 1,440\r\n* Cuando se establece en 'Desactivado', el reinicio periódico está desactivado.",
      pt: "Intervalo de Reinicialização Periódica.\r\n• Intervalo (Ligado) : 1~1.440\r\n• Padrão : 1,440\r\n* Quando configurado para 'Desligado', a reinicialização periódica é desativada.",
    },
    min: 1,
    max: 1440,
    list: null,
  },
  "1970": {
    title: {
      en: "1-Wire",
      pt: "1-Wire",
      es: "1-Wire",
    },
    tooltip: {
      en: "The function the 1-wire is used for.\r\n• Option(On)\r\n- Driver ID : The device is configured to connect the iButton reader to the 1-Wire line. \r\n* When an iButton is placed on the reader, the device reads the ID and sends an Alert Report to the platform. \r\n* The ID is included in the ALERT_DATA field. \r\n* The DID header can be assigned to a Large Assign field to include the DID in each report.\r\n- Temperature Sensors : The device is configured to connect up to 8 temperature sensors in a chain. ST4955LCBW(1 sensor)\r\n* The device monitors the high and low temperature thresholds and sends alerts for high temperature, temperature return, and low temperature.\r\n• Default : Off",
      es: "La función para la que se utilizará 1-Wire.\r\n• Opción( Activado)\r\n- Driver ID: El dispositivo está configurado para conectar el lector iButton a la línea 1-Wire.\r\n* Cuando se coloca un iButton en el lector, el dispositivo lee el ID y envía un Informe de Alerta a la plataforma.\r\n* El ID se incluye en el campo ALERT_DATA.\r\n* El encabezado DID puede asignarse a un campo de Asignación Grande para incluir el DID en cada informe.\r\n- Sensores de Temperatura: El dispositivo está configurado para conectar hasta 8 sensores de temperatura en cadena.\r\n* El dispositivo monitorea los umbrales de temperatura alta y baja, y envía alertas por alta temperatura, retorno de temperatura y baja temperatura.\r\n• Predeterminado: Desactivado",
      pt: "A função que o 1-Wire será utilizado.\r\n• Opção(Ligado)\r\n- Driver ID: O dispositivo é configurado para conectar o leitor iButton à linha 1-Wire.\r\n* Quando um iButton é colocado no leitor, o dispositivo lê o ID e envia um Relatório de Alerta para a plataforma.\r\n* O ID é incluído no campo ALERT_DATA.\r\n* O cabeçalho DID pode ser atribuído a um campo Large Assign para incluir o DID em cada relatório.\r\n- Sensores de Temperatura: O dispositivo é configurado para conectar até 8 sensores de temperatura em cadeia.\r\n* O dispositivo monitora os limites de temperatura alta e baixa e envia alertas de alta temperatura, retorno de temperatura e baixa temperatura.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "disabled",
          es: "ID del Conductor",
          pt: "ID do Motorista",
        },
      },
      {
        value: "01",
        label: {
          en: "Driver ID",
          es: "Sensores de Temperatura",
          pt: "Sensores de Temperatura",
        },
      },
      {
        value: "02",
        label: {
          en: "Temperature Sensors\r\nTemperature Sensors & Driver ID",
        },
      },
      {
        value: "03",
        label: {},
      },
    ],
  },
  "1971": {
    title: {
      en: "Immobilizer/Buzzer Activation Delay (seconds)",
      pt: "Atraso na Ativação do Imobilizador/Buzzer (segundos)",
      es: "Retraso de Activación del Inmovilizador/Zumbador (segundos)",
    },
    tooltip: {
      en: "Delay time before the immobilizer/buzzer is activated when switching from parking mode to driving mode without tagging the registered driver's ID.\r\n• Range(On) : 10~900\r\n• Default : Off",
      es: "Tiempo de retardo antes de activar el inmovilizador/alarma al cambiar del modo de estacionamiento al modo de conducción sin marcar el ID del conductor registrado.\r\n• Rango( Activado): 10~900\r\n• Predeterminado: Desactivado",
      pt: "Tempo de atraso antes de ativar o imobilizador/alarme ao mudar do modo de estacionamento para o modo de condução sem marcar o ID do motorista registrado.\r\n• Intervalo(Ligado): 10~900\r\n• Padrão : Desativado",
    },
    min: 10,
    max: 900,
    list: null,
  },
  "1972": {
    title: {
      en: "Initialization Time (seconds)",
      pt: "Tempo de Inicialização (segundos)",
      es: "Tiempo de Inicialización (segundos)",
    },
    tooltip: {
      en: "After tagging the Driver ID, if the user does not drive within the lifetime, the Driver ID will be reset.\r\n• Range(On) : 10~3,600\r\n• Default : Off",
      es: "Después de marcar el ID del conductor, si el usuario no conduce dentro del período de validez, el ID del conductor se restablecerá.\r\n• Rango( Activado): 10~3.600\r\n• Predeterminado: Desactivado",
      pt: "Após marcar o ID do motorista, se o usuário não conduzir dentro do período de validade, o ID do motorista será redefinido.\r\n• Intervalo(Ligado): 10~3.600\r\n• Padrão : Desativado",
    },
    min: 10,
    max: 3600,
    list: null,
  },
  "1973": {
    title: {
      en: "Exclusion of Output Control",
      pt: "Exclusão do Controle de Saída",
      es: "Exclusión del Control de Salida",
    },
    tooltip: {
      en: "Output control excluded due to driver ID tag.\r\n• Default : Off",
      es: "Control de salida excluido debido a la marca del ID del conductor.\r\n• Predeterminado: Desactivado",
      pt: "Controle de saída excluído devido à marcação do ID do motorista.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "1974": {
    title: {
      en: "I-Button Add Master",
      pt: "Adicionar Mestre do I-Button",
      es: "Añadir Maestro del I-Button",
    },
    tooltip: {
      en: "Master driver ID to register new driver ID.\r\n* Cannot input over 16 bytes.\r\n* 1974 and 1975 cannot have the same values.\r\n* A Master is inserted and removed, then another I-button is inserted within 10 seconds after removing the Master. In this case, another ID can be registered automatically.",
      es: "ID maestro del conductor para registrar un nuevo ID del conductor.\r\n* No puede tener más de 16 bytes.\r\n* 1974 y 1975 no pueden tener los mismos valores.\r\n* Se inserta y se retira un Maestro, luego se inserta otro iButton dentro de los 10 segundos posteriores a la extracción del Maestro. En este caso, otro ID puede registrarse automáticamente.",
      pt: "ID mestre do motorista para registrar novo ID do motorista.\r\n* Não pode ter mais de 16 bytes.\r\n* 1974 e 1975 não podem ter os mesmos valores.\r\n* Um Mestre é inserido e removido, depois outro iButton é inserido dentro de 10 segundos após remover o Mestre. Nesse caso, outro ID pode ser registrado automaticamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1975": {
    title: {
      en: "I-Button Remove Master",
      pt: "Remover Mestre do I-Button",
      es: "Eliminar Maestro del I-Button",
    },
    tooltip: {
      en: "Master driver ID to unregister driver ID.\r\n* Cannot input over 16 bytes.\r\n* 1974 and 1975 cannot have the same values.\r\n* A Master is inserted and removed, then another I-button is inserted within 10 seconds after removing the Master. In this case, another ID can be unregistered automatically.",
      es: "ID maestro del conductor para desregistrar el ID del conductor.\r\n* No puede tener más de 16 bytes.\r\n* 1974 y 1975 no pueden tener los mismos valores.\r\n* Se inserta y se retira un Maestro, luego se inserta otro iButton dentro de los 10 segundos posteriores a la extracción del Maestro. En este caso, otro ID puede desregistrarse automáticamente.",
      pt: "ID mestre do motorista para desregistrar o ID do motorista.\r\n* Não pode ter mais de 16 bytes.\r\n* 1974 e 1975 não podem ter os mesmos valores.\r\n* Um Mestre é inserido e removido, depois outro iButton é inserido dentro de 10 segundos após remover o Mestre. Nesse caso, outro ID pode ser desregistrado automaticamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "1980": {
    title: {
      en: "Temperature 1 Threshold (°C)",
      pt: "Limite de Temperatura 1 (°C)",
      es: "Umbral de Temperatura 1 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1981": {
    title: {
      en: "Temperature 1 Threshold (°C)",
      pt: "Limite de Temperatura 1 (°C)",
      es: "Umbral de Temperatura 1 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1982": {
    title: {
      en: "Temperature 2 Threshold (°C)",
      pt: "Limite de Temperatura 2 (°C)",
      es: "Umbral de Temperatura 2 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1983": {
    title: {
      en: "Temperature 2 Threshold (°C)",
      pt: "Limite de Temperatura 2 (°C)",
      es: "Umbral de Temperatura 2 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1984": {
    title: {
      en: "Temperature 3 Threshold (°C)",
      pt: "Limite de Temperatura 3 (°C)",
      es: "Umbral de Temperatura 3 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1985": {
    title: {
      en: "Temperature 3 Threshold (°C)",
      pt: "Limite de Temperatura 3 (°C)",
      es: "Umbral de Temperatura 3 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1986": {
    title: {
      en: "Temperature 4 Threshold (°C)",
      pt: "Limite de Temperatura 4 (°C)",
      es: "Umbral de Temperatura 4 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1987": {
    title: {
      en: "Temperature 4 Threshold (°C)",
      pt: "Limite de Temperatura 4 (°C)",
      es: "Umbral de Temperatura 4 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1988": {
    title: {
      en: "Temperature 5 Threshold (°C)",
      pt: "Limite de Temperatura 5 (°C)",
      es: "Umbral de Temperatura 5 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1989": {
    title: {
      en: "Temperature 5 Threshold (°C)",
      pt: "Limite de Temperatura 5 (°C)",
      es: "Umbral de Temperatura 5 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1990": {
    title: {
      en: "Temperature 6 Threshold (°C)",
      pt: "Limite de Temperatura 6 (°C)",
      es: "Umbral de Temperatura 6 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1991": {
    title: {
      en: "Temperature 6 Threshold (°C)",
      pt: "Limite de Temperatura 6 (°C)",
      es: "Umbral de Temperatura 6 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1992": {
    title: {
      en: "Temperature 7 Threshold (°C)",
      pt: "Limite de Temperatura 7 (°C)",
      es: "Umbral de Temperatura 7 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1993": {
    title: {
      en: "Temperature 7 Threshold (°C)",
      pt: "Limite de Temperatura 7 (°C)",
      es: "Umbral de Temperatura 7 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1994": {
    title: {
      en: "Temperature 8 Threshold (°C)",
      pt: "Limite de Temperatura 8 (°C)",
      es: "Umbral de Temperatura 8 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1995": {
    title: {
      en: "Temperature 8 Threshold (°C)",
      pt: "Limite de Temperatura 8 (°C)",
      es: "Umbral de Temperatura 8 (°C)",
    },
    tooltip: {
      en: "Alert when the temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "1996": {
    title: {
      en: "Temperature Scan Interval Driving (minutes)",
      pt: "Varredura de Temperatura ao Dirigir (minutos)",
      es: "Escaneo de Temperatura al Conducir (minutos)",
    },
    tooltip: {
      en: "Temperature scan interval while driving.\r\n• Range(On) : 1~1,440\r\n• Default : Off",
      es: "Intervalo de escaneo de temperatura mientras se conduce.\r\n• Rango( Activado): 1~1,440\r\n• Predeterminado: Desactivado",
      pt: "Intervalo de varredura de temperatura enquanto dirige.\r\n• Intervalo(Ligado): 1~1.440\r\n• Padrão : Desativado",
    },
    min: 0,
    max: 1440,
    list: null,
  },
  "1997": {
    title: {
      en: "Temperature Scan Interval Parking (minutes)",
      pt: "Varredura de Temperatura ao Estacionar (minutos)",
      es: "Escaneo de Temperatura al Estacionar (minutos)",
    },
    tooltip: {
      en: "Temperature scan interval while parked.\r\n• Range(On) : 1~1,440\r\n• Default : Off",
      es: "Intervalo de escaneo de temperatura mientras se está estacionado.\r\n• Rango( Activado): 1~1,440\r\n• Predeterminado: Desactivado",
      pt: "Intervalo de varredura de temperatura enquanto estacionado.\r\n• Intervalo(Ligado): 1~1.440\r\n• Padrão : Desativado",
    },
    min: 0,
    max: 1440,
    list: null,
  },
  "1998": {
    title: {
      en: "Scan Count Threshold",
      pt: "Limite de Contagem de Varredura",
      es: "Umbral de Contador de Escaneo",
    },
    tooltip: {
      en: 'Report when the Scan Count reaches the set threshold\r\n• Range(On) : 1~360\r\n• Default : Off\r\n* Temperature Sensors must be selected in the 1970 Parameter."\r\n* If both 1996(or 1997) and 1998 are not zero, the temperature is saved in memory each time the 1996(or 1997) parameter expires.\r\n* When the 1998 is reached, the device sends a Temperature Report to the server.',
      es: 'Informe cuando el recuento de escaneos alcance el umbral establecido.\r\n• Rango( Activado): 1~360\r\n• Predeterminado: Desactivado\r\n* Los Sensores de Temperatura deben ser seleccionados en el Parámetro 1970.\r\n* Si tanto 1996 (o 1997) como 1998 no son cero, la temperatura se guarda en la memoria cada vez que expira el parámetro 1996 (o 1997).\r\n* Cuando se alcanza el valor de 1998, el dispositivo envía un Informe de Temperatura al servidor."',
      pt: 'Relatório quando a Contagem de Varredura atinge o limite definido.\r\n• Intervalo(Ligado): 1~360\r\n• Padrão : Desativado\r\n* Sensores de Temperatura devem ser selecionados no Parâmetro 1970.\r\n* Se 1996 (ou 1997) e 1998 não forem zero, a temperatura é armazenada na memória cada vez que o parâmetro 1996 (ou 1997) expira.\r\n* Quando o parâmetro 1998 é atingido, o dispositivo envia um Relatório de Temperatura para o servidor."',
    },
    min: 0,
    max: 360,
    list: null,
  },
  "1999": {
    title: {
      en: "Output Control",
      pt: "Controle de Saída",
      es: "Control de Salida",
    },
    tooltip: {
      en: "Output activation settings for Driver ID.\r\n• Option(On)\r\n- Output 1\r\n- Output 2\r\n• Default : Off",
      es: "Configuraciones de activación de salida para el ID del conductor.\r\n• Opción( Activado)\r\n- Salida 1\r\n- Salida 2\r\n• Predeterminado: Desactivado",
      pt: "Configurações de ativação de saída para Driver ID.\r\n• Opção(Ligado)\r\n- Saída 1\r\n- Saída 2\r\n• Padrão : Desativado",
    },
    min: 1,
    max: 3,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Output 1",
          es: "Salida 1",
          pt: "Saída 1",
        },
      },
      {
        value: "2",
        label: {
          en: "Output 2",
          es: "Salida 2",
          pt: "Saída 2",
        },
      },
      {
        value: "3",
        label: {
          en: "Output 1+Output 2",
          es: "Salida 1+Salida 2",
          pt: "Saída 1+Saída 2",
        },
      },
    ],
  },
  "2000": {
    title: {
      en: "OBD",
      pt: "OBD",
      es: "OBD",
    },
    tooltip: {
      en: "OBD operates when the engine is turned on.\r\n• Default : On",
      es: "El OBD opera cuando el motor está Activado.\r\n• Predeterminado: Activado",
      pt: "O OBD opera quando o motor é ligado.\r\n• Padrão  : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2002": {
    title: {
      en: "RPM Threshold",
      pt: "Limiar de RPM",
      es: "Umbral de RPM",
    },
    tooltip: {
      en: "The RPM threshold value for processing the 'RPM_COUNT' in the OBD Travel Report.\r\n• Range : 0~16,383 \r\n• Default : 8,000",
      es: "El valor umbral de RPM para procesar el 'RPM_COUNT' en el Informe de Viaje OBD.\r\n• Rango: 0~16,383\r\n• Predeterminado: 8,000",
      pt: "O valor limite de RPM para processar o 'RPM_COUNT' no Relatório de Viagem OBD.\r\n• Intervalo : 0~16,383\r\n• Padrão : 8,000",
    },
    min: 0,
    max: 16383,
    list: null,
  },
  "2101": {
    title: {
      en: "PID 01",
      pt: "PID 01",
      es: "PID 01",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2102": {
    title: {
      en: "PID 02",
      pt: "PID 02",
      es: "PID 02",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2103": {
    title: {
      en: "PID 03",
      pt: "PID 03",
      es: "PID 03",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2104": {
    title: {
      en: "PID 04",
      pt: "PID 04",
      es: "PID 04",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2105": {
    title: {
      en: "PID 05",
      pt: "PID 05",
      es: "PID 05",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2106": {
    title: {
      en: "PID 06",
      pt: "PID 06",
      es: "PID 06",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2107": {
    title: {
      en: "PID 07",
      pt: "PID 07",
      es: "PID 07",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2108": {
    title: {
      en: "PID 08",
      pt: "PID 08",
      es: "PID 08",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2109": {
    title: {
      en: "PID 09",
      pt: "PID 09",
      es: "PID 09",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2110": {
    title: {
      en: "PID 10",
      pt: "PID 10",
      es: "PID 10",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2111": {
    title: {
      en: "PID 11",
      pt: "PID 11",
      es: "PID 11",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2112": {
    title: {
      en: "PID 12",
      pt: "PID 12",
      es: "PID 12",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2113": {
    title: {
      en: "PID 13",
      pt: "PID 13",
      es: "PID 13",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2114": {
    title: {
      en: "PID 14",
      pt: "PID 14",
      es: "PID 14",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2115": {
    title: {
      en: "PID 15",
      pt: "PID 15",
      es: "PID 15",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2116": {
    title: {
      en: "PID 16",
      pt: "PID 16",
      es: "PID 16",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2117": {
    title: {
      en: "PID 17",
      pt: "PID 17",
      es: "PID 17",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2118": {
    title: {
      en: "PID 18",
      pt: "PID 18",
      es: "PID 18",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2119": {
    title: {
      en: "PID 19",
      pt: "PID 19",
      es: "PID 19",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2120": {
    title: {
      en: "PID 20",
      pt: "PID 20",
      es: "PID 20",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2121": {
    title: {
      en: "PID 21",
      pt: "PID 21",
      es: "PID 21",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2122": {
    title: {
      en: "PID 22",
      pt: "PID 22",
      es: "PID 22",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2123": {
    title: {
      en: "PID 23",
      pt: "PID 23",
      es: "PID 23",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2124": {
    title: {
      en: "PID 24",
      pt: "PID 24",
      es: "PID 24",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2125": {
    title: {
      en: "PID 25",
      pt: "PID 25",
      es: "PID 25",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2126": {
    title: {
      en: "PID 26",
      pt: "PID 26",
      es: "PID 26",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2127": {
    title: {
      en: "PID 27",
      pt: "PID 27",
      es: "PID 27",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2128": {
    title: {
      en: "PID 28",
      pt: "PID 28",
      es: "PID 28",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2129": {
    title: {
      en: "PID 29",
      pt: "PID 29",
      es: "PID 29",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2130": {
    title: {
      en: "PID 30",
      pt: "PID 30",
      es: "PID 30",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2131": {
    title: {
      en: "PID 31",
      pt: "PID 31",
      es: "PID 31",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2132": {
    title: {
      en: "PID 32",
      pt: "PID 32",
      es: "PID 32",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2133": {
    title: {
      en: "PID 33",
      pt: "PID 33",
      es: "PID 33",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2134": {
    title: {
      en: "PID 34",
      pt: "PID 34",
      es: "PID 34",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2135": {
    title: {
      en: "PID 35",
      pt: "PID 35",
      es: "PID 35",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2136": {
    title: {
      en: "PID 36",
      pt: "PID 36",
      es: "PID 36",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2137": {
    title: {
      en: "PID 37",
      pt: "PID 37",
      es: "PID 37",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2138": {
    title: {
      en: "PID 38",
      pt: "PID 38",
      es: "PID 38",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2139": {
    title: {
      en: "PID 39",
      pt: "PID 39",
      es: "PID 39",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2140": {
    title: {
      en: "PID 40",
      pt: "PID 40",
      es: "PID 40",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2141": {
    title: {
      en: "PID 41",
      pt: "PID 41",
      es: "PID 41",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2142": {
    title: {
      en: "PID 42",
      pt: "PID 42",
      es: "PID 42",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2143": {
    title: {
      en: "PID 43",
      pt: "PID 43",
      es: "PID 43",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2144": {
    title: {
      en: "PID 44",
      pt: "PID 44",
      es: "PID 44",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2145": {
    title: {
      en: "PID 45",
      pt: "PID 45",
      es: "PID 45",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2146": {
    title: {
      en: "PID 46",
      pt: "PID 46",
      es: "PID 46",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2147": {
    title: {
      en: "PID 47",
      pt: "PID 47",
      es: "PID 47",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2148": {
    title: {
      en: "PID 48",
      pt: "PID 48",
      es: "PID 48",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2149": {
    title: {
      en: "PID 49",
      pt: "PID 49",
      es: "PID 49",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2150": {
    title: {
      en: "PID 50",
      pt: "PID 50",
      es: "PID 50",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2151": {
    title: {
      en: "PID 51",
      pt: "PID 51",
      es: "PID 51",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2152": {
    title: {
      en: "PID 52",
      pt: "PID 52",
      es: "PID 52",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2153": {
    title: {
      en: "PID 53",
      pt: "PID 53",
      es: "PID 53",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2154": {
    title: {
      en: "PID 54",
      pt: "PID 54",
      es: "PID 54",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2155": {
    title: {
      en: "PID 55",
      pt: "PID 55",
      es: "PID 55",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2156": {
    title: {
      en: "PID 56",
      pt: "PID 56",
      es: "PID 56",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2157": {
    title: {
      en: "PID 57",
      pt: "PID 57",
      es: "PID 57",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2158": {
    title: {
      en: "PID 58",
      pt: "PID 58",
      es: "PID 58",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2159": {
    title: {
      en: "PID 59",
      pt: "PID 59",
      es: "PID 59",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2160": {
    title: {
      en: "PID 60",
      pt: "PID 60",
      es: "PID 60",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2300": {
    title: {
      en: "RS232 Extension 1",
      pt: "Extensão RS232 1",
      es: "Extensión RS232 1",
    },
    tooltip: {
      en: "Accessory to be connected to the ST25T via the RS232 port.\r\n• Option\r\n- Omnicomm Fuel Sensor\r\n- RFID\r\n- Serial Camera\r\n- AT Cmd\r\n- MDSM-7 (Defualt-MOVON Support Model)\r\n• Default : Off\r\n* If this is Off, GPS and Cell will be on all the time.",
      es: "Accesorio a ser conectado al ST25T a través del puerto RS232.\r\n• Opción\r\n- Sensor de Combustible Omnicomm\r\n- RFID\r\n- Cámara Serial\r\n- Comando AT\r\n- MDSM-7 (Modelo Predeterminado para Soporte MOVON)\r\n• Predeterminado: Desactivado\r\n* Si esto está Desactivado, GPS y Cell estarán Activados todo el tiempo.",
      pt: "Acessório a ser conectado ao ST25T via a porta RS232.\r\n• Opção\r\n- Sensor de Combustível Omnicomm\r\n- RFID\r\n- Câmera Serial\r\n- AT Cmd\r\n- MDSM-7 (Modelo Padrão com Suporte MOVON)\r\n• Padrão : Desativado\r\n* Se estiver Desligado, o GPS e o Celular estarão sempre ligados.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Omnicomm Fuel Sensor",
          es: "Sensor de Combustible Omnicomm",
          pt: "Sensor de Combustível Omnicomm",
        },
      },
      {
        value: "02",
        label: {
          en: "RFID",
          es: "RFID",
          pt: "RFID",
        },
      },
      {
        value: "03",
        label: {
          en: "Serial Camera",
          es: "Cámara Serial",
          pt: "Câmera Serial",
        },
      },
      {
        value: "04",
        label: {
          en: "AT Cmd",
          es: "AT Cmd",
          pt: "AT Cmd",
        },
      },
      {
        value: "05",
        label: {
          en: "MDSM-7",
          es: "MDSM-7",
          pt: "MDSM-7",
        },
      },
      {
        value: "07",
        label: {
          en: "ST20U",
          es: "ST20U",
          pt: "ST20U",
        },
      },
    ],
  },
  "2301": {
    title: {
      en: "RS232 Extension 2",
      pt: "Extensão RS232 2",
      es: "Extensión RS232 2",
    },
    tooltip: {
      en: "Accessory to be connected to the ST25T via the RS232 port.\r\n• Option\r\n- Omnicomm Fuel Sensor\r\n- RFID\r\n- Serial Camera\r\n- AT Cmd\r\n- MDAS-9(Default-MOVON Support Model) : ST25TPM model only\r\n- ST20U : ST25TPM model only\r\n* Baud Rate must be set to 115200bps.\r\n• Default : Off\r\n* If this is Off, GPS and Cell will be on all the time.",
      es: "Accesorio a ser conectado al ST25T a través del puerto RS232.\r\n• Opción\r\n- Sensor de Combustible Omnicomm\r\n- RFID\r\n- Cámara Serial\r\n- Comando AT\r\n- MDAS-9 (Modelo Predeterminado para Soporte MOVON): Solo para el modelo ST25TPM\r\n- ST20U: Solo para el modelo ST25TPM\r\n* La tasa de baudios debe configurarse a 115200bps.\r\n• Predeterminado: Desactivado\r\n* Si esto está Desactivado, GPS y Cell estarán Activados todo el tiempo.",
      pt: "Acessório a ser conectado ao ST25T via a porta RS232.\r\n• Opção\r\n- Sensor de Combustível Omnicomm\r\n- RFID\r\n- Câmera Serial\r\n- AT Cmd\r\n- MDAS-9 (Modelo Padrão com Suporte MOVON): Apenas para o modelo ST25TPM\r\n- ST20U: Apenas para o modelo ST25TPM\r\n* A Taxa de Baud deve ser configurada para 115.200bps.\r\n• Padrão : Desativado\r\n* Se estiver Desligado, o GPS e o Celular estarão sempre ligados.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Omnicomm Fuel Sensor",
          es: "Sensor de Combustible Omnicomm",
          pt: "Sensor de Combustível Omnicomm",
        },
      },
      {
        value: "02",
        label: {
          en: "RFID",
          es: "RFID",
          pt: "RFID",
        },
      },
      {
        value: "03",
        label: {
          en: "Serial Camera",
          es: "Cámara Serial",
          pt: "Câmera Serial",
        },
      },
      {
        value: "04",
        label: {
          en: "AT Cmd",
          es: "AT Cmd",
          pt: "AT Cmd",
        },
      },
      {
        value: "06",
        label: {
          en: "MDSM-9",
          es: "MDSM-9",
          pt: "MDSM-9",
        },
      },
      {
        value: "07",
        label: {
          en: "ST20U",
          es: "ST20U",
          pt: "ST20U",
        },
      },
    ],
  },
  "2302": {
    title: {
      en: "RS232 Extension 1 Baud Rate",
      pt: "Taxa de Baud da Extensão RS232 1",
      es: "Velocidad de Baud de Extensión RS232 1",
    },
    tooltip: {
      en: "Baud rate to be used on the RS232 port of the device.\r\n• Option(On)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps(Default-MOVON Support Model)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Default : Off",
      es: "Tasa de baudios a utilizar en el puerto RS232 del dispositivo.\r\n• Opción( Activado)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps (Modelo Predeterminado para Soporte MOVON)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Predeterminado: Desactivado",
      pt: "Taxa de Baud a ser usada na porta RS232 do dispositivo.\r\n• Opção(Ligado)\r\n- 2.400bps\r\n- 4.800bps\r\n- 9.600bps (Modelo Padrão com Suporte MOVON)\r\n- 19.200bps\r\n- 38.400bps\r\n- 115.200bps\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "2,400bps",
          es: "2,400bps",
          pt: "2,400bps",
        },
      },
      {
        value: "02",
        label: {
          en: "4,800bps",
          es: "4,800bps",
          pt: "4,800bps",
        },
      },
      {
        value: "03",
        label: {
          en: "9,600bps",
          es: "9,600bps",
          pt: "9,600bps",
        },
      },
      {
        value: "04",
        label: {
          en: "19,200bps",
          es: "19,200bps",
          pt: "19,200bps",
        },
      },
      {
        value: "05",
        label: {
          en: "38,400bps",
          es: "38,400bps",
          pt: "38,400bps",
        },
      },
      {
        value: "06",
        label: {
          en: "115,200bps",
          es: "115,200bps",
          pt: "115,200bps",
        },
      },
    ],
  },
  "2303": {
    title: {
      en: "RS232 Extension 2 Baud Rate",
      pt: "Taxa de Baud da Extensão RS232 2",
      es: "Velocidad de Baud de Extensión RS232 2",
    },
    tooltip: {
      en: "Baud rate to be used on the RS232 port of the device.\r\n• Option(On)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps(Default-MOVON Support Model)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Default : Off",
      es: "Tasa de baudios a utilizar en el puerto RS232 del dispositivo.\r\n• Opción( Activado)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps (Modelo Predeterminado para Soporte MOVON)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Predeterminado: Desactivado",
      pt: "Taxa de Baud a ser usada na porta RS232 do dispositivo.\r\n• Opção(Ligado)\r\n- 2.400bps\r\n- 4.800bps\r\n- 9.600bps (Modelo Padrão com Suporte MOVON)\r\n- 19.200bps\r\n- 38.400bps\r\n- 115.200bps\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "2,400bps",
          es: "2,400bps",
          pt: "2,400bps",
        },
      },
      {
        value: "02",
        label: {
          en: "4,800bps",
          es: "4,800bps",
          pt: "4,800bps",
        },
      },
      {
        value: "03",
        label: {
          en: "9,600bps",
          es: "9,600bps",
          pt: "9,600bps",
        },
      },
      {
        value: "04",
        label: {
          en: "19,200bps",
          es: "19,200bps",
          pt: "19,200bps",
        },
      },
      {
        value: "05",
        label: {
          en: "38,400bps",
          es: "38,400bps",
          pt: "38,400bps",
        },
      },
      {
        value: "06",
        label: {
          en: "115,200bps",
          es: "115,200bps",
          pt: "115,200bps",
        },
      },
    ],
  },
  "2304": {
    title: {
      en: "RS232 Fuel Alert Level 1",
      pt: "Nível de Alerta de Combustível RS232 1",
      es: "Nivel de Alerta de Combustible RS232 1",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095\r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2305": {
    title: {
      en: "RS232 Fuel Alert Level 2",
      pt: "Nível de Alerta de Combustível RS232 2",
      es: "Nivel de Alerta de Combustible RS232 2",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095 \r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2306": {
    title: {
      en: "RS485 Fuel Baud Rate",
      pt: "Taxa de Baud do Combustível RS485",
      es: "Velocidad de Baud de Combustible RS485",
    },
    tooltip: {
      en: "Baud rate to be used on the RS485 port of the device.\r\n• Option(On)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps(Default-MOVON Support Model)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Default : Off",
      es: "Tasa de baudios a utilizar en el puerto RS485 del dispositivo.\r\n• Opción( Activado)\r\n- 2,400bps\r\n- 4,800bps\r\n- 9,600bps (Modelo Predeterminado para Soporte MOVON)\r\n- 19,200bps\r\n- 38,400bps\r\n- 115,200bps\r\n• Predeterminado: Desactivado",
      pt: "Taxa de Baud a ser usada na porta RS485 do dispositivo.\r\n• Opção(Ligado)\r\n- 2.400bps\r\n- 4.800bps\r\n- 9.600bps (Modelo Padrão com Suporte MOVON)\r\n- 19.200bps\r\n- 38.400bps\r\n- 115.200bps\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "2,400bps",
          es: "2,400bps",
          pt: "2,400bps",
        },
      },
      {
        value: "02",
        label: {
          en: "4,800bps",
          es: "4,800bps",
          pt: "4,800bps",
        },
      },
      {
        value: "03",
        label: {
          en: "9,600bps",
          es: "9,600bps",
          pt: "9,600bps",
        },
      },
      {
        value: "04",
        label: {
          en: "19,200bps",
          es: "19,200bps",
          pt: "19,200bps",
        },
      },
      {
        value: "05",
        label: {
          en: "38,400bps",
          es: "38,400bps",
          pt: "38,400bps",
        },
      },
      {
        value: "06",
        label: {
          en: "115,200bps",
          es: "115,200bps",
          pt: "115,200bps",
        },
      },
    ],
  },
  "2307": {
    title: {
      en: "RS485 Fuel Alert Level 1",
      pt: "Nível de Alerta de Combustível RS485 1",
      es: "Nivel de Alerta de Combustible RS485 1",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095\r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2308": {
    title: {
      en: "RS485 Fuel Alert Level 2",
      pt: "Nível de Alerta de Combustível RS485 2",
      es: "Nivel de Alerta de Combustible RS485 2",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095 \r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2309": {
    title: {
      en: "RS485 Fuel Alert Level 3",
      pt: "Nível de Alerta de Combustível RS485 3",
      es: "Nivel de Alerta de Combustible RS485 3",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095 \r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2310": {
    title: {
      en: "RS485 Fuel Alert Level 4",
      pt: "Nível de Alerta de Combustível RS485 4",
      es: "Nivel de Alerta de Combustible RS485 4",
    },
    tooltip: {
      en: "The fuel level change value in the Alert Report,\r\n• Range(On) : 0~4,095\r\n• Default : 0",
      es: "El valor de cambio del nivel de combustible en el Informe de Alerta.\r\n• Rango( Activado): 0~4,095\r\n• Predeterminado: 0",
      pt: "O valor da alteração do nível de combustível no Relatório de Alerta,\r\n• Intervalo(Ligado): 0~4.095\r\n• Padrão: 0",
    },
    min: 0,
    max: 4095,
    list: null,
  },
  "2311": {
    title: {
      en: "Expansion ADC1",
      pt: "Expansão ADC1",
      es: "Expansión ADC1",
    },
    tooltip: {
      en: "ADC1 usage setting.\r\n• Default : Off\r\n* ADC1 and Input1 share a line in the ST25T, so they can't be used at the same time.",
      es: "Configuración de uso de ADC1.\r\n• Predeterminado: Desactivado\r\n* ADC1 y Entrada1 comparten una línea en el ST25T, por lo que no se pueden utilizar al mismo tiempo.",
      pt: "Configuração de uso do ADC1.\r\n• Padrão : Desativado\r\n* ADC1 e Entrada1 compartilham uma linha no ST25T, então não podem ser usados ao mesmo tempo.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2312": {
    title: {
      en: "Expansion ADC2",
      pt: "Expansão ADC2",
      es: "Expansión ADC2",
    },
    tooltip: {
      en: "ADC2 usage setting.\r\n• Default : Off\r\n* ADC2 and Input1 share a line in the ST25T, so they can't be used at the same time.",
      es: "Configuración de uso de ADC2.\r\n• Predeterminado: Desactivado\r\n* ADC2 y Entrada1 comparten una línea en el ST25T, por lo que no se pueden utilizar al mismo tiempo.",
      pt: "Configuração de uso do ADC2.\r\n• Padrão : Desativado\r\n* ADC2 e Entrada1 compartilham uma linha no ST25T, então não podem ser usados ao mesmo tempo.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2313": {
    title: {
      en: "Expansion Input 1 Type",
      pt: "Tipo de Entrada de Expansão 1",
      es: "Tipo de Entrada de Expansión 1",
    },
    tooltip: {
      en: "Expansion Input 1 type setting.\r\n• Option(On)\r\n- Falling Edge\r\n- Rising Edge\r\n• Default : Off",
      es: "Configuración del tipo de Entrada de Expansión 1.\r\n• Opción( Activado)\r\n- Borde Descendente\r\n- Borde Ascendente\r\n• Predeterminado: Desactivado",
      pt: "Configuração do tipo de Entrada Expansiva 1.\r\n• Opção(Ligado)\r\n- Borda de Queda\r\n- Borda de Subida\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Decrescente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Crescente",
        },
      },
      {
        value: "02",
        label: {},
      },
      {
        value: "03",
        label: {},
      },
    ],
  },
  "2314": {
    title: {
      en: "Expansion Input 1 Delay (100ms)",
      pt: "Atraso de Entrada de Expansão 1 (100ms)",
      es: "Retraso de Entrada de Expansión 1 (100ms)",
    },
    tooltip: {
      en: "Input 1 Chattering Time.\r\n• Range(On) : 0~30\r\n• Default : 1\r\n* If set to 0, Input 1 is not checked.",
      es: "Tiempo de antirrebote de Entrada 1.\r\n• Rango( Activado): 0~30\r\n• Predeterminado: 1\r\n* Si se establece en 0, no se verifica la Entrada 1.",
      pt: "Tempo de Oscilação da Entrada 1.\r\n• Intervalo(Ligado): 0~30\r\n• Padrão: 1\r\n* Se definido como 0, a Entrada 1 não será verificada.",
    },
    min: 0,
    max: 30,
    list: null,
  },
  "2315": {
    title: {
      en: "Expansion Input 2 Type",
      pt: "Tipo de Entrada de Expansão 2",
      es: "Tipo de Entrada de Expansión 2",
    },
    tooltip: {
      en: "Expansion Input 2 type setting.\r\n• Option(On)\r\n- Falling Edge\r\n- Rising Edge\r\n• Default : Off",
      es: "Configuración del tipo de Entrada de Expansión 2.\r\n• Opción( Activado)\r\n- Borde Descendente\r\n- Borde Ascendente\r\n• Predeterminado: Desactivado",
      pt: "Configuração do tipo de Entrada Expansiva 2.\r\n• Opção(Ligado)\r\n- Borda de Queda\r\n- Borda de Subida\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Falling Edge",
          es: "Borde Descendente",
          pt: "Borda Decrescente",
        },
      },
      {
        value: "01",
        label: {
          en: "Rising Edge",
          es: "Borde Ascendente",
          pt: "Borda Crescente",
        },
      },
      {
        value: "02",
        label: {},
      },
      {
        value: "03",
        label: {},
      },
    ],
  },
  "2316": {
    title: {
      en: "Expansion Input 2 Delay (100ms)",
      pt: "Atraso de Entrada de Expansão 2 (100ms)",
      es: "Retraso de Entrada de Expansión 2 (100ms)",
    },
    tooltip: {
      en: "Input 2 Chattering Time.\r\n• Range : 0~30\r\n• Default : 1\r\n* If set to 0, Input 2 is not checked.",
      es: "Tiempo de antirrebote de Entrada 2.\r\n• Rango: 0~30\r\n• Predeterminado: 1\r\n* Si se establece en 0, no se verifica la Entrada 2.",
      pt: "Tempo de Oscilação da Entrada 2.\r\n• Intervalo: 0~30\r\n• Padrão: 1\r\n* Se definido como 0, a Entrada 2 não será verificada.",
    },
    min: 0,
    max: 30,
    list: null,
  },
  "2330": {
    title: {
      en: "ST20U Exceed Vehicle Speed (km/h)",
      pt: "ST20U Exceder Limite de Velocidade do Veículo (km/h)",
      es: "ST20U Velocidad Excedida del Vehículo (km/h)",
    },
    tooltip: {
      en: "Check ST20U Speed Data if it exceeds the set value.\r\n• Range : 0~250\r\n• Default : 120",
      es: "Verificar los datos de velocidad de ST20U si exceden el valor establecido.\r\n• Rango: 0~250\r\n• Predeterminado: 120",
      pt: "Verificar os dados de velocidade do ST20U se exceder o valor definido.\r\n• Intervalo: 0~250\r\n• Padrão: 120",
    },
    min: 0,
    max: 250,
    list: null,
  },
  "2331": {
    title: {
      en: "ST20U Speed Limit (km/h)",
      pt: "Limite de Velocidade ST20U (km/h)",
      es: "Límite de Velocidad ST20U (km/h)",
    },
    tooltip: {
      en: "Check ST20U speed data if it exceeds the set value.\r\n• Range : 0~250\r\n• Default : 0",
      es: "Verificar los datos de velocidad de ST20U si exceden el valor establecido.\r\n• Rango: 0~250\r\n• Predeterminado: 0",
      pt: "Verificar os dados de velocidade do ST20U se exceder o valor definido.\r\n• Intervalo: 0~250\r\n• Padrão: 0",
    },
    min: 0,
    max: 250,
    list: null,
  },
  "2332": {
    title: {
      en: "ST20U Engine Coolant Temperature (°C)",
      pt: "Temperatura do Líquido de Arrefecimento do Motor ST20U (°C)",
      es: "Temperatura del Refrigerante del Motor ST20U (°C)",
    },
    tooltip: {
      en: "Check ST20U coolant temperature data if it exceeds the set value.\r\n• Range : -40~210\r\n• Default : 0",
      es: "Verificar los datos de temperatura del refrigerante de ST20U si exceden el valor establecido.\r\n• Rango: -40~210\r\n• Predeterminado: 0",
      pt: "Verificar os dados de temperatura do líquido de arrefecimento do ST20U se exceder o valor definido.\r\n• Intervalo: -40~210\r\n• Padrão: 0",
    },
    min: -40,
    max: 210,
    list: null,
  },
  "2333": {
    title: {
      en: "ST20U Oil Pressure (kPa)",
      pt: "Pressão do Óleo ST20U (kPa)",
      es: "Presión de Aceite ST20U (kPa)",
    },
    tooltip: {
      en: "Check ST20U oil pressure data if it exceeds the set value.\r\n• Range : 0~1,000\r\n• Default : 0",
      es: "Verificar los datos de presión de aceite de ST20U si exceden el valor establecido.\r\n• Rango: 0~1,000\r\n• Predeterminado: 0",
      pt: "Verificar os dados de pressão do óleo do ST20U se exceder o valor definido.\r\n• Intervalo: 0~1.000\r\n• Padrão: 0",
    },
    min: 0,
    max: 1000,
    list: null,
  },
  "2334": {
    title: {
      en: "ST20U Engine RPM (rpm)",
      pt: "RPM do Motor ST20U (rpm)",
      es: "RPM del Motor ST20U (rpm)",
    },
    tooltip: {
      en: "Check ST20U Engine RPM data if it exceeds the set value.\r\n• Range : 0~8,031\r\n• Default : 0",
      es: "Verificar los datos de RPM del motor de ST20U si exceden el valor establecido.\r\n• Rango: 0~8,031\r\n• Predeterminado: 0",
      pt: "Verificar os dados de RPM do motor do ST20U se exceder o valor definido.\r\n• Intervalo: 0~8.031\r\n• Padrão: 0",
    },
    min: 0,
    max: 8031,
    list: null,
  },
  "2336": {
    title: {
      en: "J1939 Resource Address",
      pt: "Endereço de Recurso J1939",
      es: "Dirección de Recurso J1939",
    },
    tooltip: {
      en: "J1939 resource address.\r\n* Must always be set to 0.",
      es: "Dirección de recurso J1939.\r\n* Siempre debe estar configurado en 0.",
      pt: "Endereço de recurso J1939.\r\n* Deve sempre ser configurado como 0.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2350": {
    title: {
      en: "Volume Level",
      pt: "Nível de Volume",
      es: "Nivel de Volumen",
    },
    tooltip: {
      en: "Volume level of MDSM-7.",
      es: "Nivel de volumen de MDSM-7.",
      pt: "Nível de volume do MDSM-7.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "05",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02 03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
    ],
  },
  "2351": {
    title: {
      en: "No Use Hardware Switch",
      pt: "Sem Uso de Interruptor de Hardware",
      es: "Sin Uso de Interruptor de Hardware",
    },
    tooltip: {
      en: "MDSM-7 Hardware Switch Not in Use.\r\n• Default : Off\r\n* If it is set to Off, the Working Speed and Activation Speed of the DIP Switch must be the same.",
      es: "El interruptor de hardware de MDSM-7 no está en uso.\r\n• Predeterminado: Desactivado\r\n* Si está configurado en Desactivado, la Velocidad de Trabajo y la Velocidad de Activación del Interruptor DIP deben ser las mismas.",
      pt: "Interruptor de hardware do MDSM-7 não está em uso.\r\n• Padrão : Desativado\r\n* Se estiver configurado como Desligado, a Velocidade de Trabalho e a Velocidade de Ativação do DIP Switch devem ser as mesmas.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2352": {
    title: {
      en: "Working Speed (km/h)",
      pt: "Velocidade de Trabalho (km/h)",
      es: "Velocidad de Trabajo (km/h)",
    },
    tooltip: {
      en: "The speed value used as the minimum speed for checking conditions like drowsiness.\r\n• Range(On) : 0~200\r\n• Default : Off\r\n* If set to Off, the device will not change MDSM-7’s working speed parameter.",
      es: "El valor de velocidad utilizado como la velocidad mínima para verificar condiciones como la somnolencia.\r\n• Rango( Activado): 0~200\r\n• Predeterminado: Desactivado\r\n* Si está configurado en Desactivado, el dispositivo no cambiará el parámetro de velocidad de trabajo de MDSM-7.",
      pt: "O valor da velocidade usado como a velocidade mínima para verificar condições como sonolência.\r\n• Intervalo(Ligado): 0~200\r\n• Padrão : Desativado\r\n* Se configurado como Desligado, o dispositivo não alterará o parâmetro de velocidade de trabalho do MDSM-7.",
    },
    min: 0,
    max: 200,
    list: null,
  },
  "2353": {
    title: {
      en: "Drowsiness Warning",
      pt: "Aviso de Sonolência",
      es: "Advertencia de Somnolencia",
    },
    tooltip: {
      en: "Settings for using drowsiness warning.\r\n• Default : Off",
      es: "Configuraciones para usar la advertencia de somnolencia.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para uso do aviso de sonolência.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2354": {
    title: {
      en: "Drowsiness Vibration",
      pt: "Vibração de Sonolência",
      es: "Vibración de Somnolencia",
    },
    tooltip: {
      en: "Settings for vibration warning for driver drowsiness.\r\n• Default : Off",
      es: "Configuraciones de advertencia por vibración para la somnolencia del conductor.\r\n• Predeterminado: Desactivado",
      pt: "Configurações de aviso por vibração para sonolência do motorista.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2355": {
    title: {
      en: "Drowsiness Warning Sound",
      pt: "Som de Aviso de Sonolência",
      es: "Sonido de Advertencia de Somnolencia",
    },
    tooltip: {
      en: "Warning sound volume settings for driver drowsiness.\r\n• Range : 0~2\r\n• Default : 1",
      es: "Configuraciones de volumen de sonido de advertencia para somnolencia del conductor.\r\n• Rango: 0~2\r\n• Predeterminado: 1",
      pt: "Configurações do volume do som de aviso para sonolência do motorista.\r\n• Intervalo: 0~2\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "03",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2356": {
    title: {
      en: "Drowsiness Sensitivity",
      pt: "Sensibilidade de Sonolência",
      es: "Sensibilidad de Somnolencia",
    },
    tooltip: {
      en: "Sensitivity level for checking driver’s drowsiness\r\n• Range : 0~3",
      es: "Nivel de sensibilidad para verificar la somnolencia del conductor.\r\n• Rango: 0~3",
      pt: "Nível de sensibilidade para verificar a sonolência do motorista.\r\n• Intervalo: 0~3",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "02",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2357": {
    title: {
      en: "Distraction Warning",
      pt: "Aviso de Distração",
      es: "Advertencia de Distracción",
    },
    tooltip: {
      en: "Settings for using distraction warning.\r\n• Default : Off",
      es: "Configuraciones para usar la advertencia de distracción.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para uso do aviso de distração.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2358": {
    title: {
      en: "Distraction Vibration",
      pt: "Vibração de Distração",
      es: "Vibración de Distracción",
    },
    tooltip: {
      en: "Settings for vibration warning when driver distracts.\r\n• Default : Off",
      es: "Configuraciones de advertencia por vibración cuando el conductor se distrae.\r\n• Predeterminado: Desactivado",
      pt: "Configurações de aviso por vibração quando o motorista está distraído.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2359": {
    title: {
      en: "Distraction Warning Sound",
      pt: "Som de Aviso de Distração",
      es: "Sonido de Advertencia de Distracción",
    },
    tooltip: {
      en: "Warning sound volume settings when driver distracts.\r\n• Range : 0~2\r\n• Default : 1",
      es: "Configuraciones de volumen de sonido de advertencia cuando el conductor se distrae.\r\n• Rango: 0~2\r\n• Predeterminado: 1",
      pt: "Configurações do volume do som de aviso quando o motorista está distraído.\r\n• Intervalo: 0~2\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "03",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2360": {
    title: {
      en: "Distraction Sensitivity",
      pt: "Sensibilidade de Distração",
      es: "Sensibilidad de Distracción",
    },
    tooltip: {
      en: "Sensitivity level for checking driver’s distracts.\r\n• Range : 0~3",
      es: "Nivel de sensibilidad para verificar las distracciones del conductor.\r\n• Rango: 0~3",
      pt: "Nível de sensibilidade para verificar distração do motorista.\r\n• Intervalo: 0~3",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "02",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2361": {
    title: {
      en: "Phone Use Warning",
      pt: "Aviso de Uso do Telefone",
      es: "Advertencia de Uso del Teléfono",
    },
    tooltip: {
      en: "Settings for using a phone warning.\r\n• Default :",
      es: "Configuraciones para usar la advertencia de teléfono.\r\n• Predeterminado:",
      pt: "Configurações para uso do aviso de telefone.\r\n• Padrão:",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2362": {
    title: {
      en: "Phone Use Vibration",
      pt: "Vibração de Uso do Telefone",
      es: "Vibración de Uso del Teléfono",
    },
    tooltip: {
      en: "Settings for vibration warning for driver's phone use.\r\n• Default : Off",
      es: "Configuraciones de advertencia por vibración para el uso del teléfono del conductor.\r\n• Predeterminado: Desactivado",
      pt: "Configurações de aviso por vibração para uso de telefone pelo motorista.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2363": {
    title: {
      en: "Phone Warning Sound",
      pt: "Som de Aviso de Telefone",
      es: "Sonido de Advertencia de Teléfono",
    },
    tooltip: {
      en: "Warning sound volume settings for driver's phone use.\r\n• Range : 0~2\r\n• Default : 1",
      es: "Configuraciones de volumen de sonido de advertencia por uso del teléfono del conductor.\r\n• Rango: 0~2\r\n• Predeterminado: 1",
      pt: "Configurações do volume do som de aviso para uso de telefone pelo motorista.\r\n• Intervalo: 0~2\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "03",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2364": {
    title: {
      en: "Phone Sensitivity",
      pt: "Sensibilidade de Telefone",
      es: "Sensibilidad del Teléfono",
    },
    tooltip: {
      en: "Sensitivity level for checking driver’s phone use.\r\n• Range : 0~3",
      es: "Nivel de sensibilidad para verificar el uso del teléfono del conductor.\r\n• Rango: 0~3",
      pt: "Nível de sensibilidade para verificar uso de telefone pelo motorista.\r\n• Intervalo: 0~3",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "02",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2365": {
    title: {
      en: "Smoking Warning",
      pt: "Aviso de Fumar",
      es: "Advertencia de Fumar",
    },
    tooltip: {
      en: "Settings for using smoking warning.\r\n• Default : Off",
      es: "Configuraciones para usar la advertencia de fumar.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para uso do aviso de fumo.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2366": {
    title: {
      en: "Smoking Vibration",
      pt: "Vibração de Fumar",
      es: "Vibración de Fumar",
    },
    tooltip: {
      en: "Settings for vibration warning when driver smokes.\r\n• Default : Off",
      es: "Configuraciones de advertencia por vibración cuando el conductor fuma.\r\n• Predeterminado: Desactivado",
      pt: "Configurações de aviso por vibração quando o motorista está fumando.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2367": {
    title: {
      en: "Smoking Warning Sound",
      pt: "Som de Aviso de Fumar",
      es: "Sonido de Advertencia de Fumar",
    },
    tooltip: {
      en: "Warning sound volume settings when driver smokes.\r\n• Range : 0~2\r\n• Default : 1",
      es: "Configuraciones de volumen de sonido de advertencia cuando el conductor fuma.\r\n• Rango: 0~2\r\n• Predeterminado: 1",
      pt: "Configurações do volume do som de aviso quando o motorista está fumando.\r\n• Intervalo: 0~2\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "03",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2368": {
    title: {
      en: "Smoking Sensitivity",
      pt: "Sensibilidade de Fumar",
      es: "Sensibilidad de Fumar",
    },
    tooltip: {
      en: "Sensitivity level for checking driver smoking.\r\n• Range : 0~3",
      es: "Nivel de sensibilidad para verificar si el conductor está fumando.\r\n• Rango: 0~3",
      pt: "Nível de sensibilidade para verificar se o motorista está fumando.\r\n• Intervalo: 0~3",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "02",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2369": {
    title: {
      en: "Yawning Warning",
      pt: "Aviso de Bocejo",
      es: "Advertencia de Bostezo",
    },
    tooltip: {
      en: "Settings for using yawning warning.\r\n• Default : Off",
      es: "Configuraciones para usar la advertencia de bostezo.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para uso do aviso de bocejo.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2370": {
    title: {
      en: "Yawning Vibration",
      pt: "Vibração de Bocejo",
      es: "Vibración de Bostezo",
    },
    tooltip: {
      en: "Settings for vibration warning when driver yawns.\r\n• Default : Off",
      es: "Configuraciones de advertencia por vibración cuando el conductor bosteza.\r\n• Predeterminado: Desactivado",
      pt: "Configurações de aviso por vibração quando o motorista boceja.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2371": {
    title: {
      en: "Yawning Warning Sound",
      pt: "Som de Aviso de Bocejo",
      es: "Sonido de Advertencia de Bostezo",
    },
    tooltip: {
      en: "Warning sound volume settings when driver ywans.\r\n• Range : 0~2\r\n• Default : 1",
      es: "Configuraciones de volumen de sonido de advertencia cuando el conductor bosteza.\r\n• Rango: 0~2\r\n• Predeterminado: 1",
      pt: "Configurações do volume do som de aviso quando o motorista boceja.\r\n• Intervalo: 0~2\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "01",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "02",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "03",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2372": {
    title: {
      en: "Yawning Sensitivity",
      pt: "Sensibilidade de Bocejo",
      es: "Sensibilidad de Bostezo",
    },
    tooltip: {
      en: "Sensitivity level for checking driver yawning.\r\n• Range : 0~3",
      es: "Nivel de sensibilidad para verificar si el conductor está bostezando.\r\n• Rango: 0~3",
      pt: "Nível de sensibilidade para verificar bocejo do motorista.\r\n• Intervalo: 0~3",
    },
    min: null,
    max: null,
    list: [
      {
        value: "01",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "02",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "03",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "04",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
    ],
  },
  "2500": {
    title: {
      en: "RF",
      pt: "RF",
      es: "RF",
    },
    tooltip: {
      en: "Use of RF(Radio Frequency).\r\n• Default : On",
      es: "Uso de RF (Radio Frecuencia).\r\n• Predeterminado: Activado",
      pt: "Uso de RF (Frequência de Rádio).\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: null,
  },
  "2501": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The channel used for sending/receiving messages in the RF function.\r\n• Option(On)\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11 \r\n- 12 \r\n- 13 \r\n- 14 \r\n- 15 \r\n- 16 \r\n- 17 \r\n- 18 \r\n- 19 \r\n- 20",
      es: "El canal utilizado para enviar/recibir mensajes en la función RF.\r\n• Opción( Activado)\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal usado para enviar/receber mensagens na função RF.\r\n• Opção(Ligado)\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2502": {
    title: {
      en: "Battery Status Report",
      pt: "Relatório de Status da Bateria",
      es: "Informe de Estado de la Batería",
    },
    tooltip: {
      en: "RF message includes voltage and battery status fields.\r\n• Default : On",
      es: "El mensaje de RF incluye campos de voltaje y estado de la batería.\r\n• Predeterminado: Activado",
      pt: "A mensagem RF inclui campos de voltagem e status da bateria.\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2503": {
    title: {
      en: "Reception Mode Duration (milliseconds)",
      pt: "Duração do Modo de Recepção (milissegundos)",
      es: "Duración del Modo de Recepción (milisegundos)",
    },
    tooltip: {
      en: "The time that the device stays in reception mode to receive commands.\r\n• Range(On) : 0~65,535\r\n• Default : 12\r\n* If set to Off, the device does not enter reception mode.",
      es: "El tiempo que el dispositivo permanece en modo de recepción para recibir comandos.\r\n• Rango( Activado): 0~65,535\r\n• Predeterminado: 12\r\n* Si se configura en Desactivado, el dispositivo no entra en modo de recepción.",
      pt: "O tempo que o dispositivo permanece no modo de recepção para receber comandos.\r\n• Intervalo(Ligado): 0~65.535\r\n• Padrão: 12\r\n* Se definido como Desligado, o dispositivo não entra no modo de recepção.",
    },
    min: 12,
    max: 65535,
    list: null,
  },
  "2504": {
    title: {
      en: "Sleep Mode Time (milliseconds)",
      pt: "Tempo de Modo de Suspensão (milissegundos)",
      es: "Tiempo de Modo de Suspensión (milisegundos)",
    },
    tooltip: {
      en: "The time the device keeps its RF circuit turned off to reduce power consumption.\r\n• Range : 0~65,535\r\n• Default : 100\r\n* If set to Off, the RF circuit is never turned off.",
      es: "El tiempo que el dispositivo mantiene su circuito RF Desactivado para reducir el consumo de energía.\r\n• Rango: 0~65,535\r\n• Predeterminado: 100\r\n* Si se configura en Desactivado, el circuito RF nunca se apaga.",
      pt: "O tempo que o dispositivo mantém seu circuito RF desligado para reduzir o consumo de energia.\r\n• Intervalo: 0~65.535\r\n• Padrão: 100\r\n* Se definido como Desligado, o circuito RF nunca será desligado.",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2505": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "Customer code settings.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "Configuraciones del código de cliente.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "Configurações de código do cliente.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2506": {
    title: {
      en: "Transmission Time - ERB (seconds)",
      pt: "Tempo de Transmissão - ERB (segundos)",
      es: "Tiempo de Transmisión - ERB (segundos)",
    },
    tooltip: {
      en: "The time for sending each command in the ERB command list. It defines how long each command will be transmitted before moving to the next device in the ERB list.\r\n• Range(On) : 0~100\r\n• Default : 20\r\n* If set to Off, commands are not transmitted.",
      es: "El tiempo para enviar cada comando en la lista de comandos ERB. Define cuánto tiempo se transmitirá cada comando antes de pasar al siguiente dispositivo en la lista ERB.\r\n• Rango( Activado): 0~100\r\n• Predeterminado: 20\r\n* Si se configura en Desactivado, los comandos no se transmiten.",
      pt: "O tempo para enviar cada comando na lista de comandos ERB. Define quanto tempo cada comando será transmitido antes de passar para o próximo dispositivo na lista ERB.\r\n• Intervalo(Ligado): 0~100\r\n• Padrão: 20\r\n* Se definido como Desligado, os comandos não serão transmitidos.",
    },
    min: 0,
    max: 100,
    list: null,
  },
  "2507": {
    title: {
      en: "Debounce Time - ERB (minutes)",
      pt: "Tempo de Debounce - ERB (minutos)",
      es: "Tiempo de Debounce - ERB (minutos)",
    },
    tooltip: {
      en: "Debouncing time for messages in the ERB function. This is the time during which the ERB device disregards any new emergency/position messages from the same device.\r\n• Range(On) : 0~1,440\r\n• Default : 60\r\n* If set to Off, there is no debouncing (no messages are discarded).",
      es: "Tiempo de antirrebote para mensajes en la función ERB. Este es el tiempo durante el cual el dispositivo ERB ignora cualquier nuevo mensaje de emergencia/posición del mismo dispositivo.\r\n• Rango( Activado): 0~1,440\r\n• Predeterminado: 60\r\n* Si se configura en Desactivado, no hay antirrebote (no se descartan mensajes).",
      pt: "Tempo de debounce para mensagens na função ERB. Este é o tempo durante o qual o dispositivo ERB desconsidera qualquer nova mensagem de emergência/posição do mesmo dispositivo.\r\n• Intervalo(Ligado): 0~1.440\r\n• Padrão: 60\r\n* Se definido como Desligado, não há debounce (nenhuma mensagem é descartada).",
    },
    min: 0,
    max: 1440,
    list: null,
  },
  "2508": {
    title: {
      en: "Reception Duration for Commands - ERB (milliseconds)",
      pt: "Duração da Recepção para Comandos - ERB (milissegundos)",
      es: "Duración de Recepción para Comandos - ERB (milisegundos)",
    },
    tooltip: {
      en: "The time interval during which the RF circuit stays in reception mode to receive commands in the ERB function. (The RF receiver remains on the command reception frequency.)\r\n• Range(On) : 25~1,500\r\n• Default : 25\r\n* If set to Off, the device does not enter this reception mode.",
      es: "El intervalo de tiempo durante el cual el circuito RF permanece en modo de recepción para recibir comandos en la función ERB. (El receptor RF permanece en la frecuencia de recepción de comandos).\r\n• Rango( Activado): 25~1,500\r\n• Predeterminado: 25\r\n* Si se configura en Desactivado, el dispositivo no entra en este modo de recepción.",
      pt: "O intervalo de tempo durante o qual o circuito RF permanece no modo de recepção para receber comandos na função ERB. (O receptor RF permanece na frequência de recepção de comandos.)\r\n• Intervalo(Ligado): 25~1.500\r\n• Padrão: 25\r\n* Se definido como Desligado, o dispositivo não entra nesse modo de recepção.",
    },
    min: 25,
    max: 1500,
    list: null,
  },
  "2509": {
    title: {
      en: "Reception Duration for Message - ERB (milliseconds)",
      pt: "Duração da Recepção para Mensagens - ERB (milissegundos)",
      es: "Duración de Recepción para Mensajes - ERB (milisegundos)",
    },
    tooltip: {
      en: "The time interval during which the RF circuit stays in reception mode to receive emergency messages in the ERB function. (The RF receiver remains on the emergency message reception frequency.)\r\n• Range(On) : 30~1,500\r\n• Default : 30\r\n* If set to Off, the device does not enter this reception mode.",
      es: "El intervalo de tiempo durante el cual el circuito RF permanece en modo de recepción para recibir mensajes de emergencia en la función ERB. (El receptor RF permanece en la frecuencia de recepción de mensajes de emergencia).\r\n• Rango( Activado): 30~1,500\r\n• Predeterminado: 30\r\n* Si se configura en Desactivado, el dispositivo no entra en este modo de recepción.",
      pt: "O intervalo de tempo durante o qual o circuito RF permanece no modo de recepção para receber mensagens de emergência na função ERB. (O receptor RF permanece na frequência de recepção de mensagens de emergência.)\r\n• Intervalo(Ligado): 30~1.500\r\n• Padrão: 30\r\n* Se definido como Desligado, o dispositivo não entra nesse modo de recepção.",
    },
    min: 30,
    max: 1500,
    list: null,
  },
  "2510": {
    title: {
      en: "ERB Control by Drive Mode",
      pt: "Controle ERB por Modo de Condução",
      es: "Control ERB por Modo de Conducción",
    },
    tooltip: {
      en: "Stop ERB when the device is not in Drive Mode.\r\n• Default : Off\r\n* Off means the ERB function keeps running and operates according to power consumption definitions. \r\n* On means the ERB function stops when the device is not in Drive mode and starts again when the device enters Drive mode.",
      es: "Detener ERB cuando el dispositivo no está en modo de conducción.\r\n• Predeterminado: Desactivado\r\n* Desactivado significa que la función ERB sigue funcionando y opera de acuerdo con las definiciones de consumo de energía.\r\n* Activado significa que la función ERB se detiene cuando el dispositivo no está en modo de conducción y se reinicia cuando el dispositivo entra en modo de conducción.",
      pt: "Parar o ERB quando o dispositivo não estiver no modo de condução.\r\n• Padrão : Desativado\r\n* Desligado significa que a função ERB continua funcionando e opera de acordo com as definições de consumo de energia.\r\n* Ligado significa que a função ERB para quando o dispositivo não está no modo de condução e começa novamente quando o dispositivo entra no modo de condução.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2511": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2512": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2513": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2514": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2515": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2516": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2517": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2518": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2519": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2520": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2521": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2522": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2523": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2524": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2525": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2526": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2527": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2528": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2529": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2530": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2531": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2532": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2533": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2534": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2535": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2536": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2537": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2538": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2539": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2540": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2541": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2542": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2543": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2544": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2545": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2546": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2547": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2548": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2549": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2550": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2551": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2552": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2553": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2554": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2555": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2556": {
    title: {
      en: "RF Device ID Number",
      pt: "Número de ID do Dispositivo RF",
      es: "Número de ID del Dispositivo RF",
    },
    tooltip: {
      en: "The RF Device ID number of the device that is the destination of this command in the ERB list.\r\n* Must be 9 ~ 10 numeric digits long.",
      es: "El número de ID del dispositivo RF del dispositivo que es el destino de este comando en la lista ERB.\r\n* Debe tener entre 9 y 10 dígitos numéricos.",
      pt: "O número de ID do Dispositivo RF do dispositivo que é o destino deste comando na lista ERB.\r\n* Deve ter entre 9 e 10 dígitos numéricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2557": {
    title: {
      en: "Command Timeout (minutes)",
      pt: "Tempo de Expiração do Comando (minutos)",
      es: "Tiempo de Expiración del Comando (minutos)",
    },
    tooltip: {
      en: "The timeout for stopping command transmission to the device in the corresponding position of the ERB list.\r\n• Range : 0~14,400\r\n• Default : 1",
      es: "Tiempo de espera para detener la transmisión de comandos al dispositivo en la posición correspondiente de la lista ERB.\r\n• Rango: 0~14,400\r\n• Predeterminado: 1",
      pt: "O tempo limite para interromper a transmissão de comandos para o dispositivo na posição correspondente da lista ERB.\r\n• Intervalo: 0~14.400\r\n• Padrão: 1",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "2558": {
    title: {
      en: "Command Type",
      pt: "Tipo de Comando",
      es: "Tipo de Comando",
    },
    tooltip: {
      en: "The type of command to be sent to the device in the corresponding position of the ERB list.\r\n• Option\r\n- Leave Emergency Mode\r\n- Enter Emergency Mode\r\n- Enable Emergency Mode in Collaborative Network\r\n- Disable Emergency Mode in Collaborative Network",
      es: "El tipo de comando que se enviará al dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- Salir del Modo de Emergencia\r\n- Entrar en Modo de Emergencia\r\n- Habilitar Modo de Emergencia en Red Colaborativa\r\n- Deshabilitar Modo de Emergencia en Red Colaborativa",
      pt: "O tipo de comando a ser enviado ao dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- Sair do Modo de Emergência\r\n- Entrar no Modo de Emergência\r\n- Ativar Modo de Emergência na Rede Colaborativa\r\n- Desativar Modo de Emergência na Rede Colaborativa",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Leave Emergency Mode",
          es: "Salir del Modo de Emergencia",
          pt: "Sair do Modo de Emergência",
        },
      },
      {
        value: "2",
        label: {
          en: "Enter Emergency Mode",
          es: "Entrar en Modo de Emergencia",
          pt: "Entrar no Modo de Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Enable Emergency Mode in Collaborative Network",
          es: "Activar Modo de Emergencia en la Red Colaborativa",
          pt: "Ativar Modo de Emergência na Rede Colaborativa",
        },
      },
    ],
  },
  "2559": {
    title: {
      en: "Customer Code",
      pt: "Código do Cliente",
      es: "Código del Cliente",
    },
    tooltip: {
      en: "The Customer Code to be used for communication with the other device in the corresponding position of the ERB list.\r\n* Must be 6 ~ 10 numeric digits long.\r\n* When it is empty, the default code will be selected. \r\n* The customer code cannot be read by SyncMaster or remotely.",
      es: "El código de cliente que se utilizará para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n* Debe tener entre 6 y 10 dígitos numéricos.\r\n* Cuando está vacío, se selecciona el código predeterminado.\r\n* El código del cliente no puede ser leído por SyncMaster ni remotamente.",
      pt: "O Código do Cliente a ser usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n* Deve ter entre 6 e 10 dígitos numéricos.\r\n* Quando estiver vazio, o código padrão será selecionado.\r\n* O código do cliente não pode ser lido pelo SyncMaster ou remotamente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2560": {
    title: {
      en: "RF Channel",
      pt: "Canal RF",
      es: "Canal RF",
    },
    tooltip: {
      en: "The RF channel used for communication with the other device in the corresponding position of the ERB list\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal RF utilizado para la comunicación con el otro dispositivo en la posición correspondiente de la lista ERB.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal RF usado para comunicação com o outro dispositivo na posição correspondente da lista ERB.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2561": {
    title: {
      en: "Type of Presence function",
      pt: "Tipo de Função de Presença",
      es: "Tipo de Función de Presencia",
    },
    tooltip: {
      en: "The type of presence function.\r\n• Option\r\n- Participant\r\n- Coordinator",
      es: "El tipo de función de presencia.\r\n• Opción\r\n- Participante\r\n- Coordinador",
      pt: "O tipo de função de presença.\r\n• Opção\r\n- Participante\r\n- Coordenador",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Participant",
          es: "Participante",
          pt: "Participante",
        },
      },
      {
        value: "02",
        label: {
          en: "Coordinator",
          es: "Coordinador",
          pt: "Coordenador",
        },
      },
    ],
  },
  "2562": {
    title: {
      en: "Presence Function Action",
      pt: "Ação da Função de Presença",
      es: "Acción de la Función de Presencia",
    },
    tooltip: {
      en: "Presence message is included in the Report Alert.\r\n• Option(On)\r\n- Emergency & Alert : Device will go into emergency mode and send an alert message to the server.\r\n- Alert only : Device will send an alert message to the server, but will not go into emergency.\r\n• Default : Off",
      es: "El mensaje de presencia está incluido en el Informe de Alerta.\r\n• Opción( Activado)\r\n- Emergencia y Alerta: El dispositivo entrará en modo de emergencia y enviará un mensaje de alerta al servidor.\r\n- Solo Alerta: El dispositivo enviará un mensaje de alerta al servidor, pero no entrará en modo de emergencia.\r\n• Predeterminado: Desactivado",
      pt: "A mensagem de presença é incluída no Relatório de Alerta.\r\n• Opção(Ligado)\r\n- Emergência e Alerta: O dispositivo entrará no modo de emergência e enviará uma mensagem de alerta ao servidor.\r\n- Somente Alerta: O dispositivo enviará uma mensagem de alerta ao servidor, mas não entrará no modo de emergência.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "01",
        label: {
          en: "Emergency & Alert",
          es: "Emergencia y Alerta",
          pt: "Emergência & Alerta",
        },
      },
      {
        value: "02",
        label: {
          en: "Alert only",
          es: "Solo Alerta",
          pt: "Somente Alerta",
        },
      },
    ],
  },
  "2563": {
    title: {
      en: "Presence Function Timeout (seconds)",
      pt: "Tempo de Expiração da Função de Presença (segundos)",
      es: "Tiempo de Expiración de la Función de Presencia (segundos)",
    },
    tooltip: {
      en: "The time interval used to detect the absence of any device in the presence list.\r\n• Range : 0~65,535\r\n• Default : 0",
      es: "El intervalo de tiempo utilizado para detectar la ausencia de cualquier dispositivo en la lista de presencia.\r\n• Rango: 0~65,535\r\n• Predeterminado: 0",
      pt: "O intervalo de tempo usado para detectar a ausência de qualquer dispositivo na lista de presença.\r\n• Intervalo: 0~65.535\r\n• Padrão: 0",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2564": {
    title: {
      en: "PMR with GPS",
      pt: "PMR com GPS",
      es: "PMR con GPS",
    },
    tooltip: {
      en: "PMR (Presence Message Request) is a message sent by the coordinator to participant devices in the presence function. The PMR message includes GPS information.\r\n• Default : Off\r\n* Off means the PMR message doesn't include GPS information.\r\n* On means the PMR message includes GPS information.",
      es: "PMR (Solicitud de Mensaje de Presencia) es un mensaje enviado por el coordinador a los dispositivos participantes en la función de presencia. El mensaje PMR incluye información de GPS.\r\n• Predeterminado: Desactivado\r\n* Desactivado significa que el mensaje PMR no incluye información de GPS.\r\n* Activado significa que el mensaje PMR incluye información de GPS.",
      pt: "PMR (Solicitação de Mensagem de Presença) é uma mensagem enviada pelo coordenador para dispositivos participantes na função de presença. A mensagem PMR inclui informações de GPS.\r\n• Padrão : Desativado\r\n* Desligado significa que a mensagem PMR não inclui informações de GPS.\r\n* Ligado significa que a mensagem PMR inclui informações de GPS.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2565": {
    title: {
      en: "Presence Function Channel",
      pt: "Canal da Função de Presença",
      es: "Canal de la Función de Presencia",
    },
    tooltip: {
      en: "The channel used for presence function.\r\n• Option\r\n- 1(Default)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      es: "El canal utilizado para la función de presencia.\r\n• Opción\r\n- 1(Predeterminado)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
      pt: "O canal usado para a função de presença.\r\n• Opção\r\n- 1(Padrão)\r\n- 2\r\n- 3\r\n- 4\r\n- 5\r\n- 6\r\n- 7\r\n- 8\r\n- 9\r\n- 10\r\n- 11\r\n- 12\r\n- 13\r\n- 14\r\n- 15\r\n- 16\r\n- 17\r\n- 18\r\n- 19\r\n- 20",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
      {
        value: "7",
        label: {
          en: "7",
          es: "7",
          pt: "7",
        },
      },
      {
        value: "8",
        label: {
          en: "8",
          es: "8",
          pt: "8",
        },
      },
      {
        value: "9",
        label: {
          en: "9",
          es: "9",
          pt: "9",
        },
      },
      {
        value: "10",
        label: {
          en: "10",
          es: "10",
          pt: "10",
        },
      },
      {
        value: "11",
        label: {
          en: "11",
          es: "11",
          pt: "11",
        },
      },
      {
        value: "12",
        label: {
          en: "12",
          es: "12",
          pt: "12",
        },
      },
      {
        value: "13",
        label: {
          en: "13",
          es: "13",
          pt: "13",
        },
      },
      {
        value: "14",
        label: {
          en: "14",
          es: "14",
          pt: "14",
        },
      },
      {
        value: "15",
        label: {
          en: "15",
          es: "15",
          pt: "15",
        },
      },
      {
        value: "16",
        label: {
          en: "16",
          es: "16",
          pt: "16",
        },
      },
      {
        value: "17",
        label: {
          en: "17",
          es: "17",
          pt: "17",
        },
      },
      {
        value: "18",
        label: {
          en: "18",
          es: "18",
          pt: "18",
        },
      },
      {
        value: "19",
        label: {
          en: "19",
          es: "19",
          pt: "19",
        },
      },
      {
        value: "20",
        label: {
          en: "20",
          es: "20",
          pt: "20",
        },
      },
    ],
  },
  "2566": {
    title: {
      en: "Emergency Transmissions Count",
      pt: "Contagem de Transmissões de Emergência",
      es: "Contador de Transmisiones de Emergencia",
    },
    tooltip: {
      en: "The number of times the emergency message is transmitted per cycle, if the device is in emergency.\r\n• Range(On) : 1~15\r\n• Default : 1\r\n* If set to Off, emergency messages are not transmitted.",
      es: "El número de veces que se transmite el mensaje de emergencia por ciclo, si el dispositivo está en emergencia.\r\n• Rango( Activado): 1~15\r\n• Predeterminado: 1\r\n* Si se configura en Desactivado, no se transmiten mensajes de emergencia.",
      pt: "O número de vezes que a mensagem de emergência é transmitida por ciclo, se o dispositivo estiver em emergência.\r\n• Intervalo(Ligado): 1~15\r\n• Padrão: 1\r\n* Se definido como Desligado, as mensagens de emergência não são transmitidas.",
    },
    min: 0,
    max: 15,
    list: null,
  },
  "2567": {
    title: {
      en: "Emergency Reception Duration (milliseconds)",
      pt: "Duração da Recepção de Emergência (milissegundos)",
      es: "Duración de Recepción de Emergencia (milisegundos)",
    },
    tooltip: {
      en: "The time that the device stays in reception mode to receive commands.\r\n• Range(On) : 0~65,535\r\n• Default : 12\r\n* If set to Off, the device does not enter reception mode.",
      es: "El tiempo que el dispositivo permanece en modo de recepción para recibir comandos.\r\n• Rango( Activado): 0~65,535\r\n• Predeterminado: 12\r\n* Si se configura en Desactivado, el dispositivo no entra en modo de recepción.",
      pt: "O tempo que o dispositivo permanece no modo de recepção para receber comandos.\r\n• Intervalo(Ligado): 0~65.535\r\n• Padrão: 12\r\n* Se definido como Desligado, o dispositivo não entra no modo de recepção.",
    },
    min: 12,
    max: 65535,
    list: null,
  },
  "2568": {
    title: {
      en: "Emergency Sleep Time (milliseconds)",
      pt: "Tempo de Suspensão de Emergência (milissegundos)",
      es: "Tiempo de Suspensión de Emergencia (milisegundos)",
    },
    tooltip: {
      en: "The time the device keeps its RF circuit turned off to reduce power consumption.\r\n• Range(On) : 0~65,535\r\n• Default : 100\r\n* If set to Off, the RF circuit is never turned off.",
      es: "El tiempo que el dispositivo mantiene su circuito RF Desactivado para reducir el consumo de energía.\r\n• Rango( Activado): 0~65,535\r\n• Predeterminado: 100\r\n* Si se configura en Desactivado, el circuito RF nunca se apaga.",
      pt: "O tempo que o dispositivo mantém seu circuito RF desligado para reduzir o consumo de energia.\r\n• Intervalo(Ligado): 0~65.535\r\n• Padrão: 100\r\n* Se definido como Desligado, o circuito RF nunca será desligado.",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2569": {
    title: {
      en: "PM Reception Interval (minutes)",
      pt: "Intervalo de Recepção PM (minutos)",
      es: "Intervalo de Recepción PM (minutos)",
    },
    tooltip: {
      en: "Time interval between transmissions of PMR messages.\r\n• Range : 0~2,880\r\n• Default : 10\r\n* Only when 2561 is set to 'Coordinator'.",
      es: "Intervalo de tiempo entre las transmisiones de mensajes PMR.\r\n• Rango: 0~2,880\r\n• Predeterminado: 10\r\n* Solo cuando el parámetro 2561 está configurado en 'Coordinador'.",
      pt: "Intervalo de tempo entre as transmissões de mensagens PMR.\r\n• Intervalo: 0~2.880\r\n• Padrão: 10\r\n* Somente quando 2561 estiver configurado como 'Coordenador'.",
    },
    min: 0,
    max: 2880,
    list: null,
  },
  "2570": {
    title: {
      en: "LoRaWAN Eemergency Report",
      pt: "Relatório de Emergência LoRaWAN",
      es: "Informe de Emergencia LoRaWAN",
    },
    tooltip: {
      en: "Report Type for the Status Report in the LoRaWAN network when the device is in emergency.\r\n• Option(On)\r\n- Redundancy : Status Reports in emergency are always transmitted in the LoRaWAN network.\r\n- Backup : Status Reports in emergency are transmitted via the LoRaWAN network only if WWAN (GPRS/4G) is not available.\r\n• Default : Off\r\n* Off means Status Reports in emergency are never transmitted in the LoRaWAN network.",
      es: "Tipo de informe para el Informe de Estado en la red LoRaWAN cuando el dispositivo está en emergencia.\r\n• Opción( Activado)\r\n- Redundancia: Los Informes de Estado en emergencia siempre se transmiten en la red LoRaWAN.\r\n- Respaldo: Los Informes de Estado en emergencia se transmiten a través de la red LoRaWAN solo si WWAN (GPRS/4G) no está disponible.\r\n• Predeterminado: Desactivado\r\n* Desactivado significa que los Informes de Estado en emergencia nunca se transmiten en la red LoRaWAN.",
      pt: "Tipo de Relatório para o Relatório de Status na rede LoRaWAN quando o dispositivo está em emergência.\r\n• Opção(Ligado)\r\n- Redundância: Relatórios de Status em emergência são sempre transmitidos na rede LoRaWAN.\r\n- Backup: Relatórios de Status em emergência são transmitidos via rede LoRaWAN apenas se o WWAN (GPRS/4G) não estiver disponível.\r\n• Padrão : Desativado\r\n* Desligado significa que Relatórios de Status em emergência nunca são transmitidos na rede LoRaWAN.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Redundancy",
          es: "Redundancia",
          pt: "Redundância",
        },
      },
      {
        value: "02",
        label: {
          en: "Backup",
          es: "Respaldo",
          pt: "Backup",
        },
      },
    ],
  },
  "2571": {
    title: {
      en: "Presence Device 1",
      pt: "Dispositivo de Presença 1",
      es: "Dispositivo de Presencia 1",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2572": {
    title: {
      en: "Presence Device 2",
      pt: "Dispositivo de Presença 2",
      es: "Dispositivo de Presencia 2",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2573": {
    title: {
      en: "Presence Device 3",
      pt: "Dispositivo de Presença 3",
      es: "Dispositivo de Presencia 3",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2574": {
    title: {
      en: "Presence Device 4",
      pt: "Dispositivo de Presença 4",
      es: "Dispositivo de Presencia 4",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2575": {
    title: {
      en: "Presence Device 5",
      pt: "Dispositivo de Presença 5",
      es: "Dispositivo de Presencia 5",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2576": {
    title: {
      en: "Presence Device 6",
      pt: "Dispositivo de Presença 6",
      es: "Dispositivo de Presencia 6",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2577": {
    title: {
      en: "Presence Device 7",
      pt: "Dispositivo de Presença 7",
      es: "Dispositivo de Presencia 7",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2578": {
    title: {
      en: "Presence Device 8",
      pt: "Dispositivo de Presença 8",
      es: "Dispositivo de Presencia 8",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2579": {
    title: {
      en: "Presence Device 9",
      pt: "Dispositivo de Presença 9",
      es: "Dispositivo de Presencia 9",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2580": {
    title: {
      en: "Presence Device 10",
      pt: "Dispositivo de Presença 10",
      es: "Dispositivo de Presencia 10",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "2581": {
    title: {
      en: "LoRaWAN",
      pt: "LoRaWAN",
      es: "LoRaWAN",
    },
    tooltip: {
      en: "LoRaWAN usage.\r\n• Default : Off",
      es: "Uso de LoRaWAN.\r\n• Predeterminado: Desactivado",
      pt: "Uso de LoRaWAN.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: null,
  },
  "2582": {
    title: {
      en: "LoRaWAN Device EUI",
      pt: "EUI do Dispositivo LoRaWAN",
      es: "EUI del Dispositivo LoRaWAN",
    },
    tooltip: {
      en: "LoRaWAN Device EUI (Extended Unique Identifier).\r\n* It is 16 characters (hexadecimal). \r\n* It retains the previous value if left empty.",
      es: "LoRaWAN Device EUI (Identificador Único Extendido).\r\n* Tiene 16 caracteres (hexadecimal).\r\n* Mantiene el valor anterior si se deja vacío.",
      pt: "LoRaWAN Device EUI (Identificador Único Estendido).\r\n* São 16 caracteres (hexadecimal).\r\n* Mantém o valor anterior se deixado em branco.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2583": {
    title: {
      en: "LoRaWAN Uplink Port",
      pt: "Porta Uplink LoRaWAN",
      es: "Puerto Uplink LoRaWAN",
    },
    tooltip: {
      en: "The LoRaWAN uplink(from the device to the server) message port.\r\n• Range : 1~113\r\n• Default : 1",
      es: "El puerto de mensaje de subida de LoRaWAN (del dispositivo al servidor).\r\n• Rango: 1~113\r\n• Predeterminado: 1",
      pt: "A porta de mensagem de uplink (do dispositivo para o servidor) do LoRaWAN.\r\n• Intervalo: 1~113\r\n• Padrão: 1",
    },
    min: 1,
    max: 223,
    list: null,
  },
  "2584": {
    title: {
      en: "LoRaWAN Downlink Port",
      pt: "Porta Downlink LoRaWAN",
      es: "Puerto Downlink LoRaWAN",
    },
    tooltip: {
      en: "The LoRaWAN downlink(from the server to the device) message port.\r\n• Range : 0~113\r\n• Default : 1\r\n* If it is 0, it can receive downlink on any valid port (1 to 223).",
      es: "El puerto de mensaje de bajada de LoRaWAN (del servidor al dispositivo).\r\n• Rango: 0~113\r\n• Predeterminado: 1\r\n* Si es 0, puede recibir mensajes de bajada en cualquier puerto válido (1 a 223).",
      pt: "A porta de mensagem de downlink (do servidor para o dispositivo) do LoRaWAN.\r\n• Intervalo: 0~113\r\n• Padrão: 1\r\n* Se for 0, pode receber downlink em qualquer porta válida (1 a 223).",
    },
    min: 1,
    max: 223,
    list: null,
  },
  "2585": {
    title: {
      en: "LoRaWAN Device Address",
      pt: "Endereço do Dispositivo LoRaWAN",
      es: "Dirección del Dispositivo LoRaWAN",
    },
    tooltip: {
      en: "The LoRaWAN device address.\r\n* It is 8 characters (hexadecimal). \r\n* It retains the previous value if left empty.",
      es: "La dirección del dispositivo LoRaWAN.\r\n* Tiene 8 caracteres (hexadecimal).\r\n* Mantiene el valor anterior si se deja vacío.",
      pt: "O endereço do dispositivo LoRaWAN.\r\n* São 8 caracteres (hexadecimal).\r\n* Mantém o valor anterior se deixado em branco.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2586": {
    title: {
      en: "LoRa Network Session Key",
      pt: "Chave de Sessão da Rede LoRa",
      es: "Clave de Sesión de Red LoRa",
    },
    tooltip: {
      en: "The LoRaWAN Network Session Key.\r\n* It is 32 characters (hexadecimal). \r\n* It retains the previous value if left empty.",
      es: "La clave de sesión de la red LoRaWAN.\r\n* Tiene 32 caracteres (hexadecimal).\r\n* Mantiene el valor anterior si se deja vacío.",
      pt: "A Chave de Sessão de Rede do LoRaWAN.\r\n* São 32 caracteres (hexadecimal).\r\n* Mantém o valor anterior se deixado em branco.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2587": {
    title: {
      en: "LoRa App Session Key",
      pt: "Chave de Sessão do Aplicativo LoRa",
      es: "Clave de Sesión de Aplicación LoRa",
    },
    tooltip: {
      en: "The LoRaWAN application Session Key.\r\n* It is 32 characters (hexadecimal). \r\n* It retains the previous value if left empty.",
      es: "La clave de sesión de la aplicación LoRaWAN.\r\n* Tiene 32 caracteres (hexadecimal).\r\n* Mantiene el valor anterior si se deja vacío.",
      pt: "A Chave de Sessão de Aplicação do LoRaWAN.\r\n* São 32 caracteres (hexadecimal).\r\n* Mantém o valor anterior se deixado em branco.",
    },
    min: null,
    max: null,
    list: null,
  },
  "2588": {
    title: {
      en: "LoRaWAN Status Report Type",
      pt: "Tipo de Relatório de Status LoRaWAN",
      es: "Tipo de Informe de Estado LoRaWAN",
    },
    tooltip: {
      en: "Report Type for the Status Report in the LoRaWAN network when the device is not in an emergency.\r\n• Option(On)\r\n- Redundancy : When not in an emergency, Status Reports are always transmitted via the LoRaWAN network.\r\n- Backup: When not in an emergency, Status Reports are transmitted via the LoRaWAN network only if WWAN (GPRS/4G) is unavailable.\r\n• Default : Off\r\n* Off means that when not in an emergency, Status Reports are not transmitted via the LoRaWAN network.",
      es: "Tipo de informe para el Informe de Estado en la red LoRaWAN cuando el dispositivo no está en emergencia.\r\n• Opción( Activado)\r\n- Redundancia: Cuando no está en emergencia, los Informes de Estado siempre se transmiten a través de la red LoRaWAN.\r\n- Respaldo: Cuando no está en emergencia, los Informes de Estado se transmiten a través de la red LoRaWAN solo si WWAN (GPRS/4G) no está disponible.\r\n• Predeterminado: Desactivado\r\n* Desactivado significa que cuando no hay emergencia, los Informes de Estado no se transmiten a través de la red LoRaWAN.",
      pt: "Tipo de Relatório para o Relatório de Status na rede LoRaWAN quando o dispositivo não está em emergência.\r\n• Opção(Ligado)\r\n- Redundância: Quando não está em emergência, os Relatórios de Status são sempre transmitidos via rede LoRaWAN.\r\n- Backup: Quando não está em emergência, os Relatórios de Status são transmitidos via rede LoRaWAN apenas se o WWAN (GPRS/4G) não estiver disponível.\r\n• Padrão : Desativado\r\n* Desligado significa que quando não está em emergência, os Relatórios de Status não são transmitidos via rede LoRaWAN.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Diable",
          es: "Diable",
          pt: "Diable",
        },
      },
      {
        value: "01",
        label: {
          en: "Redundancy",
          es: "Redundancia",
          pt: "Redundância",
        },
      },
      {
        value: "02",
        label: {
          en: "Backup",
          es: "Respaldo",
          pt: "Backup",
        },
      },
    ],
  },
  "2589": {
    title: {
      en: "LoRaWAN Parking Interval (minutes)",
      pt: "Intervalo de Estacionamento LoRaWAN (minutos)",
      es: "Intervalo de Estacionamiento LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN in Parking mode.\r\n• Range : 0~65,535\r\n• Default : 180",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo de estacionamiento.\r\n• Rango: 0~65,535\r\n• Predeterminado: 180",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Estacionamento.\r\n• Intervalo: 0~65.535\r\n• Padrão: 180",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2590": {
    title: {
      en: "LoRaWAN Driving Interval (minutes)",
      pt: "Intervalo de Condução LoRaWAN (minutos)",
      es: "Intervalo de Conducción LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN in Driving mode.\r\n• Range : 0~65,535\r\n• Default : 10",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo de conducción.\r\n• Rango: 0~65,535\r\n• Predeterminado: 10",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Condução.\r\n• Intervalo: 0~65.535\r\n• Padrão: 10",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2591": {
    title: {
      en: "LoRaWAN Idle Interval (minutes)",
      pt: "Intervalo de Inatividade LoRaWAN (minutos)",
      es: "Intervalo de Inactividad LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN in Idle mode.\r\n• Range : 0~65,535\r\n• Default : 180",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo inactivo.\r\n• Rango: 0~65,535\r\n• Predeterminado: 180",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Ocioso.\r\n• Intervalo: 0~65.535\r\n• Padrão: 180",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2592": {
    title: {
      en: "LoRaWAN Towing Interval (minutes)",
      pt: "Intervalo de Reboque LoRaWAN (minutos)",
      es: "Intervalo de Remolque LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN in Towing mode.\r\n• Range : 0~65,535\r\n• Default : 10",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo de remolque.\r\n• Rango: 0~65,535\r\n• Predeterminado: 10",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Reboque.\r\n• Intervalo: 0~65.535\r\n• Padrão: 10",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2593": {
    title: {
      en: "LoRaWAN Backup Delay (minutes)",
      pt: "Atraso de Backup LoRaWAN (minutos)",
      es: "Retraso de Respaldo LoRaWAN (minutos)",
    },
    tooltip: {
      en: "The delay time for WWAN disconnection. This is the delay required to detect server connection loss and activate backup message transmission.\r\n• Range : 0~60\r\n• Default : 1",
      es: "El tiempo de retardo para la desconexión de WWAN. Este es el retardo necesario para detectar la pérdida de conexión con el servidor y activar la transmisión de mensajes de respaldo.\r\n• Rango: 0~60\r\n• Predeterminado: 1",
      pt: "O tempo de atraso para desconexão do WWAN. Este é o tempo necessário para detectar a perda de conexão com o servidor e ativar a transmissão de mensagens de backup.\r\n• Intervalo: 0~60\r\n• Padrão: 1",
    },
    min: 0,
    max: 60,
    list: null,
  },
  "2594": {
    title: {
      en: "LoRaWAN Alert Report Type",
      pt: "Tipo de Relatório de Alerta LoRaWAN",
      es: "Tipo de Informe de Alerta LoRaWAN",
    },
    tooltip: {
      en: "Report Type for the Alert Reports in the LoRaWAN network.\r\n• Option(On)\r\n- Redundancy : Alert Reports are always transmitted via the LoRaWAN network.\r\n- Backup: Alert Reports are transmitted via the LoRaWAN network only if WWAN (GPRS/4G) is unavailable.\r\n• Default : Off\r\n* Off means that Alert Reports are not transmitted via the LoRaWAN network.",
      es: "Tipo de informe para los Informes de Alerta en la red LoRaWAN.\r\n• Opción( Activado)\r\n- Redundancia: Los Informes de Alerta siempre se transmiten a través de la red LoRaWAN.\r\n- Respaldo: Los Informes de Alerta se transmiten a través de la red LoRaWAN solo si WWAN (GPRS/4G) no está disponible.\r\n• Predeterminado: Desactivado\r\n* Desactivado significa que los Informes de Alerta no se transmiten a través de la red LoRaWAN.",
      pt: "Tipo de Relatório para os Relatórios de Alerta na rede LoRaWAN.\r\n• Opção(Ligado)\r\n- Redundância: Os Relatórios de Alerta são sempre transmitidos via rede LoRaWAN.\r\n- Backup: Os Relatórios de Alerta são transmitidos via rede LoRaWAN apenas se o WWAN (GPRS/4G) não estiver disponível.\r\n• Padrão : Desativado\r\n* Desligado significa que os Relatórios de Alerta não são transmitidos via rede LoRaWAN.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Redundancy",
          es: "Redundancia",
          pt: "Redundância",
        },
      },
      {
        value: "02",
        label: {
          en: "Backup",
          es: "Respaldo",
          pt: "Backup",
        },
      },
    ],
  },
  "2595": {
    title: {
      en: "LoRaWAN Emergency Parking Interval (minutes)",
      pt: "Intervalo de Estacionamento de Emergência LoRaWAN (minutos)",
      es: "Intervalo de Estacionamiento de Emergencia LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN in Emergency Parking mode.\r\n• Range : 0~65,535\r\n• Default : 1",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo de emergencia de estacionamiento.\r\n• Rango: 0~65,535\r\n• Predeterminado: 1",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Estacionamento de Emergência.\r\n• Intervalo: 0~65.535\r\n• Padrão: 1",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2596": {
    title: {
      en: "LoRaWAN Emergency Driving Interval (minutes)",
      pt: "Intervalo de Condução de Emergência LoRaWAN (minutos)",
      es: "Intervalo de Conducción de Emergencia LoRaWAN (minutos)",
    },
    tooltip: {
      en: "Interval for transmitting messages to LoRaWAN inEmergency Driving mode.\r\n• Range : 0~65,535\r\n• Default : 1",
      es: "Intervalo para transmitir mensajes a LoRaWAN en modo de emergencia de conducción.\r\n• Rango: 0~65,535\r\n• Predeterminado: 1",
      pt: "Intervalo para transmissão de mensagens para LoRaWAN no modo Condução de Emergência.\r\n• Intervalo: 0~65.535\r\n• Padrão: 1",
    },
    min: 0,
    max: 65535,
    list: null,
  },
  "2597": {
    title: {
      en: "LoRaWAN Backup Retry",
      pt: "Tentativa de Backup LoRaWAN",
      es: "Reintento de Respaldo LoRaWAN",
    },
    tooltip: {
      en: "The number of missed Status Reports that triggers the backup in LoRaWAN.\r\n• Range : 0~250\r\n• Default : 1",
      es: "El número de Informes de Estado perdidos que activan el respaldo en LoRaWAN.\r\n• Rango: 0~250\r\n• Predeterminado: 1",
      pt: "O número de Relatórios de Status perdidos que aciona o backup no LoRaWAN.\r\n• Intervalo: 0~250\r\n• Padrão: 1",
    },
    min: 0,
    max: 250,
    list: null,
  },
  "2598": {
    title: {
      en: "LoRaWAN Status Report Map",
      pt: "Relatório de Status LoRaWAN",
      es: "Mapa de Informe de Estado LoRaWAN",
    },
    tooltip: {
      en: "Setting report fields to be included in the LoRaWAN Status Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Estado de LoRaWAN.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório de Status LoRaWAN.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de Informe",
          pt: "Mapa de Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión del Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Message Type",
          es: "Tipo de Mensaje",
          pt: "Tipo de Mensagem",
        },
      },
      {
        value: "b4",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b5",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b6",
        label: {
          en: "Cell ID",
          es: "ID de Celda",
          pt: "ID da Célula",
        },
      },
      {
        value: "b7",
        label: {
          en: "MCC",
          es: "MCC",
          pt: "MCC",
        },
      },
      {
        value: "b8",
        label: {
          en: "MNC",
          es: "MNC",
          pt: "MNC",
        },
      },
      {
        value: "b9",
        label: {
          en: "Local Area Code",
          es: "Código de Área Local",
          pt: "Código de Área Local",
        },
      },
      {
        value: "b10",
        label: {
          en: "RX_LVL",
          es: "Nivel RX",
          pt: "Nível RX",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b13",
        label: {
          en: "Speed",
          es: "Velocidad",
          pt: "Velocidade",
        },
      },
      {
        value: "b14",
        label: {
          en: "Course/Heading",
          es: "Curso/Rumbo",
          pt: "Rumo/Curso",
        },
      },
      {
        value: "b15",
        label: {
          en: "Satellite Count",
          es: "Conteo de Satélites",
          pt: "Contagem de Satélites",
        },
      },
      {
        value: "b16",
        label: {
          en: "GPS Fix Status",
          es: "Estado de Fix GPS",
          pt: "Status do Fix GPS",
        },
      },
      {
        value: "b17",
        label: {
          en: "Input States",
          es: "Estados de Entrada",
          pt: "Estados de Entrada",
        },
      },
      {
        value: "b18",
        label: {
          en: "Output States",
          es: "Estados de Salida",
          pt: "Estados de Saída",
        },
      },
      {
        value: "b19",
        label: {
          en: "Mode",
          es: "Modo",
          pt: "Modo",
        },
      },
      {
        value: "b20",
        label: {
          en: "Status Report Type",
          es: "Tipo de Informe de Estado",
          pt: "Tipo de Relatório de Status",
        },
      },
      {
        value: "b21",
        label: {
          en: "Message Number",
          es: "Número de Mensaje",
          pt: "Número da Mensagem",
        },
      },
      {
        value: "b22",
        label: {
          en: "Reserved",
          es: "Reservado",
          pt: "Reservado",
        },
      },
      {
        value: "b23",
        label: {
          en: "Assign Map",
          es: "Asignar Mapa",
          pt: "Atribuir Mapa",
        },
      },
    ],
  },
  "2610": {
    title: {
      en: "Sensor Report",
      pt: "Relatório de Sensor",
      es: "Informe de Sensor",
    },
    tooltip: {
      en: "Whether sensor's information is enabled in status reports, alert reports, and sensor reports.\r\n• Option(On)\r\n- Scan All : Sensor Scan, Sensor Report(SNB/SNE) enable\r\n- Status Scan : Sensor Scan enable, Sensor Report(SNB/SNE) disable\r\n- SNB, SNE Scan : Sensor Scan disable, Sensor Report(SNB/SNE) enable\r\n* Off means Sensor Scan, Sensor Report(SNB/SNE) disable\r\n* When 4025(BDA Report) setting is On, Sensor Report must be off.\r\n* ST4910B/ST4950(5)B/ST4950(5)BDS Default : Scan All\r\n* ST4955LCB/ST4955LCBW/St4915LCBF Default : Off",
      es: "Si la información del sensor está habilitada en los informes de estado, informes de alerta e informes de sensor.\r\n• Opción(Activado)\r\n- Escanear Todo: Habilitar el Escaneo del Sensor y el Informe de Sensor (SNB/SNE)\r\n- Escaneo de Estado: Habilitar el Escaneo del Sensor, deshabilitar el Informe de Sensor (SNB/SNE)\r\n- Escaneo SNB, SNE: Deshabilitar el Escaneo del Sensor, habilitar el Informe de Sensor (SNB/SNE)\r\n* Desactivado significa deshabilitar el Escaneo del Sensor y el Informe de Sensor (SNB/SNE)\r\n* Cuando la configuración 4025 (Informe de BDA) está activada, el Informe de Sensor debe estar Desactivado.\r\n* Predeterminado en ST4910B/ST4950(5)B/ST4950(5)BDS: Escanear Todo\r\n* Predeterminado en ST4955LCB/ST4955LCBW/St4915LCBF: Desactivado",
      pt: "Se as informações do sensor estão ativadas em relatórios de status, relatórios de alerta e relatórios de sensor.\r\n• Opção(Ligado)\r\n- Escanear Tudo: Sensor Scan, Sensor Report(SNB/SNE) ativados\r\n- Status Scan: Sensor Scan ativado, Sensor Report(SNB/SNE) desativado\r\n- SNB, SNE Scan: Sensor Scan desativado, Sensor Report(SNB/SNE) ativado\r\n* Desligado significa que o Sensor Scan e o Sensor Report(SNB/SNE) estão desativados\r\n* Quando a configuração 4025(Relatório BDA) estiver ativada, o Sensor Report deve estar desativado.\r\n* Padrão ST4910B/ST4950(5)B/ST4950(5)BDS: Escanear Tudo\r\n* Padrão ST4955LCB/ST4955LCBW/St4915LCBF : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Scan All",
          es: "Escanear Todo",
          pt: "Escanear Tudo",
        },
      },
      {
        value: "2",
        label: {
          en: "Status Scan",
          es: "Escanear Estado",
          pt: "Escanear Status",
        },
      },
      {
        value: "3",
        label: {
          en: "SNB SNE Scan",
          es: "Escanear SNB SNE",
          pt: "Escanear SNB SNE",
        },
      },
    ],
  },
  "2611": {
    title: {
      en: "Light Sensor",
      pt: "Sensor de Luz",
      es: "Sensor de Luz",
    },
    tooltip: {
      en: "Check if the cover of the device is peeled off using the illuminance sensor. An alert is triggered when light is detected.\r\n• Default : Disable",
      es: "Verificar si la cubierta del dispositivo está removida utilizando el sensor de iluminancia. Se genera una alerta cuando se detecta luz.\r\n• Predeterminado: Desactivado",
      pt: "Verifique se a tampa do dispositivo foi removida usando o sensor de iluminância. Um alerta é acionado quando a luz é detectada.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2612": {
    title: {
      en: "Internal Temperature/Humidity Sensor",
      pt: "Sensor Interno de Temperatura/Umidade",
      es: "Sensor Interno de Temperatura/Humedad",
    },
    tooltip: {
      en: "Settings to determine whether the internal temperature and humidity sensors will be read.\r\n• Default : Off",
      es: "Configuraciones para determinar si los sensores internos de temperatura y humedad se leerán.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para determinar se os sensores internos de temperatura e umidade serão lidos.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2613": {
    title: {
      en: "Internal Temperature Sensor Threshold (°C)",
      pt: "Limite do Sensor Interno de Temperatura (°C)",
      es: "Umbral del Sensor Interno de Temperatura (°C)",
    },
    tooltip: {
      en: "Alert when the internal temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura interna sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura interna sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "2614": {
    title: {
      en: "Internal Temperature Sensor Threshold (°C)",
      pt: "Limite do Sensor Interno de Temperatura (°C)",
      es: "Umbral del Sensor Interno de Temperatura (°C)",
    },
    tooltip: {
      en: "Alert when the internal temperature goes outside the set range.\r\n• Range : -55~125\r\n• Default : -50 (Min), 100 (Max)\r\n* High temperature must be higher than low temperature.",
      es: "Alerta cuando la temperatura interna sale del rango establecido.\r\n• Rango: -55~125\r\n• Predeterminado: -50 (Mínimo), 100 (Máximo)\r\n* La temperatura alta debe ser mayor que la temperatura baja.",
      pt: "Alerta quando a temperatura interna sai do intervalo definido.\r\n• Intervalo: -55~125\r\n• Padrão: -50 (Mín), 100 (Máx)\r\n* A temperatura alta deve ser maior que a temperatura baixa.",
    },
    min: -55,
    max: 125,
    list: null,
  },
  "2615": {
    title: {
      en: "Internal Humidity Sensor Threshold (%)",
      pt: "Limite do Sensor Interno de Umidade (%)",
      es: "Umbral del Sensor Interno de Humedad (%)",
    },
    tooltip: {
      en: "Alert when the internal humidity goes outside the set range.\r\n• Range : 0~100\r\n• Default : 20 (Min), 80 (Max)\r\n* High humidity must be higher than low humidity.",
      es: "Alerta cuando la humedad interna sale del rango establecido.\r\n• Rango: 0~100\r\n• Predeterminado: 20 (Mínimo), 80 (Máximo)\r\n* La humedad alta debe ser mayor que la humedad baja.",
      pt: "Alerta quando a umidade interna sai do intervalo definido.\r\n• Intervalo: 0~100\r\n• Padrão: 20 (Mín), 80 (Máx)\r\n* A umidade alta deve ser maior que a umidade baixa.",
    },
    min: 0,
    max: 100,
    list: null,
  },
  "2616": {
    title: {
      en: "Internal Humidity Sensor Threshold (%)",
      pt: "Limite do Sensor Interno de Umidade (%)",
      es: "Umbral del Sensor Interno de Humedad (%)",
    },
    tooltip: {
      en: "Alert when the internal humidity goes outside the set range.\r\n• Range : 0~100\r\n• Default : 20 (Min), 80 (Max)\r\n* High humidity must be higher than low humidity.",
      es: "Alerta cuando la humedad interna sale del rango establecido.\r\n• Rango: 0~100\r\n• Predeterminado: 20 (Mínimo), 80 (Máximo)\r\n* La humedad alta debe ser mayor que la humedad baja.",
      pt: "Alerta quando a umidade interna sai do intervalo definido.\r\n• Intervalo: 0~100\r\n• Padrão: 20 (Mín), 80 (Máx)\r\n* A umidade alta deve ser maior que a umidade baixa.",
    },
    min: 0,
    max: 100,
    list: null,
  },
  "2617": {
    title: {
      en: "Internal Atmospheric Pressure Sensor",
      pt: "Sensor Interno de Pressão Atmosférica",
      es: "Sensor Interno de Presión Atmosférica",
    },
    tooltip: {
      en: "Settings to determine whether the internal atmospheric pressure sensors will be read.\r\n• Default : Off",
      es: "Configuraciones para determinar si los sensores internos de presión atmosférica se leerán.\r\n• Predeterminado: Desactivado",
      pt: "Configurações para determinar se os sensores internos de pressão atmosférica serão lidos.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2618": {
    title: {
      en: "Sensor Report Interval (minutes)",
      pt: "Intervalo de Relatório do Sensor (minutos)",
      es: "Intervalo de Informe del Sensor (minutos)",
    },
    tooltip: {
      en: "Time interval for sending Sensor Report.\r\n• Range : 10~1,440\r\n• Default : 1,440",
      es: "Intervalo de tiempo para enviar el Informe de Sensor.\r\n• Rango: 10~1,440\r\n• Predeterminado: 1,440",
      pt: "Intervalo de tempo para enviar o Relatório de Sensor.\r\n• Intervalo: 10~1.440\r\n• Padrão: 1.440",
    },
    min: 10,
    max: 1440,
    list: null,
  },
  "2619": {
    title: {
      en: "Sensor Scan Interval in Driving (minutes)",
      pt: "Intervalo de Varredura do Sensor ao Dirigir (minutos)",
      es: "Intervalo de Escaneo del Sensor al Conducir (minutos)",
    },
    tooltip: {
      en: "Time interval at which the device will scan and store the values of internal and dedicated sensors for the ‘Sensor Report’ in Driving Mode.\r\n• Range : 10~1,440\r\n• Default : 1,440\r\n* The maximum of 15 scans is allowed per report, so the 'Sensor Report Interval' divided by the 'Sensor Scan Interval' can't exceed 15. \r\n* Cannot be set greater than 2619(Sensor Report Interval)",
      es: "Intervalo de tiempo en el que el dispositivo escaneará y almacenará los valores de los sensores internos y dedicados para el 'Informe de Sensor' en Modo de Conducción.\r\n• Rango: 10~1,440\r\n• Predeterminado: 1,440\r\n* Se permiten un máximo de 15 escaneos por informe, por lo que el 'Intervalo de Informe de Sensor' dividido por el 'Intervalo de Escaneo de Sensor' no puede exceder 15.\r\n* No se puede configurar un valor mayor que 2619 (Intervalo de Informe de Sensor)",
      pt: "Intervalo de tempo em que o dispositivo escaneará e armazenará os valores dos sensores internos e dedicados para o 'Relatório de Sensor' no modo de condução.\r\n• Intervalo: 10~1.440\r\n• Padrão: 1.440\r\n* O máximo de 15 escaneamentos é permitido por relatório, então o 'Intervalo do Relatório de Sensor' dividido pelo 'Intervalo de Escaneamento de Sensor' não pode exceder 15.\r\n* Não pode ser definido maior que 2619(Intervalo do Relatório de Sensor)",
    },
    min: 10,
    max: 1440,
    list: null,
  },
  "2620": {
    title: {
      en: "Sensor Scan Interval in Parking (minutes)",
      pt: "Intervalo de Varredura do Sensor ao Estacionar (minutos)",
      es: "Intervalo de Escaneo del Sensor al Estacionar (minutos)",
    },
    tooltip: {
      en: "Time interval at which the device will scan and store the values of internal and dedicated sensors for the ‘Sensor Report’ in Parking Mode.\r\n• Range : 10~1,440\r\n• Default : 1,440\r\n* The maximum of 15 scans is allowed per report, so the 'Sensor Report Interval' divided by the 'Sensor Scan Interval' can't exceed 15.\r\n* Cannot be set greater than 2619(Sensor Report Interval)",
      es: "Intervalo de tiempo en el que el dispositivo escaneará y almacenará los valores de los sensores internos y dedicados para el 'Informe de Sensor' en Modo de Estacionamiento.\r\n• Rango: 10~1,440\r\n• Predeterminado: 1,440\r\n* Se permiten un máximo de 15 escaneos por informe, por lo que el 'Intervalo de Informe de Sensor' dividido por el 'Intervalo de Escaneo de Sensor' no puede exceder 15.\r\n* No se puede configurar un valor mayor que 2619 (Intervalo de Informe de",
      pt: "Intervalo de tempo em que o dispositivo escaneará e armazenará os valores dos sensores internos e dedicados para o 'Relatório de Sensor' no modo de estacionamento.\r\n• Intervalo: 10~1.440\r\n• Padrão: 1.440\r\n* O máximo de 15 escaneamentos é permitido por relatório, então o 'Intervalo do Relatório de Sensor' dividido pelo 'Intervalo de Escaneamento de Sensor' não pode exceder 15.\r\n* Não pode ser definido maior que 2619(Intervalo do Relatório de Sensor)",
    },
    min: 10,
    max: 1440,
    list: null,
  },
  "2621": {
    title: {
      en: "Sensor Scan Power Saving",
      pt: "Economia de Energia na Varredura do Sensor",
      es: "Ahorro de Energía en Escaneo del Sensor",
    },
    tooltip: {
      en: "The sensor scan power saving function. \r\n• Default : Off\r\n* When set to On, the sensor scans and reports once a day.",
      es: "La función de ahorro de energía del escaneo del sensor.\r\n• Predeterminado: Desactivado\r\n* Cuando está activado, los sensores escanearán y enviarán un informe una vez al día.",
      pt: "A função de economia de energia da varredura de sensor.\r\n• Padrão : Desativado\r\n* Quando definido como Ligado, os sensores escanearão e relatarão uma vez por dia.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2704": {
    title: {
      en: "Carton Box Open Emergency",
      pt: "Caixa de Cartão Aberta Emergência",
      es: "Emergencia de Apertura de Caja de Cartón",
    },
    tooltip: {
      en: "Set the action to be taken when the box is opened.\r\n• Option(On)\r\n- Emergency : Device switches to Emergency Mode\r\n- Alert : Device sends an Alert Report\r\n• Default : Off",
      es: "Establecer la acción a realizar cuando se abre la caja.\r\n• Opción(Activado)\r\n- Modo de Emergencia: El dispositivo cambia al Modo de Emergencia\r\n- Informe de Alerta: El dispositivo envía un Informe de Alerta\r\n• Predeterminado: Desactivado",
      pt: "Definir a ação a ser tomada quando a caixa for aberta.\r\n• Opção(Ativado)\r\n- Modo de Emergência: O dispositivo muda para o Modo de Emergência\r\n- Relatório de Alerta: O dispositivo envia um Relatório de Alerta\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Modo de Emergencia",
          pt: "Modo de Emergência",
        },
      },
      {
        value: "1",
        label: {
          en: "Emergency Mode",
          es: "Informe de Alerta",
          pt: "Relatório de Alerta",
        },
      },
      {
        value: "2",
        label: {
          en: "Alert Report",
        },
      },
    ],
  },
  "2705": {
    title: {
      en: "Power Off by Key",
      pt: "Desligar por Chave",
      es: "Apagar por Clave",
    },
    tooltip: {
      en: "Set whether to turn off the device when the power switch is moved to the Off position.\r\n• Default : Off",
      es: "Establecer si se apaga el interruptor cuando el interruptor de Activado se mueve a la posición de Desactivado.\r\n• Predeterminado: Desactivado",
      pt: "Definir se o interruptor deve ser desligado quando o botão de energia for movido para a posição Desligado.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2706": {
    title: {
      en: "Powered On by Jammer Detection",
      pt: "Ligado por Detecção de Jammer",
      es: "Activado por detección de inhibidor",
    },
    tooltip: {
      en: "Set whether the device remains on when a jammer is detected.\r\n• Default : Off",
      es: "Establecer si el dispositivo permanece Activado cuando se detecta un bloqueador de señal.\r\n• Predeterminado: Desactivado",
      pt: "Definir se o dispositivo permanece ligado quando um bloqueador de sinal é detectado.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2707": {
    title: {
      en: "Delay for Entering Sleep (seconds)",
      pt: "Atraso para Entrar em Modo de Suspensão (segundos)",
      es: "Retraso para Entrar en Modo Suspensión (segundos)",
    },
    tooltip: {
      en: "Delay time before entering sleep mode after sending the last message to the server.\r\n• Range : 5~60\r\n• Default : 5",
      es: "Tiempo de retardo antes de entrar en el modo de suspensión después de enviar el último mensaje al servidor.\r\n• Rango: 5~60\r\n• Predeterminado: 5",
      pt: "Tempo de atraso antes de entrar no modo de suspensão após enviar a última mensagem ao servidor.\r\n• Intervalo: 5~60\r\n• Padrão: 5",
    },
    min: 5,
    max: 60,
    list: null,
  },
  "2708": {
    title: {
      en: "Neighbor Cell",
      pt: "Célula Vizinha",
      es: "Celda Vecina",
    },
    tooltip: {
      en: "Set whether to activate the Neighbor Cell function.\r\n• Default : On",
      es: "Establecer si se activa la función de Célula Vecina.\r\n• Predeterminado: Activado",
      pt: "Definir se a função de Célula Vizinha deve ser ativada.\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2709": {
    title: {
      en: "LED",
      pt: "LED",
      es: "LED",
    },
    tooltip: {
      en: "Set whether to activate the GPRS/GPS LED display function.\r\n• Default : On",
      es: "Establecer si se activa la función de visualización del LED GPRS/GPS.\r\n• Predeterminado: Activado",
      pt: "Definir se a função de exibição do LED GPRS/GPS deve ser ativada.\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "2800": {
    title: {
      en: "Reception Interval (seconds)",
      pt: "Intervalo de Recepção (segundos)",
      es: "Intervalo de Recepción (segundos)",
    },
    tooltip: {
      en: "The time interval between two consecutive RF reception wake-ups in normal mode to check for received commands via RF.\r\n• Range : 0~60\r\n• Default : 1",
      es: "El intervalo de tiempo entre dos activaciones consecutivas de la recepción RF en modo normal para verificar si se han recibido comandos a través de RF.\r\n• Rango: 0~60\r\n• Predeterminado: 1",
      pt: "O intervalo de tempo entre dois despertares consecutivos de recepção RF em modo normal para verificar se há comandos recebidos via RF.\r\n• Intervalo: 0~60\r\n• Padrão: 1",
    },
    min: 0,
    max: 60,
    list: null,
  },
  "2801": {
    title: {
      en: "Reception Duration (milliseconds)",
      pt: "Duração da Recepção (milissegundos)",
      es: "Duración de la Recepción (milisegundos)",
    },
    tooltip: {
      en: "The time interval needed to keep the RF chip active to check if a command has been received via RF.\r\n• Range : 0~60,000\r\n• Default : 300\r\n* If 2800 is set to 12, and 2504 is set to 200, the device will keep the RF chip enabled for 200 milliseconds at an interval of 12 seconds to check for incoming commands.",
      es: "El intervalo de tiempo necesario para mantener el chip RF activo y verificar si se ha recibido un comando a través de RF.\r\n• Rango: 0~60,000\r\n• Predeterminado: 300\r\n* Si el parámetro 2800 se establece en 12 y el parámetro 2504 en 200, el dispositivo mantendrá el chip RF habilitado durante 200 milisegundos con un intervalo de 12 segundos para verificar los comandos entrantes.",
      pt: "O intervalo de tempo necessário para manter o chip RF ativo para verificar se um comando foi recebido via RF.\r\n• Intervalo: 0~60.000\r\n• Padrão: 300\r\n* Se 2800 for definido como 12 e 2504 for definido como 200, o dispositivo manterá o chip RF habilitado por 200 milissegundos em um intervalo de 12 segundos para verificar comandos recebidos.",
    },
    min: 0,
    max: 60000,
    list: null,
  },
  "2802": {
    title: {
      en: "Emergency Reception Count",
      pt: "Contagem de Recepção de Emergência",
      es: "Contador de Recepción de Emergencia",
    },
    tooltip: {
      en: "The number of RF transmissions in emergency mode.\r\n• Range : 0~15\r\n• Default : 1",
      es: "El número de transmisiones RF en modo de emergencia.\r\n• Rango: 0~15\r\n• Predeterminado: 1",
      pt: "O número de transmissões RF no modo de emergência.\r\n• Intervalo: 0~15\r\n• Padrão: 1",
    },
    min: 0,
    max: 15,
    list: null,
  },
  "2803": {
    title: {
      en: "Reception Interval in Emergency (seconds)",
      pt: "Intervalo de Recepção em Emergência (segundos)",
      es: "Intervalo de Recepción en Emergencia (segundos)",
    },
    tooltip: {
      en: "The time interval required to transmit data via RF in emergency mode.\r\n• Range : 1~60\r\n• Default : 2",
      es: "El intervalo de tiempo requerido para transmitir datos a través de RF en modo de emergencia.\r\n• Rango: 1~60\r\n• Predeterminado: 2",
      pt: "O intervalo de tempo necessário para transmitir dados via RF no modo de emergência.\r\n• Intervalo: 1~60\r\n• Padrão: 2",
    },
    min: 1,
    max: 60,
    list: null,
  },
  "2804": {
    title: {
      en: "Reception Duration in Emergency (milliseconds)",
      pt: "Duração da Recepção em Emergência (milissegundos)",
      es: "Duración de la Recepción en Emergencia (milisegundos)",
    },
    tooltip: {
      en: "The time required to keep RF Reception active to check for commands in emergency mode.\r\n• Range : 0~60,000\r\n• Default : 300",
      es: "El tiempo necesario para mantener la recepción RF activa para verificar comandos en modo de emergencia.\r\n• Rango: 0~60,000\r\n• Predeterminado: 300",
      pt: "O tempo necessário para manter a recepção RF ativa para verificar comandos no modo de emergência.\r\n• Intervalo: 0~60.000\r\n• Padrão: 300",
    },
    min: 0,
    max: 60000,
    list: null,
  },
  "2805": {
    title: {
      en: "Bandwidth (kHz)",
      pt: "Largura de Banda (kHz)",
      es: "Ancho de Banda (kHz)",
    },
    tooltip: {
      en: "The bandwidth value that should be used to configure the RF receiver.\r\n• Range : 6~25\r\n• Default : 6",
      es: "El valor de ancho de banda que debe usarse para configurar el receptor RF.\r\n• Rango: 6~25\r\n• Predeterminado: 6",
      pt: "O valor da largura de banda que deve ser usado para configurar o receptor RF.\r\n• Intervalo: 6~25\r\n• Padrão: 6",
    },
    min: 6,
    max: 25,
    list: null,
  },
  "2806": {
    title: {
      en: "GNSS Fix Timeout  (seconds)",
      pt: "Tempo de Expiração do GNSS Fix (segundos)",
      es: "Tiempo de Expiración del Fix GNSS (segundos)",
    },
    tooltip: {
      en: "Timeout for GPS fix. If the GPS is not fixed within this timeout, the device will transmit a 'Status Report' without a fixed position.\r\n• Range : 1~300\r\n• Default : 180",
      es: "Tiempo de espera para obtener una solución de GPS. Si el GPS no se fija dentro de este tiempo de espera, el dispositivo transmitirá un 'Informe de Estado' sin una posición fija.\r\n• Rango: 1~300\r\n• Predeterminado: 180",
      pt: "Tempo limite para fixação do GPS. Se o GPS não for fixado dentro desse tempo, o dispositivo transmitirá um 'Relatório de Status' sem uma posição fixada.\r\n• Intervalo: 1~300\r\n• Padrão: 180",
    },
    min: 1,
    max: 300,
    list: null,
  },
  "2807": {
    title: {
      en: "GNSS Report Type",
      pt: "Tipo de Relatório GNSS",
      es: "Tipo de Informe GNSS",
    },
    tooltip: {
      en: "GPS information includes settings in the report type.",
      es: "La información de GPS incluye configuraciones en el tipo de informe.",
      pt: "As informações do GPS incluem configurações no tipo de relatório.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "No use",
          es: "Sin uso",
          pt: "Sem uso",
        },
      },
      {
        value: "1",
        label: {
          en: "Alert",
          es: "Alerta",
          pt: "Alerta",
        },
      },
      {
        value: "2",
        label: {
          en: "Emergency",
          es: "Emergencia",
          pt: "Emergência",
        },
      },
      {
        value: "3",
        label: {
          en: "Alert+Emergency",
          es: "Alerta+Emergencia",
          pt: "Alerta+Emergência",
        },
      },
      {
        value: "4",
        label: {
          en: "Alert+Normal",
          es: "Alerta+Normal",
          pt: "Alerta+Normal",
        },
      },
      {
        value: "5",
        label: {
          en: "Emergency+Normal",
          es: "Emergencia+Normal",
          pt: "Emergência+Normal",
        },
      },
      {
        value: "6",
        label: {
          en: "Alert+Emergency+Normal",
          es: "Alerta+Emergencia+Normal",
          pt: "Alerta+Emergência+Normal",
        },
      },
      {
        value: "7",
        label: {},
      },
    ],
  },
  "2808": {
    title: {
      en: "Type of RF ID Number",
      pt: "Tipo de Número de ID RF",
      es: "Tipo de Número de ID RF",
    },
    tooltip: {
      en: "Settings for the device's RF ID number (Serial Number) to use 9 or 10 digits.\r\n• Option\r\n- 9 digits\r\n- 10 digits(Defualt)",
      es: "Configuraciones para el número de ID RF (Número de serie) del dispositivo, para usar 9 o 10 dígitos.\r\n• Opción\r\n- 9 dígitos\r\n- 10 dígitos(Predeterminado)",
      pt: "Configurações para o número de ID RF (Número de Série) do dispositivo para usar 9 ou 10 dígitos.\r\n• Opção\r\n- 9 dígitos\r\n- 10 dígitos (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "9 digits",
          es: "9 dígitos",
          pt: "9 dígitos",
        },
      },
      {
        value: "1",
        label: {
          en: "10 digits",
          es: "10 dígitos",
          pt: "10 dígitos",
        },
      },
    ],
  },
  "2809": {
    title: {
      en: "Trucks Emergency Mode Timeout (seconds)",
      pt: "Tempo de Expiração do Modo de Emergência para Caminhões (segundos)",
      es: "Tiempo de Expiración del Modo de Emergencia para Camiones (segundos)",
    },
    tooltip: {
      en: "The interval for sending Status Reports in the LoRaWAN network when the device is in emergency mode.\r\n• Range : 10~600\r\n• Default : 600",
      es: "El intervalo para enviar Informes de Estado en la red LoRaWAN cuando el dispositivo está en modo de emergencia.\r\n• Rango: 10~600\r\n• Predeterminado: 600",
      pt: "O intervalo para envio de Relatórios de Status na rede LoRaWAN quando o dispositivo está em modo de emergência.\r\n• Intervalo: 10~600\r\n• Padrão: 600",
    },
    min: 10,
    max: 600,
    list: null,
  },
  "2810": {
    title: {
      en: "Trucks Application Key - AES128 Key",
      pt: "Chave de Aplicação para Caminhões - Chave AES128",
      es: "Clave de Aplicación para Camiones - Clave AES128",
    },
    tooltip: {
      en: "User encryption key settings for RF messages.\r\n* The AES128 Key must be 32 characters long and can only contain the characters A-Z, a-z, and 0-9.",
      es: "Configuraciones de clave de encriptación para mensajes RF.\r\n* La clave AES128 debe tener 32 caracteres y solo puede contener los caracteres A-Z, a-z y 0-9.",
      pt: "Configurações da chave de criptografia do usuário para mensagens RF.\r\n* A chave AES128 deve ter 32 caracteres e pode conter apenas os caracteres A-Z, a-z e 0-9.",
    },
    min: null,
    max: null,
    list: null,
  },
  "3000": {
    title: {
      en: "Password",
      pt: "Senha",
      es: "Contraseña",
    },
    tooltip: {
      en: "When connecting to SyncMaster, access is controlled by a password. The user can configure the password settings.\r\n• Default : On",
      es: "Al conectarse a SyncMaster, el acceso está controlado por una contraseña. El usuario puede configurar la configuración de la contraseña.\r\n• Predeterminado: Activado",
      pt: "Ao conectar ao SyncMaster, o acesso é controlado por uma senha. O usuário pode configurar as configurações de senha.\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "3001": {
    title: {
      en: "Current Password",
      pt: "Senha Atual",
      es: "Contraseña Actual",
    },
    tooltip: {
      en: "Current password entered before changing the password.\r\n• Default : st5656\r\n* Must be 6~18 characters long.",
      es: "Contraseña actual ingresada antes de cambiar la contraseña.\r\n• Predeterminado: st5656\r\n* Debe tener entre 6 y 18 caracteres.",
      pt: "Senha atual inserida antes de alterar a senha.\r\n• Padrão : st5656\r\n* Deve ter de 6 a 18 caracteres.",
    },
    min: null,
    max: null,
    list: null,
  },
  "3002": {
    title: {
      en: "New Password",
      pt: "Nova Senha",
      es: "Nueva Contraseña",
    },
    tooltip: {
      en: "The new password to use for changing.\r\n* Must be 6~18 characters long.",
      es: "La nueva contraseña para usar al cambiar.\r\n* Debe tener entre 6 y 18 caracteres.",
      pt: "A nova senha a ser utilizada para alteração.\r\n* Deve ter de 6 a 18 caracteres.",
    },
    min: null,
    max: null,
    list: null,
  },
  "3010": {
    title: {
      en: "Fine Tracking",
      pt: "Rastreamento Fino",
      es: "Rastreo Fino",
    },
    tooltip: {
      en: "Fine Tracking Report Settings.\r\n• Default : Off\r\n* To enable Fine Tracking, Status Report interval must be set to more than 60 seconds.",
      es: "Configuraciones de Informe de Seguimiento Fino.\r\n• Predeterminado: Desactivado\r\n\r\nPara habilitar el Seguimiento Fino, el intervalo de Informes de Estado debe estar configurado a más de 60 segundos.",
      pt: "Configurações de Relatório de Rastreamento Fino.\r\n• Padrão  : Desativado\r\n* Para ativar o Rastreamento Fino, o intervalo do Relatório de Status deve ser definido para mais de 60 segundos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "3011": {
    title: {
      en: "GPS interval for Fine Tracking (seconds)",
      pt: "Intervalo de GPS para Rastreamento Fino (segundos)",
      es: "Intervalo de GPS para Rastreo Fino (segundos)",
    },
    tooltip: {
      en: "The time interval for tracking the GPS position.\r\n• Range : 1~5\r\n• Default : 1",
      es: "El intervalo de tiempo para rastrear la posición GPS.\r\n• Rango: 1~5\r\n• Predeterminado:",
      pt: "O intervalo de tempo para rastrear a posição GPS.\r\n• Intervalo : 1~5\r\n• Padrão : 1",
    },
    min: 1,
    max: 5,
    list: null,
  },
  "3012": {
    title: {
      en: "GPS Count for Fine Tracking (seconds)",
      pt: "Contagem de GPS para Rastreamento Fino (segundos)",
      es: "Contador de GPS para Rastreo Fino (segundos)",
    },
    tooltip: {
      en: "The number of GPS positions to be included in the report.\r\n• Range : 5~10\r\n• Default : 5",
      es: "El número de posiciones GPS que se incluirán en el informe.\r\n• Rango: 5~10\r\n• Predeterminado: 5",
      pt: "O número de posições GPS a serem incluídas no relatório.\r\n• Intervalo : 5~10\r\n• Padrão : 5",
    },
    min: 5,
    max: 10,
    list: null,
  },
  "3100": {
    title: {
      en: "Basic Sensor Report Map",
      pt: "Mapa do Relatório de Sensor Básico",
      es: "Mapa de reporte de sensores básicos",
    },
    tooltip: {
      en: "Setting report fields to be included in the Basic Sensor Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Sensor Básico.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório Básico de Sensores.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes",
          pt: "Mapa do Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Total Sensor",
          es: "Sensor Total",
          pt: "Total de Sensores",
        },
      },
      {
        value: "b4",
        label: {
          en: "Current Sensor",
          es: "Sensor Actual",
          pt: "Sensor Atual",
        },
      },
      {
        value: "b5",
        label: {
          en: "Scans",
          es: "Escaneos",
          pt: "Scans",
        },
      },
      {
        value: "b6",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b7",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b8",
        label: {
          en: "Time Packet",
          es: "Paquete de Tiempo",
          pt: "Pacote de Tempo",
        },
      },
      {
        value: "b9",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b10",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b11",
        label: {
          en: "Latitude Gap",
          es: "Diferencia de Latitud",
          pt: "Diferença de Latitude",
        },
      },
      {
        value: "b12",
        label: {
          en: "Longitude Gap",
          es: "Diferencia de Longitud",
          pt: "Diferença de Longitude",
        },
      },
      {
        value: "b13",
        label: {
          en: "Temperature",
          es: "Temperatura",
          pt: "Temperatura",
        },
      },
      {
        value: "b14",
        label: {
          en: "Humidity",
          es: "Humedad",
          pt: "Umidade",
        },
      },
      {
        value: "b15",
        label: {
          en: "Barometric Pressure",
          es: "Presión Barométrica",
          pt: "Pressão Barométrica",
        },
      },
      {
        value: "b16",
        label: {
          en: "1-Wire",
          es: "1-Wire",
          pt: "1-Wire",
        },
      },
      {
        value: "b17",
        label: {
          en: "1-Wire Temperature",
          es: "Temperatura 1-Wire",
          pt: "Temperatura 1-Wire",
        },
      },
    ],
  },
  "3101": {
    title: {
      en: "Extended Sensor Report Map",
      pt: "Mapa do Relatório de Sensor Estendido",
      es: "Mapa de reporte de Sensores Extendidos",
    },
    tooltip: {
      en: "Setting report fields to be included in the Extended Sensor Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Sensor Extendido.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório Estendido de Sensores.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes",
          pt: "Mapa do Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "Total Sensor",
          es: "Total de sensores",
          pt: "Total de Sensores",
        },
      },
      {
        value: "b4",
        label: {
          en: "Current Sensor",
          es: "Sensor Actual",
          pt: "Sensor Atual",
        },
      },
      {
        value: "b5",
        label: {
          en: "BLE Sensor Scan",
          es: "Escaneo de Sensor BLE",
          pt: "Scan de Sensor BLE",
        },
      },
      {
        value: "b6",
        label: {
          en: "Scanned BLE Sensor",
          es: "Sensor BLE Escaneado",
          pt: "Sensor BLE Escaneado",
        },
      },
      {
        value: "b7",
        label: {
          en: "BLE Sensor ID",
          es: "ID de Sensor BLE",
          pt: "ID do Sensor BLE",
        },
      },
      {
        value: "b8",
        label: {
          en: "Temp/Hum/Pres",
          es: "Temp/Hum/Pres",
          pt: "Temp/Hum/Pres",
        },
      },
    ],
  },
  "3103": {
    title: {
      en: "BLE Data Report Map",
      pt: "Mapa do Relatório de Dados BLE",
      es: "Mapa de reporte de Datos BLE",
    },
    tooltip: {
      en: "Setting report fields to be included in the BLE Data Report.",
      es: "Configuración de los campos de informe que se incluirán en el Informe de Datos BLE.",
      pt: "Configuração dos campos de relatório a serem incluídos no Relatório de Dados BLE.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "b0",
        label: {
          en: "Report Map",
          es: "Mapa de reportes",
          pt: "Mapa do Relatório",
        },
      },
      {
        value: "b1",
        label: {
          en: "Model",
          es: "Modelo",
          pt: "Modelo",
        },
      },
      {
        value: "b2",
        label: {
          en: "Software Version",
          es: "Versión de Software",
          pt: "Versão do Software",
        },
      },
      {
        value: "b3",
        label: {
          en: "BLE sensor’s Scan Status",
          es: "Estado de Escaneo del Sensor BLE",
          pt: "Status do Scan do Sensor BLE",
        },
      },
      {
        value: "b4",
        label: {
          en: "Total BLE Data",
          es: "Total de datos de BLE",
          pt: "Total de Dados BLE",
        },
      },
      {
        value: "b5",
        label: {
          en: "Current BLE Data",
          es: "Datos Actuales de BLE",
          pt: "Dados BLE Atuais",
        },
      },
      {
        value: "b6",
        label: {
          en: "BLE Sensor",
          es: "Sensor BLE",
          pt: "Sensor BLE",
        },
      },
      {
        value: "b7",
        label: {
          en: "Date",
          es: "Fecha",
          pt: "Data",
        },
      },
      {
        value: "b8",
        label: {
          en: "Time",
          es: "Hora",
          pt: "Hora",
        },
      },
      {
        value: "b9",
        label: {
          en: "Latitude",
          es: "Latitud",
          pt: "Latitude",
        },
      },
      {
        value: "b10",
        label: {
          en: "Longitude",
          es: "Longitud",
          pt: "Longitude",
        },
      },
      {
        value: "b11",
        label: {
          en: "BLE Data Size",
          es: "Tamaño de Datos BLE",
          pt: "Tamanho dos Dados BLE",
        },
      },
      {
        value: "b12",
        label: {
          en: "BLE Data",
          es: "Datos BLE",
          pt: "Dados BLE",
        },
      },
      {
        value: "b13",
        label: {
          en: "BLE Mac Address",
          es: "Dirección MAC BLE",
          pt: "Endereço Mac do BLE",
        },
      },
      {
        value: "b14",
        label: {
          en: "BLE RSSI",
          es: "RSSI BLE",
          pt: "RSSI do BLE",
        },
      },
    ],
  },
  "4000": {
    title: {
      en: "BLE UUID 1",
      pt: "UUID BLE 1",
      es: "UUID BLE 1",
    },
    tooltip: {
      en: "The target UUID(Universally Unique Identifier) you want to scan.\r\n* If you do not enter a UUID, all beacons will be scanned and reported.\r\n* UUID is a 128-bit number, shown in hexadecimal, and typically has 32 characters.",
      es: "El UUID (Identificador Único Universal) de destino que deseas escanear.\r\n* Si no ingresas un UUID, se escanearán y reportarán todos los beacons.\r\n* El UUID es un número de 128 bits, mostrado en formato hexadecimal, y típicamente tiene 32 caracteres.",
      pt: "O UUID(Identificador Universalmente Único) alvo que você deseja escanear.\r\n* Se você não inserir um UUID, todos os beacons serão escaneados e relatados.\r\n* O UUID é um número de 128 bits, mostrado em hexadecimal, e normalmente possui 32 caracteres.",
    },
    min: null,
    max: null,
    list: null,
  },
  "4010": {
    title: {
      en: "Max BLE scan count",
      pt: "Quantidade Máxima de Varreduras BLE",
      es: "Cantidad Máxima de Escaneos BLE",
    },
    tooltip: {
      en: "Maximum scan count for automatic stop.\r\n• Range(On) : 1~50\r\n• Default : 50",
      es: "Recuento máximo de escaneos para parada automática.\r\n• Rango(Activado): 1~50\r\n• Predeterminado: 50",
      pt: "Contagem máxima de varredura para parada automática.\r\n• Intervalo(Ligado): 1~50\r\n• Padrão: 50",
    },
    min: 1,
    max: 50,
    list: null,
  },
  "4011": {
    title: {
      en: "BLE Scan Time (seconds)",
      pt: "Tempo de Varredura BLE (segundos)",
      es: "Tiempo de Escaneo BLE (segundos)",
    },
    tooltip: {
      en: "BLE scan time settings for Sensor Reports.\r\n- 4000\r\n• Range(On) : 20~120(ST4000), 20~540(ST4950)\r\n• Default : 60(ST4000), 540(ST4950)\r\n* The scan ends when 4010 is reached, even if the set scan time is not completed.\r\n* For models that do not support 4010, the default value is 50.",
      es: "Configuraciones de tiempo de escaneo BLE para los Informes de Sensores.\r\n- 4000\r\n• Rango(Activado): 20~120 (ST4000), 20~540 (ST4950)\r\n• Predeterminado: 60 (ST4000), 540 (ST4950)\r\n* El escaneo termina cuando se alcanza 4010, incluso si no se ha completado el tiempo de escaneo configurado.\r\n* Para modelos que no soportan 4010, el valor predeterminado es 50.",
      pt: "Configurações do tempo de varredura BLE para Relatórios de Sensor.\r\n- 4000\r\n• Intervalo(Ligado): 20~120(ST4000), 20~540(ST4950)\r\n• Padrão: 60(ST4000), 540(ST4950)\r\n* A varredura termina quando 4010 é atingido, mesmo que o tempo de varredura definido não seja concluído.\r\n* Para modelos que não suportam 4010, o valor padrão é 50.",
    },
    min: 20,
    max: 120,
    list: null,
  },
  "4012": {
    title: {
      en: "BLE Scan Time for BDA Reports (seconds)",
      pt: "Tempo de Varredura BLE para Relatórios BDA (segundos)",
      es: "Tiempo de Escaneo BLE para Informes BDA (segundos)",
    },
    tooltip: {
      en: "BLE scan time settings for BDA(Bluetooth Device Address) Reports.\r\n* The scan time is set according to the 4026(BDA Parking Frequency Interval), 4027(BDA Driving Frequency Interval), 1670(Parking Tracking Time), 1673(Power Saving 1 Parking Tracking Time), 1676(Power Saving 2 Parking Tracking Time), 1679(Driving Tracking Time), 1682(DC.PWR Tracking Time - Only driving), 1685(Power Saving 1 Driving Tracking Time), and 1688(Power Saving 2 Driving Tracking Time) settings.\r\n• Range : 20~86,380\r\n• Default : 300\r\n* e.g) 1670(Parking Interval): 3,600, 1679(Driving Interval): 600, \r\nThe interval of the BDA Report is 3600 seconds (BDA Parking Frequency Interval * Parking Interval) or 4200 seconds (BDA Driving Frequency Interval * Driving Interval).\r\nYou can set the scan time based on the shorter interval, 3600 seconds, with a maximum scan time of 3580 seconds (3600 - 20).",
      es: "Configuraciones de tiempo de escaneo BLE para los Informes de BDA (Dirección de Dispositivo Bluetooth).\r\n* El tiempo de escaneo se establece de acuerdo con las configuraciones 4026 (Intervalo de Frecuencia de Estacionamiento BDA), 4027 (Intervalo de Frecuencia de Conducción BDA), 1670 (Tiempo de Rastreo en Estacionamiento), 1673 (Tiempo de Rastreo en Estacionamiento de Ahorro de Energía 1), 1676 (Tiempo de Rastreo en Estacionamiento de Ahorro de Energía 2), 1679 (Tiempo de Rastreo en Conducción), 1682 (Tiempo de Rastreo de DC.PWR - Solo en Conducción), 1685 (Tiempo de Rastreo en Conducción de Ahorro de Energía 1), y 1688 (Tiempo de Rastreo en Conducción de Ahorro de Energía 2).\r\n• Rango: 20~86,380\r\n• Predeterminado: 300\r\n* Ejemplo) 1670 (Intervalo de Estacionamiento): 3,600, 1679 (Intervalo de Conducción): 600, \r\nEl intervalo del Informe de BDA es de 3600 segundos (Intervalo de Frecuencia de Estacionamiento BDA * Intervalo de Estacionamiento) o 4200 segundos (Intervalo de Frecuencia de Conducción BDA * Intervalo de Conducción).\r\nPuedes establecer el tiempo de escaneo en base al intervalo más corto, 3600 segundos, con un tiempo máximo de escaneo de 3580 segundos (3600 - 20).",
      pt: "Configurações do tempo de varredura BLE para Relatórios BDA(Endereço de Dispositivo Bluetooth).\r\n* O tempo de varredura é definido de acordo com as configurações de 4026(Intervalo de Frequência BDA Estacionamento), 4027(Intervalo de Frequência BDA Direção), 1670(Tempo de Rastreamento Estacionamento), 1673(Tempo de Rastreamento de Estacionamento Economia de Energia 1), 1676(Tempo de Rastreamento de Estacionamento Economia de Energia 2), 1679(Tempo de Rastreamento Direção), 1682(Tempo de Rastreamento DC.PWR - Apenas condução), 1685(Tempo de Rastreamento Direção Economia de Energia 1) e 1688(Tempo de Rastreamento Direção Economia de Energia 2).\r\n• Intervalo: 20~86.380\r\n• Padrão: 300\r\n* Exemplo: 1670(Intervalo de Estacionamento): 3.600, 1679(Intervalo de Direção): 600,\r\nO intervalo do Relatório BDA é 3.600 segundos (Intervalo de Frequência BDA Estacionamento * Intervalo de Estacionamento) ou 4.200 segundos (Intervalo de Frequência BDA Direção * Intervalo de Direção).\r\nVocê pode definir o tempo de varredura com base no intervalo mais curto, 3.600 segundos, com um tempo máximo de varredura de 3.580 segundos (3.600 - 20).",
    },
    min: 20,
    max: 86380,
    list: null,
  },
  "4013": {
    title: {
      en: "BLE MPC Scan Time (seconds)",
      pt: "Tempo de Varredura BLE MPC (segundos)",
      es: "Tiempo de Escaneo BLE MPC (segundos)",
    },
    tooltip: {
      en: "Scan BLE and report the scanned information within the set time when awakened from ‘Deep sleep Mode’ by ‘MPC’ (Main Power Connected) or when a scan command is executed.\r\n• Range(On) : 20~120\r\n• Default : 60\r\n* The scan ends when 4010 is reached, even if the set scan time is not completed.\r\n* When set to 0, it will not scan even if Main Power is connected.\r\n* For models that do not support 4010, the default value is 50.",
      es: "Escanear BLE y reportar la información escaneada dentro del tiempo establecido cuando el dispositivo sale del 'Modo de Sueño Profundo' por 'MPC' (Energía Principal Conectada) o cuando se ejecuta un comando de escaneo.\r\n• Rango(Activado): 20~120\r\n• Predeterminado: 60\r\n* El escaneo termina cuando se alcanza 4010, incluso si no se ha completado el tiempo de escaneo configurado.\r\n* Cuando se establece en 0, no se escaneará incluso si la Energía Principal está conectada.\r\n* Para modelos que no soportan 4010, el valor predeterminado es 50.",
      pt: "Varredura BLE e relatório das informações escaneadas dentro do tempo definido quando despertado do 'Modo de Sono Profundo' por 'MPC' (Energia Principal Conectada) ou quando um comando de varredura é executado.\r\n• Intervalo(Ligado): 20~120\r\n• Padrão: 60\r\n* A varredura termina quando 4010 é atingido, mesmo que o tempo de varredura definido não seja concluído.\r\n* Quando definido como 0, não haverá varredura, mesmo se a Energia Principal estiver conectada.\r\n* Para modelos que não suportam 4010, o valor padrão é 50.",
    },
    min: 20,
    max: 120,
    list: null,
  },
  "4014": {
    title: {
      en: "BLE MPD Scan Time (seconds)",
      pt: "Tempo de Varredura BLE MPD (segundos)",
      es: "Tiempo de Escaneo BLE MPD (segundos)",
    },
    tooltip: {
      en: "Scan BLE and report the scanned information within the set time when awakened from ‘Deep sleep Mode’ by ‘MPD’ (Main Power Disconnected) or when a scan command is executed.\r\n• Range(On) : 20~120\r\n• Default : 60\r\n* The scan ends when the Max BLE scan count (4010) is reached, even if the set scan time is not completed.\r\n* When set to 0, it will not scan even if Main Power is disconnected.\r\n* For models that do not support 4010, the default value is 50.",
      es: "Escanear BLE y reportar la información escaneada dentro del tiempo establecido cuando el dispositivo sale del 'Modo de Sueño Profundo' por 'MPD' (Energía Principal Desconectada) o cuando se ejecuta un comando de escaneo.\r\n• Rango(Activado): 20~120\r\n• Predeterminado: 60\r\n* El escaneo termina cuando se alcanza el máximo de escaneos BLE (4010), incluso si no se ha completado el tiempo de escaneo configurado.\r\n* Cuando se establece en 0, no se escaneará incluso si la Energía Principal está desconectada.\r\n* Para modelos que no soportan 4010, el valor predeterminado es 50.",
      pt: "Varredura BLE e relatório das informações escaneadas dentro do tempo definido quando despertado do 'Modo de Sono Profundo' por 'MPD' (Energia Principal Desconectada) ou quando um comando de varredura é executado.\r\n• Intervalo(Ligado): 20~120\r\n• Padrão: 60\r\n* A varredura termina quando a contagem máxima de varredura BLE (4010) é atingida, mesmo que o tempo de varredura definido não seja concluído.\r\n* Quando definido como 0, não haverá varredura, mesmo se a Energia Principal estiver desconectada.\r\n* Para modelos que não suportam 4010, o valor padrão é 50.",
    },
    min: 20,
    max: 120,
    list: null,
  },
  "4020": {
    title: {
      en: "Max BLE Device Count",
      pt: "Quantidade Máxima de Dispositivos BLE",
      es: "Cantidad Máxima de Dispositivos BLE",
    },
    tooltip: {
      en: "The settings for the maximum number of dedicated BLE devices.\r\n• Range(On) : 1~5\r\n• Default : 5",
      es: "Configuración para el número máximo de dispositivos BLE dedicados.\r\n• Rango(Activado): 1~5\r\n• Predeterminado: 5",
      pt: "As configurações para o número máximo de dispositivos BLE dedicados.\r\n• Intervalo(Ligado): 1~5\r\n• Padrão: 5",
    },
    min: 0,
    max: 5,
    list: null,
  },
  "4021": {
    title: {
      en: "BLE Scan",
      pt: "BLE",
      es: "BLE",
    },
    tooltip: {
      en: "BLE scan On/Off settings.\r\n• Default : Off\r\n* The range of 'Driving Report Interval' may change depending on the BLE Scan option. (Refer to 1679).",
      es: "Configuraciones de activación/desactivación del escaneo BLE.\r\n• Predeterminado: Desactivado\r\n* El intervalo de informes de conducción puede cambiar dependiendo de la opción de escaneo BLE. (Consultar 1679).",
      pt: "Configurações de ativação/desativação da varredura BLE.\r\n• Padrão : Desativado\r\n* O intervalo do 'Relatório de Condução' pode mudar dependendo da opção de varredura BLE. (Consulte 1679).",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "4025": {
    title: {
      en: "BDA Report",
      pt: "Relatório BDA",
      es: "Informe BDA",
    },
    tooltip: {
      en: "BDA(Bluetooth Device Address) Report On/Off settings.\r\n* To turn on the BDA Report, 2610 must be off.\r\n• Default : On\r\n",
      es: "Configuraciones de activación/desactivación del Informe de BDA (Dirección de Dispositivo Bluetooth).\r\n* Para activar el Informe de BDA, 2610 debe estar Desactivado.\r\n• Predeterminado: Activado",
      pt: "Configurações de ativação/desativação do Relatório BDA(Endereço de Dispositivo Bluetooth).\r\n* Para ativar o Relatório BDA, a configuração 2610 deve estar desligada.\r\n• Padrão : Ativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "1",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "4026": {
    title: {
      en: "BDA Parking Frequency Interval",
      pt: "Intervalo de Frequência de Estacionamento BDA",
      es: "Intervalo de Frecuencia de Estacionamiento BDA",
    },
    tooltip: {
      en: "The frequency at which BDA reports are sent to the server in parking mode.\r\n• Range : 1~144\r\n• Default : 1\r\n* For details, refer to section '1.4 How to Generate BDA Report' in the 'Universal Reporting Guide_ST4910 Series' document.",
      es: "La frecuencia con la que se envían los informes de BDA al servidor en modo de estacionamiento.\r\n• Rango: 1~144\r\n• Predeterminado: 1\r\n* Para más detalles, consulta la sección '1.4 Cómo Generar el Informe de BDA' en el documento 'Guía de Informes Universales_Serie ST4910'.",
      pt: "A frequência com que os relatórios BDA são enviados ao servidor no modo de estacionamento.\r\n• Intervalo: 1~144\r\n• Padrão: 1\r\n* Para mais detalhes, consulte a seção '1.4 Como Gerar Relatório BDA' no documento 'Guia de Relatórios Universais_Série ST4910'.",
    },
    min: 1,
    max: 144,
    list: null,
  },
  "4027": {
    title: {
      en: "BDA Driving Frequency Interval",
      pt: "Intervalo de Frequência de Condução BDA",
      es: "Intervalo de Frecuencia de Conducción BDA",
    },
    tooltip: {
      en: "The frequency at which BDA reports are sent to the server in driving mode.\r\n• Range : 1~144\r\n• Default : 1\r\n* For details, refer to section '1.4 How to Generate BDA Report' in the 'Universal Reporting Guide_ST4910 Series' document.",
      es: "La frecuencia con la que se envían los informes de BDA al servidor en modo de conducción.\r\n• Rango: 1~144\r\n• Predeterminado: 1\r\n* Para más detalles, consulta la sección '1.4 Cómo Generar el Informe de BDA' en el documento 'Guía de Informes Universales_Serie ST4910'.",
      pt: "A frequência com que os relatórios BDA são enviados ao servidor no modo de condução.\r\n• Intervalo: 1~144\r\n• Padrão: 1\r\n* Para mais detalhes, consulte a seção '1.4 Como Gerar Relatório BDA' no documento 'Guia de Relatórios Universais_Série ST4910'.",
    },
    min: 1,
    max: 144,
    list: null,
  },
  "4028": {
    title: {
      en: "BLE Sensor",
      pt: "Sensor BLE",
      es: "Sensor BLE",
    },
    tooltip: {
      en: "BLE sensors setting to be supported by the device.\r\n• Option\r\n- ELA(Default)\r\n- ConMet\r\n- Otodata",
      es: "Configuración de los sensores BLE que serán soportados por el dispositivo.\r\n• Opción\r\n- ELA (Predeterminado)\r\n- ConMet\r\n- Otodata",
      pt: "Configurações de sensores BLE a serem suportados pelo dispositivo.\r\n• Opção\r\n- ELA(Padrão)\r\n- ConMet\r\n- Otodata",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "ELA",
          es: "ELA",
          pt: "ELA",
        },
      },
      {
        value: "2",
        label: {
          en: "ConMet",
          es: "ConMet",
          pt: "ConMet",
        },
      },
      {
        value: "4",
        label: {
          en: "ELA+ConMet",
          es: "ELA+ConMet",
          pt: "ELA+ConMet",
        },
      },
      {
        value: "7",
        label: {
          en: "Otodata",
          es: "Otodata",
          pt: "Otodata",
        },
      },
      {
        value: "8",
        label: {
          en: "ELA+Otodata",
          es: "ELA+Otodata",
          pt: "ELA+Otodata",
        },
      },
      {
        value: "9",
        label: {
          en: "ConMet+Otodata",
          es: "ConMet+Otodata",
          pt: "ConMet+Otodata",
        },
      },
      {
        value: "10",
        label: {
          en: "ELA+ConMet+Otodata",
          es: "ELA+ConMet+Otodata",
          pt: "ELA+ConMet+Otodata",
        },
      },
    ],
  },
  "4200": {
    title: {
      en: "TDI Odometer",
      pt: "Odômetro TDI",
      es: "Odómetro TDI",
    },
    tooltip: {
      en: "Set whether to use the TDI Odometer.\r\n• Default : Off",
      es: "Establecer si se utiliza el Odómetro TDI.\r\n• Predeterminado: Desactivado",
      pt: "Definir se o Odômetro TDI deve ser utilizado.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "4201": {
    title: {
      en: "TDI Odometer Unit",
      pt: "Unidade do Odômetro TDI",
      es: "Unidad de Odómetro TDI",
    },
    tooltip: {
      en: 'Set the number of pulses per 1 km.\r\n• Range(On) : 1~9,999, A\r\n• Default : Off\r\n* If set to Off, the odometer is not used, and the distance is no longer calculated by the odometer.\r\n* If \'A\' is set, the installer needs to calibrate.\r\n- Calibration by Ignition\r\n1) Wait for the GPS to fix (the red GPS LED blinks once).\r\n2) Turn the ignition line (blue wire) ON and OFF 5 times in sequence:\r\n3) ON (1st) → OFF (2nd) → ON (3rd) → OFF (4th) → ON (5th).\r\n4) Wait 5 seconds.\r\n5) The GNSS LED (red) will blink every 0.5 seconds, and the WWAN LED (blue) will turn off. If the GNSS signal is weak, the LEDs will blink normally.\r\n6) Drive more than 1 km.\r\n7) If calibration is successful, the GNSS LED will stay on continuously. The LEDs will return to normal after restarting the device. If calibration fails, the LEDs will blink normally, and the installer should repeat the process from step 1.\r\n- Calibration by Commands\r\n1) Send the "StartCountOdo" command.\r\n2) As the driver drives, the device will count the odometer pulses.\r\n3) Send the "StopCountOdo" command along with the traveled distance.\r\n4) The device will calculate the odometer unit based on the counted pulses and the traveled distance.',
      es: 'Establecer el número de pulsos por 1 km.\r\n• Rango(Activado): 1~9,999, A\r\n• Predeterminado: Desactivado\r\n* Si se establece en Desactivado, no se utiliza el odómetro y la distancia ya no se calcula con el odómetro.\r\n* Si se establece en \'A\', el instalador necesita calibrar.\r\n- Calibración por Ignición\r\n1) Esperar a que el GPS se fije (el LED rojo de GPS parpadea una vez).\r\n2) Encender y apagar la línea de ignición (cable azul) 5 veces en secuencia:\r\n3) ENCENDER (1ra vez) → APAGAR (2da vez) → ENCENDER (3ra vez) → APAGAR (4ta vez) → ENCENDER (5ta vez).\r\n4) Esperar 5 segundos.\r\n5) El LED GNSS (rojo) parpadeará cada 0.5 segundos, y el LED WWAN (azul) se apagará. Si la señal GNSS es débil, los LED parpadearán normalmente.\r\n6) Conducir más de 1 km.\r\n7) Si la calibración es exitosa, el LED GNSS permanecerá Activado continuamente. Los LED volverán a la normalidad después de reiniciar el dispositivo. Si la calibración falla, los LED parpadearán normalmente, y el instalador debe repetir el proceso desde el paso 1.\r\n- Calibración por Comandos\r\n1) Enviar el comando "StartCountOdo".\r\n2) Mientras el conductor conduce, el dispositivo contará los pulsos del odómetro.\r\n3) Enviar el comando "StopCountOdo" junto con la distancia recorrida.\r\n4) El dispositivo calculará la unidad del odómetro basada en los pulsos contados y la distancia recorrida.',
      pt: 'Definir o número de pulsos por 1 km.\r\n• Intervalo(Ativado): 1~9.999, A\r\n• Padrão : Desativado\r\n* Se definido como Desligado, o odômetro não será utilizado e a distância não será mais calculada pelo odômetro.\r\n* Se \'A\' for definido, o instalador precisa calibrar.\r\n- Calibração por Ignição\r\n1) Aguarde o GPS fixar (o LED vermelho do GPS piscará uma vez).\r\n2) Ligue e desligue a linha de ignição (fio azul) 5 vezes em sequência:\r\n3) LIGADO (1ª vez) → DESLIGADO (2ª vez) → LIGADO (3ª vez) → DESLIGADO (4ª vez) → LIGADO (5ª vez).\r\n4) Aguarde 5 segundos.\r\n5) O LED GNSS (vermelho) piscará a cada 0,5 segundos, e o LED WWAN (azul) se apagará. Se o sinal GNSS for fraco, os LEDs piscarão normalmente.\r\n6) Dirija mais de 1 km.\r\n7) Se a calibração for bem-sucedida, o LED GNSS permanecerá aceso continuamente. Os LEDs voltarão ao normal após reiniciar o dispositivo. Se a calibração falhar, os LEDs piscarão normalmente, e o instalador deverá repetir o processo desde o passo 1.\r\n- Calibração por Comandos\r\n1) Envie o comando "StartCountOdo".\r\n2) Enquanto o motorista dirige, o dispositivo contará os pulsos do odômetro.\r\n3) Envie o comando "StopCountOdo" junto com a distância percorrida.\r\n4) O dispositivo calculará a unidade do odômetro com base nos pulsos contados e na distância percorrida.',
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "4202": {
    title: {
      en: "TDI RPM Unit",
      pt: "Unidade de RPM TDI",
      es: "Unidad de RPM TDI",
    },
    tooltip: {
      en: "Set the number of pulses per 1,000 RPM.\r\n• Range(On) : 1~9,999, A\r\n• Default : Off\r\n* If set to Off, the RPM is not used.\r\n* If 'A' is set, the installer needs to calibrate.\r\n- RPM Calibration\r\n1) Turn the ignition line (blue wire) ON and OFF 9 times in sequence:\r\n2) ON (1st) → OFF (2nd) → ON (3rd) → OFF (4th) → ON (5th) → OFF (6th) → ON (7th) → OFF (8th) → ON (9th).\r\n3) Wait for 5 seconds.\r\n4) The WWAN LED (blue) will blink every 0.5 seconds, and the GNSS LED (red) will turn off.\r\n5) Press the accelerator and hold at 2000 RPM for 10 seconds. This must be done within 3 minutes.\r\n6) If the calibration is successful, the WWAN LED will stay on. The LEDs will return to normal after restarting the device. If the calibration fails, the LEDs will blink normally, and the installer should repeat the process from step 1.",
      es: "Establecer el número de pulsos por 1,000 RPM.\r\n• Rango(Activado): 1~9,999, A\r\n• Predeterminado: Desactivado\r\n* Si se establece en Desactivado, no se utiliza el RPM.\r\n* Si se establece en 'A', el instalador necesita calibrar.\r\n- Calibración de RPM\r\n1) Encender y apagar la línea de ignición (cable azul) 9 veces en secuencia:\r\n2) ENCENDER (1ra vez) → APAGAR (2da vez) → ENCENDER (3ra vez) → APAGAR (4ta vez) → ENCENDER (5ta vez) → APAGAR (6ta vez) → ENCENDER (7ma vez) → APAGAR (8va vez) → ENCENDER (9na vez).\r\n3) Esperar 5 segundos.\r\n4) El LED WWAN (azul) parpadeará cada 0.5 segundos, y el LED GNSS (rojo) se apagará.\r\n5) Presionar el acelerador y mantenerlo en 2000 RPM durante 10 segundos. Esto debe hacerse dentro de los 3 minutos.\r\n6) Si la calibración es exitosa, el LED WWAN permanecerá Activado. Los LED volverán a la normalidad después de reiniciar el dispositivo. Si la calibración falla, los LED parpadearán normalmente, y el instalador debe repetir el proceso desde el paso 1.",
      pt: "Definir o número de pulsos por 1.000 RPM.\r\n• Intervalo(Ativado): 1~9.999, A\r\n• Padrão : Desativado\r\n* Se definido como Desligado, o RPM não será utilizado.\r\n* Se 'A' for definido, o instalador precisa calibrar.\r\n- Calibração de RPM\r\n1) Ligue e desligue a linha de ignição (fio azul) 9 vezes em sequência:\r\n2) LIGADO (1ª vez) → DESLIGADO (2ª vez) → LIGADO (3ª vez) → DESLIGADO (4ª vez) → LIGADO (5ª vez) → DESLIGADO (6ª vez) → LIGADO (7ª vez) → DESLIGADO (8ª vez) → LIGADO (9ª vez).\r\n3) Aguarde 5 segundos.\r\n4) O LED WWAN (azul) piscará a cada 0,5 segundos, e o LED GNSS (vermelho) se apagará.\r\n5) Pressione o acelerador e mantenha em 2000 RPM por 10 segundos. Isso deve ser feito dentro de 3 minutos.\r\n6) Se a calibração for bem-sucedida, o LED WWAN permanecerá aceso. Os LEDs voltarão ao normal após reiniciar o dispositivo. Se a calibração falhar, os LEDs piscarão normalmente, e o instalador deverá repetir o processo desde o passo 1.",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "4205": {
    title: {
      en: "TDI Max RPM",
      pt: "RPM Máximo TDI",
      es: "RPM Máxima TDI",
    },
    tooltip: {
      en: "Maximum RPM setting.\r\n• Range : 0~9,999\r\n• Default : 0\r\n* When the vehicle's RPM exceeds the maximum RPM, the device counts the number of excesses and reports it in the travel event string.",
      es: "Configuración de RPM máxima.\r\n• Rango: 0~9,999\r\n• Predeterminado: 0\r\n* Cuando las RPM del vehículo exceden las RPM máximas, el dispositivo cuenta el número de excesos y lo informa en la cadena de eventos de viaje.",
      pt: "Configuração de RPM máxima.\r\n• Intervalo: 0~9.999\r\n• Padrão: 0\r\n* Quando as RPM do veículo excedem as RPM máximas, o dispositivo conta o número de excessos e relata no evento de viagem.",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "4206": {
    title: {
      en: "TDI Check Gear",
      pt: "Verificação de Marcha TDI",
      es: "Comprobar Marcha TDI",
    },
    tooltip: {
      en: "Set to check whether the vehicle moves when the gear is in the neutral position.\r\n• Default : Off\r\n* The neutral condition is checked when the RPM is very low but the vehicle is moving fast.",
      es: "Establecer para verificar si el vehículo se mueve cuando la marcha está en posición neutral.\r\n• Predeterminado: Desactivado\r\n* La condición de neutral se verifica cuando las RPM son muy bajas pero el vehículo se mueve rápido.",
      pt: "Definir para verificar se o veículo se move quando a marcha está em posição neutra.\r\n• Padrão : Desativado\r\n* A condição neutra é verificada quando as RPM são muito baixas, mas o veículo está se movendo rápido.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "4207": {
    title: {
      en: "TDI Check Gear Time",
      pt: "Tempo de Verificação de Marcha TDI",
      es: "Tiempo de Comprobación de Marcha TDI",
    },
    tooltip: {
      en: "Time to check 'Check Gear.'\r\n• Range : 3~999\r\n• Default : 10",
      es: "Tiempo para verificar 'Check Gear'.\r\n• Rango: 3~999\r\n• Predeterminado: 10",
      pt: "Tempo para verificar 'Check Gear'.\r\n• Intervalo: 3~999\r\n• Padrão: 10",
    },
    min: 3,
    max: 999,
    list: null,
  },
  "4208": {
    title: {
      en: "TDI Check Gear RPM",
      pt: "RPM de Verificação de Marcha TDI",
      es: "RPM de Comprobación de Marcha TDI",
    },
    tooltip: {
      en: "RPM value to determine the alert situation of 'Check Gear.'\r\n• Range : 0~9,999\r\n• Default : 1,000",
      es: "Valor de RPM para determinar la situación de alerta de 'Check Gear'.\r\n• Rango: 0~9,999\r\n• Predeterminado: 1,000",
      pt: "Valor de RPM para determinar a situação de alerta de 'Check Gear'.\r\n• Intervalo: 0~9.999\r\n• Padrão: 1.000",
    },
    min: 0,
    max: 9999,
    list: null,
  },
  "9000": {
    title: {
      en: "Polygon Buzzer Speed Limit",
      pt: "Limite de Velocidade com Buzzer para Polígono",
      es: "Límite de Velocidad del Zumbador de Polígono",
    },
    tooltip: {
      en: "Set whether to use the Speed Limit Buzzer in the Polygon Geofence Settings.\r\n• Default : Off",
      es: "Configurar si se debe usar el Buzzer de Límite de Velocidad en la Configuración de Geocerca Poligonal.\r\n• Predeterminado: Desactivado",
      pt: "Defina se deseja usar o Buzzer de Limite de Velocidade nas Configurações de Geofence Poligonal.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "9001": {
    title: {
      en: "Circular Output Active",
      pt: "Saída Ativa Circular",
      es: "Salida Circular Activa",
    },
    tooltip: {
      en: "Set whether to use the Output Active & Delay Time in the Circular Geofence Settings.\r\n• Default : Off",
      es: "Configurar si se debe usar la Activación de Salida y el Tiempo de Retardo en la Configuración de Geocerca Circular.\r\n• Predeterminado: Desactivado",
      pt: "Defina se deseja usar a Saída Ativa e o Tempo de Atraso nas Configurações de Geofence Circular.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "9002": {
    title: {
      en: "Circular Buzzer Speed Limit",
      pt: "Limite de Velocidade com Buzzer Circular",
      es: "Límite de Velocidad del Zumbador Circular",
    },
    tooltip: {
      en: "Set whether to use the Speed Limit Buzzer in the Circular Geofence Settings.\r\n• Default : Off",
      es: "Configurar si se debe usar el Buzzer de Límite de Velocidad en la Configuración de Geocerca Circular.\r\n• Predeterminado: Desactivado",
      pt: "Defina se deseja usar o Buzzer de Limite de Velocidade nas Configurações de Geofence Circular.\r\n• Padrão : Desativado",
    },
    min: null,
    max: null,
    list: [
      {
        value: "00",
        label: {
          en: "Disable",
          es: "Disable",
          pt: "Disable",
        },
      },
      {
        value: "01",
        label: {
          en: "Enable",
          es: "Enable",
          pt: "Enable",
        },
      },
    ],
  },
  "9900": {
    title: {
      en: "MCU Update",
      pt: "Atualização MCU",
      es: "Actualización MCU",
    },
    tooltip: {
      en: "Select the MCU OTA binary file path.",
      es: "Seleccionar la ruta del archivo binario OTA de la MCU.",
      pt: "Selecionar o caminho do arquivo binário OTA da MCU.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "1",
        label: {
          en: "PC",
          es: "PC",
          pt: "PC",
        },
      },
      {
        value: "2",
        label: {
          en: "GPRS/HSPA Network",
          es: "Red GPRS/HSPA",
          pt: "Rede GPRS/HSPA",
        },
      },
      {
        value: "3",
        label: {
          en: "SMS",
          es: "SMS",
          pt: "SMS",
        },
      },
    ],
  },
  "0610": {
    title: {
      en: "OBD",
    },
    tooltip: {
      en: "OBD Function On/Off Setting.",
      es: "Configuración de función OBD On/Off.",
      pt: "Configuração de função OBD On/Off.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0101": {
    title: {
      en: "Maintenance Server Check-In",
      pt: "Check-In do Servidor de Manutenção",
      es: "Check-In del Servidor de Mantenimiento",
    },
    tooltip: {
      en: "The device will report to the maintenance server to check for updates.",
      es: "El dispositivo informará al servidor de mantenimiento para verificar actualizaciones.",
      pt: "O dispositivo reportará ao servidor de manutenção para verificar atualizações.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0102": {
    title: {
      en: "IMSI",
      pt: "IMSI",
      es: "IMSI",
    },
    tooltip: {
      en: "The server sends a request for the IMSI (International Mobile Subscriber Identity) to the device.\r\n* If the device receives this command, it sends the IMSI to the server.\r\n* If the device has no SIM or is in the process of powering on, the IMSI number cannot be read.",
      es: "El servidor envía una solicitud para el IMSI (Identidad Internacional de Suscriptor Móvil) al dispositivo.\r\n* Si el dispositivo recibe este comando, envía el IMSI al servidor.\r\n* Si el dispositivo no tiene SIM o está en proceso de Activado, no se puede leer el número IMSI.",
      pt: "O servidor envia uma solicitação para o IMSI (Identidade Internacional de Assinante Móvel) ao dispositivo.\r\n* Se o dispositivo receber este comando, ele enviará o IMSI ao servidor.\r\n* Se o dispositivo não tiver um SIM ou estiver no processo de inicialização, o número IMSI não pode ser lido.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0103": {
    title: {
      en: "ICCID",
      pt: "ICCID",
      es: "ICCID",
    },
    tooltip: {
      en: "The server sends a request for the ICCID (Integrated Circuit Card Identifier) to the device. \r\n* If the device receives this command, it sends the ICCID to the server.\r\n* If the device has no SIM or is in the process of powering on, the ICCID number cannot be read.",
      es: "El servidor envía una solicitud para el ICCID (Identificador de Tarjeta de Circuito Integrado) al dispositivo.\r\n* Si el dispositivo recibe este comando, envía el ICCID al servidor.\r\n* Si el dispositivo no tiene SIM o está en proceso de Activado, no se puede leer el número ICCID.",
      pt: "O servidor envia uma solicitação para o ICCID (Identificador de Cartão de Circuito Integrado) ao dispositivo.\r\n* Se o dispositivo receber este comando, ele enviará o ICCID ao servidor.\r\n* Se o dispositivo não tiver um SIM ou estiver no processo de inicialização, o número ICCID não pode ser lido.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0104": {
    title: {
      en: "Network",
      pt: "Rede",
      es: "Red",
    },
    tooltip: {
      en: "Check which network the device is currently connected to.\r\n• Response option\r\n- 0 : GSM\r\n- 1 : GSM COMPACT\r\n- 2 : UTRAN\r\n- 3 : GSM with EDGE availability\r\n- 4 : UTRAN with HSDPA availability\r\n- 5 : UTRAN with HSUPA availability\r\n- 6 : UTRAN with HSDPA and HSUPA availability\r\n- 7 : Reserved\r\n- 8 : LTE Cat M1\r\n- 9 : LTE Cat NB1\r\n- 255 : Invalid or No Network",
      es: "Verifica a qué red está conectado actualmente el dispositivo.\r\n• Opción de respuesta:\r\n- 0: GSM\r\n- 1: GSM COMPACT\r\n- 2: UTRAN\r\n- 3: GSM con disponibilidad de EDGE\r\n- 4: UTRAN con disponibilidad de HSDPA\r\n- 5: UTRAN con disponibilidad de HSUPA\r\n- 6: UTRAN con disponibilidad de HSDPA y HSUPA\r\n- 7: Reservado\r\n- 8: LTE Cat M1\r\n- 9: LTE Cat NB1\r\n- 255: Red no válida o sin red",
      pt: "Verifique a qual rede o dispositivo está conectado atualmente.\r\n• Opções de resposta\r\n- 0 : GSM\r\n- 1 : GSM COMPACT\r\n- 2 : UTRAN\r\n- 3 : GSM com disponibilidade EDGE\r\n- 4 : UTRAN com disponibilidade HSDPA\r\n- 5 : UTRAN com disponibilidade HSUPA\r\n- 6 : UTRAN com disponibilidade HSDPA e HSUPA\r\n- 7 : Reservado\r\n- 8 : LTE Cat M1\r\n- 9 : LTE Cat NB1\r\n- 255 : Inválido ou Sem Rede",
    },
    min: null,
    max: null,
    list: null,
  },
  "0901": {
    title: {
      en: "Wireless Network Status",
      pt: "Status da Rede Sem Fio",
      es: "Estado de Red Inalámbrica",
    },
    tooltip: {
      en: "Check if the device is connected to the wireless network.\r\n• Response option\r\n- 0 : Not attached\r\n- 1 : Attached",
      es: "Verifica si el dispositivo está conectado a la red inalámbrica.\r\n• Opción de respuesta:\r\n- 0: No conectado\r\n- 1: Conectado",
      pt: "Verifique se o dispositivo está conectado à rede sem fio.\r\n• Opções de resposta\r\n- 0 : Não conectado\r\n- 1 : Conectado",
    },
    min: null,
    max: null,
    list: null,
  },
  "0902": {
    title: {
      en: "IP Address",
      pt: "Endereço IP",
      es: "Dirección IP",
    },
    tooltip: {
      en: "Check the IP address assigned by the carrier's DHCP server.",
      es: "Verificar la dirección IP asignada por el servidor DHCP del proveedor.",
      pt: "Verifique o endereço IP atribuído pelo servidor DHCP da operadora.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0903": {
    title: {
      en: "PDP Context Status",
      pt: "Status do Contexto PDP",
      es: "Estado del Contexto PDP",
    },
    tooltip: {
      en: "Check the PDP context (connection session between the device and data network in mobile communication network) status.\r\n• Response option\r\n- 0 : PDP context is NOT activated\r\n- 1 : PDP context is activated\r\n",
      es: "Verifica el estado del contexto PDP (sesión de conexión entre el dispositivo y la red de datos en la red de comunicación móvil).\r\n• Opción de respuesta:\r\n- 0: El contexto PDP NO está activado\r\n- 1: El contexto PDP está activado",
      pt: "Verifique o status do contexto PDP (sessão de conexão entre o dispositivo e a rede de dados na rede de comunicação móvel).\r\n• Opções de resposta\r\n- 0 : O contexto PDP NÃO está ativado\r\n- 1 : O contexto PDP está ativado",
    },
    min: null,
    max: null,
    list: null,
  },
  "0904": {
    title: {
      en: "PS Registration Status",
      pt: "Status de Registro PS",
      es: "Estado de Registro PS",
    },
    tooltip: {
      en: "Check the Cell ID and LAC of the base station.\r\n• Response option\r\n- 0 : Not registered. The mobile equipment (ME) is not currently searching for a new operator to register.\r\n- 1 : No SIM\r\n- 2 : Limited service\r\n- 3 : Full service\r\n- 4 : Registered, roaming",
      es: "Verifica el ID de la celda y el LAC de la estación base.\r\n• Opción de respuesta:\r\n- 0: No registrado. El equipo móvil (ME) no está buscando actualmente un nuevo operador para registrarse.\r\n- 1: Sin SIM\r\n- 2: Servicio limitado\r\n- 3: Servicio completo\r\n- 4: Registrado, en roaming",
      pt: "Verifique o ID da célula e o LAC da estação base.\r\n• Opções de resposta\r\n- 0 : Não registrado. O equipamento móvel (ME) não está procurando por um novo operador para se registrar.\r\n- 1 : Sem SIM\r\n- 2 : Serviço limitado\r\n- 3 : Serviço completo\r\n- 4 : Registrado, em roaming",
    },
    min: null,
    max: null,
    list: null,
  },
  "0905": {
    title: {
      en: "CS Available Operator List",
      pt: "Lista de Operadores Disponíveis CS",
      es: "Lista de Operadores Disponibles CS",
    },
    tooltip: {
      en: "Check the MCC(Mobile Country Code) and MNC(Mobile Network Code)",
      es: "Verifica el MCC (Código de País Móvil) y el MNC (Código de Red Móvil).",
      pt: "Verifique o MCC (Código do País Móvel) e o MNC (Código da Rede Móvel).",
    },
    min: null,
    max: null,
    list: null,
  },
  "0907": {
    title: {
      en: "CS/PS Service Availability",
      pt: "Disponibilidade de Serviço CS/PS",
      es: "Disponibilidad de Servicio CS/PS",
    },
    tooltip: {
      en: "• Response option\r\n- 0 : GSM single mode.\r\n- 1 : GSM/UMTS dual mode.\r\n- 2 : UTRAN(UMTS)",
      es: "• Opción de respuesta:\r\n- 0: Modo GSM único.\r\n- 1: Modo dual GSM/UMTS.\r\n- 2: UTRAN(UMTS)",
      pt: "• Opções de resposta\r\n- 0 : Modo único GSM\r\n- 1 : Modo dual GSM/UMTS\r\n- 2 : UTRAN (UMTS)",
    },
    min: null,
    max: null,
    list: null,
  },
  "0105": {
    title: {
      en: "Phone Number",
      pt: "Número de Telefone",
      es: "Número de Teléfono",
    },
    tooltip: {
      en: "The server sends a request for the phone number to the device. \r\n* If the device has no SIM or is in the process of powering on, the phone number cannot be read.\r\n* If the phone number field in the SIM is empty, the device reports 'NoData'.",
      es: "El servidor envía una solicitud para el número de teléfono al dispositivo.\r\n* Si el dispositivo no tiene SIM o está en proceso de Activado, no se puede leer el número de teléfono.\r\n* Si el campo de número de teléfono en la SIM está vacío, el dispositivo informa 'NoData'.",
      pt: "O servidor envia uma solicitação para o número de telefone ao dispositivo.\r\n* Se o dispositivo não tiver um SIM ou estiver no processo de inicialização, o número de telefone não pode ser lido.\r\n* Se o campo do número de telefone no SIM estiver vazio, o dispositivo reporta 'NoData'.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0121": {
    title: {
      en: "Delete APN List",
      pt: "Excluir Lista de APN",
      es: "Eliminar Lista de APN",
    },
    tooltip: {
      en: "Delete the entire APN list.",
      es: "Borrar toda la lista de APN.",
      pt: "Exclua toda a lista de APNs.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0201": {
    title: {
      en: "Device Location Query by Phone",
      pt: "Localização do Dispositivo",
      es: "Ubicación del Dispositivo",
    },
    tooltip: {
      en: "Find the device's location on Google Maps by sending a message.\r\n* Your phone number must be added to one of the numbers 1031~1034. \r\n* The Google Maps URL (server address) is required to use this feature.",
      es: "Encontrar la ubicación del dispositivo en Google Maps enviando un mensaje.\r\n* Su número de teléfono debe estar agregado a uno de los números 1031~1034.\r\n* La URL de Google Maps (dirección del servidor) es necesaria para usar esta función.",
      pt: "Encontre a localização do dispositivo no Google Maps enviando uma mensagem.\r\n* Seu número de telefone deve ser adicionado a um dos números 1031~1034.\r\n* O URL do Google Maps (endereço do servidor) é necessário para usar este recurso.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0202": {
    title: {
      en: "Set Google Map Address",
      pt: "Endereço do Google Map",
      es: "Dirección de Google Maps",
    },
    tooltip: {
      en: "Google Map address for using the 'Where Are You' function on a smartphone.",
      es: "Dirección de Google Maps para usar la función '¿Dónde estás?' en un smartphone.",
      pt: "Endereço do Google Maps para usar a função 'Onde Você Está' em um smartphone.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0203": {
    title: {
      en: "Google Map Address Status",
      pt: "Status do Endereço do Google Map",
      es: "Estado de la Dirección de Google Maps",
    },
    tooltip: {
      en: "Get the configured Google Map address.",
      es: "Obtener la dirección de Google Maps configurada.",
      pt: "Obtenha o endereço do Google Maps configurado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0107": {
    title: {
      en: "Server Lock",
      pt: "Bloqueio do Servidor",
      es: "Bloqueo del Servidor",
    },
    tooltip: {
      en: "The server sends a command for server lock to the device. \r\n* The Server Lock command is available only when it is sent via GPRS/HSPA.\r\n* Once the Server Lock is enabled and the first report is made to the server, the server becomes locked.\r\n* If the server is locked, you can change the IP and port (including the backup server) only via GPRS/HSPA. \r\nOther parameters can be configured using SyncMaster, GPRS/HSPA, or SMS.",
      es: "El servidor envía un comando de bloqueo del servidor al dispositivo.\r\n* El comando de Bloqueo del Servidor solo está disponible cuando se envía a través de GPRS/HSPA.\r\n* Una vez que se habilita el Bloqueo del Servidor y se envía el primer informe al servidor, el servidor queda bloqueado.\r\n* Si el servidor está bloqueado, solo puede cambiar la IP y el puerto (incluido el servidor de respaldo) a través de GPRS/HSPA.\r\nOtros parámetros pueden configurarse utilizando SyncMaster, GPRS/HSPA o SMS.",
      pt: "O servidor envia um comando de bloqueio de servidor para o dispositivo.\r\n* O comando de bloqueio de servidor está disponível apenas quando enviado via GPRS/HSPA.\r\n* Quando o Bloqueio de Servidor é ativado e o primeiro relatório é feito para o servidor, o servidor é bloqueado.\r\n* Se o servidor estiver bloqueado, você só pode alterar o IP e a porta (incluindo o servidor de backup) via GPRS/HSPA.\r\nOutros parâmetros podem ser configurados usando SyncMaster, GPRS/HSPA ou SMS.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0108": {
    title: {
      en: "Server Unlock",
      pt: "Desbloqueio do Servidor",
      es: "Desbloqueo del Servidor",
    },
    tooltip: {
      en: "The server sends a command for server unlock to the device. \r\n* To unlock the server, you must use the PC program (ServerLock) with a USB dongle.",
      es: "El servidor envía un comando de desbloqueo del servidor al dispositivo.\r\n* Para desbloquear el servidor, debe utilizar el programa para PC (ServerLock) con un dongle USB.",
      pt: "O servidor envia um comando de desbloqueio de servidor para o dispositivo.\r\n* Para desbloquear o servidor, você deve usar o programa de PC (ServerLock) com um dongle USB.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0109": {
    title: {
      en: "Server Lock Status",
      pt: "Status do Bloqueio do Servidor",
      es: "Estado del Bloqueo del Servidor",
    },
    tooltip: {
      en: "Get the server lock status.",
      es: "Obtener el estado del bloqueo del servidor.",
      pt: "Obtenha o status de bloqueio do servidor.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0113": {
    title: {
      en: "PIN Lock",
      pt: "Bloqueio de PIN",
      es: "Bloqueo de PIN",
    },
    tooltip: {
      en: "The server sends a command for PIN lock to the device. \r\n* The new PIN is optional.\r\n* If a new PIN is entered, the PIN password is changed, and the SIM is locked.",
      es: "El servidor envía un comando de bloqueo del PIN al dispositivo.\r\n* El nuevo PIN es opcional.\r\n* Si se ingresa un nuevo PIN, la contraseña del PIN se cambia y la SIM se bloquea.",
      pt: "O servidor envia um comando de bloqueio de PIN para o dispositivo.\r\n* O novo PIN é opcional.\r\n* Se um novo PIN for inserido, a senha do PIN é alterada e o SIM é bloqueado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0114": {
    title: {
      en: "PIN Unlock",
      pt: "Desbloqueio de PIN",
      es: "Desbloqueo de PIN",
    },
    tooltip: {
      en: "The server sends a command for PIN unlock to the device. \r\n* When the SIM is PUK-locked, you need to enter the PUK password to reset the PIN on the device.",
      es: "El servidor envía un comando de desbloqueo del PIN al dispositivo.\r\n* Cuando la SIM está bloqueada por PUK, necesita ingresar la contraseña PUK para restablecer el PIN en el dispositivo.",
      pt: "O servidor envia um comando de desbloqueio de PIN para o dispositivo.\r\n* Quando o SIM estiver bloqueado por PUK, você precisará inserir a senha PUK para redefinir o PIN no dispositivo.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0115": {
    title: {
      en: "APN Lock",
      pt: "Bloqueio de APN",
      es: "Bloqueo de APN",
    },
    tooltip: {
      en: "The server sends a command for APN lock to the device. \r\n* If the APN is locked, you cannot change the Authentication, APN, User ID, or User Password.",
      es: "El servidor envía un comando de bloqueo del APN al dispositivo.\r\n* Si el APN está bloqueado, no se puede cambiar la Autenticación, el APN, el ID de usuario ni la contraseña de usuario.",
      pt: "O servidor envia um comando de bloqueio de APN para o dispositivo.\r\n* Se o APN estiver bloqueado, você não pode alterar a autenticação, APN, ID do usuário ou senha do usuário.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0116": {
    title: {
      en: "APN Unlock",
      pt: "Desbloqueio de APN",
      es: "Desbloqueo de APN",
    },
    tooltip: {
      en: "The server sends a command for APN unlock to the device.",
      es: "El servidor envía un comando de desbloqueo del APN al dispositivo.",
      pt: "O servidor envia um comando de desbloqueio de APN para o dispositivo.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0117": {
    title: {
      en: "APN Lock Status",
      pt: "Status do Bloqueio de APN",
      es: "Estado del Bloqueo de APN",
    },
    tooltip: {
      en: "Get the APN lock status.",
      es: "Obtener el estado de bloqueo del APN.",
      pt: "Obtenha o status de bloqueio de APN.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0118": {
    title: {
      en: "Main Server",
      pt: "Servidor Principal",
      es: "Servidor Principal",
    },
    tooltip: {
      en: "The server sends a command to the device for forced server information change.",
      es: "El servidor envía un comando para cambiar forzosamente la información del servidor al dispositivo.",
      pt: "O servidor envia um comando para o dispositivo para alterar forçadamente as informações do servidor.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0119": {
    title: {
      en: "High Priority RAT Timer",
      pt: "Temporizador de Alta Prioridade RAT",
      es: "Temporizador de Alta Prioridad RAT",
    },
    tooltip: {
      en: "Set the high-priority RAT timer.\r\n• Range : 10~300\r\n• Default : 10",
      es: "Configurar el temporizador de RAT de alta prioridad.\r\n• Rango: 10~300\r\n• Predeterminado: 10",
      pt: "Defina o temporizador de RAT de alta prioridade.\r\n• Intervalo: 10~300\r\n• Padrão: 10",
    },
    min: null,
    max: null,
    list: null,
  },
  "0120": {
    title: {
      en: "High Priority RAT Timer Status",
      pt: "Status do Temporizador de Alta Prioridade RAT",
      es: "Estado del Temporizador de Alta Prioridad RAT",
    },
    tooltip: {
      en: "Get the high-priority RAT timer.",
      es: "Obtener el temporizador de RAT de alta prioridad.",
      pt: "Obtenha o temporizador de RAT de alta prioridade.",
    },
    min: 10,
    max: 300,
    list: null,
  },
  "0204": {
    title: {
      en: "Emergency Mode",
      pt: "Modo de Emergência",
      es: "Modo de Emergencia",
    },
    tooltip: {
      en: "Set the Emergency Mode.\r\n• Option\r\n- Disable\r\n- Enable",
      es: "Configurar el Modo de Emergencia.\r\n• Opción:\r\n- Deshabilitar\r\n- Habilitar",
      pt: "Defina o Modo de Emergência.\r\n• Opção\r\n- Desativar\r\n- Ativar",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0205": {
    title: {
      en: "Emergency Mode Status",
      pt: "Status do Modo de Emergência",
      es: "Estado del Modo de Emergencia",
    },
    tooltip: {
      en: "Get the Emergency Mode status.",
      es: "Obtener el estado del Modo de Emergencia.",
      pt: "Obtenha o status do Modo de Emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0504": {
    title: {
      en: "Reset Message Number",
      pt: "Redefinir Número de Mensagem",
      es: "Restablecer Número de Mensaje",
    },
    tooltip: {
      en: "Reset the message sequence number.",
      es: "Restablecer el número de secuencia de mensajes.",
      pt: "Redefinir o número de sequência da mensagem.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0714": {
    title: {
      en: "STI Lock",
      pt: "Bloqueio STI",
      es: "Bloqueo STI",
    },
    tooltip: {
      en: "Enable or disable the STI lock.\r\n* If enabled, the IP and Port cannot be changed.",
      es: "Habilitar o deshabilitar el bloqueo STI.\r\n* Si está habilitado, no se pueden cambiar la IP ni el puerto.",
      pt: "Ativar ou desativar o bloqueio STI.\r\n* Se ativado, o IP e a Porta não podem ser alterados.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0715": {
    title: {
      en: "STI Lock Status",
      pt: "Status do Bloqueio STI",
      es: "Estado del Bloqueo STI",
    },
    tooltip: {
      en: "Get the STI lock Status.",
      es: "Obtener el estado del bloqueo STI.",
      pt: "Obtenha o status do bloqueio STI.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0122": {
    title: {
      en: "LTE Band",
      pt: "Banda LTE",
      es: "Banda LTE",
    },
    tooltip: {
      en: "LTE band change. \r\n* The band is changed by 1016 when the device reboots.",
      es: "Cambio de banda LTE.\r\n* La banda se cambia por 1016 cuando el dispositivo se reinicia.",
      pt: "Mudança de banda LTE.\r\n* A banda é alterada por 1016 quando o dispositivo reinicia.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0735": {
    title: {
      en: "SIM Change Check Status",
      pt: "Status da Verificação de Alteração de SIM",
      es: "Estado de la Verificación de Cambio de SIM",
    },
    tooltip: {
      en: "Get SIM change status.",
      es: "Obtener el estado del cambio de SIM.",
      pt: "Obtenha o status de alteração de SIM.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0521": {
    title: {
      en: "Spy Phone Call",
      pt: "Chamada Espiã",
      es: "Llamada Espía",
    },
    tooltip: {
      en: "Enable or disable Spy Phone Call.",
      es: "Habilitar o deshabilitar la llamada espía.",
      pt: "Ativar ou desativar a Chamada Espião.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0522": {
    title: {
      en: "Timeout for Spy Phone Call (seconds)",
      pt: "Tempo Limite para Chamada Espiã (segundos)",
      es: "Tiempo de Espera para Llamada Espía (segundos)",
    },
    tooltip: {
      en: "Set timeout for Spy Phone Call.\r\n• Range : 0~14,400\r\n• Default :",
      es: "Configurar el tiempo de espera para la llamada espía.\r\n• Rango: 0~14,400\r\n• Predeterminado:",
      pt: "Definir tempo limite para a Chamada Espião.\r\n• Intervalo: 0~14.400\r\n• Padrão:",
    },
    min: 0,
    max: 14400,
    list: null,
  },
  "0523": {
    title: {
      en: "Spy Phone Call Info",
      pt: "Informação da Chamada Espiã",
      es: "Información de la Llamada Espía",
    },
    tooltip: {
      en: "Get the timeout for Spy Phone Call.",
      es: "Obtener el tiempo de espera para la llamada espía.",
      pt: "Obtenha o tempo limite para a Chamada Espião.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0922": {
    title: {
      en: "RRC/IRX",
      pt: "RRC/IRX",
      es: "RRC/IRX",
    },
    tooltip: {
      en: "Enable or disable the RRC(Radio Resource Control)/IRX(Inter-Radio Resource Exchange).",
      es: "Habilitar o deshabilitar el RRC (Control de Recursos de Radio)/IRX (Intercambio de Recursos de Radio).",
      pt: 'Ativar ou desativar o RRC (Controle de Recursos de Rádio)/IRX (Intercâmbio de Recursos de Rádio)."',
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0721": {
    title: {
      en: "Device Off",
      pt: "Desligar Dispositivo",
      es: "Apagar Dispositivo",
    },
    tooltip: {
      en: "Turns the device off.\r\n* It operates with the backup battery only.",
      es: "Apagar el dispositivo.\r\n* Funciona solo con la batería de respaldo.",
      pt: "Desliga o dispositivo.\r\n* Funciona apenas com a bateria de backup.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0302": {
    title: {
      en: "Device Reset",
      pt: "Redefinir Dispositivo",
      es: "Restablecer Dispositivo",
    },
    tooltip: {
      en: "Resets all device settings to the factory defaults and reboots the device.",
      es: "Restablece todos los ajustes del dispositivo a los valores predeterminados de fábrica y reinicia el dispositivo.",
      pt: "Redefine todas as configurações do dispositivo para os padrões de fábrica e reinicia o dispositivo.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0731": {
    title: {
      en: "LED Off",
      pt: "Desligar LED",
      es: "Apagar LED",
    },
    tooltip: {
      en: "Stop all device LED activity after the command is received.",
      es: "Detener toda la actividad del LED del dispositivo después de recibir el comando.",
      pt: "Interrompe toda a atividade do LED do dispositivo após o comando ser recebido.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0732": {
    title: {
      en: "LED Status",
      pt: "Status do LED",
      es: "Estado del LED",
    },
    tooltip: {
      en: "Get the value of the LED OFF setting.",
      es: "Obtener el valor de la configuración de LED Desactivado.",
      pt: "Obtenha o valor da configuração LED OFF.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0770": {
    title: {
      en: "Charge Mode",
      pt: "Status do Modo de Carregamento",
      es: "Estado del Modo de Carga",
    },
    tooltip: {
      en: "Enable or disable the charge mode.\r\n* If charge mode is enabled, the device can charge the backup battery regardless of whether the ignition is on or off.",
      es: "Habilitar o deshabilitar el modo de carga.\r\n* Si el modo de carga está habilitado, el dispositivo puede cargar la batería de respaldo independientemente de si el Activado está activado o Desactivado.",
      pt: "Ativar ou desativar o modo de carregamento.\r\n* Se o modo de carregamento estiver ativado, o dispositivo pode carregar a bateria de backup independentemente de a ignição estar ligada ou desligada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0771": {
    title: {
      en: "Charge Mode Status",
    },
    tooltip: {
      en: "Get the charge mode setting status.",
      es: "Obtener el estado del modo de carga.",
      pt: "Obtenha o status do modo de carregamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0509": {
    title: {
      en: "Volume",
      pt: "Volume",
      es: "Volumen",
    },
    tooltip: {
      en: "Adjust the call volume level.",
      es: "Ajustar el nivel de volumen de las llamadas.",
      pt: "Ajusta o nível de volume da chamada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "0",
          es: "0",
          pt: "0",
        },
      },
      {
        value: "1",
        label: {
          en: "1",
          es: "1",
          pt: "1",
        },
      },
      {
        value: "2",
        label: {
          en: "2",
          es: "2",
          pt: "2",
        },
      },
      {
        value: "3",
        label: {
          en: "3",
          es: "3",
          pt: "3",
        },
      },
      {
        value: "4",
        label: {
          en: "4",
          es: "4",
          pt: "4",
        },
      },
      {
        value: "5",
        label: {
          en: "5",
          es: "5",
          pt: "5",
        },
      },
      {
        value: "6",
        label: {
          en: "6",
          es: "6",
          pt: "6",
        },
      },
    ],
  },
  "0510": {
    title: {
      en: "Volume Status",
      pt: "Status do Volume",
      es: "Estado del Volumen",
    },
    tooltip: {
      en: "Get the Volume Status.",
      es: "Obtener el estado del volumen.",
      pt: "Obtenha o Status do Volume.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0511": {
    title: {
      en: "MIC Volume",
      pt: "Volume do Microfone (MIC)",
      es: "Volumen del Micrófono (MIC)",
    },
    tooltip: {
      en: "Adjust the MIC volume level in a call.",
      es: "Ajustar el nivel de volumen del micrófono en una llamada.",
      pt: "Ajusta o nível de volume do microfone (MIC) em uma chamada.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0512": {
    title: {
      en: "MIC Volume Status",
      pt: "Status do Volume do Microfone (MIC)",
      es: "Estado del Volumen del Micrófono (MIC)",
    },
    tooltip: {
      en: "Get the MIC Volume Status.",
      es: "Obtener el estado del volumen del micrófono.",
      pt: "Obtenha o Status do Volume do MIC.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0724": {
    title: {
      en: "Turn Off by Power Key",
      pt: "Desligar por Chave de Energia",
      es: "Apagar por Botón de Activado",
    },
    tooltip: {
      en: "Turn off the device using the power key.\r\n* It operates with the backup battery only.",
      es: "Apagar el dispositivo usando el botón de Activado.\r\n* Funciona solo con la batería de respaldo.",
      pt: "Desligue o dispositivo usando o botão de energia.\r\n* Funciona apenas com a bateria de backup.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0530": {
    title: {
      en: "Activate Battery Log (mAh)",
      pt: "Ativar Log da Bateria (mAh)",
      es: "Activar Registro de Batería (mAh)",
    },
    tooltip: {
      en: "Manually activate battery log with battery capacity data.\r\n• Range : 100~30,000\r\n• Default : 100",
      es: "Activar manualmente el registro de la batería con los datos de capacidad de la batería.\r\n• Rango: 100~30,000\r\n• Predeterminado: 100",
      pt: "Ativar manualmente o log da bateria com dados de capacidade da bateria.\r\n• Intervalo: 100~30.000\r\n• Padrão: 100",
    },
    min: 0,
    max: 30000,
    list: null,
  },
  "0533": {
    title: {
      en: "Reset Battery Log",
      pt: "Redefinir Log da Bateria",
      es: "Restablecer Registro de Batería",
    },
    tooltip: {
      en: "Reset battery log and restart with automatic battery capacity detection.",
      es: "Restablecer el registro de la batería y reiniciar con la detección automática de la capacidad de la batería.",
      pt: "Redefinir o log da bateria e reiniciar com a detecção automática da capacidade da bateria.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0584": {
    title: {
      en: "Power Button Status",
      pt: "Status do Botão de Energia",
      es: "Estado del Botón de Activado",
    },
    tooltip: {
      en: "Get Power Button Status",
      es: "Obtener el estado del botón de Activado.",
      pt: "Obtenha o Status do Botão de Energia.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0700": {
    title: {
      en: "Encoding Type",
      pt: "Tipo de Codificação",
      es: "Tipo de Codificación",
    },
    tooltip: {
      en: "Set encoding type.\r\n• Option\r\n- Disable(Default) : The Device ID is not encrypted.\r\n- Auto Encoding Key : The Device ID is encrypted using an auto-generated encoding key.\r\n- User Encoding Key : The Device ID is encrypted using a user-defined encoding key.\r\n* When the command is sent via SMS, the device ID can be encrypted.",
      es: "Configurar el tipo de codificación.\r\n• Opción:\r\n- Deshabilitar (Predeterminado): El ID del dispositivo no está encriptado.\r\n- Clave de codificación automática: El ID del dispositivo se encripta usando una clave de codificación generada automáticamente.\r\n- Clave de codificación del usuario: El ID del dispositivo se encripta usando una clave de codificación definida por el usuario.\r\n* Cuando el comando se envía por SMS, el ID del dispositivo puede encriptarse.",
      pt: "Definir tipo de codificação.\r\n• Opção\r\n- Desativado (Padrão): O ID do Dispositivo não é criptografado.\r\n- Chave de Codificação Automática: O ID do Dispositivo é criptografado usando uma chave de codificação gerada automaticamente.\r\n- Chave de Codificação do Usuário: O ID do Dispositivo é criptografado usando uma chave de codificação definida pelo usuário.\r\n* Quando o comando é enviado via SMS, o ID do dispositivo pode ser criptografado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0701": {
    title: {
      en: "User Encoding Key",
      pt: "Chave de Codificação do Usuário",
      es: "Clave de Codificación del Usuario",
    },
    tooltip: {
      en: 'Set the User Encoding Key.\r\n* Characters A-Z, a-z, 0-9, and symbols "-." are allowed.\r\n* User Encoding Key must be 16 characters long.\r\n* When the command is sent via SMS, the device ID can be encrypted.',
      es: 'Configurar la clave de codificación del usuario.\r\n* Se permiten caracteres A-Z, a-z, 0-9 y los símbolos "-."\r\n* La clave de codificación del usuario debe tener 16 caracteres.\r\n* Cuando el comando se envía por SMS, el ID del dispositivo puede encriptarse.',
      pt: 'Definir a Chave de Codificação do Usuário.\r\n* São permitidos os caracteres A-Z, a-z, 0-9 e símbolos "-."\r\n* A Chave de Codificação do Usuário deve ter 16 caracteres.\r\n* Quando o comando é enviado via SMS, o ID do dispositivo pode ser criptografado.',
    },
    min: null,
    max: null,
    list: null,
  },
  "0712": {
    title: {
      en: "Acceleration limit",
      pt: "Limite de Aceleração",
      es: "Límite de Aceleración",
    },
    tooltip: {
      en: "Set the acceleration limit.",
      es: "Configurar el límite de aceleración.",
      pt: "Definir o limite de aceleração.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0713": {
    title: {
      en: "Deceleration limit",
      pt: "Limite de Desaceleração",
      es: "Límite de Desaceleración",
    },
    tooltip: {
      en: "Set the deceleration limit.",
      es: "Configurar el límite de desaceleración.",
      pt: "Definir o limite de desaceleração.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0753": {
    title: {
      en: "Delay for Main Power Disconnection (seconds)",
      pt: "Atraso para Desconexão da Energia Principal (segundos)",
      es: "Retraso para la Desconexión de la Energía Principal (segundos)",
    },
    tooltip: {
      en: "Set the immobilizer delay time for main power disconnection as soon as the device is powered on.\r\n• Range : 30~65,535\r\n• Default : 30",
      es: "Configurar el tiempo de retraso del inmovilizador para la desconexión de la alimentación principal tan pronto como se encienda el dispositivo.\r\n• Rango: 30~65,535\r\n• Predeterminado: 30",
      pt: "Definir o tempo de atraso do imobilizador para desconexão da energia principal assim que o dispositivo for ligado.\r\n• Intervalo: 30~65.535\r\n• Padrão: 30",
    },
    min: 30,
    max: 65535,
    list: null,
  },
  "0754": {
    title: {
      en: "Delay for Main Power Disconnection Status",
      pt: "Status do Atraso para Desconexão da Energia Principal",
      es: "Estado del Retraso para la Desconexión de la Energía Principal",
    },
    tooltip: {
      en: "Get the delay for Main Power Disconnection Status.",
      es: "Obtener el tiempo de retraso para el estado de desconexión de la alimentación principal.",
      pt: "Obtenha o Status do Atraso de Desconexão da Energia Principal.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0580": {
    title: {
      en: "DPA Parameter",
      pt: "Parâmetro DPA",
      es: "Parámetro DPA",
    },
    tooltip: {
      en: "Get DPA threshold parameters to their default values.",
      es: "Obtener los parámetros de umbral de DPA a sus valores predeterminados.",
      pt: "Obtenha os parâmetros de limite de DPA para seus valores padrão.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0581": {
    title: {
      en: "DPA Default",
      pt: "DPA Padrão",
      es: "DPA Predeterminado",
    },
    tooltip: {
      en: "Set the DPA threshold parameters to default values.",
      es: "Configurar los parámetros de umbral de DPA a los valores predeterminados.",
      pt: "Definir os parâmetros de limite de DPA para os valores padrão.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0582": {
    title: {
      en: "Start DPA Calibration",
      pt: "Iniciar Calibração DPA",
      es: "Iniciar Calibración DPA",
    },
    tooltip: {
      en: "Set the start of DPA Calibration.\r\n* When the device enters DPA Calibration mode, the red and blue LEDs will blink simultaneously every 0.5 seconds\r\n* To start DPA Calibration, parameter 1910 must be set to 'Enable.",
      es: "Iniciar la calibración de DPA.\r\n* Cuando el dispositivo entra en modo de calibración de DPA, los LEDs rojo y azul parpadearán simultáneamente cada 0.5 segundos.\r\n* Para iniciar la calibración de DPA, el parámetro 1910 debe configurarse como 'Habilitar'.",
      pt: "Definir o início da Calibração DPA.\r\n* Quando o dispositivo entrar no modo de Calibração DPA, os LEDs vermelho e azul piscarão simultaneamente a cada 0,5 segundos.\r\n* Para iniciar a Calibração DPA, o parâmetro 1910 deve ser configurado como 'Ativar'.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0583": {
    title: {
      en: "Stop DPA Calibration",
      pt: "Parar Calibração DPA",
      es: "Detener Calibración DPA",
    },
    tooltip: {
      en: "Set the stop of DPA Calibration.\r\n* When the device exits DPA Calibration mode, the red and blue LEDs will blink according to the GPRS and GPS status.\r\n* If you try to stop DPA Calibration while the device is not in Calibration mode, an error will occur.",
      es: "Detener la calibración de DPA.\r\n* Cuando el dispositivo sale del modo de calibración de DPA, los LEDs rojo y azul parpadearán según el estado de GPRS y GPS.\r\n* Si intentas detener la calibración de DPA mientras el dispositivo no está en modo de calibración, ocurrirá un error.",
      pt: "Definir a parada da Calibração DPA.\r\n* Quando o dispositivo sair do modo de Calibração DPA, os LEDs vermelho e azul piscarão de acordo com o status do GPRS e do GPS.\r\n* Se você tentar parar a Calibração DPA enquanto o dispositivo não estiver no modo de Calibração, ocorrerá um erro.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0110": {
    title: {
      en: "Configuration Lock",
      pt: "Bloqueio de Configuração",
      es: "Bloqueo de Configuración",
    },
    tooltip: {
      en: "The server sends a command for configuration lock to the device. \r\n* When configuration is locked, no parameters can be changed.\r\n* If the configuration lock is already engaged, an error will be displayed. \r\n* The password range is 1 to 9999999999.",
      es: "El servidor envía un comando para bloquear la configuración del dispositivo.\r\n* Cuando la configuración está bloqueada, no se pueden cambiar parámetros.\r\n* Si el bloqueo de configuración ya está activado, se mostrará un error.\r\n* El rango de la contraseña es de 1 a 9999999999.",
      pt: "O servidor envia um comando de bloqueio de configuração para o dispositivo.\r\n* Quando a configuração está bloqueada, nenhum parâmetro pode ser alterado.\r\n* Se o bloqueio de configuração já estiver ativado, um erro será exibido.\r\n* A senha deve ter entre 1 e 9999999999.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0111": {
    title: {
      en: "Configuration Unlock",
      pt: "Desbloqueio de Configuração",
      es: "Desbloqueo de Configuración",
    },
    tooltip: {
      en: "The server sends a command for configuration unlock to the device. \r\n* If the configuration unlock is already engaged, an error will be displayed.",
      es: "El servidor envía un comando para desbloquear la configuración del dispositivo.\r\n* Si el desbloqueo de configuración ya está activado, se mostrará un error.",
      pt: "O servidor envia um comando de desbloqueio de configuração para o dispositivo.\r\n* Se o desbloqueio de configuração já estiver ativado, um erro será exibido.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0908": {
    title: {
      en: "Periodic Reboot Interval (minutes)",
      pt: "Intervalo de Reinicialização Periódica (minutos)",
      es: "Intervalo de Reinicio Periódico (minutos)",
    },
    tooltip: {
      en: "Set periodic reboot interval.\r\n• Range : 0~1,440\r\n• Default : 720",
      es: "Configurar el intervalo de reinicio periódico.\r\n• Rango: 0~1,440\r\n• Predeterminado: 720",
      pt: "Definir o intervalo de reinicialização periódica.\r\n• Intervalo: 0~1.440\r\n• Padrão: 720",
    },
    min: 0,
    max: 1440,
    list: null,
  },
  "0909": {
    title: {
      en: "Periodic Reboot Interval Status",
      pt: "Status do Intervalo de Reinicialização Periódica",
      es: "Estado del Intervalo de Reinicio Periódico",
    },
    tooltip: {
      en: "Get the periodic reboot interval.",
      es: "Obtener el intervalo de reinicio periódico.",
      pt: "Obtenha o intervalo de reinicialização periódica.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0916": {
    title: {
      en: "DPA Feature",
      pt: "Recurso DPA",
      es: "Función DPA",
    },
    tooltip: {
      en: "Set whether to show or hide the CRR feature.\r\n* To apply the changes, the device needs to be rebooted.",
      es: "Configurar si mostrar o ocultar la función CRR.\r\n* Para aplicar los cambios, es necesario reiniciar el dispositivo.",
      pt: "Definir se o recurso CRR deve ser exibido ou oculto.\r\n* Para aplicar as alterações, o dispositivo precisa ser reiniciado.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Hide",
          es: "Ocultar",
          pt: "Ocultar",
        },
      },
      {
        value: "1",
        label: {
          en: "Show",
          es: "Mostrar",
          pt: "Mostrar",
        },
      },
    ],
  },
  "0921": {
    title: {
      en: "Audio Mode",
      pt: "Modo de Áudio",
      es: "Modo de Audio",
    },
    tooltip: {
      en: "Set the audio mode for the connected device.",
      es: "Configurar el modo de audio para el dispositivo conectado.",
      pt: "Definir o modo de áudio para o dispositivo conectado.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Select",
          es: "Seleccionar",
          pt: "Selecionar",
        },
      },
      {
        value: "1",
        label: {
          en: "Handset",
          es: "Teléfono",
          pt: "Telefone",
        },
      },
      {
        value: "2",
        label: {
          en: "Headset",
          es: "Auriculares",
          pt: "Headset",
        },
      },
    ],
  },
  "0740": {
    title: {
      en: "Auto Jamming Report Period (seconds)",
      pt: "Período de Relatório Automático de Jamming (segundos)",
      es: "Período de Informe de Interferencia Automático (segundos)",
    },
    tooltip: {
      en: "URC period of the auto jamming detection report.\r\n• Range : 0~120\r\n• Default : 0(UG96 and EG915U), 10(BG95)\r\n* When set to '0', no periodic reporting.",
      es: "Período URC del informe de detección de interferencias automáticas.\r\n• Rango: 0~120\r\n• Predeterminado: 0 (UG96 y EG915U), 10 (BG95)\r\n* Cuando se establece en '0', no se realiza un informe periódico.",
      pt: "Período URC do relatório automático de detecção de interferência.\r\n• Intervalo: 0~120\r\n• Padrão: 0 (UG96 e EG915U), 10 (BG95)\r\n* Quando definido como '0', nenhum relatório periódico.",
    },
    min: 0,
    max: 120,
    list: null,
  },
  "0741": {
    title: {
      en: "Minimum Channel Number",
      pt: "Número Mínimo de Canais",
      es: "Número Mínimo de Canales",
    },
    tooltip: {
      en: "Jammed minimum channel number or ARFCN (Absolute Radio Frequency Channel Number).\r\n• Range : 3~10(UG96), 0~254(BG95 and EG915U)\r\n• Default : 10(UG96 and EG915U), 1(BG95)",
      es: "Número mínimo de canal bloqueado o ARFCN (Número de Canal de Frecuencia Absoluta de Radio).\r\n• Rango: 3~10 (UG96), 0~254 (BG95 y EG915U)\r\n• Predeterminado: 10 (UG96 y EG915U), 1 (BG95)",
      pt: "Número mínimo de canais interferidos ou ARFCN (Número Absoluto de Canal de Frequência de Rádio).\r\n• Intervalo: 3~10 (UG96), 0~254 (BG95 e EG915U)\r\n• Padrão: 10 (UG96 e EG915U), 1 (BG95)",
    },
    min: 0,
    max: 120,
    list: null,
  },
  "0742": {
    title: {
      en: "Mine ECNO Threshold",
      pt: "Limite ECNO Mínimo",
      es: "Umbral ECNO Mínimo",
    },
    tooltip: {
      en: "Minimum ECNO (Energy per Chip to Noise Ratio) threshold.\r\n• Range : 0~49\r\n• Default : 10\r\n* for WCDMA network only",
      es: "Umbral mínimo de ECNO (Relación de Energía por Chip a Ruido).\r\n• Rango: 0~49\r\n• Predeterminado: 10\r\n* Solo para la red WCDMA",
      pt: "Limite mínimo de ECNO (Razão Energia por Chip sobre Ruído).\r\n• Intervalo: 0~49\r\n• Padrão: 10\r\n* Apenas para rede WCDMA",
    },
    min: 0,
    max: 49,
    list: null,
  },
  "0743": {
    title: {
      en: "Minimum S_QUAL Threshold",
      pt: "Limite Mínimo de S_QUAL",
      es: "Umbral S_QUAL Mínimo",
    },
    tooltip: {
      en: "The minimum S_QUAL(Quality indicator used in LTE networks) threshold.\r\n• Range : 230~260\r\n• Default : 240\r\n* for WCDMA network only",
      es: "El umbral mínimo de S_QUAL (Indicador de calidad utilizado en redes LTE).\r\n• Rango: 230~260\r\n• Predeterminado: 240\r\n* Solo para la red WCDMA",
      pt: "O limite mínimo de S_QUAL (Indicador de qualidade usado em redes LTE).\r\n• Intervalo: 230~260\r\n• Padrão: 240\r\n* Apenas para rede WCDMA",
    },
    min: 230,
    max: 260,
    list: null,
  },
  "0744": {
    title: {
      en: "Maximum Signal Received Level",
      pt: "Nível Máximo de Sinal Recebido",
      es: "Nivel Máximo de Señal Recibida",
    },
    tooltip: {
      en: "The maximum Signal Received Level (an indicator of signal strength used in LTE and UMTS (3G) networks) threshold.\r\n• Range : 0~63\r\n• Default : 50\r\n* for WCDMA network only",
      es: "El umbral máximo del Nivel de Señal Recibida (un indicador de la intensidad de la señal utilizado en redes LTE y UMTS (3G)).\r\n• Rango: 0~63\r\n• Predeterminado: 50\r\n* Solo para la red WCDMA",
      pt: "O limite máximo de Nível de Sinal Recebido (um indicador de força de sinal usado em redes LTE e UMTS (3G)).\r\n• Intervalo: 0~63\r\n• Padrão: 50\r\n* Apenas para rede WCDMA",
    },
    min: 0,
    max: 63,
    list: null,
  },
  "0745": {
    title: {
      en: "Maximum Signal Received Level",
      pt: "Nível Máximo de Sinal Recebido",
      es: "Nivel Máximo de Señal Recibida",
    },
    tooltip: {
      en: "The maximum Signal Received Level (an indicator of signal strength used in LTE and UMTS (3G) networks) threshold.\r\n• Range : 0~73\r\n• Default : 30\r\n* For GSM network only",
      es: "El umbral máximo del Nivel de Señal Recibida (un indicador de la intensidad de la señal utilizado en redes LTE y UMTS (3G)).\r\n• Rango: 0~73\r\n• Predeterminado: 30\r\n* Solo para la red GSM",
      pt: "O limite máximo de Nível de Sinal Recebido (um indicador de força de sinal usado em redes LTE e UMTS (3G)).\r\n• Intervalo: 0~73\r\n• Padrão: 30\r\n* Apenas para rede GSM",
    },
    min: 0,
    max: 73,
    list: null,
  },
  "0746": {
    title: {
      en: "Jamming Release Delay (seconds)",
      pt: "Atraso de Liberação de Jamming (segundos)",
      es: "Retraso de Liberación de Interferencia (segundos)",
    },
    tooltip: {
      en: "Timer for detecting jamming release.\r\n• Range : 5~600\r\n• Default : 30",
      es: "Temporizador para detectar la liberación de interferencias.\r\n• Rango: 5~600\r\n• Predeterminado: 30",
      pt: "Temporizador para detectar a liberação de interferência.\r\n• Intervalo: 5~600\r\n• Padrão: 30",
    },
    min: 5,
    max: 600,
    list: null,
  },
  "0769": {
    title: {
      en: "No Jamming Delay (seconds)",
      pt: "Atraso de Sem Jamming (segundos)",
      es: "Retraso de No Interferencia (segundos)",
    },
    tooltip: {
      en: "Timer for 'No Jamming' while checking jamming.\r\n• Range : 0~600\r\n• Default : 10",
      es: "Temporizador para 'Sin Interferencias' al verificar interferencias.\r\n• Rango: 0~600\r\n• Predeterminado: 10",
      pt: "Temporizador para 'Sem Interferência' ao verificar interferência.\r\n• Intervalo: 0~600\r\n• Padrão: 10",
    },
    min: 0,
    max: 600,
    list: null,
  },
  "0906": {
    title: {
      en: "Signal Strength",
      pt: "Força do Sinal",
      es: "Fuerza de la Señal",
    },
    tooltip: {
      en: "Get the Signal Strength.",
      es: "Obtener la intensidad de la señal.",
      pt: "Obter a Força do Sinal.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0777": {
    title: {
      en: "Received Signal Strength Indication Threshold",
      pt: "Limite de Indicação de Força do Sinal Recebido",
      es: "Umbral de Indicador de Fuerza de Señal Recibida",
    },
    tooltip: {
      en: "The received signal strength indication threshold.\r\n• Range : -90~-25\r\n• Default : -39",
      es: "Umbral de indicación de la intensidad de la señal recibida.\r\n• Rango: -90~-25\r\n• Predeterminado: -39",
      pt: "O limite de indicação de força do sinal recebido.\r\n• Intervalo: -90~-25\r\n• Padrão: -39",
    },
    min: null,
    max: null,
    list: null,
  },
  "0778": {
    title: {
      en: "Jamming Detection Timeout (seconds)",
      pt: "Tempo Limite de Detecção de Jamming (segundos)",
      es: "Tiempo de Espera de Detección de Interferencia (segundos)",
    },
    tooltip: {
      en: "Timeout for jamming detection.\r\n• Range : 30~-120\r\n• Default : 60",
      es: "Tiempo de espera para la detección de interferencias.\r\n• Rango: 30~-120\r\n• Predeterminado: 60",
      pt: "Tempo limite para detecção de interferência.\r\n• Intervalo: 30~120\r\n• Padrão: 60",
    },
    min: null,
    max: null,
    list: null,
  },
  "0779": {
    title: {
      en: "Jamming Condition",
      pt: "Condição de Jamming",
      es: "Condición de Interferencia",
    },
    tooltip: {
      en: "Jamming detection starts after network connection.",
      es: "La detección de interferencias comienza después de la conexión de la red.",
      pt: "A detecção de interferência começa após a conexão com a rede.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0793": {
    title: {
      en: "Minimum RxLev Threshold",
      pt: "Limite Mínimo de RxLev",
      es: "Umbral Mínimo",
    },
    tooltip: {
      en: "The minimum received signal level threshold.\r\n• Range : 0~31\r\n• Default : 25\r\n* For GSM network only.",
      es: "El umbral mínimo del nivel de señal recibida.\r\n• Rango: 0~31\r\n• Predeterminado: 25\r\n* Solo para la red GSM",
      pt: "O limite mínimo de nível de sinal recebido.\r\n• Intervalo: 0~31\r\n• Padrão: 25\r\n* Apenas para rede GSM.",
    },
    min: 0,
    max: 31,
    list: null,
  },
  "0794": {
    title: {
      en: "Reference Signal Received Power",
      pt: "Potência do Sinal de Referência Recebido",
      es: "Potencia de Señal Recibida de Referencia",
    },
    tooltip: {
      en: "The reference signal received power threshold.\r\n• Range : -140~-44\r\n• Default : -105\r\n* For LTE network only.",
      es: "El umbral de potencia de señal recibida de referencia.\r\n• Rango: -140~-44\r\n• Predeterminado: -105\r\n* Solo para la red LTE",
      pt: "O limite de potência de sinal de referência recebido.\r\n• Intervalo: -140~-44\r\n• Padrão: -105\r\n* Apenas para rede LTE.",
    },
    min: -140,
    max: -44,
    list: null,
  },
  "0795": {
    title: {
      en: "Reference Signal Received Quality",
      pt: "Qualidade do Sinal de Referência Recebido",
      es: "Calidad de Señal Recibida de Referencia",
    },
    tooltip: {
      en: "The reference signal received quality threshold.\r\n• Range : -19~-3\r\n• Default : -15\r\n* For LTE network only.",
      es: "El umbral de calidad de la señal recibida de referencia.\r\n• Rango: -19~-3\r\n• Predeterminado: -15\r\n* Solo para la red LTE",
      pt: "O limite de qualidade de sinal de referência recebido.\r\n• Intervalo: -19~-3\r\n• Padrão: -15\r\n* Apenas para rede LTE.",
    },
    min: -19,
    max: -3,
    list: null,
  },
  "0796": {
    title: {
      en: "SINR",
      pt: "SINR",
      es: "SINR",
    },
    tooltip: {
      en: "The reference signal received quality threshold.\r\n• Range : 0~63\r\n• Default : 3\r\n* For LTE network only.",
      es: "El umbral de calidad de la señal recibida de referencia.\r\n• Rango: 0~63\r\n• Predeterminado: 3\r\n* Solo para la red LTE",
      pt: "O limite de qualidade de sinal de referência recebido.\r\n• Intervalo: 0~63\r\n• Padrão: 3\r\n* Apenas para rede LTE.",
    },
    min: 0,
    max: 63,
    list: null,
  },
  "0798": {
    title: {
      en: "Received Signal Strength Indication_GSM",
      pt: "Indicação de Força do Sinal Recebido_GSM",
      es: "Indicación de Intensidad de Señal Recibida_GSM",
    },
    tooltip: {
      en: "The received signal strength indication threshold.\r\n• Range : -110~-50\r\n• Default : -80\r\n* For GSM network only.",
      es: "El umbral de indicación de la intensidad de la señal recibida.\r\n• Rango: -110~-50\r\n• Predeterminado: -80\r\n* Solo para la red GSM",
      pt: "O limite de indicação de força do sinal recebido.\r\n• Intervalo: -110~-50\r\n• Padrão: -80\r\n* Apenas para rede GSM.",
    },
    min: -110,
    max: -50,
    list: null,
  },
  "0301": {
    title: {
      en: "Status Report",
      pt: "Relatório de Status",
      es: "Informe de Estado",
    },
    tooltip: {
      en: "Send Status Report from the device to the server.\r\n* To request the status via an external RS232 connection, send the “STTREQ” command.",
      es: "Enviar informe de estado desde el dispositivo al servidor.\r\n* Para solicitar el estado a través de una conexión externa RS232, envíe el comando “STTREQ”.",
      pt: "Enviar Relatório de Status do dispositivo para o servidor.\r\n* Para solicitar o status via conexão externa RS232, envie o comando “STTREQ”.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0305": {
    title: {
      en: "Preset",
      pt: "Pré-ajuste",
      es: "Preajuste",
    },
    tooltip: {
      en: "Send the saved parameter settings.\r\n* When transmitted via SMS, it is divided into 800-byte segments.",
      es: "Enviar los ajustes de parámetros guardados.\r\n* Cuando se transmite por SMS, se divide en segmentos de 800 bytes.",
      pt: "Enviar as configurações de parâmetros salvas.\r\n* Quando transmitido via SMS, é dividido em segmentos de 800 bytes.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0306": {
    title: {
      en: "Preset Parameters",
      pt: "Parâmetros de Pré-ajuste",
      es: "Parámetros de Preajuste",
    },
    tooltip: {
      en: "Send the saved settings of the specified parameter.\r\n• Option\r\n- 1 : 1W Add Driver ID\r\n- 2 : 1W Remove Driver ID \r\n- 3 : 1W Get Driver ID \r\n- 4 : Circular Geofence\r\n- 5 : Command String \r\n- 6 : Polygon Geofence",
      es: "Enviar los ajustes guardados del parámetro especificado.\r\n• Opción\r\n- 1: 1W Agregar ID de Conductor\r\n- 2: 1W Eliminar ID de Conductor\r\n- 3: 1W Obtener ID de Conductor\r\n- 4: Geocerca Circular\r\n- 5: Cadena de Comando\r\n- 6: Geocerca Poligonal",
      pt: "Enviar as configurações salvas do parâmetro especificado.\r\n• Opção\r\n- 1 : 1W Adicionar Driver ID\r\n- 2 : 1W Remover Driver ID\r\n- 3 : 1W Obter Driver ID\r\n- 4 : Geofence Circular\r\n- 5 : String de Comando\r\n- 6 : Geofence Poligonal",
    },
    min: null,
    max: null,
    list: null,
  },
  "0426": {
    title: {
      en: "Detection Control Speed (km/h)",
      pt: "Controle de Detecção de Velocidade (km/h)",
      es: "Velocidad de Control de Detección (km/h)",
    },
    tooltip: {
      en: "The alert is not sent if the vehicle is going faster than the set speed limit.",
      es: "La alerta no se envía si el vehículo va más rápido que el límite de velocidad establecido.",
      pt: "O alerta não é enviado se o veículo estiver indo mais rápido que o limite de velocidade definido.",
    },
    min: 0,
    max: 200,
    list: null,
  },
  "0502": {
    title: {
      en: "Reset Reports and Outputs",
      pt: "Redefinir Relatórios e Saídas",
      es: "Restablecer Informes y Salidas",
    },
    tooltip: {
      en: "Delete all saved reports and disable the outputs. \r\n* This command is necessary to initialize the device before delivering it to a new customer.",
      es: "Eliminar todos los informes guardados y desactivar las salidas.\r\n* Este comando es necesario para inicializar el dispositivo antes de entregarlo a un nuevo cliente.",
      pt: "Excluir todos os relatórios salvos e desativar as saídas.\r\n* Este comando é necessário para inicializar o dispositivo antes de entregá-lo a um novo cliente.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0503": {
    title: {
      en: "GPS Odometer",
      pt: "Odômetro GPS",
      es: "Odómetro GPS",
    },
    tooltip: {
      en: "Set the GPS Odometer.\r\n• Range : 0~4,000,000,000\r\n• Default : 100",
      es: "Configurar el odómetro GPS.\r\n• Rango: 0~4,000,000,000\r\n• Predeterminado: 100",
      pt: "Definir o Odômetro GPS.\r\n• Intervalo: 0~4.000.000.000\r\n• Padrão: 100",
    },
    min: 0,
    max: 4000000000,
    list: null,
  },
  "0505": {
    title: {
      en: "Hour-Meter",
      pt: "Horímetro",
      es: "Horómetro",
    },
    tooltip: {
      en: "Set the travel time period.\r\n• Range : 0~9,999,999 \r\n• Default : 99,999",
      es: "Configurar el periodo de tiempo de viaje.\r\n• Rango: 0~9,999,999\r\n• Predeterminado: 99,999",
      pt: "Definir o período de tempo de viagem.\r\n• Intervalo: 0~9.999.999\r\n• Padrão: 99.999",
    },
    min: 0,
    max: 9999999,
    list: null,
  },
  "0791": {
    title: {
      en: "EEPROM Data",
      pt: "Dados EEPROM",
      es: "Datos EEPROM",
    },
    tooltip: {
      en: "Get EEPROM(Electrically Erasable Programmable Read-Only Memory) data.\r\n* EEPROM is memory that is not erased when the power is turned off, and data can be erased and rewritten using electrical signals.",
      es: "Obtener datos de la EEPROM (Memoria Electrónicamente Borrable y Programable de Solo Lectura).\r\n* La EEPROM es una memoria que no se borra cuando se apaga la energía, y los datos se pueden borrar y reescribir mediante señales eléctricas.",
      pt: "Obter dados da EEPROM (Memória Programável de Somente Leitura Eletricamente Apagável).\r\n* EEPROM é uma memória que não é apagada quando a energia é desligada, e os dados podem ser Desactivados e reescritos usando sinais elétricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0792": {
    title: {
      en: "Reset EEPROM Data",
      pt: "Redefinir Dados EEPROM",
      es: "Restablecer Datos EEPROM",
    },
    tooltip: {
      en: "Reset EEPROM(Electrically Erasable Programmable Read-Only Memory) data.\r\n* EEPROM is memory that is not erased when the power is turned off, and data can be erased and rewritten using electrical signals.",
      es: "Restablecer los datos de la EEPROM (Memoria Electrónicamente Borrable y Programable de Solo Lectura).\r\n* La EEPROM es una memoria que no se borra cuando se apaga la energía, y los datos se pueden borrar y reescribir mediante señales eléctricas.",
      pt: "Redefinir os dados da EEPROM (Memória Programável de Somente Leitura Eletricamente Apagável).\r\n* EEPROM é uma memória que não é apagada quando a energia é desligada, e os dados podem ser Desactivados e reescritos usando sinais elétricos.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0507": {
    title: {
      en: "All Status Assign Map",
      pt: "Atribuir Mapa de Todos os Status",
      es: "Asignar Mapa de Todos los Estados",
    },
    tooltip: {
      en: "Request the current configuration for Short, Medium, and Long Status Assign Header. \r\n* This device sends only the enabled Assign Header.",
      es: "Solicitar la configuración actual para el encabezado de asignación de estado corto, medio y largo.\r\n* Este dispositivo solo envía el Encabezado de Asignación habilitado.",
      pt: "Solicitar a configuração atual para o Cabeçalho de Atribuição de Status Curto, Médio e Longo.\r\n* Este dispositivo envia apenas o Cabeçalho de Atribuição habilitado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0508": {
    title: {
      en: "All Alert Assign Map",
      pt: "Atribuir Mapa de Todos os Alertas",
      es: "Asignar Mapa de Todas las Alertas",
    },
    tooltip: {
      en: "Request the current configuration for Short, Medium, and Long Alert Assign Header. \r\n* This device sends only the enabled Assign Header.",
      es: "Solicitar la configuración actual para el encabezado de asignación de alerta corto, medio y largo.\r\n* Este dispositivo solo envía el Encabezado de Asignación habilitado.",
      pt: "Solicitar a configuração atual para o Cabeçalho de Atribuição de Alerta Curto, Médio e Longo.\r\n* Este dispositivo envia apenas o Cabeçalho de Atribuição habilitado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0910": {
    title: {
      en: "Enable Debug Information",
      pt: "Informações de Depuração",
      es: "Información de Depuración",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "0911": {
    title: {
      en: "Dsiable Debug Information",
      pt: "Informações de Depuração",
      es: "Información de Depuración",
    },
    tooltip: null,
    min: null,
    max: null,
    list: null,
  },
  "0912": {
    title: {
      en: "Debug Counter Report",
      pt: "Relatório de Contador de Depuração",
      es: "Informe del Contador de Depuración",
    },
    tooltip: {
      en: "\r\n* Debug information that are added in Alert, Status Reports with count header.\r\n* This report is also sent to the maintenance server.\r\n* After the device receives any report from the maintenance server, it automatically transmits the Debug Information Report.",
      es: "Información de depuración que se agrega a los Informes de Alerta y Estado con encabezado de recuento.\r\n* Este informe también se envía al servidor de mantenimiento.\r\n* Después de que el dispositivo recibe cualquier informe del servidor de mantenimiento, automáticamente transmite el Informe de Información de Depuración.",
      pt: "\r\n* Informações de depuração que são adicionadas nos Relatórios de Alerta e Status com cabeçalho de contagem.\r\n* Este relatório também é enviado para o servidor de manutenção.\r\n* Após o dispositivo receber qualquer relatório do servidor de manutenção, ele transmite automaticamente o Relatório de Informações de Depuração.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0913": {
    title: {
      en: "Reset Debug Counter",
      pt: "Redefinir Contador de Depuração",
      es: "Restablecer Contador de Depuración",
    },
    tooltip: {
      en: "Delete all the debug counters.",
      es: "Eliminar todos los contadores de depuración.",
      pt: "Excluir todos os contadores de depuração.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0514": {
    title: {
      en: "All Driver Info",
      pt: "Informações de Todos os Motoristas",
      es: "Toda la Información del Conductor",
    },
    tooltip: {
      en: "Get all driver IDs.",
      es: "Obtener todos los IDs de conductor.",
      pt: "Obter todos os IDs de motoristas.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0534": {
    title: {
      en: "Reset Driver ID",
      pt: "Redefinir ID do Motorista",
      es: "Restablecer ID del Conductor",
    },
    tooltip: {
      en: "Delete all driver ID data.",
      es: "Eliminar todos los datos de ID de conductor.",
      pt: "Excluir todos os dados de ID de motorista.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0585": {
    title: {
      en: "Reset Config Mode",
      pt: "Redefinir Modo de Configuração",
      es: "Restablecer Modo de Configuración",
    },
    tooltip: {
      en: "Reset to configuration mode.",
      es: "Restablecer al modo de configuración.",
      pt: "Redefinir para o modo de configuração.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0733": {
    title: {
      en: "Delivery Mode",
      pt: "Modo de Entrega",
      es: "Modo de Entrega",
    },
    tooltip: {
      en: "Set delivery mode. \r\n* If the main power is disconnected, it switches to delivery mode immediately. otherwise, an error is returned.",
      es: "Configurar el modo de entrega.\r\n* Si la energía principal se desconecta, cambia inmediatamente al modo de entrega, de lo contrario, se devuelve un error.",
      pt: "Definir o modo de entrega.\r\n* Se a energia principal for desconectada, o dispositivo muda imediatamente para o modo de entrega, caso contrário, um erro será retornado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0516": {
    title: {
      en: "Reset Driving & Parking Time",
      pt: "Redefinir Tempo de Condução e Estacionamento",
      es: "Restablecer Tiempo de Conducción y Estacionamiento",
    },
    tooltip: {
      en: "Delete parking and driving times.",
      es: "Eliminar los tiempos de estacionamiento y conducción.",
      pt: "Excluir tempos de estacionamento e condução.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0529": {
    title: {
      en: "Reset Parking Odometer",
      pt: "Redefinir Odômetro de Estacionamento",
      es: "Restablecer Odómetro de Estacionamiento",
    },
    tooltip: {
      en: "Reset park odometer.",
      es: "Restablecer el odómetro de estacionamiento.",
      pt: "Redefinir o odômetro de estacionamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0411": {
    title: {
      en: "Enable Lease",
      pt: "Ativar Lease",
      es: "Habilitar Arrendamiento",
    },
    tooltip: {
      en: "• Option\r\n- Don’t activate outputs.\r\n- Activate Buzzer Pulse.\r\n- Activate Buzzer Pulse and Horn Pulse.\r\n- Activate Buzzer Pulse, Horn Pulse and Immobilizer.",
      es: "• Opción\r\n- No activar salidas.\r\n- Activar el pulso del zumbador.\r\n- Activar el pulso del zumbador y el pulso de la bocina.\r\n- Activar el pulso del zumbador, el pulso de la bocina y el inmovilizador.",
      pt: "• Opção\r\n- Não ativar saídas.\r\n- Ativar Pulso do Buzer.\r\n- Ativar Pulso do Buzer e Pulso da Buzina.\r\n- Ativar Pulso do Buzer, Pulso da Buzina e Imobilizador.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0412": {
    title: {
      en: "Enable Lease Status",
      pt: "Status de Ativação do Lease",
      es: "Estado de Habilitación de Arrendamiento",
    },
    tooltip: {
      en: "Get Lease Status",
      es: "Obtener el estado de arrendamiento.",
      pt: "Obter o Status de Leasing.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0420": {
    title: {
      en: "Driver ID Output",
      pt: "Saída de ID do Motorista",
      es: "Salida de ID del Conductor",
    },
    tooltip: {
      en: "Driver ID Output Control Type.\r\n• Option\r\n- Don’t activate outputs.\r\n- Activate both Output1 and Output2.\r\n- Activate Output2 only.\r\n- Activate Output1 only.\r\n- When the key tag is registered, Output 2 is active.\r\n(Then, when the ignition is off, Output 2 deactivates.)\r\nWhen Output 1 is active, the key tag is not registered. (and the ignition is on)\r\n(Then, when the ignition is off, Output 1 remains active.)",
      es: "Tipo de control de salida del ID de conductor.\r\n• Opción\r\n- No activar salidas.\r\n- Activar tanto la Salida1 como la Salida2.\r\n- Activar solo la Salida2.\r\n- Activar solo la Salida1.\r\n- Cuando se registra la etiqueta de llave, la Salida 2 está activa.\r\n(Luego, cuando el Activado está Desactivado, la Salida 2 se desactiva).\r\nCuando la Salida 1 está activa, la etiqueta de llave no está registrada. (y el Activado está Activado)\r\n(Luego, cuando el Activado está Desactivado, la Salida 1 permanece activa.)",
      pt: "Tipo de Controle de Saída do Driver ID.\r\n• Opção\r\n- Não ativar saídas.\r\n- Ativar tanto a Saída1 quanto a Saída2.\r\n- Ativar apenas a Saída2.\r\n- Ativar apenas a Saída1.\r\n- Quando a chave de identificação estiver registrada, a Saída 2 é ativada.\r\n(Quando a ignição está desligada, a Saída 2 desativa.)\r\nQuando a Saída 1 está ativa, a chave de identificação não está registrada. (e a ignição está ligada)\r\n(Quando a ignição está desligada, a Saída 1 permanece ativa.)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0427": {
    title: {
      en: "Release Driver ID Output",
      pt: "Liberar Saída de ID do Motorista",
      es: "Liberar Salida de ID del Conductor",
    },
    tooltip: {
      en: "If the device activates the output because the registered I-button isn’t inserted, this command temporarily deactivates the output until the next parking.",
      es: "Si el dispositivo activa la salida porque el iButton registrado no está insertado, este comando desactiva temporalmente la salida hasta el próximo estacionamiento.",
      pt: "Se o dispositivo ativar a saída porque o I-button registrado não foi inserido, este comando desativa temporariamente a saída até o próximo estacionamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0429": {
    title: {
      en: "Start Count Odometer",
      pt: "Iniciar Contagem de Odômetro",
      es: "Iniciar Contador del Odómetro",
    },
    tooltip: {
      en: "If the device activates the output because the registered I-button isn’t inserted, this command temporarily deactivates the output until the next parking.",
      es: "Si el dispositivo activa la salida porque el iButton registrado no está insertado, este comando desactiva temporalmente la salida hasta el próximo estacionamiento.",
      pt: "Se o dispositivo ativar a saída porque o I-button registrado não foi inserido, este comando desativa temporariamente a saída até o próximo estacionamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0430": {
    title: {
      en: "Stop Count Odometer",
      pt: "Parar Contagem de Odômetro",
      es: "Detener Contador del Odómetro",
    },
    tooltip: {
      en: "If the device activates the output because the registered I-button isn’t inserted, this command temporarily deactivates the output until the next parking.",
      es: "Si el dispositivo activa la salida porque el iButton registrado no está insertado, este comando desactiva temporalmente la salida hasta el próximo estacionamiento.",
      pt: "Se o dispositivo ativar a saída porque o I-button registrado não foi inserido, este comando desativa temporariamente a saída até o próximo estacionamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0738": {
    title: {
      en: "Buzzer Pulse Off",
      pt: "Pulso do Buzzer Desligado",
      es: "Apagar Pulso del Zumbador",
    },
    tooltip: {
      en: "Turn off the buzzer pulse.\r\n* The pulse will not be activated if the buzzer sounds due to overspeed with this setting.",
      es: "Apagar el pulso del zumbador.\r\n* El pulso no se activará si el zumbador suena debido a un exceso de velocidad con esta configuración.",
      pt: "Desligar o pulso do buzzer.\r\n* O pulso não será ativado se o buzzer soar devido ao excesso de velocidade com esta configuração.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0739": {
    title: {
      en: "Buzzer Pulse Off Status",
      pt: "Status do Pulso do Buzzer Desligado",
      es: "Estado del Desactivado del Pulso del Zumbador",
    },
    tooltip: {
      en: "Get buzzer pulse off status.",
      es: "Obtener el estado del pulso del zumbador desactivado.",
      pt: "Obter o status do pulso do buzzer desligado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0729": {
    title: {
      en: "Working Time",
      pt: "Tempo de Trabalho",
      es: "Tiempo de Trabajo",
    },
    tooltip: {
      en: "Set working time. \r\n* During the working time, Output1 is enabled and Output2 is disabled. \r\n* During non-working time, Output1 is disabled and Output2 is enabled. \r\n* Working time should be set according to the local time.\r\n* If set to 00:00:00, the working time is disabled, and both Output1 and Output2 are disabled.",
      es: "Configurar el tiempo de trabajo.\r\n* Durante el tiempo de trabajo, Output1 está habilitada y Output2 está deshabilitada.\r\n* Durante el tiempo fuera de trabajo, Output1 está deshabilitada y Output2 está habilitada.\r\n* El tiempo de trabajo debe configurarse según la hora local.\r\n* Si se establece en 00:00:00, el tiempo de trabajo está deshabilitado y tanto Output1 como Output2 están deshabilitadas.",
      pt: "Definir o horário de trabalho.\r\n* Durante o horário de trabalho, a Saída1 está habilitada e a Saída2 está desabilitada.\r\n* Durante o horário fora de trabalho, a Saída1 está desabilitada e a Saída2 está habilitada.\r\n* O horário de trabalho deve ser definido de acordo com o horário local.\r\n* Se definido para 00:00:00, o horário de trabalho é desativado e tanto a Saída1 quanto a Saída2 são desativadas.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0730": {
    title: {
      en: "Working Time Status",
      pt: "Status do Tempo de Trabalho",
      es: "Estado del Tiempo de Trabajo",
    },
    tooltip: {
      en: "Get the working time.",
      es: "Obtener el tiempo de trabajo.",
      pt: "Obter o horário de trabalho.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0755": {
    title: {
      en: "Rocker Switch",
      pt: "Interruptor Basculante",
      es: "Interruptor Basculante",
    },
    tooltip: {
      en: "Enable or disable Rocker switch.\r\n* To use this, the device must support Input 3.\r\n* When enabled, the type of Input 3 is changed to 14.\r\n* When disabled, the type of Input 3 is changed to Both Edge.",
      es: "Habilitar o deshabilitar el interruptor basculante (Rocker switch).\r\n* Para usar esto, el dispositivo debe admitir la Entrada 3.\r\n* Cuando está habilitado, el tipo de Entrada 3 se cambia a 14.\r\n* Cuando está deshabilitado, el tipo de Entrada 3 se cambia a Both Edge (ambos bordes).",
      pt: "Ativar ou desativar o interruptor Rocker.\r\n* Para usar isso, o dispositivo deve suportar a Entrada 3.\r\n* Quando ativado, o tipo de Entrada 3 é alterado para 14.\r\n* Quando desativado, o tipo de Entrada 3 é alterado para Borda Dupla.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0425": {
    title: {
      en: "Immobilizer Lock Status",
      pt: "Status do Travamento do Imobilizador",
      es: "Estado del Bloqueo del Inmovilizador",
    },
    tooltip: {
      en: "Get the immobilizer lock.",
      es: "Obtener el estado del bloqueo del inmovilizador.",
      pt: "Obter o bloqueio do imobilizador.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0428": {
    title: {
      en: "Secure Immobilizer",
      pt: "Imobilizador Seguro",
      es: "Inmovilizador Seguro",
    },
    tooltip: {
      en: "The immobilizer is activated when WWAN is not available.\r\n* A local password on the panic button is required to deactivate the immobilizer. \r\n* This function can only be activated when the panic button, immobilizer, and buzzer are set to be used.\r\n* The password is a randomly generated 3-digit number, excluding zero. \r\n* The user must press the panic button for each digit, with a 5-second interval.\r\nFor example, if the password is 2-4-6, press the button 2 times in the first 5 seconds, 4 times in the next 5 seconds, and 6 times in the last 5 seconds. If the correct password is entered, the buzzer sounds for 1 second, and the immobilizer is deactivated.\r\n* If WWAN is available, a new password is generated and sent to the server.\r\n* If the password is incorrect, the buzzer sounds for 10 seconds.",
      es: "El inmovilizador se activa cuando WWAN no está disponible.\r\n* Se requiere una contraseña local en el botón de pánico para desactivar el inmovilizador.\r\n* Esta función solo puede activarse cuando se utilizan el botón de pánico, el inmovilizador y el zumbador.\r\n* La contraseña es un número de 3 dígitos generado aleatoriamente, excluyendo el cero.\r\n* El usuario debe presionar el botón de pánico para cada dígito, con un intervalo de 5 segundos.\r\nPor ejemplo, si la contraseña es 2-4-6, presiona el botón 2 veces en los primeros 5 segundos, 4 veces en los siguientes 5 segundos y 6 veces en los últimos 5 segundos. Si se ingresa la contraseña correcta, el zumbador suena durante 1 segundo y el inmovilizador se desactiva.\r\n* Si WWAN está disponible, se genera una nueva contraseña y se envía al servidor.\r\n* Si la contraseña es incorrecta, el zumbador suena durante 10 segundos.",
      pt: "O imobilizador é ativado quando o WWAN não está disponível.\r\n* Uma senha local no botão de pânico é necessária para desativar o imobilizador.\r\n* Esta função só pode ser ativada quando o botão de pânico, imobilizador e buzzer estão configurados para uso.\r\n* A senha é um número de 3 dígitos gerado aleatoriamente, excluindo o zero.\r\n* O usuário deve pressionar o botão de pânico para cada dígito, com um intervalo de 5 segundos.\r\nPor exemplo, se a senha for 2-4-6, pressione o botão 2 vezes nos primeiros 5 segundos, 4 vezes nos próximos 5 segundos e 6 vezes nos últimos 5 segundos. Se a senha correta for inserida, o buzzer soa por 1 segundo e o imobilizador é desativado.\r\n* Se o WWAN estiver disponível, uma nova senha é gerada e enviada ao servidor.\r\n* Se a senha estiver incorreta, o buzzer soa por 10 segundos.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0749": {
    title: {
      en: "Immobilizer Always Pulsed",
      pt: "Imobilizador Sempre Pulsado",
      es: "Inmovilizador Siempre Pulsado",
    },
    tooltip: {
      en: "The immobilizer pulses regardless of the ignition status.\r\n* It cannot be activated at the same time as 425.",
      es: "El inmovilizador pulsa independientemente del estado del Activado.\r\n* No se puede activar al mismo tiempo que la función 425.",
      pt: "O imobilizador pulsa independentemente do status da ignição.\r\n* Não pode ser ativado ao mesmo tempo que o 425.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0750": {
    title: {
      en: "Immobilizer Speed Limit",
      pt: "Limite de Velocidade do Imobilizador",
      es: "Límite de Velocidad del Inmovilizador",
    },
    tooltip: {
      en: "When the immobilizer activation event occurs while driving, the immobilizer operates when the speed falls below the set threshold.\r\n• Range(On) : 0~300\r\n• Default : Off",
      es: "Cuando ocurre un evento de activación del inmovilizador mientras se conduce, el inmovilizador opera cuando la velocidad cae por debajo del umbral establecido.\r\n• Rango(Activado): 0~300\r\n• Predeterminado: Desactivado",
      pt: "Quando o evento de ativação do imobilizador ocorre durante a condução, o imobilizador opera quando a velocidade cai abaixo do limite definido.\r\n• Intervalo(Ligado): 0~300\r\n• Padrão : Desativado",
    },
    min: 0,
    max: 300,
    list: null,
  },
  "0422": {
    title: {
      en: "Immobilizer Cycle Time (seconds)",
      pt: "Tempo do Ciclo do Imobilizador (segundos)",
      es: "Tiempo del Ciclo del Inmovilizador (segundos)",
    },
    tooltip: {
      en: "The timing of the immobilizer cycle action.\r\n• Range : 0~7,200\r\n• Default :",
      es: "La sincronización de la acción del ciclo del inmovilizador.\r\n• Rango: 0~7,200\r\n• Predeterminado:",
      pt: "O tempo do ciclo de ação do imobilizador.\r\n• Intervalo: 0~7.200\r\n• Padrão:",
    },
    min: 0,
    max: 7200,
    list: null,
  },
  "0423": {
    title: {
      en: "Immobilizer Cycle Time (seconds)",
      pt: "Tempo do Ciclo do Imobilizador (segundos)",
      es: "Tiempo del Ciclo del Inmovilizador (segundos)",
    },
    tooltip: {
      en: "Operate the Immobilizer in Cycle.\r\n* If either T1 or T2 is set to 0, the operation will not be executed.\r\n* The operation stops only when the disable or EraseAll command is received.",
      es: "Operar el Inmovilizador en Ciclo.\r\n* Si T1 o T2 se establecen en 0, la operación no se ejecutará.\r\n* La operación se detiene solo cuando se recibe el comando de desactivar o BorrarTodo.",
      pt: "Operar o Imobilizador em Ciclo.\r\n* Se T1 ou T2 forem definidos como 0, a operação não será executada.\r\n* A operação para apenas quando o comando de desativação ou EraseAll for recebido.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0424": {
    title: {
      en: "Driver ID Immobilizer Auto Control",
      pt: "Controle Automático de Imobilizador por ID do Motorista",
      es: "Control Automático del Inmovilizador por ID del Conductor",
    },
    tooltip: {
      en: "If a valid Driver ID is tagged after changing the driving state, the Immobilizer Auto OUTPUT can be disabled to allow driving.\r\n• Option\r\n- Disable\r\n- Enable(Defualt)",
      es: "Si se etiqueta un ID de Conductor válido después de cambiar el estado de conducción, la salida automática del inmovilizador puede desactivarse para permitir la conducción.\r\n• Opción\r\n- Desactivar\r\n- Activar(Predeterminado)",
      pt: "Se um Driver ID válido for registrado após a mudança de estado de condução, a Saída Automática do Imobilizador pode ser desativada para permitir a condução.\r\n• Opção\r\n- Desativar\r\n- Ativar (Padrão)",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0716": {
    title: {
      en: "Immobilizer by Sim Extraction",
      pt: "Imobilizador por Extração do SIM",
      es: "Inmovilizador por Extracción de SIM",
    },
    tooltip: {
      en: "Set whether the immobilizer activates when the SIM is removed.",
      es: "Configurar si el inmovilizador se activa cuando se extrae la SIM.",
      pt: "Definir se o imobilizador será ativado quando o SIM for removido.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0717": {
    title: {
      en: "Immobilizer by Sim Extraction Status",
      pt: "Status do Imobilizador por Extração do SIM",
      es: "Estado del Inmovilizador por Extracción de SIM",
    },
    tooltip: {
      en: "Get the immobilizer by Sim Extraction Status",
      es: "Obtener el estado del inmovilizador por extracción de SIM.",
      pt: "Obter o status do imobilizador por extração de SIM.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0751": {
    title: {
      en: "Immobilizer by Main Power Disconnection",
      pt: "Imobilizador por Desconexão da Energia Principal",
      es: "Inmovilizador por Desconexión de Energía Principal",
    },
    tooltip: {
      en: "When the main power is disconnected, the immobilizer is activated.",
      es: "Cuando se desconecta la alimentación principal, el inmovilizador se activa.",
      pt: "Quando a energia principal for desconectada, o imobilizador é ativado.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0752": {
    title: {
      en: "Immobilizer by Main Power Disconnection Status",
      pt: "Status do Imobilizador por Desconexão da Energia Principal",
      es: "Estado del Inmovilizador por Desconexión de Energía Principal",
    },
    tooltip: {
      en: "Get the immobilizer by Main Power Disconnection Status.",
      es: "Obtener el estado del inmovilizador por desconexión de la alimentación principal.",
      pt: "Obter o status do imobilizador por desconexão de energia principal.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0506": {
    title: {
      en: "Reset Circular Geofence",
      pt: "Redefinir Geofence Circular",
      es: "Restablecer Geocerca Circular",
    },
    tooltip: {
      en: "Delete all circular geofence data.",
      es: "Eliminar todos los datos de geocercas circulares.",
      pt: "Excluir todos os dados de geofence circular.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0519": {
    title: {
      en: "Reset Circular Geofence Specific ID",
      pt: "Redefinir ID Específico do Geofence Circular",
      es: "Restablecer ID Específico de Geocerca Circular",
    },
    tooltip: {
      en: "Delete circular geofence setting data for a specific ID.",
      es: "Eliminar los datos de configuración de geocercas circulares para un ID específico.",
      pt: "Excluir os dados de configuração de geofence circular para um ID específico.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0517": {
    title: {
      en: "Reset Polygon Geofence",
      pt: "Redefinir Geofence Poligonal",
      es: "Restablecer Geocerca Poligonal",
    },
    tooltip: {
      en: "Delete all polygon geofence data.",
      es: "Eliminar todos los datos de geocercas poligonales.",
      pt: "Excluir todos os dados de geofence poligonal.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0518": {
    title: {
      en: "Reset Polygon Geofence Specific ID",
      pt: "Redefinir ID Específico do Geofence Poligonal",
      es: "Restablecer ID Específico de Geocerca Poligonal",
    },
    tooltip: {
      en: "Delete polygon geofence setting data for a specific ID.",
      es: "Eliminar los datos de configuración de geocercas poligonales para un ID específico.",
      pt: "Excluir os dados de configuração de geofence poligonal para um ID específico.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0727": {
    title: {
      en: "Polygon Bank Trucks",
      pt: "Caminhões do Banco Poligonal",
      es: "Camiones del Banco Poligonal",
    },
    tooltip: {
      en: "Enable or disable Polygon Bank Trucks Working.\r\n* To enable, the Output type must be set to Active with only the Buzzer type.",
      es: "Habilitar o deshabilitar el funcionamiento de camiones bancarios con geocercas poligonales.\r\n* Para habilitar, el tipo de salida debe estar configurado como Activo con solo el tipo Zumbador.",
      pt: "Ativar ou desativar o funcionamento dos caminhões de banco no geofence poligonal.\r\n* Para ativar, o tipo de Saída deve ser configurado como Ativo apenas com o tipo Buzzer.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0728": {
    title: {
      en: "Polygon Bank Trucks Status",
      pt: "Status dos Caminhões do Banco Poligonal",
      es: "Estado de Camiones del Banco Poligonal",
    },
    tooltip: {
      en: "Get the polygon bank trucks status.",
      es: "Obtener el estado de los camiones bancarios con geocercas poligonales.",
      pt: "Obter o status dos caminhões de banco no geofence poligonal.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0734": {
    title: {
      en: "Circular Bank Trucks Status",
      pt: "Status dos caminhões circulares de banco",
      es: "Estado de los camiones circulares de banco",
    },
    tooltip: {
      en: "Get the circular bank trucks status.",
      es: "Obtener el estado de los camiones circulares de banco.",
      pt: "Obter o status dos caminhões circulares de banco.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0513": {
    title: {
      en: "Reset Register BLE",
      pt: "Redefinir Registro BLE",
      es: "Restablecer Registro BLE",
    },
    tooltip: {
      en: "Delete all registered BLE setting data.",
      es: "Eliminar todos los datos de configuración BLE registrados.",
      pt: "Excluir todos os dados de configuração BLE registrados.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0620": {
    title: {
      en: "ST25T Preset",
      pt: "Pré-ajuste ST25T",
      es: "Preajuste ST25T",
    },
    tooltip: {
      en: "Report all ST25T parameters.",
      es: "Informar todos los parámetros del ST25T.",
      pt: "Relatar todos os parâmetros do ST25T.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0621": {
    title: {
      en: "ST25T ESN Number",
      pt: "Número ESN do ST25T",
      es: "Número ESN del ST25T",
    },
    tooltip: {
      en: "Get the ESN of the ST25T.",
      es: "Obtener el ESN del módulo ST25T.",
      pt: "Obter o ESN do módulo ST25T.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0623": {
    title: {
      en: "Reset ST25T",
      pt: "Redefinir ST25T",
      es: "Restablecer ST25T",
    },
    tooltip: {
      en: "Reset the ST25T module.",
      es: "Restablecer el módulo ST25T.",
      pt: "Redefinir o módulo ST25T.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0624": {
    title: {
      en: "ST25T Serial Camera 1 Snapshot",
      pt: "Instantâneo da Câmera Serial 1 ST25T",
      es: "Instantánea de Cámara Serial 1 del ST25T",
    },
    tooltip: {
      en: "Get a snapshot from serial camera 1 of the ST25T module.",
      es: "Obtener una instantánea de la cámara serie 1 del módulo ST25T.",
      pt: "Obter uma captura de imagem da câmera serial 1 do módulo ST25T.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0758": {
    title: {
      en: "Safe Box message",
      pt: "Mensagem do Cofre",
      es: "Mensaje de Caja Fuerte",
    },
    tooltip: {
      en: "The server sends a message to the RS232 device.\r\n* To use this feature, both RS232 and 1-wire must be supported. \r\n* The message can be up to 35 characters long and can only contain the characters A-Z, a-z, 0-9, and the symbols -,.\r\n* Messages are sent only when the following conditions are met\r\n- The vehicle's ignition is off.\r\n- The vehicle's speed is below 10 km/h (to avoid towing cases).\r\n- The vehicle is inside a geofence.\r\n- A registered Driver ID is connected.",
      es: "El servidor envía un mensaje al dispositivo RS232.\r\n* Para usar esta función, deben ser compatibles tanto RS232 como 1-wire.\r\n* El mensaje puede tener hasta 35 caracteres y solo puede contener los caracteres A-Z, a-z, 0-9 y los símbolos -,.\r\n* Los mensajes solo se envían cuando se cumplen las siguientes condiciones:\r\n- El Activado del vehículo está Desactivado.\r\n- La velocidad del vehículo está por debajo de 10 km/h (para evitar casos de remolque).\r\n- El vehículo está dentro de una geocerca.\r\n- Un ID de conductor registrado está conectado.",
      pt: "O servidor envia uma mensagem para o dispositivo RS232.\r\n* Para usar este recurso, tanto o RS232 quanto o 1-wire devem ser suportados.\r\n* A mensagem pode ter até 35 caracteres e pode conter apenas os caracteres A-Z, a-z, 0-9, e os símbolos -,.\r\n* As mensagens são enviadas apenas quando as seguintes condições são atendidas:\r\n- A ignição do veículo está desligada.\r\n- A velocidade do veículo está abaixo de 10 km/h (para evitar casos de reboque).\r\n- O veículo está dentro de uma geofence.\r\n- Um Driver ID registrado está conectado.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0501": {
    title: {
      en: "RS232 Status",
      pt: "Status do RS232",
      es: "Estado RS232",
    },
    tooltip: {
      en: "Status request from an external device connected via the RS232 event line.",
      es: "Solicitud de estado de un dispositivo externo conectado a través de la línea de eventos RS232.",
      pt: "Solicitação de status de um dispositivo externo conectado via a linha de eventos RS232.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0772": {
    title: {
      en: "SITrack Custom String",
      pt: "String Personalizada SITrack",
      es: "Cadena Personalizada SITrack",
    },
    tooltip: {
      en: "Enable or disable SITrack Custom String. \r\n* When enabled, the device transmits a customized string to the external RS232 device every minute while the vehicle's ignition is on.",
      es: "Habilitar o deshabilitar la cadena personalizada SITrack.\r\n* Cuando está habilitado, el dispositivo transmite una cadena personalizada al dispositivo externo RS232 cada minuto mientras el Activado del vehículo está activado.",
      pt: "Ativar ou desativar a String Personalizada SITrack.\r\n* Quando ativado, o dispositivo transmite uma string personalizada para o dispositivo RS232 externo a cada minuto enquanto a ignição do veículo está ligada.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0797": {
    title: {
      en: "Dual Purpose Input",
      pt: "Entrada de Propósito Duplo",
      es: "Entrada de Doble Propósito",
    },
    tooltip: {
      en: "Set Spreading Factor for LoRa devices.\r\n• Option\r\n- Disable(Defualt)\r\n- 1\r\n- 2\r\n- 3\r\n- 4\r\n- 5",
      es: "Configurar el Factor de Expansión para dispositivos LoRa.\r\n• Opciones:\r\n- Desactivado (Predeterminado)\r\n- 1\r\n- 2\r\n- 3\r\n- 4\r\n- 5",
      pt: "Definir o Fator de Espalhamento para dispositivos LoRa.\r\n• Opções:\r\n- Desativado (Padrão)\r\n- 1\r\n- 2\r\n- 3\r\n- 4\r\n- 5",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0718": {
    title: {
      en: "LoRa Network Keys",
      pt: "Chaves de Rede LoRa",
      es: "Claves de Red LoRa",
    },
    tooltip: {
      en: "Get the device address, network session key, and app session key for LoRaWAN.",
      es: "Obtener la dirección del dispositivo, la clave de sesión de red y la clave de sesión de la aplicación para LoRaWAN.",
      pt: "Obter o endereço do dispositivo, a chave de sessão de rede e a chave de sessão do aplicativo para LoRaWAN.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0710": {
    title: {
      en: "Spreading Factor for LoRa",
      pt: "Fator de Espalhamento para LoRa",
      es: "Factor de Expansión para LoRa",
    },
    tooltip: {
      en: "Set Spreading Factor for LoRa devices.\r\n• Range : 7~12\r\n• Default :",
      es: "Configurar el Factor de Expansión para dispositivos LoRa.\r\n• Rango: 7~12\r\n• Predeterminado:",
      pt: "Definir o Fator de Espalhamento para dispositivos LoRa.\r\n• Intervalo: 7~12\r\n• Padrão:",
    },
    min: 7,
    max: 12,
    list: null,
  },
  "0711": {
    title: {
      en: "Spreading Factor for LoRa Status",
      pt: "Status do Fator de Espalhamento para LoRa",
      es: "Estado del Factor de Expansión para LoRa",
    },
    tooltip: {
      en: "Get the Spreading Factor for LoRa.",
      es: "Obtener el Factor de Expansión para LoRa.",
      pt: "Obter o Fator de Espalhamento para LoRa.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0719": {
    title: {
      en: "LoRa Device EUI",
      pt: "EUI do Dispositivo LoRa",
      es: "EUI del Dispositivo LoRa",
    },
    tooltip: {
      en: "Get device EUI for LoRaWAN.",
      es: "Obtener el EUI del dispositivo para LoRaWAN.",
      pt: "Obter o EUI do dispositivo para LoRaWAN.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0773": {
    title: {
      en: "Start Emergency Mode",
      pt: "Iniciar Modo de Emergência",
      es: "Iniciar Modo de Emergencia",
    },
    tooltip: {
      en: "Start Emergency Mode.",
      es: "Iniciar el Modo de Emergencia.",
      pt: "Iniciar Modo de Emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0774": {
    title: {
      en: "Stop Emergency Mode",
      pt: "Parar Modo de Emergência",
      es: "Detener Modo de Emergencia",
    },
    tooltip: {
      en: "Stop Emergency Mode.",
      es: "Detener el Modo de Emergencia.",
      pt: "Parar Modo de Emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0775": {
    title: {
      en: "Start Collaborative Network Emergency",
      pt: "Iniciar Emergência da Rede Colaborativa",
      es: "Iniciar Emergencia en Red Colaborativa",
    },
    tooltip: {
      en: "Start or stop the collaborative network for emergency mode.",
      es: "Iniciar o detener la red colaborativa para el modo de emergencia.",
      pt: "Iniciar ou parar a rede colaborativa para o modo de emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0776": {
    title: {
      en: "Stop Collaborative Network Emergency",
      pt: "Parar Emergência da Rede Colaborativa",
      es: "Detener Emergencia en Red Colaborativa",
    },
    tooltip: {
      en: "Start or stop the collaborative network for emergency mode.",
      es: "Iniciar o detener la red colaborativa para el modo de emergencia.",
      pt: "Iniciar ou parar a rede colaborativa para o modo de emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0782": {
    title: {
      en: "Collaborative Network Emergency Status",
      pt: "Status da Emergência da Rede Colaborativa",
      es: "Estado de Emergencia en Red Colaborativa",
    },
    tooltip: {
      en: "Get the collaborative network for emergency mode.",
      es: "Obtener la red colaborativa para el modo de emergencia.",
      pt: "Obter a rede colaborativa para o modo de emergência.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0789": {
    title: {
      en: "Report while Charging",
      pt: "Relatório Durante Carregamento",
      es: "Informe Durante la Carga",
    },
    tooltip: {
      en: "Set the report to the server while charging the battery.\r\n• Option\r\n- Disable(Defualt) : The device does not report to the server while its battery is being recharged.\r\n- Enable : The device reports to the server while its battery is being recharged.\r\n* The device reports to the server periodically, according to its report interval configuration",
      es: "Configurar el informe al servidor mientras se carga la batería.\r\n• Opción\r\n- Desactivar(Predeterminado): El dispositivo no informa al servidor mientras se recarga la batería.\r\n- Activar: El dispositivo informa al servidor mientras se recarga la batería.\r\n* El dispositivo informa al servidor periódicamente, según la configuración del intervalo de informe.",
      pt: "Definir o relatório para o servidor enquanto carrega a bateria.\r\n• Opção\r\n- Desativar(Padrão): O dispositivo não envia relatórios para o servidor enquanto sua bateria está sendo recarregada.\r\n- Ativar: O dispositivo envia relatórios para o servidor enquanto sua bateria está sendo recarregada.\r\n* O dispositivo envia relatórios para o servidor periodicamente, de acordo com sua configuração de intervalo de relatórios.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0790": {
    title: {
      en: "Report while Charging Status",
      pt: "Status do Relatório Durante Carregamento",
      es: "Estado del Informe Durante la Carga",
    },
    tooltip: {
      en: "Get the report charge status.",
      es: "Obtener el estado del informe durante la carga.",
      pt: "Obter o status do relatório durante o carregamento.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0783": {
    title: {
      en: "Catcher Log",
      pt: "Log do Catcher",
      es: "Registro del Capturador (Catcher Log)",
    },
    tooltip: {
      en: "Enable or disable the catcher option in the device.\r\n* When the catcher option is enabled, a log is activated on the USB port that records certain actions and behaviors of the device. \r\n* This log can be used to investigate problems or specific behaviors.",
      es: "Habilitar o deshabilitar la opción catcher en el dispositivo.\r\n* Cuando la opción catcher está habilitada, se activa un registro en el puerto USB que registra ciertas acciones y comportamientos del dispositivo.\r\n* Este registro se puede utilizar para investigar problemas o comportamientos específicos.",
      pt: "Ativar ou desativar a opção catcher no dispositivo.\r\n* Quando a opção catcher está ativada, um log é ativado na porta USB que registra certas ações e comportamentos do dispositivo.\r\n* Este log pode ser usado para investigar problemas ou comportamentos específicos.",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0784": {
    title: {
      en: "Catcher Log Status",
      pt: "Status do Log do Catcher",
      es: "Estado del Registro del Capturador",
    },
    tooltip: {
      en: "Get the catcher status.",
      es: "Obtener el estado del catcher.",
      pt: "Obter o status do catcher.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0785": {
    title: {
      en: "SMPS",
      pt: "SMPS",
      es: "SMPS",
    },
    tooltip: {
      en: "SMPS setting in RF chipset (S2-LP).\r\n• Option\r\n- 1.5 V(Defualt)\r\n- 1.6 V\r\n- 1.7 V\r\n- 1.8 V\r\n* The S2-LP is equipped with a power management system. \r\n* The integrated switched mode power supply (SMPS) regulator allows operation with a battery voltage ranging from +1.5V to +1.8V.",
      es: "Configuración de SMPS en el chipset RF (S2-LP).\r\n• Opción\r\n- 1.5 V (Predeterminado)\r\n- 1.6 V\r\n- 1.7 V\r\n- 1.8 V\r\n* El S2-LP está equipado con un sistema de gestión de energía.\r\n* El regulador integrado de la fuente de alimentación conmutada (SMPS) permite la operación con un voltaje de batería de entre +1.5V y +1.8V.",
      pt: "Configuração SMPS no chipset RF (S2-LP).\r\n• Opção\r\n- 1,5 V(Padrão)\r\n- 1,6 V\r\n- 1,7 V\r\n- 1,8 V\r\n* O S2-LP está equipado com um sistema de gerenciamento de energia.\r\n* O regulador integrado de fonte de alimentação em modo comutado (SMPS) permite operação com uma tensão de bateria que varia de +1,5V a +1,8V.",
    },
    min: null,
    max: null,
    list: null,
  },
  "0787": {
    title: {
      en: "SMPS Status",
      pt: "Status do SMPS",
      es: "Estado del SMPS",
    },
    tooltip: {
      en: "Get the SMPS in RF chipset (S2-LP).",
      es: "Obtener la configuración de SMPS en el chipset RF (S2-LP).",
      pt: "Obter o SMPS no chipset RF (S2-LP).",
    },
    min: null,
    max: null,
    list: null,
  },
  "0786": {
    title: {
      en: "Transmission Duration",
      pt: "Duração da Transmissão",
      es: "Duración de la Transmisión",
    },
    tooltip: {
      en: "Set the transmission duration in RF Chipset(S2-LP).\r\n• Range : 1~21\r\n• Default : 1",
      es: "Configurar la duración de la transmisión en el chipset RF (S2-LP).\r\n• Rango: 1~21\r\n• Predeterminado: 1",
      pt: "Definir a duração da transmissão no Chipset RF (S2-LP).\r\n• Intervalo: 1~21\r\n• Padrão: 1",
    },
    min: null,
    max: null,
    list: [
      {
        value: "0",
        label: {
          en: "Enable",
          es: "Activar",
          pt: "Ativar",
        },
      },
      {
        value: "1",
        label: {
          en: "Disable",
          es: "Desactivar",
          pt: "Desativar",
        },
      },
    ],
  },
  "0788": {
    title: {
      en: "Transmission Duration Status",
      pt: "Status da Duração da Transmissão",
      es: "Estado de la Duración de la Transmisión",
    },
    tooltip: {
      en: "Get the transmission duration.",
      es: "Obtener la duración de la transmisión.",
      pt: "Obter a duração da transmissão.",
    },
    min: null,
    max: null,
    list: null,
  },
};
