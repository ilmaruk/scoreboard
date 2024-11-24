#ifndef _IR_RECEIVER
#define _IR_RECEIVER

#include "config.h"

#include "score.h"
#include "commands.h"

void ir_init(int pin) {
    IrReceiver.begin(pin);
}

command_t ir_handle_command() {
    switch (IrReceiver.decodedIRData.command) {
      case IR_CMD_START_STOP:
        // Play button
        return COMMAND_START_STOP_SW;
      case IR_CMD_HOME_UP:
        // Arrow left (home +)
        return COMMAND_HOME_UP;
      case IR_CMD_AWAY_UP:
        // Arrow right (away +)
        return COMMAND_AWAY_UP;
      case IR_CMD_HOME_DOWN:
        // "0" (home -)
        return COMMAND_HOME_DOWN;
      case IR_CMD_AWAY_DOWN:
        // "C" (away +)
        return COMMAND_AWAY_DOWN;
      default:
        Serial.print("Unhandled remote command: ");
        Serial.println(IrReceiver.decodedIRData.command, HEX);
      return COMMAND_NONE;
    }
}

// Checks received an IR signal
command_t ir_update() {
  command_t cmd = COMMAND_NONE;
  if (IrReceiver.decode()) {
    // Ignores repeated commands
    if (!(IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT)) {
      cmd = ir_handle_command();
    }
    IrReceiver.resume();  // Receive the next value
  }
  return cmd;
}

#endif // _IR_RECEIVER