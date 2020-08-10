#!/usr/bin/python3 coding: utf-8 -*-
import time 
import datetime 
import pymysql 
import socket  
from threading import Thread 
from socketserver import ThreadingMixIn 
import json 
import paho.mqtt.client as mqttConnect 
import requests

mqttClient = mqttConnect.Client()
mqttBroker = "broker.mqttdashboard.com" #any other broker
#mqttBroker = "localhost" #Any other broker
mqttPort = 1883
mqttTopic =  "instalacion1/seccion1/barril/1"

# Multithreaded Python server : TCP Server Socket Thread Pool 
class ClientThread(Thread): 
	def __init__ (self,ip,port): 
		Thread.__init__(self) 
		self.ip = ip 
		self.port = port 
		print("[+] Nuevo servidor iniciado para el Host " + ip + ":" + str(port)) 
	def run(self): 
		while True :
			data = conn.recv(2048) 
			if (data != b''): 
				print("\nDatos recibidos sin procesar:", data) 
				try: 
					json_msg = data.decode('utf-8') 
				except: 
					print("Fallo la decodificacion del mensaje JSON") 
					continue 
				if json_msg != '':
					print('\nMensaje recibido: %s' % json_msg) 
					try: 
						parsed_data = json.loads(json_msg)
						strBarril = str(parsed_data['Barril'])
						strPeso = str(parsed_data['Peso'])
						strTemperatura = str(parsed_data['Temperatura'])
						strHumedad = str(parsed_data['Humedad']) 

						time_sec = time.time() 
						st = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') 
						str(datetime.datetime.now()).split('.')[0]
						str_ts = str(time_sec).split('.')[0] 

						print(str_ts) 
						print(st) 
						print('Barril : %s' % strBarril) 
						print('Peso : %s %%' % strPeso) 
						print('Temperature : %s oC' % strTemperatura) 
						print('Humidity : %s %%' % strHumedad) 

						############ 
						Pes = int(parsed_data['Peso']) 
						Tem = int(parsed_data['Temperatura']) 
						Hum = int(parsed_data['Humedad']) 

						TBname = "ba_nodo" + strBarril 
						sql_string = "INSERT INTO %s (ba_peso, ba_temperatura, ba_humedad) VALUES ('%d','%d', '%d')" % (TBname,Pes,Tem, Hum) 
						#cloud_sql_string = "INSERT INTO `ba_nodo1` (`ba_id`, `ba_peso`, `ba_temperatura`, `ba_humedad`, `ba_beerName`) VALUES (NULL, '0', '6', '6', 'Barril-3')"
						

						try: 
							r = requests.get("http://4liquid.000webhostapp.com/php/insert.php?temperatura=26&humedad=2&peso=2")
							#db = pymysql.connect("localhost", local_sql_user, local_sql_password, local_sql_DB) 
							#cursor = db.cursor() 
							#cursor.execute(sql_string) 
							#db.commit()
							#db.close() 


							#db = pymysql.connect("files.000webhost.com", cloud_sql_user, cloud_sql_password, cloud_sql_DB) 
							#cursor = db.cursor() 
							#cursor.execute(cloud_sql_string) 
							#db.commit()
							#db.close() 

							print(sql_string) 
							print("Exito: Se inserto en la Base de Datos!\n") 
						except pymysql.Error as error: 
							print("Error: {}".format(error)) 

						try:
							print("ENTRA AL BROKER")
							mqttClient.connect(mqttBroker, mqttPort, 60)
							mqttClient.publish(mqttTopic, json_msg)
						except:
							print("Error conectando y enviando MQTT")
							continue

					except: 
						print("Json parsing failed!") 
						continue 
# Multithreaded Python server : TCP Server Socket Program Stub 
TCP_IP = '0.0.0.0' 
TCP_PORT = 32000
BUFFER_SIZE = 512 
# Usually 1024, but we need quick response 
tcpServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
tcpServer.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) 
tcpServer.bind((TCP_IP, TCP_PORT)) 
threads = []

local_sql_user = "user1" 
local_sql_password = "user1" 
local_sql_DB = "4liquid" 

cloud_sql_user = "id14548731_root" 
cloud_sql_password = "?p972#P6@h9HGRMU" 
cloud_sql_DB = "id14548731_4liquid" 

## Main ##
while True: 
	tcpServer.listen(10) 
	print("Servidor TCP Python multi-thread : Esperando conexion es de clientes...\n") 
	(conn, (ip,port)) = tcpServer.accept() 
	newthread = ClientThread(ip,port) 
	newthread.start() 
	threads.append(newthread) 
for t in threads: 
	t.join() 
