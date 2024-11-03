#ifndef _IR_RECEIVER
#define _IR_RECEIVER

#include "config.h"

#include "stopwatch.h"

void ir_init(int pin) {
    IrReceiver.begin(pin);
}

void ir_handle_command() {
    switch (IrReceiver.decodedIRData.command) {
      case IR_CMD_START_STOP:
        // Play button
        if (!sw_is_running()) {
          sw_start();
        } else {
          sw_pause();
        }
        break;
      case IR_CMD_HOME_UP:
        // Arrow left (home +)
        break;
      case IR_CMD_AWAY_UP:
        // Arrow right (away +)
        break;
      case IR_CMD_HOME_DOWN:
        // "0" (home -)
        break;
      case IR_CMD_AWAY_DOWN:
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