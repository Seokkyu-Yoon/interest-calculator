/** 원금균등분할상환 */
import Calculator from './calculator'

export default class Calculator1 extends Calculator {
  constructor (principal = 0, period = 0, interest = 0) {
    super(Calculator1.key, principal, period, interest)
  }

  calc () {
    this.costs = []
    let accPrincipalCost = 0
    for (let i = 0; i < this.period * 12; i += 1) {
      const remain = this.principal - accPrincipalCost
      const cost = Math.round(this.principal * (i + 1) / (this.period * 12)) - accPrincipalCost
      const interestCost = Math.round(remain * this.interest / 1200)
      accPrincipalCost += cost
      this.costs.push({
        cost,
        interest: interestCost
      })
    }
    this.costs[this.costs.length - 1].cost += this.principal - accPrincipalCost
  }
}
Calculator1.key = '원금균등분할상환'
Calculator1.entry = [Calculator1.key, Calculator1]
