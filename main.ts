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

enum DistanceUnit {
    //% block="cm"
    CM = 0,
    //% block="inch"
    INCH = 1
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
    
    //% blockId=LED_Module block="LED at %pin| is %status"   group="LED"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myLED(pin: MyDigitalPin, status: LED): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=RGB_Module block="RGB Red %rpin %rv Green %gpin %gv Blue %bpin %bv"   group="RGB"
    //% rpin.fieldEditor=pinpicker
    //% rpin.fieldOptions.columns=4
    //% gpin.fieldEditor=pinpicker
    //% gpin.fieldOptions.columns=4
    //% bpin.fieldEditor=pinpicker
    //% bpin.fieldOptions.columns=4
    //% rv.min=0 rv.max=1023
    //% gv.min=0 gv.max=1023
    //% bv.min=0 bv.max=1023
    //% rpin.defl=MyAnalogPin.P0
    //% gpin.defl=MyAnalogPin.P1
    //% bpin.defl=MyAnalogPin.P2
    //% inlineInputMode=inline
    export function myRGB(rpin: MyDigitalPin, rv: number, gpin: MyDigitalPin, gv: number, bpin: MyDigitalPin, bv: number): void {
        pins.analogWritePin(rpin, rv)
        pins.analogWritePin(gpin, gv)
        pins.analogWritePin(bpin, bv)
    }

    //% blockId=Button block="Button at %pin is pressed" 
    //% group="Button"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Button block="Joystick button at %pin is pressed"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.defl=MyAnalogPin.P2
    export function myJoystickButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Y block="Joystick Y-axis at %pin get value"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P1
    export function myJoystick_Y(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Joystick_X block="Joystick X-axis at %pin get value"
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P0
    export function myJoystick_X(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin get value"
    //% group="Light Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function myLightSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin get value"
    //% group="Sound Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoundSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Tilt_Sensor block="Tilt Sensor at %pin is tilted" 
    //% group="Tilt Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myTiltSensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Digital block="Soil Moisture Sensor at %pin digital value"
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function mySoilMoistureSensor_digitalValue(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Analog block="Soil Moisture Sensor at %pin analog value"
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoilMoistureSensor_analogValue(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Infrared_Obstacle_Avoidance_Sensor block="Infrared Obstacle Avoidance Sensor at %pin digital value"
    //% group="Infrared Obstacle Avoidance Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myInfrared_Obstacle_Avoidance_Sensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Relay block="Relay at %pin is %status"   group="Relay"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myRelay(pin: MyDigitalPin, status: RELAY): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Ultrasonic_Sensor block="Ultrasonic Sensor ECHO at %epin TRIG at is %tpin get distance in %unit"
    //% group="Ultrasonic Sensor"
    //% epin.fieldEditor=pinpicker
    //% epin.fieldOptions.columns=4
    //% tpin.fieldEditor=pinpicker
    //% tpin.fieldOptions.columns=4
    //% epin.defl=MyDigitalPin.P0
    //% tpin.defl=MyDigitalPin.P1
    export function UltrasonicDistance(epin: MyDigitalPin, tpin: MyDigitalPin, unit: DistanceUnit): number {
        // send pulse
        pins.setPull(tpin, PinPullMode.PullNone)
        pins.digitalWritePin(tpin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(tpin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(tpin, 0)

        // read pulse
        let d = pins.pulseIn(epin, PulseValue.High)
        let distance = d / 58

        if (distance > 500) {
            distance = 500
        }

        switch (unit) {
            case 0:
                return Math.floor(distance)  //cm
                break
            case 1:
                return Math.floor(distance / 254)   //inch
                break
            default:
                return 500
        }
    } 
}
