from w1thermsensor import W1ThermSensor
import requests

sensor = W1ThermSensor()

# API Endpoint
api_url = "http://127.0.0.1:4000/api/data/657ac815b7481055950ab1ae"  # Replace with your API URL and data ID

def read_temperature_from_sensor():
    # Reading temperature from DS18B20 sensor
    temperature = sensor.get_temperature()
    return temperature

def send_temperature_data():
    try:
        # Read temperature from sensor
        temperature = read_temperature_from_sensor()

        # Prepare data payload
        data_payload = {
            'temperature': str(temperature)
        }

        # Send data to API
        response = requests.put(api_url, json=data_payload)

        # Check response status
        if response.status_code == 200:
            print("Data sent successfully")
        else:
            print(f"Failed to send data: {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Run the function
send_temperature_data()
