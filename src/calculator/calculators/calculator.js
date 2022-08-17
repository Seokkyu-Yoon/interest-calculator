export default class Calculator {
  constructor (key = Calculator.key, principal = 0, period = 0, interest = 0) {
    this.key = key
    this.principal = principal
    this.period = period
    this.interest = interest
    this.costs = []
  }

  calc () {
    throw new Error('calc method is not implements')
  }

  getResult () {
    const totals = this.costs.reduce((bucket, { cost, interest }) => {
      bucket.cost += cost
      bucket.interest += interest
      bucket.sum += cost + interest
      return bucket
    }, { cost: 0, interest: 0, sum: 0 })

    const costs = this.costs.map(({ cost, interest }, idx) => {
      const month = idx + 1
      const sum = cost + interest
      return { month, cost, interest, sum }
    })

    const info = {
      principal: this.principal,
      period: this.period,
      interest: this.interest,
      repaymentType: this.key
    }
    return { info, totals, costs }
  }

  print () {
    console.log(`* ${this.key}`)
    const { totals, costs } = this.getResult()

    costs.forEach(({ cost, interest }, idx) => {
      const sum = cost + interest
      console.log(`  - ${idx + 1}개월${' '.repeat(String(this.period * 12).length - String(idx + 1).length)} | [원금] ${String(cost).padEnd(String(totals.cost).length, ' ')} | [이자] ${String(interest).padEnd(String(totals.cost).length, ' ')} | [합] ${sum}`)
    })
    console.log(`  ● 총합${' '.repeat(String(this.period * 12).length)} | [원금] ${totals.cost} | [이자] ${totals.interest} | [합] ${totals.sum}`)
  }
}
Calculator.key = null
Calculator.entry = [Calculator.key, Calculator]
