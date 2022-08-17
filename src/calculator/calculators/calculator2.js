/** 원리금균등분할상환 */
import Calculator from './calculator'

export default class Calculator2 extends Calculator {
  constructor (principal = 0, period = 0, interest = 0) {
    super(Calculator2.key, principal, period, interest)
  }

  calc () {
    this.costs = []
    let accPrincipalCost = 0
    const sum = Math.round((this.principal * this.interest / 1200 * Math.pow(1 + this.interest / 1200, this.period * 12)) / (Math.pow(1 + this.interest / 1200, this.period * 12) - 1))
    for (let i = 0; i < this.period * 12; i += 1) {
      const remain = this.principal - accPrincipalCost
      const interestCost = Math.round(remain * this.interest / 1200)
      const cost = sum - interestCost
      accPrincipalCost += cost
      this.costs.push({
        cost,
        interest: interestCost
      })
    }
  }
}
Calculator2.key = '원리금균등분할상환'
Calculator2.entry = [Calculator2.key, Calculator2]
