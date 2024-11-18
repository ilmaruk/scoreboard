#ifndef _IR_RECEIVER
#define _IR_RECEIVER

#include "config.h"

#include "stopwatch.h"
#include "score.h"

void ir_init(int pin) {
    IrReceiver.begin(pin);
}

void ir_handle_command(int *loops) {
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
        update_score(HOME_IDX, 1);
        loops[HOME_IDX] = 5;
        break;
      case IR_CMD_AWAY_UP:
        // Arrow right (away +)
        update_score(AWAY_IDX, 1);
        loops[AWAY_IDX] = 5;
        break;
      case IR_CMD_HOME_DOWN:
        // "0" (home -)
        update_score(HOME_IDX, -1);
        break;
      case IR_CMD_AWAY_DOWN:
        // "C" (away +)
        update_score(AWAY_IDX, -1);
        break;
      default:
        Serial.print("Unhandled remote command: ");
        Serial.println(IrReceiver.decodedIRData.command, HEX);
    }
}

void ir_update(int *loops) {
  // Checks received an IR signal
  if (IrReceiver.decode()) {
    ir_handle_command(loops);
    IrReceiver.resume();  // Receive the next value
  }
}

#endif // _IR_RECEIVER