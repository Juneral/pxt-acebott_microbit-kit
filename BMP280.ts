// BMP280 Barometric Pressure Sensor Driver

class BMP280{

    private BMP280_ADDR:number
    private T:number
    private P:number
    private dig_T1:number
    private dig_T2:number
    private dig_T3:number
    private dig_P1:number
    private dig_P2:number
    private dig_P3:number
    private dig_P4:number
    private dig_P5:number
    private dig_P6:number
    private dig_P7:number
    private dig_P8:number
    private dig_P9:number

    constructor(){
        this.BMP280_ADDR = 0x76;
        this.T = 0;
        this.P = 0;
        this.dig_T1 = this.getUInt16LE(0x88)
        this.dig_T2 = this.getInt16LE(0x8A)
        this.dig_T3 = this.getInt16LE(0x8C)
        this.dig_P1 = this.getUInt16LE(0x8E)
        this.dig_P2 = this.getInt16LE(0x90)
        this.dig_P3 = this.getInt16LE(0x92)
        this.dig_P4 = this.getInt16LE(0x94)
        this.dig_P5 = this.getInt16LE(0x96)
        this.dig_P6 = this.getInt16LE(0x98)
        this.dig_P7 = this.getInt16LE(0x9A)
        this.dig_P8 = this.getInt16LE(0x9C)
        this.dig_P9 = this.getInt16LE(0x9E)
        this.setreg(0xF4, 0x2F)
        this.setreg(0xF5, 0x0C)
    }

    setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(this.BMP280_ADDR, buf);
    }

    getreg(reg: number): number {
        pins.i2cWriteNumber(this.BMP280_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(this.BMP280_ADDR, NumberFormat.UInt8BE);
    }

    getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(this.BMP280_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(this.BMP280_ADDR, NumberFormat.UInt16LE);
    }

    getInt16LE(reg: number): number {
        pins.i2cWriteNumber(this.BMP280_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(this.BMP280_ADDR, NumberFormat.Int16LE);
    }


    // this.setreg(0xF4, 0x2F)
// setreg(0xF5, 0x0C)


get(): void {
    let adc_T = (this.getreg(0xFA) << 12) + (this.getreg(0xFB) << 4) + (this.getreg(0xFC) >> 4)
    let var1 = (((adc_T >> 3) - (this.dig_T1 << 1)) * this.dig_T2) >> 11
    let var2 = (((((adc_T >> 4) - this.dig_T1) * ((adc_T >> 4) - this.dig_T1)) >> 12) * this.dig_T3) >> 14
    let t = var1 + var2
    this.T = Math.idiv(((t * 5 + 128) >> 8), 100)
    var1 = (t >> 1) - 64000
    var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * this.dig_P6
    var2 = var2 + ((var1 * this.dig_P5) << 1)
    var2 = (var2 >> 2) + (this.dig_P4 << 16)
    var1 = (((this.dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((this.dig_P2) * var1) >> 1)) >> 18
    var1 = ((32768 + var1) * this.dig_P1) >> 15
    if (var1 == 0)
        return; // avoid exception caused by division by zero
    let adc_P = (this.getreg(0xF7) << 12) + (this.getreg(0xF8) << 4) + (this.getreg(0xF9) >> 4)
    let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
    _p = Math.idiv(_p, var1) * 2;
    var1 = (this.dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
    var2 = (((_p >> 2)) * this.dig_P8) >> 13
    this.P = _p + ((var1 + var2 + this.dig_P7) >> 4)
}

    /**
     * get pressure
     */
    pressure(): number {
        this.get();
        return this.P;
    }

    /**
     * get temperature
     */
    temperature(): number {
        this.get();
        return this.T;
    }


}