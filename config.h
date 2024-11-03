#ifndef _CONFIG
#define _CONFIG

// General
#define LOOP_DELAY 100

// Stopwatch
#define SW_DURATION 3
#define SW_RESET_DELAY 5000

// Max7219 display
#define HARDWARE_TYPE MD_MAX72XX::PAROLA_HW
#define MAX_DEVICES 16

#define CLK_PIN 18  // VSPI_SCK
#define DATA_PIN 23 // VSPI_MOSI
#define CS_PIN 5    // VSPI_SS

// IR Receiver
#define IR_RECEIVE_PIN 0

#define IR_CMD_START_STOP 0xA8
#define IR_CMD_HOME_UP 0xE0
#define IR_CMD_AWAY_UP 0x90
#define IR_CMD_HOME_DOWN 0x68
#define IR_CMD_AWAY_DOWN 0xB0

#endif // _CONFIG