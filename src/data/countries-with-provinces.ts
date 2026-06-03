type AddressCountries = {
  [key: string]: {
    code: string
    provinces?: {
      [key: string]: {
        label?: string
        code: string
        alternate_names?: string[]
      }
    }
  }
}

export const countries: AddressCountries = {
  Afghanistan: {
    code: "AF",
  },
  "Aland Islands": {
    code: "AX",
  },
  Albania: {
    code: "AL",
  },
  Algeria: {
    code: "DZ",
  },
  Andorra: {
    code: "AD",
  },
  Angola: {
    code: "AO",
  },
  Anguilla: {
    code: "AI",
  },
  "Antigua And Barbuda": {
    code: "AG",
  },
  Argentina: {
    code: "AR",
    provinces: {
      "Ciudad Autónoma de Buenos Aires": {
        label: "Buenos Aires (Autonomous City)",
        alternate_names: ["Ciudad Autonoma de Buenos Aires"],
        code: "C",
      },
      "Buenos Aires": {
        label: "Buenos Aires Province",
        code: "B",
      },
      Catamarca: {
        code: "K",
      },
      Chaco: {
        code: "H",
      },
      Chubut: {
        code: "U",
      },
      Córdoba: {
        alternate_names: ["Cordoba"],
        code: "X",
      },
      Corrientes: {
        code: "W",
      },
      "Entre Ríos": {
        alternate_names: ["Entre Rios"],
        code: "E",
      },
      Formosa: {
        code: "P",
      },
      Jujuy: {
        code: "Y",
      },
      "La Pampa": {
        code: "L",
      },
      "La Rioja": {
        code: "F",
      },
      Mendoza: {
        code: "M",
      },
      Misiones: {
        code: "N",
      },
      Neuquén: {
        alternate_names: ["Neuquen"],
        code: "Q",
      },
      "Río Negro": {
        alternate_names: ["Rio Negro"],
        code: "R",
      },
      Salta: {
        code: "A",
      },
      "San Juan": {
        code: "J",
      },
      "San Luis": {
        code: "D",
      },
      "Santa Cruz": {
        code: "Z",
      },
      "Santa Fe": {
        code: "S",
      },
      "Santiago Del Estero": {
        label: "Santiago del Estero",
        code: "G",
      },
      "Tierra Del Fuego": {
        label: "Tierra del Fuego",
        code: "V",
      },
      Tucumán: {
        alternate_names: ["Tucuman"],
        code: "T",
      },
    },
  },
  Armenia: {
    code: "AM",
  },
  Aruba: {
    code: "AW",
  },
  "Ascension Island": {
    code: "AC",
  },
  Australia: {
    code: "AU",
    provinces: {
      "Australian Capital Territory": {
        code: "ACT",
      },
      "New South Wales": {
        code: "NSW",
      },
      "Northern Territory": {
        code: "NT",
      },
      Queensland: {
        code: "QLD",
      },
      "South Australia": {
        code: "SA",
      },
      Tasmania: {
        code: "TAS",
      },
      Victoria: {
        code: "VIC",
      },
      "Western Australia": {
        code: "WA",
      },
    },
  },
  Austria: {
    code: "AT",
  },
  Azerbaijan: {
    code: "AZ",
  },
  Bahamas: {
    code: "BS",
  },
  Bahrain: {
    code: "BH",
  },
  Bangladesh: {
    code: "BD",
  },
  Barbados: {
    code: "BB",
  },
  Belarus: {
    code: "BY",
  },
  Belgium: {
    code: "BE",
  },
  Belize: {
    code: "BZ",
  },
  Benin: {
    code: "BJ",
  },
  Bermuda: {
    code: "BM",
  },
  Bhutan: {
    code: "BT",
  },
  Bolivia: {
    code: "BO",
  },
  "Bosnia And Herzegovina": {
    code: "BA",
  },
  Botswana: {
    code: "BW",
  },
  "Bouvet Island": {
    code: "BV",
  },
  Brazil: {
    code: "BR",
    provinces: {
      Acre: {
        code: "AC",
      },
      Alagoas: {
        code: "AL",
      },
      Amapá: {
        alternate_names: ["Amapa"],
        code: "AP",
      },
      Amazonas: {
        code: "AM",
      },
      Bahia: {
        code: "BA",
      },
      Ceará: {
        alternate_names: ["Ceara"],
        code: "CE",
      },
      "Espírito Santo": {
        alternate_names: ["Espirito Santo"],
        code: "ES",
      },
      "Distrito Federal": {
        label: "Federal District",
        code: "DF",
      },
      Goiás: {
        alternate_names: ["Goias"],
        code: "GO",
      },
      Maranhão: {
        alternate_names: ["Maranhao"],
        code: "MA",
      },
      "Mato Grosso": {
        code: "MT",
      },
      "Mato Grosso do Sul": {
        code: "MS",
      },
      "Minas Gerais": {
        code: "MG",
      },
      Pará: {
        alternate_names: ["Para"],
        code: "PA",
      },
      Paraíba: {
        alternate_names: ["Paraiba"],
        code: "PB",
      },
      Paraná: {
        alternate_names: ["Parana"],
        code: "PR",
      },
      Pernambuco: {
        code: "PE",
      },
      Piauí: {
        alternate_names: ["Piaui"],
        code: "PI",
      },
      "Rio Grande do Norte": {
        code: "RN",
      },
      "Rio Grande do Sul": {
        code: "RS",
      },
      "Rio de Janeiro": {
        code: "RJ",
      },
      Rondônia: {
        alternate_names: ["Rondonia"],
        code: "RO",
      },
      Roraima: {
        code: "RR",
      },
      "Santa Catarina": {
        code: "SC",
      },
      "São Paulo": {
        alternate_names: ["Sao Paulo"],
        code: "SP",
      },
      Sergipe: {
        code: "SE",
      },
      Tocantins: {
        code: "TO",
      },
    },
  },
  "British Indian Ocean Territory": {
    code: "IO",
  },
  Brunei: {
    code: "BN",
  },
  Bulgaria: {
    code: "BG",
  },
  "Burkina Faso": {
    code: "BF",
  },
  Burundi: {
    code: "BI",
  },
  Cambodia: {
    code: "KH",
  },
  Canada: {
    code: "CA",
    provinces: {
      Alberta: {
        code: "AB",
      },
      "British Columbia": {
        code: "BC",
      },
      Manitoba: {
        code: "MB",
      },
      "New Brunswick": {
        code: "NB",
      },
      "Newfoundland and Labrador": {
        alternate_names: ["Newfoundland"],
        code: "NL",
      },
      "Northwest Territories": {
        code: "NT",
      },
      "Nova Scotia": {
        code: "NS",
      },
      Nunavut: {
        code: "NU",
      },
      Ontario: {
        code: "ON",
      },
      "Prince Edward Island": {
        code: "PE",
      },
      Quebec: {
        alternate_names: ["Québec"],
        code: "QC",
      },
      Saskatchewan: {
        code: "SK",
      },
      Yukon: {
        code: "YT",
      },
    },
  },
  "Cape Verde": {
    code: "CV",
  },
  "Caribbean Netherlands": {
    code: "BQ",
  },
  "Cayman Islands": {
    code: "KY",
  },
  "Central African Republic": {
    code: "CF",
  },
  Chad: {
    code: "TD",
  },
  Chile: {
    code: "CL",
    provinces: {
      "Arica and Parinacota": {
        label: "Arica y Parinacota",
        alternate_names: [
          "Arica y Parinacota",
          "Región de Arica y Parinacota",
          "Region de Arica y Parinacota",
        ],
        code: "AP",
      },
      Tarapacá: {
        alternate_names: [
          "Tarapaca",
          "Región de Tarapacá",
          "Region de Tarapaca",
        ],
        code: "TA",
      },
      Antofagasta: {
        alternate_names: ["Región de Antofagasta", "Region de Antofagasta"],
        code: "AN",
      },
      Atacama: {
        alternate_names: ["Región de Atacama", "Region de Atacama"],
        code: "AT",
      },
      Coquimbo: {
        alternate_names: ["Región de Coquimbo", "Region de Coquimbo"],
        code: "CO",
      },
      Valparaíso: {
        alternate_names: [
          "Valparaiso",
          "Región de Valparaíso",
          "Region de Valparaiso",
        ],
        code: "VS",
      },
      Santiago: {
        label: "Santiago Metropolitan",
        alternate_names: [
          "Región Metropolitana",
          "Region Metropolitana",
          "Región Metropolitana de Santiago",
          "Region Metropolitana de Santiago",
        ],
        code: "RM",
      },
      "O'Higgins": {
        label: "Libertador General Bernardo O’Higgins",
        alternate_names: [
          "Región del Libertador General Bernardo O'Higgins",
          "Region del Libertador General Bernardo O'Higgins",
        ],
        code: "LI",
      },
      Maule: {
        alternate_names: ["Región del Maule", "Region del Maule"],
        code: "ML",
      },
      Ñuble: {
        alternate_names: ["Nuble", "Región de Ñuble", "Region de Nuble"],
        code: "NB",
      },
      Biobío: {
        label: "Bío Bío",
        alternate_names: ["Biobio", "Región del Biobío", "Region del Biobio"],
        code: "BI",
      },
      Araucanía: {
        alternate_names: [
          "Araucania",
          "Región de La Araucanía",
          "Region de La Araucania",
        ],
        code: "AR",
      },
      "Los Ríos": {
        alternate_names: [
          "Los Rios",
          "Región de Los Ríos",
          "Region de Los Rios",
        ],
        code: "LR",
      },
      "Los Lagos": {
        alternate_names: ["Región de Los Lagos", "Region de Los Lagos"],
        code: "LL",
      },
      Aysén: {
        alternate_names: [
          "Aysen",
          "Región Aysén del General Carlos Ibáñez del Campo",
          "Region Aysen del General Carlos Ibanez del Campo",
        ],
        code: "AI",
      },
      Magallanes: {
        label: "Magallanes Region",
        alternate_names: [
          "Magallanes y la Antártica Chilena",
          "Magallanes y la Antartica Chilena",
          "Magallanes and Chilean Antarctica",
          "Región de Magallanes y de la Antártica Chilena",
          "Region de Magallanes y de la Antartica Chilena",
        ],
        code: "MA",
      },
    },
  },
  China: {
    code: "CN",
    provinces: {
      Anhui: {
        alternate_names: ["安徽"],
        code: "AH",
      },
      Beijing: {
        alternate_names: ["北京"],
        code: "BJ",
      },
      Chongqing: {
        alternate_names: ["重庆"],
        code: "CQ",
      },
      Fujian: {
        alternate_names: ["福建"],
        code: "FJ",
      },
      Gansu: {
        alternate_names: ["甘肃"],
        code: "GS",
      },
      Guangdong: {
        alternate_names: ["广东"],
        code: "GD",
      },
      Guangxi: {
        alternate_names: ["广西"],
        code: "GX",
      },
      Guizhou: {
        alternate_names: ["贵州"],
        code: "GZ",
      },
      Hainan: {
        alternate_names: ["海南"],
        code: "HI",
      },
      Hebei: {
        alternate_names: ["河北"],
        code: "HE",
      },
      Heilongjiang: {
        alternate_names: ["黑龙江"],
        code: "HL",
      },
      Henan: {
        alternate_names: ["河南"],
        code: "HA",
      },
      Hubei: {
        alternate_names: ["湖北"],
        code: "HB",
      },
      Hunan: {
        alternate_names: ["湖南"],
        code: "HN",
      },
      "Inner Mongolia": {
        alternate_names: ["内蒙古", "Nei Mongol"],
        code: "NM",
      },
      Jiangsu: {
        alternate_names: ["江苏"],
        code: "JS",
      },
      Jiangxi: {
        alternate_names: ["江西"],
        code: "JX",
      },
      Jilin: {
        alternate_names: ["吉林"],
        code: "JL",
      },
      Liaoning: {
        alternate_names: ["辽宁"],
        code: "LN",
      },
      Ningxia: {
        alternate_names: ["宁夏"],
        code: "NX",
      },
      Qinghai: {
        alternate_names: ["青海"],
        code: "QH",
      },
      Shaanxi: {
        alternate_names: ["陕西"],
        code: "SN",
      },
      Shandong: {
        alternate_names: ["山东"],
        code: "SD",
      },
      Shanghai: {
        alternate_names: ["上海"],
        code: "SH",
      },
      Shanxi: {
        alternate_names: ["山西"],
        code: "SX",
      },
      Sichuan: {
        alternate_names: ["四川"],
        code: "SC",
      },
      Tianjin: {
        alternate_names: ["天津"],
        code: "TJ",
      },
      Xizang: {
        label: "Tibet",
        alternate_names: ["西藏", "Tibet"],
        code: "YZ",
      },
      Xinjiang: {
        alternate_names: ["新疆"],
        code: "XJ",
      },
      Yunnan: {
        alternate_names: ["云南"],
        code: "YN",
      },
      Zhejiang: {
        alternate_names: ["浙江"],
        code: "ZJ",
      },
    },
  },
  "Christmas Island": {
    code: "CX",
  },
  "Cocos (Keeling) Islands": {
    code: "CC",
  },
  Colombia: {
    code: "CO",
    provinces: {
      "Bogotá, D.C.": {
        label: "Capital District",
        alternate_names: [
          "Bogota, D.C.",
          "Bogotá",
          "Bogota",
          "Capital District",
          "Distrito Capital de Bogotá",
          "Distrito Capital de Bogota",
        ],
        code: "DC",
      },
      Amazonas: {
        code: "AMA",
      },
      Antioquia: {
        code: "ANT",
      },
      Arauca: {
        code: "ARA",
      },
      Atlántico: {
        alternate_names: ["Atlantico"],
        code: "ATL",
      },
      Bolívar: {
        alternate_names: ["Bolivar"],
        code: "BOL",
      },
      Boyacá: {
        alternate_names: ["Boyaca"],
        code: "BOY",
      },
      Caldas: {
        code: "CAL",
      },
      Caquetá: {
        alternate_names: ["Caqueta"],
        code: "CAQ",
      },
      Casanare: {
        code: "CAS",
      },
      Cauca: {
        code: "CAU",
      },
      Cesar: {
        code: "CES",
      },
      Chocó: {
        alternate_names: ["Choco"],
        code: "CHO",
      },
      Córdoba: {
        alternate_names: ["Cordoba"],
        code: "COR",
      },
      Cundinamarca: {
        code: "CUN",
      },
      Guainía: {
        alternate_names: ["Guainia"],
        code: "GUA",
      },
      Guaviare: {
        code: "GUV",
      },
      Huila: {
        code: "HUI",
      },
      "La Guajira": {
        code: "LAG",
      },
      Magdalena: {
        code: "MAG",
      },
      Meta: {
        code: "MET",
      },
      Nariño: {
        alternate_names: ["Narino"],
        code: "NAR",
      },
      "Norte de Santander": {
        code: "NSA",
      },
      Putumayo: {
        code: "PUT",
      },
      Quindío: {
        alternate_names: ["Quindio"],
        code: "QUI",
      },
      Risaralda: {
        code: "RIS",
      },
      "San Andrés, Providencia y Santa Catalina": {
        label: "San Andrés & Providencia",
        alternate_names: [
          "San Andres, Providencia y Santa Catalina",
          "San Andrés y Providencia",
          "San Andres y Providencia",
        ],
        code: "SAP",
      },
      Santander: {
        code: "SAN",
      },
      Sucre: {
        code: "SUC",
      },
      Tolima: {
        code: "TOL",
      },
      "Valle del Cauca": {
        code: "VAC",
      },
      Vaupés: {
        alternate_names: ["Vaupes"],
        code: "VAU",
      },
      Vichada: {
        code: "VID",
      },
    },
  },
  Comoros: {
    code: "KM",
  },
  Congo: {
    code: "CG",
  },
  "Congo, The Democratic Republic Of The": {
    code: "CD",
  },
  "Cook Islands": {
    code: "CK",
  },
  "Costa Rica": {
    code: "CR",
  },
  Croatia: {
    code: "HR",
  },
  Cuba: {
    code: "CU",
  },
  Curaçao: {
    code: "CW",
  },
  Cyprus: {
    code: "CY",
  },
  "Czech Republic": {
    code: "CZ",
  },
  "Côte d'Ivoire": {
    code: "CI",
  },
  Denmark: {
    code: "DK",
  },
  Djibouti: {
    code: "DJ",
  },
  Dominica: {
    code: "DM",
  },
  "Dominican Republic": {
    code: "DO",
  },
  Ecuador: {
    code: "EC",
  },
  Egypt: {
    code: "EG",
    provinces: {
      "6th of October": {
        alternate_names: ["As Sādis min Uktūbar", "As Sadis min Uktubar"],
        code: "SU",
      },
      "Al Sharqia": {
        alternate_names: ["Ash Sharqīyah", "Ash Sharqiyah"],
        code: "SHR",
      },
      Alexandria: {
        alternate_names: ["Al Iskandarīyah", "Al Iskandariyah"],
        code: "ALX",
      },
      Aswan: {
        alternate_names: ["Aswān"],
        code: "ASN",
      },
      Asyut: {
        alternate_names: ["Asyūţ"],
        code: "AST",
      },
      Beheira: {
        alternate_names: ["Al Buḩayrah", "Al Buayrah"],
        code: "BH",
      },
      "Beni Suef": {
        alternate_names: ["Banī Suwayf", "Bani Suwayf"],
        code: "BNS",
      },
      Cairo: {
        alternate_names: ["Al Qāhirah", "Al Qahirah"],
        code: "C",
      },
      Dakahlia: {
        alternate_names: ["Ad Daqahlīyah", "Ad Daqahliyah"],
        code: "DK",
      },
      Damietta: {
        alternate_names: ["Dumyāţ", "Dumyat"],
        code: "DT",
      },
      Faiyum: {
        alternate_names: ["Al Fayyūm", "Al Fayyum"],
        code: "FYM",
      },
      Gharbia: {
        alternate_names: ["Al Gharbīyah", "Al Gharbiyah"],
        code: "GH",
      },
      Giza: {
        alternate_names: ["Al Jīzah", "Al Jizah"],
        code: "GZ",
      },
      Helwan: {
        alternate_names: ["Ḩulwān", "ulwan"],
        code: "HU",
      },
      Ismailia: {
        alternate_names: ["Al Ismāٰīlīyah", "Al Ismailiyah"],
        code: "IS",
      },
      "Kafr el-Sheikh": {
        alternate_names: ["Kafr ash Shaykh"],
        code: "KFS",
      },
      Luxor: {
        alternate_names: ["Al Uqşur", "Al Uqsur"],
        code: "LX",
      },
      Matrouh: {
        alternate_names: ["Maţrūḩ", "Matru"],
        code: "MT",
      },
      Minya: {
        alternate_names: ["Al Minyā", "Al Minya"],
        code: "MN",
      },
      Monufia: {
        alternate_names: ["Al Minūfīyah", "Al Minufiyah"],
        code: "MNF",
      },
      "New Valley": {
        alternate_names: ["Al Wādī al Jadīd", "Al Wadi al Jadid"],
        code: "WAD",
      },
      "North Sinai": {
        alternate_names: ["Shamāl Sīnā", "Shamal Sina"],
        code: "SIN",
      },
      "Port Said": {
        alternate_names: ["Būr Saٰīd", "Bur Said"],
        code: "PTS",
      },
      Qalyubia: {
        alternate_names: ["Al Qalyūbīyah", "Al Qalyubiyah"],
        code: "KB",
      },
      Qena: {
        alternate_names: ["Qinā", "Qina"],
        code: "KN",
      },
      "Red Sea": {
        alternate_names: ["Al Baḩr al Aḩmar", "Al Bar al Amar"],
        code: "BA",
      },
      Sohag: {
        alternate_names: ["Sūhāj", "Suhaj"],
        code: "SHG",
      },
      "South Sinai": {
        alternate_names: ["Janūb Sīnā", "Janub Sina"],
        code: "JS",
      },
      Suez: {
        alternate_names: ["As Suways"],
        code: "SUZ",
      },
    },
  },
  "El Salvador": {
    code: "SV",
  },
  "Equatorial Guinea": {
    code: "GQ",
  },
  Eritrea: {
    code: "ER",
  },
  Estonia: {
    code: "EE",
  },
  Eswatini: {
    code: "SZ",
  },
  Ethiopia: {
    code: "ET",
  },
  "Falkland Islands (Malvinas)": {
    code: "FK",
  },
  "Faroe Islands": {
    code: "FO",
  },
  Fiji: {
    code: "FJ",
  },
  Finland: {
    code: "FI",
  },
  France: {
    code: "FR",
  },
  "French Guiana": {
    code: "GF",
  },
  "French Polynesia": {
    code: "PF",
  },
  "French Southern Territories": {
    code: "TF",
  },
  Gabon: {
    code: "GA",
  },
  Gambia: {
    code: "GM",
  },
  Georgia: {
    code: "GE",
  },
  Germany: {
    code: "DE",
  },
  Ghana: {
    code: "GH",
  },
  Gibraltar: {
    code: "GI",
  },
  Greece: {
    code: "GR",
  },
  Greenland: {
    code: "GL",
  },
  Grenada: {
    code: "GD",
  },
  Guadeloupe: {
    code: "GP",
  },
  Guatemala: {
    code: "GT",
    provinces: {
      "Alta Verapaz": {
        code: "AVE",
      },
      "Baja Verapaz": {
        code: "BVE",
      },
      Chimaltenango: {
        code: "CMT",
      },
      Chiquimula: {
        code: "CQM",
      },
      "El Progreso": {
        code: "EPR",
      },
      Escuintla: {
        code: "ESC",
      },
      Guatemala: {
        code: "GUA",
      },
      Huehuetenango: {
        code: "HUE",
      },
      Izabal: {
        code: "IZA",
      },
      Jalapa: {
        code: "JAL",
      },
      Jutiapa: {
        code: "JUT",
      },
      Petén: {
        alternate_names: ["Peten"],
        code: "PET",
      },
      Quetzaltenango: {
        code: "QUE",
      },
      Quiché: {
        alternate_names: ["Quiche"],
        code: "QUI",
      },
      Retalhuleu: {
        code: "RET",
      },
      Sacatepéquez: {
        alternate_names: ["Sacatepequez"],
        code: "SAC",
      },
      "San Marcos": {
        code: "SMA",
      },
      "Santa Rosa": {
        code: "SRO",
      },
      Sololá: {
        alternate_names: ["Solola"],
        code: "SOL",
      },
      Suchitepéquez: {
        alternate_names: ["Suchitepequez"],
        code: "SUC",
      },
      Totonicapán: {
        alternate_names: ["Totonicapan"],
        code: "TOT",
      },
      Zacapa: {
        code: "ZAC",
      },
    },
  },
  Guernsey: {
    code: "GG",
  },
  Guinea: {
    code: "GN",
  },
  "Guinea Bissau": {
    code: "GW",
  },
  Guyana: {
    code: "GY",
  },
  Haiti: {
    code: "HT",
  },
  "Heard Island And Mcdonald Islands": {
    code: "HM",
  },
  "Holy See (Vatican City State)": {
    code: "VA",
  },
  Honduras: {
    code: "HN",
  },
  "Hong Kong": {
    code: "HK",
    provinces: {
      "Hong Kong Island": {
        alternate_names: ["Hong Kong Province", "Hong Kong", "香港", "香港島"],
        code: "HK",
      },
      Kowloon: {
        alternate_names: ["九龍"],
        code: "KL",
      },
      "New Territories": {
        alternate_names: ["新界"],
        code: "NT",
      },
    },
  },
  Hungary: {
    code: "HU",
  },
  Iceland: {
    code: "IS",
  },
  India: {
    code: "IN",
    provinces: {
      "Andaman and Nicobar Islands": {
        alternate_names: ["Andaman and Nicobar"],
        code: "AN",
      },
      "Andhra Pradesh": {
        code: "AP",
      },
      "Arunachal Pradesh": {
        code: "AR",
      },
      Assam: {
        code: "AS",
      },
      Bihar: {
        code: "BR",
      },
      Chandigarh: {
        code: "CH",
      },
      Chhattisgarh: {
        alternate_names: ["Chattisgarh", "CT"],
        code: "CG",
      },
      "Dadra and Nagar Haveli": {
        code: "DN",
      },
      "Daman and Diu": {
        code: "DD",
      },
      Delhi: {
        code: "DL",
      },
      Goa: {
        code: "GA",
      },
      Gujarat: {
        code: "GJ",
      },
      Haryana: {
        code: "HR",
      },
      "Himachal Pradesh": {
        code: "HP",
      },
      "Jammu and Kashmir": {
        code: "JK",
      },
      Jharkhand: {
        code: "JH",
      },
      Karnataka: {
        code: "KA",
      },
      Kerala: {
        code: "KL",
      },
      Ladakh: {
        code: "LA",
      },
      Lakshadweep: {
        code: "LD",
      },
      "Madhya Pradesh": {
        code: "MP",
      },
      Maharashtra: {
        code: "MH",
      },
      Manipur: {
        code: "MN",
      },
      Meghalaya: {
        code: "ML",
      },
      Mizoram: {
        code: "MZ",
      },
      Nagaland: {
        code: "NL",
      },
      Odisha: {
        alternate_names: ["OD", "Orissa"],
        code: "OR",
      },
      Puducherry: {
        code: "PY",
      },
      Punjab: {
        code: "PB",
      },
      Rajasthan: {
        code: "RJ",
      },
      Sikkim: {
        code: "SK",
      },
      "Tamil Nadu": {
        code: "TN",
      },
      Telangana: {
        code: "TS",
      },
      Tripura: {
        code: "TR",
      },
      "Uttar Pradesh": {
        code: "UP",
      },
      Uttarakhand: {
        code: "UK",
      },
      "West Bengal": {
        code: "WB",
      },
    },
  },
  Indonesia: {
    code: "ID",
    provinces: {
      Aceh: {
        code: "AC",
      },
      Bali: {
        code: "BA",
      },
      "Bangka Belitung": {
        label: "Bangka–Belitung Islands",
        code: "BB",
      },
      Banten: {
        code: "BT",
      },
      Bengkulu: {
        code: "BE",
      },
      "Jawa Tengah": {
        label: "Central Java",
        code: "JT",
      },
      "Kalimantan Tengah": {
        label: "Central Kalimantan",
        code: "KT",
      },
      "Sulawesi Tengah": {
        label: "Central Sulawesi",
        code: "ST",
      },
      "Jawa Timur": {
        label: "East Java",
        code: "JI",
      },
      "Kalimantan Timur": {
        label: "East Kalimantan",
        code: "KI",
      },
      "Nusa Tenggara Timur": {
        label: "East Nusa Tenggara",
        code: "NT",
      },
      Gorontalo: {
        code: "GO",
      },
      Jakarta: {
        code: "JK",
      },
      Jambi: {
        code: "JA",
      },
      Lampung: {
        code: "LA",
      },
      Maluku: {
        code: "MA",
      },
      "Kalimantan Utara": {
        label: "North Kalimantan",
        code: "KU",
      },
      "Maluku Utara": {
        label: "North Maluku",
        code: "MU",
      },
      "Sulawesi Utara": {
        label: "North Sulawesi",
        code: "SA",
      },
      "North Sumatra": {
        alternate_names: ["Sumatra Utara"],
        code: "SU",
      },
      Papua: {
        code: "PA",
      },
      Riau: {
        code: "RI",
      },
      "Kepulauan Riau": {
        label: "Riau Islands",
        code: "KR",
      },
      "Kalimantan Selatan": {
        label: "South Kalimantan",
        code: "KS",
      },
      "Sulawesi Selatan": {
        label: "South Sulawesi",
        code: "SN",
      },
      "South Sumatra": {
        alternate_names: ["Sumatra Selatan"],
        code: "SS",
      },
      "Sulawesi Tenggara": {
        label: "Southeast Sulawesi",
        code: "SG",
      },
      "Jawa Barat": {
        label: "West Java",
        code: "JB",
      },
      "Kalimantan Barat": {
        label: "West Kalimantan",
        code: "KB",
      },
      "Nusa Tenggara Barat": {
        label: "West Nusa Tenggara",
        code: "NB",
      },
      "Papua Barat": {
        label: "West Papua",
        code: "PB",
      },
      "Sulawesi Barat": {
        label: "West Sulawesi",
        code: "SR",
      },
      "West Sumatra": {
        alternate_names: ["Sumatra Barat"],
        code: "SB",
      },
      Yogyakarta: {
        code: "YO",
      },
    },
  },
  "Iran, Islamic Republic Of": {
    code: "IR",
  },
  Iraq: {
    code: "IQ",
  },
  Ireland: {
    code: "IE",
    provinces: {
      Carlow: {
        alternate_names: [
          "Ceatharlach",
          "Contae Cheatharlach",
          "County Carlow",
          "Co. Carlow",
        ],
        code: "CW",
      },
      Cavan: {
        alternate_names: [
          "An Cabhán",
          "An Cabhan",
          "Contae an Chabháin",
          "Contae an Chabhain",
          "County Cavan",
          "Co. Cavan",
        ],
        code: "CN",
      },
      Clare: {
        alternate_names: [
          "An Clár",
          "An Clar",
          "Contae an Chláir",
          "Contae an Chlair",
          "County Clare",
          "Co. Clare",
        ],
        code: "CE",
      },
      Cork: {
        alternate_names: [
          "Corcaigh",
          "Contae Chorcaí",
          "Contae Chorcai",
          "County Cork",
          "Co. Cork",
        ],
        code: "CO",
      },
      Donegal: {
        alternate_names: [
          "Dún na nGall",
          "Dun na nGall",
          "Contae Dhún na nGall",
          "Contae Dhun na nGall",
          "County Donegal",
          "Co. Donegal",
        ],
        code: "DL",
      },
      Dublin: {
        alternate_names: [
          "Baile Átha Cliath",
          "Baile Atha Cliath",
          "County Dublin",
          "Co. Dublin",
        ],
        code: "D",
      },
      Galway: {
        alternate_names: [
          "Gaillimh",
          "Contae na Gaillimhe",
          "County Galway",
          "Co. Galway",
        ],
        code: "G",
      },
      Kerry: {
        alternate_names: [
          "Ciarraí",
          "Ciarrai",
          "Contae Chiarraí",
          "Contae Chiarrai",
          "County Kerry",
          "Co. Kerry",
        ],
        code: "KY",
      },
      Kildare: {
        alternate_names: [
          "Cill Dara",
          "Contae Chill Dara",
          "County Kildare",
          "Co. Kildare",
        ],
        code: "KE",
      },
      Kilkenny: {
        alternate_names: [
          "Cill Chainnigh",
          "Contae Chill Chainnigh",
          "County Kilkenny",
          "Co. Kilkenny",
        ],
        code: "KK",
      },
      Laois: {
        alternate_names: ["Contae Laoise", "County Laois", "Co. Laois"],
        code: "LS",
      },
      Leitrim: {
        alternate_names: [
          "Liatroim",
          "Contae Liatroma",
          "County Leitrim",
          "Co. Leitrim",
        ],
        code: "LM",
      },
      Limerick: {
        alternate_names: [
          "Luimneach",
          "Contae Luimnigh",
          "County Limerick",
          "Co. Limerick",
        ],
        code: "LK",
      },
      Longford: {
        alternate_names: [
          "An Longfort",
          "Contae an Longfoirt",
          "County Longford",
          "Co. Longford",
        ],
        code: "LD",
      },
      Louth: {
        alternate_names: [
          "Lú",
          "Lu",
          "Contae Lú",
          "Contae Lu",
          "County Louth",
          "Co. Louth",
        ],
        code: "LH",
      },
      Mayo: {
        alternate_names: [
          "Maigh Eo",
          "Contae Mhaigh Eo",
          "County Mayo",
          "Co. Mayo",
        ],
        code: "MO",
      },
      Meath: {
        alternate_names: [
          "An Mhí",
          "An Mhi",
          "Contae na Mí",
          "Contae na Mi",
          "County Meath",
          "Co. Meath",
        ],
        code: "MH",
      },
      Monaghan: {
        alternate_names: [
          "Muineachán",
          "Muineachan",
          "Contae Mhuineacháin",
          "Contae Mhuineachain",
          "County Monaghan",
          "Co. Monaghan",
        ],
        code: "MN",
      },
      Offaly: {
        alternate_names: [
          "Uíbh Fhailí",
          "Uibh Fhaili",
          "Contae Uíbh Fhailí",
          "Contae Uibh Fhaili",
          "County Offaly",
          "Co. Offaly",
        ],
        code: "OY",
      },
      Roscommon: {
        alternate_names: [
          "Ros Comáin",
          "Ros Comain",
          "Contae Ros Comáin",
          "Contae Ros Comain",
          "County Roscommon",
          "Co. Roscommon",
        ],
        code: "RN",
      },
      Sligo: {
        alternate_names: [
          "Sligeach",
          "Contae Shligigh",
          "County Sligo",
          "Co. Sligo",
        ],
        code: "SO",
      },
      Tipperary: {
        alternate_names: [
          "Tiobraid Árann",
          "Tiobraid Arann",
          "Contae Thiobraid Árann",
          "Contae Thiobraid Arann",
          "County Tipperary",
          "Co. Tipperary",
        ],
        code: "TA",
      },
      Waterford: {
        alternate_names: [
          "Port Láirge",
          "Port Lairge",
          "Contae Phort Láirge",
          "Contae Phort Lairge",
          "County Waterford",
          "Co. Waterford",
        ],
        code: "WD",
      },
      Westmeath: {
        alternate_names: [
          "An Iarmhí",
          "An Iarmhi",
          "Contae na hIarmhí",
          "Contae na hIarmhi",
          "County Westmeath",
          "Co. Westmeath",
        ],
        code: "WH",
      },
      Wexford: {
        alternate_names: [
          "Loch Garman",
          "Contae Loch Garman",
          "County Wexford",
          "Co. Wexford",
        ],
        code: "WX",
      },
      Wicklow: {
        alternate_names: [
          "Cill Mhantáin",
          "Cill Mhantain",
          "Contae Chill Mhantáin",
          "Contae Chill Mhantain",
          "County Wicklow",
          "Co. Wicklow",
        ],
        code: "WW",
      },
    },
  },
  "Isle Of Man": {
    code: "IM",
  },
  Israel: {
    code: "IL",
  },
  Italy: {
    code: "IT",
    provinces: {
      Agrigento: {
        code: "AG",
      },
      Alessandria: {
        code: "AL",
      },
      Ancona: {
        code: "AN",
      },
      Aosta: {
        label: "Aosta Valley",
        code: "AO",
      },
      Arezzo: {
        code: "AR",
      },
      "Ascoli Piceno": {
        code: "AP",
      },
      Asti: {
        code: "AT",
      },
      Avellino: {
        code: "AV",
      },
      Bari: {
        code: "BA",
      },
      "Barletta-Andria-Trani": {
        code: "BT",
      },
      Belluno: {
        code: "BL",
      },
      Benevento: {
        code: "BN",
      },
      Bergamo: {
        code: "BG",
      },
      Biella: {
        code: "BI",
      },
      Bologna: {
        code: "BO",
      },
      Brescia: {
        code: "BS",
      },
      Brindisi: {
        code: "BR",
      },
      Cagliari: {
        code: "CA",
      },
      Caltanissetta: {
        code: "CL",
      },
      Campobasso: {
        code: "CB",
      },
      "Carbonia-Iglesias": {
        code: "CI",
      },
      Caserta: {
        code: "CE",
      },
      Catania: {
        code: "CT",
      },
      Catanzaro: {
        code: "CZ",
      },
      Chieti: {
        code: "CH",
      },
      Como: {
        code: "CO",
      },
      Cosenza: {
        code: "CS",
      },
      Cremona: {
        code: "CR",
      },
      Crotone: {
        code: "KR",
      },
      Cuneo: {
        code: "CN",
      },
      Enna: {
        code: "EN",
      },
      Fermo: {
        code: "FM",
      },
      Ferrara: {
        code: "FE",
      },
      Firenze: {
        label: "Florence",
        code: "FI",
      },
      Foggia: {
        code: "FG",
      },
      "Forlì-Cesena": {
        alternate_names: ["Forli-Cesena"],
        code: "FC",
      },
      Frosinone: {
        code: "FR",
      },
      Genova: {
        label: "Genoa",
        code: "GE",
      },
      Gorizia: {
        code: "GO",
      },
      Grosseto: {
        code: "GR",
      },
      Imperia: {
        code: "IM",
      },
      Isernia: {
        code: "IS",
      },
      "La Spezia": {
        code: "SP",
      },
      Latina: {
        code: "LT",
      },
      Lecce: {
        code: "LE",
      },
      Lecco: {
        code: "LC",
      },
      Livorno: {
        code: "LI",
      },
      Lodi: {
        code: "LO",
      },
      Lucca: {
        code: "LU",
      },
      "L'Aquila": {
        label: "L’Aquila",
        code: "AQ",
      },
      Macerata: {
        code: "MC",
      },
      Mantova: {
        label: "Mantua",
        code: "MN",
      },
      "Massa-Carrara": {
        label: "Massa and Carrara",
        code: "MS",
      },
      Matera: {
        code: "MT",
      },
      "Medio Campidano": {
        code: "VS",
      },
      Messina: {
        code: "ME",
      },
      Milano: {
        label: "Milan",
        code: "MI",
      },
      Modena: {
        code: "MO",
      },
      "Monza e Brianza": {
        label: "Monza and Brianza",
        code: "MB",
      },
      Napoli: {
        label: "Naples",
        code: "NA",
      },
      Novara: {
        code: "NO",
      },
      Nuoro: {
        code: "NU",
      },
      Ogliastra: {
        code: "OG",
      },
      "Olbia-Tempio": {
        code: "OT",
      },
      Oristano: {
        code: "OR",
      },
      Padova: {
        label: "Padua",
        code: "PD",
      },
      Palermo: {
        code: "PA",
      },
      Parma: {
        code: "PR",
      },
      Pavia: {
        code: "PV",
      },
      Perugia: {
        code: "PG",
      },
      "Pesaro e Urbino": {
        label: "Pesaro and Urbino",
        code: "PU",
      },
      Pescara: {
        code: "PE",
      },
      Piacenza: {
        code: "PC",
      },
      Pisa: {
        code: "PI",
      },
      Pistoia: {
        code: "PT",
      },
      Pordenone: {
        code: "PN",
      },
      Potenza: {
        code: "PZ",
      },
      Prato: {
        code: "PO",
      },
      Ragusa: {
        code: "RG",
      },
      Ravenna: {
        code: "RA",
      },
      "Reggio Calabria": {
        alternate_names: ["Calabria"],
        code: "RC",
      },
      "Reggio Emilia": {
        code: "RE",
      },
      Rieti: {
        code: "RI",
      },
      Rimini: {
        code: "RN",
      },
      Roma: {
        label: "Rome",
        code: "RM",
      },
      Rovigo: {
        code: "RO",
      },
      Salerno: {
        code: "SA",
      },
      Sassari: {
        code: "SS",
      },
      Savona: {
        code: "SV",
      },
      Siena: {
        code: "SI",
      },
      Sondrio: {
        code: "SO",
      },
      Bolzano: {
        label: "South Tyrol",
        code: "BZ",
      },
      Siracusa: {
        label: "Syracuse",
        code: "SR",
      },
      Taranto: {
        code: "TA",
      },
      Teramo: {
        code: "TE",
      },
      Terni: {
        code: "TR",
      },
      Trapani: {
        code: "TP",
      },
      Trento: {
        label: "Trentino",
        code: "TN",
      },
      Treviso: {
        code: "TV",
      },
      Trieste: {
        code: "TS",
      },
      Torino: {
        label: "Turin",
        code: "TO",
      },
      Udine: {
        code: "UD",
      },
      Varese: {
        code: "VA",
      },
      Venezia: {
        label: "Venice",
        code: "VE",
      },
      "Verbano-Cusio-Ossola": {
        code: "VB",
      },
      Vercelli: {
        code: "VC",
      },
      Verona: {
        code: "VR",
      },
      "Vibo Valentia": {
        code: "VV",
      },
      Vicenza: {
        code: "VI",
      },
      Viterbo: {
        code: "VT",
      },
    },
  },
  Jamaica: {
    code: "JM",
  },
  Japan: {
    code: "JP",
    provinces: {
      Hokkaidō: {
        label: "Hokkaido",
        alternate_names: ["Hokkaido", "Hokkaido Prefecture", "北海道"],
        code: "JP-01",
      },
      Aomori: {
        alternate_names: ["Aomori Prefecture", "Aomori-ken", "青森県", "青森"],
        code: "JP-02",
      },
      Iwate: {
        alternate_names: ["Iwate Prefecture", "Iwate-ken", "岩手県", "岩手"],
        code: "JP-03",
      },
      Miyagi: {
        alternate_names: ["Miyagi Prefecture", "Miyagi-ken", "宮城県", "宮城"],
        code: "JP-04",
      },
      Akita: {
        alternate_names: ["Akita Prefecture", "Akita-ken", "秋田県", "秋田"],
        code: "JP-05",
      },
      Yamagata: {
        alternate_names: [
          "Yamagata Prefecture",
          "Yamagata-ken",
          "山形県",
          "山形",
        ],
        code: "JP-06",
      },
      Fukushima: {
        alternate_names: [
          "Fukushima Prefecture",
          "Fukushima-ken",
          "福島県",
          "福島",
        ],
        code: "JP-07",
      },
      Ibaraki: {
        alternate_names: [
          "Ibaraki Prefecture",
          "Ibaraki-ken",
          "茨城県",
          "茨城",
        ],
        code: "JP-08",
      },
      Tochigi: {
        alternate_names: [
          "Tochigi Prefecture",
          "Tochigi-ken",
          "栃木県",
          "栃木",
        ],
        code: "JP-09",
      },
      Gunma: {
        alternate_names: ["Gunma Prefecture", "Gunma-ken", "群馬県", "群馬"],
        code: "JP-10",
      },
      Saitama: {
        alternate_names: [
          "Saitama Prefecture",
          "Saitama-ken",
          "埼玉県",
          "埼玉",
        ],
        code: "JP-11",
      },
      Chiba: {
        alternate_names: ["Chiba Prefecture", "Chiba-ken", "千葉県", "千葉"],
        code: "JP-12",
      },
      Tōkyō: {
        label: "Tokyo",
        alternate_names: [
          "Tokyo",
          "Tokyo Prefecture",
          "Tōkyō-to",
          "Tokyo-to",
          "東京都",
          "東京",
        ],
        code: "JP-13",
      },
      Kanagawa: {
        alternate_names: [
          "Kanagawa Prefecture",
          "Kanagawa-ken",
          "神奈川県",
          "神奈川",
        ],
        code: "JP-14",
      },
      Niigata: {
        alternate_names: [
          "Niigata Prefecture",
          "Niigata-ken",
          "新潟県",
          "新潟",
        ],
        code: "JP-15",
      },
      Toyama: {
        alternate_names: ["Toyama Prefecture", "Toyama-ken", "富山県", "富山"],
        code: "JP-16",
      },
      Ishikawa: {
        alternate_names: [
          "Ishikawa Prefecture",
          "Ishikawa-ken",
          "石川県",
          "石川",
        ],
        code: "JP-17",
      },
      Fukui: {
        alternate_names: ["Fukui Prefecture", "Fukui-ken", "福井県", "福井"],
        code: "JP-18",
      },
      Yamanashi: {
        alternate_names: [
          "Yamanashi Prefecture",
          "Yamanashi-ken",
          "山梨県",
          "山梨",
        ],
        code: "JP-19",
      },
      Nagano: {
        alternate_names: ["Nagano Prefecture", "Nagano-ken", "長野県", "長野"],
        code: "JP-20",
      },
      Gifu: {
        alternate_names: ["Gifu Prefecture", "Gifu-ken", "岐阜県", "岐阜"],
        code: "JP-21",
      },
      Shizuoka: {
        alternate_names: [
          "Shizuoka Prefecture",
          "Shizuoka-ken",
          "静岡県",
          "静岡",
        ],
        code: "JP-22",
      },
      Aichi: {
        alternate_names: ["Aichi Prefecture", "Aichi-ken", "愛知県", "愛知"],
        code: "JP-23",
      },
      Mie: {
        alternate_names: ["Mie Prefecture", "Mie-ken", "三重県", "三重"],
        code: "JP-24",
      },
      Shiga: {
        alternate_names: ["Shiga Prefecture", "Shiga-ken", "滋賀県", "滋賀"],
        code: "JP-25",
      },
      Kyōto: {
        label: "Kyoto",
        alternate_names: [
          "Kyoto",
          "Kyoto Prefecture",
          "Kyōto-fu",
          "Kyoto-fu",
          "京都府",
          "京都",
        ],
        code: "JP-26",
      },
      Ōsaka: {
        label: "Osaka",
        alternate_names: [
          "Osaka",
          "Osaka Prefecture",
          "Ōsaka-fu",
          "Osaka-fu",
          "大阪府",
          "大阪",
        ],
        code: "JP-27",
      },
      Hyōgo: {
        label: "Hyogo",
        alternate_names: [
          "Hyogo",
          "Hyogo Prefecture",
          "Hyōgo-ken",
          "Hyogo-ken",
          "兵庫県",
          "兵庫",
        ],
        code: "JP-28",
      },
      Nara: {
        alternate_names: ["Nara Prefecture", "Nara-ken", "奈良県", "奈良"],
        code: "JP-29",
      },
      Wakayama: {
        alternate_names: [
          "Wakayama Prefecture",
          "Wakayama-ken",
          "和歌山県",
          "和歌山",
        ],
        code: "JP-30",
      },
      Tottori: {
        alternate_names: [
          "Tottori Prefecture",
          "Tottori-ken",
          "鳥取県",
          "鳥取",
        ],
        code: "JP-31",
      },
      Shimane: {
        alternate_names: [
          "Shimane Prefecture",
          "Shimane-ken",
          "島根県",
          "島根",
        ],
        code: "JP-32",
      },
      Okayama: {
        alternate_names: [
          "Okayama Prefecture",
          "Okayama-ken",
          "岡山県",
          "岡山",
        ],
        code: "JP-33",
      },
      Hiroshima: {
        alternate_names: [
          "Hiroshima Prefecture",
          "Hiroshima-ken",
          "広島県",
          "広島",
        ],
        code: "JP-34",
      },
      Yamaguchi: {
        alternate_names: [
          "Yamaguchi Prefecture",
          "Yamaguchi-ken",
          "山口県",
          "山口",
        ],
        code: "JP-35",
      },
      Tokushima: {
        alternate_names: [
          "Tokushima Prefecture",
          "Tokushima-ken",
          "徳島県",
          "徳島",
        ],
        code: "JP-36",
      },
      Kagawa: {
        alternate_names: ["Kagawa Prefecture", "Kagawa-ken", "香川県", "香川"],
        code: "JP-37",
      },
      Ehime: {
        alternate_names: ["Ehime Prefecture", "Ehime-ken", "愛媛県", "愛媛"],
        code: "JP-38",
      },
      Kōchi: {
        label: "Kochi",
        alternate_names: [
          "Kochi",
          "Kochi Prefecture",
          "Kōchi-ken",
          "Kochi-ken",
          "高知県",
          "高知",
        ],
        code: "JP-39",
      },
      Fukuoka: {
        alternate_names: [
          "Fukuoka Prefecture",
          "Fukuoka-ken",
          "福岡県",
          "福岡",
        ],
        code: "JP-40",
      },
      Saga: {
        alternate_names: ["Saga Prefecture", "Saga-ken", "佐賀県", "佐賀"],
        code: "JP-41",
      },
      Nagasaki: {
        alternate_names: [
          "Nagasaki Prefecture",
          "Nagasaki-ken",
          "長崎県",
          "長崎",
        ],
        code: "JP-42",
      },
      Kumamoto: {
        alternate_names: [
          "Kumamoto Prefecture",
          "Kumamoto-ken",
          "熊本県",
          "熊本",
        ],
        code: "JP-43",
      },
      Ōita: {
        label: "Oita",
        alternate_names: [
          "Oita",
          "Oita Prefecture",
          "Ōita-ken",
          "Oita-ken",
          "大分県",
          "大分",
        ],
        code: "JP-44",
      },
      Miyazaki: {
        alternate_names: [
          "Miyazaki Prefecture",
          "Miyazaki-ken",
          "宮崎県",
          "宮崎",
        ],
        code: "JP-45",
      },
      Kagoshima: {
        alternate_names: [
          "Kagoshima Prefecture",
          "Kagoshima-ken",
          "鹿児島県",
          "鹿児島",
        ],
        code: "JP-46",
      },
      Okinawa: {
        alternate_names: [
          "Okinawa Prefecture",
          "Okinawa-ken",
          "沖縄県",
          "沖縄",
        ],
        code: "JP-47",
      },
    },
  },
  Jersey: {
    code: "JE",
  },
  Jordan: {
    code: "JO",
  },
  Kazakhstan: {
    code: "KZ",
  },
  Kenya: {
    code: "KE",
  },
  Kiribati: {
    code: "KI",
  },
  "Korea, Democratic People's Republic Of": {
    code: "KP",
  },
  Kosovo: {
    code: "XK",
  },
  Kuwait: {
    code: "KW",
  },
  Kyrgyzstan: {
    code: "KG",
  },
  "Lao People's Democratic Republic": {
    code: "LA",
  },
  Latvia: {
    code: "LV",
  },
  Lebanon: {
    code: "LB",
  },
  Lesotho: {
    code: "LS",
  },
  Liberia: {
    code: "LR",
  },
  "Libyan Arab Jamahiriya": {
    code: "LY",
  },
  Liechtenstein: {
    code: "LI",
  },
  Lithuania: {
    code: "LT",
  },
  Luxembourg: {
    code: "LU",
  },
  Macao: {
    code: "MO",
  },
  Madagascar: {
    code: "MG",
  },
  Malawi: {
    code: "MW",
  },
  Malaysia: {
    code: "MY",
    provinces: {
      Johor: {
        code: "JHR",
      },
      Kedah: {
        code: "KDH",
      },
      Kelantan: {
        code: "KTN",
      },
      "Kuala Lumpur": {
        code: "KUL",
      },
      Labuan: {
        code: "LBN",
      },
      Melaka: {
        label: "Malacca",
        code: "MLK",
      },
      "Negeri Sembilan": {
        code: "NSN",
      },
      Pahang: {
        code: "PHG",
      },
      Penang: {
        alternate_names: ["Pulau Pinang"],
        code: "PNG",
      },
      Perak: {
        code: "PRK",
      },
      Perlis: {
        code: "PLS",
      },
      Putrajaya: {
        code: "PJY",
      },
      Sabah: {
        code: "SBH",
      },
      Sarawak: {
        code: "SWK",
      },
      Selangor: {
        code: "SGR",
      },
      Terengganu: {
        code: "TRG",
      },
    },
  },
  Maldives: {
    code: "MV",
  },
  Mali: {
    code: "ML",
  },
  Malta: {
    code: "MT",
  },
  Martinique: {
    code: "MQ",
  },
  Mauritania: {
    code: "MR",
  },
  Mauritius: {
    code: "MU",
  },
  Mayotte: {
    code: "YT",
  },
  Mexico: {
    code: "MX",
    provinces: {
      Aguascalientes: {
        code: "AGS",
      },
      "Baja California": {
        code: "BC",
      },
      "Baja California Sur": {
        code: "BCS",
      },
      Campeche: {
        code: "CAMP",
      },
      Chiapas: {
        code: "CHIS",
      },
      Chihuahua: {
        code: "CHIH",
      },
      "Ciudad de México": {
        label: "Ciudad de Mexico",
        alternate_names: ["Ciudad de Mexico", "CDMX"],
        code: "DF",
      },
      Coahuila: {
        code: "COAH",
      },
      Colima: {
        code: "COL",
      },
      Durango: {
        code: "DGO",
      },
      Guanajuato: {
        code: "GTO",
      },
      Guerrero: {
        code: "GRO",
      },
      Hidalgo: {
        code: "HGO",
      },
      Jalisco: {
        alternate_names: ["Jal."],
        code: "JAL",
      },
      México: {
        label: "Mexico State",
        alternate_names: ["Mexico"],
        code: "MEX",
      },
      Michoacán: {
        alternate_names: ["Michoacan"],
        code: "MICH",
      },
      Morelos: {
        code: "MOR",
      },
      Nayarit: {
        code: "NAY",
      },
      "Nuevo León": {
        alternate_names: ["Nuevo Leon"],
        code: "NL",
      },
      Oaxaca: {
        code: "OAX",
      },
      Puebla: {
        code: "PUE",
      },
      Querétaro: {
        alternate_names: ["Queretaro"],
        code: "QRO",
      },
      "Quintana Roo": {
        code: "Q ROO",
      },
      "San Luis Potosí": {
        alternate_names: ["San Luis Potosi"],
        code: "SLP",
      },
      Sinaloa: {
        code: "SIN",
      },
      Sonora: {
        code: "SON",
      },
      Tabasco: {
        code: "TAB",
      },
      Tamaulipas: {
        code: "TAMPS",
      },
      Tlaxcala: {
        code: "TLAX",
      },
      Veracruz: {
        code: "VER",
      },
      Yucatán: {
        alternate_names: ["Yucatan"],
        code: "YUC",
      },
      Zacatecas: {
        code: "ZAC",
      },
    },
  },
  "Moldova, Republic of": {
    code: "MD",
  },
  Monaco: {
    code: "MC",
  },
  Mongolia: {
    code: "MN",
  },
  Montenegro: {
    code: "ME",
  },
  Montserrat: {
    code: "MS",
  },
  Morocco: {
    code: "MA",
  },
  Mozambique: {
    code: "MZ",
  },
  Myanmar: {
    code: "MM",
  },
  Namibia: {
    code: "NA",
  },
  Nauru: {
    code: "NR",
  },
  Nepal: {
    code: "NP",
  },
  Netherlands: {
    code: "NL",
  },
  "Netherlands Antilles": {
    code: "AN",
  },
  "New Caledonia": {
    code: "NC",
  },
  "New Zealand": {
    code: "NZ",
    provinces: {
      Auckland: {
        code: "AUK",
      },
      "Bay of Plenty": {
        code: "BOP",
      },
      Canterbury: {
        code: "CAN",
      },
      "Chatham Islands": {
        code: "CIT",
      },
      Gisborne: {
        code: "GIS",
      },
      "Hawke's Bay": {
        label: "Hawke’s Bay",
        code: "HKB",
      },
      "Manawatu-Wanganui": {
        code: "MWT",
      },
      Marlborough: {
        code: "MBH",
      },
      Nelson: {
        code: "NSN",
      },
      Northland: {
        code: "NTL",
      },
      Otago: {
        code: "OTA",
      },
      Southland: {
        code: "STL",
      },
      Taranaki: {
        code: "TKI",
      },
      Tasman: {
        code: "TAS",
      },
      Waikato: {
        code: "WKO",
      },
      Wellington: {
        code: "WGN",
      },
      "West Coast": {
        code: "WTC",
      },
    },
  },
  Nicaragua: {
    code: "NI",
  },
  Niger: {
    code: "NE",
  },
  Nigeria: {
    code: "NG",
    provinces: {
      Abia: {
        code: "AB",
      },
      Adamawa: {
        code: "AD",
      },
      "Akwa Ibom": {
        code: "AK",
      },
      Anambra: {
        code: "AN",
      },
      Bauchi: {
        code: "BA",
      },
      Bayelsa: {
        code: "BY",
      },
      Benue: {
        code: "BE",
      },
      Borno: {
        code: "BO",
      },
      "Cross River": {
        code: "CR",
      },
      Delta: {
        code: "DE",
      },
      Ebonyi: {
        code: "EB",
      },
      Edo: {
        code: "ED",
      },
      Ekiti: {
        code: "EK",
      },
      Enugu: {
        code: "EN",
      },
      "Abuja Federal Capital Territory": {
        label: "Federal Capital Territory",
        alternate_names: ["Abuja"],
        code: "FC",
      },
      Gombe: {
        code: "GO",
      },
      Imo: {
        code: "IM",
      },
      Jigawa: {
        code: "JI",
      },
      Kaduna: {
        code: "KD",
      },
      Kano: {
        code: "KN",
      },
      Katsina: {
        code: "KT",
      },
      Kebbi: {
        code: "KE",
      },
      Kogi: {
        code: "KO",
      },
      Kwara: {
        code: "KW",
      },
      Lagos: {
        code: "LA",
      },
      Nasarawa: {
        code: "NA",
      },
      Niger: {
        code: "NI",
      },
      Ogun: {
        code: "OG",
      },
      Ondo: {
        code: "ON",
      },
      Osun: {
        code: "OS",
      },
      Oyo: {
        code: "OY",
      },
      Plateau: {
        code: "PL",
      },
      Rivers: {
        code: "RI",
      },
      Sokoto: {
        code: "SO",
      },
      Taraba: {
        code: "TA",
      },
      Yobe: {
        code: "YO",
      },
      Zamfara: {
        code: "ZA",
      },
    },
  },
  Niue: {
    code: "NU",
  },
  "Norfolk Island": {
    code: "NF",
  },
  "North Macedonia": {
    code: "MK",
  },
  Norway: {
    code: "NO",
  },
  Oman: {
    code: "OM",
  },
  Pakistan: {
    code: "PK",
  },
  "Palestinian Territory, Occupied": {
    code: "PS",
  },
  Panama: {
    code: "PA",
    provinces: {
      "Bocas del Toro": {
        code: "PA-1",
      },
      Chiriquí: {
        alternate_names: ["Chiriqui"],
        code: "PA-4",
      },
      Coclé: {
        alternate_names: ["Cocle"],
        code: "PA-2",
      },
      Colón: {
        alternate_names: ["Colon"],
        code: "PA-3",
      },
      Darién: {
        alternate_names: ["Darien"],
        code: "PA-5",
      },
      Emberá: {
        alternate_names: ["Embera"],
        code: "PA-EM",
      },
      "Kuna Yala": {
        label: "Guna Yala",
        code: "PA-KY",
      },
      Herrera: {
        code: "PA-6",
      },
      "Los Santos": {
        code: "PA-7",
      },
      "Ngöbe-Buglé": {
        alternate_names: ["Ngobe-Bugle"],
        code: "PA-NB",
      },
      Panamá: {
        alternate_names: ["Panama"],
        code: "PA-8",
      },
      Veraguas: {
        code: "PA-9",
      },
      "Panamá Oeste": {
        label: "West Panamá",
        alternate_names: ["Panama Oeste"],
        code: "PA-10",
      },
    },
  },
  "Papua New Guinea": {
    code: "PG",
  },
  Paraguay: {
    code: "PY",
  },
  Peru: {
    code: "PE",
    provinces: {
      Amazonas: {
        code: "PE-AMA",
      },
      Áncash: {
        label: "Ancash",
        alternate_names: ["Ancash", "Ancash"],
        code: "PE-ANC",
      },
      Apurímac: {
        alternate_names: ["Apurimac", "Apurimac"],
        code: "PE-APU",
      },
      Arequipa: {
        code: "PE-ARE",
      },
      Ayacucho: {
        code: "PE-AYA",
      },
      Cajamarca: {
        code: "PE-CAJ",
      },
      Cuzco: {
        label: "Cusco",
        code: "PE-CUS",
      },
      Callao: {
        label: "El Callao",
        code: "PE-CAL",
      },
      Huancavelica: {
        code: "PE-HUV",
      },
      Huánuco: {
        alternate_names: ["Huanuco", "Huanuco"],
        code: "PE-HUC",
      },
      Ica: {
        code: "PE-ICA",
      },
      Junín: {
        alternate_names: ["Junin", "Junin"],
        code: "PE-JUN",
      },
      "La Libertad": {
        code: "PE-LAL",
      },
      Lambayeque: {
        code: "PE-LAM",
      },
      "Lima (departamento)": {
        label: "Lima (Department)",
        code: "PE-LIM",
      },
      "Lima (provincia)": {
        label: "Lima (Metropolitan)",
        alternate_names: ["Provincia de Lima"],
        code: "PE-LMA",
      },
      Loreto: {
        code: "PE-LOR",
      },
      "Madre de Dios": {
        code: "PE-MDD",
      },
      Moquegua: {
        code: "PE-MOQ",
      },
      Pasco: {
        code: "PE-PAS",
      },
      Piura: {
        code: "PE-PIU",
      },
      Puno: {
        code: "PE-PUN",
      },
      "San Martín": {
        alternate_names: ["San Martin", "San Martin"],
        code: "PE-SAM",
      },
      Tacna: {
        code: "PE-TAC",
      },
      Tumbes: {
        code: "PE-TUM",
      },
      Ucayali: {
        code: "PE-UCA",
      },
    },
  },
  Philippines: {
    code: "PH",
    provinces: {
      Abra: {
        code: "PH-ABR",
      },
      "Agusan del Norte": {
        code: "PH-AGN",
      },
      "Agusan del Sur": {
        code: "PH-AGS",
      },
      Aklan: {
        code: "PH-AKL",
      },
      Albay: {
        code: "PH-ALB",
      },
      Antique: {
        code: "PH-ANT",
      },
      Apayao: {
        code: "PH-APA",
      },
      Aurora: {
        code: "PH-AUR",
      },
      Basilan: {
        code: "PH-BAS",
      },
      Bataan: {
        code: "PH-BAN",
      },
      Batanes: {
        code: "PH-BTN",
      },
      Batangas: {
        code: "PH-BTG",
      },
      Benguet: {
        code: "PH-BEN",
      },
      Biliran: {
        code: "PH-BIL",
      },
      Bohol: {
        code: "PH-BOH",
      },
      Bukidnon: {
        code: "PH-BUK",
      },
      Bulacan: {
        code: "PH-BUL",
      },
      Cagayan: {
        code: "PH-CAG",
      },
      "Camarines Norte": {
        code: "PH-CAN",
      },
      "Camarines Sur": {
        code: "PH-CAS",
      },
      Camiguin: {
        code: "PH-CAM",
      },
      Capiz: {
        code: "PH-CAP",
      },
      Catanduanes: {
        code: "PH-CAT",
      },
      Cavite: {
        code: "PH-CAV",
      },
      Cebu: {
        code: "PH-CEB",
      },
      "Davao de Oro": {
        label: "Compostela Valley",
        code: "PH-COM",
      },
      Cotabato: {
        code: "PH-NCO",
      },
      "Davao Occidental": {
        code: "PH-DVO",
      },
      "Davao Oriental": {
        code: "PH-DAO",
      },
      "Davao del Norte": {
        code: "PH-DAV",
      },
      "Davao del Sur": {
        code: "PH-DAS",
      },
      "Dinagat Islands": {
        code: "PH-DIN",
      },
      "Eastern Samar": {
        code: "PH-EAS",
      },
      Guimaras: {
        code: "PH-GUI",
      },
      Ifugao: {
        code: "PH-IFU",
      },
      "Ilocos Norte": {
        code: "PH-ILN",
      },
      "Ilocos Sur": {
        code: "PH-ILS",
      },
      Iloilo: {
        code: "PH-ILI",
      },
      Isabela: {
        code: "PH-ISA",
      },
      Kalinga: {
        code: "PH-KAL",
      },
      "La Union": {
        code: "PH-LUN",
      },
      Laguna: {
        code: "PH-LAG",
      },
      "Lanao del Norte": {
        code: "PH-LAN",
      },
      "Lanao del Sur": {
        code: "PH-LAS",
      },
      Leyte: {
        code: "PH-LEY",
      },
      Maguindanao: {
        code: "PH-MAG",
      },
      Marinduque: {
        code: "PH-MAD",
      },
      Masbate: {
        code: "PH-MAS",
      },
      "Metro Manila": {
        code: "PH-00",
      },
      "Misamis Occidental": {
        code: "PH-MSC",
      },
      "Misamis Oriental": {
        code: "PH-MSR",
      },
      "Mountain Province": {
        label: "Mountain",
        code: "PH-MOU",
      },
      "Negros Occidental": {
        code: "PH-NEC",
      },
      "Negros Oriental": {
        code: "PH-NER",
      },
      "Northern Samar": {
        code: "PH-NSA",
      },
      "Nueva Ecija": {
        code: "PH-NUE",
      },
      "Nueva Vizcaya": {
        code: "PH-NUV",
      },
      "Occidental Mindoro": {
        code: "PH-MDC",
      },
      "Oriental Mindoro": {
        code: "PH-MDR",
      },
      Palawan: {
        code: "PH-PLW",
      },
      Pampanga: {
        code: "PH-PAM",
      },
      Pangasinan: {
        code: "PH-PAN",
      },
      Quezon: {
        code: "PH-QUE",
      },
      Quirino: {
        code: "PH-QUI",
      },
      Rizal: {
        code: "PH-RIZ",
      },
      Romblon: {
        code: "PH-ROM",
      },
      Samar: {
        code: "PH-WSA",
      },
      Sarangani: {
        code: "PH-SAR",
      },
      Siquijor: {
        code: "PH-SIG",
      },
      Sorsogon: {
        code: "PH-SOR",
      },
      "South Cotabato": {
        code: "PH-SCO",
      },
      "Southern Leyte": {
        code: "PH-SLE",
      },
      "Sultan Kudarat": {
        code: "PH-SUK",
      },
      Sulu: {
        code: "PH-SLU",
      },
      "Surigao del Norte": {
        code: "PH-SUN",
      },
      "Surigao del Sur": {
        code: "PH-SUR",
      },
      Tarlac: {
        code: "PH-TAR",
      },
      "Tawi-Tawi": {
        code: "PH-TAW",
      },
      Zambales: {
        code: "PH-ZMB",
      },
      "Zamboanga Sibugay": {
        code: "PH-ZSI",
      },
      "Zamboanga del Norte": {
        code: "PH-ZAN",
      },
      "Zamboanga del Sur": {
        code: "PH-ZAS",
      },
    },
  },
  Pitcairn: {
    code: "PN",
  },
  Poland: {
    code: "PL",
  },
  Portugal: {
    code: "PT",
    provinces: {
      Aveiro: {
        code: "PT-01",
      },
      Açores: {
        label: "Azores",
        alternate_names: ["Acores"],
        code: "PT-20",
      },
      Beja: {
        code: "PT-02",
      },
      Braga: {
        code: "PT-03",
      },
      Bragança: {
        alternate_names: ["Braganca"],
        code: "PT-04",
      },
      "Castelo Branco": {
        code: "PT-05",
      },
      Coimbra: {
        code: "PT-06",
      },
      Évora: {
        alternate_names: ["Evora"],
        code: "PT-07",
      },
      Faro: {
        code: "PT-08",
      },
      Guarda: {
        code: "PT-09",
      },
      Leiria: {
        code: "PT-10",
      },
      Lisboa: {
        label: "Lisbon",
        code: "PT-11",
      },
      Madeira: {
        code: "PT-30",
      },
      Portalegre: {
        code: "PT-12",
      },
      Porto: {
        code: "PT-13",
      },
      Santarém: {
        alternate_names: ["Santarem"],
        code: "PT-14",
      },
      Setúbal: {
        alternate_names: ["Setubal"],
        code: "PT-15",
      },
      "Viana do Castelo": {
        code: "PT-16",
      },
      "Vila Real": {
        code: "PT-17",
      },
      Viseu: {
        code: "PT-18",
      },
    },
  },
  Qatar: {
    code: "QA",
  },
  "Republic of Cameroon": {
    code: "CM",
  },
  Reunion: {
    code: "RE",
  },
  Romania: {
    code: "RO",
    provinces: {
      Alba: {
        code: "AB",
      },
      Arad: {
        code: "AR",
      },
      Argeș: {
        alternate_names: ["Arge?"],
        code: "AG",
      },
      Bacău: {
        alternate_names: ["Bacau"],
        code: "BC",
      },
      Bihor: {
        code: "BH",
      },
      "Bistrița-Năsăud": {
        label: "Bistriţa-Năsăud",
        alternate_names: ["Bistri?a-Nasaud"],
        code: "BN",
      },
      Botoșani: {
        label: "Botoşani",
        alternate_names: ["Boto?ani"],
        code: "BT",
      },
      Brăila: {
        alternate_names: ["Braila"],
        code: "BR",
      },
      Brașov: {
        label: "Braşov",
        alternate_names: ["Bra?ov"],
        code: "BV",
      },
      București: {
        label: "Bucharest",
        alternate_names: ["Bucure?ti"],
        code: "B",
      },
      Buzău: {
        alternate_names: ["Buzau"],
        code: "BZ",
      },
      "Caraș-Severin": {
        alternate_names: ["Cara?-Severin"],
        code: "CS",
      },
      Cluj: {
        code: "CJ",
      },
      Constanța: {
        alternate_names: ["Constan?a"],
        code: "CT",
      },
      Covasna: {
        code: "CV",
      },
      Călărași: {
        alternate_names: ["Calara?i"],
        code: "CL",
      },
      Dolj: {
        code: "DJ",
      },
      Dâmbovița: {
        alternate_names: ["Dambovi?a"],
        code: "DB",
      },
      Galați: {
        alternate_names: ["Gala?i"],
        code: "GL",
      },
      Giurgiu: {
        code: "GR",
      },
      Gorj: {
        code: "GJ",
      },
      Harghita: {
        code: "HR",
      },
      Hunedoara: {
        code: "HD",
      },
      Ialomița: {
        alternate_names: ["Ialomi?a"],
        code: "IL",
      },
      Iași: {
        alternate_names: ["Ia?i"],
        code: "IS",
      },
      Ilfov: {
        code: "IF",
      },
      Maramureș: {
        label: "Maramureş",
        alternate_names: ["Maramure?"],
        code: "MM",
      },
      Mehedinți: {
        alternate_names: ["Mehedin?i"],
        code: "MH",
      },
      Mureș: {
        label: "Mureş",
        alternate_names: ["Mure?"],
        code: "MS",
      },
      Neamț: {
        label: "Neamţ",
        alternate_names: ["Neam?"],
        code: "NT",
      },
      Olt: {
        code: "OT",
      },
      Prahova: {
        code: "PH",
      },
      Sălaj: {
        alternate_names: ["Salaj"],
        code: "SJ",
      },
      "Satu Mare": {
        code: "SM",
      },
      Sibiu: {
        code: "SB",
      },
      Suceava: {
        code: "SV",
      },
      Teleorman: {
        code: "TR",
      },
      Timiș: {
        alternate_names: ["Timi?"],
        code: "TM",
      },
      Tulcea: {
        code: "TL",
      },
      Vâlcea: {
        alternate_names: ["Valcea"],
        code: "VL",
      },
      Vaslui: {
        code: "VS",
      },
      Vrancea: {
        code: "VN",
      },
    },
  },
  Russia: {
    code: "RU",
    provinces: {
      "Republic of Adygeya": {
        label: "Adygea",
        code: "AD",
      },
      "Altai Republic": {
        label: "Altai",
        code: "AL",
      },
      "Altai Krai": {
        code: "ALT",
      },
      "Amur Oblast": {
        label: "Amur",
        code: "AMU",
      },
      "Arkhangelsk Oblast": {
        label: "Arkhangelsk",
        code: "ARK",
      },
      "Astrakhan Oblast": {
        label: "Astrakhan",
        code: "AST",
      },
      "Republic of Bashkortostan": {
        label: "Bashkortostan",
        code: "BA",
      },
      "Belgorod Oblast": {
        label: "Belgorod",
        code: "BEL",
      },
      "Bryansk Oblast": {
        label: "Bryansk",
        code: "BRY",
      },
      "Republic of Buryatia": {
        label: "Buryat",
        code: "BU",
      },
      "Chechen Republic": {
        label: "Chechen",
        code: "CE",
      },
      "Chelyabinsk Oblast": {
        label: "Chelyabinsk",
        code: "CHE",
      },
      "Chukotka Autonomous Okrug": {
        label: "Chukotka Okrug",
        code: "CHU",
      },
      "Chuvash Republic": {
        label: "Chuvash",
        code: "CU",
      },
      "Republic of Dagestan": {
        label: "Dagestan",
        code: "DA",
      },
      "Republic of Ingushetia": {
        label: "Ingushetia",
        code: "IN",
      },
      "Irkutsk Oblast": {
        label: "Irkutsk",
        code: "IRK",
      },
      "Ivanovo Oblast": {
        label: "Ivanovo",
        code: "IVA",
      },
      "Jewish Autonomous Oblast": {
        label: "Jewish",
        code: "YEV",
      },
      "Kabardino-Balkarian Republic": {
        label: "Kabardino-Balkar",
        code: "KB",
      },
      "Kaliningrad Oblast": {
        label: "Kaliningrad",
        code: "KGD",
      },
      "Republic of Kalmykia": {
        label: "Kalmykia",
        code: "KL",
      },
      "Kaluga Oblast": {
        label: "Kaluga",
        code: "KLU",
      },
      "Kamchatka Krai": {
        code: "KAM",
      },
      "Karachay–Cherkess Republic": {
        label: "Karachay-Cherkess",
        alternate_names: ["Karachay?Cherkess Republic"],
        code: "KC",
      },
      "Republic of Karelia": {
        label: "Karelia",
        code: "KR",
      },
      "Kemerovo Oblast": {
        label: "Kemerovo",
        code: "KEM",
      },
      "Khabarovsk Krai": {
        code: "KHA",
      },
      "Republic of Khakassia": {
        label: "Khakassia",
        code: "KK",
      },
      "Khanty-Mansi Autonomous Okrug": {
        label: "Khanty-Mansi",
        code: "KHM",
      },
      "Kirov Oblast": {
        label: "Kirov",
        code: "KIR",
      },
      "Komi Republic": {
        label: "Komi",
        code: "KO",
      },
      "Kostroma Oblast": {
        label: "Kostroma",
        code: "KOS",
      },
      "Krasnodar Krai": {
        code: "KDA",
      },
      "Krasnoyarsk Krai": {
        code: "KYA",
      },
      "Kurgan Oblast": {
        label: "Kurgan",
        code: "KGN",
      },
      "Kursk Oblast": {
        label: "Kursk",
        code: "KRS",
      },
      "Leningrad Oblast": {
        label: "Leningrad",
        code: "LEN",
      },
      "Lipetsk Oblast": {
        label: "Lipetsk",
        code: "LIP",
      },
      "Magadan Oblast": {
        label: "Magadan",
        code: "MAG",
      },
      "Mari El Republic": {
        label: "Mari El",
        code: "ME",
      },
      "Republic of Mordovia": {
        label: "Mordovia",
        code: "MO",
      },
      Moscow: {
        code: "MOW",
      },
      "Moscow Oblast": {
        label: "Moscow Province",
        code: "MOS",
      },
      "Murmansk Oblast": {
        label: "Murmansk",
        code: "MUR",
      },
      "Nizhny Novgorod Oblast": {
        label: "Nizhny Novgorod",
        code: "NIZ",
      },
      "Republic of North Ossetia–Alania": {
        label: "North Ossetia-Alania",
        alternate_names: ["Republic of North Ossetia?Alania"],
        code: "SE",
      },
      "Novgorod Oblast": {
        label: "Novgorod",
        code: "NGR",
      },
      "Novosibirsk Oblast": {
        label: "Novosibirsk",
        code: "NVS",
      },
      "Omsk Oblast": {
        label: "Omsk",
        code: "OMS",
      },
      "Orenburg Oblast": {
        label: "Orenburg",
        code: "ORE",
      },
      "Oryol Oblast": {
        label: "Oryol",
        code: "ORL",
      },
      "Penza Oblast": {
        label: "Penza",
        code: "PNZ",
      },
      "Perm Krai": {
        code: "PER",
      },
      "Primorsky Krai": {
        code: "PRI",
      },
      "Pskov Oblast": {
        label: "Pskov",
        code: "PSK",
      },
      "Rostov Oblast": {
        label: "Rostov",
        code: "ROS",
      },
      "Ryazan Oblast": {
        label: "Ryazan",
        code: "RYA",
      },
      "Saint Petersburg": {
        code: "SPE",
      },
      "Sakha Republic (Yakutia)": {
        label: "Sakha",
        code: "SA",
      },
      "Sakhalin Oblast": {
        label: "Sakhalin",
        code: "SAK",
      },
      "Samara Oblast": {
        label: "Samara",
        code: "SAM",
      },
      "Saratov Oblast": {
        label: "Saratov",
        code: "SAR",
      },
      "Smolensk Oblast": {
        label: "Smolensk",
        code: "SMO",
      },
      "Stavropol Krai": {
        code: "STA",
      },
      "Sverdlovsk Oblast": {
        label: "Sverdlovsk",
        code: "SVE",
      },
      "Tambov Oblast": {
        label: "Tambov",
        code: "TAM",
      },
      "Republic of Tatarstan": {
        label: "Tatarstan",
        code: "TA",
      },
      "Tomsk Oblast": {
        label: "Tomsk",
        code: "TOM",
      },
      "Tula Oblast": {
        label: "Tula",
        code: "TUL",
      },
      "Tyva Republic": {
        label: "Tuva",
        code: "TY",
      },
      "Tver Oblast": {
        label: "Tver",
        code: "TVE",
      },
      "Tyumen Oblast": {
        label: "Tyumen",
        code: "TYU",
      },
      Udmurtia: {
        label: "Udmurt",
        code: "UD",
      },
      "Ulyanovsk Oblast": {
        label: "Ulyanovsk",
        code: "ULY",
      },
      "Vladimir Oblast": {
        label: "Vladimir",
        code: "VLA",
      },
      "Volgograd Oblast": {
        label: "Volgograd",
        code: "VGG",
      },
      "Vologda Oblast": {
        label: "Vologda",
        code: "VLG",
      },
      "Voronezh Oblast": {
        label: "Voronezh",
        code: "VOR",
      },
      "Yamalo-Nenets Autonomous Okrug": {
        label: "Yamalo-Nenets Okrug",
        code: "YAN",
      },
      "Yaroslavl Oblast": {
        label: "Yaroslavl",
        code: "YAR",
      },
      "Zabaykalsky Krai": {
        code: "ZAB",
      },
    },
  },
  Rwanda: {
    code: "RW",
  },
  "Saint Barthélemy": {
    code: "BL",
  },
  "Saint Helena": {
    code: "SH",
  },
  "Saint Kitts And Nevis": {
    code: "KN",
  },
  "Saint Lucia": {
    code: "LC",
  },
  "Saint Martin": {
    code: "MF",
  },
  "Saint Pierre And Miquelon": {
    code: "PM",
  },
  Samoa: {
    code: "WS",
  },
  "San Marino": {
    code: "SM",
  },
  "Sao Tome And Principe": {
    code: "ST",
  },
  "Saudi Arabia": {
    code: "SA",
  },
  Senegal: {
    code: "SN",
  },
  Serbia: {
    code: "RS",
  },
  Seychelles: {
    code: "SC",
  },
  "Sierra Leone": {
    code: "SL",
  },
  Singapore: {
    code: "SG",
  },
  "Sint Maarten": {
    code: "SX",
  },
  Slovakia: {
    code: "SK",
  },
  Slovenia: {
    code: "SI",
  },
  "Solomon Islands": {
    code: "SB",
  },
  Somalia: {
    code: "SO",
  },
  "South Africa": {
    code: "ZA",
    provinces: {
      "Eastern Cape": {
        code: "EC",
      },
      "Free State": {
        code: "FS",
      },
      Gauteng: {
        code: "GP",
      },
      "KwaZulu-Natal": {
        code: "NL",
      },
      Limpopo: {
        code: "LP",
      },
      Mpumalanga: {
        code: "MP",
      },
      "North West": {
        code: "NW",
      },
      "Northern Cape": {
        code: "NC",
      },
      "Western Cape": {
        code: "WC",
      },
    },
  },
  "South Georgia And The South Sandwich Islands": {
    code: "GS",
  },
  "South Korea": {
    code: "KR",
    provinces: {
      Busan: {
        code: "KR-26",
      },
      Daegu: {
        code: "KR-27",
      },
      Daejeon: {
        code: "KR-30",
      },
      Gangwon: {
        code: "KR-42",
      },
      Gwangju: {
        label: "Gwangju City",
        code: "KR-29",
      },
      Gyeonggi: {
        code: "KR-41",
      },
      Incheon: {
        code: "KR-28",
      },
      Jeju: {
        code: "KR-49",
      },
      Chungbuk: {
        label: "North Chungcheong",
        code: "KR-43",
      },
      Gyeongbuk: {
        label: "North Gyeongsang",
        code: "KR-47",
      },
      Jeonbuk: {
        label: "North Jeolla",
        code: "KR-45",
      },
      Sejong: {
        code: "KR-50",
      },
      Seoul: {
        code: "KR-11",
      },
      Chungnam: {
        label: "South Chungcheong",
        code: "KR-44",
      },
      Gyeongnam: {
        label: "South Gyeongsang",
        code: "KR-48",
      },
      Jeonnam: {
        label: "South Jeolla",
        code: "KR-46",
      },
      Ulsan: {
        code: "KR-31",
      },
    },
  },
  "South Sudan": {
    code: "SS",
  },
  Spain: {
    code: "ES",
    provinces: {
      "A Coruña": {
        alternate_names: ["A Coruna"],
        code: "C",
      },
      Álava: {
        alternate_names: ["Alava", "Araba"],
        code: "VI",
      },
      Albacete: {
        code: "AB",
      },
      Alicante: {
        code: "A",
      },
      Almería: {
        alternate_names: ["Almeria"],
        code: "AL",
      },
      Asturias: {
        label: "Asturias Province",
        alternate_names: ["Principado de Asturias"],
        code: "O",
      },
      Ávila: {
        alternate_names: ["Avila"],
        code: "AV",
      },
      Badajoz: {
        code: "BA",
      },
      Balears: {
        label: "Balears Province",
        alternate_names: ["Baleares", "Illes Balears", "Islas Baleares"],
        code: "PM",
      },
      Barcelona: {
        code: "B",
      },
      Vizcaya: {
        label: "Biscay",
        alternate_names: ["Biscay", "Bizkaia"],
        code: "BI",
      },
      Burgos: {
        code: "BU",
      },
      Cáceres: {
        alternate_names: ["Caceres"],
        code: "CC",
      },
      Cádiz: {
        alternate_names: ["Cadiz"],
        code: "CA",
      },
      Cantabria: {
        label: "Cantabria Province",
        code: "S",
      },
      Castellón: {
        alternate_names: ["Castellon", "Castelló", "Castello"],
        code: "CS",
      },
      Ceuta: {
        code: "CE",
      },
      "Ciudad Real": {
        alternate_names: ["Cdad. Real"],
        code: "CR",
      },
      Córdoba: {
        alternate_names: ["Cordoba", "Cordova"],
        code: "CO",
      },
      Cuenca: {
        code: "CU",
      },
      Guipúzcoa: {
        label: "Gipuzkoa",
        alternate_names: ["Guipuzcoa", "Gipuzkoa"],
        code: "SS",
      },
      Girona: {
        alternate_names: ["Gerona"],
        code: "GI",
      },
      Granada: {
        code: "GR",
      },
      Guadalajara: {
        code: "GU",
      },
      Huelva: {
        code: "H",
      },
      Huesca: {
        alternate_names: ["Uesca", "Osca"],
        code: "HU",
      },
      Jaén: {
        alternate_names: ["Jaen"],
        code: "J",
      },
      "La Rioja": {
        label: "La Rioja Province",
        code: "LO",
      },
      "Las Palmas": {
        code: "GC",
      },
      León: {
        alternate_names: ["Leon"],
        code: "LE",
      },
      Lleida: {
        alternate_names: ["Lérida", "Lerida"],
        code: "L",
      },
      Lugo: {
        code: "LU",
      },
      Madrid: {
        label: "Madrid Province",
        alternate_names: ["Comunidad de Madrid", "Community of Madrid"],
        code: "M",
      },
      Málaga: {
        alternate_names: ["Malaga"],
        code: "MA",
      },
      Melilla: {
        code: "ML",
      },
      Murcia: {
        alternate_names: ["Región de Murcia", "Region de Murcia"],
        code: "MU",
      },
      Navarra: {
        alternate_names: ["Nafarroa", "Navarre"],
        code: "NA",
      },
      Ourense: {
        code: "OR",
      },
      Palencia: {
        code: "P",
      },
      Pontevedra: {
        code: "PO",
      },
      Salamanca: {
        code: "SA",
      },
      "Santa Cruz de Tenerife": {
        alternate_names: ["Santa Cruz"],
        code: "TF",
      },
      Segovia: {
        code: "SG",
      },
      Sevilla: {
        label: "Seville",
        alternate_names: ["Seville"],
        code: "SE",
      },
      Soria: {
        code: "SO",
      },
      Tarragona: {
        code: "T",
      },
      Teruel: {
        code: "TE",
      },
      Toledo: {
        code: "TO",
      },
      Valencia: {
        alternate_names: ["València"],
        code: "V",
      },
      Valladolid: {
        code: "VA",
      },
      Zamora: {
        code: "ZA",
      },
      Zaragoza: {
        alternate_names: ["Saragossa"],
        code: "Z",
      },
    },
  },
  "Sri Lanka": {
    code: "LK",
  },
  "St. Vincent": {
    code: "VC",
  },
  Sudan: {
    code: "SD",
  },
  Suriname: {
    code: "SR",
  },
  "Svalbard And Jan Mayen": {
    code: "SJ",
  },
  Sweden: {
    code: "SE",
  },
  Switzerland: {
    code: "CH",
  },
  Syria: {
    code: "SY",
  },
  Taiwan: {
    code: "TW",
  },
  Tajikistan: {
    code: "TJ",
  },
  "Tanzania, United Republic Of": {
    code: "TZ",
  },
  Thailand: {
    code: "TH",
    provinces: {
      "Amnat Charoen": {
        code: "TH-37",
      },
      "Ang Thong": {
        code: "TH-15",
      },
      Bangkok: {
        alternate_names: ["Krung Thep Maha Nakhon"],
        code: "TH-10",
      },
      "Bueng Kan": {
        code: "TH-38",
      },
      Buriram: {
        label: "Buri Ram",
        alternate_names: ["Buri Ram"],
        code: "TH-31",
      },
      Chachoengsao: {
        code: "TH-24",
      },
      "Chai Nat": {
        code: "TH-18",
      },
      Chaiyaphum: {
        code: "TH-36",
      },
      Chanthaburi: {
        code: "TH-22",
      },
      "Chiang Mai": {
        code: "TH-50",
      },
      "Chiang Rai": {
        code: "TH-57",
      },
      "Chon Buri": {
        code: "TH-20",
      },
      Chumphon: {
        code: "TH-86",
      },
      Kalasin: {
        code: "TH-46",
      },
      "Kamphaeng Phet": {
        code: "TH-62",
      },
      Kanchanaburi: {
        code: "TH-71",
      },
      "Khon Kaen": {
        code: "TH-40",
      },
      Krabi: {
        code: "TH-81",
      },
      Lampang: {
        code: "TH-52",
      },
      Lamphun: {
        code: "TH-51",
      },
      Loei: {
        code: "TH-42",
      },
      Lopburi: {
        alternate_names: ["Lop Buri"],
        code: "TH-16",
      },
      "Mae Hong Son": {
        code: "TH-58",
      },
      "Maha Sarakham": {
        code: "TH-44",
      },
      Mukdahan: {
        code: "TH-49",
      },
      "Nakhon Nayok": {
        code: "TH-26",
      },
      "Nakhon Pathom": {
        code: "TH-73",
      },
      "Nakhon Phanom": {
        code: "TH-48",
      },
      "Nakhon Ratchasima": {
        code: "TH-30",
      },
      "Nakhon Sawan": {
        code: "TH-60",
      },
      "Nakhon Si Thammarat": {
        code: "TH-80",
      },
      Nan: {
        code: "TH-55",
      },
      Narathiwat: {
        code: "TH-96",
      },
      "Nong Bua Lam Phu": {
        code: "TH-39",
      },
      "Nong Khai": {
        code: "TH-43",
      },
      Nonthaburi: {
        code: "TH-12",
      },
      "Pathum Thani": {
        code: "TH-13",
      },
      Pattani: {
        code: "TH-94",
      },
      Pattaya: {
        code: "TH-S",
      },
      Phangnga: {
        label: "Phang Nga",
        code: "TH-82",
      },
      Phatthalung: {
        code: "TH-93",
      },
      Phayao: {
        code: "TH-56",
      },
      Phetchabun: {
        code: "TH-67",
      },
      Phetchaburi: {
        code: "TH-76",
      },
      Phichit: {
        code: "TH-66",
      },
      Phitsanulok: {
        code: "TH-65",
      },
      "Phra Nakhon Si Ayutthaya": {
        code: "TH-14",
      },
      Phrae: {
        code: "TH-54",
      },
      Phuket: {
        code: "TH-83",
      },
      "Prachin Buri": {
        code: "TH-25",
      },
      "Prachuap Khiri Khan": {
        code: "TH-77",
      },
      Ranong: {
        code: "TH-85",
      },
      Ratchaburi: {
        code: "TH-70",
      },
      Rayong: {
        code: "TH-21",
      },
      "Roi Et": {
        code: "TH-45",
      },
      "Sa Kaeo": {
        code: "TH-27",
      },
      "Sakon Nakhon": {
        code: "TH-47",
      },
      "Samut Prakan": {
        code: "TH-11",
      },
      "Samut Sakhon": {
        code: "TH-74",
      },
      "Samut Songkhram": {
        code: "TH-75",
      },
      Saraburi: {
        code: "TH-19",
      },
      Satun: {
        code: "TH-91",
      },
      Sisaket: {
        label: "Si Sa Ket",
        alternate_names: ["Si Sa Ket"],
        code: "TH-33",
      },
      "Sing Buri": {
        code: "TH-17",
      },
      Songkhla: {
        code: "TH-90",
      },
      Sukhothai: {
        code: "TH-64",
      },
      "Suphan Buri": {
        label: "Suphanburi",
        code: "TH-72",
      },
      "Surat Thani": {
        code: "TH-84",
      },
      Surin: {
        code: "TH-32",
      },
      Tak: {
        code: "TH-63",
      },
      Trang: {
        code: "TH-92",
      },
      Trat: {
        code: "TH-23",
      },
      "Ubon Ratchathani": {
        code: "TH-34",
      },
      "Udon Thani": {
        code: "TH-41",
      },
      "Uthai Thani": {
        code: "TH-61",
      },
      Uttaradit: {
        code: "TH-53",
      },
      Yala: {
        code: "TH-95",
      },
      Yasothon: {
        code: "TH-35",
      },
    },
  },
  "Timor Leste": {
    code: "TL",
  },
  Togo: {
    code: "TG",
  },
  Tokelau: {
    code: "TK",
  },
  Tonga: {
    code: "TO",
  },
  "Trinidad and Tobago": {
    code: "TT",
  },
  "Tristan da Cunha": {
    code: "TA",
  },
  Tunisia: {
    code: "TN",
  },
  Turkey: {
    code: "TR",
  },
  Turkmenistan: {
    code: "TM",
  },
  "Turks and Caicos Islands": {
    code: "TC",
  },
  Tuvalu: {
    code: "TV",
  },
  Uganda: {
    code: "UG",
  },
  Ukraine: {
    code: "UA",
  },
  "United Arab Emirates": {
    code: "AE",
    provinces: {
      "Abu Dhabi": {
        code: "AZ",
      },
      Ajman: {
        code: "AJ",
      },
      Dubai: {
        code: "DU",
      },
      Fujairah: {
        code: "FU",
      },
      "Ras al-Khaimah": {
        code: "RK",
      },
      Sharjah: {
        code: "SH",
      },
      "Umm al-Quwain": {
        code: "UQ",
      },
    },
  },
  "United Kingdom": {
    code: "GB",
    provinces: {
      "British Forces": {
        code: "BFP",
      },
      England: {
        code: "ENG",
      },
      "Northern Ireland": {
        code: "NIR",
      },
      Scotland: {
        code: "SCT",
      },
      Wales: {
        code: "WLS",
      },
    },
  },
  "United States": {
    code: "US",
    provinces: {
      Alabama: {
        code: "AL",
      },
      Alaska: {
        code: "AK",
      },
      "American Samoa": {
        code: "AS",
      },
      Arizona: {
        code: "AZ",
      },
      Arkansas: {
        code: "AR",
      },
      California: {
        code: "CA",
      },
      Colorado: {
        code: "CO",
      },
      Connecticut: {
        code: "CT",
      },
      Delaware: {
        code: "DE",
      },
      Florida: {
        code: "FL",
      },
      Georgia: {
        code: "GA",
      },
      Guam: {
        code: "GU",
      },
      Hawaii: {
        code: "HI",
      },
      Idaho: {
        code: "ID",
      },
      Illinois: {
        code: "IL",
      },
      Indiana: {
        code: "IN",
      },
      Iowa: {
        code: "IA",
      },
      Kansas: {
        code: "KS",
      },
      Kentucky: {
        code: "KY",
      },
      Louisiana: {
        code: "LA",
      },
      Maine: {
        code: "ME",
      },
      "Marshall Islands": {
        code: "MH",
      },
      Maryland: {
        code: "MD",
      },
      Massachusetts: {
        code: "MA",
      },
      Michigan: {
        code: "MI",
      },
      "Federated States of Micronesia": {
        label: "Micronesia",
        code: "FM",
      },
      Minnesota: {
        code: "MN",
      },
      Mississippi: {
        code: "MS",
      },
      Missouri: {
        code: "MO",
      },
      Montana: {
        code: "MT",
      },
      Nebraska: {
        code: "NE",
      },
      Nevada: {
        code: "NV",
      },
      "New Hampshire": {
        code: "NH",
      },
      "New Jersey": {
        code: "NJ",
      },
      "New Mexico": {
        code: "NM",
      },
      "New York": {
        code: "NY",
      },
      "North Carolina": {
        code: "NC",
      },
      "North Dakota": {
        code: "ND",
      },
      "Northern Mariana Islands": {
        code: "MP",
      },
      Ohio: {
        code: "OH",
      },
      Oklahoma: {
        code: "OK",
      },
      Oregon: {
        code: "OR",
      },
      Palau: {
        code: "PW",
      },
      Pennsylvania: {
        code: "PA",
      },
      "Puerto Rico": {
        code: "PR",
      },
      "Rhode Island": {
        code: "RI",
      },
      "South Carolina": {
        code: "SC",
      },
      "South Dakota": {
        code: "SD",
      },
      Tennessee: {
        code: "TN",
      },
      Texas: {
        code: "TX",
      },
      "Virgin Islands": {
        label: "U.S. Virgin Islands",
        code: "VI",
      },
      Utah: {
        code: "UT",
      },
      Vermont: {
        code: "VT",
      },
      Virginia: {
        code: "VA",
      },
      Washington: {
        code: "WA",
      },
      "District of Columbia": {
        label: "Washington DC",
        code: "DC",
      },
      "West Virginia": {
        code: "WV",
      },
      Wisconsin: {
        code: "WI",
      },
      Wyoming: {
        code: "WY",
      },
      "Armed Forces Americas": {
        code: "AA",
      },
      "Armed Forces Europe": {
        code: "AE",
      },
      "Armed Forces Pacific": {
        code: "AP",
      },
    },
  },
  "United States Minor Outlying Islands": {
    code: "UM",
  },
  Uruguay: {
    code: "UY",
  },
  Uzbekistan: {
    code: "UZ",
  },
  Vanuatu: {
    code: "VU",
  },
  Venezuela: {
    code: "VE",
  },
  Vietnam: {
    code: "VN",
  },
  "Virgin Islands, British": {
    code: "VG",
  },
  "Wallis And Futuna": {
    code: "WF",
  },
  "Western Sahara": {
    code: "EH",
  },
  Yemen: {
    code: "YE",
  },
  Zambia: {
    code: "ZM",
  },
  Zimbabwe: {
    code: "ZW",
  },
}

export default AddressCountries
