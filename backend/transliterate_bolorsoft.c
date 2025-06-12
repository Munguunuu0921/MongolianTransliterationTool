#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>
#include <wctype.h>

#define OUTPUT_SIZE 512

// Тэмдэгт ба галигын дүрмийн бүтэц
typedef struct {
    wchar_t bolorsoft_char;
    char *initial;
    char *medial;
    char *final;
    int is_male; // 1 = эр, 0 = эм, -1 = хамааралгүй
} BolorsoftMap;


// Болорсофт фонтын дүрэмд тулгуурласан гүйцэт лигатур дүрэм (эхлэл, дунд, төгсгөлийн хувилбарууд)
BolorsoftMap bolorsoft_map[] = {
    {0x1820, "a", "a", "a", 1}, {0x1821, "e", "e", "e", 0}, {0x1822, "i", "i", "i", 0},
    {0x1823, "o", "o", "o", 1}, {0x1824, "u", "u", "u", 1}, {0x1825, "ö", "ö", "ö", 0},
    {0x1826, "ü", "ü", "ü", 0}, {0x1827, "ee", "ee", "ee", -1},
    {0x1828, "n", "n", "n", -1}, {0x1829, "ng", "ng", "ng", -1},
    {0x182A, "b", "b", "b", -1}, {0x182B, "p", "p", "p", -1}, {0x182C, "x", "x", "x", -1},
    {0x182D, "g", "g", "g", -1}, {0x182E, "m", "m", "m", -1}, {0x182F, "l", "l", "l", -1},
    {0x1830, "s", "s", "s", -1}, {0x1831, "sh", "sh", "sh", -1}, {0x1832, "t", "t", "t", -1},
    {0x1833, "d", "d", "d", -1}, {0x1834, "ch", "ch", "ch", -1}, {0x1835, "j", "j", "j", -1},
    {0x1836, "y", "y", "y", -1}, {0x1837, "r", "r", "r", -1}, {0x1838, "w", "w", "w", -1},
    {0x1839, "f", "f", "f", -1}, {0x183A, "k", "k", "k", -1}, {0x183B, "kh", "kh", "kh", -1},
    {0x183C, "ts", "ts", "ts", -1}, {0x183D, "dz", "dz", "dz", -1}, {0x183E, "h", "h", "h", -1},
    {0x183F, "z", "z", "z", -1}, {0x1840, "lh", "lh", "lh", -1}, {0x1841, "zh", "zh", "zh", -1},
    {0x1810, "0", "0", "0", -1}, {0x1811, "1", "1", "1", -1}, {0x1812, "2", "2", "2", -1},
    {0x1813, "3", "3", "3", -1}, {0x1814, "4", "4", "4", -1}, {0x1815, "5", "5", "5", -1},
    {0x1816, "6", "6", "6", -1}, {0x1817, "7", "7", "7", -1}, {0x1818, "8", "8", "8", -1},
    {0x1819, "9", "9", "9", -1}
};

wchar_t separated_space_chars[] = {0x202F, 0x180E};
wchar_t normal_space_chars[] = {0x0020};

int is_separated_space(wchar_t c) {
    for (size_t i = 0; i < sizeof(separated_space_chars) / sizeof(separated_space_chars[0]); i++) {
        if (separated_space_chars[i] == c) return 1;
    }
    return 0;
}

int is_normal_space(wchar_t c) {
    return c == 0x0020;
}

int is_punctuation(wchar_t c) {
    wchar_t punct[] = {
        L'.', L',', L'?', L'!', L':', L';',
        L'(', L')', L'"', L'\'', L'-', L'—',
        L'[', L']', L'{', L'}', L'@', L'#', L'%', L'&', L'*',
        L'=', L'_', L'\\', L'|', L'/', L'<', L'>', L'~', L'`', L'^'
    };
    size_t size = sizeof(punct) / sizeof(wchar_t);
    for (size_t i = 0; i < size; i++) {
        if (c == punct[i]) return 1;
    }
    return 0;
}

void transliterate_bolorsoft(const wchar_t *input, char *output) {
    output[0] = '\0';
    int last_was_separated = 0;
    size_t len = wcslen(input);

    for (size_t i = 0; i < len; i++) {
        wchar_t c = input[i];
        int found = 0;

        if (is_normal_space(c)) {
            strncat(output, " ", OUTPUT_SIZE - strlen(output) - 1);
            last_was_separated = 0;
            continue;
        }

        if (last_was_separated) {
            strncat(output, "-", OUTPUT_SIZE - strlen(output) - 1);
        }

        if (is_separated_space(c)) {
            last_was_separated = 1;
            continue;
        }

       if (is_punctuation(c)) {
            char temp[5];
            snprintf(temp, sizeof(temp), "%lc", c);
            strncat(output, temp, OUTPUT_SIZE - strlen(output) - 1);
            continue;
        }

        int is_first = (i == 0 || is_normal_space(input[i - 1]) || is_separated_space(input[i - 1]));
        int is_last = (i == len - 1 || is_normal_space(input[i + 1]) || is_separated_space(input[i + 1]));

        for (size_t j = 0; j < sizeof(bolorsoft_map) / sizeof(bolorsoft_map[0]); j++) {
            if (bolorsoft_map[j].bolorsoft_char == c) {
                const char *glyph = is_first ? bolorsoft_map[j].initial : is_last ? bolorsoft_map[j].final : bolorsoft_map[j].medial;
                strncat(output, glyph, OUTPUT_SIZE - strlen(output) - 1);
                found = 1;
                break;
            }
        }
        if (!found) {
            char temp[5];
            snprintf(temp, sizeof(temp), "%lc", c);  // юникод тэмдэгтийг ASCII/LATIN болгон хувиргах
            strncat(output, temp, OUTPUT_SIZE - strlen(output) - 1);
        }

        last_was_separated = 0;
    }
}

int main() {
    wchar_t input_text[256];
    char output[OUTPUT_SIZE];

    setlocale(LC_ALL, "");
    fgetws(input_text, 256, stdin);
    transliterate_bolorsoft(input_text, output);
    printf("%s\n", output);
    return 0;
}