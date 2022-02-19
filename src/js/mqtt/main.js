
var obj;


export default function mqqtClient() {

  const client = mqtt.connect("mqtt://127.0.0.1:8080");

  client.on('connect', function () {
    client.subscribe('data', function (err) {
      if (!err) {
        console.log("Suscribed");
      }
    })
  })
  
  client.on('message', function (topic, message) {
    obj = JSON.parse(message.toString());
  })

  return client;
}

export function mqqtReceived(){

  return obj;

}


