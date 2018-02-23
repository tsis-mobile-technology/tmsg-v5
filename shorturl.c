#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
const char table[] = {"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"};
#define BASE    62
const char table_number[] = {"0123456789"};
#define BASE_NUM    10
#define MAX_NUM 6

int strpos(const char *s, int c)
{
    char *p = strchr(s, c);
    if(p)
        return (p - s);

    return -1;
}

void toBase62(long id, char *pBase62)
{
    int i = 0;

    do {
        int mod = id % BASE;
        pBase62[i] = table[mod];
        i++;
    } while ((id = id / BASE));
}

void toBaseNum10(long id, char *pBaseNum10)
{
    int i = 0;

    do {
        int mod = id % BASE_NUM;
        pBaseNum10[i] = table_number[mod];
        i++;
    } while ((id = id / BASE_NUM));
}

long fromBase62(char *pBase62)
{
    long dec = 0;
    long mul = 1;
    int pos = 0;

    for(int i = 0; i < strlen(pBase62); i++)
    {
        pos = strpos(table, pBase62[i]);
        dec += pos * mul;
        mul *= BASE;
    }

    return dec;
}

long fromBaseNum10(char *pBaseNum10)
{
    long dec = 0;
    long mul = 1;
    int pos = 0;

    for(int i = 0; i < strlen(pBaseNum10); i++)
    {
        pos = strpos(table_number, pBaseNum10[i]);
        dec += pos * mul;
        mul *= BASE_NUM;
    }

    return dec;
}

long getTime()
{
    time_t current_time;
    char* c_time_string;

    current_time = time(NULL);

    if (current_time == ((time_t)-1))
    {
        (void) fprintf(stderr, "Failure to obtain the current time.\n");
        return (EXIT_FAILURE);
    }

    c_time_string = ctime(&current_time);

    if (c_time_string == NULL)
    {
        (void) fprintf(stderr, "Failure to convert the current time.\n");
        return 0;
    }

    return (long)current_time;
}

int shorturl_plus_localtime (int argc, const char * argv[])
{
    char szBase62[16] = {0x00,};
    long dec = 0;
    long timeInput = 0;
   
    timeInput = getTime();
    toBase62((long)atol(argv[1]) + timeInput, szBase62);
    dec = fromBase62(szBase62);
   
    fprintf(stdout, "%s", szBase62);
    return 0;
}

int shorturl_number_plus_localtime (int argc, const char * argv[])
{
    char szBase10[7] = {0x00,};
    long dec = 0;
    long timeInput = 0;
    char state1[32];

    initstate( time(NULL), state1, sizeof(state1));
    setstate(state1);
    timeInput = getTime();
    toBaseNum10(random()%99999, szBase10);
    dec = fromBaseNum10(szBase10);
   
    fprintf(stdout, "%s", szBase10);
    return 0;
}

int shorturl (int argc, const char * argv[])
{
    char szBase62[16] = {0x00,};
    long dec = 0;
    long timeInput = 0;
   
    timeInput = getTime();
    toBase62((long)atol(argv[1]), szBase62);
    dec = fromBase62(szBase62);
   
    fprintf(stdout, "%s", szBase62);
    return 0;
}

int fulltest (int argc, const char * argv[])
{
    char szBase62[16] = {0x00,};
    long dec = 0;
    long timeInput = 0;
   
    timeInput = getTime();
    if( argc > 1 ) {
        toBase62((long)atol(argv[1]) + timeInput, szBase62);
        dec = fromBase62(szBase62);
    }
    else {
        toBase62(1042432728, szBase62);
        dec = fromBase62(szBase62);
    }

    printf("Input:[%s] Time:[%ld] Base62:[%s] Base10:[%ld]\n", argv[1], timeInput, szBase62, dec);
    return 0;
}

int main (int argc, const char * argv[])
{
    if( argc == 2 ) {
        shorturl_plus_localtime(argc, argv);
        /*shorturl(argc, argv); */
    }
    else if( argc == 1 ) {
        shorturl_number_plus_localtime(argc, argv);
        /*shorturl(argc, argv); */
    }
    else {
        fulltest(argc, argv);
    }

    return 0;
}
