// BMP280 Barometric Pressure Sensor 
let BMP280_I2C_ADDR = 0x76

function BMP280_setreg(reg: number, dat: number): void {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = dat;
    pins.i2cWriteBuffer(BMP280_I2C_ADDR, buf);
}

function BMP280_getreg(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt8BE);
}

function getUInt16LE(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt16LE);
}

function getInt16LE(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int16LE);
}

let dig_T1 = getUInt16LE(0x88)
let dig_T2 = getInt16LE(0x8A)
let dig_T3 = getInt16LE(0x8C)
let dig_P1 = getUInt16LE(0x8E)
let dig_P2 = getInt16LE(0x90)
let dig_P3 = getInt16LE(0x92)
let dig_P4 = getInt16LE(0x94)
let dig_P5 = getInt16LE(0x96)
let dig_P6 = getInt16LE(0x98)
let dig_P7 = getInt16LE(0x9A)
let dig_P8 = getInt16LE(0x9C)
let dig_P9 = getInt16LE(0x9E)
BMP280_setreg(0xF4, 0x2F)
BMP280_setreg(0xF5, 0x0C)
let T = 0
let P = 0

function get(): void {
    let adc_T = (BMP280_getreg(0xFA) << 12) + (BMP280_getreg(0xFB) << 4) + (BMP280_getreg(0xFC) >> 4)
    let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
    let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
    let t = var1 + var2
    T = Math.idiv(((t * 5 + 128) >> 8), 100)
    var1 = (t >> 1) - 64000
    var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
    var2 = var2 + ((var1 * dig_P5) << 1)
    var2 = (var2 >> 2) + (dig_P4 << 16)
    var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
    var1 = ((32768 + var1) * dig_P1) >> 15
    if (var1 == 0)
        return; // avoid exception caused by division by zero
    let adc_P = (BMP280_getreg(0xF7) << 12) + (BMP280_getreg(0xF8) << 4) + (BMP280_getreg(0xF9) >> 4)
    let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
    _p = Math.idiv(_p, var1) * 2;
    var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
    var2 = (((_p >> 2)) * dig_P8) >> 13
    P = _p + ((var1 + var2 + dig_P7) >> 4)
}

namespace BMP280{

/**
 * get pressure
 */
//% blockId="BMP280_GET_PRESSURE" block="get pressure"
//% subcategory=Microbit_Kit
//% group="Barometric Pressure Sensor"
//% weight=80 blockGap=8
export function pressure(): number {
    get();
    return P;
}

/**
 * get temperature
 */
//% blockId="BMP280_GET_TEMPERATURE" block="get temperature"
//% subcategory=Microbit_Kit
//% group="Barometric Pressure Sensor"
//% weight=80 blockGap=8
export function temperature(): number {
    get();
    return T;
}
}