<script setup>
import { ref } from 'vue'
import { getTypes, getCalculator } from './calculator'

import SkyResult from './components/Result.vue'

const repaymentTypes = getTypes()

const principal = ref(0)
const period = ref(0)
const interest = ref(0)
const repaymentType = ref(null)

const results = ref([])

function calculate () {
  try {
    const calculator = getCalculator({ period: period.value, principal: principal.value, interest: interest.value, repaymentType: repaymentType.value })
    calculator.calc()
    addResults(calculator.getResult())
    // calculator.print()
  } catch (e) {
    console.error(e)
    window?.alert?.('상환방법을 선택해주세요')
  }
}
function addResults ({ info, totals, costs }) {
  results.value.push({ info, totals, costs })
}
function removeResults () {
  results.value = []
}
function removeResult (idx) {
  results.value.splice(idx, 1)
}
</script>

<template>
  <h1>상환 계산기</h1>
  <div class="principle_wrap">
    원금(원) <input type="number" placeholder="원금을 입력해주세요" v-model="principal"/>
  </div>
  <div class="period_wrap">
    기간(년) <input type="number" placeholder="기간을 입력해주세요" v-model="period"/>
  </div>
  <div class="interest_wrap">
    금리(%) <input type="number" placeholder="금리를 입력해주세요" v-model="interest"/>
  </div>
  <div class="interest_type_wrap">
    상환방법
    <template v-for="rType, idx in repaymentTypes" :key="`repayment-type-${idx}`">
      <input :id="`repayment-type-${idx}`" type="radio" :value="rType" v-model="repaymentType"/>
      <label :for="`repayment-type-${idx}`">{{rType || '미선택'}}</label>
    </template>
  </div>
  <div class="button_wrap">
    <button @click="calculate">계산</button>
    <button @click="removeResults">모두 지우기</button>
  </div>

  <sky-result
  v-for="{ info, totals, costs }, idx in results"
  :key="`result-${idx}`"
  :info="info"
  :totals="totals"
  :costs="costs"
  :onRemove="() => removeResult(idx)"/>

  <a href="#">TOP</a>
</template>

<style>
#app {
  padding: 20px 10px;
}
</style>

<style scoped>
.button_wrap > button:nth-child(n+2) {
  margin-left: 5px;
}

a {
  position: fixed;
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 20px;
  color: white;
  font-weight: 800;
  background-color: #aaa;
  cursor: pointer;
  text-decoration: none;
}
</style>
