// Class 6 Mathematics Comprehensive Curriculum Data (Pakistan SNC & Punjab/Federal Boards)
const chaptersData = [
  {
    id: 0,
    number: "Chapter 1",
    title: "Factors & Multiples (HCF & LCM)",
    summary: "Master factors, multiples, divisibility tests, prime factorization, HCF, LCM, and real-life word problems.",
    concepts: [
      {
        heading: "1. Factors vs Multiples: What is the Difference?",
        text: "• <strong>Factor:</strong> A number that divides another number completely with <strong>zero remainder</strong>. Think of factors as the building blocks.<br><em>Example:</em> Factors of 12 are 1, 2, 3, 4, 6, and 12 (because each divides 12 evenly).<br>• <strong>Multiple:</strong> The product of a given number and any whole number (like the times table).<br><em>Example:</em> Multiples of 4 are 4, 8, 12, 16, 20, 24...",
        rule: "<strong>💡 Memory Trick:</strong><br>• Factors are <strong>FEW</strong> (limited in count) and always $\\le$ the number.<br>• Multiples are <strong>MANY</strong> (infinite) and always $\\ge$ the number."
      },
      {
        heading: "2. Prime, Composite & Special Numbers",
        text: "• <strong>Prime Number:</strong> A number greater than 1 that has <strong>EXACTLY 2 factors</strong>: 1 and itself.<br>Primes up to 30: <strong>2, 3, 5, 7, 11, 13, 17, 19, 23, 29</strong>.<br>• <strong>Composite Number:</strong> A number with <strong>more than 2 factors</strong> (e.g., 4, 6, 8, 9, 10, 12).<br>• <strong>Twin Primes:</strong> Pairs of prime numbers that differ by 2 (e.g., (3, 5), (5, 7), (11, 13), (17, 19)).",
        rule: "<strong>⚠️ Common Exam Pitfalls:</strong><br>1. <strong>The number 1 is NEITHER prime NOR composite</strong> (it has only 1 factor: 1).<br>2. <strong>The number 2 is the ONLY EVEN prime number</strong>. All other even numbers are divisible by 2!"
      },
      {
        heading: "3. Super Divisibility Rules (Quick Mental Math)",
        text: "Use these shortcuts to test divisibility without long division:",
        rule: "• <strong>Divisible by 2:</strong> Last digit is even (0, 2, 4, 6, 8). <em>E.g., 548 is divisible.</em><br>• <strong>Divisible by 3:</strong> Sum of all digits is a multiple of 3. <em>E.g., for 471: 4 + 7 + 1 = 12 (divisible by 3) ✅</em><br>• <strong>Divisible by 4:</strong> Last two digits form a number divisible by 4. <em>E.g., in 3,524, 24 is divisible by 4 ✅</em><br>• <strong>Divisible by 5:</strong> Last digit is 0 or 5. <em>E.g., 895 ✅</em><br>• <strong>Divisible by 6:</strong> Divisible by BOTH 2 and 3. <em>E.g., 318 is even and 3+1+8=12 ✅</em><br>• <strong>Divisible by 9:</strong> Sum of digits is divisible by 9. <em>E.g., for 7,848: 7+8+4+8 = 27 (divisible by 9) ✅</em><br>• <strong>Divisible by 10:</strong> Last digit is 0. <em>E.g., 4,560 ✅</em><br>• <strong>Divisible by 11:</strong> (Sum of odd-place digits) - (Sum of even-place digits) = 0 or a multiple of 11."
      },
      {
        heading: "4. Prime Factorization (Factor Tree & Ladder Method)",
        text: "Expressing a composite number as a product of only prime numbers is called <strong>Prime Factorization</strong>.",
        example: {
          title: "Worked Example: Prime Factorize 72 using Ladder/Continuous Division",
          steps: [
            "Divide by smallest prime 2: \\( 72 \\div 2 = 36 \\)",
            "Divide by 2 again: \\( 36 \\div 2 = 18 \\)",
            "Divide by 2 again: \\( 18 \\div 2 = 9 \\)",
            "Now divide by next prime 3: \\( 9 \\div 3 = 3 \\)",
            "Divide by 3: \\( 3 \\div 3 = 1 \\)",
            "Write in index form: \\( 72 = 2 \\times 2 \\times 2 \\times 3 \\times 3 = 2^3 \\times 3^2 \\)"
          ]
        }
      },
      {
        heading: "5. Highest Common Factor (HCF / GCD)",
        text: "The largest number that divides two or more numbers completely. We take the <strong>common prime factors with the LOWEST power</strong>.",
        math: "\\text{HCF}(36, 54) = 2^1 \\times 3^2 = 2 \\times 9 = 18",
        example: {
          title: "Worked Example: Find HCF of 48 and 64",
          steps: [
            "Prime factors of 48: \\( 48 = 2^4 \\times 3^1 \\)",
            "Prime factors of 64: \\( 64 = 2^6 \\)",
            "Common base is 2. The lowest power is \\( 2^4 = 16 \\).",
            "Therefore, \\( \\text{HCF}(48, 64) = 16 \\)."
          ]
        }
      },
      {
        heading: "6. Least Common Multiple (LCM)",
        text: "The smallest non-zero number that is a multiple of two or more numbers. We take <strong>ALL prime factors with their HIGHEST power</strong>.",
        math: "\\text{LCM}(12, 18) = 2^2 \\times 3^2 = 4 \\times 9 = 36",
        example: {
          title: "Worked Example: Find LCM of 12, 15, and 20 by Common Division Method",
          steps: [
            "Write together: (12, 15, 20)",
            "Divide by 2: (6, 15, 10)",
            "Divide by 2: (3, 15, 5)",
            "Divide by 3: (1, 5, 5)",
            "Divide by 5: (1, 1, 1)",
            "Multiply divisors: \\( 2 \\times 2 \\times 3 \\times 5 = 60 \\). So \\( \\text{LCM} = 60 \\)."
          ]
        }
      },
      {
        heading: "7. The Golden Product Formula & Real-World Uses",
        text: "For any two positive numbers \\( a \\) and \\( b \\):",
        math: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
        rule: "<strong>🎯 Real-Life Word Problem Clues:</strong><br>• If a question asks for <em>'maximum size'</em>, <em>'greatest length'</em>, or <em>'dividing into equal piles'</em> &rarr; <strong>Find HCF!</strong><br>• If a question asks for <em>'when will they meet next'</em>, <em>'bells tolling together'</em>, or <em>'traffic lights changing at the same time'</em> &rarr; <strong>Find LCM!</strong>"
      }
    ],
    quizzes: [
      {
        id: "q1_1",
        question: "Which statement about prime numbers is TRUE?",
        options: [
          "All odd numbers are prime numbers",
          "1 is the smallest prime number",
          "2 is the only even prime number",
          "All prime numbers end in 1, 3, 7, or 9"
        ],
        correct: 2,
        explanation: "2 is the only even prime number. 1 is not prime (only 1 factor), and numbers like 9, 15, 21 are odd but composite."
      },
      {
        id: "q1_2",
        question: "Using divisibility rules, which of these numbers is divisible by BOTH 3 and 5?",
        options: ["235", "450", "310", "552"],
        correct: 1,
        explanation: "450 ends in 0 (so divisible by 5) and 4 + 5 + 0 = 9 (which is divisible by 3). Hence, 450 is divisible by both 3 and 5."
      },
      {
        id: "q1_3",
        question: "What is the prime factorization of 60 in index notation?",
        options: ["2 × 3 × 5", "2² × 3 × 5", "4 × 3 × 5", "2³ × 5"],
        correct: 1,
        explanation: "60 = 2 × 2 × 3 × 5 = 2² × 3 × 5. (Note: 4 × 3 × 5 is not prime factorization because 4 is composite)."
      },
      {
        id: "q1_4",
        question: "What is the HCF of 24 and 36?",
        options: ["6", "8", "12", "72"],
        correct: 2,
        explanation: "Prime factors of 24 = 2³ × 3; 36 = 2² × 3². Lowest common powers: 2² × 3 = 12."
      },
      {
        id: "q1_5",
        question: "Three church/masjid bells toll at intervals of 6, 8, and 12 minutes. If they toll together now, after how many minutes will they toll together again?",
        options: ["12 minutes", "24 minutes", "36 minutes", "48 minutes"],
        correct: 1,
        explanation: "This is a meeting-together problem, so find LCM(6, 8, 12). Multiples: 6 (6, 12, 18, 24...), 8 (8, 16, 24...), 12 (12, 24...). Lowest common multiple is 24 minutes."
      },
      {
        id: "q1_6",
        question: "The HCF of two numbers is 4 and their LCM is 24. If one number is 8, what is the other number?",
        options: ["6", "12", "16", "18"],
        correct: 1,
        explanation: "Using Golden Formula: HCF × LCM = Number1 × Number2 => 4 × 24 = 8 × Other => 96 = 8 × Other => Other = 96 / 8 = 12."
      }
    ]
  },
  {
    id: 1,
    number: "Chapter 2",
    title: "Integers & The Number Line",
    summary: "Understand positive and negative numbers, real-life applications (temperature, altitude, money), and arithmetic rules.",
    concepts: [
      {
        heading: "1. Real-World Positive & Negative Integers",
        text: "Integers are whole numbers with signs: \\( \\mathbb{Z} = \\{... -3, -2, -1, 0, +1, +2, +3 ...\\} \\).<br>• <strong>Positive (+):</strong> Above sea level (K2 peak +8,611 m), earning money (Rs. +500 profit), temperature above zero (+35°C in Lahore summer).<br>• <strong>Negative (-):</strong> Below sea level, losing money (Rs. -200 loss), freezing cold (-5°C in Quetta / Skardu winter).",
        rule: "<strong>Zero is Special:</strong> 0 is an integer, but it is <strong>neither positive nor negative</strong>. It is the reference starting point."
      },
      {
        heading: "2. The Number Line & Absolute Value",
        text: "• On a horizontal number line, numbers increase as you go <strong>RIGHT</strong> and decrease as you go <strong>LEFT</strong>.<br>• <em>Comparing:</em> \\( -2 > -7 \\) because -2 is further to the right than -7.<br>• <strong>Absolute Value \\( |x| \\):</strong> The absolute value is the positive distance from 0, ignoring the sign. Example: \\( |-9| = 9 \\) and \\( |+9| = 9 \\)."
      },
      {
        heading: "3. Addition & Subtraction Rules (The Team Concept)",
        text: "Think of Positive as 'Team Blue' and Negative as 'Team Red':",
        rule: "• <strong>Same Teams (Same Signs):</strong> They combine forces! Add numbers, keep the sign.<br><em>Example:</em> \\( (-5) + (-8) = -13 \\)<br>• <strong>Different Teams (Opposite Signs):</strong> They battle! Subtract the smaller number from the larger number, and the bigger team wins the sign.<br><em>Example:</em> \\( (-14) + (+20) = +6 \\) (Blue team is bigger by 6).<br>• <strong>Minus a Minus:</strong> Two negative signs together become a PLUS: \\( -(-a) = +a \\).<br><em>Example:</em> \\( 7 - (-4) = 7 + 4 = 11 \\)."
      },
      {
        heading: "4. Multiplication & Division of Integers",
        text: "Remember the friendship rule for signs:",
        math: "(+) \\times (+) = +, \\quad (-) \\times (-) = +, \\quad (+) \\times (-) = -, \\quad (-) \\times (+) = -",
        example: {
          title: "Worked Example: Calculate (-3) × (-4) - (-10) ÷ 2",
          steps: [
            "Step 1 (Multiply): \\( (-3) \\times (-4) = +12 \\)",
            "Step 2 (Divide): \\( (-10) \\div 2 = -5 \\)",
            "Step 3 (Substitute): \\( 12 - (-5) = 12 + 5 = 17 \\)."
          ]
        }
      }
    ],
    quizzes: [
      {
        id: "q2_1",
        question: "In Murree, the temperature was -3°C in the morning. By afternoon, it dropped by 5°C. What is the new temperature?",
        options: ["+2°C", "-2°C", "-8°C", "+8°C"],
        correct: 2,
        explanation: "-3°C - 5°C = -8°C."
      },
      {
        id: "q2_2",
        question: "Which of the following integer comparisons is CORRECT?",
        options: ["-10 > -2", "-5 > 0", "-15 < -8", "-1 < -9"],
        correct: 2,
        explanation: "On the number line, -15 is to the left of -8, so -15 is less than -8 (-15 < -8)."
      },
      {
        id: "q2_3",
        question: "Evaluate: (-18) + (+25)",
        options: ["-43", "+43", "-7", "+7"],
        correct: 3,
        explanation: "Opposite signs: subtract (25 - 18 = 7). Since 25 is larger and positive, the answer is +7."
      },
      {
        id: "q2_4",
        question: "Evaluate: 14 - (-9)",
        options: ["5", "-5", "23", "-23"],
        correct: 2,
        explanation: "Two negatives make a positive: 14 - (-9) = 14 + 9 = 23."
      },
      {
        id: "q2_5",
        question: "What is the value of: (-6) × (-7) ÷ (-2)?",
        options: ["+21", "-21", "+42", "-42"],
        correct: 1,
        explanation: "(-6) × (-7) = +42. Then (+42) ÷ (-2) = -21."
      }
    ]
  },
  {
    id: 2,
    number: "Chapter 3",
    title: "Fractions, Decimals & Percentages",
    summary: "Master fraction operations, decimal conversions, order of operations (BODMAS), and percentage problems.",
    concepts: [
      {
        heading: "1. Types of Fractions & Proper Forms",
        text: "• <strong>Proper Fraction:</strong> Numerator < Denominator (e.g., \\( \\frac{3}{5} \\)) &rarr; value is less than 1.<br>• <strong>Improper Fraction:</strong> Numerator \\( \\ge \\) Denominator (e.g., \\( \\frac{7}{4} \\)) &rarr; value is 1 or more.<br>• <strong>Mixed Number:</strong> Whole number + Proper fraction (e.g., \\( 1\\frac{3}{4} = \\frac{(1 \\times 4) + 3}{4} = \\frac{7}{4} \\))."
      },
      {
        heading: "2. Operations on Fractions (BODMAS & Reciprocals)",
        text: "• <strong>Addition/Subtraction:</strong> First find the LCM of denominators to make like denominators.<br>• <strong>Multiplication:</strong> Multiply numerators together and denominators together: \\( \\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d} \\).<br>• <strong>Division (Keep-Change-Flip):</strong> Keep first fraction, Change $\\div$ to $\\times$, and Flip the second fraction (Reciprocal).",
        example: {
          title: "Worked Example: Solve 3/4 ÷ 9/8",
          steps: [
            "Keep first: \\( \\frac{3}{4} \\)",
            "Change \\( \\div \\) to \\( \\times \\) and Flip \\( \\frac{9}{8} \\) to \\( \\frac{8}{9} \\): \\( \\frac{3}{4} \\times \\frac{8}{9} \\)",
            "Simplify cross-terms: \\( \\frac{3 \\div 3}{4 \\div 4} \\times \\frac{8 \\div 4}{9 \\div 3} = \\frac{1}{1} \\times \\frac{2}{3} = \\frac{2}{3} \\)."
          ]
        }
      },
      {
        heading: "3. Converting Fractions, Decimals, and Percentages",
        rule: "• <strong>Fraction &rarr; Percentage:</strong> Multiply by 100%. Example: \\( \\frac{4}{5} \\times 100\\% = 80\\% \\)<br>• <strong>Percentage &rarr; Fraction:</strong> Divide by 100 and simplify. Example: \\( 45\\% = \\frac{45}{100} = \\frac{9}{20} \\)<br>• <strong>Decimal &rarr; Percentage:</strong> Move decimal point 2 places right. Example: \\( 0.375 = 37.5\\% \\)"
      }
    ],
    quizzes: [
      {
        id: "q3_1",
        question: "Convert the mixed fraction 3 2/5 into an improper fraction:",
        options: ["11/5", "15/5", "17/5", "13/5"],
        correct: 2,
        explanation: "(3 × 5 + 2) / 5 = (15 + 2) / 5 = 17/5."
      },
      {
        id: "q3_2",
        question: "Solve: 2/3 + 1/6 - 1/2",
        options: ["1/3", "1/2", "5/6", "2/5"],
        correct: 0,
        explanation: "LCM of 3, 6, 2 is 6. Convert: (4/6) + (1/6) - (3/6) = (4 + 1 - 3)/6 = 2/6 = 1/3."
      },
      {
        id: "q3_3",
        question: "What is 2/5 ÷ 4/15?",
        options: ["8/75", "3/2", "2/3", "6/5"],
        correct: 1,
        explanation: "(2/5) × (15/4) = (2 × 15) / (5 × 4) = 30 / 20 = 3/2 (or 1 1/2)."
      },
      {
        id: "q3_4",
        question: "Ahmad scored 42 marks out of 50 in his math test. What percentage is that?",
        options: ["80%", "82%", "84%", "88%"],
        correct: 2,
        explanation: "(42 / 50) × 100% = 42 × 2% = 84%."
      },
      {
        id: "q3_5",
        question: "What is 25% of Rs. 480?",
        options: ["Rs. 100", "Rs. 120", "Rs. 140", "Rs. 240"],
        correct: 1,
        explanation: "25% is 1/4. Rs. 480 / 4 = Rs. 120."
      }
    ]
  },
  {
    id: 3,
    number: "Chapter 4",
    title: "Ratio, Rate & Proportion",
    summary: "Compare quantities with ratios, find simplest forms, and solve everyday problems using the Unitary Method.",
    concepts: [
      {
        heading: "1. What is a Ratio?",
        text: "A <strong>ratio</strong> compares two quantities of the same kind and unit by division. Written as \\( a : b \\) (read 'a is to b') or \\( \\frac{a}{b} \\).<br><em>Important:</em> Ratios have <strong>NO units</strong>! When comparing quantities, convert them to the same units first (e.g., convert 1 meter to 100 cm before comparing with 25 cm).",
        example: {
          title: "Worked Example: Ratio of 500 grams to 2 kilograms",
          steps: [
            "Convert 2 kg to grams: \\( 2\\text{ kg} = 2,000\\text{ g} \\)",
            "Write ratio: \\( 500 : 2000 \\)",
            "Divide both sides by 500: \\( 1 : 4 \\)."
          ]
        }
      },
      {
        heading: "2. The Unitary Method (The Ultimate Shopping Tool)",
        text: "The <strong>Unitary Method</strong> means finding the value of <strong>ONE single unit</strong> first by dividing, and then finding the value of the required number of units by multiplying.",
        example: {
          title: "Worked Example: If 8 cricket balls cost Rs. 1,600, what is the cost of 5 cricket balls?",
          steps: [
            "Step 1 (Find cost of 1 ball): \\( \\frac{1600}{8} = \\text{Rs. } 200 \\)",
            "Step 2 (Find cost of 5 balls): \\( 5 \\times 200 = \\text{Rs. } 1,000 \\)",
            "Answer: Rs. 1,000."
          ]
        }
      },
      {
        heading: "3. Direct Proportion & Cross Multiplication",
        text: "When two ratios are equal, they form a <strong>proportion</strong>: \\( a : b :: c : d \\) or \\( \\frac{a}{b} = \\frac{c}{d} \\).",
        math: "\\text{Product of Extremes} = \\text{Product of Means} \\implies a \\times d = b \\times c"
      }
    ],
    quizzes: [
      {
        id: "q4_1",
        question: "What is the ratio of 45 minutes to 2 hours in simplest form?",
        options: ["45 : 2", "3 : 8", "9 : 24", "15 : 40"],
        correct: 1,
        explanation: "2 hours = 120 minutes. Ratio = 45 : 120. Dividing both by 15 gives 3 : 8."
      },
      {
        id: "q4_2",
        question: "A car travels 180 km in 3 hours. How far will it travel in 5 hours at the same speed?",
        options: ["240 km", "280 km", "300 km", "360 km"],
        correct: 2,
        explanation: "Speed in 1 hour = 180 / 3 = 60 km/h. In 5 hours = 5 × 60 = 300 km."
      },
      {
        id: "q4_3",
        question: "Find the value of x if 3 : 7 = 12 : x",
        options: ["21", "28", "35", "42"],
        correct: 1,
        explanation: "Cross-multiply: 3 * x = 7 * 12 => 3x = 84 => x = 84 / 3 = 28."
      },
      {
        id: "q4_4",
        question: "In a class of 40 students, 24 are boys and the rest are girls. What is the ratio of boys to girls?",
        options: ["3 : 2", "2 : 3", "3 : 5", "4 : 3"],
        correct: 0,
        explanation: "Number of girls = 40 - 24 = 16. Ratio of boys to girls = 24 : 16 = 3 : 2 (dividing both by 8)."
      }
    ]
  },
  {
    id: 4,
    number: "Chapter 5",
    title: "Introduction to Algebra",
    summary: "Learn algebraic language, terms, variables, coefficients, and how to solve one-variable linear equations.",
    concepts: [
      {
        heading: "1. The Language of Algebra",
        text: "Algebra is arithmetic with unknown letters (called variables).<br>• <strong>Variable:</strong> A letter representing an unknown number (e.g., \\( x, y, a, b \\)).<br>• <strong>Constant:</strong> A fixed number that does not change (e.g., 7, -12, 100).<br>• <strong>Coefficient:</strong> The number multiplied with the variable. In \\( 5x \\), 5 is the coefficient."
      },
      {
        heading: "2. Translating English Phrases into Algebraic Expressions",
        rule: "• '7 added to a number': \\( x + 7 \\)<br>• 'A number decreased by 4': \\( y - 4 \\)<br>• 'Three times a number increased by 8': \\( 3x + 8 \\)<br>• 'One-fourth of a number': \\( \\frac{x}{4} \\)"
      },
      {
        heading: "3. Combining Like Terms",
        text: "Terms having the <strong>exact same variable and power</strong> are called like terms and can be added or subtracted together.",
        example: {
          title: "Worked Example: Simplify 4x + 7y + 2x - 3y + 5",
          steps: [
            "Group like terms: \\( (4x + 2x) + (7y - 3y) + 5 \\)",
            "Combine coefficients: \\( 6x + 4y + 5 \\)."
          ]
        }
      },
      {
        heading: "4. Solving Linear Equations (The Balance Scale Method)",
        text: "Whatever you do to the left side of \\( = \\), do the exact same to the right side:",
        example: {
          title: "Worked Example: Solve 5x - 7 = 18",
          steps: [
            "Add 7 to both sides: \\( 5x = 18 + 7 \\implies 5x = 25 \\)",
            "Divide both sides by 5: \\( x = \\frac{25}{5} = 5 \\)",
            "Check answer: \\( 5(5) - 7 = 25 - 7 = 18 \\) (Verified!)."
          ]
        }
      }
    ],
    quizzes: [
      {
        id: "q5_1",
        question: "In the expression 7x - 15, what is the coefficient of x?",
        options: ["x", "7", "-15", "15"],
        correct: 1,
        explanation: "The coefficient is the number multiplying the variable, which is 7."
      },
      {
        id: "q5_2",
        question: "Simplify: 5a + 3b - 2a + 4b",
        options: ["3a + 7b", "7a + 7b", "3a - b", "10ab"],
        correct: 0,
        explanation: "(5a - 2a) + (3b + 4b) = 3a + 7b."
      },
      {
        id: "q5_3",
        question: "Solve the linear equation: 4x + 6 = 30",
        options: ["x = 5", "x = 6", "x = 7", "x = 8"],
        correct: 1,
        explanation: "4x = 30 - 6 => 4x = 24 => x = 24 / 4 = 6."
      },
      {
        id: "q5_4",
        question: "If y / 3 - 2 = 5, what is the value of y?",
        options: ["9", "15", "21", "24"],
        correct: 2,
        explanation: "y / 3 = 5 + 2 = 7 => y = 7 * 3 = 21."
      },
      {
        id: "q5_5",
        question: "Ali is 3 years older than twice Bilal's age. If Bilal is 'b' years old, what is Ali's age?",
        options: ["3b + 2", "2b + 3", "2b - 3", "b/2 + 3"],
        correct: 1,
        explanation: "Twice Bilal's age is 2b. 3 years older means adding 3, giving 2b + 3."
      }
    ]
  },
  {
    id: 5,
    number: "Chapter 6",
    title: "Geometry & Mensuration",
    summary: "Explore lines, angles, triangles, perimeter, and area formulas for squares, rectangles, and triangles.",
    concepts: [
      {
        heading: "1. Types of Angles & Angle Pairs",
        text: "Angles are measured in degrees (°):",
        rule: "• <strong>Acute Angle:</strong> Between 0° and 90°.<br>• <strong>Right Angle:</strong> Exactly 90° (forms an 'L' shape).<br>• <strong>Obtuse Angle:</strong> Between 90° and 180°.<br>• <strong>Straight Angle:</strong> Exactly 180° (a flat line).<br>• <strong>Reflex Angle:</strong> Between 180° and 360°.<br>• <strong>Complementary Angles:</strong> Two angles that add up to <strong>90°</strong> (e.g., 30° and 60°).<br>• <strong>Supplementary Angles:</strong> Two angles that add up to <strong>180°</strong> (e.g., 110° and 70°)."
      },
      {
        heading: "2. Angle Sum Properties",
        rule: "• <strong>Triangle:</strong> Sum of all three interior angles is always <strong>180°</strong>.<br>• <strong>Quadrilateral (4-sided shape):</strong> Sum of all four angles is always <strong>360°</strong>."
      },
      {
        heading: "3. Perimeter & Area Formulas",
        rule: "• <strong>Perimeter:</strong> Total distance around the outside boundary (measured in cm, m).<br>• <strong>Area:</strong> Amount of flat 2D surface inside (measured in cm², m²).<br><br><strong>Key Formulas:</strong><br>• Square: \\( P = 4s \\), \\( A = s^2 \\)<br>• Rectangle: \\( P = 2(l + w) \\), \\( A = l \\times w \\)<br>• Triangle: \\( A = \\frac{1}{2} \\times \\text{base} \\times \\text{height} \\)"
      }
    ],
    quizzes: [
      {
        id: "q6_1",
        question: "What is the complement of a 35° angle?",
        options: ["45°", "55°", "65°", "145°"],
        correct: 1,
        explanation: "Complementary angles sum to 90°. Complement = 90° - 35° = 55°."
      },
      {
        id: "q6_2",
        question: "What is the supplement of a 115° angle?",
        options: ["65°", "75°", "85°", "90°"],
        correct: 0,
        explanation: "Supplementary angles sum to 180°. Supplement = 180° - 115° = 65°."
      },
      {
        id: "q6_3",
        question: "A triangular garden has a base of 12 m and a perpendicular height of 8 m. What is its area?",
        options: ["20 m²", "48 m²", "96 m²", "40 m²"],
        correct: 1,
        explanation: "Area = (1/2) * base * height = (1/2) * 12 * 8 = 6 * 8 = 48 m²."
      },
      {
        id: "q6_4",
        question: "The perimeter of a square room is 36 meters. What is the length of each side?",
        options: ["6 m", "8 m", "9 m", "18 m"],
        correct: 2,
        explanation: "Perimeter = 4 * side => 36 = 4 * side => side = 36 / 4 = 9 m."
      },
      {
        id: "q6_5",
        question: "In a triangle ABC, angle A = 45° and angle B = 75°. What is angle C?",
        options: ["50°", "60°", "70°", "80°"],
        correct: 1,
        explanation: "Angle C = 180° - (45° + 75°) = 180° - 120° = 60°."
      }
    ]
  },
  {
    id: 6,
    number: "Chapter 7",
    title: "Data Handling & Statistics",
    summary: "Collect, tally, and organize data, interpret bar charts, and calculate the 3 M's (Mean, Median, Mode).",
    concepts: [
      {
        heading: "1. The Three Averages (Mean, Median, Mode)",
        text: "Statistics helps us make sense of collections of numbers:",
        rule: "• <strong>Mean (Average):</strong> Add all numbers, then divide by the count of numbers: \\( \\text{Mean} = \\frac{\\sum x}{n} \\)<br>• <strong>Median (Middle):</strong> Arrange numbers from smallest to largest. The middle value is the median. (If even count, average the two middle values).<br>• <strong>Mode (Most Frequent):</strong> The number that appears the most times in the data."
      },
      {
        heading: "2. Worked Statistics Example",
        example: {
          title: "Find Mean, Median, and Mode of test scores: 6, 8, 4, 8, 9, 10, 8",
          steps: [
            "Count: 7 values",
            "Sorted order: 4, 6, 8, 8, 8, 9, 10",
            "Sum = 4 + 6 + 8 + 8 + 8 + 9 + 10 = 53",
            "Mean = \\( 53 \\div 7 \\approx 7.57 \\)",
            "Median = 4th value = 8",
            "Mode = 8 (appears 3 times)"
          ]
        }
      },
      {
        heading: "3. Tally Charts & Bar Graphs",
        text: "• <strong>Tally Marks:</strong> Drawn in groups of five (four vertical lines and one diagonal strike-through \\( \\cancel{||||} \\)).<br>• <strong>Bar Graphs:</strong> Bars must have equal width and equal spacing between them. The height of the bar represents the frequency."
      }
    ],
    quizzes: [
      {
        id: "q7_1",
        question: "What is the Mean of 12, 16, 20, and 24?",
        options: ["16", "18", "20", "22"],
        correct: 1,
        explanation: "Sum = 12 + 16 + 20 + 24 = 72. Mean = 72 / 4 = 18."
      },
      {
        id: "q7_2",
        question: "Find the Median of the set: 15, 3, 9, 12, 6",
        options: ["6", "9", "12", "15"],
        correct: 1,
        explanation: "First sort: 3, 6, 9, 12, 15. The middle value is 9."
      },
      {
        id: "q7_3",
        question: "In the data set {5, 8, 3, 8, 2, 8, 5, 1}, what is the Mode?",
        options: ["3", "5", "8", "1"],
        correct: 2,
        explanation: "8 appears 3 times, which is the highest frequency."
      },
      {
        id: "q7_4",
        question: "How many items are represented by three full tally bundles (each bundle having 4 vertical and 1 cross line) plus 2 extra tally marks?",
        options: ["12", "15", "17", "20"],
        correct: 2,
        explanation: "3 bundles of 5 = 15. Plus 2 extra = 17."
      }
    ]
  }
];
