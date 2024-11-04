#include <MD_Parola.h>
#include <IRremote.hpp>

#include "config.h"

#include "clock_font.h"

#include "stopwatch.h"
#include "ir_receiver.h"
#include "score.h"

bool btn_locked = false;

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

void display_sw() {
  char *sw = sw_display();
  display.displayZoneText(STOPWATCH_ZONE, sw, PA_CENTER, 0, 0, PA_NO_EFFECT);
}

void display_teams() {
  display.displayZoneText(HOME_NAME_ZONE, HOME_NAME, PA_LEFT, 0, 0, PA_NO_EFFECT);
  display.displayZoneText(AWAY_NAME_ZONE, AWAY_NAME, PA_RIGHT, 0, 0, PA_NO_EFFECT);
}

void display_score() {
  display.displayZoneText(AWAY_SCORE_ZONE, get_score_str(AWAY_IDX), PA_CENTER, 0, 0, PA_NO_EFFECT);
  display.displayZoneText(HOME_SCORE_ZONE, get_score_str(HOME_IDX), PA_CENTER, 0, 0, PA_NO_EFFECT);
}

void setup() {
  Serial.begin(9600);
  Serial.println("Press the Play button to start ...");

  display.begin(ZONES);
  display.setZone(AWAY_SCORE_ZONE, 5, 5);
  display.setZone(AWAY_NAME_ZONE, 0, 4);
  display.setZone(STOPWATCH_ZONE, 6, 9);
  display.setZone(HOME_NAME_ZONE, 11, 15);
  display.setZone(HOME_SCORE_ZONE, 10, 10);
  display.setFont(newFont);

  ir_init(IR_RECEIVE_PIN);

  display_teams();
  display_score();

  sw_init(SW_DURATION);
  display_sw();
}

void loop() {
  ir_update();

  if (display.displayAnimate()) {
    display_score();

    bool updated = sw_update();
    display_sw();

    if (updated && sw_is_over()) {
      while (!display.displayAnimate()) {};

      // Play a siren at the end of the period
      tone(2, 400, 1500);

      // Block everything for 5 seconds and then reset the stopwatch
      delay(SW_RESET_DELAY);
      sw_reset();
    }

    display.displayReset();
  }

  delay(LOOP_DELAY);
}