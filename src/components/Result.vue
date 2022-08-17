<script setup>
import { ref, defineProps, computed, watch } from 'vue'
const props = defineProps({
  info: Object,
  totals: Object,
  costs: Array,
  onRemove: Function
})

const info = computed(() => props?.info || null)
const totals = computed(() => props?.totals || null)
const costs = computed(() => props?.costs || [])
const onRemove = computed(() => props?.onRemove || (() => { }))

const infoPrincipal = computed(() => info.value?.principal || null)
const infoPeriod = computed(() => info.value?.period || null)
const infoInterest = computed(() => info.value?.interest || null)
const infoRepaymentType = computed(() => info.value?.repaymentType || null)

const showDetail = ref(true)
function toggleDetail () {
  showDetail.value = !showDetail.value
}
function remove () {
  onRemove.value?.()
}
watch(infoRepaymentType, (rType) => {
  if (rType === null) remove()
})
</script>

<template>
  <div class="result_wrap">
    <div :class="showDetail ? 'info_wrap detail' : 'info_wrap'" @click="toggleDetail">
      <div>원금 {{ infoPrincipal }}원</div>
      <div>기간 {{ infoPeriod }}년</div>
      <div>금리 {{ infoInterest }}%</div>
      <div>{{ infoRepaymentType }}</div>
      <button @click.stop="remove">삭제</button>
    </div>
    <template v-if="showDetail">
      <header>
        <div>구분</div>
        <div>원금(원)</div>
        <div>이자(원)</div>
        <div>합계(원)</div>
      </header>
      <div class="total">
        <div>총합</div>
        <div>{{ totals?.cost }}</div>
        <div>{{ totals?.interest }}</div>
        <div>{{ totals?.sum }}</div>
      </div>
      <div v-for="{ month, cost, interest, sum }, idx in costs" :key="`cost-${idx}`">
        <div>{{ month }}</div>
        <div>{{ cost }}</div>
        <div>{{ interest }}</div>
        <div>{{ sum }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.result_wrap {
  margin-top: 10px;
  border: 2px solid #888;
  border-radius: 10px;
}

.result_wrap>* {
  display: flex;
  align-items: center;
}

.result_wrap>*:last-child {
  padding-bottom: 10px;
}

.result_wrap .info_wrap {
  padding: 8px 4px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #eee;
  font-size: .875rem;
  letter-spacing: -.025rem;
}

.result_wrap .info_wrap.detail {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.result_wrap .info_wrap>div {
  font-weight: 800;
}

.result_wrap .info_wrap>div:nth-child(n+2) {
  margin-left: 20px;
}

.result_wrap .info_wrap>button {
  margin-left: auto;
  border-radius: 10px;
  border: none;
  background-color: #888;
  color: #fff;
  padding: 4px 8px;
  font-weight: 600;
  cursor: pointer;
}

.result_wrap> :not(.info_wrap)>div {
  display: flex;
  justify-content: center;
}

.result_wrap> :not(.info_wrap)>div:nth-child(1) {
  width: 5%;
}

.result_wrap> :not(.info_wrap)>div:nth-child(n+2) {
  min-width: 10%;
  justify-content: flex-start;
}

.result_wrap>header {
  border-top: 2px solid #888;
  border-bottom: 2px solid #888;
  font-weight: 700;
}

.result_wrap>div {
  border-bottom: 1px solid #eee;
}

.result_wrap>div.total {
  border-bottom: 1px solid #b8b8b8;
}
</style>
