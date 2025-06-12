#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h> // UTF-8 тохируулах

#define OUTPUT_SIZE 512  

typedef struct {
    wchar_t mongol_char;
    char *translit;
} TransliterationMap;

TransliterationMap map[] = {
    {0x1810, "0"}, {0x1811, "1"}, {0x1812, "2"}, {0x1813, "3"}, {0x1814, "4"},
    {0x1815, "5"}, {0x1816, "6"}, {0x1817, "7"}, {0x1818, "8"}, {0x1819, "9"},
    {0x1820, "a"}, {0x1821, "e"}, {0x1822, "i"}, {0x1823, "0"}, {0x1824, "u"},
    {0x1825, "o"}, {0x1826, "v"}, {0x1827, "e"}, {0x1828, "n"}, {0x1829, "ng"}, {0x182A, "b"},
    {0x182B, "p"}, {0x182C, "h"}, {0x182D, "g"}, {0x182E, "m"}, {0x182F, "l"},
    {0x1830, "s"}, {0x1831, "sh"}, {0x1832, "t"}, {0x1833, "d"}, {0x1834, "ch"},
    {0x1835, "j"}, {0x1836, "y"}, {0x1837, "r"}, {0x1838, "w"}, {0x1839, "f"},
    {0x183A, "k"}, {0x183B, "kh"}, {0x183C, "ts"}, {0x183D, "dz"}, {0x183E, "h"},
    {0x183F, "z"}, {0x1840, "lh"}, {0x1841, "zh"}, {0x1842, "ch"}
};

// **Салангид бичигдсэн тэмдэгтийн Unicode (UTF-8)**
wchar_t separated_space_chars[] = {0x202F, 0x180E};  // Салангид бичигдэх зай
wchar_t normal_space_chars[] = {0x0020};            // Энгийн зай

// **Тухайн тэмдэгт салангид бичигдсэн зай мөн эсэхийг шалгах**
int is_separated_space(wchar_t c) {
    for (size_t i = 0; i < sizeof(separated_space_chars) / sizeof(separated_space_chars[0]); i++) {
        if (separated_space_chars[i] == c) {
            return 1;
        }
    }
    return 0;
}

// **Тухайн тэмдэгт энгийн зай мөн эсэхийг шалгах**
int is_normal_space(wchar_t c) {
    return c == 0x0020;
}

void transliterate(const wchar_t *input, char *output) {
    size_t len = wcslen(input);
    output[0] = '\0';  // Output-ийг цэвэрлэх

    int last_was_separated = 0;  // Өмнөх тэмдэгт салангид бичигдсэн эсэх

    for (size_t i = 0; i < len; i++) {
        wchar_t c = input[i];
        int found = 0;

        // **Энгийн үг хоорондын зай илэрвэл хадгалах**
        if (is_normal_space(c)) {
            strncat(output, " ", OUTPUT_SIZE - strlen(output) - 1);
            last_was_separated = 0;
            continue;
        }

        // **Хэрэв өмнөх тэмдэгт салангид бичигдсэн бол зураас нэмэх**
        if (last_was_separated) {
            strncat(output, "-", OUTPUT_SIZE - strlen(output) - 1);
        }

        // **Салангид бичигдсэн тэмдэгт илэрвэл зураас (`-`) нэмэх**
        if (is_separated_space(c)) {
            last_was_separated = 1;
            continue;
        }

        // **Галиглах дүрэмд тохирч буй үсэг хайх**
        for (size_t j = 0; j < sizeof(map) / sizeof(map[0]); j++) {
            if (map[j].mongol_char == c) {
                strncat(output, map[j].translit, OUTPUT_SIZE - strlen(output) - 1);
                found = 1;
                break;
            }
        }

        // **Танигдаагүй үсэг байвал `?` тэмдэг тавих**
        if (!found) {
            strncat(output, "?", OUTPUT_SIZE - strlen(output) - 1);
        }

        last_was_separated = 0;  // Өмнөх үсэг энгийн бичигдсэн
    }
}

int main() {
    wchar_t input_text[256];
    char output[OUTPUT_SIZE];

    setlocale(LC_ALL, ""); // UTF-8 тохируулах
    fgetws(input_text, 256, stdin);
    transliterate(input_text, output);

    printf("%s\n", output);
    return 0;
}
