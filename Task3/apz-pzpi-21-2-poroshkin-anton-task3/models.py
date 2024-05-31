class ClimateProfile:
    def __init__(self, id, name, temperature, humidity, isActive, clientId):
        self.id = id
        self.name = name
        self.temperature = temperature
        self.humidity = humidity
        self.is_active = isActive
        self.client_id = clientId


class ClimateDevice:
    def __init__(self, id, type, address, status, roomId, accessionNumber, manufacturer):
        self.id = id
        self.type = type
        self.address = address
        self.status = status
        self.room_id = roomId
        self.accessionNumber = accessionNumber
        self.manufacturer = manufacturer

class ClimateDeviceStatus:
    OK = "ok"
    WARNING = "warning"
    ERROR = "error"

class ClimateDeviceType:
    THERMOSTAT = "thermostat"
    HUMIDISTAT = "humidistat"