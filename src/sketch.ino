#include <string.h>

#include <MD_Parola.h>
#include <IRremote.hpp>

#include "config.h"

#include "clock_font.h"

#include "Timer.h"

#include "ir_receiver.h"
#include "score.h"
#include "commands.h"

bool btn_locked = false;
int carousel_loops[3] = {0, 0, 0};

Timer timer(SW_DURATION);

MD_Parola display = MD_Parola(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

void display_goal(MD_Parola *p, int zone, int invert) {
  p->setInvert(zone, invert);
  p->displayZoneText(zone, "GOL!", PA_CENTER, 0, 700, PA_NO_EFFECT);
}

void display_sw(MD_Parola *p) {
  if (p->getZoneStatus(STOPWATCH_ZONE)) {
    if (carousel_loops[2] > 0) {
      display_goal(p, STOPWATCH_ZONE, (carousel_loops[STOPWATCH_ZONE]+1) % 2);
      carousel_loops[2]--;
    } else {
      char *sw = timer.display();
      if (strstr(sw, ".") != NULL) {
        p->setFont(STOPWATCH_ZONE, tiny_h6);
      } else {
        p->setFont(STOPWATCH_ZONE, tiny_h6);
      }
      display.displayZoneText(STOPWATCH_ZONE, sw, PA_CENTER, 0, 0, PA_NO_EFFECT);
    }
  }
}

void display_team(MD_Parola *p, int who, int zone, const char *name, textPosition_t align) {
  if (p->getZoneStatus(zone)) {
    if (carousel_loops[who] > 0) {
      display_goal(p, zone, carousel_loops[who] % 2);
      carousel_loops[who]--;
    } else {
      p->setInvert(zone, 0);
      display.displayZoneText(zone, name, align, 0, 0, PA_NO_EFFECT);
    }
  }
}

void display_teams(MD_Parola *p) {
  // Home
  display_team(p, HOME_IDX, HOME_NAME_ZONE, HOME_NAME, PA_CENTER);

  // Away
  display_team(p, AWAY_IDX, AWAY_NAME_ZONE, AWAY_NAME, PA_CENTER);
}

void display_score(MD_Parola *p) {
  // Home
  if (p->getZoneStatus(HOME_SCORE_ZONE)) {
    p->displayZoneText(HOME_SCORE_ZONE, get_home_score_str(), PA_RIGHT, 0, 0, PA_NO_EFFECT);
  }

  // Away
  if (p->getZoneStatus(AWAY_SCORE_ZONE)) {
    p->displayZoneText(AWAY_SCORE_ZONE, get_away_score_str(), PA_LEFT, 0, 0, PA_NO_EFFECT);
  }
}

void handle_command(command_t cmd) {
    switch (cmd) {
      case COMMAND_START_STOP_SW:
        // Play button
        if (!timer.is_running()) {
          timer.start(millis());
        } else {
          timer.pause();
        }
        break;
      case COMMAND_HOME_UP:
        // Arrow left (home +)
        update_score(HOME_IDX, 1);
        carousel_loops[HOME_IDX] = 5;
        carousel_loops[AWAY_IDX] = 5;
        carousel_loops[2] = 5;
        break;
      case COMMAND_AWAY_UP:
        // Arrow right (away +)
        update_score(AWAY_IDX, 1);
        carousel_loops[HOME_IDX] = 5;
        carousel_loops[AWAY_IDX] = 5;
        carousel_loops[2] = 5;
        break;
      case COMMAND_HOME_DOWN:
        // "0" (home -)
        update_score(HOME_IDX, -1);
        break;
      case COMMAND_AWAY_DOWN:
        // "C" (away +)
        update_score(AWAY_IDX, -1);
        break;
    }
}

void setup() {
  Serial.begin(9600);
  Serial.println("Press the Play button to start ...");

  display.begin(ZONES);
  display.setZone(AWAY_SCORE_ZONE, 2, 2);
  display.setZone(AWAY_NAME_ZONE, 0, 1);
  display.setZone(STOPWATCH_ZONE, 3, 4);
  display.setZone(HOME_NAME_ZONE, 6, 7);
  display.setZone(HOME_SCORE_ZONE, 5, 5);
  display.setFont(tiny_h6);
  // display.setInvert(HOME_SCORE_ZONE, 1);
  display.setFont(HOME_SCORE_ZONE, h6);
  // display.setInvert(AWAY_SCORE_ZONE, 1);
  display.setFont(AWAY_SCORE_ZONE, h6);

  ir_init(IR_RECEIVE_PIN);

  display_sw(&display);
}

void loop() {
  handle_command(ir_update());

  bool updated = timer.update(millis());

  if (display.displayAnimate()) {
    display_teams(&display);
    display_score(&display);

    display_sw(&display);

    if (updated && timer.is_over()) {
      while (!display.displayAnimate()) {};

#ifdef BUZZER_PIN
      // Play a siren at the end of the period
      tone(BUZZER_PIN, 400, 1500);
#endif

      // Block everything for 5 seconds and then reset the stopwatch
      delay(SW_RESET_DELAY);
      timer.reset();
    }
  }

  delay(LOOP_DELAY);
}