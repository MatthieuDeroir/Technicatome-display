import smbus
import time
import subprocess
import re
import requests
import math

# Hard-coded API URL (no .env or token)
API_URL = "http://192.168.1.2:4000/api/data"

bus = smbus.SMBus(1)
TEMP_REG = 0x00
lm92_address = None

# If your I2C device is on any of these known LM92 addresses
known_addresses = [0x48, 0x49, 0x4A, 0x4B]

def find_i2c_address():
    """
    Use i2cdetect to find all addresses on I2C bus 1.
    Return a list of integer addresses.
    """
    try:
        output = subprocess.check_output(["i2cdetect", "-y", "1"])
        lines = output.decode("utf-8").split("\n")
        addresses = re.findall(r"\b[0-9a-fA-F]{2}\b", "\n".join(lines))
        # Convert hex strings to integers, skipping 'UU'
        addr_list = [int(a, 16) for a in addresses if a != "UU"]
        print("I2C addresses found:", addr_list)
        return addr_list
    except subprocess.CalledProcessError as e:
        print(f"Error running i2cdetect: {e}")
        return []

def read_temperature():
    """
    Read temperature from an LM92-like sensor using:
      - 2-byte read
      - Right shift by 3 bits (13-bit data)
      - Sign extension if bit 12 is set
      - LSB = 0.0625 °C
    Return an integer or float temperature in °C.
    If read fails, return None.
    """
    global lm92_address

    try:
        data = bus.read_i2c_block_data(lm92_address, TEMP_REG, 2)
        raw_temp = (data[0] << 8) | data[1]

        # Shift right 3 bits (since it's a 13-bit sensor)
        raw_temp >>= 3

        # If bit 12 is set => negative value => subtract 2^13 = 8192
        if raw_temp & 0x1000:
            raw_temp -= 8192

        # LM92 typically has 0.0625°C per LSB
        temperature_c = raw_temp * 0.0625
        # Round or ceil as you prefer; here we just do an integer round
        return round(temperature_c)
    except Exception as e:
        print(f"No data available: {e}")
        return None

def send_temperature(temp):
    """
    Send temperature to the hard-coded API_URL with a JSON body, no token.
    """
    payload = {"temperature": str(temp)}
    try:
        response = requests.put(API_URL, json=payload)
        if response.status_code == 200:
            print("Data successfully updated.")
        else:
            print(f"Failed to update data. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data: {e}")

# Main loop
while True:
    # If we haven't found the sensor address yet, look for it
    if lm92_address is None:
        addresses = find_i2c_address()
        for addr in addresses:
            if addr in known_addresses:
                lm92_address = addr
                break
        if lm92_address is None:
            print("LM92 sensor not found on the bus, retry in 10s...")
            send_temperature("---")
            time.sleep(10)
            continue

    # If found, read temperature and send it
    temp = read_temperature()
    if temp is not None:
        print(f"Temperature: {temp} °C")
        send_temperature(temp)
    else:
        send_temperature("---")

    time.sleep(3)  # Delay between reads

