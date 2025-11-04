// LCD1602 Driver

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

class LCD1602{

    private LCD1602_ADDR: number 
    private BK: number      // backlight control
    private RS: number      // command/data
    private Custom_Char: number[][] = []

    constructor() {
        this.LCD1602_ADDR = 0x27; // 0x27: PCF8574
        this.BK = 8;
        this.RS = 0
    }

    LCD1602_Init(): void {
        this.cmd(0x33)       // set 4bit mode
        basic.pause(5)
        this.set(0x30)
        basic.pause(5)
        this.set(0x20)
        basic.pause(5)
        this.cmd(0x28)       // set mode
        this.cmd(0x0C)
        this.cmd(0x06)
        this.cmd(0x01)       // clear
    }


    // set LCD reg
    setreg(d: number) {
        pins.i2cWriteNumber(this.LCD1602_ADDR, d, NumberFormat.Int8LE)
        basic.pause(1)
    }

    // send data to I2C bus
    set(d: number) {
        d = d & 0xF0
        d = d + this.BK + this.RS
        this.setreg(d)
        this.setreg(d + 4)
        this.setreg(d)
    }

    // send command
    cmd(d: number) {
        this.RS = 0
        this.set(d)
        this.set(d << 4)
    }

    // send data
    dat(d: number) {
        this.RS = 1
        this.set(d)
        this.set(d << 4)
    }

    ClearScreen(): void {
        this.cmd(0x01)
    }

    ShiftLeft(): void {
        this.cmd(0x18)
    }

    ShiftRight(): void {
        this.cmd(0x1C)
    }

    CreateCharacter(char_index: CharIndex, im: Image): void {
        const customChar = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 5; x++) {
                if (im.pixel(x, y)) {
                    customChar[y] |= 1 << (4 - x)
                }
            }
        }
        this.Custom_Char[char_index] = customChar;
    }

    CharacterPixels(i: string): Image {
        return <Image><any>i;
    }


    Showchararacter(x: number, y: number, char_index: CharIndex): void {
        let a: number
        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        this.cmd(0x40 | (char_index << 3));
        for (let y = 0; y < 8; y++) {
            this.dat(this.Custom_Char[char_index][y]);
        }
        this.cmd(a)
        this.dat(char_index)

    }

    ShowString(x: number, y: number, s: string): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        this.cmd(a)

        for (let i = 0; i < s.length; i++) {
            this.dat(s.charCodeAt(i))
        }
    }

    ShowNumber(x: number, y: number, n: number): void {
        let s = n.toString()
        this.ShowString(x, y, s)
    }
}
