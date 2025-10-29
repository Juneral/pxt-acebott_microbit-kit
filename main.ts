//% color="#31C7D5" weight=10 icon="\uf2db"
namespace Microbit_Kit {

    export enum LED {
        //% block="ON"
        ON = 1,
        //% block="OFF"
        OFF = 0
    }

    //% blockId=SetLed block="LED at %pin| is %status"   group="LED"
    //% weight=70
    export function myLED(pin: DigitalPin, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Button block="Button at %pin| is pressed"   group="LED"
    //% weight=70
    export function myButton(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin)==0?true:false;
    }
}
