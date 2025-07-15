import re
from collections import Counter
import os
import sys

# Read the full script from a file
with open('script.txt', 'r') as file:
    script = file.read()

# Remove stage directions and other non-dialogue elements
script = re.sub(r'\(.*?\)', '', script)  # Remove parentheses content
script = re.sub(r'#.*', '', script)      # Remove # comments
script = re.sub(r'INT\..*', '', script)  # Remove INT. scene headings
script = re.sub(r'EXT\..*', '', script)  # Remove EXT. scene headings
script = re.sub(r'\d+', '', script)      # Remove numbers

# Extract character names (all caps words followed by line breaks)
character_pattern = r'\b([A-Z]{2,})\b(?!\s*[a-z])'
character_names = set(re.findall(character_pattern, script))

# Tokenize the text into words
words = re.findall(r'\b[a-zA-Z]{2,}\b', script.lower())

# Define stopwords to exclude for the cleaned version
stopwords = {'the', 'and', 'you', 'that', 'for', 'with', 'are', 'this', 'have', 'from', 'one', 'had', 'would', 'what',
             'were', 'they', 'there', 'will', 'been', 'when', 'who', 'more', 'their', 'also', 'than',
             'them', 'some', 'such', 'was', 'but', 'can', 'into', 'his', 'her', 'she', 'has', 'him', 'out', 'about',
             'get', 'going', 'just', 'think', 'know', 'good', 'very', 'see', 'come', 'here', 'then', 'should', 
             'could', 'now', 'because', 'something', 'probably', 'day', 'night', 'morning',
             'evening', 'afternoon', 'camera', 'shot', 'behind', 'toward', 'across', 'angle', 'around', 'mm',
             'little', 'next', 'make', 'takes', 'looks', 'goes', 'walks', 'let', 'lot', 'any', 'much',
             'still', 'even', 'way', 'our', 'your', 'says', 'look', 'looking', 'title', 'credit', 'written',
             'author', 'draft', 'date', 'revision', 'sunday', 'october'}

# Count ALL word frequencies
all_word_counts = Counter(words)

# Count word frequencies excluding stopwords
filtered_word_counts = Counter(word for word in words if word not in stopwords)

# Print character names
print("MAIN CHARACTERS:")
for name in sorted(character_names):
    if len(name) > 2 and name.lower() in filtered_word_counts and filtered_word_counts[name.lower()] > 10:  # Filter significant characters
        print(f"{filtered_word_counts[name.lower()]:5d} | {name}")

print("\nMOST COMMON FILTERED WORDS:")
print("Count | Word")
print("------------------")
for word, count in filtered_word_counts.most_common(50):
    if count >= 10:  # Only show words that appear at least 10 times
        print(f"{count:5d} | {word}")

print("\nMOST COMMON WORDS (INCLUDING COMMON ENGLISH WORDS):")
print("Count | Word")
print("------------------")
for word, count in all_word_counts.most_common(30):
    if count >= 40:  # Only show words that appear at least 40 times
        print(f"{count:5d} | {word}")

print("\nCOMMON DIALOGUE WORDS:")
print("Count | Word")
print("------------------")
dialogue_words = {'yeah', 'okay', 'right', 'well', 'oh', 'um', 'uh', 'hey', 'hi', 'yes', 'no', 'fuck', 'shit', 'damn'}
for word in sorted(dialogue_words, key=lambda w: all_word_counts.get(w, 0), reverse=True):
    if all_word_counts.get(word, 0) >= 5:
        print(f"{all_word_counts.get(word, 0):5d} | {word}")

# Word count statistics
total_words = len(words)
unique_words = len(set(words))

print(f"\nTOTAL WORDS: {total_words}")
print(f"UNIQUE WORDS: {unique_words}")
print(f"VOCABULARY RICHNESS (unique/total): {unique_words/total_words:.4f}") 