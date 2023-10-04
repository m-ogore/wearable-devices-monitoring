#include <SoftwareSerial.h>

// Define the SoftwareSerial object for the GSM/GPRS module
SoftwareSerial gsmSerial(10, 11); // RX (pin 7), TX (pin 8)

// Replace with your GSM/GPRS module's APN and server URL
const char* apn = "internet.mtn";
const char* server = "pelino.fr.fo";

// JSON data
const char* device_id = "64e12dc8fd9a79c1f4a3e826";
const float data = 3.14;
const char* type_id = "6513a7726deb3c5300f73601";

void setup() {
  // Start the hardware Serial for debugging
  Serial.begin(9600);

  // Start the SoftwareSerial for the GSM/GPRS module
  gsmSerial.begin(9600);

  Serial.println("Initializing GSM/GPRS module...");
  initGSM();
}

void loop() {
  // Create a URL with query parameters
  String url = createURL(device_id, type_id, data);
  Serial.println(url);

  // Send the GET request to the server and handle the response
  String response = sendGETRequest(url);
  Serial.println("Server Response:");
  Serial.println(response);

  delay(60000); // Send data every 60 seconds (adjust as needed)
}

void initGSM() {
  // Initialize the GSM/GPRS module
  gsmSerial.println("AT");
  delay(1000);
  gsmSerial.println("AT+CREG?");
  delay(1000);
  gsmSerial.println("AT+CGATT=1");
  delay(1000);
  gsmSerial.println("AT+CSTT=\"" + String(apn) + "\"");
  delay(1000);
  gsmSerial.println("AT+CIICR");
  delay(1000);
  gsmSerial.println("AT+CIFSR");
  delay(1000);
  gsmSerial.println("AT+CIPSPRT=0");
  delay(1000);
}

String createURL(const char* val1, const char* val2, float val3) {
  String url = "http://" + String(server) + "/wearable-api.php?";
  url += "deviceId=" + String(val1);
  url += "&typeId=" + String(val2);
  url += "&lat=0&long=0";
  url += "&value=" + String(val3, 2);
  return url;
}

String sendGETRequest(String url) {
  // Establish an HTTP connection
  gsmSerial.println("AT+CIPSTART=\"TCP\",\"" + String(server) + "\",80");
  delay(2000);

  // Prepare the HTTP GET request
  String getRequest = "GET " + url + " HTTP/1.1\r\n";
  getRequest += "Host: " + String(server) + "\r\n\r\n";

  // Send the HTTP GET request
  gsmSerial.print("AT+CIPSEND=");
  gsmSerial.println(getRequest.length());
  delay(1000);
  gsmSerial.print(getRequest);
  delay(1000);

  // Read and capture the server response
  String response;
  while (gsmSerial.available()) {
    char c = gsmSerial.read();
    response += c;
  }

  // Close the HTTP connection
  gsmSerial.println("AT+CIPCLOSE");
  delay(1000);

  return response;
}
