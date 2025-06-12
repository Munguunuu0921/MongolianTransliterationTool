#include <stdio.h>
#include <wchar.h>
#include <string.h>
#include <locale.h>
#include <ctype.h>

#define OUTPUT_SIZE 512

// Галиг үсгүүдийг Монгол үсэг рүү хөрвүүлэх дүрэм
typedef struct {
    const char *translit;
    wchar_t mongol_char;
} ReverseMap;

ReverseMap reverse_map[] = {
    {"ng", 0x1829}, {"sh", 0x1831}, {"ch", 0x1834}, {"kh", 0x183B}, {"ts", 0x183C},
    {"dz", 0x183D}, {"lh", 0x1840}, {"zh", 0x1841},

    {"a", 0x1820}, {"e", 0x1821}, {"i", 0x1822}, {"u", 0x1824}, {"o", 0x1825},
    {"v", 0x1826}, {"n", 0x1828}, {"b", 0x182A}, {"p", 0x182B}, {"h", 0x182C},
    {"g", 0x182D}, {"m", 0x182E}, {"l", 0x182F}, {"s", 0x1830}, {"t", 0x1832},
    {"d", 0x1833}, {"j", 0x1835}, {"y", 0x1836}, {"r", 0x1837}, {"w", 0x1838},
    {"f", 0x1839}, {"k", 0x183A}, {"z", 0x183F},

    {"0", 0x1810}, {"1", 0x1811}, {"2", 0x1812}, {"3", 0x1813}, {"4", 0x1814},
    {"5", 0x1815}, {"6", 0x1816}, {"7", 0x1817}, {"8", 0x1818}, {"9", 0x1819}
};

int is_vowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int is_feminine_word(const char *word) {
    size_t len = strlen(word);
    if (len == 0) return 0;
    char last = word[len - 1];
    return last == 'e' || last == 'i';
}

int is_punctuation(char c) {
    return strchr(".,!?;:-'\"()[]{}@#$%^&*_=+<>/~`|\\", c) != NULL;
}

void reverse_transliterate(const char *input, wchar_t *output) {
    output[0] = L'\0';
    size_t i = 0, out_idx = 0;
    char word[64];
    size_t word_len = 0;

    while (input[i] != '\0') {
        if (input[i] == ' ' || input[i] == '\n') {
            word[word_len] = '\0';
            int is_feminine = is_feminine_word(word);
            size_t pos = 0;

            while (word[pos] != '\0') {
                int matched = 0;

                for (int len = 3; len >= 1; len--) {
                    for (size_t j = 0; j < sizeof(reverse_map) / sizeof(reverse_map[0]); j++) {
                        if (strlen(reverse_map[j].translit) == len &&
                            strncmp(&word[pos], reverse_map[j].translit, len) == 0) {
                            wchar_t ch = reverse_map[j].mongol_char;

                            if (is_feminine) {
                                if (ch == 0x182D) ch = 0x1821;  // гэ
                                if (ch == 0x182C) ch = 0x1821;  // хэ
                            }

                            output[out_idx++] = ch;
                            pos += len;
                            matched = 1;
                            break;
                        }
                    }
                    if (matched) break;
                }

                if (!matched) {
                    output[out_idx++] = word[pos];
                    pos++;
                }
            }

            output[out_idx++] = L' ';
            word_len = 0;
            i++;
            continue;
        }

        if (is_punctuation(input[i])) {
            output[out_idx++] = (wchar_t)input[i++];
            continue;
        }

        word[word_len++] = input[i++];
    }

    output[out_idx] = L'\0';
}

int main() {
    char input[256];
    wchar_t output[OUTPUT_SIZE];

    setlocale(LC_ALL, "");

    fgets(input, sizeof(input), stdin);

    reverse_transliterate(input, output);

    wprintf(output);
    return 0;
}
