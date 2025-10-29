enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

enum MyDigitalPin {
    //% blockIdentity="pins._digitalPin"  // 关联系统引脚处理逻辑
    P0 = 100,

    //% blockIdentity="pins._digitalPin"
    P1 = 101,

    //% blockIdentity="pins._digitalPin"
    P2 = 102,

    //% blockIdentity="pins._digitalPin"
    P3 = 103,

    //% blockIdentity="pins._digitalPin"
    P4 = 104,

    //% blockIdentity="pins._digitalPin"
    P5 = 105,

    //% blockIdentity="pins._digitalPin"
    P6 = 106,

    //% blockIdentity="pins._digitalPin"
    P7 = 107,

    //% blockIdentity="pins._digitalPin"
    P8 = 108,

    //% blockIdentity="pins._digitalPin"
    P9 = 109,

    //% blockIdentity="pins._digitalPin"
    P10 = 110,

    //% blockIdentity="pins._digitalPin"
    P11 = 111,

    //% blockIdentity="pins._digitalPin"
    P12 = 112,

    //% blockIdentity="pins._digitalPin"
    P13 = 113,

    //% blockIdentity="pins._digitalPin"
    P14 = 114,

    //% blockIdentity="pins._digitalPin"
    P15 = 115,

    //% blockIdentity="pins._digitalPin"
    P16 = 116,

    //% blockIdentity="pins._digitalPin"
    P19 = 119,

    //% blockIdentity="pins._digitalPin"
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
