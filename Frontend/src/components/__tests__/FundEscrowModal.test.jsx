import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FundEscrowModal from '@/components/FundEscrowModal'
import * as escrowService from '@/lib/escrowService'

vi.mock('@/lib/escrowService')

describe('FundEscrowModal', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('shows remaining amount and successful flow', async () => {
    const contract = { id: 'ctr_test', amount: 1000, fundedAmount: 200 }
    const updatedContract = { ...contract, fundedAmount: 300, status: 'partially_funded' }
    escrowService.fundContract.mockResolvedValue(updatedContract)

    const onClose = vi.fn()
    const onFunded = vi.fn()

    render(<FundEscrowModal contract={contract} onClose={onClose} onFunded={onFunded} />)

    // remaining due should be 800
    expect(screen.getByText(/Remaining due:/i)).toBeInTheDocument()
    expect(screen.getByText('$800')).toBeInTheDocument()

    // change amount and submit
    const input = screen.getByLabelText(/Amount/i)
    fireEvent.change(input, { target: { value: '100' } })

    fireEvent.click(screen.getByText(/Pay/i))

    await waitFor(() => {
      expect(screen.getByText(/Payment successful/i)).toBeInTheDocument()
      expect(screen.getByText('$100 has been added to escrow.')).toBeInTheDocument()
    })

    expect(onFunded).toHaveBeenCalledWith(updatedContract)
  })
})
