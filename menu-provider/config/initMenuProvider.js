var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// URL de la conexión 
var url = 'mongodb://172.17.0.8:27017/menuprovider';


var insertDocuments = function(db, callback) {
  var collection = db.collection('menu');
  // Inserta el menu completo con los roles asociados.
  var sipUrl = "http://sippreprod.colonseguros.com.ar";
  var sepUrl = "http://seppreprod.colonseguros.com.ar";

  collection.insertMany([
    { _id:   "2", label: "MI CARTERA", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["21", "22", "23", "24"] } ,
    { _id:  "21", label: "PÓLIZAS", parent: "2", roles:["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["211", "212", "213"] }, 
    { _id:  "22", label: "CUENTA CORRIENTE", parent: "2" , roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/ov_consultas/#/ctaCte/consulta/"},
    { _id:  "23", label: "COBRANZAS", parent: "2", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["231", "232"] },
    { _id:  "24", label: "SINIESTROS", parent: "2", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["231", "232"] },
    { _id: "211", label: "CONSULTA DE PÓLIZAS", parent: "21", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/ov_consultas/#/polizas/consulta"},
    { _id: "212", label: "ENDOSOS DE NÓMINA", parent: "21", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link:  "/ov_consultas/#/polizas/endososNomina"},
    { _id: "213", label: "ENDOSOS PENDIENTES", parent: "21", roles: ["ROLE_BACKOFFICE"], link: "#/polizas/endososPendientes"},
    { _id: "231", label: "DEUDA POR PREMIO", parent: "23", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "#/cobranzas/deudaPorPremio"},
    { _id: "232", label: "CONSULTA DE REMESAS", parent: "23", roles: ["ROLE_BACKOFFICE"], link: "#/cobranzas/remesa"},
    { _id: "241", label: "CONSULTA", parent: "24", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "#/sin/consulta"},
    { _id: "242", label: "PRE DENUNCIA", parent: "24", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/ov_consultas/#/sin/denuncia/"},
    { _id:   "3", label: "COTIZACIÓN/EMISIÓN", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["31", "32", "33", "34"] }, 
    { _id:  "31", label: "ACCIDENTES PERSONALES", parent: "3", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["311", "312"] },
    { _id:  "32", label: "HOGAR ABIERTO", parent: "3", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["321", "322"] },
    { _id:  "33", label: "OTROS RIESGOS", parent: "3", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/paquetes/#/solicitud"},
    { _id:  "34", label: "CONSULTAS", parent: "3", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["341", "342"] },
    { _id: "311", label: "PLANES CERRADOS", parent: "31", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/paquetes/#/solicitud"},
    { _id: "312", label: "COTIZACIÓN", parent: "31", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: sipUrl + "/vo/quote-ap.xhtml" },
    { _id: "321", label: "PLANES CERRADOS", parent: "32", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/paquetes/#/solicitud"},
    { _id: "322", label: "COTIZACIÓN", parent:"32", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link:  "/hogar/#/solicitud"},
    { _id: "341", label: "PLANES EMITIDOS", parent: "35", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: "/paquetes/#/solicitudes"},
    { _id: "342", label: "COTIZACIONES", parent: "34", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: sipUrl + "/vo/quotation.xhtml"},   
    { _id:   "4", label: "HERRAMIENTAS", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["41", "42", "43","44"] },
    { _id:  "41", label: "PREGUNTAS FRECUENTES", parent: "4" , roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: sipUrl + "/vo/faq.xhtml"},
    { _id:  "42", label: "INFORMACIÓN ÚTIL", parent: "4" , roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: sipUrl + "/vo/usefull-info.xhtml"},
    { _id:  "43", label: "DOCUMENTOS", parent: "4", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"] }, 
    { _id: "431", label: "FORMULARIOS", parent: "43", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link: sipUrl + "/vo/cm-documents-forms.xhtml"},
    { _id:  "44", label: "TICKETS", parent: "4", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], children: ["441", "442"] },
    { _id: "441", label: "CONSULTA", parent: "44", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link:  "/ov_consultas/#/tickets/consulta"},
    { _id: "442", label: "ALTA", parent: "44", roles: ["ROLE_CAT","ROLE_SALES","ROLE_BACKOFFICE","ROLE_ORGANISER","ROLE_PRODUCER","ROLE_INSURED","ROLE_TECHNICAL","ROLE_EMP","ROLE_TEST"], link:  "/ov_consultas/#/tickets/alta"},
 { _id: "5", label: "LIMPIAR CACHE", roles: ["ROLE_ADMIN"], link:"javascript:;", click: "limpiarCache()" }, 
 { _id: "6", label: "SUMAS SUGERIDAS", roles: ["ROLE_ADMIN"], link:"/paquetes/#/sumas-sugeridas"}, 
 { _id: "7", label: "ABM PLATAFORMA", roles:["ROLE_ADMIN"], children: ["71", "72", "73","74","75","76","77","78","79","710","711"] }, 
{ _id: "71", label: "PLATAFORMA", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/plataforma"},
{ _id: "72", label: "PRODUCTO", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/producto"},
{ _id: "73", label: "MEDIO DE PAGO", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/medioPago"},
{ _id: "74", label: "TIPO DE DOCUMENTO", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/tipoDocumento"},
{ _id: "75", label: "PLAN", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/plan"},
{ _id: "76", label: "TIPO DE PERSONA", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/tipoPersona"},
{ _id: "77", label: "CLASE DE RIESGO / ART. TARIFA", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/claseRiesgo"},
{ _id: "78", label: "VIGENCIA", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/vigencia"},
{ _id: "79", label: "FACTURACION", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/facturacion"},
{ _id: "710", label: "TARJETA", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/tarjeta"},
{ _id: "711", label: "CUOTAS", parent: "7", roles: ["ROLE_ADMIN"], link: "/paquetes/#/cuotas"},
{ _id: "8", label: "ABM TICKET", roles:["ROLE_TICKETBO"], children: ["81", "82", "83","84"] }, 
{ _id: "81", label: "TIPO MOTIVO", parent: "8", roles: ["ROLE_TICKETBO"], link: "/paquetes/#/tckMotivo"},
{ _id: "82", label: "TIPO CONCEPTO", parent: "8", roles: ["ROLE_TICKETBO"], link: "/paquetes/#/tckConcepto"},
{ _id: "83", label: "MOTIVO CONCEPTO EMAIL", parent: "8", roles: ["ROLE_TICKETBO"], link: "/paquetes/#/tckMotivoConceptoEmail"},
{ _id: "84", label: "DATOS ADICIONALES", parent: "8", roles: ["ROLE_TICKETBO"], link: "/paquetes/#/tckDatosAdicionales"},
 { _id: "9", label: "SALIR", roles: ["ROLE_ADMIN", "ROLE_TICKETBO"], link:"javascript:;", click: "logout()" }
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Se insertaron los 55 items del menu.");
    callback(result);
  });
}

var findDocuments = function(db, callback) {
  var collection = db.collection('menu');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(docs)
    callback(docs);
  });
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Conectado al servidor");
  insertDocuments(db, function() {
    findDocuments(db, function() { 
      db.close();
   });
  });
});
