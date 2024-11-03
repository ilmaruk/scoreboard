#include <MD_Parola.h>
#include <IRremote.hpp>

#include "config.h"

#include "clock_font.h"

#include "stopwatch.h"
#include "ir_receiver.h"

bool btn_locked = false;

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

void display_sw() {
    char *sw = sw_display();
    // Serial.print("Remaining: ");
    // Serial.println(sw);

    if (display.displayAnimate()) {
      display.displayText(sw, PA_CENTER, 0, 0, PA_NO_EFFECT, PA_NO_EFFECT);
      display.flush();
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
    tone(2, 262, 1500);
  }

  delay(MAIN_DELAY);
}