import { IProduct } from "../interfaces/product.interface";

const products_testdata = [
	{
		_id: "651b0672a66391fd9471d4bd",
		name: "Actualizacion de RIF (sin rif fisico ni clave ni usuario)",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "66d85ae206300282c2c6ec87",
		name: "BANESCO: solicitud de cita para la apertura de cuenta",
		cost: 10,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64ecee1d365a32f8e88e4067",
		name: "Banco Venezuela: creación de cuenta con solicitud de tarjeta",
		cost: 15,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "667eea21dce0f4714d995678",
		name: "Cambio de clave en el SAIME teniendo acceso al correo registrado",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "6523f2d23136fa19a5c9537f",
		name: "Combo 5 libros de empresa CA",
		cost: 33,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "680cf20ed527cf0d1584dbe7",
		name: "Euro",
		cost: 1,
		currencyType: "EUR",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3c0",
		name: "FUNDA CARTA INDIVIDUAL",
		cost: 0.1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "65df5319568afba91e13887e",
		name: "FUNDA CARTA PAQUETE DE 50",
		cost: 3,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3be",
		name: "FUNDA OFICIO INDIVIDUAL",
		cost: 0.11,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "65df530b568afba91e13887b",
		name: "FUNDA OFICIO PAQUETE DE 50",
		cost: 3.5,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "673dd4cc2867f3a1ac5f3eca",
		name: "IMPRESION DE INTERNET O CON CORRECCION",
		cost: 30,
		currencyType: "BSF",
		keywords: ["MODIFICACION", "CORRECCION", "INTERNET"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3fe",
		name: "MARCADOR SHARPIE 690 y 680",
		cost: 4.83,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "66f5807427108add45e00453",
		name: "PEGA SOLITA STIC 35 GRS",
		cost: 3.2,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "67a2147b177d779bc4a4d962",
		name: "Paquete de papel Fotografico JOJO (20 hojas)",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "680b9c8885afc941d33e374b",
		name: "Patente de Vehiculo: Reduccion y plastificado a blanco y negro",
		cost: 1.1886131787872585,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "680b9cff85afc941d33e377e",
		name: "Patente de Vehiculo: Reduccion y plastificado a color",
		cost: 1.8654452715149032,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "66353b5cdf41c7ece2a1f514",
		name: "RCV auto",
		cost: 33.572077344874565,
		currencyType: "EUR",
		keywords: ["SEGURO", "AUTO", "RCV", "carro"],
		priority: 0,
		favorite: false,
		__v: 1,
	},
	{
		_id: "679e38ae6e7f738862cef451",
		name: "RCV camion de carga mas de 2000kg hasta 8000kg",
		cost: 84.57207734487459,
		currencyType: "EUR",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "66353b80df41c7ece2a1f517",
		name: "RCV camioneta hasta 800kg sport wagon",
		cost: 39.572077344874565,
		currencyType: "EUR",
		keywords: ["SEGURO"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "679e381d6e7f738862cef44e",
		name: "RCV camioneta o camion de carga hasta 2000kg pick up",
		cost: 45.572077344874565,
		currencyType: "EUR",
		keywords: ["RVC", "PICK UP", "CAMION"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "66353b31df41c7ece2a1f505",
		name: "RCV moto",
		cost: 15.572077344874563,
		currencyType: "EUR",
		keywords: ["RVC", "MOTO", "SEGURO"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "67e2efb521dd4be01828f315",
		name: "REGISTRO BASICO",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "66560e0307043849d386e0c5",
		name: "REGISTRO MINISTERIO DE EDUCACION",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "674479c1ebb591acc9720512",
		name: "REGISTRO Y CITA SAREN",
		cost: 5,
		currencyType: "USD",
		keywords: ["PARTIDA", "NACIMIENTO", "saren", "partida", "nacimiento"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "667eea55dce0f4714d99567b",
		name: "Recuperación por la pagina patria de la clave en el SAIME",
		cost: 10,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "65fb494856d4ced64b187015",
		name: "SOLICITUD DE REGISTRO DE MOTO POR EL INTT",
		cost: 25,
		currencyType: "USD",
		keywords: ["INTT", "MOTO", "REGISTRO"],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b35a",
		name: "agua mineral",
		cost: 0.44,
		currencyType: "USD",
		keywords: [],
		__v: 2,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b35e",
		name: "alfileres paquete de 10",
		cost: 0.25,
		currencyType: "USD",
		keywords: [],
		__v: 2,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b35c",
		name: "almohadillas de sello grande",
		cost: 3,
		currencyType: "USD",
		keywords: ["almoadillas", "cello", "zello"],
		__v: 1,
	},
	{
		_id: "64ea2f45abe42c738578b360",
		name: "almohadillas de sello pequeña",
		cost: 2.56,
		currencyType: "USD",
		keywords: ["cello", "zello", "almoadillas"],
		__v: 3,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b362",
		name: "archivador lomo ancho carta x10",
		cost: 4.5,
		currencyType: "USD",
		keywords: ["carpeta"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b368",
		name: "block construcion por pieza",
		cost: 1.24,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b36a",
		name: "block de dibujo caribe",
		cost: 3.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b366",
		name: "block de notas alpha mediano por pieza 6a",
		cost: 0.9,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b364",
		name: "block de notas pequeño 7a",
		cost: 0.74,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b36c",
		name: "block factura n°1 pequeño 65 hojas",
		cost: 1.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea40b8abe42c738578b4f7",
		name: "block milimetrado por pieza",
		cost: 1.24,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea40e9abe42c738578b50f",
		name: "block rotulado por pieza",
		cost: 1.24,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b36e",
		name: "boligrafo kores azul y negro",
		cost: 0.83,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b372",
		name: "boligrafo kores azul y negro caja",
		cost: 9,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b370",
		name: "boligrafo pr ultrafino",
		cost: 0.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b374",
		name: "borrador nata 612",
		cost: 1.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b376",
		name: "borrador nata 624",
		cost: 0.76,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b378",
		name: "carpeta de 3 aros de 1 pulgada",
		cost: 4.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "6807d50f3f50883c4280d50e",
		name: "carpeta de 3 aros de 1/2 pulgada",
		cost: 3.78,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b37a",
		name: "carpeta de colores",
		cost: 0.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b380",
		name: "carpeta manila carta",
		cost: 0.35,
		currencyType: "USD",
		keywords: ["amarilla"],
		__v: 1,
		favorite: true,
		priority: 70,
	},
	{
		_id: "64ea2f45abe42c738578b382",
		name: "carpeta manila oficio",
		cost: 0.45,
		currencyType: "USD",
		keywords: ["amarilla"],
		__v: 1,
		favorite: true,
		priority: 69,
	},
	{
		_id: "64ea2f45abe42c738578b37c",
		name: "carpeta marron carta",
		cost: 0.92,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: true,
		priority: 60,
	},
	{
		_id: "64ea2f45abe42c738578b37e",
		name: "carpeta marron oficio",
		cost: 0.92,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: true,
		priority: 59,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b384",
		name: "carpeta plastica con liga carta",
		cost: 1.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b386",
		name: "carpeta plastica con liga oficio",
		cost: 2.4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b388",
		name: "carpeta transparente carta",
		cost: 0.4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b38c",
		name: "cartulina escolar pliego",
		cost: 0.87,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b394",
		name: "cartulina estampada carta",
		cost: 0.25,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b38e",
		name: "cartulina hilo blanco carta",
		cost: 0.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b38a",
		name: "cartulina holografica y metalizada",
		cost: 1.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b390",
		name: "cartulina opalina",
		cost: 0.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64eceb6a365a32f8e88e3f99",
		name: "cedula: copia a color y plastificacion",
		cost: 2.4434861996519484,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		priority: 0,
		favorite: false,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b392",
		name: "chinche  colores x cjt 50 pcs",
		cost: 0.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b39c",
		name: "cinta doble fax economica",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b39a",
		name: "cinta doble fax pointer",
		cost: 6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b398",
		name: 'cinta plastica delgada  3/4" x 35m',
		cost: 0.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b396",
		name: "cinta plastica gruesa 48mmx x 90 metros pr-040",
		cost: 3.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ecef13365a32f8e88e407c",
		name: "cita para la cedula (con registro del saime)",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecef02365a32f8e88e4079",
		name: "cita para la cedula (sin registro del saime)",
		cost: 3,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3a0",
		name: "clips individual",
		cost: 0.01,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b39e",
		name: "clips x cajita",
		cost: 0.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3a2",
		name: "colores pointer de 12",
		cost: 3.13,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ece496365a32f8e88e3edc",
		name: "constancia de residencia",
		cost: 1.5,
		currencyType: "USD",
		keywords: ["cne"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64da860a7f7ee246b055f8df",
		name: "copias carta",
		cost: 20,
		currencyType: "BSF",
		keywords: [],
		__v: 0,
		priority: 100,
		favorite: true,
	},
	{
		_id: "64f142b6de3049abbfde7a04",
		name: "copias oficio",
		cost: 20,
		currencyType: "BSF",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 99,
	},
	{
		_id: "64ea2f45abe42c738578b420",
		name: "cordon + porta carnet transparente delgado",
		cost: 1.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3a4",
		name: "corrector doble brocha y lapiz",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3a6",
		name: "corrector kores brocha 20ml x pieza",
		cost: 1.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3a8",
		name: "corrector ofica 9ml x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3aa",
		name: "correctore  artesco 18 ml x pieza",
		cost: 1.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ece635365a32f8e88e3f2e",
		name: "creacion de correo",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: null,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3ae",
		name: "creyon cera la nieve 12 colores",
		cost: 2.61,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3ac",
		name: "creyon cera la nieve 6 colores",
		cost: 1.31,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3b6",
		name: "cuaderno de dibujo",
		cost: 1.36,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3b8",
		name: "cuaderno pentagramado",
		cost: 4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3b0",
		name: "cuaderno repropaper 1l. 100 h. x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3b2",
		name: "cuaderno repropaper 2l. 100 h. x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3b4",
		name: "cuaderno repropaper c. 100 h. x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ece7c6365a32f8e88e3f63",
		name: "curriculum a color",
		cost: 2.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64fb34cd51a588db62fb910f",
		name: "diseño complejo",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "675af0960ca7f80834e383fe",
		name: "diseño con plantilla de canva",
		cost: 3,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64f9fc86a2aeb04f7b65c26d",
		name: "diseño simple",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "68127d813a76e5c366a31e5e",
		name: "dolar",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "65424ba5b696b58f611c16d9",
		name: "escaneo",
		cost: 25,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3bc",
		name: "escarcha colores surtida bolsita",
		cost: 0.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3ba",
		name: "exacto grande",
		cost: 3.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ecedcc365a32f8e88e4063",
		name: "fondo negro",
		cost: 3,
		currencyType: "USD",
		keywords: ["titulo"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "66bdfc8ebfa3cbbc80523718",
		name: "fondo negro de titulo con reduccion",
		cost: 4.8,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece6a0365a32f8e88e3f31",
		name: "foto carnet 4",
		cost: 1.2,
		currencyType: "USD",
		keywords: ["tipo"],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece6e2365a32f8e88e3f41",
		name: "foto carnet 6",
		cost: 1.7999999999999998,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece6c7365a32f8e88e3f34",
		name: "foto carnet 8",
		cost: 2.4,
		currencyType: "USD",
		keywords: ["tipo"],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3c8",
		name: "gancho para carpeta",
		cost: 0.08,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: true,
		priority: 48,
	},
	{
		_id: "64ea2f45abe42c738578b3c6",
		name: "gancho para carpeta por caja",
		cost: 3,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3d0",
		name: "hoja de examen",
		cost: 0.13,
		currencyType: "USD",
		keywords: ["hojas"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3cc",
		name: "hoja tamaño carta",
		cost: 0.05,
		currencyType: "USD",
		keywords: ["hojas"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3ce",
		name: "hoja tamaño extraoficio",
		cost: 0.07,
		currencyType: "USD",
		keywords: ["hojas"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3ca",
		name: "hoja tamaño oficio",
		cost: 0.06,
		currencyType: "USD",
		keywords: ["hojas"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3d2",
		name: "hojas crisvi ponchadas x paq de 80",
		cost: 4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3d4",
		name: "hojas repropaper ponchadas x paq de 100",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece5a0365a32f8e88e3f00",
		name: "hora de ciber",
		cost: 2,
		currencyType: "USD",
		keywords: ["ciber", "cyber"],
		__v: 0,
	},
	{
		_id: "64ecd2ec365a32f8e88e3cbc",
		name: "impresion color papel autoadhesivo",
		cost: 2.7,
		currencyType: "USD",
		keywords: ["autoadecivo", "full", "completa"],
		__v: 2,
		favorite: false,
		priority: 1,
	},
	{
		_id: "64ecd934365a32f8e88e3ea7",
		name: "impresion color papel autoadhesivo (media hoja + recorte)",
		cost: 2.35,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd869365a32f8e88e3e62",
		name: "impresion color papel autoadhesivo (media hoja)",
		cost: 1.35,
		currencyType: "USD",
		keywords: ["minima", "minimo", "mitad"],
		__v: 2,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd32b365a32f8e88e3cd9",
		name: "impresion color papel autoadhesivo (recortado)",
		cost: 3.7,
		currencyType: "USD",
		keywords: ["autoadecivo", "recorte", "full", "etiqueta", "estandar"],
		__v: 5,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd6c6365a32f8e88e3de4",
		name: "impresion color papel autoadhesivo (tres cuartos + recorte)",
		cost: 3.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd69e365a32f8e88e3dc7",
		name: "impresion color papel autoadhesivo (tres cuartos)",
		cost: 2.2,
		currencyType: "USD",
		keywords: ["autoadecivo"],
		__v: 0,
	},
	{
		_id: "64ecd36a365a32f8e88e3cf8",
		name: "impresion color papel autoadhesivo impermeable",
		cost: 3.62,
		currencyType: "USD",
		keywords: ["autoadecivo", "full", "completa"],
		__v: 3,
		favorite: false,
		priority: 1,
	},
	{
		_id: "64ecd954365a32f8e88e3ec5",
		name: "impresion color papel autoadhesivo impermeable (media hoja + recorte)",
		cost: 2.81,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd8a8365a32f8e88e3e75",
		name: "impresion color papel autoadhesivo impermeable (media hoja)",
		cost: 1.81,
		currencyType: "USD",
		keywords: ["minimo", "minima", "mitad"],
		__v: 2,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd3b6365a32f8e88e3d15",
		name: "impresion color papel autoadhesivo impermeable (recortado)",
		cost: 4.62,
		currencyType: "USD",
		keywords: ["autoadecivo", "recorte", "full", "etiqueta"],
		__v: 4,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd767365a32f8e88e3e21",
		name: "impresion color papel autoadhesivo impermeable (tres cuartos + recorte)",
		cost: 4.12,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd736365a32f8e88e3e04",
		name: "impresion color papel autoadhesivo impermeable (tres cuartos)",
		cost: 3.12,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ecce18365a32f8e88e3c75",
		name: "impresion color papel fotografico",
		cost: 2.3,
		currencyType: "USD",
		keywords: ["full", "completa"],
		__v: 2,
		favorite: false,
		priority: 1,
	},
	{
		_id: "64ecd8f9365a32f8e88e3e89",
		name: "impresion color papel fotografico (media hoja + recorte)",
		cost: 2.15,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd843365a32f8e88e3e4f",
		name: "impresion color papel fotografico (media hoja)",
		cost: 1.15,
		currencyType: "USD",
		keywords: ["minimo", "minima", "postal", "mitad"],
		__v: 4,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecd250365a32f8e88e3ca5",
		name: "impresion color papel fotografico (recortado)",
		cost: 3.3,
		currencyType: "USD",
		keywords: ["recorte", "full"],
		__v: 2,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd62f365a32f8e88e3d91",
		name: "impresion color papel fotografico (tres cuartos + recorte)",
		cost: 2.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd5d0365a32f8e88e3d74",
		name: "impresion color papel fotografico (tres cuartos)",
		cost: 1.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64eccd5e365a32f8e88e3c71",
		name: "impresion color papel normal",
		cost: 2,
		currencyType: "USD",
		keywords: ["full", "completa", "hoja", "normal"],
		__v: 3,
		favorite: false,
		priority: 1,
	},
	{
		_id: "64ecd815365a32f8e88e3e3c",
		name: "impresion color papel normal (media hoja)",
		cost: 1,
		currencyType: "USD",
		keywords: ["minimo", "minima", "mitad"],
		__v: 3,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ecd56b365a32f8e88e3d6a",
		name: "impresion color papel normal (tres cuartos)",
		cost: 1.5,
		currencyType: "USD",
		keywords: ["3/4", "tercio"],
		__v: 0,
	},
	{
		_id: "64f35a7185269ab27432544b",
		name: "impresión CARTA U OFICIO",
		cost: 25,
		currencyType: "BSF",
		keywords: [],
		priority: 95,
		favorite: true,
		__v: 0,
	},
	{
		_id: "653d1834278cd5d3b976cdf0",
		name: "impresión corregida de márgenes o de tamaño",
		cost: 12,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3d6",
		name: "lamina plastificar carnet 70 x 100 175 m por caja",
		cost: 6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3d8",
		name: "lapices de colores 12 pequeños",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3dc",
		name: "lapiz amarillo mongol o kores",
		cost: 0.53,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3da",
		name: "lapiz amarillo mongol o kores por caja",
		cost: 5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3e2",
		name: "libreta paperplus 100 h 1 linea x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3e4",
		name: "libreta paperplus 100h cuadriculado x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3e6",
		name: "libreta paperplus cuadriculado 100 h pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3de",
		name: "libreta repropaper 2 lineas 100 hojas x pieza",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3e0",
		name: "libreta repropaper cuadriculado 100 hojas",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3ec",
		name: "libro  2 columna 200 folio",
		cost: 13,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3f2",
		name: "libro  accionistas de 50 folios",
		cost: 6.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3f6",
		name: "libro  actas 200 folio",
		cost: 13,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3f0",
		name: "libro  de licores de 50 folios",
		cost: 6.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3e8",
		name: "libro 2 columna 100 folio",
		cost: 6.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3ee",
		name: "libro 3 columna 100 folio",
		cost: 6.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3ea",
		name: "libro 3 columna 200 folio",
		cost: 13,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3f4",
		name: "libro actas 100 folio",
		cost: 6.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b3f8",
		name: "libro actas 300 folio",
		cost: 19,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecf152365a32f8e88e40f2",
		name: "licencia de conducir: papel fotografico y plastificacion",
		cost: 1.7999999999999998,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecebf0365a32f8e88e3fc2",
		name: "licencia de conducir: papel normal y plastificacion",
		cost: 1.65,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b402",
		name: "marcador doble punta permanente pointer",
		cost: 0.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b406",
		name: "marcador paquete de 12 doble punta fina",
		cost: 10,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3fa",
		name: "marcador permanente sharpie punta fina",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b404",
		name: "marcador pizarra regional depot",
		cost: 0.4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "66719a200ebb8d7e39801f6d",
		name: "mas bolivares",
		cost: 1,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b3fc",
		name: "metodo palmer",
		cost: 1.46,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64f3513085269ab2743253af",
		name: "minuto de internet",
		cost: 0.0333333333333333,
		currencyType: "USD",
		keywords: [],
		priority: 40,
		favorite: true,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b40a",
		name: "papel autoadhesivo fotografico",
		cost: 0.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b408",
		name: "papel autoadhesivo impermeable",
		cost: 1.62,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b40c",
		name: "papel bond 16 blanco pliego",
		cost: 0.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b412",
		name: "papel carbon carta",
		cost: 0.17,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b416",
		name: "papel carbon oficio",
		cost: 0.26,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b40e",
		name: "papel contac colores el metro",
		cost: 4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b410",
		name: "papel contac transparente el metro",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b414",
		name: "papel fotografico por hoja",
		cost: 0.3,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b41c",
		name: "pega kores stic 20grs x pieza",
		cost: 3,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b41e",
		name: "pega kores stic 8grs x pieza",
		cost: 1.66,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b41a",
		name: "pega regional depot escolar  40 grs. x pieza",
		cost: 0.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b418",
		name: "pega regional depot escolar  60 grs. x pieza",
		cost: 0.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b428",
		name: "pintura al frio",
		cost: 1.35,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece74a365a32f8e88e3f4e",
		name: "plastificacion (carnet)",
		cost: 0.65,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece76a365a32f8e88e3f54",
		name: "plastificacion (hoja completa)",
		cost: 2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece75b365a32f8e88e3f51",
		name: "plastificacion (media hoja)",
		cost: 1.3,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b422",
		name: "portar carnet",
		cost: 0.6,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64f9f737a2aeb04f7b65c1d0",
		name: "recarga",
		cost: 1,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64f9f75aa2aeb04f7b65c1d3",
		name: "recarga digitel",
		cost: 1.3,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64f9f7d8a2aeb04f7b65c20b",
		name: "recarga movilnet",
		cost: 1.3,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "64f9f7b5a2aeb04f7b65c1fd",
		name: "recarga movistar",
		cost: 1.3,
		currencyType: "BSF",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64eccd21365a32f8e88e3c6e",
		name: "recorte (cameo)",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64eceeca365a32f8e88e4076",
		name: "reduccion de titulo",
		cost: 1.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b424",
		name: "regla 60 cm",
		cost: 7.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b426",
		name: "regla pointer transparente 30cm",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecee7a365a32f8e88e406a",
		name: "renovacion de licencia 2da",
		cost: 15,
		currencyType: "USD",
		keywords: ["segunda"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecee86365a32f8e88e406d",
		name: "renovacion de licencia 3ra",
		cost: 18,
		currencyType: "USD",
		keywords: ["tercera"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecee92365a32f8e88e4070",
		name: "renovacion de licencia 4ta",
		cost: 20,
		currencyType: "USD",
		keywords: ["cuarta"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64eceea3365a32f8e88e4073",
		name: "renovacion de licencia 5ta",
		cost: 22,
		currencyType: "USD",
		keywords: ["quinta"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b438",
		name: "resaltadores",
		cost: 1.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b42a",
		name: "resma de hoja carta",
		cost: 12,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b42c",
		name: "resma de hoja oficio",
		cost: 15,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece51c365a32f8e88e3ee8",
		name: "rif: actualizacion (facil)",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ece578365a32f8e88e3efd",
		name: "rif: actualizacion (recuperacion o cambio de direccion)",
		cost: 1.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b430",
		name: "sacapunta plastico deposito",
		cost: 0.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b42e",
		name: "sacapuntas metal",
		cost: 0.37,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b43c",
		name: "separadores colores 8 mats.",
		cost: 1.8,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b432",
		name: "silicon liquido de 60ml",
		cost: 1.57,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ea2f45abe42c738578b440",
		name: "sobre caribe manila carta",
		cost: 0.35,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b436",
		name: "sobre caribe manila extra oficio",
		cost: 0.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b434",
		name: "sobre caribe manila oficio",
		cost: 0.45,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b43e",
		name: "sobres blancos",
		cost: 0.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ea2f45abe42c738578b448",
		name: "talonario de factura GRANDE",
		cost: 1.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
		favorite: false,
		priority: 0,
	},
	{
		_id: "6584875f715cba1cc9b1d114",
		name: "talonario de factura PEQUEÑO",
		cost: 0.8,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		_id: "651f049380a404979de091d7",
		name: "talonario de recibo",
		cost: 1.5,
		currencyType: "USD",
		keywords: [],
		priority: 0,
		favorite: false,
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b450",
		name: "talonario de rifa",
		cost: 2.5,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b43a",
		name: "tapaboca azul 5 unidades",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b442",
		name: "tapaboca azul individual",
		cost: 0.2,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b446",
		name: "tapaboca negro 4 unidades",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b444",
		name: "tapaboca negro individual",
		cost: 0.25,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b44a",
		name: "tijera escolar",
		cost: 2.4,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b44e",
		name: "tinta para sello  de 24ml",
		cost: 1,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b452",
		name: "tirro grande",
		cost: 1.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		priority: 0,
		favorite: false,
		_id: "64ea2f45abe42c738578b44c",
		name: "tirro pequeño escolar",
		cost: 0.7,
		currencyType: "USD",
		keywords: [],
		__v: 0,
	},
	{
		_id: "64ecf00a365a32f8e88e4096",
		name: "titulo vehiculo (papel fotografico + plastificacion carnet)",
		cost: 2.9499999999999997,
		currencyType: "USD",
		keywords: ["certificado", "vehiculo"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ecefd0365a32f8e88e407f",
		name: "titulo vehiculo (papel normal + plastificacion carnet)",
		cost: 2.65,
		currencyType: "USD",
		keywords: ["certificado", "vehiculo"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ece5f4365a32f8e88e3f18",
		name: "transcripcion (carta)",
		cost: 1.2,
		currencyType: "USD",
		keywords: ["hoja", "redaccion", "curriculo"],
		__v: 2,
		favorite: false,
		priority: 0,
	},
	{
		_id: "64ece610365a32f8e88e3f1f",
		name: "transcripcion (oficio)",
		cost: 1.5,
		currencyType: "USD",
		keywords: ["hoja", "redaccion"],
		__v: 1,
		favorite: false,
		priority: 0,
	},
];

export default products_testdata as IProduct[];
