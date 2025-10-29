enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

enum MyDigitalPin {
    //% blockIdentity="pins._digitalPin"  // 关联系统引脚处理逻辑
    P0 = MICROBIT_ID_IO_P0,

    //% blockIdentity="pins._digitalPin"
    P1 = MICROBIT_ID_IO_P1,

    //% blockIdentity="pins._digitalPin"
    P2 = MICROBIT_ID_IO_P2,

    //% blockIdentity="pins._digitalPin"
    P3 = MICROBIT_ID_IO_P3,

    //% blockIdentity="pins._digitalPin"
    P4 = MICROBIT_ID_IO_P4,

    //% blockIdentity="pins._digitalPin"
    P5 = MICROBIT_ID_IO_P5,

    //% blockIdentity="pins._digitalPin"
    P6 = MICROBIT_ID_IO_P6,

    //% blockIdentity="pins._digitalPin"
    P7 = MICROBIT_ID_IO_P7,

    //% blockIdentity="pins._digitalPin"
    P8 = MICROBIT_ID_IO_P8,

    //% blockIdentity="pins._digitalPin"
    P9 = MICROBIT_ID_IO_P9,

    //% blockIdentity="pins._digitalPin"
    P10 = MICROBIT_ID_IO_P10,

    //% blockIdentity="pins._digitalPin"
    P11 = MICROBIT_ID_IO_P11,

    //% blockIdentity="pins._digitalPin"
    P12 = MICROBIT_ID_IO_P12,

    //% blockIdentity="pins._digitalPin"
    P13 = MICROBIT_ID_IO_P13,

    //% blockIdentity="pins._digitalPin"
    P14 = MICROBIT_ID_IO_P14,

    //% blockIdentity="pins._digitalPin"
    P15 = MICROBIT_ID_IO_P15,

    //% blockIdentity="pins._digitalPin"
    P16 = MICROBIT_ID_IO_P16,

    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1  // 隐藏该引脚在积木界面中的显示
    P19 = MICROBIT_ID_IO_P19,

    //% blockIdentity="pins._digitalPin"
    //% blockHidden=1
    P20 = MICROBIT_ID_IO_P20,
}

//% color="#31C7D5" weight=10 icon="\uf2db"
namespace Microbit_Kit {

    //% blockId=my_digital_pin_shadow
    //% block="$pin"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    //% blockHidden=1
    export function _digitalPinShadow(pin: DigitalPin): number {
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
