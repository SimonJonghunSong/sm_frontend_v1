export const groupFieldPatch = {
  ST4950B_Series: {
    "1717": {
      title: {
        en: "GPS Pinning at Parking",
        pt: "Fixação de GPS em Estacionamento",
        es: "Fijación del GPS en Estacionamiento",
      },
      tooltip: {
        en: "GPS Pinning at Parking (EN)",
        pt: "Fixação de GPS em Estacionamento (PT)",
        es: "Fijación del GPS em Estacionamiento (ES)",
      },
      list: [
        { value: "00", label: { en: "Disable", pt: "Disable", es: "Disable" } },
        { value: "01", label: { en: "Enable", pt: "Enable", es: "Enable" } },
      ],
    },

    //1973 중복 됨. 
    "1973": {
      title: {
        en: "Turn On by Charger",
        pt: "Ligar por Carregador",
        es: "Encender por Cargador",
      },
      tooltip: {
        en: "This is for ST4950_Series and ST4932. Determined whether the device turns on automatically or not when the charger is connected",
        pt: "Isto é para ST4950_Series e ST4932. Determina se o dispositivo liga automaticamente ou não quando o carregador está conectado",
        es: "Esto es para ST4950_Series y ST4932. Determina si el dispositivo se enciende automáticamente o no cuando el cargador está conectado",
      },
      list: [
        { value: "00", label: { en: "Disable", pt: "Desabilitar", es: "Deshabilitar" } },
        { value: "01", label: { en: "Enable", pt: "Habilitar", es: "Habilitar" } },
      ],
    },
  },
  ST4930_Series: {
    "2611": {
      title: {
        en: "Light Sensor",
        pt: "Sensor de Luz",
        es: "Sensor de Luz",
      },
      tooltip: {
        en: "Light detection is used to alert when a device that is attached and installed somewhere is removed.",
        pt: "A detecção de luz é usada para alertar quando um dispositivo que está anexado e instalado em algum lugar é removido.",
        es: "La detección de luz se utiliza para alertar cuando se retira un dispositivo que está sujeto e instalado en algún lugar.",
      },
      list: [
        { value: "0", label: { en: "Disable", pt: "Desabilitar", es: "Deshabilitar" } },
        { value: "1", label: { en: "Level 1 (Screw-fastened)", pt: "Nível 1 (Parafusado)", es: "Nivel 1 (Atornillado)" } },
        { value: "2", label: { en: "Level 2", pt: "Nível 2", es: "Nivel 2" } },
        { value: "3", label: { en: "Level 3", pt: "Nível 3", es: "Nivel 3" } },
        { value: "4", label: { en: "Level 4", pt: "Nível 4", es: "Nivel 4" } },
        { value: "5", label: { en: "Level 5", pt: "Nível 5", es: "Nivel 5" } },
        { value: "6", label: { en: "Level 6", pt: "Nível 6", es: "Nivel 6" } },
        { value: "7", label: { en: "Level 7", pt: "Nível 7", es: "Nivel 7" } },
      ],
    },

    //1973 중복 됨. 
    "1973": {
      title: {
        en: "Turn On by Charger",
        pt: "Ligar por Carregador",
        es: "Encender por Cargador",
      },
      tooltip: {
        en: "This is for ST4950_Series and ST4932. Determined whether the device turns on automatically or not when the charger is connected",
        pt: "Isto é para ST4950_Series e ST4932. Determina se o dispositivo liga automaticamente ou não quando o carregador está conectado",
        es: "Esto es para ST4950_Series y ST4932. Determina si el dispositivo se enciende automáticamente o no cuando el cargador está conectado",
      },
      list: [
        { value: "00", label: { en: "Disable", pt: "Desabilitar", es: "Deshabilitar" } },
        { value: "01", label: { en: "Enable", pt: "Habilitar", es: "Habilitar" } },
      ],
    },
  },
}; 