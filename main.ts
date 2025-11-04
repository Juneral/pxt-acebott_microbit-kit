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

    // SH1106 OLED驱动 (128x64)
    const ADDR = 0x3C
    let screen = pins.createBuffer(1025) // 128x64 / 8 = 1024 + 1 command byte
    let charset: number[][] = []
    let charsetIndex: string[] = []

    // SH1106 command functions
    function cmd1(cmd1: number): void {
        let buffer = pins.createBuffer(2)
        buffer[0] = 0x00  // Co=0, D/C=0
        buffer[1] = cmd1
        pins.i2cWriteBuffer(ADDR, buffer)
    }

    function cmd2(cmd1: number, cmd2: number): void {
        let buffer = pins.createBuffer(3)
        buffer[0] = 0x00
        buffer[1] = cmd1
        buffer[2] = cmd2
        pins.i2cWriteBuffer(ADDR, buffer)
    }

    function cmd3(cmd1: number, cmd2: number, cmd3: number): void {
        let buffer = pins.createBuffer(4)
        buffer[0] = 0x00
        buffer[1] = cmd1
        buffer[2] = cmd2
        buffer[3] = cmd3
        pins.i2cWriteBuffer(ADDR, buffer)
    }

    function showbit(bit: number, shift: number): number {
        if (bit & (1 << shift)) { }
        else {
            bit += 1 << shift
        }
        return bit
    }

    function hidebit(bit: number, shift: number): number {
        if (bit & (1 << shift)) {
            bit -= 1 << shift
        }
        return bit
    }

    function getbit(bits: number, shift: number): number {
        return (bits >> shift) & 1;
    }

    /**
     * Initialize SH1106 OLED display, this command must be called at the start of the program.
     */
    //% block="init SH1106 OLED display"
    //% group="1.3 inch OLED"
    //% weight=101
    export function init(): void {
        screen = pins.createBuffer(1025)

        // SH1106 initialization sequence
        cmd1(0xAE)       // Display OFF
        cmd1(0xA4)       // Display follows RAM content
        cmd2(0xD5, 0x80) // Set display clock divide ratio/oscillator frequency
        cmd2(0xA8, 0x3F) // Set multiplex ratio (1 to 64)
        cmd2(0xD3, 0x00) // Set display offset
        cmd1(0x40)       // Set display start line
        cmd2(0x8D, 0x14) // Enable charge pump regulator
        cmd2(0x20, 0x00) // Set memory addressing mode to horizontal
        cmd1(0xA0)       // Set segment re-map
        cmd1(0xC0)       // Set COM output scan direction
        cmd2(0xDA, 0x12) // Set COM pins hardware configuration
        cmd2(0x81, 0x80) // Set contrast control
        cmd2(0xD9, 0x22) // Set pre-charge period
        cmd2(0xDB, 0x20) // Set VCOMH deselect level
        cmd1(0xA6)       // Set normal display (not inverted)
        cmd1(0xAF)       // Display ON
        clear(false)
        setOrientation(true, true)
        draw()
    }

    /**
     * Sets the contrast level to the specified value.
     * @param contrast contrast level, eg: 128
     */
    //% block="set contrast $contrast"
    //% group="1.3 inch OLED"
    //% contrast.defl=128
    //% contrast.min=0
    //% contrast.max=255
    //% weight=100
    export function setContrast(contrast: number): void {
        cmd2(0x81, contrast)
    }

    /**
     * Fills the display buffer with specified color.
     * You need to call `draw` to see the changes.
     * @param color filling color (usually `false`)
     */
    //% block="clear $color"
    //% group="1.3 inch OLED"
    //% color.defl=false
    //% weight=99
    export function clear(color: boolean): void {
        screen.fill((color) ? 0xFF : 0)
    }

    /**
     * Sends buffer to SH1106 OLED display.
     * This command must be called whenever you want to show something on the OLED display.
     */
    //% block="draw"
    //% group="1.3 inch OLED"
    //% weight=98
    export function draw(): void {
        // SH1106 requires page-by-page writing with column address setting
        for (let page = 0; page < 8; page++) {
            // Set page address
            cmd1(0xB0 + page)
            // Set lower column address (start at 2 for 128x64 displays to center the image)
            cmd1(0x02)
            // Set higher column address
            cmd1(0x10)

            // Prepare data buffer for this page (128 bytes + 1 command byte)
            let pageBuffer = pins.createBuffer(129)
            pageBuffer[0] = 0x40  // Co=0, D/C=1 (data)

            // Copy page data from screen buffer
            for (let col = 0; col < 128; col++) {
                pageBuffer[col + 1] = screen[page * 128 + col + 1]
            }

            pins.i2cWriteBuffer(ADDR, pageBuffer)
        }
    }

    /**
     * Sets pixel at x y to specified color color.
     * You need to call `draw` to see the changes.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     * @param color color of pixel
     */
    //% block="set pixel at x $x y $y to $color"
    //% group="1.3 inch OLED"
    //% color.defl=true
    //% weight=97
    export function setPx(x: number, y: number, color: boolean): void {
        const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
        if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
            screen[index] = (color) ? showbit(screen[index], (y % 8)) : hidebit(screen[index], (y % 8))
        }
    }

    /**
     * Toggles pixel at x y, it means that `true` will be `false` and vice versa.
     * You need to call `draw` to see the changes.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     */
    //% block="toggle pixel at x $x y $y"
    //% group="1.3 inch OLED"
    //% weight=96
    export function togglePx(x: number, y: number): void {
        const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
        if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
            screen[index] = (!px(x, y)) ? showbit(screen[index], (y % 8)) : hidebit(screen[index], (y % 8))
        }
    }

    /**
     * Returns color of pixel at x y in buffer.
     * @param x coordinate x (increases towards the right)
     * @param y coordinate y (increases downwards)
     */
    //% block="pixel at x $x y $y"
    //% group="1.3 inch OLED"
    //% weight=95
    //% inlineInputMode=inline
    export function px(x: number, y: number): boolean {
        const index = Math.round(Math.floor(y / 8) * 128 + x + 1)
        if ((index < 1025) && (index > -1) && (x < 128) && (x > -1) && (y > -1) && (y < 64)) {
            return getbit(screen[index], (y % 8)) == 1
        } else {
            return false
        }
    }

    /**
     * Draws text with upper left corner at x y.
     * Text has fixed width (8 px).
     * You need to call `draw` to see the changes.
     * @param text text to draw (not all characters are implemented yet)
     * @param x coordinate x of upper left corner of text (increases towards the right)
     * @param y coordinate y of upper left corner of text (increases downwards)
     * @param color color of text
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    //% block="draw text $text at|x $x|y $y|color $color|toggle $toggle"
    //% group="1.3 inch OLED"
    //% color.defl=true
    //% toggle.defl=false
    //% weight=94
    //% inlineInputMode=inline
    export function drawText(text: string, x: number, y: number, color: boolean, toggle: boolean): void {
        const font = [
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x24, 0x24, 0x24, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x24, 0x24, 0x7E, 0x24, 0x7E, 0x24, 0x24, 0x00, 0x00, 0x00],
            [0x00, 0x08, 0x1C, 0x2A, 0x18, 0x0C, 0x2A, 0x1C, 0x08, 0x00, 0x00],
            [0x00, 0x24, 0x5C, 0x28, 0x08, 0x10, 0x14, 0x2A, 0x24, 0x00, 0x00],
            [0x00, 0x10, 0x28, 0x28, 0x10, 0x2A, 0x44, 0x44, 0x3A, 0x00, 0x00],
            [0x08, 0x08, 0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x04, 0x08, 0x08, 0x10, 0x10, 0x10, 0x10, 0x08, 0x08, 0x04, 0x00],
            [0x20, 0x10, 0x10, 0x08, 0x08, 0x08, 0x08, 0x10, 0x10, 0x20, 0x00],
            [0x00, 0x08, 0x2A, 0x1C, 0x1C, 0x2A, 0x08, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x08, 0x08, 0x3E, 0x08, 0x08, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x08, 0x10, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x04, 0x04, 0x08, 0x08, 0x08, 0x10, 0x10, 0x10, 0x20, 0x20, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x08, 0x18, 0x28, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x02, 0x04, 0x08, 0x10, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x02, 0x0C, 0x02, 0x02, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x04, 0x0C, 0x14, 0x14, 0x24, 0x3E, 0x04, 0x04, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x3C, 0x22, 0x02, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x0C, 0x10, 0x20, 0x3C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x3E, 0x02, 0x04, 0x08, 0x08, 0x10, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x1C, 0x22, 0x22, 0x22, 0x1C, 0x00, 0x00],
            [0x00, 0x1C, 0x22, 0x22, 0x22, 0x1E, 0x02, 0x04, 0x18, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x10, 0x10, 0x00, 0x00, 0x10, 0x10, 0x20, 0x00],
            [0x00, 0x00, 0x04, 0x08, 0x10, 0x20, 0x10, 0x08, 0x04, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x7E, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x20, 0x10, 0x08, 0x04, 0x08, 0x10, 0x20, 0x00, 0x00],
            [0x00, 0x38, 0x44, 0x08, 0x10, 0x10, 0x00, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x4E, 0x52, 0x52, 0x4E, 0x40, 0x3C, 0x00, 0x00],
            [0x00, 0x18, 0x24, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x40, 0x40, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x3E, 0x20, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x4E, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x42, 0x42, 0x42, 0x7E, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x1E, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x44, 0x38, 0x00],
            [0x00, 0x22, 0x24, 0x28, 0x30, 0x30, 0x28, 0x24, 0x22, 0x00, 0x00],
            [0x00, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x3E, 0x00, 0x00],
            [0x00, 0x41, 0x63, 0x55, 0x55, 0x49, 0x49, 0x41, 0x41, 0x00, 0x00],
            [0x00, 0x42, 0x62, 0x52, 0x52, 0x4A, 0x4A, 0x46, 0x42, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x40, 0x40, 0x40, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x52, 0x4A, 0x3C, 0x02, 0x00],
            [0x00, 0x7C, 0x42, 0x42, 0x42, 0x7C, 0x48, 0x44, 0x42, 0x00, 0x00],
            [0x00, 0x3C, 0x42, 0x40, 0x3C, 0x02, 0x02, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x22, 0x22, 0x14, 0x14, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x41, 0x49, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00],
            [0x00, 0x63, 0x22, 0x14, 0x08, 0x08, 0x14, 0x22, 0x63, 0x00, 0x00],
            [0x00, 0x41, 0x41, 0x22, 0x14, 0x08, 0x08, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x7E, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x7E, 0x00, 0x00],
            [0x1C, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1C, 0x00],
            [0x20, 0x20, 0x10, 0x10, 0x10, 0x08, 0x08, 0x08, 0x04, 0x04, 0x00],
            [0x38, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x38, 0x00],
            [0x00, 0x00, 0x00, 0x08, 0x14, 0x22, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7E, 0x00, 0x00],
            [0x08, 0x08, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x02, 0x3E, 0x42, 0x42, 0x3D, 0x00, 0x00],
            [0x00, 0x40, 0x40, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x7C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x40, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x02, 0x02, 0x3A, 0x46, 0x42, 0x42, 0x42, 0x3E, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x7E, 0x40, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x0E, 0x10, 0x10, 0x3C, 0x10, 0x10, 0x10, 0x10, 0x00, 0x00],
            [0x00, 0x00, 0x04, 0x38, 0x44, 0x44, 0x38, 0x40, 0x3C, 0x42, 0x3C],
            [0x00, 0x40, 0x40, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x08, 0x08, 0x00, 0x38, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x04, 0x04, 0x00, 0x1C, 0x04, 0x04, 0x04, 0x04, 0x04, 0x44, 0x38],
            [0x00, 0x40, 0x40, 0x44, 0x48, 0x70, 0x48, 0x44, 0x42, 0x00, 0x00],
            [0x00, 0x38, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x3E, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x76, 0x49, 0x49, 0x49, 0x41, 0x41, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x42, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x42, 0x42, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x5C, 0x62, 0x42, 0x42, 0x42, 0x7C, 0x40, 0x40],
            [0x00, 0x00, 0x00, 0x3E, 0x42, 0x42, 0x42, 0x46, 0x3A, 0x02, 0x02],
            [0x00, 0x00, 0x00, 0x6E, 0x32, 0x20, 0x20, 0x20, 0x20, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x3C, 0x42, 0x3C, 0x02, 0x42, 0x3C, 0x00, 0x00],
            [0x00, 0x10, 0x10, 0x3C, 0x10, 0x10, 0x10, 0x12, 0x0C, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x42, 0x42, 0x42, 0x42, 0x46, 0x3A, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x22, 0x22, 0x14, 0x14, 0x08, 0x08, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x41, 0x41, 0x49, 0x49, 0x49, 0x36, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x66, 0x24, 0x18, 0x18, 0x24, 0x66, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x63, 0x22, 0x22, 0x14, 0x0C, 0x08, 0x48, 0x30],
            [0x00, 0x00, 0x00, 0x7E, 0x04, 0x08, 0x10, 0x20, 0x7E, 0x00, 0x00],
            [0x0C, 0x10, 0x10, 0x08, 0x30, 0x08, 0x10, 0x10, 0x10, 0x0C, 0x00],
            [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x00],
            [0x30, 0x08, 0x08, 0x10, 0x0C, 0x10, 0x08, 0x08, 0x08, 0x30, 0x00],
            [0x00, 0x00, 0x00, 0x32, 0x4C, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        ]
        let line = 0
        let lineStart = 0
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '\n') {
                line++
                lineStart = i + 1
            } else if (charsetIndex.indexOf(text[i]) !== -1) {
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (charset[charsetIndex.indexOf(text[i])][j] & (0x01 << k)) {
                            if (toggle) {
                                togglePx(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j)
                            } else {
                                setPx(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                            }
                        }
                    }
                }
            } else if (text[i].charCodeAt(0) < 128 && text[i].charCodeAt(0) >= 32) {
                for (let j = 0; j < 11; j++) {
                    for (let k = 0; k < 8; k++) {
                        if (font[text[i].charCodeAt(0) - 32][j] & (0x01 << k)) {
                            if (toggle) {
                                togglePx(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j)
                            } else {
                                setPx(x + ((i - lineStart) * 8) + (8 - k), y + (line * 10) + j, color)
                            }
                        }
                    }
                }
            } else {
            }
            basic.pause(1)
        }
    }

    /**
     * Draws rectangle.
     * You need to call `draw` to see the changes.
     * @param x1 coordinate x of upper left corner of rectangle (increases towards the right)
     * @param y1 coordinate y of upper left corner of rectangle (increases downwards)
     * @param x2 coordinate x of lower right corner of rectangle (increases towards the right)
     * @param y2 coordinate y of lower right corner of rectangle (increases downwards)
     * @param color color of rectangle
     * @param fill sets whether only the outline or also the fill of the rectangle is drawn
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    //% block="draw rect at|x1 $x1|y1 $y1|x2 $x2|y2 $y2|color $color|fill $fill|toggle $toggle"
    //% group="1.3 inch OLED"
    //% color.defl=true
    //% fill.defl=false
    //% toggle.defl=false
    //% weight=93
    //% inlineInputMode=inline
    export function drawRect(x1: number, y1: number, x2: number, y2: number, color: boolean, fill: boolean, toggle: boolean): void {
        if (fill) {
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    if (toggle) {
                        togglePx(x, y)
                    } else {
                        setPx(x, y, color)
                    }
                }
            }
        }
        else {
            for (let x = x1; x <= x2; x++) {
                if (toggle) {
                    togglePx(x, y1)
                } else {
                    setPx(x, y1, color)
                }
            }
            for (let y = y1 + 1; y < y2; y++) {
                if (toggle) {
                    togglePx(x1, y)
                } else {
                    setPx(x1, y, color)
                }
            }
            for (let x = x1; x <= x2; x++) {
                if (toggle) {
                    togglePx(x, y2)
                } else {
                    setPx(x, y2, color)
                }
            }
            for (let y = y1 + 1; y < y2; y++) {
                if (toggle) {
                    togglePx(x2, y)
                } else {
                    setPx(x2, y, color)
                }
            }
        }
    }

    /**
     * Draws line.
     * You need to call `draw` to see the changes.
     * @param x1 coordinate x of start of line (increases towards the right)
     * @param y1 coordinate y of start of line (increases downwards)
     * @param x2 coordinate x of end of line (increases towards the right)
     * @param y2 coordinate y of end of line (increases downwards)
     * @param color color of line
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    //% block="draw line from|x $x1|y $y1|to|x $x2|y $y2|color $color|toggle $toggle"
    //% group="1.3 inch OLED"
    //% color.defl=true
    //% toggle.defl=false
    //% weight=92
    //% inlineInputMode=inline
    export function drawLine(x1: number, y1: number, x2: number, y2: number, color: boolean, toggle: boolean): void {
        const line = []
        const dx = Math.abs(x2 - x1)
        const dy = Math.abs(y2 - y1)
        const sx = x1 < x2 ? 1 : -1
        const sy = y1 < y2 ? 1 : -1
        let err = dx - dy
        while (true) {
            line.push([x1, y1])
            if (x1 === x2 && y1 === y2) {
                break
            }
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy
                x1 += sx
            }
            if (e2 < dx) {
                err += dx
                y1 += sy
            }
        }
        for (const pixel of line) {
            if (toggle) {
                togglePx(pixel[0], pixel[1])
            } else {
                setPx(pixel[0], pixel[1], color)
            }
        }
    }

    /**
     * Draws image.
     * You need to call `draw` to see the changes.
     * @param image image to draw (can be `images.createImage()` or image from extension `imageio`)
     * @param x coordinate x of upper left corner of image (increases towards the right)
     * @param y coordinate y of upper left corner of image (increases downwards)
     * @param color color of image (if `true`, pixel `true` in image will be drawn as `true`)
     * @param bg sets whether empty pixels of the image are drawn (drawn with `not color`)
     * @param toggle sets whether to use pixel switching instead of setting the pixel to a specific color (if `true`, `color` means nothing)
     */
    //% block="draw image|$image|x $x|y $y|color $color|background $bg|toggle $toggle"
    //% group="1.3 inch OLED"
    //% color.defl=true
    //% bg.defl=false
    //% toggle.defl=false
    //% weight=90
    //% advanced=true
    export function drawImage(image: Image, x: number, y: number, color: boolean, bg: boolean, toggle: boolean): void {
        if ((image != null) && (image != undefined)) {
            for (let img_x = 0; img_x < image.width(); img_x++) {
                for (let img_y = 0; img_y < image.height(); img_y++) {
                    let c = image.pixel(img_x, img_y)
                    if ((bg && !c) || (c)) {
                        if (!color) {
                            c = !c
                        }
                        if (toggle) {
                            togglePx(x + img_x, y + img_y)
                        } else {
                            setPx(x + img_x, y + img_y, c)
                        }
                    }
                }
                basic.pause(1)
            }
        }
    }

    /**
     * Add character for function `draw text`.
     * For example, if you add character "_" and call `draw text "a_b"`, it will draw "a", then your custom character, then "b".
     * Drag `character image` from the same category into field `image`.
     * @param image character image to add to custom charset
     * @param char character name
     */
    //% block="add character $char $image"
    //% advanced=true
    //% weight=89
    export function addChar(image: Image, char: string): void {
        if (char != "" && image != null && image != undefined) {
            char = char[0]
            let compressedChar: number[] = []
            for (let y = 0; y < 11; y++) {
                let tmp = 0x00
                for (let x = 0; x < 8; x++) {
                    if (image.pixel(x, y)) {
                        tmp |= 0x01 << (7 - x)
                    }
                }
                compressedChar.push(tmp)
            }
            charset.unshift(compressedChar)
            charsetIndex.unshift(char)
        }
    }

    /**
     * Create image for `add character` function.
     */
    //% block="character image" 
    //% group="1.3 inch OLED"
    //% advanced=true
    //% weight=88
    //% shim=images::createImage
    //% imageLiteral=1 imageLiteralRows=8 imageLiteralColumns=8
    export function charImage(leds: string): Image {
        return <Image><any>leds
    }

    /**
 * Set detailed display orientation
 * @param segmentRemap segment remap (true: SEG0→SEG131, false: SEG0→SEG0)
 * @param comScanDirection COM scan direction (true: COM63→COM0, false: COM0→COM63)
 */
    //% block="set orientation|segment remap $segmentRemap|COM scan $comScanDirection"
    //% segmentRemap.defl=false
    //% comScanDirection.defl=false
    //% weight=83
    //% advanced=true
    //% group="1.3 inch OLED"
    export function setOrientation(segmentRemap: boolean, comScanDirection: boolean): void {
        cmd1(segmentRemap ? 0xA1 : 0xA0)
        cmd1(comScanDirection ? 0xC8 : 0xC0)
    }
    
}
