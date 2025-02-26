import smbus
import time

bus = smbus.SMBus(1)  # 1 indicates /dev/i2c-1
lm92_address = 0x4B  # Replace with your sensor's address

def read_temperature():
    try:
        data = bus.read_i2c_block_data(lm92_address, TEMP_REG, 2)
        temp = (data[0] << 8) + data[1]
        temp = temp * 0.0625  # Convert to Celsius
        return temp
    except IOError:
        print("Error reading from the temperature sensor. Retrying...")
        return read_temperature()

TEMP_REG = 0x00  # Replace with the correct register if necessary
temp = read_temperature()
print(f"Temperature: {temp}°C")
