#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>
#include <stdlib.h>
#include <wctype.h>

#define OUTPUT_SIZE 512
#define MAX_EXPLANATIONS 512

typedef enum {
    GENDER_UNKNOWN,
    GENDER_BACK,
    GENDER_FRONT
} VowelGender;

typedef struct {
    wchar_t baiti_char;
    const char *translit;
    const char *unicode;
    const char *rule;
} Explanation;

Explanation baiti_map[] = {
    {0x1810, "0", "U+1810", "Тоон тэмдэгт"},
    {0x1811, "1", "U+1811", "Тоон тэмдэгт"},
    {0x1812, "2", "U+1812", "Тоон тэмдэгт"},
    {0x1813, "3", "U+1813", "Тоон тэмдэгт"},
    {0x1814, "4", "U+1814", "Тоон тэмдэгт"},
    {0x1815, "5", "U+1815", "Тоон тэмдэгт"},
    {0x1816, "6", "U+1816", "Тоон тэмдэгт"},
    {0x1817, "7", "U+1817", "Тоон тэмдэгт"},
    {0x1818, "8", "U+1818", "Тоон тэмдэгт"},
    {0x1819, "9", "U+1819", "Тоон тэмдэгт"},
    {0x1820, "a", "U+1820", "Эгшиг галиг"},
    {0x1821, "e", "U+1821", "Эгшиг галиг"},
    {0x1822, "i", "U+1822", "Эгшиг галиг"},
    {0x1823, "o", "U+1823", "Эгшиг галиг"},
    {0x1824, "u", "U+1824", "Эгшиг галиг"},
    {0x1825, "oo", "U+1825", "Эгшиг галиг"},
    {0x1826, "v", "U+1826", "Эгшиг галиг"},
    {0x1827, "ü", "U+1827", "Эгшиг галиг"},
    {0x1828, "n", "U+1828", "Гийгүүлэгч"},
    {0x1829, "ng", "U+1829", "Гийгүүлэгч"},
    {0x182A, "b", "U+182A", "Гийгүүлэгч"},
    {0x182B, "p", "U+182B", "Гийгүүлэгч"},
    {0x182C, NULL, "U+182C", "QA/GA ялгаа"},
    {0x182D, NULL, "U+182D", "QA/GA ялгаа"},
    {0x182E, "m", "U+182E", "Гийгүүлэгч"},
    {0x182F, "l", "U+182F", "Гийгүүлэгч"},
    {0x1830, "s", "U+1830", "Гийгүүлэгч"},
    {0x1831, "sh", "U+1831", "Гийгүүлэгч"},
    {0x1832, "t", "U+1832", "Гийгүүлэгч"},
    {0x1833, "d", "U+1833", "Гийгүүлэгч"},
    {0x1834, "ch", "U+1834", "Гийгүүлэгч"},
    {0x1835, "j", "U+1835", "Гийгүүлэгч"},
    {0x1836, "y", "U+1836", "Гийгүүлэгч"},
    {0x1837, "r", "U+1837", "Гийгүүлэгч"},
    {0x1838, "w", "U+1838", "Гийгүүлэгч"},
    {0x1839, "f", "U+1839", "Гийгүүлэгч"},
    {0x183A, "k", "U+183A", "Гийгүүлэгч"},
    {0x183B, "kh", "U+183B", "Гийгүүлэгч"},
    {0x183C, "ts", "U+183C", "Гийгүүлэгч"},
    {0x183D, "dz", "U+183D", "Гийгүүлэгч"},
    {0x183E, "h", "U+183E", "Гийгүүлэгч"},
    {0x183F, "z", "U+183F", "Гийгүүлэгч"},
    {0x1840, "lh", "U+1840", "Гийгүүлэгч"},
    {0x1841, "zh", "U+1841", "Гийгүүлэгч"},
    {0x1842, "ch", "U+1842", "Гийгүүлэгч"},
    // Special characters
    {0x1800, NULL, "U+1800", "Монгол бичгийн таслал"},
    {0x1801, NULL, "U+1801", "Таслал"},
    {0x1802, NULL, "U+1802", "Цэг"},
    {0x1803, NULL, "U+1803", "Цэг таслал"},
    {0x1804, NULL, "U+1804", "Хоёр цэг"},
    {0x1805, NULL, "U+1805", "Төгсгөлийн тэмдэг"},
    {0x1806, NULL, "U+1806", "Авах/өгөх тэмдэг"},
    {0x1807, NULL, "U+1807", "Хагас гадас"},
    {0x1808, NULL, "U+1808", "Гадас"},
    {0x1809, NULL, "U+1809", "Эргэлдэх гадас"},
    {0x180A, NULL, "U+180A", "Өргөлтийн тэмдэг"},
    {0x180B, NULL, "U+180B", "FVS1"},
    {0x180C, NULL, "U+180C", "FVS2"},
    {0x180D, NULL, "U+180D", "FVS3"},
    {0x180E, "MVS", "U+180E", "Монгол бичгийн зай"}
};

int is_back_vowel(wchar_t c) {
    return c == 0x1820 || c == 0x1823 || c == 0x1824 || c == 0x1825;
}
int is_front_vowel(wchar_t c) {
    return c == 0x1821 || c == 0x1826 || c == 0x1827;
}

// Эгшгийн хүйсийг үг тус бүрээр тодорхойлох
VowelGender detect_gender_wordwise(const wchar_t *text) {
    wchar_t buffer[64];
    size_t buf_i = 0;
    int last_type = 0; // 0 = space, 1 = letter
    int score = 0;

    for (size_t i = 0; i <= wcslen(text); i++) {
        wchar_t c = text[i];
        if (iswspace(c) || c == L'\0') {
            buffer[buf_i] = L'\0';
            for (size_t j = 0; j < buf_i; j++) {
                if (is_back_vowel(buffer[j])) { score++; break; }
                if (is_front_vowel(buffer[j])) { score--; break; }
            }
            buf_i = 0;
        } else {
            if (buf_i < sizeof(buffer)/sizeof(wchar_t)-1)
                buffer[buf_i++] = c;
        }
    }
    if (score > 0) return GENDER_BACK;
    if (score < 0) return GENDER_FRONT;
    return GENDER_UNKNOWN;
}

void output_json(const Explanation *matched, int count, VowelGender gender) {
    printf("{\"gender\": \"%s\",\n  \"chars\": [\n",
           gender == GENDER_BACK ? "BACK" : gender == GENDER_FRONT ? "FRONT" : "UNKNOWN");

    for (int i = 0; i < count; i++) {
        const char *translit = matched[i].translit ? matched[i].translit : "?";
        if (matched[i].baiti_char == 0x182C) translit = (gender == GENDER_BACK ? "k" : "q");
        if (matched[i].baiti_char == 0x182D) translit = (gender == GENDER_BACK ? "g" : "gh");

        printf("    {\"char\": \"%lc\", \"translit\": \"%s\", \"unicode\": \"%s\", \"rule\": \"%s\"}%s\n",
               matched[i].baiti_char,
               translit,
               matched[i].unicode,
               matched[i].rule,
               (i < count - 1 ? "," : ""));
    }
    printf("  ]\n}\n");
}

int main() {
    wchar_t input[256];
    Explanation matched[MAX_EXPLANATIONS];
    int count = 0;

    setlocale(LC_ALL, "");
    fgetws(input, sizeof(input) / sizeof(wchar_t), stdin);
    VowelGender gender = detect_gender_wordwise(input);

    for (size_t i = 0; i < wcslen(input); i++) {
        wchar_t c = input[i];
        for (size_t j = 0; j < sizeof(baiti_map)/sizeof(baiti_map[0]); j++) {
            if (baiti_map[j].baiti_char == c && count < MAX_EXPLANATIONS) {
                matched[count++] = baiti_map[j];
                break;
            }
        }
    }

    output_json(matched, count, gender);
    return 0;
}
