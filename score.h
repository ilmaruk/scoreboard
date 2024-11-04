#ifndef _SCORE
#define _SCORE

#define HOME_IDX 0
#define AWAY_IDX 1

unsigned int _score[2] = {0, 0};

void update_score(unsigned int who, int delta) {
  _score[who] += delta;
}

char *get_score_str(int who) {
  char *buffer = (char*)malloc(3 * sizeof(char));
  sprintf(buffer, "%d", _score[who]);
  return buffer;
}

#endif // _SCORE