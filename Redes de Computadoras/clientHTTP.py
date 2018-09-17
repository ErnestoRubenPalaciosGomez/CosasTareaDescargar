# coding=utf-8
import socket 
import sys
USER_AGENT1 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
USER_AGENT2 = "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)"
USER_AGENT3 = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"


def Manual():
    print """
    el programa se debe ejcutar de la siguiente manera:
        $ python clientHTTP.py host http_method url user_agent encoding connection 
    en donde:
    host: corresponde a la direccion IP del servidor HTTP o a su nombre de dominio, por ejemplo www.fciencias.unam.mx. 
    http_method: corresponde al metodo de HTTP que se usara para enviar la solicitud al servidor, para este cliente solamente se usara HEAD o GET.
    url: corresponde al archivo o recurso solicitado al servidor web, por ejemplo / para directorio raiz, o imagen.jpg. 
    user_agent: Tiene 3 opciones 
        -1 .- Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
        -2 .- Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)
        -3 .- Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0
    encoding: corresponde al parametro de la solicitud de la codiﬁcacion de la respuesta, por ejemplo gzip, deﬂate o identity. 
    connection, se reﬁere a la forma del establecimiento de la conexion, por ejemplo keep-alive o close.
    un ejemplo de consulta seria:
        $ python clientHTTP.py www.fciencias.unam.mx GET / 1 identity close
    """
def proccessArguments():
    arguments = sys.argv

    if(len(arguments) != 7):
        Manual()
        return False # regresamos falso cuando los argumentos no se cumplen 
    else:
        #print "Numero de argumentos por linea de comandos :" , len(arguments)
        #print "La lista de los argumentos por la linea de comandos" ,  arguments   
        # Recibe de la linea de comandos un argumento, 
        # la diraccion IP del servidor o nombre de dominio
        return arguments

def constructHTTPRequest(argumentos):
    HTTP_request = ""
    host = argumentos[1]
    http_method = argumentos[2]
    url = argumentos[3]
    user_agent = argumentos[4]
    encoding = argumentos[5]
    connection = argumentos[6]
    user_agent_valido = False

    #print user_agent 

    if (user_agent == "1"):
        user_agent = USER_AGENT1
        user_agent_valido = True
    if (user_agent == "2"):
        user_agent = USER_AGENT2
        user_agent_valido = True
    if (user_agent == "3"):
        user_agent = USER_AGENT3
        user_agent_valido = True
    if(not(user_agent_valido)):
        print "Error : usser_agent invalido solo se acepta las opciones 1 , 2 o 3"
        return False # regresamos false si nos dieron un usser agent invalido menor que 1 mayor que 3

    #print user_agent 

    HTTP_request = http_method + " " + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "User-Agent:" + user_agent + "\r\n"
    HTTP_request = HTTP_request + "Accept: text/plain\r\n" + "Accept-Charset: utf-8\r\n" + "Accept-Encoding: " + encoding + "\r\n"
    HTTP_request = HTTP_request + "Accept-Language: sr-Lat\r\n"+ "Connection: " + connection + "\r\n\r\n"
    #print HTTP_request 
    return HTTP_request

def TCPconnection(host_server , HTTP_request):
    # Crea un socket de TCP
    s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

    # conexion del cliente al servidor dado,
    # en el puerto 80 para HTTP
    s.connect((host_server,80))

    # Envia la peticion HTTP al servidor
    s.send(HTTP_request)

    #Declaracion de la variable HTTP_response
    HTTP_response = ""

    # Mientras reciba la informacion del servidor , la guardara
    # en HTTP_response, e imprimirá en pantalla
    while True:
        HTTP_response = s.recv(1024)
        if HTTP_response == "": break
        print HTTP_response

    #Una vez que la recepcion de informacion ha termiando
    # se cierra la conexion con el servidor 
    s.close()

    print "\n\nConexion con el servidor finalizada\n"

arguments = proccessArguments()
if (arguments):
    HTTP_request = constructHTTPRequest(arguments)
    if(HTTP_request):
        TCPconnection(arguments[1],HTTP_request)

#comando para ejecutar python clientHTTP.py www.fciencias.unam.mx GET / 1 identity close
