// Simple client-side mock escrow service for demo purposes
// Persists contracts in localStorage and simulates async API calls

const STORAGE_KEY = "demo_escrow_contracts_v1"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function writeStore(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

import demoAgreements from "./demoAgreements"

export async function createContract({ jobId, clientId, freelancerId, amount, currency = "USD", agreementId = null }) {
  await sleep(300)
  const contracts = readStore()
  const id = `ctr_${Date.now()}`

  let agreement = null
  if (agreementId) {
    agreement = demoAgreements.find(a => a.id === agreementId) || null
  }

  const contract = {
    id,
    jobId,
    clientId,
    freelancerId,
    amount,
    currency,
    status: "draft", // draft | partially_funded | funded | in_progress | completed | released | refunded
    fundedAmount: 0,
    // Escrow agreement signing state
    agreement: agreement ? { id: agreement.id, title: agreement.title, summary: agreement.summary } : null,
    signed: false,
    signedAt: null,
    signedAgreement: null, // will hold the full agreement when signed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  contracts.push(contract)
  writeStore(contracts)
  return contract
}

export async function signContract(contractId, agreementId = null) {
  await sleep(200)
  const contracts = readStore()
  const idx = contracts.findIndex(c => c.id === contractId)
  if (idx === -1) throw new Error("Contract not found")

  // attach agreement if provided
  if (agreementId) {
    const agreement = demoAgreements.find(a => a.id === agreementId)
    if (agreement) {
      contracts[idx].agreement = { id: agreement.id, title: agreement.title, summary: agreement.summary }
      contracts[idx].signedAgreement = { id: agreement.id, title: agreement.title, text: agreement.text }
    }
  } else if (contracts[idx].agreement) {
    // if contract already had an agreement, save the full text in signedAgreement
    const a = demoAgreements.find(d => d.id === contracts[idx].agreement.id)
    if (a) {
      contracts[idx].signedAgreement = { id: a.id, title: a.title, text: a.text }
    }
  }

  contracts[idx].signed = true
  contracts[idx].signedAt = new Date().toISOString()
  contracts[idx].updatedAt = new Date().toISOString()
  writeStore(contracts)
  return contracts[idx]
}

export async function fundContract(contractId, amount) {
  await sleep(600)
  const contracts = readStore()
  const idx = contracts.findIndex(c => c.id === contractId)
  if (idx === -1) throw new Error("Contract not found")
  contracts[idx].fundedAmount += amount
  contracts[idx].status = contracts[idx].fundedAmount >= contracts[idx].amount ? "funded" : "partially_funded"
  contracts[idx].updatedAt = new Date().toISOString()
  writeStore(contracts)
  return contracts[idx]
}

export async function releaseFunds(contractId) {
  await sleep(600)
  const contracts = readStore()
  const idx = contracts.findIndex(c => c.id === contractId)
  if (idx === -1) throw new Error("Contract not found")
  if (contracts[idx].fundedAmount <= 0) throw new Error("Nothing to release")
  contracts[idx].status = "released"
  contracts[idx].fundedAmount = 0
  contracts[idx].updatedAt = new Date().toISOString()
  writeStore(contracts)
  return contracts[idx]
}

export async function refundContract(contractId) {
  await sleep(600)
  const contracts = readStore()
  const idx = contracts.findIndex(c => c.id === contractId)
  if (idx === -1) throw new Error("Contract not found")
  contracts[idx].status = "refunded"
  contracts[idx].fundedAmount = 0
  contracts[idx].updatedAt = new Date().toISOString()
  writeStore(contracts)
  return contracts[idx]
}

export function listContracts() {
  return readStore()
}

export function getContract(id) {
  const contracts = readStore()
  return contracts.find(c => c.id === id)
}

export function clearContracts() {
  localStorage.removeItem(STORAGE_KEY)
}

export default {
  createContract,
  fundContract,
  releaseFunds,
  refundContract,
  signContract,
  listContracts,
  getContract,
  clearContracts
}
