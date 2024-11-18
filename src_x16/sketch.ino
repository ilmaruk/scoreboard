#include <string.h>

#include <MD_Parola.h>
#include <IRremote.hpp>

#include "config.h"

#include "clock_font.h"

#include "stopwatch.h"
#include "ir_receiver.h"
#include "score.h"

bool btn_locked = false;
int carousel_loops[2] = {0, 0};

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

void display_sw(MD_Parola *p) {
  char *sw = sw_display();
  if (strstr(sw, ".") != NULL) {
    p->setFont(STOPWATCH_ZONE, h6);
    p->setInvert(STOPWATCH_ZONE, 1);
  } else {
    p->setFont(STOPWATCH_ZONE, newFont);
    p->setInvert(STOPWATCH_ZONE, 0);
  }
  display.displayZoneText(STOPWATCH_ZONE, sw, PA_CENTER, 0, 0, PA_NO_EFFECT);
}

void display_team(MD_Parola *p, int who, int zone, const char *name, textPosition_t align) {
  if (p->getZoneStatus(zone)) {
    if (carousel_loops[who] > 0) {
      p->setFont(zone, h6);
      p->setInvert(zone, carousel_loops[who] % 2);
      p->displayZoneText(zone, "GOOOL!!", PA_CENTER, 0, 700, PA_NO_EFFECT);
      carousel_loops[who]--;
    } else {
      p->setFont(zone, newFont);
      p->setInvert(zone, 0);
      display.displayZoneText(zone, name, align, 0, 0, PA_NO_EFFECT);
    }
  }
}

void display_teams(MD_Parola *p) {
  // Home
  display_team(p, HOME_IDX, HOME_NAME_ZONE, HOME_NAME, PA_LEFT);

  // Away
  display_team(p, AWAY_IDX, AWAY_NAME_ZONE, AWAY_NAME, PA_RIGHT);
}

void display_score(MD_Parola *p) {
  // Home
  if (p->getZoneStatus(HOME_SCORE_ZONE)) {
    p->displayZoneText(HOME_SCORE_ZONE, get_score_str(HOME_IDX), PA_CENTER, 0, 0, PA_NO_EFFECT);
  }

  // Away
  if (p->getZoneStatus(AWAY_SCORE_ZONE)) {
    p->displayZoneText(AWAY_SCORE_ZONE, get_score_str(AWAY_IDX), PA_CENTER, 0, 0, PA_NO_EFFECT);
  }
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

  sw_init(SW_DURATION);
  display_sw(&display);
}

void loop() {
  ir_update(carousel_loops);

  bool updated = sw_update();

  if (display.displayAnimate()) {
    display_teams(&display);
    display_score(&display);

    display_sw(&display);

    if (updated && sw_is_over()) {
      while (!display.displayAnimate()) {};

      // Play a siren at the end of the period
      tone(2, 400, 1500);

      // Block everything for 5 seconds and then reset the stopwatch
      delay(SW_RESET_DELAY);
      sw_reset();
    }
  }

  delay(LOOP_DELAY);
}