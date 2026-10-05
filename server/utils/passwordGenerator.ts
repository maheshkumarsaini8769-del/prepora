import { randomInt } from 'crypto';

/**
 * Generates a cryptographically strong, memorable 10-12 character password
 * adhering to strict security standards (uppercase, lowercase, numbers, symbols).
 * Example: 'Pp7#Kx29Lm'
 */
export function generateSecurePassword(length: number = 10): string {
  const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Exclude ambiguous chars like I, O
  const lowers = 'abcdefghjkmnpqrstuvwxyz'; // Exclude l
  const numbers = '23456789'; // Exclude 0, 1
  const symbols = '#@!$%*&';

  // Ensure at least 2 uppercase, 3 lowercase, 2 numbers, 1 symbol
  const chars: string[] = [
    uppers[randomInt(uppers.length)],
    uppers[randomInt(uppers.length)],
    lowers[randomInt(lowers.length)],
    lowers[randomInt(lowers.length)],
    lowers[randomInt(lowers.length)],
    numbers[randomInt(numbers.length)],
    numbers[randomInt(numbers.length)],
    symbols[randomInt(symbols.length)]
  ];

  const allPool = uppers + lowers + numbers + symbols;
  while (chars.length < length) {
    chars.push(allPool[randomInt(allPool.length)]);
  }

  // Shuffle array using Fisher-Yates
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}
