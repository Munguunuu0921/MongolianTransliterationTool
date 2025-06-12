export const detectVowelGender = (text: string): "masculine" | "feminine" | "neutral" | "" => {
    const masculineVowels = ["ᠠ", "ᠣ", "ᠤ"]; // а, о, у
    const feminineVowels = ["ᠧ", "ᠥ", "ᠦ"]; // э, ө, ү
    const neutral = ["ᠢ"]; // и
  
    let hasMasculine = false;
    let hasFeminine = false;
  
    for (const char of text) {
      if (masculineVowels.includes(char)) hasMasculine = true;
      if (feminineVowels.includes(char)) hasFeminine = true;
    }
  
    if (hasMasculine && hasFeminine) return "neutral";
    if (hasMasculine) return "masculine";
    if (hasFeminine) return "feminine";
  
    return "";
  };
  