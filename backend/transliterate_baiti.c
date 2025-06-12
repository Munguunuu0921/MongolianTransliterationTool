#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>

#define OUTPUT_SIZE 512

typedef struct {
    wchar_t baiti_char;
    char *translit;
} BaitiMap;

// Baiti фонтын дүрэм
BaitiMap baiti_map[] = {
    {0x1810, "0"}, {0x1811, "1"}, {0x1812, "2"}, {0x1813, "3"}, {0x1814, "4"},
    {0x1815, "5"}, {0x1816, "6"}, {0x1817, "7"}, {0x1818, "8"}, {0x1819, "9"},
    {0x1820, "a"}, {0x1821, "e"}, {0x1822, "i"}, {0x1823, "0"}, {0x1824, "u"},
    {0x1825, "o"}, {0x1826, "v"}, {0x1827, "e"}, {0x1828, "n"}, {0x1829, "ng"},
    {0x182A, "b"}, {0x182B, "p"}, {0x182C, "h"}, {0x182D, "g"}, {0x182E, "m"},
    {0x182F, "l"}, {0x1830, "s"}, {0x1831, "sh"}, {0x1832, "t"}, {0x1833, "d"},
    {0x1834, "ch"}, {0x1835, "j"}, {0x1836, "y"}, {0x1837, "r"}, {0x1838, "w"},
    {0x1839, "f"}, {0x183A, "k"}, {0x183B, "kh"}, {0x183C, "ts"}, {0x183D, "dz"},
    {0x183E, "h"}, {0x183F, "z"}, {0x1840, "lh"}, {0x1841, "zh"}, {0x1842, "ch"}
};

// Салангид болон энгийн зай
wchar_t separated_space_chars[] = {0x202F, 0x180E};
wchar_t normal_space_chars[] = {0x0020};

// Бусад тэмдэгтүүдийг Unicode-р шууд хадгалах
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

int is_separated_space(wchar_t c) {
    for (size_t i = 0; i < sizeof(separated_space_chars) / sizeof(separated_space_chars[0]); i++) {
        if (separated_space_chars[i] == c) return 1;
    }
    return 0;
}

int is_normal_space(wchar_t c) {
    return c == 0x0020;
}

void transliterate_baiti(const wchar_t *input, char *output) {
    size_t len = wcslen(input);
    output[0] = '\0';
    int last_was_separated = 0;

    for (size_t i = 0; i < len; i++) {
        wchar_t c = input[i];
        int found = 0;

        // Энгийн зай
        if (is_normal_space(c)) {
            strncat(output, " ", OUTPUT_SIZE - strlen(output) - 1);
            last_was_separated = 0;
            continue;
        }

        // Салангид зай (хаалтгүй холбоос мэт)
        if (last_was_separated) {
            strncat(output, "-", OUTPUT_SIZE - strlen(output) - 1);
        }

        if (is_separated_space(c)) {
            last_was_separated = 1;
            continue;
        }

        // Тусгай тэмдэгт бол шууд оруулна
        if (is_punctuation(c) || (c >= 0x0021 && c <= 0x007E) || (c >= 0x2000 && c <= 0x206F) || c == 0x25CA) {
            char temp[10];
            snprintf(temp, sizeof(temp), "%lc", c);  // Unicode тэмдэгтийг хадгалах
            strncat(output, temp, OUTPUT_SIZE - strlen(output) - 1);
            last_was_separated = 0;
            continue;
        }

        // Галиг дүрмээр хөрвүүлнэ
        for (size_t j = 0; j < sizeof(baiti_map) / sizeof(baiti_map[0]); j++) {
            if (baiti_map[j].baiti_char == c) {
                strncat(output, baiti_map[j].translit, OUTPUT_SIZE - strlen(output) - 1);
                found = 1;
                break;
            }
        }

        // Танигдаагүй бол Unicode-оор хэвлэнэ
        if (!found) {
            char temp[10];
            snprintf(temp, sizeof(temp), "%lc", c);
            strncat(output, temp, OUTPUT_SIZE - strlen(output) - 1);
        }

        last_was_separated = 0;
    }
}

int main() {
    wchar_t input_text[256];
    char output[OUTPUT_SIZE];

    // UTF-8 орчинг тодорхой зааж өгнө
    setlocale(LC_ALL, "en_US.UTF-8");  // эсвэл өөр UTF-8 locale

    fgetws(input_text, 256, stdin);
    
    transliterate_baiti(input_text, output);
    
    printf("%s\n", output);
    return 0;
}

