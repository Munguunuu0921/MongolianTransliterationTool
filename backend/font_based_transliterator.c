#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>

#define OUTPUT_SIZE 512

void transliterate_bolorsoft(const wchar_t *input, char *output) {
    size_t len = wcslen(input);
    output[0] = '\0';

    for (size_t i = 0; i < len; i++) {
        wchar_t c = input[i];

        // Болорсофт фонтын GA + FVS1 -> ge
        if (c == 0x182D) { // GA
            if (i + 1 < len && input[i + 1] == 0x180B) { // FVS1
                strncat(output, "ge", OUTPUT_SIZE - strlen(output) - 1);
                i++;
            } else {
                strncat(output, "ga", OUTPUT_SIZE - strlen(output) - 1);
            }
            continue;
        }

        // Ерөнхий үсгүүд
        switch (c) {
            case 0x1820: strncat(output, "a", OUTPUT_SIZE - strlen(output) - 1); break;
            case 0x1821: strncat(output, "e", OUTPUT_SIZE - strlen(output) - 1); break;
            case 0x1822: strncat(output, "i", OUTPUT_SIZE - strlen(output) - 1); break;
            default: strncat(output, "?", OUTPUT_SIZE - strlen(output) - 1); break;
        }
    }
}

void transliterate_baiti(const wchar_t *input, char *output) {
    size_t len = wcslen(input);
    output[0] = '\0';

    for (size_t i = 0; i < len; i++) {
        wchar_t c = input[i];

        // Байти фонтын GA + FVS2 -> ge
        if (c == 0x182D) { // GA
            if (i + 1 < len && input[i + 1] == 0x180C) { // FVS2
                strncat(output, "ge", OUTPUT_SIZE - strlen(output) - 1);
                i++;
            } else {
                strncat(output, "ga", OUTPUT_SIZE - strlen(output) - 1);
            }
            continue;
        }

        // Ерөнхий үсгүүд
        switch (c) {
            case 0x1820: strncat(output, "a", OUTPUT_SIZE - strlen(output) - 1); break;
            case 0x1821: strncat(output, "e", OUTPUT_SIZE - strlen(output) - 1); break;
            case 0x1822: strncat(output, "i", OUTPUT_SIZE - strlen(output) - 1); break;
            default: strncat(output, "?", OUTPUT_SIZE - strlen(output) - 1); break;
        }
    }
}

int main(int argc, char *argv[]) {
    wchar_t input[256];
    char output[OUTPUT_SIZE];
    char font[10] = "bolor";

    setlocale(LC_ALL, "");

    if (argc > 1) {
        strncpy(font, argv[1], sizeof(font));
    }

    fgetws(input, sizeof(input) / sizeof(wchar_t), stdin);

    if (strcmp(font, "baiti") == 0) {
        transliterate_baiti(input, output);
    } else {
        transliterate_bolorsoft(input, output);
    }

    printf("%s\n", output);
    return 0;
}
