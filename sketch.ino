#include <MD_Parola.h>
#include <IRremote.hpp>

#include "config.h"

#include "clock_font.h"

#include "stopwatch.h"
#include "ir_receiver.h"

bool btn_locked = false;

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

void display_sw() {
  // TODO: update should not go lost if the display is not ready
  if (display.displayAnimate()) {
    char *sw = sw_display();
    display.displayText(sw, PA_CENTER, 0, 0, PA_NO_EFFECT, PA_NO_EFFECT);
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println("Press the Play button to start ...");

  display.begin();
  display.setFont(clock_font_2);

  ir_init(IR_RECEIVE_PIN);

  sw_init(SW_DURATION);
  display_sw();
}

void loop() {
  ir_update();

  bool updated = sw_update();
  display_sw();
  if (updated && sw_is_over()) {
    while (!display.displayAnimate()) {};

    // Play a siren at the end of the period
    tone(2, 400, 1500);

    // Block everything for 5 seconds and then reset the stopwatch
    delay(SW_RESET_DELAY);
    sw_reset();
    display_sw();
  }

  delay(LOOP_DELAY);
}