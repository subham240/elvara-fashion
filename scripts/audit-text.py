import re

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'description:\s*[\'"](.*?)[\'"]', text)
for i, m in enumerate(matches, 1):
    print(f'{i}. {m}')
