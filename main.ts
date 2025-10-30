enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

enum RELAY {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

enum MyDigitalPin {
    //% block="P0"
    P0 = 100,
    //% block="P1"
    P1 = 101,
    //% block="P2"
    P2 = 102,
    //% block="P3(Col1)"
    P3 = 103,
    //% block="P4(Col2)"
    P4 = 104,
    //% block="P5(A)"
    P5 = 105,
    //% block="P6(Col9)"
    P6 = 106,
    //% block="P7(Col8)"
    P7 = 107,
    //% block="P8"
    P8 = 108,
    //% block="P9(Col7)"
    P9 = 109,
    //% block="P10(Col3)"
    P10 = 110,
    //% block="P11(B)"
    P11 = 111,
    //% block="P12"
    P12 = 112,
    //% block="P13(SCK)"
    P13 = 113,
    //% block="P14(MISO)"
    P14 = 114,
    //% block="P15(MOSI)"
    P15 = 115,
    //% block="P16"
    P16 = 116,
    //% block="P19(SCL)"
    P19 = 119,
    //% block="P20(SDA)"
    P20 = 120,
}

enum MyAnalogPin {
    //% block="P0"
    P0 = 100,
    //% block="P1"
    P1 = 101,
    //% block="P2"
    P2 = 101,
    //% block="P3(Col1)"
    P3 = 103,
    //% block="P4(Col2)"
    P4 = 104,
    //% block="P10(Col3)"
    P10 = 110
}

//% color="#31C7D5" weight=10 icon="\uf2db"
namespace Microbit_Kit {

    //% blockId=my_digital_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _digitalPinShadow(pin: MyDigitalPin): number {
        return pin;
    }

    //% blockId=my_analog_read_write_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogReadWritePinShadow(pin: MyAnalogPin): number {
        return pin;
    }

    //% blockId=LED_Module block="LED at %pin| is %status"   group="LED"
    //% pin.shadow=my_digital_pin_shadow
    export function myLED(pin: number, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=RGB_Module block="RGB Red %rpin %rv Green %gpin %gv Blue %bpin %bv"   group="RGB"
    //% rpin.shadow=my_digital_pin_shadow
    //% gpin.shadow=my_digital_pin_shadow
    //% bpin.shadow=my_digital_pin_shadow
    //% rv min=0 max=255
    //% inlineInput=1
    export function myRGB(rpin: number, rv: number, gpin: number, gv: number, bpin: number, bv: number): void {
        pins.analogWritePin(rpin, rv)
        pins.analogWritePin(gpin, gv)
        pins.analogWritePin(bpin, bv)
    }

    //% blockId=Button block="Button at %pin| is pressed" 
    //% group="Button"
    //% pin.shadow=my_digital_pin_shadow
    export function myButton(pin: number): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin| get value"
    //% group="Light Sensor"
    //% pin.shadow=my_analog_read_write_pin_shadow
    export function myLightSensor(pin: number): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin| get value"
    //% group="Sound Sensor"
    //% pin.shadow=my_analog_read_write_pin_shadow
    export function mySoundSensor(pin: number): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Tilt_Sensor block="Tilt Sensor at %pin| is tilted" 
    //% group="Tilt Sensor"
    //% pin.shadow=my_digital_pin_shadow
    export function myTiltSensor(pin: number): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Digital block="Soil Moisture Sensor at %pin| digital value"
    //% group="Soil Moisture Sensor"
    //% pin.shadow=my_digital_pin_shadow
    export function mySoilMoistureSensor_digitalValue(pin: number): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Analog block="Soil Moisture Sensor at %pin| analog value"
    //% group="Soil Moisture Sensor"
    //% pin.shadow=my_analog_read_write_pin_shadow
    export function mySoilMoistureSensor_analogValue(pin: number): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Infrared_Obstacle_Avoidance_Sensor block="Infrared Obstacle Avoidance Sensor at %pin| digital value"
    //% group="Infrared Obstacle Avoidance Sensor"
    //% pin.shadow=my_digital_pin_shadow
    export function myInfrared_Obstacle_Avoidance_Sensor(pin: number): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Relay block="Relay at %pin| is %status"   group="Relay"
    //% pin.shadow=my_digital_pin_shadow
    export function myRelay(pin: number, status: RELAY): void {
        pins.digitalWritePin(pin, status)
    }

    
}
