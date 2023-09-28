#include <SoftwareSerial.h>

// Define the SoftwareSerial object for the GSM/GPRS module
SoftwareSerial gsmSerial(10, 11); // RX (pin 7), TX (pin 8)

// Replace with your GSM/GPRS module's APN and server URL
const char* apn = "internet.mtn";
const char* server = "https://pelino.fr.fo";//?deviceId=64e12dc8fd9a79c1f4a3e826&typeId=6513a7726deb3c5300f73601&lat=0&long=0&value=just_tested_it_now";

// JSON data
const char* device_id = "649556dacd972ba7c9728392";
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
  // Create a JSON object
  String jsonStr = createJSON(device_id, type_id, data);
  Serial.println(jsonStr);

  // Send the JSON data to the web server and handle the response
  String response = sendJSONData(jsonStr);
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

String createJSON(const char* val1, const char* val2, float val3) {
  String jsonString = "{\"deviceId\": \"" + String(val1) + "\", ";
  jsonString += "\"typeId\": \"" + String(val2) + "\", ";
  jsonString += "\"lat\": 0,";
  jsonString += "\"long\": 0,";
  jsonString += "\"value\": \"" + String(val3,2) + "\"}";
      
      /*
      "{\"deviceId\": \"649556dacd972ba7c9728392",
    "typeId": "6513a7726deb3c5300f73601",
    "lat": 0,
    "long": 0,
    "value": "50"*/
  return jsonString;
}

String sendJSONData(String jsonStr) {
  // Establish an HTTP connection
  gsmSerial.println("AT+CIPSTART=\"SSL\",\"" + String(server) + "\",443");
  delay(2000);
 

  // Prepare the HTTP POST request
  String postRequest = "POST \wearable-api.php HTTP/1.1\r\n";
  postRequest += "Host: " + String(server) + "\r\n";
  postRequest += "Content-Type: application/json\r\n";
  postRequest += "Content-Length: " + String(jsonStr.length()) + "\r\n\r\n";
  postRequest += jsonStr;

  // Send the HTTP POST request
  gsmSerial.print("AT+CIPSEND=");
  gsmSerial.println(postRequest.length());
  delay(1000);
  gsmSerial.print(postRequest);
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
