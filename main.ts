function detener () {
    radio.sendValue("RLL", 0)
    radio.sendValue("RLLb", 0)
    radio.sendValue("RLR", 0)
    radio.sendValue("RLRb", 0)
    radio.sendValue("RRL", 0)
    radio.sendValue("RRLb", 0)
    radio.sendValue("RRR", 0)
    radio.sendValue("RRRb", 0)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
}
function moverDerecha () {
    detener()
    radio.sendValue("RLL", 255)
    radio.sendValue("RLR", 255)
    radio.sendValue("RRLb", 255)
    radio.sendValue("RRRb", 255)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
}
input.onButtonPressed(Button.A, function () {
    detener()
    basic.pause(5000)
})
function moverAtras () {
    detener()
    radio.sendValue("RLLb", 255)
    radio.sendValue("RLRb", 255)
    radio.sendValue("RRLb", 255)
    radio.sendValue("RRRb", 255)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
}
function checkParameters () {
    serial.writeLine("RCD: " + RCD)
    serial.writeLine("RLD: " + RLD)
    serial.writeLine("RRD: " + RRD)
    serial.writeLine("RLTl: " + RLTl)
    serial.writeLine("RLTr: " + RLTr)
    serial.writeLine("RRTl: " + RRTl)
    serial.writeLine("RRTr: " + RRTr)
    serial.writeLine("RCTl: " + RCTl)
    serial.writeLine("RCTr: " + RCTr)
}
function moverIzquierda () {
    detener()
    radio.sendValue("RLLb", 255)
    radio.sendValue("RLRb", 255)
    radio.sendValue("RRL", 255)
    radio.sendValue("RRR", 255)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
}
radio.onReceivedValue(function (name, value) {
    if (name == "RRTl") {
        RRTl = value
    } else if (name == "RRTr") {
        RRTr = value
    } else if (name == "RRD") {
        RRD = value
    } else if (name == "RLTl") {
        RLTl = value
    } else if (name == "RLTr") {
        RLTr = value
    } else if (name == "RLD") {
        RLD = value
    }
})
function moverAdelante () {
    detener()
    radio.sendValue("RLL", 255)
    radio.sendValue("RLR", 255)
    radio.sendValue("RRL", 255)
    radio.sendValue("RRR", 255)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
}
let RCTr = 0
let RCTl = 0
let RRTr = 0
let RRTl = 0
let RLTr = 0
let RLTl = 0
let RRD = 0
let RLD = 0
let RCD = 0
radio.setGroup(55)
basic.forever(function () {
    RCD = maqueen.Ultrasonic(PingUnit.Centimeters)
    RCTl = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    RCTr = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    checkParameters()
    if (RLTl == 0 || RLTr == 0) {
        moverDerecha()
    } else if (RRTl == 0 || RRTr == 0) {
        moverIzquierda()
    } else if (RCTl == 0 || RCTr == 0) {
        moverAtras()
        basic.pause(500)
        moverDerecha()
    } else {
        if (RCD < 100 && (RLD < 100 && RRD < 100)) {
            if (RCD < RRD && RCD < RLD) {
                moverAdelante()
            } else if (RLD < RRD) {
                moverIzquierda()
            } else {
                moverDerecha()
            }
        } else {
            moverAdelante()
        }
    }
    basic.pause(100)
})
