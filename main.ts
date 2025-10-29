enum LED {
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
    //% block="P3"
    P3 = 103,
    //% block="P4"
    P4 = 104,
    //% block="P5"
    P5 = 105,
    //% block="P6"
    P6 = 106,
    //% block="P7"
    P7 = 107,
    //% block="P8"
    P8 = 108,
    //% block="P9"
    P9 = 109,
    //% block="P10"
    P10 = 110,
    //% block="P11"
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
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _analogReadWritePinShadow(pin: AnalogReadWritePin): number {
        return pin;
    }

    //% blockId=SetLed block="LED at %pin| is %status"   group="LED"
    //% weight=70
    //% pin.shadow=my_digital_pin_shadow
    export function myLED(pin: number, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Button block="Button at %pin| is pressed" 
    //% group="Button"
    //% weight=70
    //% pin.shadow=my_digital_pin_shadow
    export function myButton(pin: number): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin| get value"
    //% group="Light Sensor"
    //% pin.shadow=my_analog_read_write_pin_shadow
    //% weight=70
    export function myLightSensor(pin: number): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin| get value"
    //% group="Sound Sensor"
    //% pin.shadow=my_analog_read_write_pin_shadow
    //% weight=70
    export function mySoundSensor(pin: number): number {
        return pins.analogReadPin(pin)
    }
}
