#ifndef _IR_RECEIVER
#define _IR_RECEIVER

#include "stopwatch.h"

void ir_init(int pin) {
    IrReceiver.begin(pin);
}

void ir_handle_command() {
    switch (IrReceiver.decodedIRData.command) {
      case 0xA8:
        // Play button
        if (!sw_is_running()) {
          sw_start();
        } else {
          sw_pause();
        }
        break;
      case 0xE0:
        // Arrow left (home +)
        break;
      case 0x90:
        // Arrow right (away +)
        break;
      case 0x68:
        // "0" (home -)
        break;
      case 0xB0:
        // "C" (away +)
        break;
      default:
        Serial.print("Unhandled remote command: ");
        Serial.println(IrReceiver.decodedIRData.command, HEX);
    }
}

void ir_update() {
  // Checks received an IR signal
  if (IrReceiver.decode()) {
    ir_handle_command();
    IrReceiver.resume();  // Receive the next value
  }
}

#endif // _IR_RECEIVER