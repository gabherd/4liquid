#include <WiFiEsp.h>
#include <SoftwareSerial.h>
#include "DHT.h"
#define DHTPIN 7
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

SoftwareSerial WifiSerial(3,4);
long BaudRate = 9600;
char ssid[] = "Red flor";
char pass[] = "H0L4T0D0S.2020.abc";
int status = WL_IDLE_STATUS;

char server[] = "192.168.1.70";
int port = 32000;
WiFiEspClient client;
unsigned long lastSend;
float peso, temperature, humidity;

void setup(){
  Serial.begin(9600);
  lastSend = 0;

  WifiSerial.begin(BaudRate);
  WiFi.init(&WifiSerial);
  delay(100);

  if(WiFi.status() == WL_NO_SHIELD){
    Serial.println(F("No se detecta al Modulo WiFi"));
    while(true);
  }

  while(status != WL_CONNECTED){
        Serial.print(F("Intentanto conectarse al WPA SSID: "));
        Serial.println(ssid);
        status = WiFi.begin(ssid, pass);
        delay(200);
  }

  Serial.println(F("Conexion exitosa con la red wifi"));
  printWifiStatus();
}

void loop(){
  //INICIA - comprueba que el esp8266 este conectado al wifi
  status = WiFi.status();
  if(status != WL_CONNECTED){
    while(status != WL_CONNECTED){
      Serial.print(F("Attemping to connect to WPA SSID: "));
      Serial.println(ssid);

      status = WiFi.begin(ssid, pass);
      delay(200);
    }
    Serial.println(F("Connected to AP"));
  }

  if(!client.connected()){
    reconnect();
  }
  //TERMINA - aqui termina la comprobacion del wifi
///////////////////////////////////////////////////////////////////////////////////////////







  //######################################################3
  //######################################################3
  //######################################################3
  //######################################################3
  //######################################################3
  //qui va el codigo de la bascula








///////////////////////////////////////////////////////////////////////////////////////////
  //seccion de muestreo de sensores y envio de valores
  if(millis() - lastSend > 2000){
    
    
    
    peso = 12;  //reemplazar variable
    temperature = 12;    //reemplazar variable
    humidity = 12;    //reemplazar variable


    String payload = "{\"Barril\":" + String(1) + ",\"Peso\":" + String(peso) + ",\"Temperatura\":" + String(temperature) + ",\"Humedad\":" + String(humidity) + "}";
    Serial.println(payload);

    //Envia mensaje por el al servidor TCp
    client.print(payload);
    lastSend = millis();
  }

  while(client.available()){
    char c = client.read();
    Serial.write(c); 
  }
}

void printWifiStatus(){
  Serial.print(F("SSID: "));
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  Serial.print(F("Direccion IP: "));
  Serial.println(ip);

  Serial.println();
  Serial.println(F("Iniciando la conexion con el servidor TCP..."));
  if(client.connect(server, port)){
    Serial.println(F("conexion establecida!"));
  }
}

void reconnect(){
  while(!client.connected()){
    Serial.print(F("Conectando al servidor TCP..."));
    if(client.connect(server, port)){
      Serial.println(F("... conexion establecida!"));
    }else{
      Serial.print(F("[FALLO] [ rc = "));
      Serial.println(F(" : reintentando in 2 segundos]"));
      delay(2000);
    }
  }
}
