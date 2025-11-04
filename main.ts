const enum LED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

const enum RELAY {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0
}

const enum DistanceUnit {
    //% block="cm"
    CM = 0,
    //% block="inch"
    INCH = 1
}



const enum MyDigitalPin {
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

const enum MyAnalogPin {
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
    //% subcategory=Module
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
    //% subcategory=Module
    export function myRGB(rpin: MyDigitalPin, rv: number, gpin: MyDigitalPin, gv: number, bpin: MyDigitalPin, bv: number): void {
        pins.analogWritePin(rpin, rv)
        pins.analogWritePin(gpin, gv)
        pins.analogWritePin(bpin, bv)
    }

    //% blockId=Button block="Button at %pin is pressed" 
    //% group="Button"
    //% subcategory=Module
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Button block="Joystick button at %pin is pressed"
    //% subcategory=Module
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    //% pin.defl=MyDigitalPin.P2
    export function myJoystickButton(pin: MyDigitalPin): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Joystick_Y block="Joystick Y-axis at %pin get value"
    //% subcategory=Module
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P1
    export function myJoystick_Y(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Joystick_X block="Joystick X-axis at %pin get value"
    //% subcategory=Module
    //% group="Joystick"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    //% pin.defl=MyAnalogPin.P0
    export function myJoystick_X(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Light_Sensor block="Light Sensor at %pin get value"
    //% subcategory=Sensor
    //% group="Light Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function myLightSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Sound_Sensor block="Sound Sensor at %pin get value"
    //% subcategory=Sensor
    //% group="Sound Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoundSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Tilt_Sensor block="Tilt Sensor at %pin is tilted" 
    //% subcategory=Sensor
    //% group="Tilt Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myTiltSensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Digital block="Soil Moisture Sensor at %pin digital value"
    //% subcategory=Sensor
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function mySoilMoistureSensor_digitalValue(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 1 ? true : false;
    }

    //% blockId=Soil_Moisture_Sensor_Analog block="Soil Moisture Sensor at %pin analog value"
    //% subcategory=Sensor
    //% group="Soil Moisture Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=3
    export function mySoilMoistureSensor_analogValue(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin)
    }

    //% blockId=Infrared_Obstacle_Avoidance_Sensor block="Infrared Obstacle Avoidance Sensor at %pin digital value"
    //% subcategory=Sensor
    //% group="Infrared Obstacle Avoidance Sensor"
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myInfrared_Obstacle_Avoidance_Sensor(pin: MyDigitalPin): boolean {
        return pins.digitalReadPin(pin) == 0 ? true : false;
    }

    //% blockId=Relay block="Relay at %pin is %status"   group="Relay"
    //% subcategory=Module
    //% pin.fieldEditor=pinpicker
    //% pin.fieldOptions.columns=4
    export function myRelay(pin: MyDigitalPin, status: RELAY): void {
        pins.digitalWritePin(pin, status)
    }

    //% blockId=Ultrasonic_Sensor block="Ultrasonic Sensor ECHO at %epin TRIG at is %tpin get distance in %unit"
    //% subcategory=Sensor
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

    // Barometric Pressure Sensor
    let BMP280Init = false;
    let _BMP280: BMP280;

    //% blockId="BMP280_GET_TEMPERATURE" block="get temperature"
    //% subcategory=Sensor
    //% group="Barometric Pressure Sensor"
    //% weight=80 blockGap=8
    export function BMP280_getTemperature(): number {
        if (!BMP280Init) {
            _BMP280 = new BMP280();
            BMP280Init = true;
        }
        return _BMP280.temperature();
    }

    //% blockId="BMP280_GET_PRESSURE" block="get pressure"
    //% subcategory=Sensor
    //% group="Barometric Pressure Sensor"
    //% weight=80 blockGap=8
    export function BMP280_getPressure(): number {
        if (!BMP280Init) {
            _BMP280 = new BMP280();
            BMP280Init = true;
        }
        return _BMP280.pressure();
    }

    // Color Sensor V2.0
    let BH1745ColorInit = false;
    let BH1745: BH1745NUC;
    //% blockId=Color_Sensor_Update block="Color Sensor update value"
    //% subcategory=Sensor
    //% group="Color Sensor"
    //% weight=53 color=#49CEF7
    export function Color_Sensor_Update(): void {
        if (!BH1745ColorInit) {
            BH1745 = new BH1745NUC()
            BH1745ColorInit = true
        }
        BH1745.update()
    }

    //% blockId=Color_Sensor_getValue block="Color Sensor get %type value"
    //% subcategory=Sensor
    //% group="Color Sensor" weight=52 color=#49CEF7
    export function ColorSensor_getValue(type: ColorType): number {
        if (!BH1745ColorInit) {
            BH1745 = new BH1745NUC()
            BH1745ColorInit = true
        }
        return BH1745.getValue(type)
    }

    // SH1106 OLED 128*64 Driver Block
    let OLEDInit = false;
    let OLED:SH1106;

    //% blockId=OLED_SetPixel block="OLED set pixel at (%x,%y) to %color"
    //% subcategory="1.3 inch OLED"
    //% x.min=0 x.max=127 y.min=0 y.max=63
    export function OLED_SetPixel(x:number,y:number,color: boolean): void {
        OLED.setPixel(x,y,color)
    }

    //% blockId=OLED_Refresh block="OLED refresh screen"
    //% subcategory="1.3 inch OLED"
    export function OLED_Refresh(): void {
        OLED.refresh()
    }

    //% blockId=OLED_ClearScreen block="OLED Clear Screen to %color"
    //% subcategory="1.3 inch OLED"
    export function OLED_ClearScreen(color: boolean): void {
        OLED.clearScreen(color)
    }

    //% blockId=OLED_SetContrast block="OLED set contrast to %v"
    //% v.defl=128 v.min=0 v.max=255
    //% subcategory="1.3 inch OLED"
    export function OLED_SetContrast(v: number): void {
        OLED.setContrast(v)
    }

    //% blockId=OLED_Init block="OLED Init"
    //% subcategory="1.3 inch OLED"
    export function OLED_Init(): void {
        if (!OLEDInit) {
            OLED = new SH1106()
            OLEDInit = true
        }
        OLED.init()
    }

    // LCD1602 Block Driver
    let LCD1602Init = false;
    let _LCD1602: LCD1602;

    

    //% blockId="LCD1602_Clear" block="LCD1602 clear screen"
    //% subcategory="LCD1602"
    export function LCD1602_Clear(): void {
        _LCD1602.ClearScreen()
    }

    //% blockId=LCD1602_Init block="LCD1602 Init"
    //% subcategory="LCD1602"
    export function LCD1602_Init(): void {
        if (!LCD1602Init) {
            _LCD1602 = new LCD1602()
            LCD1602Init = true
        }
        _LCD1602.init()
    }



    




    
}
