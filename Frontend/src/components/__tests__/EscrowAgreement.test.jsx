import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EscrowAgreement from '@/components/EscrowAgreement'
import * as escrowService from '@/lib/escrowService'

vi.mock('@/lib/escrowService')

describe('EscrowAgreement', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('allows signing when checkbox is checked', async () => {
    const contract = { id: 'ctr_test', amount: 500, fundedAmount: 0, signed: false }
    const updated = { ...contract, signed: true, signedAt: new Date().toISOString() }
    escrowService.signContract.mockResolvedValue(updated)

    const onSigned = vi.fn()
    const openTerms = vi.fn()
    render(<EscrowAgreement contract={contract} onSigned={onSigned} openTerms={openTerms} />)

    // checkbox and sign button present
    expect(screen.getByText(/I have read and accept/i)).toBeInTheDocument()

    // The diagram CTA is rendered
    expect(screen.getByText(/To Sign the Terms and Conditions of/i)).toBeInTheDocument()

    // select and view terms
    const select = screen.getByLabelText(/Select Agreement/i)
    fireEvent.change(select, { target: { value: 'milestone' } })

    const viewButtons = screen.getAllByText(/View Terms/i)
    fireEvent.click(viewButtons[0])
    expect(openTerms).toHaveBeenCalledWith(expect.objectContaining({ id: 'milestone' }))

    const signBtn = screen.getByText(/Sign Agreement/i)
    expect(signBtn).toBeDisabled()

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    // button enabled and clicking signs
    expect(signBtn).not.toBeDisabled()
    fireEvent.click(signBtn)

    await waitFor(() => {
      expect(onSigned).toHaveBeenCalledWith(updated)
    })
  })
})