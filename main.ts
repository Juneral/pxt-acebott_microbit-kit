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

const enum CharIndex {
    //% block="1"
    C1 = 0,
    //% block="2"
    C2 = 1,
    //% block="3"
    C3 = 2,
    //% block="4"
    C4 = 3,
    //% block="5"
    C5 = 4,
    //% block="6"
    C6 = 5,
    //% block="7"
    C7 = 6,
    //% block="8"
    C8 = 7
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
    //% pin.defl=MyDigitalPin.P2
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

    // LCD1602 @start
    let i2cAddr: number // 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data
    let Custom_Char: number[][] = []

    // set LCD reg
    function setreg(d: number) {
        pins.i2cWriteNumber(i2cAddr, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    // send data to I2C bus
    function set(d: number) {
        d = d & 0xF0
        d = d + BK + RS
        setreg(d)
        setreg(d + 4)
        setreg(d)
    }

    // send command
    function cmd(d: number) {
        RS = 0
        set(d)
        set(d << 4)
    }

    // send data
    function dat(d: number) {
        RS = 1
        set(d)
        set(d << 4)
    }

    //% blockId="LCD1602_Clear" block="LCD1602 clear screen"
    //% group="LCD1602"
    export function LCD1602_Clear(): void {
        cmd(0x01)
    }

    //% blockId="LCD1602_shl" block="LCD1602 shift left"
    //% group="LCD1602"
    export function LCD1602_shl(): void {
        cmd(0x18)
    }

    //% blockId="LCD1602_shr" block="LCD1602 shift right"
    //% group="LCD1602"
    export function LCD1602_shr(): void {
        cmd(0x1C)
    }

    //% blockId="LCD1602_Makecharacter"
    //% block="LCD1602 create custom character %char_index|%im"
    //% group="LCD1602"
    export function LCD1602_CreateCharacter(char_index: CharIndex, im: Image): void {
        const customChar = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 5; x++) {
                if (im.pixel(x, y)) {
                    customChar[y] |= 1 << (4 - x)
                }
            }
        }
        Custom_Char[char_index] = customChar;
    }

    //% blockId="LCD1602_Characterpixels"
    //% block="Custom character"
    //% imageLiteral=1
    //% imageLiteralColumns=5
    //% imageLiteralRows=8
    //% imageLiteralScale=0.6
    //% shim=images::createImage
    //% group="LCD1602"
    export function LCD1602_CharacterPixels(i: string): Image {
        return <Image><any>i;
    }


    //% blockId="LCD1602_Showchararacter"
    //% block="LCD1602 at (x:|%x|,y:|%y) show custom character|%char_index"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% group="LCD1602"
    export function LCD1602_Showchararacter(x: number, y: number, char_index: CharIndex): void {
        let a: number
        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(0x40 | (char_index << 3));
        for (let y = 0; y < 8; y++) {
            dat(Custom_Char[char_index][y]);
        }
        cmd(a)
        dat(char_index)

    }

    //% blockId="LCD1602_ShowString" block="LCD1602 at (x:|%x|,y:|%y) show string|%s|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% s.defl="Hello,Acebott!"
    //% group="LCD1602"
    export function LCD1602_ShowString(x: number, y: number, s: string): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    //% blockId="LCD16202_ShowNumber" block="LCD1602 at (x:|%x|,y:|%y) show number|%n|"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    //% group="LCD1602"
    export function LCD1602_ShowNumber(x: number, y: number, n: number): void {
        let s = n.toString()
        LCD1602_ShowString(x, y, s)
    }

    //% blockId="LCD1602_Init" block="LCD1602 initialization"
    //% group="LCD1602"
    export function LCD1602_Init(): void {
        i2cAddr = 39
        BK = 8
        RS = 0
        cmd(0x33)       // set 4bit mode
        basic.pause(5)
        set(0x30)
        basic.pause(5)
        set(0x20)
        basic.pause(5)
        cmd(0x28)       // set mode
        cmd(0x0C)
        cmd(0x06)
        cmd(0x01)       // clear
    }
    // LCD1602 @end

    // Color Sensor V2.0
    let BH1745ColorInit = false;
    let BH1745: BH1745NUC;
    //% blockId=Color_Sensor_Update block="Color Sensor update value"
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

    //% blockId=OLED_Init block="OLED Init"
    //% group="1.3 inch OLED"
    export function OLED_Init():void{
        if (!OLEDInit) {
            OLED = new SH1106()
            OLEDInit = true
        }
        OLED.init()
    }

    //% blockId=OLED_ClearScreen block="OLED Clear Screen to %"
    //% group="1.3 inch OLED"
    export function OLED_ClearScreen(): void {
        if (!OLEDInit) {
            OLED = new SH1106()
            OLEDInit = true
        }
        OLED.init()
    }




    
}
