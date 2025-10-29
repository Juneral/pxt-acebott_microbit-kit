enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

//% color="#31C7D5" weight=10 icon="\uf2db"
namespace Microbit_Kit {
    //% blockId=SetLed block="LED at %pin| is %status"   group="LED"
    //% weight=70
    export function myLED(pin: DigitalPin, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Button block="Button at %pin| is pressed" 
    //% group="Button"
    //% weight=70
    export function myButton(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin)==0?true:false;
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin| get value"
    //% group="Light Sensor"
    //% weight=70
    export function myLightSensor(pin: AnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin| get value"
    //% group="Sound Sensor"
    //% pin.shadow=analog_read_write_pin_shadow
    //% weight=70
    export function mySoundSensor(pin: AnalogPin): number {
        return pins.analogReadPin(pin)
    }

}
