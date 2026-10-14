export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface StudentOrder {
  id: string;
  orderNumberText: string; // e.g. "الطلب الأول"
  actionText: string; // e.g. "اجمعي الكمية" or "احسبي الكمية المتبقية"
  studentName: string;
  story: string;
  operationType: 'addition' | 'subtraction';
  fraction1: Fraction;
  fraction2: Fraction;
  resultNumerator: number;
  resultDenominator: number;
  badgeColor: string;
  tagline: string;
}

export interface StudentHypothesis {
  id: string;
  studentName: string;
  thought: string;
  timestamp: string;
}
