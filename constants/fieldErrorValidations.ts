export const FIELD_ERRORS = {
  minMax: (min, max) => {
    return {
      en: `Input only between ${min} ~ ${max}`,
      es: `Ingrese solo entre ${min} y ${max}`,
      pt: `Entrada somente entre ${min} ~ ${max}`,
    };
  },

  required: (field) => {
    return {
      en: `${field} is required`,
      es: `${field} es requerido`,
      pt: `${field} é requerido`,
    };
  },

  temperatureRange: {
    en: "High temperature must be higher than low temperature.",
    es: "La temperatura máxima debe ser mayor que la temperatura mínima.",
    pt: "A temperatura máxima deve ser maior que a temperatura mínima.",
  },

  humidityRange: {
    en: "High humidity must be higher than low humidity.",
    es: "La humedad máxima debe ser mayor que la humedad mínima.",
    pt: "A umidade máxima deve ser maior que a umidade mínima.",
  },

  alphaNumericPattern: {
    en: "Characters A-Z, a-z, 0-9 are allowed.",
    es: "Se permiten caracteres A-Z, a-z, 0-9.",
    pt: "Caracteres A-Z, a-z, 0-9 são permitidos.",
  },

  alphaNumericPatternWithSymbols: {
    en: "Characters A-Z, a-z, 0-9, and symbols '-.' are allowed.",
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },

  invalidUrl: {
    en: "Invalid URL format.",
    es: "Formato de URL inválido.",
    pt: "Formato de URL inválido.",
  },
  "1001": {
    en: "Characters A-Z, a-z, 0-9 are allowed, Max: 100 Characters",
    es: "Se permiten caracteres A-Z, a-z, 0-9.",
    pt: "Caracteres A-Z, a-z, 0-9 são permitidos.",
  },
  "1002": {
    en: "Characters A-Z, a-z, 0-9 are allowed.",
    es: "Se permiten caracteres A-Z, a-z, 0-9.",
    pt: "Caracteres A-Z, a-z, 0-9 são permitidos.",
  },
  "1003": {
    en: "Characters A-Z, a-z, 0-9 are allowed.",
    es: "Se permiten caracteres A-Z, a-z, 0-9.",
    pt: "Caracteres A-Z, a-z, 0-9 são permitidos.",
  },
  "1005": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed. Min:  5 Characters, Max: 64 Characters',
    es: 'Debe tener al menos 5 caracteres.\r\nSe permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Deve ter pelo menos 5 caracteres.\r\nCaracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "1006": {
    en: "Input only between 0 ~ 65535",
    es: "Ingrese solo entre 0 y 65535",
    pt: "Entrada somente entre 0 ~ 65535",
  },
  "1008": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed. Min:  5 Characters, Max: 64 Characters',
    es: '- Debe tener al menos 5 caracteres. (Si se ingresan 5 caracteres o menos)\r\n- Se permiten caracteres A-Z, a-z, 0-9, y símbolos ""-.""',
    pt: 'Deve ter pelo menos 5 caracteres.\r\nCaracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "1009": {
    en: "Input only between 0 ~ 65535 Max:  5 Characters",
    es: "Ingrese solo entre 0 y 65535",
    pt: "Entrada somente entre 0 ~ 65535",
  },
  "1012": {
    en: "Input only between 0 ~ 65535 Max:  5 Characters",
    es: "Ingrese solo entre 0 y 65535",
    pt: "Entrada somente entre 0 ~ 65535",
  },
  "1015": {
    en: 'Invalid URL format.\r\nCharacters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Formato de URL inválido.\r\nSe permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Formato de URL inválido.\r\nCaracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "1017": {
    en: "Input only between 10 ~ 255",
    es: "Ingrese solo entre 10 y 255",
    pt: "Entrada somente entre 10 ~ 255",
  },
  "1018": {
    en: "Input only between 2 ~ 255",
    es: "Ingrese solo entre 2 y 255",
    pt: "Entrada somente entre 2 ~ 255",
  },
  "1019": {
    en: "Input only between 2 ~ 255",
    es: "Ingrese solo entre 2 y 255",
    pt: "Entrada somente entre 2 ~ 255",
  },
  "1020": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "1021": {
    en: "Input only between 0 ~ 65535",
    es: "Ingrese solo entre 0 y 65535",
    pt: "Entrada somente entre 0 ~ 65535",
  },
  "1022": {
    en: "Input only between 24 ~ 999",
    es: "Ingrese solo entre 24 y 999",
    pt: "Entrada somente entre 24 ~ 999",
  },
  "1027": {
    en: "Input only between 10 ~ 7,200",
    es: "Ingrese solo entre 10 y 7,200",
    pt: "Entrada somente entre 10 ~ 7,200",
  },
  "1047": {
    en: "Input only between 1 ~ 150",
    es: "Ingrese solo entre 1 y 150",
    pt: "Entrada somente entre 1 ~ 150",
  },
  "1048": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1049": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1050": {
    en: "Input only between 10 ~ 60,000",
    es: "Ingrese solo entre 10 y 60,000",
    pt: "Entrada somente entre 10 ~ 60,000",
  },
  "1051": {
    en: "Input only between 10 ~ 60,000",
    es: "Ingrese solo entre 10 y 60,000",
    pt: "Entrada somente entre 10 ~ 60,000",
  },
  "1053": {
    en: "Input only between 20 ~ 86,400",
    es: "Ingrese solo entre 20 y 86,400",
    pt: "Entrada somente entre 20 ~ 86,400",
  },
  "1060": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1062": {
    en: "Input only between 0 ~ 60,000",
    es: "Ingrese solo entre 0 y 60,000",
    pt: "Entrada somente entre 0 ~ 60,000",
  },
  "1063": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1065": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1066": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1067": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1068": {
    en: "Input only between 0 ~ 43,200",
    es: "Ingrese solo entre 0 y 43,200",
    pt: "Entrada somente entre 0 ~ 43,200",
  },
  "1071": {
    en: "Input only between 60 ~ 7,200\r\nInput only between 1 ~ 1,800",
    es: "- Ingrese solo entre 60 y 7,200\r\n- Ingrese solo entre 1 y 1,800",
    pt: "Entrada somente entre 60 ~ 7,200\r\nEntrada somente entre 1 ~ 1,800",
  },
  "1073": {
    en: "Characters A-Z, a-z, 0-9 are allowed and length should be 32.",
    es: "Se permiten caracteres A-Z, a-z, 0-9 y la longitud debe ser de 32 caracteres.",
    pt: "Caracteres A-Z, a-z, 0-9 são permitidos e o comprimento deve ser 32.",
  },
  "1074": {
    en: "Input only between 0 ~ 99,999",
    es: "Ingrese solo entre 0 y 99,999",
    pt: "Entrada somente entre 0 ~ 99,999",
  },
  "1076": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "1077": {
    en: "Input only between 0 ~ 65535 Max:  5 Characters",
    es: "Ingrese solo entre 0 y 65535",
    pt: "Entrada somente entre 0 ~ 65535",
  },
  "1601": {
    en: "Input only between 0 ~ 255",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "1603": {
    en: "Input only between 0 ~ 255",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "1606": {
    en: "Input only between 0 ~ 255",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "1611": {
    en: "Input only between 0 ~ 65,534\r\nCannot set 1611, 1612 both to 0",
    es: "Ingrese solo entre 0 y 65,534\r\nNo se pueden configurar 1611 y 1612 ambos a 0",
    pt: "Entrada somente entre 0 ~ 65,534\r\nNão é possível definir 1611, 1612 ambos como 0",
  },
  "1612": {
    en: "Input only between 0 ~ 65,534\r\nCannot set 1611, 1612 both to 0",
    es: "Ingrese solo entre 0 y 65,534\r\nNo se pueden configurar 1611 y 1612 ambos a 0",
    pt: "Entrada somente entre 0 ~ 65,534\r\nNão é possível definir 1611, 1612 ambos como 0",
  },
  "1613": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1614": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1615": {
    en: "Input only between 1 ~ 86,400",
    es: "Ingrese solo entre 1 y 86,400",
    pt: "Entrada somente entre 1 ~ 86,400",
  },
  "1616": {
    en: "Input only between 1 ~ 86,400",
    es: "Ingrese solo entre 1 y 86,400",
    pt: "Entrada somente entre 1 ~ 86,400",
  },
  "1617": {
    en: "Input only between 1 ~ 86,400",
    es: "Ingrese solo entre 1 y 86,400",
    pt: "Entrada somente entre 1 ~ 86,400",
  },
  "1621": {
    en: "Input only between 1 ~ 300",
    es: "Ingrese solo entre 1 y 300",
    pt: "Entrada somente entre 1 ~ 300",
  },
  "1622": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1623": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1624": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1625": {
    en: "Input only between 1 ~ 255",
    es: "Ingrese solo entre 1 y 255",
    pt: "Entrada somente entre 1 ~ 255",
  },
  "1653": {
    en: "Input only between 5 ~ 86,400",
    es: "Ingrese solo entre 5 y 86,400",
    pt: "Entrada somente entre 5 ~ 86,400",
  },
  "1670": {
    en: "Input only between 600 ~ 86,400",
    es: "Ingrese solo entre 600 ~ 86,400",
    pt: "Entrada somente entre 600 ~ 86.400",
  },
  "1671": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1672": {
    en: "Input only between 0, 10 ~ 179",
    es: "Ingrese solo entre 10 y 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1673": {
    en: "Input only between 21,600 ~ 86,400",
    es: "Ingrese solo entre 21,600 ~ 86,400",
    pt: "Entrada somente entre 21.600 ~ 86.400",
  },
  "1674": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1675": {
    en: "Input only between 0, 10 ~ 179",
    es: "Ingrese solo entre 10 y 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1676": {
    en: "Input only between 43,200 ~ 86,400",
    es: "Ingrese solo entre 43,200 ~ 86,400",
    pt: "Entrada somente entre 43.200 ~ 86.400",
  },
  "1677": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1678": {
    en: "Input only between 0, 10 ~ 179",
    es: "Ingrese solo entre 10 y 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1679": {
    en: "Input only between 30 ~ 86,400",
    es: "Ingrese solo entre 30 ~ 86,400",
    pt: "Entrada somente entre 30 ~ 86.400",
  },
  "1680": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1681": {
    en: "Input only between 10 ~ 179",
    es: "Ingrese solo entre 10 ~ 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1682": {
    en: "Input only between 30 ~ 86,400",
    es: "Ingrese solo entre 30 ~ 86,400",
    pt: "Entrada somente entre 30 ~ 86.400",
  },
  "1683": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1684": {
    en: "Input only between 10 ~ 179",
    es: "Ingrese solo entre 10 ~ 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1685": {
    en: "Input only between 3,600 ~ 86,400",
    es: "Ingrese solo entre 3,600 ~ 86,400",
    pt: "Entrada somente entre 3.600 ~ 86.400",
  },
  "1686": {
    en: "Input only between 0, 50 ~ 65,535",
    es: "Ingrese solo entre 50 y 65,535",
    pt: "Entrada somente entre 50 ~ 65,535",
  },
  "1687": {
    en: "Input only between 0, 10 ~ 179",
    es: "Ingrese solo entre 10 y 179",
    pt: "Entrada somente entre 10 ~ 179",
  },
  "1688": {
    en: "Input only between 7,200 ~ 86,400",
    es: "Ingrese solo entre 7,200 ~ 86,400",
    pt: "Entrada somente entre 7.200 ~ 86.400",
  },
  "1697": {
    en: "Input only between 1 ~ 99",
    es: "Ingrese solo entre 1 ~ 99",
    pt: "Entrada somente entre 1 ~ 99",
  },
  "1701": {
    en: "Input only between 0 ~ 255",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "1702": {
    en: "Input only between 0 ~ 255",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "1705": {
    en: "Input only between 0, 3 ~ 100\r\nCannot set off when ether 1711 or 1713 is off.\r\nCannot be less than the value of 1708",
    es: "Ingrese solo entre 3 y 100\r\nNo se puede desactivar cuando el campo 1711 o 1713 esté desactivado.\r\nNo puede ser menor que el valor de 1708",
    pt: "Entrada somente entre 3 ~ 100\r\nNão é possível definir desligado quando ether 1711 ou 1713 estiver desligado.\r\nNão pode ser menor que o valor de 1708",
  },
  "1706": {
    en: "Input only between 3 ~ 999",
    es: "Ingrese solo entre 3 y 999",
    pt: "Entrada somente entre 3 ~ 999",
  },
  "1707": {
    en: "Input only between 30 ~ 100",
    es: "Ingrese solo entre 30 y 100",
    pt: "Entrada somente entre 30 ~ 100",
  },
  "1708": {
    en: "Input only between 0, 3 ~ 100\r\nCannot set off when ether 1711 or 1713 is off.\r\nCannot be greater than the value of 1705",
    es: "Ingrese solo entre 3 y 100\r\nNo se puede desactivar cuando el campo 1711 o 1713 esté desactivado.\r\nNo puede ser mayor que el valor de 1705",
    pt: "Entrada somente entre 3 ~ 100\r\nNão é possível definir desligado quando ether 1711 ou 1713 estiver desligado.\r\nNão pode ser maior que o valor de 1705",
  },
  "1709": {
    en: "Input only between 3 ~ 999",
    es: "Ingrese solo entre 3 y 999",
    pt: "Entrada somente entre 3 ~ 999",
  },
  "1710": {
    en: "Input only between 30 ~ 100",
    es: "Ingrese solo entre 30 y 100",
    pt: "Entrada somente entre 30 ~ 100",
  },
  "1711": {
    en: "Input only between 0, 5.0 ~ 125.0\r\nCannot set off when ether 1705 or 1708 is off.",
    es: "Ingrese solo entre 5.0 y 125.0\r\nNo se puede desactivar cuando el campo 1705 o 1708 esté desactivado.",
    pt: "Entrada somente entre 5.0 ~ 125.0\r\nNão é possível definir desligado quando ether 1705 ou 1708 estiver desligado.",
  },
  "1712": {
    en: "Input only between 3 ~ 999",
    es: "Ingrese solo entre 3 y 999",
    pt: "Entrada somente entre 3 ~ 999",
  },
  "1713": {
    en: "Input only between 0, 5.0 ~ 125.0\r\nCannot set off when ether 1705 or 1708 is off.",
    es: "Ingrese solo entre 5.0 y 125.0\r\nNo se puede desactivar cuando el campo 1705 o 1708 esté desactivado.",
    pt: "Entrada somente entre 5.0 ~ 125.0\r\nNão é possível definir desligado quando ether 1705 ou 1708 estiver desligado.",
  },
  "1714": {
    en: "Input only between 3 ~ 999",
    es: "Ingrese solo entre 3 y 999",
    pt: "Entrada somente entre 3 ~ 999",
  },
  "1715": {
    en: "Input only between 0 ~ 30",
    es: "Ingrese solo entre 0 y 30",
    pt: "Entrada somente entre 0 ~ 30",
  },
  "1716": {
    en: "Input only between 0 ~ 30",
    es: "Ingrese solo entre 0 y 30",
    pt: "Entrada somente entre 0 ~ 30",
  },
  "1901": {
    en: "Input only between 0.06 ~ 8.0",
    es: "Ingrese solo entre 0.06 y 8.0",
    pt: "Entrada somente entre 0.06 ~ 8.0",
  },
  "1902": {
    en: "Input only between 15 ~ 21,600",
    es: "Ingrese solo entre 15 y 21,600",
    pt: "Entrada somente entre 15 ~ 21,600",
  },
  "1903": {
    en: "Input only between 0.06 ~ 8.0",
    es: "Ingrese solo entre 0.06 y 8.0",
    pt: "Entrada somente entre 0.06 ~ 8.0",
  },
  "1904": {
    en: "Input only between 0.1 ~ 8.0",
    es: "Ingrese solo entre 0.1 y 8.0",
    pt: "Entrada somente entre 0.1 ~ 8.0",
  },
  "1911": {
    en: "Input only between 1 ~ 512",
    es: "Ingrese solo entre 1 y 512",
    pt: "Entrada somente entre 1 ~ 512",
  },
  "1912": {
    en: "Input only between 1 ~ 512",
    es: "Ingrese solo entre 1 y 512",
    pt: "Entrada somente entre 1 ~ 512",
  },
  "1913": {
    en: "Input only between 1 ~ 512",
    es: "Ingrese solo entre 1 y 512",
    pt: "Entrada somente entre 1 ~ 512",
  },
  "1914": {
    en: "Input only between 1 ~ 512",
    es: "Ingrese solo entre 1 y 512",
    pt: "Entrada somente entre 1 ~ 512",
  },
  "1916": {
    en: "Input only between 1 ~ 15",
    es: "Ingrese solo entre 1 y 15",
    pt: "Entrada somente entre 1 ~ 15",
  },
  "1917": {
    en: "Input only between 1 ~ 15",
    es: "Ingrese solo entre 1 y 15",
    pt: "Entrada somente entre 1 ~ 15",
  },
  "1920": {
    en: "Input only between 1 ~ 1,800",
    es: "Ingrese solo entre 1 y 1,800",
    pt: "Entrada somente entre 1 ~ 1,800",
  },
  "1921": {
    en: "Input only between 1.0 ~ 512.0",
    es: "Ingrese solo entre 1.0 y 512.0",
    pt: "Entrada somente entre 1.0 ~ 512.0",
  },
  "1922": {
    en: "Input only between 1.0 ~ 512.0",
    es: "Ingrese solo entre 1.0 y 512.0",
    pt: "Entrada somente entre 1.0 ~ 512.0",
  },
  "1923": {
    en: "Input only between 1.0 ~ 512.0",
    es: "Ingrese solo entre 1.0 y 512.0",
    pt: "Entrada somente entre 1.0 ~ 512.0",
  },
  "1925": {
    en: "Input only between 0 ~ 120",
    es: "Ingrese solo entre 0 y 120",
    pt: "Entrada somente entre 0 ~ 120",
  },
  "1933": {
    en: "Input only between 16.00 ~ 20.00",
    es: "Ingrese solo entre 16.00 y 20.00",
    pt: "Entrada somente entre 16.00 ~ 20.00",
  },
  "1934": {
    en: "Input only between 6.00 ~ 14.00",
    es: "Ingrese solo entre 6.00 y 14.00",
    pt: "Entrada somente entre 6.00 ~ 14.00",
  },
  "1935": {
    en: "Input only between 16.00 ~ 24.00",
    es: "Ingrese solo entre 16.00 y 24.00",
    pt: "Entrada somente entre 16.00 ~ 24.00",
  },
  "1937": {
    en: "Input only between 3.40 ~3.80",
    es: "Ingrese solo entre 3.40 y 3.80",
    pt: "Entrada somente entre 3.40 ~ 3.80",
  },
  "1938": {
    en: "Input only between 3.50 ~ 3.90\r\nCannot be less than the value of 1937",
    es: "Ingrese solo entre 3.50 y 3.90\r\nNo puede ser menor que el valor de 1937",
    pt: "Entrada somente entre 3.50 ~ 3.90\r\nNão pode ser menor que o valor de 1937",
  },
  "1939": {
    en: "Input only between 10 ~ 3,600",
    es: "Ingrese solo entre 10 y 3,600",
    pt: "Entrada somente entre 10 ~ 3,600",
  },
  "1940": {
    en: "Input only between 10 ~ 3,600",
    es: "Ingrese solo entre 10 y 3,600",
    pt: "Entrada somente entre 10 ~ 3,600",
  },
  "1941": {
    en: "Input only between 5.00 ~ 99.99",
    es: "Ingrese solo entre 5.00 y 99.99",
    pt: "Entrada somente entre 5.00 ~ 99.99",
  },
  "1942": {
    en: "Input only between 5.00 ~ 99.99",
    es: "Ingrese solo entre 5.00 y 99.99",
    pt: "Entrada somente entre 5.00 ~ 99.99",
  },
  "1943": {
    en: "Input only between 5.00 ~ 99.99",
    es: "Ingrese solo entre 5.00 y 99.99",
    pt: "Entrada somente entre 5.00 ~ 99.99",
  },
  "1945": {
    en: "Input only between 0 ~ 15 (5.12 ~ 10485.76 seconds)",
    es: "Ingrese solo entre 0 y 15",
    pt: "Entrada somente entre 0 ~ 15",
  },
  "1946": {
    en: "Input only between 0 ~ 15 (5.12 ~ 10485.76 seconds)",
    es: "Ingrese solo entre 0 y 15",
    pt: "Entrada somente entre 0 ~ 15",
  },
  "1947": {
    en: "Input only between 1 ~ 30",
    es: "Ingrese solo entre 1 y 30",
    pt: "Entrada somente entre 1 ~ 30",
  },
  "1953": {
    en: "Input only between 10.5 ~ 14.0",
    es: "Ingrese solo entre 10.5 y 14.0",
    pt: "Entrada somente entre 10.5 ~ 14.0",
  },
  "1954": {
    en: "Input only between 10.5 ~ 26.0",
    es: "Ingrese solo entre 10.5 y 26.0",
    pt: "Entrada somente entre 10.5 ~ 26.0",
  },
  "1956": {
    en: "Input only between 30 ~ 72,000",
    es: "Ingrese solo entre 30 y 72,000",
    pt: "Entrada somente entre 30 ~ 72,000",
  },
  "1957": {
    en: "Input only between 0 ~ 120",
    es: "Ingrese solo entre 0 y 120",
    pt: "Entrada somente entre 0 ~ 120",
  },
  "1959": {
    en: "Input only between 1 ~ 1,440",
    es: "Ingrese solo entre 1 y 1,440",
    pt: "Entrada somente entre 1 ~ 1,440",
  },
  "1971": {
    en: "Input only between 10 ~ 900",
    es: "Ingrese solo entre 10 y 900",
    pt: "Entrada somente entre 10 ~ 900",
  },
  "1972": {
    en: "Input only between 10 ~ 3,600",
    es: "Ingrese solo entre 10 y 3,600",
    pt: "Entrada somente entre 10 ~ 3,600",
  },
  "1974": {
    en: "- Cannot input over 16 bytes.\r\n- 1974 and 1975 cannot have the same values.",
    es: "- No se pueden ingresar más de 16 bytes.\r\n- 1974 y 1975 no pueden tener los mismos valores.",
    pt: "- No se pueden ingresar más de 16 bytes.\r\n- 1974 y 1975 no pueden tener los mismos valores.",
  },
  "1975": {
    en: "- Cannot input over 16 bytes.\r\n- 1974 and 1975 cannot have the same values.",
    es: "- No se pueden ingresar más de 16 bytes.\r\n- 1974 y 1975 no pueden tener los mismos valores.",
    pt: "- No se pueden ingresar más de 16 bytes.\r\n- 1974 y 1975 no pueden tener los mismos valores.",
  },
  "1980": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1982": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1984": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1986": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1988": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1990": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1992": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1994": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be a higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "1996": {
    en: "Input only between 1 ~ 1,440",
    es: "Ingrese solo entre 1 y 1,440",
    pt: "Entrada somente entre 1 ~ 1,440",
  },
  "1997": {
    en: "Input only between 1 ~ 1,440",
    es: "Ingrese solo entre 1 y 1,440",
    pt: "Entrada somente entre 1 ~ 1,440",
  },
  "1998": {
    en: "Input only between 1 ~ 360",
    es: "Ingrese solo entre 1 y 360",
    pt: "Entrada somente entre 1 ~ 360",
  },
  "2002": {
    en: "Input only between 0 ~ 16,383",
    es: "Ingrese solo entre 0 y 16.383",
    pt: "Entrada somente entre 0 ~ 16.383",
  },
  "2304": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2305": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2307": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2308": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2309": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2310": {
    en: "Input only between 0 ~ 4,095",
    es: "Ingrese solo entre 0 y 4,095",
    pt: "Entrada somente entre 0 ~ 4,095",
  },
  "2314": {
    en: "Input only between 1 ~ 30",
    es: "Ingrese solo entre 1 y 30",
    pt: "Entrada somente entre 1 ~ 30",
  },
  "2316": {
    en: "Input only between 1 ~ 30",
    es: "Ingrese solo entre 1 y 30",
    pt: "Entrada somente entre 1 ~ 30",
  },
  "2330": {
    en: "Input only between 0 ~ 250",
    es: "Ingrese solo entre 0 y 250",
    pt: "Entrada somente entre 0 ~ 250",
  },
  "2331": {
    en: "Input only between 0 ~ 250",
    es: "Ingrese solo entre 0 y 250",
    pt: "Entrada somente entre 0 ~ 250",
  },
  "2332": {
    en: "Input only between -40 ~ 210",
    es: "Ingrese solo entre -40 y 210",
    pt: "Entrada somente entre -40 ~ 210",
  },
  "2333": {
    en: "Input only between 0 ~ 1,000",
    es: "Ingrese solo entre 0 y 1,000",
    pt: "Entrada somente entre 0 ~ 1,000",
  },
  "2334": {
    en: "Input only between 0 ~ 8,031",
    es: "Ingrese solo entre 0 y 8,031",
    pt: "Entrada somente entre 0 ~ 8,031",
  },
  "2352": {
    en: "Input only between 0 ~ 200",
    es: "Ingrese solo entre 0 y 200",
    pt: "Entrada somente entre 0 ~ 200",
  },
  "2503": {
    en: "Input only between 0 ~ 65,535",
    es: "Ingrese solo entre 0 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2504": {
    en: "Input only between 0 ~ 65,535",
    es: "Ingrese solo entre 0 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2505": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2506": {
    en: "Input only between 0 ~ 100",
    es: "Ingrese solo entre 0 y 100",
    pt: "Entrada somente entre 0 ~ 100",
  },
  "2507": {
    en: "Input only between 0 ~ 1,440",
    es: "Ingrese solo entre 0 y 1,440",
    pt: "Entrada somente entre 0 ~ 1,440",
  },
  "2508": {
    en: "Input only between 25 ~ 1,500",
    es: "Ingrese solo entre 25 y 1,500",
    pt: "Entrada somente entre 25 ~ 1,500",
  },
  "2509": {
    en: "Input only between 30 ~ 1,500",
    es: "Ingrese solo entre 30 y 1,500",
    pt: "Entrada somente entre 30 ~ 1,500",
  },
  "2511": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2514": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2516": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2517": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2520": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2521": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2522": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2525": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2526": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2527": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2530": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2531": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2532": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2535": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2536": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2537": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2540": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2541": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2542": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2545": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2546": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2547": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2550": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2551": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2552": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2555": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2556": {
    en: "Must be 9 ~ 10 numeric digits long.",
    es: "Debe tener entre 9 y 10 dígitos numéricos.",
    pt: "Debe tener entre 9 y 10 dígitos numéricos.",
  },
  "2557": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "2560": {
    en: "Must be 6 ~ 10 numeric digits long.",
    es: "Debe tener entre 6 y 10 dígitos numéricos.",
    pt: "Debe tener entre 6 y 10 dígitos numéricos.",
  },
  "2563": {
    en: "Input only between 0 ~ 65,535\r\nST4410:  Input only between 0 ~5760",
    es: "Ingrese solo entre 0 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2566": {
    en: "Input only between 1 ~ 15",
    es: "Ingrese solo entre 1 y 15",
    pt: "Entrada somente entre 1 ~ 15",
  },
  "2567": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 0 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2568": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 0 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2569": {
    en: "Input only between 0 ~ 2,880",
    es: "Ingrese solo entre 0 y 2,880",
    pt: "Entrada somente entre 0 ~ 2,880",
  },
  "2582": {
    en: "Invalid Device EUI.",
    es: "EUI de dispositivo inválido.",
    pt: "EUI de Dispositivo Inválido.",
  },
  "2583": {
    en: "Input only between 1 ~ 113",
    es: "Ingrese solo entre 1 y 113",
    pt: "Entrada somente entre 1 ~ 113",
  },
  "2584": {
    en: "Input only between 0 ~ 113",
    es: "Ingrese solo entre 0 y 113",
    pt: "Entrada somente entre 0 ~ 113",
  },
  "2585": {
    en: "Invalid device address.",
    es: "Dirección de dispositivo inválida.",
    pt: "Endereço de dispositivo inválido.",
  },
  "2586": {
    en: "Invalid session key.",
    es: "Clave de sesión inválida.",
    pt: "Chave de sessão inválida.",
  },
  "2587": {
    en: "Invalid session key.",
    es: "Clave de sesión inválida.",
    pt: "Chave de sessão inválida.",
  },
  "2589": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 1 ~ 65,535",
  },
  "2590": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 1 ~ 65,535",
  },
  "2591": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 1 ~ 65,535",
  },
  "2592": {
    en: "Input only between 1 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 1 ~ 65,535",
  },
  "2593": {
    en: "Input only between 0 ~ 60",
    es: "Ingrese solo entre 0 y 60",
    pt: "Entrada somente entre 0 ~ 60",
  },
  "2595": {
    en: "Input only between 0 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2596": {
    en: "Input only between 0 ~ 65,535",
    es: "Ingrese solo entre 1 y 65,535",
    pt: "Entrada somente entre 0 ~ 65,535",
  },
  "2597": {
    en: "Input only between 0 ~ 250",
    es: "Ingrese solo entre 0 y 250",
    pt: "Entrada somente entre 0 ~ 250",
  },
  "2613": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "2614": {
    en: "- Input only between -55 ~ 125\r\n- High temperature must be higher than low temperature.",
    es: "- Ingrese solo entre -55 y 125\r\n- La temperatura alta debe ser mayor que la temperatura baja.",
    pt: "- Entrada somente entre -55 ~ 125\r\n- A temperatura alta deve ser maior que a temperatura baixa.",
  },
  "2615": {
    en: "- Input only between 0 ~ 100\r\n- High humidity must be higher than low humidity.",
    es: "- Ingrese solo entre 0 y 100\r\n- La humedad alta debe ser mayor que la humedad baja.",
    pt: "- Entrada somente entre 0 ~ 100\r\n- A umidade alta deve ser maior que a umidade baixa.",
  },
  "2616": {
    en: "- Input only between 0 ~ 100\r\n- High humidity must be higher than low humidity.",
    es: "- Ingrese solo entre 0 y 100\r\n- La humedad alta debe ser mayor que la humedad baja.",
    pt: "- Entrada somente entre 0 ~ 100\r\n- A umidade alta deve ser maior que a umidade baixa.",
  },
  "2618": {
    en: "Input only between 10 ~ 1,440",
    es: "Ingrese solo entre 10 y 1,440",
    pt: "Entrada somente entre 10 ~ 1,440",
  },
  "2619": {
    en: "Input only between 10 ~ 1,440",
    es: "Ingrese solo entre 10 y 1,440",
    pt: "Entrada somente entre 10 ~ 1,440",
  },
  "2620": {
    en: "Input only between 10 ~ 1,440",
    es: "Ingrese solo entre 10 y 1,440",
    pt: "Entrada somente entre 10 ~ 1,440",
  },
  "2707": {
    en: "Input only between 5 ~ 60",
    es: "Ingrese solo entre 5 y 60",
    pt: "Entrada somente entre 5 ~ 60",
  },
  "2800": {
    en: "Input only between 0 ~ 60",
    es: "Ingrese solo entre 0 y 60",
    pt: "Entrada somente entre 0 ~ 60",
  },
  "2801": {
    en: "Input only between 0 ~ 60,000",
    es: "Ingrese solo entre 0 y 60,000",
    pt: "Entrada somente entre 0 ~ 60,000",
  },
  "2802": {
    en: "Input only between 0 ~ 15",
    es: "Ingrese solo entre 0 y 15",
    pt: "Entrada somente entre 0 ~ 15",
  },
  "2803": {
    en: "Input only between 1 ~ 60",
    es: "Ingrese solo entre 0 y 60",
    pt: "Entrada somente entre 0 ~ 60",
  },
  "2804": {
    en: "Input only between 0 ~ 60,000",
    es: "Ingrese solo entre 0 y 60,000",
    pt: "Entrada somente entre 0 ~ 60,000",
  },
  "2805": {
    en: "Input only between 6 ~ 25",
    es: "Ingrese solo entre 6 y 25",
    pt: "Entrada somente entre 6 ~ 25",
  },
  "2806": {
    en: "Input only between 1 ~ 300",
    es: "Ingrese solo entre 1 y 300",
    pt: "Entrada somente entre 1 ~ 300",
  },
  "2809": {
    en: "Input only between 10 ~ 600",
    es: "Ingrese solo entre 10 y 600",
    pt: "Entrada somente entre 10 ~ 600",
  },
  "2810": {
    en: "Characters A-Z, a-z, 0-9 are allowed and length should be 32.",
    es: "Se permiten caracteres A-Z, a-z, 0-9 y la longitud debe ser de 32.",
    pt: "Se permiten los caracteres A-Z, a-z, 0-9 y la longitud debe ser de 32.",
  },
  "3001": {
    en: "Invalid Password.",
    es: "Contraseña inválida.",
    pt: "Senha inválida.",
  },
  "3002": {
    en: "Must be 6~18 characters long.",
    es: "Debe tener entre 6 y 18 caracteres.",
    pt: "Deve ter entre 6 e 18 caracteres.",
  },
  "3011": {
    en: "Input only between 1 ~ 5",
    es: "Ingrese solo entre 1 y 5",
    pt: "Entrada somente entre 1 ~ 5",
  },
  "3012": {
    en: "Input only between 5 ~ 10",
    es: "Ingrese solo entre 1 y 5",
    pt: "Entrada somente entre 1 ~ 5",
  },
  "4010": {
    en: "Input only between 20 ~ 120",
    es: "Ingrese solo entre 20 y 120",
    pt: "Entrada somente entre 20 ~ 120",
  },
  "4011": {
    en: "Input only between 20 ~ 120",
    es: "Ingrese solo entre 20 y 120",
    pt: "Entrada somente entre 20 ~ 120",
  },
  "4012": {
    en: "Input only between 20 ~ 86,380",
    es: "Ingrese solo entre 20 y 86,380",
    pt: "Entrada somente entre 20 ~ 86,380",
  },
  "4013": {
    en: "Input only between 20 ~ 120",
    es: "Ingrese solo entre 20 y 120",
    pt: "Entrada somente entre 20 ~ 120",
  },
  "4014": {
    en: "Input only between 20 ~ 120",
    es: "Ingrese solo entre 20 y 120",
    pt: "Entrada somente entre 20 ~ 120",
  },
  "4020": {
    en: "Input only between 0 ~ 5",
    es: "Ingrese solo entre 0 y 5",
    pt: "Entrada somente entre 0 ~ 5",
  },
  "4026": {
    en: "Input only between 1 ~ 144",
    es: "Ingrese solo entre 1 y 144",
    pt: "Entrada somente entre 1 ~ 144",
  },
  "4027": {
    en: "Input only between 1 ~ 144",
    es: "Ingrese solo entre 1 y 144",
    pt: "Entrada somente entre 1 ~ 144",
  },
  "4201": {
    en: "Input only between 1 ~ 9,999",
    es: "Ingrese solo entre 0 y 9,999",
    pt: "Entrada somente entre 0 ~ 9.999",
  },
  "4202": {
    en: "Input only between 1 ~ 9,999",
    es: "Ingrese solo entre 0 y 255",
    pt: "Entrada somente entre 0 ~ 255",
  },
  "4205": {
    en: "Input only between 0 ~ 9,999",
    es: "Ingrese solo entre 0 y 9,999",
    pt: "Entrada somente entre 0 ~ 9.999",
  },
  "4207": {
    en: "Input only between 3 ~ 999",
    es: "Ingrese solo entre 3 y 999",
    pt: "Entrada somente entre 3 ~ 999",
  },
  "4208": {
    en: "Input only between 0 ~ 9,999",
    es: "Ingrese solo entre 0 y 9,999",
    pt: "Entrada somente entre 0 ~ 9,999",
  },
  "0202": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-./" are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-./"',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-./" são permitidos.',
  },
  "0120": {
    en: "Input only between 10 ~ 300",
    es: "Ingrese solo entre 10 y 300",
    pt: "Entrada somente entre 10 ~ 300",
  },
  "0522": {
    en: "Input only between 0 ~ 14,400",
    es: "Ingrese solo entre 0 y 14,400",
    pt: "Entrada somente entre 0 ~ 14,400",
  },
  "0530": {
    en: "Input only 0 or between 100 ~ 30,000",
    es: "Ingrese solo entre 0 y 30,000",
    pt: "Entrada somente entre 0 ~ 30,000",
  },
  "0701": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "0753": {
    en: "Input only between 30 ~ 65,535",
    es: "Ingrese solo entre 30 y 65,535",
    pt: "Entrada somente entre 30 ~ 65,535",
  },
  "0908": {
    en: "Input only between 0 ~ 1,440",
    es: "Ingrese solo entre 0 y 1,440",
    pt: "Entrada somente entre 0 ~ 1,440",
  },
  "0740": {
    en: "Input only between 0 ~ 120",
    es: "Ingrese solo entre 0 y 120",
    pt: "Entrada somente entre 0 ~ 120",
  },
  "0741": {
    en: "Input only between 0 ~ 120",
    es: "Ingrese solo entre 0 y 120",
    pt: "Entrada somente entre 0 ~ 120",
  },
  "0742": {
    en: "Input only between 0 ~ 49",
    es: "Ingrese solo entre 0 y 49",
    pt: "Entrada somente entre 0 ~ 49",
  },
  "0743": {
    en: "Input only between 230 ~ 260",
    es: "Ingrese solo entre 230 y 260",
    pt: "Entrada somente entre 230 ~ 260",
  },
  "0744": {
    en: "Input only between 0 ~ 63",
    es: "Ingrese solo entre 0 y 63",
    pt: "Entrada somente entre 0 ~ 63",
  },
  "0745": {
    en: "Input only between 0 ~ 73",
    es: "Ingrese solo entre 0 y 73",
    pt: "Entrada somente entre 0 ~ 73",
  },
  "0746": {
    en: "Input only between 5 ~ 600",
    es: "Ingrese solo entre 5 y 600",
    pt: "Entrada somente entre 5 ~ 600",
  },
  "0769": {
    en: "Input only between 0 ~ 600",
    es: "Ingrese solo entre 0 y 600",
    pt: "Entrada somente entre 0 ~ 600",
  },
  "0777": {
    en: "Input only between -90 ~ -25",
    es: "Ingrese solo entre -90 y -25",
    pt: "Entrada somente entre -90 ~ -25",
  },
  "0793": {
    en: "Input only between 0 ~ 31",
    es: "Ingrese solo entre 0 y 31",
    pt: "Entrada somente entre 0 ~ 31",
  },
  "0794": {
    en: "Input only between -140 ~ -44",
    es: "Ingrese solo entre -140 y -44",
    pt: "Entrada somente entre -140 ~ -44",
  },
  "0795": {
    en: "Input only between -19 ~ -3",
    es: "Ingrese solo entre -19 y -3",
    pt: "Entrada somente entre -19 ~ -3",
  },
  "0796": {
    en: "Input only between 0 ~ 63",
    es: "Ingrese solo entre 0 y 63",
    pt: "Entrada somente entre 0 ~ 63",
  },
  "0798": {
    en: "Input only between -110 ~ -50",
    es: "Ingrese solo entre -110 y 50",
    pt: "Entrada somente entre -110 ~ 50",
  },
  "0426": {
    en: "Input only between 0 ~ 200",
    es: "Ingrese solo entre 0 y 200",
    pt: "Entrada somente entre 0 ~ 200",
  },
  "0503": {
    en: "Input only between 0 ~ 4,000,000,000",
    es: "Ingrese solo entre 0 y 4,000,000,000",
    pt: "Entrada somente entre 0 ~ 4,000,000,000",
  },
  "0505": {
    en: "Input only between 0 ~ 9,999,999",
    es: "Ingrese solo entre 0 y 9,999,999",
    pt: "Entrada somente entre 0 ~ 9,999,999",
  },
  "0750": {
    en: "Input only between 0 ~ 300",
    es: "Ingrese solo entre 0 y 300",
    pt: "Entrada somente entre 0 ~ 300",
  },
  "0422": {
    en: "Input only between 0 ~ 7,200",
    es: "Ingrese solo entre 0 y 7,200",
    pt: "Entrada somente entre 0 ~ 7,200",
  },
  "0519": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "0518": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "0758": {
    en: 'Characters A-Z, a-z, 0-9, and symbols "-." are allowed.',
    es: 'Se permiten caracteres A-Z, a-z, 0-9, y símbolos "-."',
    pt: 'Caracteres A-Z, a-z, 0-9 e símbolos "-." são permitidos.',
  },
  "0710": {
    en: "Input only between 7 ~ 12",
    es: "Ingrese solo entre 7 y 12",
    pt: "Entrada somente entre 7 ~ 12",
  },
};
