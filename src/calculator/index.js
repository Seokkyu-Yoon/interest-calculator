import { calculators } from './calculators'

export function getTypes () {
  return [...calculators.keys()]
}

export function getCalculator ({ period = 0, principal = 0, interest = 0, repaymentType = null }) {
  const Calculator = calculators.get(repaymentType) || calculators.get(null)
  const calculator = new Calculator(principal, period, interest)
  return calculator
}

// if (require.main === module) {
//   /**
//    * period -- 기간(년)
//    * principal -- 대출원금(원)
//    * interest -- 이율(%)
//    * repaymentType -- 상환방식('원금균등분할상환', '원리금균등분할상환')
//    * */
//   const period = 10
//   const principal = 150000000
//   const interest = 1.4
//   const repaymentType = '원금균등분할상환'

//   calc({ period, principal, interest, repaymentType })
// }
